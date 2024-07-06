import { DummyLecture, DummySection } from "@/dummy/schedule";
import { DummySlot } from "@/dummy/slots";
import { tt } from "@/lib";
import { DayEnumType, dayLocalizedEnum } from "@fcai-sis/shared-models";
import { getCurrentLocale } from "@/locales/server";
import { DummyHall } from "@/dummy/halls";

/**
 * e.g.
 * formatSlotTime({
 *   day: DayEnum[0],
 *   startTime: { hour: 19, minute: 0 },
 *   endTime: { hour: 20, minute: 30 }
 * })
 * @param slot - The slot to format its time
 * @returns 7:00 PM - 8:30 PM
 */
function formatSlotTime(slot: any) {
  const startTimeAmPm = slot.start.hour >= 12 ? "PM" : "AM";
  const endTimeAmPm = slot.end.hour >= 12 ? "PM" : "AM";
  const startTimeHour = slot.start.hour % 12 || 12;
  const endTimeHour = slot.end.hour % 12 || 12;

  return `${startTimeHour}:${slot.start.minute
    .toString()
    .padStart(2, "0")} ${startTimeAmPm} - ${endTimeHour}:${slot.end.minute
    .toString()
    .padStart(2, "0")} ${endTimeAmPm}`;
}

function isSameSlot(slot1: DummySlot, slot2: DummySlot): boolean {
  return (
    slot1.day === slot2.day &&
    slot1.start.hour === slot2.start.hour &&
    slot1.start.minute === slot2.start.minute &&
    slot1.end.hour === slot2.end.hour &&
    slot1.end.minute === slot2.end.minute
  );
}

export type ScheduleProps = {
  slots: Record<DayEnumType, DummySlot[]>;
  days: { day: DayEnumType }[];
  timeRanges: {
    day: undefined;
    start: {
      hour: number;
      minute: number;
    };
    end: {
      hour: number;
      minute: number;
    };
  }[];
  schedule: any[];
};

export default function Schedule({
  days,
  timeRanges,
  slots,
  schedule,
}: ScheduleProps) {
  const locale = getCurrentLocale();
  return (
    <div className="table border-separate border-spacing-2 w-full">
      <div className="table-header-group">
        <div className="table-row">
          <div className="table-cell p-2"></div>
          {timeRanges.map((timeRange) => (
            <div
              className="table-cell rounded-lg p-2 bg-white border border-slate-200 text-center"
              key={JSON.stringify(timeRange)}
            >
              <p dir="ltr">
                {formatSlotTime(timeRange as unknown as DummySlot)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {days.map(({ day: currentDay }) => (
        <div className="table-row" key={currentDay}>
          <div className="table-cell rounded-lg p-2 bg-white border border-slate-200">
            {tt(locale, dayLocalizedEnum[currentDay as DayEnumType])}
          </div>
          {timeRanges.map((currentTimeRange, index) => (
            <>
              {(() => {
                // find all items that have the same slot and check if they are lectures or sections
                const items = schedule.filter((item) =>
                  isSameSlot(item.slot, {
                    day: currentDay,
                    start: currentTimeRange.start,
                    end: currentTimeRange.end,
                  })
                );

                if (items.length === 0)
                  return (
                    <div
                      className="table-cell bg-slate-100 rounded-lg"
                      key={index}
                    >
                      {" "}
                    </div>
                  );

                // map each item to a form based on its type
                return items.map((item, index) => {
                  if (item.type === "lecture") {
                    return (
                      <LectureSlot
                        key={index}
                        lecture={item.lecture}
                        hall={item.hall}
                      />
                    );
                  } else if (item.type === "section") {
                    return (
                      <SectionSlot
                        key={index}
                        section={item.secion}
                        hall={item.hall}
                      />
                    );
                  } else {
                    return "Invalid type";
                  }
                });
              })()}
            </>
          ))}
        </div>
      ))}
    </div>
  );
}

type LectureSlotProps = Readonly<{
  lecture: DummyLecture;
  hall: DummyHall;
}>;
function LectureSlot({ lecture, hall }: LectureSlotProps) {
  const locale = getCurrentLocale();
  return (
    <div className="p-2 m-1 rounded-lg bg-white border border-slate-200">
      <p>
        <small className="text-slate-400">
          {tt(locale, { en: "Lecture", ar: "محاضرة" })}
        </small>
      </p>
      <p>{tt(locale, lecture.course.name)}</p>
      {/* <p>{lecture.course.code}</p> */}
      {/* <p>{lecture.instructor.fullName}</p> */}
      <p className="flex py-1">
        <small className="rounded-lg bg-blue-100 text-blue-500 p-2">
          {tt(locale, hall.name)}
        </small>
      </p>
    </div>
  );
}

type SectionSlotProps = Readonly<{
  section: DummySection;
  hall: DummyHall;
}>;
function SectionSlot({ section, hall }: SectionSlotProps) {
  const locale = getCurrentLocale();
  return (
    <div className="p-2 m-1 rounded-lg bg-white border border-slate-200">
      <p>
        <small className="text-slate-400">
          {tt(locale, { en: "Section", ar: "مجموعة" })}
        </small>
      </p>
      <p>{tt(locale, section.course.name)}</p>
      {/* <p>{section.course.code}</p> */}
      {/* <p>{section.instructor.fullName}</p> */}
      <p className="flex py-1 gap-2">
        <small className="rounded-lg bg-blue-100 text-blue-500 p-2">
          {tt(locale, hall.name)}
        </small>
        <small className="rounded-lg bg-blue-100 text-blue-500 p-2">
          {section.group}
        </small>
      </p>
    </div>
  );
}
