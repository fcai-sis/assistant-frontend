"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { deleteGraduationAction } from "../actions";
import { useI18n } from "@/locales/client";

const deleteGraduationFormSchema = z.object({
  groupId: z.string(),
});

export type deleteGraduationFormValues = z.infer<
  typeof deleteGraduationFormSchema
>;

export default function DeleteGraduationForm({ groupId }: { groupId: string }) {
  const t = useI18n();
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<deleteGraduationFormValues>({
    resolver: zodResolver(deleteGraduationFormSchema),
    defaultValues: {
      groupId,
    },
  });

  const onSubmit = async (values: deleteGraduationFormValues) => {
    const deleteGraduationTeamResponse = await deleteGraduationAction(values);

    if (!deleteGraduationTeamResponse.success) {
      return toast.error(deleteGraduationTeamResponse.error?.message);
    }

    toast.success(t("graduation.deleteSuccess"));
    router.push(`/graduation`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='submit' onClick={(e) => {
            if (confirm(t("graduation.deleteConfirm"))) {
                return;
            } else {
                e.preventDefault()
            }
        }} disabled={isSubmitting} className='btn-danger'>
          {t("graduation.delete")}
        </button>
      </form>
    </>
  );
}
