"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useI18n } from "@/locales/client";
import { error } from "console";
import { updateGraduationTeamAction } from "../actions";

const updateGraduationFormSchema = z.object({
  projectTitle: z.string().min(1, { message: "Please enter a project title" }),
  enrollments: z.array(z.object({ enrollment: z.string() })),
  instructorTeachings: z
    .array(z.object({ instructorTeaching: z.string() }))
    .nonempty(),
  assistantTeachings: z
    .array(z.object({ assistantTeaching: z.string() }))
    .optional(),
  group: z.string(),
});

export type UpdateGraduationFormValues = z.infer<
  typeof updateGraduationFormSchema
>;

export default function UpdateGraduationForm({
  enrollments,
  instructorTeachings,
  assistantTeachings,
  group,
}: {
  enrollments: any[];
  instructorTeachings: any[];
  assistantTeachings: any[];
  group: any;
}) {
  const t = useI18n();
  const router = useRouter();

  // Initialize state based on the group prop
  const [selectedEnrollments, setSelectedEnrollments] = useState<string[]>(
    group.enrollments.map((e: any) => e) || []
  );

  const [selectedInstructorTeachings, setSelectedInstructorTeachings] =
    useState<string[]>(group.instructorTeachings.map((i: any) => i) || []);
  const [selectedAssistantTeachings, setSelectedAssistantTeachings] = useState<
    string[]
  >(group.assistantTeachings.map((a: any) => a) || []);
  const [enrollmentSearch, setEnrollmentSearch] = useState("");
  const [instructorTeachingSearch, setInstructorTeachingSearch] = useState("");
  const [assistantTeachingSearch, setAssistantTeachingSearch] = useState("");
  const [showAssistantTeachings, setShowAssistantTeachings] = useState(
    group.assistantTeachings && group.assistantTeachings.length > 0
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateGraduationFormValues>({
    resolver: zodResolver(updateGraduationFormSchema),
    defaultValues: {
      projectTitle: group.projectTitle,
      enrollments: group.enrollments.map((e: any) => ({
        enrollment: e._id,
      })),
      instructorTeachings: group.instructorTeachings.map((i: any) => ({
        instructorTeaching: i._id,
      })),
      assistantTeachings:
        group.assistantTeachings?.map((a: any) => ({
          assistantTeaching: a._id,
        })) || [],
      group: group._id,
    },
  });

  const {
    fields: enrollmentFields,
    append: appendEnrollment,
    remove: removeEnrollment,
  } = useFieldArray({
    control,
    name: "enrollments",
  });

  const {
    fields: instructorFields,
    append: appendInstructor,
    remove: removeInstructor,
  } = useFieldArray({
    control,
    name: "instructorTeachings",
  });

  const {
    fields: assistantFields,
    append: appendAssistant,
    remove: removeAssistant,
  } = useFieldArray({
    control,
    name: "assistantTeachings",
  });

  const handleEnrollmentChange = (index: number, value: string) => {
    const newSelectedEnrollments = [...selectedEnrollments];
    newSelectedEnrollments[index] = value;
    setSelectedEnrollments(newSelectedEnrollments);
  };

  const handleInstructorTeachingChange = (index: number, value: string) => {
    const newSelectedInstructorTeachings = [...selectedInstructorTeachings];
    newSelectedInstructorTeachings[index] = value;
    setSelectedInstructorTeachings(newSelectedInstructorTeachings);
  };

  const handleAssistantTeachingChange = (index: number, value: string) => {
    const newSelectedAssistantTeachings = [...selectedAssistantTeachings];
    newSelectedAssistantTeachings[index] = value;
    setSelectedAssistantTeachings(newSelectedAssistantTeachings);
  };

  const onSubmit = async (values: UpdateGraduationFormValues) => {
    const updateGraduationTeamResponse = await updateGraduationTeamAction(
      values
    );

    if (!updateGraduationTeamResponse.success) {
      return toast.error(updateGraduationTeamResponse.error?.message);
    }

    toast.success(t("graduation.updateSuccess"));
    router.push(`/graduation`);
  };

  // Filter options based on search query
  const filteredEnrollments = enrollments.filter((enrollment) =>
    enrollment.student.studentId.includes(enrollmentSearch)
  );

  const filteredInstructorTeachings = instructorTeachings.filter(
    (instructorTeaching) =>
      instructorTeaching.instructor.fullName
        .toLowerCase()
        .includes(instructorTeachingSearch.toLowerCase()) ||
      instructorTeaching.instructor.email
        .toLowerCase()
        .includes(instructorTeachingSearch.toLowerCase())
  );

  const filteredAssistantTeachings = assistantTeachings.filter(
    (assistantTeaching) =>
      assistantTeaching.ta.fullName
        .toLowerCase()
        .includes(assistantTeachingSearch.toLowerCase()) ||
      assistantTeaching.ta.email
        .toLowerCase()
        .includes(assistantTeachingSearch.toLowerCase())
  );

  return (
    <div className='flex flex-col items-center justify-center max-w-3xl mx-auto my-8 p-6 bg-white border border-slate-200 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6'>{t("graduation.updateTitle")}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col space-y-4 w-full'
      >
        <div className='flex flex-col'>
          <label className='font-bold'>{t("graduation.projectTitle")}</label>
          <input
            type='text'
            {...register("projectTitle")}
            className='w-full p-2 border border-slate-300 rounded-lg'
          />

          {errors.projectTitle && (
            <p className='text-red-600'>{errors.projectTitle.message}</p>
          )}
        </div>
        <div className='flex flex-col space-y-2'>
          <label className='font-bold'>{t("graduation.enrollments")}</label>
          <input
            type='text'
            placeholder={t("graduation.search")}
            value={enrollmentSearch}
            onChange={(e) => setEnrollmentSearch(e.target.value)}
            className='w-full p-2 border border-slate-300 rounded-lg mb-2'
          />
          {enrollmentFields.map((field, index) => (
            <div key={field.id} className='flex gap-2'>
              <select
                {...register(`enrollments.${index}.enrollment` as const)}
                defaultValue={field.enrollment}
                onChange={(e) => handleEnrollmentChange(index, e.target.value)}
                className='w-full p-2 border border-slate-300 rounded-lg'
              >
                <option value='' disabled>
                  {t("graduation.selectEnrollment")}
                </option>
                {filteredEnrollments
                  .filter(
                    (enrollment) =>
                      !selectedEnrollments.includes(enrollment._id) ||
                      enrollment._id === selectedEnrollments[index]
                  )
                  .map((enrollment) => (
                    <option key={enrollment._id} value={enrollment._id}>
                      {enrollment.student.studentId}
                    </option>
                  ))}
              </select>
              <button
                type='button'
                onClick={() => {
                  removeEnrollment(index);
                  const newSelectedEnrollments = [...selectedEnrollments];
                  newSelectedEnrollments.splice(index, 1);
                  setSelectedEnrollments(newSelectedEnrollments);
                }}
                className='btn-danger flex justify-center'
              >
                {t("general.remove")}
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() => appendEnrollment({ enrollment: "" })}
            className='btn flex justify-center'
          >
            {t("graduation.addEnrollment")}
          </button>
        </div>

        <div className='flex flex-col space-y-2'>
          <label className='font-bold'>
            {t("graduation.instructorTeachings")}
          </label>
          <input
            type='text'
            placeholder={t("graduation.search")}
            value={instructorTeachingSearch}
            onChange={(e) => setInstructorTeachingSearch(e.target.value)}
            className='w-full p-2 border border-slate-300 rounded-lg mb-2'
          />
          {instructorFields.map((field, index) => (
            <div key={field.id} className='flex gap-2'>
              <select
                {...register(
                  `instructorTeachings.${index}.instructorTeaching` as const
                )}
                defaultValue={field.instructorTeaching}
                onChange={(e) =>
                  handleInstructorTeachingChange(index, e.target.value)
                }
                className='w-full p-2 border border-slate-300 rounded-lg'
              >
                <option value='' disabled>
                  {t("graduation.selectInstructorTeaching")}
                </option>
                {filteredInstructorTeachings
                  .filter(
                    (instructorTeaching) =>
                      !selectedInstructorTeachings.includes(
                        instructorTeaching._id
                      ) ||
                      instructorTeaching._id ===
                        selectedInstructorTeachings[index]
                  )
                  .map((instructorTeaching) => (
                    <option
                      key={instructorTeaching._id}
                      value={instructorTeaching._id}
                    >
                      {instructorTeaching.instructor.fullName} (
                      {instructorTeaching.instructor.email})
                    </option>
                  ))}
              </select>
              <button
                type='button'
                onClick={() => {
                  removeInstructor(index);
                  const newSelectedInstructorTeachings = [
                    ...selectedInstructorTeachings,
                  ];
                  newSelectedInstructorTeachings.splice(index, 1);
                  setSelectedInstructorTeachings(
                    newSelectedInstructorTeachings
                  );
                }}
                className='btn-danger flex justify-center'
              >
                {t("general.remove")}
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() => appendInstructor({ instructorTeaching: "" })}
            className='btn flex justify-center'
          >
            {t("graduation.addInstructorTeaching")}
          </button>
        </div>

        {showAssistantTeachings && (
          <div className='flex flex-col space-y-2'>
            <label className='font-bold'>
              {t("graduation.assistantTeachings")}
            </label>
            <input
              type='text'
              placeholder={t("graduation.search")}
              value={assistantTeachingSearch}
              onChange={(e) => setAssistantTeachingSearch(e.target.value)}
              className='w-full p-2 border border-slate-300 rounded-lg mb-2'
            />
            {assistantFields.map((field, index) => (
              <div key={field.id} className='flex gap-2'>
                <select
                  {...register(
                    `assistantTeachings.${index}.assistantTeaching` as const
                  )}
                  defaultValue={field.assistantTeaching}
                  onChange={(e) =>
                    handleAssistantTeachingChange(index, e.target.value)
                  }
                  className='w-full p-2 border border-slate-300 rounded-lg'
                >
                  <option value='' disabled>
                    {t("graduation.selectAssistantTeaching")}
                  </option>
                  {filteredAssistantTeachings
                    .filter(
                      (assistantTeaching) =>
                        !selectedAssistantTeachings.includes(
                          assistantTeaching._id
                        ) ||
                        assistantTeaching._id ===
                          selectedAssistantTeachings[index]
                    )
                    .map((assistantTeaching) => (
                      <option
                        key={assistantTeaching._id}
                        value={assistantTeaching._id}
                      >
                        {assistantTeaching.ta.fullName} (
                        {assistantTeaching.ta.email})
                      </option>
                    ))}
                </select>
                <button
                  type='button'
                  onClick={() => {
                    removeAssistant(index);
                    const newSelectedAssistantTeachings = [
                      ...selectedAssistantTeachings,
                    ];
                    newSelectedAssistantTeachings.splice(index, 1);
                    setSelectedAssistantTeachings(
                      newSelectedAssistantTeachings
                    );
                  }}
                  className='btn-danger flex justify-center'
                >
                  {t("general.remove")}
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() => appendAssistant({ assistantTeaching: "" })}
              className='btn flex justify-center'
            >
              {t("graduation.addAssistantTeaching")}
            </button>
          </div>
        )}

        <button
          type='button'
          onClick={() => setShowAssistantTeachings(!showAssistantTeachings)}
          className='btn-secondary flex justify-center'
        >
          {showAssistantTeachings
            ? t("graduation.hideTeachingAssistants")
            : t("graduation.showTeachingAssistants")}
        </button>

        <div className='flex justify-between'>
          <button
            className='btn flex justify-center'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? t("general.loading") : t("general.submit")}
          </button>
          <button
            className='btn-secondary flex justify-center'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              router.push("/graduation");
            }}
          >
            {t("general.back")}
          </button>
        </div>
      </form>
    </div>
  );
}
