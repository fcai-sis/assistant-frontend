import { coursesAPI, departmentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import { SelectFilter } from "@/components/SetQueryFilter";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { getCurrentLocale } from "@/locales/server";
import { DepartmentType } from "@fcai-sis/shared-models";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const getCourses = async (page: number, department: DepartmentType) => {
  const accessToken = await getAccessToken();

  const response = await coursesAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip: page * limit - limit,
      limit,
      department,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch courses");

  revalidatePath("/courses");

  return response.data;
};

export const getDepartments = async () => {
  const accessToken = await getAccessToken();
  const response = await departmentsAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch departments");

  revalidatePath("/department");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const locale = getCurrentLocale();
  const page = getCurrentPage(searchParams);
  const departmentSelected =
    searchParams.department as unknown as DepartmentType;

  const response = await getCourses(page, departmentSelected);
  const courses = response.courses;
  const total = response.totalCourses;

  const departmentResponse = await getDepartments();
  const departments = departmentResponse.departments;

  const departmentOptions = [
    {
      label: tt(locale, { en: "All Departments", ar: "جميع الأقسام" }),
      value: "",
    },
    ...departments.map((department: any) => ({
      label: tt(locale, department.name),
      value: department.code,
    })),
  ];

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-3xl font-bold mb-4'>
        {tt(locale, {
          en: "Courses",
          ar: "المقررات",
        })}
      </h1>
      <div className='mb-4'>
        <SelectFilter name='department' options={departmentOptions} />
      </div>
      <div className='flex flex-col gap-4'>
        {courses.map((course: any) => (
          <div
            key={course.code}
            className='border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'
          >
            <p className='font-semibold'>
              <span className='font-bold'>
                {tt(locale, {
                  en: "Code: ",
                  ar: "الرمز: ",
                })}{" "}
              </span>
              {course.code}
            </p>
            <p className='font-semibold'>
              <span className='font-bold'>
                {tt(locale, {
                  en: "Name: ",
                  ar: "الاسم: ",
                })}{" "}
              </span>
              {tt(locale, course.name)}
            </p>
            <p className='font-semibold'>
              <span className='font-bold'>
                {tt(locale, {
                  en: "Departments: ",
                  ar: "الأقسام: ",
                })}{" "}
              </span>
              {course.departments?.map((department: any) => (
                <span key={department.code} className='mr-1'>
                  {tt(locale, department.name)}
                </span>
              ))}
            </p>
            <Link
              className='mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300'
              href={`/courses/${course.code}`}
            >
              {tt(locale, {
                en: "View Details",
                ar: "عرض التفاصيل",
              })}
            </Link>
          </div>
        ))}
      </div>
      <div className='mt-4'>
        <Pagination totalPages={total / limit} />
      </div>
    </div>
  );
}
