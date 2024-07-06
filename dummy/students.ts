import {
  GenderEnum,
  GenderEnumType,
  NationalityEnum,
  NationalityEnumType,
  ProgramEnum,
  ReligionEnum,
  ReligionEnumType,
  ScientificDivisionEnum,
} from "@fcai-sis/shared-models";
import { DummyDepartment, dummyDepartments } from "./departments";

export type DummyStudent = {
  address: string;
  administration: string;
  birthDay: number;
  birthMonth: number;
  birthPlace: string;
  birthYear: number;
  directorate: string;
  educationType: string;
  fullName: string;
  gender: GenderEnumType;
  governorateId: number;
  nationalId: string;
  nationality: NationalityEnumType;
  phoneNumber: string;
  religion: ReligionEnumType;
  scientificDivision: string;
  studentId: string;
  gpa: number;
  level: number;
  major: DummyDepartment;
  creditHours: number;
}[];

export const dummyStudents: DummyStudent = [
  {
    address: "٢٢ شارع عامر، الدقي، الجيزة",
    administration: "الدقي",
    birthDay: 12,
    birthMonth: 12,
    birthPlace: "Cairo",
    birthYear: 1999,
    directorate: "الجيزة",
    educationType: "ثانوي",
    fullName: "يوسف جلال الدين ناظم حيدر الطائي",
    gender: GenderEnum[0],
    governorateId: 21,
    nationalId: "20304162100315",
    nationality: NationalityEnum[0],
    phoneNumber: "01241352622",
    religion: ReligionEnum[0],
    scientificDivision: ScientificDivisionEnum[1],
    studentId: "20200645",
    gpa: 3.2,
    level: 1,
    major: {
      name: {
        en: "General",
        ar: "عام",
      },
      program: ProgramEnum[0],
      capacity: 100,
      code: "GN",
    },
    creditHours: 16,
  },
  {
    address: "٣٣ جابر بن حيان الدقي، الجيزة",
    administration: "الدقي",
    birthDay: 3,
    birthMonth: 2,
    birthPlace: "Cairo",
    birthYear: 2000,
    directorate: "الجيزة",
    educationType: "ثانوي",
    fullName: "محمد علي الحسيني",
    gender: GenderEnum[0],
    governorateId: 21,
    nationalId: "20004162100315",
    nationality: NationalityEnum[0],
    phoneNumber: "01241352622",
    religion: ReligionEnum[0],
    scientificDivision: ScientificDivisionEnum[1],
    studentId: "20200123",
    gpa: 3.2,
    level: 1,
    major: dummyDepartments[0],
    creditHours: 80,
  },
] as const;
