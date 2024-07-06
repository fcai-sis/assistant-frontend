import { getAccessToken, tokenPayload } from "@/lib";
import { revalidatePath } from "next/cache";
import { graduationAPI } from "@/api";
import { getServerSession } from "next-auth";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";
import { getCurrentLocale, getI18n } from "@/locales/server";
import dbConnect from "@/database";
import Card from "@/components/Card";
export const getAuthenticatedTa = async () => {
  const session = await getServerSession();
  const payload = tokenPayload(session);
  await dbConnect();
  const ta = await TeachingAssistantModel.findOne({
    user: payload.userId,
  });

  if (!ta) {
    return null;
  }
  revalidatePath("/graduation");
  return ta;
};

export const getMyGraduationProjects = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/mygroup`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch graduation projects");
  }

  revalidatePath("/graduation");

  return response.data;
};

export const getGraduationProjectEnrollments = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/grad-enrolls`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    revalidatePath("/graduation");
    return {
      enrollments: [],
    };
  }

  revalidatePath("/graduation");

  return response.data;
};

export const getGraduationProjectTeachings = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/grad-teachings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    revalidatePath("/graduation");
    return {
      instructorTeachings: [],
      taTeachings: [],
    };
  }

  revalidatePath("/graduation");

  return response.data;
};

export default async function Page() {
  const locale = getCurrentLocale();
  const me = await getAuthenticatedTa();
  if (!me) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <h1 className='text-xl font-bold text-gray-700'>Not Authorized</h1>
      </div>
    );
  }

  const myGroups = await getMyGraduationProjects();
  await getGraduationProjectTeachings();
  const t = await getI18n();

  return (
    <div className='min-h-screen p-6 flex flex-col items-center'>
      <div className='flex flex-wrap gap-6 justify-center w-full'>
        {myGroups.map((group: any) => (
          <Card key={group._id} className='w-full sm:w-80 md:w-96 lg:w-[20rem]'>
            <div>
              <h1 className='text-lg font-semibold'>
                {t("graduation.projectTitle")}
              </h1>
              <h2 className='text-xl font-bold'>{group.projectTitle}</h2>
            </div>
            <div>
              <h1 className='text-lg font-semibold'>{t("graduation.team")}</h1>
              {group.enrollments.map((enrollment: any) => (
                <div key={enrollment._id} className='mb-2'>
                  <p className='text-gray-700'>{enrollment.student.fullName}</p>
                </div>
              ))}
            </div>
            <div>
              <h1 className='text-lg font-semibold'>
                {t("graduation.supervisedBy")}
              </h1>
              {group.instructorTeachings.map((teaching: any) => (
                <div key={teaching._id} className='mb-2'>
                  <p className='text-gray-700'>
                    {teaching.instructor.fullName}
                  </p>
                </div>
              ))}
            </div>
            {group.assistantTeachings.length > 0 && (
              <div>
                <h1 className='text-lg font-semibold'>
                  {t("graduation.assist")}
                </h1>
                {group.assistantTeachings.map((teaching: any) => (
                  <div key={teaching._id} className='mb-2'>
                    <p className='text-gray-700'>{teaching.ta.fullName}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
