import { AnnouncementSeveritiesEnum } from "@fcai-sis/shared-models";
import { dummyDepartments } from "./departments";
import { dummyEmployees } from "./employees";

const author = { fullName: dummyEmployees[0].fullName };

export const dummyAnnouncements = [
  {
    archived: false,
    author: { ...author },
    content:
      "تم تحديث الخطة الدراسية للفصل الدراسي الثاني من العام الجامعي 2021/2022",
    title: "تحديث الخطة الدراسية",
    createdAt: new Date("2022-01-01"),
    severity: AnnouncementSeveritiesEnum[0],
  },
  {
    archived: false,
    author: { ...author },
    content: "سيتم تعطيل النظام الإلكتروني يوم الأحد 2 يناير 2022",
    title: "إجازة عيد الأضحى",
    createdAt: new Date("2022-01-02"),
    severity: AnnouncementSeveritiesEnum[1],
  },
  {
    archived: false,
    author: { ...author },
    content: "على جميع الطلاب بقسم علوم الحاسب التوجه للقسم لاستلام الكتب",
    title: "استلام الكتب",
    createdAt: new Date("2022-01-03"),
    severity: AnnouncementSeveritiesEnum[0],
    departments: [dummyDepartments[0]],
  },
  {
    archived: false,
    author: { ...author },
    content: "على جميع الطلاب التوجه لدفع الرسوم الدراسية",
    title: "دفع الرسوم",
    createdAt: new Date("2022-01-03"),
    severity: AnnouncementSeveritiesEnum[1],
  },
  {
    archived: false,
    author: { ...author },
    content: "طلاب الفرقة الأولى يجب عليهم تسليم الأوراق المطلوبة للتسجيل",
    title: "تسليم الأوراق",
    createdAt: new Date("2022-01-03"),
    severity: AnnouncementSeveritiesEnum[2],
    levels: [1, 2],
  },
];
