import { DayEnum, DayEnumType } from "@fcai-sis/shared-models";
import moment from "moment";

export const dummySlots: DummySlot[] = [
  ...Array.from({ length: Object.keys(DayEnum).length }, (_, index) => {
    const day = DayEnum[index];
    const slotsPerDay = 6;
    const slotDuration = 90; // in minutes
    const breakDuration = 15; // in minutes
    const startTime = { hour: 8, minute: 0 };
    const slots = [];

    for (let i = 0; i < slotsPerDay; i++) {
      const momentStartTime = moment(startTime).add(
        i * (slotDuration + breakDuration),
        "minutes"
      );
      const startHour = momentStartTime.hour();
      const startMinute = momentStartTime.minute();
      const momentEndTime = momentStartTime.add(slotDuration, "minutes");
      const endHour = momentEndTime.hour();
      const endMinute = momentEndTime.minute();

      slots.push({
        day: day,
        start: { hour: startHour, minute: startMinute },
        end: { hour: endHour, minute: endMinute },
      });
    }

    return slots;
  }).flat(),
] as const;

export const dummyTimeRanges = dummySlots
  .filter((slot) => slot.day === DayEnum[0])
  .map((slot) => ({
    ...slot,
    day: undefined,
  }));

export const dummySlotsByDay: Record<DayEnumType, DummySlot[]> = {
  [DayEnum[0]]: dummySlots.filter((slot) => slot.day === DayEnum[0]),
  [DayEnum[1]]: dummySlots.filter((slot) => slot.day === DayEnum[1]),
  [DayEnum[2]]: dummySlots.filter((slot) => slot.day === DayEnum[2]),
  [DayEnum[3]]: dummySlots.filter((slot) => slot.day === DayEnum[3]),
  [DayEnum[4]]: dummySlots.filter((slot) => slot.day === DayEnum[4]),
  [DayEnum[5]]: dummySlots.filter((slot) => slot.day === DayEnum[5]),
  [DayEnum[6]]: dummySlots.filter((slot) => slot.day === DayEnum[6]),
};

export type DummySlot = {
  day: DayEnumType;
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
};
