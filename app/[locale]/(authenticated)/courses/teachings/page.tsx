import { scheduleAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import Card from "@/components/Card";

export const getInstructorTeachings = async (page?: number) => {
  const accessToken = await getAccessToken();

  const response = await scheduleAPI.get(`/instructor-teaching/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip: page ? page * limit - limit : 0,
      limit,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch teachings");

  revalidatePath("/teachings");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string } }>) {
  const t = await getI18n();
  const locale = getCurrentLocale();

  const page = getCurrentPage(searchParams);

  const response = await getInstructorTeachings(page);
  const teachings = response.myTeachings;
  const totalTeachings = response.totalTeachings;

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-3xl font-bold mb-4'>{t("myCourses.title")}</h1>
      <div className='flex flex-col gap-4'>
        {teachings.map((teaching: any) => (
          <Card key={teaching.course.code}>
            <h2 className='text-xl font-bold mb-2'>
              {tt(locale, teaching.course.name)}
            </h2>
            <p className='font-semibold'>
              <span className='font-bold'>
                {tt(locale, {
                  en: "Code: ",
                  ar: "الرمز: ",
                })}{" "}
              </span>
              {teaching.course.code}
            </p>
            <p className='font-semibold'>
              <span className='font-bold'>
                {tt(locale, {
                  en: "Name: ",
                  ar: "الاسم: ",
                })}{" "}
              </span>
              {tt(locale, teaching.course.name)}
            </p>
            <p className='font-semibold'>
              <span className='font-bold'>
                {tt(locale, {
                  en: "Credit Hours: ",
                  ar: "عدد الساعات:",
                })}{" "}
              </span>
              {teaching.course.creditHours}
            </p>
            <div className='flex justify-center'>
              <Link
                className='mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300'
                href={`/courses/teachings/${teaching.course.code}`}
              >
                {tt(locale, {
                  en: "View Enrolled Students",
                  ar: "عرض الطلاب المسجلين",
                })}
              </Link>
            </div>
          </Card>
        ))}
      </div>
      <div className='mt-4'>
        <Pagination totalPages={totalTeachings / limit} />
      </div>
    </div>
  );
}
