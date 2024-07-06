import { ProgramEnum, ProgramEnumType } from "@fcai-sis/shared-models";

export type DummyDepartment = {
  capacity: number;
  code: string;
  name: {
    en: string;
    ar: string;
  };
  program: ProgramEnumType;
};

export const dummyDepartments: DummyDepartment[] = [
  {
    capacity: 100,
    code: "CS",
    name: {
      en: "Computer Science",
      ar: "علوم الحاسب",
    },
    program: ProgramEnum[0],
  },
  {
    capacity: 100,
    code: "IS",
    name: {
      en: "Information Systems",
      ar: "نظم المعلومات",
    },
    program: ProgramEnum[0],
  },
  {
    capacity: 100,
    code: "IT",
    name: {
      en: "Information Technology",
      ar: "تكنولوجيا المعلومات",
    },
    program: ProgramEnum[0],
  },
  {
    capacity: 100,
    code: "AI",
    name: {
      en: "Artificial Intelligence",
      ar: "الذكاء الصناعي",
    },
    program: ProgramEnum[0],
  },
  {
    capacity: 100,
    code: "DS",
    name: {
      en: "Decision Support",
      ar: "دعم القرار",
    },
    program: ProgramEnum[0],
  },
  // {
  //   capacity: 100,
  //   code: "SE",
  //   name: {
  //     en: "Software Engineering",
  //     ar: "هندسة البرمجيات",
  //   },
  //   program: ProgramEnum[1],
  // },
  // {
  //   capacity: 100,
  //   code: "BI",
  //   name: {
  //     en: "Bioinformatics",
  //     ar: "هندسة الحاسب",
  //   },
  //   program: ProgramEnum[1],
  // },
  // {
  //   capacity: 100,
  //   code: "CSE",
  //   name: {
  //     en: "Cyber Security",
  //     ar: "أمن المعلومات",
  //   },
  //   program: ProgramEnum[1],
  // },
  // {
  //   capacity: 100,
  //   code: "DSC",
  //   name: {
  //     en: "Data Science",
  //     ar: "علم البيانات",
  //   },
  //   program: ProgramEnum[1],
  // },
] as const;
