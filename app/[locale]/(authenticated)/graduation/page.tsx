import { getAccessToken, tokenPayload } from "@/lib";
import CreateGraduationForm from "./CreateGraduationForm";
import { revalidatePath } from "next/cache";
import { graduationAPI } from "@/api";
import { I18nProviderClient } from "@/locales/client";
import { getServerSession } from "next-auth";
import { InstructorModel } from "@fcai-sis/shared-models";
import { getCurrentLocale, getI18n } from "@/locales/server";
import dbConnect from "@/database";
import Card from "@/components/Card";
import { ButtonLink } from "@/components/Buttons";
import DeleteGraduationForm from "./[groupId]/DeleteGraduationForm";

export const getAuthenticatedInstructor = async () => {
  const session = await getServerSession();
  const payload = tokenPayload(session);
  await dbConnect();
  const instructor = await InstructorModel.findOne({
    user: payload.userId,
  });

  if (!instructor) {
    return null;
  }
  revalidatePath("/graduation");
  return instructor;
};

export const getMyGraduationProjects = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/mygroup`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log("KOSSO EL SISI", response.data);

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
  const me = await getAuthenticatedInstructor();
  if (!me) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold text-gray-700">Not Authorized</h1>
      </div>
    );
  }

  const myGroups = await getMyGraduationProjects();
  const { enrollments } = await getGraduationProjectEnrollments();
  const { instructorTeachings, taTeachings } =
    await getGraduationProjectTeachings();
  const t = await getI18n();

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="flex flex-wrap gap-6 justify-center w-full">
        {myGroups.map((group: any) => (
          <Card key={group._id} className="w-full sm:w-80 md:w-96 lg:w-[20rem]">
            <div>
              <h1 className="text-lg font-semibold">
                {t("graduation.projectTitle")}
              </h1>
              <h2 className="text-xl font-bold">{group.projectTitle}</h2>
            </div>
            <div>
              <h1 className="text-lg font-semibold">{t("graduation.team")}</h1>
              {group.enrollments.map((enrollment: any) => (
                <div key={enrollment._id} className="mb-2">
                  <p className="text-gray-700">{enrollment.student.fullName}</p>
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                {t("graduation.supervisedBy")}
              </h1>
              {group.instructorTeachings.map((teaching: any) => (
                <div key={teaching._id} className="mb-2">
                  <p className="text-gray-700">
                    {teaching.instructor.fullName}
                  </p>
                </div>
              ))}
            </div>
            {group.assistantTeachings.length > 0 && (
              <div>
                <h1 className="text-lg font-semibold">
                  {t("graduation.assist")}
                </h1>
                {group.assistantTeachings.map((teaching: any) => (
                  <div key={teaching._id} className="mb-2">
                    <p className="text-gray-700">{teaching.ta.fullName}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-4 gap-4">
              <ButtonLink href={`/graduation/${group._id}`} variant="primary">
                {t("graduation.updateTitleMini")}
              </ButtonLink>
              <I18nProviderClient locale={locale}>
                <DeleteGraduationForm groupId={group._id} />
              </I18nProviderClient>
            </div>
          </Card>
        ))}
      </div>

      <I18nProviderClient locale={locale}>
        <CreateGraduationForm
          enrollments={enrollments}
          instructorTeachings={instructorTeachings}
          assistantTeachings={taTeachings}
          me={JSON.stringify(me)}
        />
      </I18nProviderClient>
    </div>
  );
}
