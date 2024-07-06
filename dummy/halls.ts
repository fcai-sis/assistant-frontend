export type DummyHall = {
  name: {
    en: string;
    ar: string;
  };
  capacity: number;
};

export const dummyHalls: DummyHall[] = [
  {
    capacity: 100,
    name: {
      en: "Hall 1",
      ar: "قاعة 1",
    },
  },
  {
    capacity: 100,
    name: {
      en: "Hall 2",
      ar: "قاعة 2",
    },
  },
  {
    capacity: 100,
    name: {
      en: "Hall 3",
      ar: "قاعة 3",
    },
  },
  {
    capacity: 100,
    name: {
      en: "Hall 4",
      ar: "قاعة 4",
    },
  },
  {
    capacity: 100,
    name: {
      en: "Hall 5",
      ar: "قاعة 5",
    },
  },
  {
    capacity: 100,
    name: {
      en: "Hall 6",
      ar: "قاعة 6",
    },
  },
  {
    capacity: 100,
    name: {
      en: "Hall 7",
      ar: "قاعة 7",
    },
  },
] as const;
