import Image from "next/image";
import { I18nProviderClient } from "@/locales/client";
import AuthForm from "./AuthForm";
import { SupportedLocale, tt } from "@/lib";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: SupportedLocale } }>) {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full gap-32">
      <I18nProviderClient locale={locale}>
        <AuthForm />
      </I18nProviderClient>
      <div className="w-[1px] h-1/2 bg-slate-300 rounded-full" />
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-row gap-16">
          <Image src="/fcai.png" alt="FCAI Logo" height={200} width={222} />
          <Image
            src="/cu.png"
            alt="Cairo University Logo"
            height={200}
            width={155}
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1>
            {tt(locale, {
              en: "Welcome to",
              ar: "مرحبًا بك في",
            })}
          </h1>
          <p
            className={`text-slate-400 text-center ${
              locale === "ar" ? "w-64" : "w-96"
            }`}
          >
            {
              tt(locale, {
                en: "Instructor & Teaching Assistant Portal",
                ar: "بوابة المعلمين ومساعدي التدريس",
              }) as string
            }
          </p>
        </div>
      </div>
    </div>
  );
}
