import { coursesAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";

export const getSelectedCourse = async (code: string) => {
  const accessToken = await getAccessToken();

  const response = await coursesAPI.get(`/${code}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch course");

  revalidatePath("/courses");

  return response.data;
};

export default async function Page({
  params: { code },
}: Readonly<{
  params: { code: string };
}>) {
  const response = await getSelectedCourse(code);
  const course = response.course;
  return (
    <>
      <h1>{course.name.en}</h1>
      <p>{course.description.en}</p>
    </>
  );
}
