"use server";

import { profileAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { updateProfileValues } from "./ProfileDisplay";

export const getProfileAction = async () => {
  const accessToken = await getAccessToken();

  const response = await profileAPI.get(`/instructor-profile`, {
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

  revalidatePath("/profile");

  return {
    success: true,
    data: {
      editableFields: response.data.editableProfileFields,
      viewableFields: response.data.immutableProfileFields,
    },
  };
};

export const updateProfileAction = async (data: updateProfileValues) => {
  const accessToken = await getAccessToken();
  // convert office hours from 24 hour format to 12 hour format
  const officeHoursFrom = data.officeHoursFrom.split(":");
  const officeHoursTo = data.officeHoursTo.split(":");
  data.officeHoursFrom = `${Number(officeHoursFrom[0]) % 12 || 12}:${
    officeHoursFrom[1]
  } ${Number(officeHoursFrom[0]) >= 12 ? "PM" : "AM"}`;
  data.officeHoursTo = `${Number(officeHoursTo[0]) % 12 || 12}:${
    officeHoursTo[1]
  } ${Number(officeHoursTo[0]) >= 12 ? "PM" : "AM"}`;
  const officeDataConcated = `${data.officeHoursFrom} - ${data.officeHoursTo}`;

  const requestBody = {
    instructor: {
      ...data,
      officeHoursFrom: undefined,
      officeHoursTo: undefined,
      officeHours: officeDataConcated,
    },
  };

  const response = await profileAPI.patch(`/instructor-profile`, requestBody, {
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

  revalidatePath("/profile");

  return { success: true };
};
