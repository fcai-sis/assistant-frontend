import { EnrollmentStatusEnum } from "@fcai-sis/shared-models";
import { dummyStudents } from "./students";
import { dummySemesters } from "./semesters";
import { dummyCourses } from "./courses";
import { dummyHalls } from "./halls";

export const dummyEnrollments = [
  {
    student: dummyStudents[0],
    semester: dummySemesters[0],
    course: dummyCourses[0],
    status: EnrollmentStatusEnum[1],
    exam: {
      seatNumber: 1,
      hall: dummyHalls[0],
    },
    grades: {
      finalExam: 90,
      termWork: 90,
    },
    mark: "A",
  },
  {
    student: dummyStudents[1],
    semester: dummySemesters[0],
    course: dummyCourses[1],
    status: EnrollmentStatusEnum[1],
    exam: {
      seatNumber: 2,
      hall: dummyHalls[1],
    },
    grades: {
      finalExam: 80,
      termWork: 80,
    },
    mark: "B",
  },
  {
    student: dummyStudents[1],
    semester: dummySemesters[0],
    course: dummyCourses[2],
    status: EnrollmentStatusEnum[2],
    exam: {
      seatNumber: 3,
      hall: dummyHalls[2],
    },
    grades: {
      finalExam: 70,
      termWork: 70,
    },
    mark: "C",
  },
  {
    student: dummyStudents[1],
    semester: dummySemesters[0],
    course: dummyCourses[3],
    status: EnrollmentStatusEnum[0],
    exam: {
      seatNumber: 4,
      hall: dummyHalls[3],
    },
    grades: {
      finalExam: 60,
      termWork: 60,
    },
    mark: "D",
  },
  {
    student: dummyStudents[0],
    semester: dummySemesters[0],
    course: dummyCourses[4],
    status: EnrollmentStatusEnum[2],
    exam: {
      seatNumber: 5,
      hall: dummyHalls[4],
    },
    grades: {
      finalExam: 50,
      termWork: 50,
    },
    mark: "F",
  },
];
