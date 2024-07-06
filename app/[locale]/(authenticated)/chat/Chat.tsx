"use client";

import { tt } from "@/lib";
import { useCurrentLocale } from "@/locales/client";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

import { Socket, io } from "socket.io-client";
import { searchForContact } from "./actions";
import { SendDiagonal } from "iconoir-react";
import { RoleEnumType } from "@fcai-sis/shared-models";

let socket: Socket;

export type SocketMessageType = {
  message: string;
  sentAt: string;
  sender: string;
  from: {
    user: string;
    fullName: string;
    role: RoleEnumType;
  };
  to: {
    user: string;
    fullName: string;
    role: RoleEnumType;
  };
};

type ChatMessageType = {
  message: string;
  sentAt: string;
  sender: string;
};

export type ContactType = {
  fullName: string;
  role: string;
  id: string;
  chat: {
    messages: ChatMessageType[];
    user1: string;
    user2: string;
    chatId: string;
  };
};

type ChatProps = {
  myId: string;
  accessToken: string;
  contacts: ContactType[];
};

export default function Chat({ myId, accessToken, contacts }: ChatProps) {
  const messageRef = useRef<HTMLInputElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<ContactType[]>(contacts);
  const [activeContactId, setActiveContactId] = useState<string | null>(null); // id of contact in chats state
  const activeChat = chats.find((_chat) => _chat.id === activeContactId);

  function scrollToBottom() {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    socket = io(process.env.CHAT_API_URL ?? "http://127.0.0.1:3099", {
      autoConnect: false,
      auth: { token: accessToken },
    });

    socket.connect();

    socket.on("message", (message: SocketMessageType) => {
      // if message is from a user not in the contacts list
      if (chats.find((chat) => chat.id === message.sender) === undefined) {
        const newChat: ContactType = {
          id: message.sender,
          fullName: message.from.fullName,
          role: message.from.role,
          chat: {
            messages: [],
            user1: message.sender,
            user2: myId,
            chatId: "nonexistent",
          },
        };

        setChats((prevChats) => {
          return [...prevChats, newChat];
        });
      }

      setChats((prevChats) => {
        // add message to the chat with the same chatId
        return prevChats.map((chat) => {
          if (
            // the message comes with `sender` and `to`
            // we need to add the message to the chat with `to` IF we are `sender`
            // or add the message to the chat with `sender` IF we are `to`
            (message.sender === myId && chat.id === message.to.user) ||
            (message.to.user === myId && chat.id === message.sender)
          ) {
            return {
              ...chat,
              chat: {
                ...chat.chat,
                messages: [...chat.chat.messages, message],
              },
            };
          }
          return chat;
        });
      });
    });

    return () => {
      socket.off("message");

      socket.disconnect();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = messageRef.current?.value;
    if (message) {
      socket.emit("message", {
        message,
        to: activeContactId,
      });
      messageRef.current!.value = "";
    }
  };

  const onContactSelect = (contact: ContactType) => {
    const contactId = contact.id;

    if (chats.find((chat) => chat.id === contactId) === undefined) {
      setChats((prevChats) => {
        return [...prevChats, contact];
      });
    }

    setActiveContactId(contactId);
  };

  return (
    <div className="flex w-full h-full gap-2 mt-4">
      <ContactList
        contacts={chats}
        onContactSelect={onContactSelect}
        activeChat={activeChat}
      />
      <ChatWindow
        scrollableRef={scrollableRef}
        activeChat={activeChat}
        messageRef={messageRef}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

type ContactListProps = {
  contacts: ContactType[];
  onContactSelect: (contact: ContactType) => void;
  activeChat?: ContactType;
};
function ContactList({
  contacts,
  onContactSelect,
  activeChat,
}: ContactListProps) {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const locale = useCurrentLocale();
  const [searchResults, setSearchResults] = useState<ContactType[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = searchRef.current?.value;
    if (searchValue) {
      const results = await searchForContact(searchValue);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col h-full w-96 bg-white border border-slate-200 rounded-lg p-2">
      <form className="flex flex-col p-1 w-full" onSubmit={handleSubmit}>
        <input
          ref={searchRef}
          type="text"
          className="w-full"
          placeholder={tt(locale, {
            en: "Search for someone",
            ar: "ابحث عن أحد",
          })}
        />
      </form>
      <div className="flex flex-col overflow-y-auto h-full">
        {(searchResults.length > 0 ? searchResults : contacts).map(
          (contact) => {
            const onClick = () => {
              onContactSelect(contact);
            };

            return (
              <ContactListItem
                key={contact.id}
                contact={contact}
                onClick={onClick}
                activeChat={activeChat}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

type ContactListItemProps = {
  activeChat?: ContactType;
  contact: ContactType;
  onClick: () => void;
};
function ContactListItem({
  contact,
  onClick,
  activeChat,
}: ContactListItemProps) {
  const color =
    activeChat?.id === contact.id
      ? "bg-blue-500 hover:bg-blue-600 text-white "
      : "bg-white hover:bg-slate-100 text-slate-600";
  return (
    <div
      key={contact.id}
      onClick={onClick}
      className={`"cursor-pointer ${color} p-2 my-1 rounded-lg transition-colors duration-300"`}
    >
      {contact.fullName}
    </div>
  );
}

type ChatWindowProps = {
  activeChat?: ContactType;
  scrollableRef: React.RefObject<HTMLDivElement>;
  messageRef: React.RefObject<HTMLInputElement>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
function ChatWindow({
  activeChat,
  scrollableRef,
  messageRef,
  handleSubmit,
}: ChatWindowProps) {
  const locale = useCurrentLocale();
  return (
    <div className="flex flex-col w-full h-full bg-white border border-slate-200 rounded-lg">
      {activeChat ? (
        <>
          <ChatWindowHeader activeContact={activeChat} />
          <div
            className="flex flex-col w-full h-full overflow-y-auto"
            ref={scrollableRef}
          >
            {activeChat.chat.messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                activeChat={activeChat}
              />
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full p-2 gap-2 border-t border-slate-200 rounded-b-lg"
          >
            <input ref={messageRef} type="text" className="w-full" />
            <button type="submit" className="btn">
              {tt(locale, {
                en: "Send",
                ar: "إرسال",
              })}
              <SendDiagonal className="[&>*]:stroke-white" />
            </button>
          </form>
        </>
      ) : (
        <div className="flex w-full h-full justify-center items-center text-slate-400">
          {tt(locale, {
            en: "Select a chat from the contacts list",
            ar: "اختر محادثة من قائمة الاتصالات",
          })}
        </div>
      )}
    </div>
  );
}

type ChatMessageProps = {
  activeChat: ContactType;
  message: ChatMessageType;
};
function ChatMessage({ activeChat, message }: ChatMessageProps) {
  const locale = useCurrentLocale();
  const senderName =
    message.sender !== activeChat.id
      ? tt(locale, {
          en: "You",
          ar: "أنت",
        })
      : activeChat.fullName;

  const alignRight = message.sender === activeChat.id;
  const color = alignRight
    ? "bg-slate-100 [&>*]:text-slate-600"
    : "bg-blue-100  [&>*]:text-blue-500";

  const sentAtMomentFormatted = moment(message.sentAt).format("LT");

  return (
    <div
      className={`flex w-full ${alignRight ? "justify-start" : "justify-end"}`}
    >
      <div className={`flex flex-col p-2 m-2 ${color} rounded-lg min-w-56`}>
        <div className="font-bold">{senderName}</div>
        <div className="py-2">{message.message}</div>
        <div
          className={`text-sm ${
            locale === "ar" ? "justify-start" : "justify-end"
          } w-full flex`}
          dir="ltr"
        >
          {sentAtMomentFormatted}
        </div>
      </div>
    </div>
  );
}

type ChatWindowHeaderProps = {
  activeContact: ContactType;
};
function ChatWindowHeader({ activeContact }: ChatWindowHeaderProps) {
  return (
    <div className="flex flex-col w-full bg-white rounded-t-lg justify-center items-start p-4 border-b border-slate-200">
      <h2 className="text-slate-600">{activeContact.fullName}</h2>
      <p className="text-slate-400">{activeContact.role}</p>
    </div>
  );
}
