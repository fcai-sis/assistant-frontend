import { getAccessToken, tokenPayload, tt } from "@/lib";
import Chat, { ContactType } from "./Chat";
import {
  ChatModel,
  InstructorModel,
  RoleEnum,
  RoleEnumType,
  StudentModel,
  TeachingAssistantModel,
  UserModel,
} from "@fcai-sis/shared-models";
import dbConnect from "@/database";
import { getServerSession } from "next-auth";
import { getCurrentLocale } from "@/locales/server";

export async function formatContactChat({
  chats,
  myUserId,
  otherUserId,
}: {
  chats: any;
  myUserId: string;
  otherUserId: string;
}) {
  const chat = chats.find(
    (chat: any) =>
      chat.user1.toString() === otherUserId ||
      chat.user2.toString() === otherUserId
  );

  if (!chat) {
    return {
      messages: [],
      user1: myUserId,
      user2: otherUserId,
      chatId: "nonexistent",
    };
  }

  const res = {
    messages: chat.messages.map((message: any) => ({
      message: message.message,
      sentAt: message.sentAt.toISOString(),
      sender: message.sender.toString(),
    })),
    user1: chat.user1.toString(),
    user2: chat.user2.toString(),
    chatId: chat._id.toString(),
  };

  return res;
}

export default async function Page() {
  const locale = getCurrentLocale();

  await dbConnect();
  const session = await getServerSession();
  const { userId } = tokenPayload(session);
  const accessToken = await getAccessToken();

  const relevantChats = await ChatModel.find({
    $or: [{ user1: userId }, { user2: userId }],
  });

  const contacts: ContactType[] = [];

  function getModelFromRole(role: RoleEnumType) {
    switch (role) {
      case RoleEnum[1]:
        return StudentModel;
      case RoleEnum[3]:
        return InstructorModel;
      case RoleEnum[4]:
        return TeachingAssistantModel;
      default:
        throw new Error("Invalid role");
    }
  }

  for (const chat of relevantChats) {
    const otherUserId =
      chat.user1.toString() === userId ? chat.user2 : chat.user1;
    const user = await UserModel.findById(otherUserId);
    if (!user) continue;
    const person = await getModelFromRole(user.role).findOne({
      user: otherUserId,
    });
    if (!person) continue;
    contacts.push({
      fullName: person.fullName,
      role: user.role,
      id: otherUserId.toString(),
      chat: await formatContactChat({
        chats: relevantChats,
        myUserId: userId!,
        otherUserId: otherUserId.toString(),
      }),
    });
  }

  return (
    <>
      <h1>
        {tt(locale, {
          en: "Chat",
          ar: "المحادثات",
        })}
      </h1>
      <Chat accessToken={accessToken} contacts={contacts} myId={userId!} />
    </>
  );
}
