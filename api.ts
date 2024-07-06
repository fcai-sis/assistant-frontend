import axios from "axios";

export const announcementsAPI = axios.create({
  baseURL: process.env.ANNOUNCEMENTS_API_URL,
  validateStatus: (status) => status < 500,
});

export const studentsAPI = axios.create({
  baseURL: process.env.STUDENTS_API_URL,
  validateStatus: (status) => status < 500,
});

export const studentRegistrationAPI = axios.create({
  baseURL: process.env.STUDENT_REGISTRATION_API_URL,
  validateStatus: (status) => status < 500,
});

export const serviceRequestsAPI = axios.create({
  baseURL: process.env.SERVICE_REQUESTS_API_URL,
  validateStatus: (status) => status < 500,
});

export const coursesAPI = axios.create({
  baseURL: process.env.COURSES_API_URL,
  validateStatus: (status) => status < 500,
});
export const enrollmentsAPI = axios.create({
  baseURL: process.env.ENROLLMENTS_API_URL,
  validateStatus: (status) => status < 500,
});

export const profileAPI = axios.create({
  baseURL: process.env.PROFILE_API_URL,
  validateStatus: (status) => status < 500,
});

export const departmentsAPI = axios.create({
  baseURL: process.env.DEPARTMENTS_API_URL,
  validateStatus: (status) => status < 500,
});

export const instructorTaAPI = axios.create({
  baseURL: process.env.INSTRUCTOR_TA_API_URL,
  validateStatus: (status) => status < 500,
});

export const instructorsAPI = axios.create({
  baseURL: process.env.INSTRUCTORS_API_URL,
  validateStatus: (status) => status < 500,
});

export const tasAPI = axios.create({
  baseURL: process.env.TAS_API_URL,
  validateStatus: (status) => status < 500,
});

export const departmentEnrollmentAPI = axios.create({
  baseURL: process.env.DEPARTMENT_ENROLLMENT_API_URL,
  validateStatus: (status) => status < 500,
});

export const scheduleAPI = axios.create({
  baseURL: process.env.SCHEDULE_API_URL,
  validateStatus: (status) => status < 500,
});

export const gradeAPI = axios.create({
  baseURL: process.env.GRADE_API_URL,
  validateStatus: (status) => status < 500,
});

export const graduationAPI = axios.create({
  baseURL: process.env.GRADUATION_API_URL,
  validateStatus: (status) => status < 500,
});

export const statisticsAPI = axios.create({
  baseURL: process.env.STATISTICS_API_URL,
  validateStatus: (status) => status < 500,
});

export const slotsAPI = axios.create({
  baseURL: process.env.SLOTS_API_URL,
  validateStatus: (status) => status < 500,
});
