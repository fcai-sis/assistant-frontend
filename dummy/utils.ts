import {
  AnnouncementSeveritiesEnum,
  AnnouncementSeverityEnumType,
} from "@fcai-sis/shared-models";
import mongoose from "mongoose";

export type DummyDocument<T> = T & { _id: mongoose.Schema.Types.ObjectId };
export type DummyCollection<T> = DummyDocument<T>[];

export const createDocument = <T>(doc: T): DummyDocument<T> => ({
  ...doc,
  _id: new mongoose.Schema.Types.ObjectId(
    new mongoose.Types.ObjectId().toString()
  ),
});

export const createCollection = <T>(docs: T[]): DummyCollection<T> =>
  docs.map(createDocument);

export const fakeResponse = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

export function localizedLevel(level: number) {
  switch (level) {
    case 1:
      return {
        en: "Freshman",
        ar: "المستوى الأول",
      };
    case 2:
      return {
        en: "Sophomore",
        ar: "المستوى الثاني",
      };
    case 3:
      return {
        en: "Junior",
        ar: "المستوى الثالث",
      };
    case 4:
      return {
        en: "Senior",
        ar: "المستوى الرابع",
      };
    default:
      return {
        en: "Unknown",
        ar: "غير معروف",
      };
  }
}

export function localizedSeverity(severity: AnnouncementSeverityEnumType) {
  switch (severity) {
    case AnnouncementSeveritiesEnum[0]:
      return {
        en: "Info",
        ar: "معلومة",
      };
    case AnnouncementSeveritiesEnum[1]:
      return {
        en: "Warning",
        ar: "تحذير",
      };
    case AnnouncementSeveritiesEnum[2]:
      return {
        en: "Critical",
        ar: "حرج",
      };
    default:
      return {
        en: "Unknown",
        ar: "غير معروف",
      };
  }
}
