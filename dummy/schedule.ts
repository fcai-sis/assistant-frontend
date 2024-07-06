import { DummyCourse } from "./courses";
import { DummyHall, dummyHalls } from "./halls";
import { DummySlot, dummySlots } from "./slots";

export type DummyInstructor = {
  fullName: string;
};

export type DummyTA = {
  fullName: string;
};

export type DummyScheduleCourse = Omit<
  DummyCourse,
  "description" | "creditHours" | "departments" | "courseType"
>;

export type DummyLecture = {
  course: DummyScheduleCourse;
  instructor: DummyInstructor;
};

export type DummySection = {
  course: DummyScheduleCourse;
  instructor: DummyInstructor;
  group: string;
};

export type DummySchedule =
  | {
      slot: DummySlot;
      hall: DummyHall;
      lecture: DummyLecture;
      type: "lecture";
    }
  | {
      slot: DummySlot;
      hall: DummyHall;
      secion: DummySection;
      type: "section";
    };

export const dummySchedule: DummySchedule[] = [
  {
    slot: dummySlots[0],
    hall: dummyHalls[0],
    type: "lecture",
    lecture: {
      course: {
        code: "CS101",
        name: {
          en: "Introduction to Computer Science",
          ar: "مقدمة في علوم الحاسوب",
        },
      },
      instructor: {
        fullName: "Dr. John Doe",
      },
    },
  },
  {
    slot: dummySlots[0],
    hall: dummyHalls[1],
    type: "lecture",
    lecture: {
      course: {
        code: "FS231",
        name: {
          en: "Introduction to Computer Basics",
          ar: "مقدمة في علوم الحاسوب",
        },
      },
      instructor: {
        fullName: "Dr. John Doe",
      },
    },
  },
  {
    slot: dummySlots[12],
    hall: dummyHalls[2],
    type: "lecture",
    lecture: {
      course: {
        code: "CS201",
        name: {
          en: "Data Structures and Algorithms",
          ar: "هياكل البيانات والخوارزميات",
        },
      },
      instructor: {
        fullName: "Dr. Jane Smith",
      },
    },
  },
  {
    slot: dummySlots[22],
    hall: dummyHalls[3],
    type: "section",
    secion: {
      group: "S1/S2",
      course: {
        code: "CS301",
        name: {
          en: "Software Engineering",
          ar: "هندسة البرمجيات",
        },
      },
      instructor: {
        fullName: "Dr. Mark Johnson",
      },
    },
  },
  {
    slot: dummySlots[3],
    hall: dummyHalls[4],
    type: "lecture",
    lecture: {
      course: {
        code: "CS401",
        name: {
          en: "Artificial Intelligence",
          ar: "الذكاء الاصطناعي",
        },
      },
      instructor: {
        fullName: "Dr. Sarah Williams",
      },
    },
  },
] as const;

export default dummySchedule;
