"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateEnrollmentGrade } from "./actions";
import { useI18n } from "@/locales/client";

const updateGradeFormSchema = z.object({
  termWorkGrade: z.number().int().min(0).max(40).optional(),
  finalExamGrade: z.number().int().min(0).max(60).optional(),
  enrollment: z.string(),
});

export type UpdateGradeFormValues = z.infer<typeof updateGradeFormSchema>;

export default function UpdateGradeForm({ enrollment }: { enrollment: any }) {
  const t = useI18n();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateGradeFormValues>({
    resolver: zodResolver(updateGradeFormSchema),
    defaultValues: {
      termWorkGrade: enrollment.termWorkMark,
      finalExamGrade: enrollment.finalExamMark,
      enrollment: enrollment._id,
    },
  });

  const onSubmit = async (values: UpdateGradeFormValues) => {
    const updateEnrollmentGradeResponse = await updateEnrollmentGrade(values);

    if (!updateEnrollmentGradeResponse.success) {
      return toast.error(
        updateEnrollmentGradeResponse.error?.message ??
          t("teachings.error.updateFailed")
      );
    }

    toast.success(t("teachings.success"));
    router.push(`/courses/teachings/${enrollment.course.code}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex items-end gap-6'>
      <div className='flex flex-col'>
        <label className='mb-1 font-medium'>
          {t("teachings.termWorkGrade")}
        </label>
        <input
          type='number'
          className='p-2 border border-gray-300 rounded-lg'
          {...register("termWorkGrade", { valueAsNumber: true })}
        />
        {errors.termWorkGrade && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.termWorkGrade.message}
          </p>
        )}
      </div>
      <div className='flex flex-col'>
        <label className='mb-1 font-medium'>
          {t("teachings.finalExamGrade")}
        </label>
        <input
          type='number'
          className='p-2 border border-gray-300 rounded-lg'
          {...register("finalExamGrade", { valueAsNumber: true })}
        />
        {errors.finalExamGrade && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.finalExamGrade.message}
          </p>
        )}
      </div>
      <div className='flex justify-center'>
        <button type='submit' className='btn h-min' disabled={isSubmitting}>
          {isSubmitting ? t("general.loading") : t("teachings.updateGrade")}
        </button>
      </div>
    </form>
  );
}
