import Schedule from "@/components/Schedule";
import { getAccessToken, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { instructorsAPI, scheduleAPI as schedulesAPI, slotsAPI } from "@/api";
import { revalidatePath } from "next/cache";

const getInstructor = async () => {
  const accessToken = await getAccessToken();

  const response = await instructorsAPI.get(`/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch instructor");

  revalidatePath("/");

  return response.data;
};

export const getSlots = async () => {
  const { data: slotData } = await slotsAPI.get("/");
  return slotData;
};

const getMySchedule = async () => {
  const accessToken = await getAccessToken();
  const { data } = await schedulesAPI.get("/instructor", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!data) throw new Error("Failed to fetch schedule");

  return data;
};

export default async function Page() {
  const t = await getI18n();
  const locale = getCurrentLocale();

  const { instructor } = await getInstructor();

  const { schedule } = await getMySchedule();
  const { slots, timeRanges, days } = await getSlots();

  console.log(schedule);

  return (
    <>
      <div className="flex items-center justify-between pb-4 w-full">
        <div className="flex flex-col gap-4">
          <h2 className="flex gap-4 items-center">
            {t("home.greeting", {
              name: instructor.fullName.split(" ")[0],
            })}
          </h2>
          <div className="flex gap-2">
            <p className="rounded-lg bg-slate-100 text-slate-500 px-4 py-2">
              {instructor.email}
            </p>
            <p className="rounded-lg bg-blue-100 text-blue-500 px-4 py-2">
              {instructor.officeHours}
            </p>
            <p className="rounded-lg bg-blue-100 text-blue-500 px-4 py-2">
              {tt(locale, instructor.department.name)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-col py-4 w-full">
        <h2>{t("home.schedule")}</h2>
        <Schedule
          days={days}
          slots={slots}
          timeRanges={timeRanges}
          schedule={schedule}
        />
      </div>
    </>
  );
}
