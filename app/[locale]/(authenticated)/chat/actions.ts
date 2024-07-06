"use server";

import {
  ChatModel,
  InstructorModel,
  RoleEnum,
  StudentModel,
  TeachingAssistantModel,
} from "@fcai-sis/shared-models";
import { formatContactChat } from "./page";
import { getServerSession } from "next-auth";
import { tokenPayload } from "@/lib";
import { ContactType } from "./Chat";

export async function searchForContact(query: string): Promise<ContactType[]> {
  const session = await getServerSession();
  const { userId } = tokenPayload(session);

  const [
    // students,
    instructors,
    tas,
  ] = await Promise.all([
    // StudentModel.find({ fullName: { $regex: query, $options: "i" } }),
    InstructorModel.find({ fullName: { $regex: query, $options: "i" } }),
    TeachingAssistantModel.find({
      fullName: { $regex: query, $options: "i" },
    }),
  ]);

  const [
    // studentChats,
    instructorChats,
    taChats,
  ] = await Promise.all([
    // ChatModel.find({
    //   $or: [
    //     {
    //       user1: userId,
    //       user2: { $in: students.map((student) => student._id) },
    //     },
    //     {
    //       user2: userId,
    //       user1: { $in: students.map((student) => student._id) },
    //     },
    //   ],
    // }),
    ChatModel.find({
      $or: [
        {
          user1: userId,
          user2: { $in: instructors.map((instructor) => instructor._id) },
        },
        {
          user2: userId,
          user1: { $in: instructors.map((instructor) => instructor._id) },
        },
      ],
    }),
    ChatModel.find({
      $or: [
        {
          user1: userId,
          user2: { $in: tas.map((ta) => ta._id) },
        },
        {
          user2: userId,
          user1: { $in: tas.map((ta) => ta._id) },
        },
      ],
    }),
  ]);

  const results: ContactType[] = [];

  // for (const student of students) {
  //   results.push({
  //     fullName: student.fullName,
  //     role: RoleEnum[1],
  //     id: student.user.toString(),
  //     chat: await formatContactChat({
  //       chats: studentChats,
  //       myUserId: userId!,
  //       otherUserId: student.user.toString(),
  //     }),
  //   });
  // }

  for (const instructor of instructors) {
    results.push({
      fullName: instructor.fullName,
      role: RoleEnum[3],
      id: instructor.user.toString(),
      chat: await formatContactChat({
        chats: instructorChats,
        myUserId: userId!,
        otherUserId: instructor.user.toString(),
      }),
    });
  }

  for (const ta of tas) {
    results.push({
      fullName: ta.fullName,
      role: RoleEnum[4],
      id: ta.user.toString(),
      chat: await formatContactChat({
        chats: taChats,
        myUserId: userId!,
        otherUserId: ta.user.toString(),
      }),
    });
  }

  console.log("results", results);

  return results;
}
