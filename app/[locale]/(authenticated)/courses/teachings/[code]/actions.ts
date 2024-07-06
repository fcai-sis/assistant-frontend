"use server";
import { getAccessToken } from "@/lib";
import { UpdateGradeFormValues } from "./UpdateGradeForm";
import { gradeAPI } from "@/api";
import { revalidatePath } from "next/cache";

export const updateEnrollmentGrade = async (data: UpdateGradeFormValues) => {
  const accessToken = await getAccessToken();
  const { enrollment, termWorkGrade, finalExamGrade } = data;

  const requestBody = {
    termWorkMark: termWorkGrade,
    finalExamMark: finalExamGrade,
  };

  const response = await gradeAPI.patch(`/update/${enrollment}`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/teachings");

  return {
    success: true,
  };
};

export const uploadGradesAction = async (data: FormData) => {
  const accessToken = await getAccessToken();

  const response = await gradeAPI.patch(`batch-update`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/teachings");

  return {
    success: true,
  };
};

export const downloadGradeTemplateAction = async () => {
  const response = await gradeAPI.get(`download-template`);

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/teachings");

  return {
    success: true,
  };
};
