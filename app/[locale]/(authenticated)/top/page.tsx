import { departmentsAPI, statisticsAPI } from "@/api";
import { SelectFilter } from "@/components/SetQueryFilter";
import { tt } from "@/lib";
import { getCurrentLocale } from "@/locales/server";
import { localizedLevel } from "@/dummy/utils";

export const getDepartments = async () => {
  const response = await departmentsAPI.get("/");
  if (response.status !== 200) throw new Error("Failed to fetch departments");
  return response.data;
};

async function getTopStudents(filter: {
  major?: string;
  level?: number;
  limit?: number;
}) {
  const response = await statisticsAPI.get("/students/top", {
    params: {
      ...filter,
    },
  });

  if (response.status !== 200) return { students: [] };
  return response.data;
}

export default async function Page({
  searchParams: { major, level },
}: {
  searchParams: {
    major?: string;
    level?: number;
  };
}) {
  const locale = getCurrentLocale();
  const { students } = await getTopStudents({
    major,
    level,
    limit: 10,
  });

  const { departments } = await getDepartments();
  const departmentOptions = [
    {
      value: "",
      label: tt(locale, {
        en: "All Departments",
        ar: "جميع الأقسام",
      }),
    },
    {
      value: "GENERAL",
      label: tt(locale, {
        en: "General",
        ar: "عام",
      }),
    },
    ...departments.map((department: any) => ({
      value: department.id,
      label: department.code,
    })),
  ];

  const levelOptions = Array.from({ length: 4 }, (_, i) => i + 1).map((i) => ({
    value: `${i}`,
    label: tt(locale, localizedLevel(i)),
  }));

  return (
    <>
      <h1>
        {tt(locale, {
          en: "Top Students",
          ar: "أفضل الطلاب",
        })}
      </h1>
      <div className='mt-8'>
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            <label
              className='block text-sm font-medium text-gray-700'
              htmlFor='major'
            >
              {tt(locale, {
                en: "Major",
                ar: "التخصص",
              })}
            </label>
            <SelectFilter name='major' options={departmentOptions} />
          </div>
          <div className='flex items-center gap-2'>
            <label
              className='block text-sm font-medium text-gray-700'
              htmlFor='level'
            >
              {tt(locale, {
                en: "Level",
                ar: "المستوى",
              })}
            </label>
            <SelectFilter name='level' options={levelOptions} />
          </div>
        </div>
      </div>
      <div className='overflow-x-auto mt-8'>
        <table className='min-w-full divide-y divide-slate-200'>
          <thead className='bg-slate-50'>
            <tr>
              <th className='px-2 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider'>
                #
              </th>
              <th className='px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider'>
                {tt(locale, {
                  en: "Name",
                  ar: "الاسم",
                })}
              </th>
              <th className='px-2 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider'>
                {tt(locale, {
                  en: "GPA",
                  ar: "المعدل",
                })}
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: any, index: number) => (
              <tr key={index}>
                <td className='px-2 py-3 text-startleft text-xs font-medium text-slate-600 uppercase tracking-wider'>
                  {index + 1}
                </td>
                <td className='px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider'>
                  {student.fullName}
                </td>
                <td className='px-2 py-3 text-startleft text-xs font-medium text-slate-600 uppercase tracking-wider'>
                  {student.gpa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
