"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCurrentLocale } from "@/locales/client";
import { tt } from "@/lib";
import Spinner from "@/components/Spinner";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export default function AuthForm() {
  const locale = useCurrentLocale();

  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: AuthFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      toast.success(
        tt(locale, {
          ar: "تم تسجيل الدخول بنجاح",
          en: "Successfully signed in",
        })
      );
      router.push("/");
    } else {
      toast.error(
        tt(locale, {
          ar: "فشل تسجيل الدخول",
          en: "Failed to sign in",
        })
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-center"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>
            {tt(locale, {
              ar: "البريد الإلكتروني",
              en: "Email",
            })}
          </label>
          <input {...register("email")} type="email" />
        </div>
        <div className="flex flex-col gap-2">
          <label>
            {tt(locale, {
              ar: "كلمة المرور",
              en: "Password",
            })}
          </label>
          <input {...register("password")} type="password" />
        </div>
      </div>
      <button className="btn" type="submit" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? (
          <Spinner />
        ) : (
          tt(locale, {
            ar: "تسجيل الدخول",
            en: "Sign in",
          })
        )}
      </button>
    </form>
  );
}
