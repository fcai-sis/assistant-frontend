import { localizedLevel } from "@/dummy/utils";
import { CreatedAt } from "./CreatedAt";
import { tt } from "@/lib";
import { getCurrentLocale } from "@/locales/server";
import { AnnouncementSeveritiesEnum } from "@fcai-sis/shared-models";
import {
  InfoCircle,
  WarningHexagon,
  WarningTriangle,
  XmarkCircle,
} from "iconoir-react";

export default async function AnnouncementCard({
  announcement,
}: {
  announcement: any;
}) {
  const locale = getCurrentLocale();
  const severityColor =
    announcement.severity === AnnouncementSeveritiesEnum[0]
      ? "bg-blue-100"
      : announcement.severity === AnnouncementSeveritiesEnum[1]
      ? "bg-yellow-100"
      : "bg-red-100";
  // "bg-white";

  const icon =
    announcement.severity === AnnouncementSeveritiesEnum[0] ? (
      <small className='bg-blue-100 text-blue-500 rounded-full px-2 py-1 flex gap-2'>
        <InfoCircle className='[&>*]:stroke-blue-500' />
        {tt(locale, {
          en: "Info",
          ar: "معلومة",
        })}
      </small>
    ) : announcement.severity === AnnouncementSeveritiesEnum[1] ? (
      <small className='bg-yellow-100 text-yellow-500 rounded-full px-2 py-1 flex gap-2'>
        <WarningTriangle className='[&>*]:stroke-yellow-500' />
        {tt(locale, {
          en: "Warning",
          ar: "تحذير",
        })}
      </small>
    ) : (
      <small className='bg-red-100 text-red-500 rounded-full px-2 py-1 flex gap-2'>
        <WarningHexagon className='[&>*]:stroke-red-500' />
        {tt(locale, {
          en: "Important",
          ar: "مهم",
        })}
      </small>
    );

  return (
    <div
      className={`rounded-lg w-full p-4 bg-white border border-slate-200 my-2`}
    >
      <div className='flex items-center gap-2'>
        {icon}
        <h5>{announcement.title}</h5>
      </div>
      <p className='text-gray-600 my-4'>{announcement.content}</p>
      <div className='flex flex-wrap gap-2'>
        {announcement.levels ? (
          announcement.levels.map((level: any, index: number) => (
            <LevelChip key={index} level={level} />
          ))
        ) : (
          <LevelChip level={0} />
        )}
        {announcement.departments ? (
          announcement.departments.map((department: any) => (
            <DepartmentChip key={department.code} department={department} />
          ))
        ) : (
          <DepartmentChip
            department={{
              name: {
                en: "All Departments",
                ar: "جميع الأقسام",
              },
            }}
          />
        )}
      </div>
      <div className='w-full mt-4 text-start text-gray-500'>
        <CreatedAt date={announcement.createdAt} />
      </div>
    </div>
  );
}

export function DepartmentChip({ department }: { department: any }) {
  const locale = getCurrentLocale();
  return (
    <small className='rounded-lg px-2 py-1 border border-blue-500 text-blue-500'>
      {tt(locale, department.name)}
    </small>
  );
}

export function LevelChip({ level }: { level: number }) {
  const locale = getCurrentLocale();
  return (
    <small className='rounded-lg px-2 py-1 border border-blue-500 text-blue-500'>
      {tt(locale, localizedLevel(level))}
    </small>
  );
}
