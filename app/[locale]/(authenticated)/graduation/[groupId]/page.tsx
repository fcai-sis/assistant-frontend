import { getCurrentLocale } from "@/locales/server";
import {
  getGraduationProjectEnrollments,
  getGraduationProjectTeachings,
} from "../page";
import { getAccessToken } from "@/lib";
import { graduationAPI } from "@/api";
import { revalidatePath } from "next/cache";
import UpdateGraduationForm from "./UpdateGraduationForm";
import { I18nProviderClient } from "@/locales/client";
import DeleteGraduationForm from "./DeleteGraduationForm";

export const getGraduationProject = async (groupId: string) => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/${groupId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch graduation project");
  }

  revalidatePath("/graduation");

  return response.data;
};

export default async function Page({
  params: { groupId },
}: Readonly<{ params: { locale: string; groupId: string } }>) {
  const locale = getCurrentLocale();

  const group = await getGraduationProject(groupId);
  const { enrollments } = await getGraduationProjectEnrollments();
  const { instructorTeachings, taTeachings } =
    await getGraduationProjectTeachings();

  return (
    <>
      <I18nProviderClient locale={locale}>
        <UpdateGraduationForm
          group={group}
          enrollments={enrollments}
          instructorTeachings={instructorTeachings}
          assistantTeachings={taTeachings}
        />
      </I18nProviderClient>
    </>
  );
}
