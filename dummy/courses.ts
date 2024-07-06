import { CourseTypeEnum, CourseTypeEnumType } from "@fcai-sis/shared-models";
import { DummyDepartment, dummyDepartments } from "./departments";

export type DummyCourse = {
  code: string;
  name: {
    en: string;
    ar: string;
  };
  creditHours: number;
  courseType: CourseTypeEnumType;
  description: {
    en: string;
    ar: string;
  };
  departments?: DummyDepartment[];
  groups?: string[];
};

export const dummyCourses: DummyCourse[] = [
  {
    code: "CS101",
    name: {
      en: "Introduction to Computer Science",
      ar: "مقدمة في علم الحاسب",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to the field of computer science and programming.",
      ar: "يقدم هذا المقرر للطلاب مقدمة في مجال علم الحاسب والبرمجة.",
    },
    groups: ["S1/S2", "S3/S4", "S5/S6", "S7/S8"],
  },
  {
    code: "CS102",
    name: {
      en: "Data Structures",
      ar: "هياكل البيانات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to data structures and algorithms.",
      ar: "يقدم هذا المقرر للطلاب هياكل البيانات والخوارزميات.",
    },
    groups: ["S1/S2", "S3/S4"],
  },
  {
    code: "CS103",
    name: {
      en: "Algorithms",
      ar: "الخوارزميات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to algorithms and problem-solving techniques.",
      ar: "يقدم هذا المقرر للطلاب الخوارزميات وتقنيات حل المشاكل.",
    },
    departments: [dummyDepartments[0]],
  },
  {
    code: "CS104",
    name: {
      en: "Computer Organization",
      ar: "تنظيم الحاسب",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to computer organization and assembly language.",
      ar: "يقدم هذا المقرر للطلاب تنظيم الحاسب ولغة التجميع.",
    },
    departments: [dummyDepartments[0], dummyDepartments[1]],
  },
  {
    code: "IS101",
    name: {
      en: "Introduction to Information Systems",
      ar: "مقدمة في نظم المعلومات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to the field of information systems and databases.",
      ar: "يقدم هذا المقرر للطلاب مقدمة في مجال نظم المعلومات وقواعد البيانات.",
    },
  },
  {
    code: "IS102",
    name: {
      en: "Database Management Systems",
      ar: "أنظمة إدارة قواعد البيانات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to database management systems and SQL.",
      ar: "يقدم هذا المقرر للطلاب أنظمة إدارة قواعد البيانات ولغة SQL.",
    },
  },
  {
    code: "IS103",
    name: {
      en: "Information Systems Analysis and Design",
      ar: "تحليل وتصميم نظم المعلومات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to information systems analysis and design.",
      ar: "يقدم هذا المقرر للطلاب تحليل وتصميم نظم المعلومات.",
    },
    departments: [dummyDepartments[1]],
  },
  {
    code: "IS104",
    name: {
      en: "Web Development",
      ar: "تطوير الويب",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to web development technologies and frameworks.",
      ar: "يقدم هذا المقرر للطلاب تقنيات وأطر عمل تطوير الويب.",
    },
    departments: [dummyDepartments[0], dummyDepartments[1]],
  },
  {
    code: "IT101",
    name: {
      en: "Introduction to Information Technology",
      ar: "مقدمة في تكنولوجيا المعلومات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to the field of information technology and networking.",
      ar: "يقدم هذا المقرر للطلاب مقدمة في مجال تكنولوجيا المعلومات والشبكات.",
    },
  },
  {
    code: "IT102",
    name: {
      en: "Networking Fundamentals",
      ar: "أساسيات الشبكات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to networking fundamentals and protocols.",
      ar: "يقدم هذا المقرر للطلاب أساسيات الشبكات والبروتوكولات.",
    },
  },
  {
    code: "IT103",
    name: {
      en: "Information Security",
      ar: "أمن المعلومات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to information security and cryptography.",
      ar: "يقدم هذا المقرر للطلاب أمن المعلومات والتشفير.",
    },
    departments: [dummyDepartments[2]],
  },
  {
    code: "IT104",
    name: {
      en: "Cloud Computing",
      ar: "الحوسبة السحابية",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to cloud computing and virtualization technologies.",
      ar: "يقدم هذا المقرر للطلاب الحوسبة السحابية وتقنيات الافتراض.",
    },
    departments: [dummyDepartments[0], dummyDepartments[2]],
  },
  {
    code: "AI101",
    name: {
      en: "Introduction to Artificial Intelligence",
      ar: "مقدمة في الذكاء الصناعي",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to the field of artificial intelligence and machine learning.",
      ar: "يقدم هذا المقرر للطلاب مقدمة في مجال الذكاء الصناعي والتعلم الآلي.",
    },
  },
  {
    code: "AI102",
    name: {
      en: "Machine Learning",
      ar: "التعلم الآلي",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to machine learning algorithms and techniques.",
      ar: "يقدم هذا المقرر للطلاب خوارزميات وتقنيات التعلم الآلي.",
    },
  },
  {
    code: "AI103",
    name: {
      en: "Deep Learning",
      ar: "التعلم العميق",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to deep learning and neural networks.",
      ar: "يقدم هذا المقرر للطلاب التعلم العميق والشبكات العصبية.",
    },
    departments: [dummyDepartments[3]],
  },
  {
    code: "AI104",
    name: {
      en: "Natural Language Processing",
      ar: "معالجة اللغة الطبيعية",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to natural language processing and text mining.",
      ar: "يقدم هذا المقرر للطلاب معالجة اللغة الطبيعية وتنقيب النصوص.",
    },
    departments: [dummyDepartments[3], dummyDepartments[4]],
  },
  {
    code: "DS101",
    name: {
      en: "Introduction to Decision Support",
      ar: "مقدمة في دعم القرار",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to decision support systems and business intelligence.",
      ar: "يقدم هذا المقرر للطلاب نظم دعم القرار والذكاء التجاري.",
    },
  },
  {
    code: "DS102",
    name: {
      en: "Business Intelligence",
      ar: "الذكاء التجاري",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to business intelligence and data warehousing.",
      ar: "يقدم هذا المقرر للطلاب الذكاء التجاري والتخزين الإلكتروني للبيانات.",
    },
  },
  {
    code: "DS103",
    name: {
      en: "Data Warehousing",
      ar: "تخزين البيانات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to data warehousing and OLAP.",
      ar: "يقدم هذا المقرر للطلاب تخزين البيانات وتحليلها الإلكتروني.",
    },
    departments: [dummyDepartments[4]],
  },
  {
    code: "DS104",
    name: {
      en: "Data Mining",
      ar: "تنقيب البيانات",
    },
    creditHours: 3,
    courseType: CourseTypeEnum[0],
    description: {
      en: "This course introduces students to data mining and predictive analytics.",
      ar: "يقدم هذا المقرر للطلاب تنقيب البيانات والتحليل التنبؤي.",
    },
    departments: [dummyDepartments[4], dummyDepartments[3]],
  },

  // {
  //   code: "SE101",
  //   name: {
  //     en: "Introduction to Software Engineering",
  //     ar: "مقدمة في هندسة البرمجيات",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to software engineering principles and practices.",
  //     ar: "يقدم هذا المقرر للطلاب مبادئ وممارسات هندسة البرمجيات.",
  //   },
  // },
  // {
  //   code: "SE102",
  //   name: {
  //     en: "Software Development",
  //     ar: "تطوير البرمجيات",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to software development methodologies and tools.",
  //     ar: "يقدم هذا المقرر للطلاب منهجيات تطوير البرمجيات والأدوات.",
  //   },
  // },
  // {
  //   code: "SE103",
  //   name: {
  //     en: "Software Testing",
  //     ar: "اختبار البرمجيات",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to software testing techniques and tools.",
  //     ar: "يقدم هذا المقرر للطلاب تقنيات وأدوات اختبار البرمجيات.",
  //   },
  // },
  // {
  //   code: "BI101",
  //   name: {
  //     en: "Introduction to Bioinformatics",
  //     ar: "مقدمة في هندسة الحاسب",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to bioinformatics and computational biology.",
  //     ar: "يقدم هذا المقرر للطلاب مقدمة في مجال هندسة الحاسب والأحياء الحاسوبية.",
  //   },
  // },
  // {
  //   code: "BI102",
  //   name: {
  //     en: "Computational Biology",
  //     ar: "الأحياء الحاسوبية",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to computational biology and bioinformatics tools.",
  //     ar: "يقدم هذا المقرر للطلاب الأحياء الحاسوبية وأدوات هندسة الحاسب.",
  //   },
  // },
  // {
  //   code: "BI103",
  //   name: {
  //     en: "Genomics",
  //     ar: "الجينوميات",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to genomics and gene sequencing techniques.",
  //     ar: "يقدم هذا المقرر للطلاب الجينوميات وتقنيات تسلسل الجينات.",
  //   },
  // },
  // {
  //   code: "CSE101",
  //   name: {
  //     en: "Introduction to Cybersecurity",
  //     ar: "مقدمة في أمن المعلومات",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to cybersecurity and ethical hacking.",
  //     ar: "يقدم هذا المقرر للطلاب مقدمة في مجال أمن المعلومات والاختراق الأخلاقي.",
  //   },
  // },
  // {
  //   code: "CSE102",
  //   name: {
  //     en: "Ethical Hacking",
  //     ar: "الاختراق الأخلاقي",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to ethical hacking techniques and tools.",
  //     ar: "يقدم هذا المقرر للطلاب تقنيات وأدوات الاختراق الأخلاقي.",
  //   },
  // },
  // {
  //   code: "CSE103",
  //   name: {
  //     en: "Digital Forensics",
  //     ar: "التحليل الرقمي",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to digital forensics and incident response.",
  //     ar: "يقدم هذا المقرر للطلاب التحليل الرقمي والاستجابة للحوادث.",
  //   },
  // },
  // {
  //   code: "DSC101",
  //   name: {
  //     en: "Introduction to Data Science",
  //     ar: "مقدمة في علم البيانات",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to the field of data science and big data.",
  //     ar: "يقدم هذا المقرر للطلاب مقدمة في مجال علم البيانات والبيانات الضخمة.",
  //   },
  // },
  // {
  //   code: "DSC102",
  //   name: {
  //     en: "Big Data",
  //     ar: "البيانات الضخمة",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to big data technologies and analytics.",
  //     ar: "يقدم هذا المقرر للطلاب تقنيات البيانات الضخمة والتحليل.",
  //   },
  // },
  // {
  //   code: "DSC103",
  //   name: {
  //     en: "Data Analytics",
  //     ar: "تحليل البيانات",
  //   },
  //   creditHours: 3,
  //   courseType: CourseTypeEnum[0],
  //   description: {
  //     en: "This course introduces students to data analytics and visualization techniques.",
  //     ar: "يقدم هذا المقرر للطلاب تحليل البيانات وتقنيات التصور.",
  //   },
  // },
] as const;
