import { SemesterSeasonEnum } from "@fcai-sis/shared-models";

export const dummySemesters = [
  {
    month: 1,
    year: 2021,
    createdAt: new Date("2021-01-01"),
    season: SemesterSeasonEnum[0],
  },
  {
    month: 6,
    year: 2021,
    createdAt: new Date("2021-06-01"),
    season: SemesterSeasonEnum[1],
  },
  {
    month: 1,
    year: 2022,
    createdAt: new Date("2022-01-01"),
    season: SemesterSeasonEnum[0],
  },
  {
    month: 6,
    year: 2022,
    createdAt: new Date("2022-06-01"),
    season: SemesterSeasonEnum[1],
  },
] as const;
