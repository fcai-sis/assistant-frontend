import { ServiceRequestStatusEnum } from "@fcai-sis/shared-models";

export const dummyServiceRequests = [
  {
    serviceName: "طلب عذر او ايقاف قيد (بكالوريوس)",
    status: ServiceRequestStatusEnum[0],
    image: "https://picsum.photos/200",
    createdAt: new Date("2021-01-01T00:00:00Z"),
  },
  {
    serviceName: "بيان حالة دراسية (بكالوريوس)",
    status: ServiceRequestStatusEnum[1],
    image: "https://picsum.photos/200",
    createdAt: new Date("2021-01-02T00:00:00Z"),
  },
  {
    serviceName: "مظروف طلاب مستجدين - برامج خاصة (بكالوريوس)",
    status: ServiceRequestStatusEnum[3],
    image: "https://picsum.photos/200",
    createdAt: new Date("2021-01-04T00:00:00Z"),
    message: "مطلوب توثيق الشهادة الثانوية",
  },
  {
    serviceName: "شهادة حسن سير وسلوك (بكالوريوس)",
    status: ServiceRequestStatusEnum[2],
    image: "https://picsum.photos/200",
    createdAt: new Date("2021-01-03T00:00:00Z"),
    claimAt: new Date("2024-06-26T00:00:00Z"),
  },
];
