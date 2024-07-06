"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCurrentLocale, useI18n } from "@/locales/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { tt } from "@/lib";
import { uploadGradesAction } from "./actions";

const uploadExcelFormSchema = z.object({
  excelFile: z
    .unknown()
    .transform((value) => value as FileList)
    .refine(
      (file) =>
        file.length === 1 &&
        file[0].type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      {
        message: "Please upload an Excel file (.xlsx)",
      }
    ),
});

type UploadExcelFormValues = z.infer<typeof uploadExcelFormSchema>;

export default function UploadExcelForm({
  course,
  selectedFile,
  setSelectedFile,
}: {
  course: any;
  selectedFile: string | null;
  setSelectedFile: (file: string | null) => void;
}) {
  const router = useRouter();
  const locale = useCurrentLocale();
  const t = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UploadExcelFormValues>({
    resolver: zodResolver(uploadExcelFormSchema),
  });

  const onSubmit = async (values: UploadExcelFormValues) => {
    const formData = new FormData();
    formData.append("file", values.excelFile[0]);
    formData.append("course", course);
    const result = await uploadGradesAction(formData);

    if (!result.success) {
      toast.error(t("general.error.somethingWentWrong"));
    }

    toast.success(t("teachings.uploadGrade.success"));
    router.push("/courses/teachings");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white shadow-md rounded-lg p-8 w-full max-w-lg mx-auto flex flex-col gap-4'
    >
      <div className='mb-4'>
        <label className='block text-primary text-sm font-bold mb-2'>
          {tt(locale, {
            en: "Excel file (.xlsx)",
            ar: "ملف الإكسل (.xlsx)",
          })}
        </label>
        <div className='relative'>
          <input
            {...register("excelFile")}
            type='file'
            className='absolute inset-0 opacity-0 cursor-pointer'
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setSelectedFile(file.name);
              } else {
                setSelectedFile(null);
              }
            }}
          />
          <div className='flex items-center justify-center border border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-100'>
            <span className='text-gray-600'>
              {selectedFile
                ? selectedFile
                : tt(locale, {
                    en: "Choose file",
                    ar: "اختر ملف",
                  })}
            </span>
          </div>
        </div>
        {errors.excelFile && (
          <p className='text-red-600 text-xs italic mt-2'>
            {errors.excelFile.message}
          </p>
        )}
      </div>
      <button
        className='btn flex justify-center mt-4'
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting
          ? t("general.loading")
          : t("registerStudent.upload.uploadExcelFile")}
      </button>
    </form>
  );
}
