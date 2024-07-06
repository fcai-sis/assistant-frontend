"use server";

import { graduationAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { CreateGraduationFormValues } from "./CreateGraduationForm";
import { UpdateGraduationFormValues } from "./[groupId]/UpdateGraduationForm";
import { deleteGraduationFormValues } from "./[groupId]/DeleteGraduationForm";

export const createGraduationTeamAction = async (
  data: CreateGraduationFormValues
) => {
  const accessToken = await getAccessToken();

  // if data contains any empty strings, return an error
  if (
    data.enrollments.some(
      (enrollment) => enrollment.enrollment.trim() === ""
    ) ||
    data.instructorTeachings.some(
      (instructorTeaching) =>
        instructorTeaching.instructorTeaching.trim() === ""
    )
  ) {
    return {
      success: false,
      error: { message: "Please fill in all fields" },
    };
  }
  const mappedAssistantTeachings = data.assistantTeachings?.map(
    (assistantTeaching) => assistantTeaching.assistantTeaching
  );
  const requestBody = {
    projectTitle: data.projectTitle,
    enrollments: data.enrollments.map(
      (enrollment: any) => enrollment.enrollment
    ),
    instructorTeachings: data.instructorTeachings.map(
      (instructorTeaching: any) => instructorTeaching.instructorTeaching
    ),
    assistantTeachings: mappedAssistantTeachings?.some(
      (assistantTeaching) => assistantTeaching.trim() === ""
    )
      ? undefined
      : mappedAssistantTeachings,
  };

  console.log(requestBody);

  const response = await graduationAPI.post(`/create`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);

  if (response.status !== 201) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/graduation");

  return { success: true };
};

export const updateGraduationTeamAction = async (
  data: UpdateGraduationFormValues
) => {
  const accessToken = await getAccessToken();

  // if data contains any empty strings, return an error

  if (
    data.enrollments.length == 0 ||
    data.enrollments.some(
      (enrollment) => enrollment.enrollment.trim() === ""
    ) ||
    data.instructorTeachings.length == 0 ||
    data.instructorTeachings.some(
      (instructorTeaching) =>
        instructorTeaching.instructorTeaching.trim() === ""
    )
  ) {
    return {
      success: false,
      error: { message: "Please fill in all fields" },
    };
  }
  const mappedAssistantTeachings = data.assistantTeachings?.map(
    (assistantTeaching) => assistantTeaching.assistantTeaching
  );
  const requestBody = {
    projectTitle: data.projectTitle,
    enrollments: data.enrollments.map(
      (enrollment: any) => enrollment.enrollment
    ),
    instructorTeachings: data.instructorTeachings.map(
      (instructorTeaching: any) => instructorTeaching.instructorTeaching
    ),
    assistantTeachings: mappedAssistantTeachings?.some(
      (assistantTeaching) => assistantTeaching.trim() === ""
    )
      ? undefined
      : mappedAssistantTeachings,
  };

  console.log(requestBody);

  const response = await graduationAPI.patch(
    `/update/${data.group}`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(response.data);

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

  revalidatePath("/graduation");

  return { success: true };
};


export const deleteGraduationAction = async (data: deleteGraduationFormValues) => {
  const accessToken = await getAccessToken();

  const groupId = data.groupId;
  console.log(groupId);

  const response = await graduationAPI.delete(`/${groupId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.error.message,
      },
    };
  }

  revalidatePath("/graduation");

  return { success: true };
};
