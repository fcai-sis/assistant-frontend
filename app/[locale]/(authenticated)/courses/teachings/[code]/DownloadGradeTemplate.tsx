"use client";

import { useCurrentLocale, useI18n } from "@/locales/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { gradeAPI } from "@/api";
import { tt } from "@/lib";
import axios from "axios";

export default function DownloadGradeTemplate() {
  const router = useRouter();
  const locale = useCurrentLocale();
  const t = useI18n();

  const handleDownloadTemplate = async () => {
    try {
      const downloadGradeTemplateResponse = await axios.get(
        "http://127.0.0.1:3005/grade/download-template" // wtf?? cant use env or gradeapi
      );

      if (downloadGradeTemplateResponse.status !== 200) {
        throw new Error("Failed to download the template");
      }

      const url = window.URL.createObjectURL(
        new Blob([downloadGradeTemplateResponse.data])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "grade_template.xlsx"); // or whatever file name you want
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(t("teachings.downloadGradeTemplate.success"));
      router.push("/courses/teachings");
    } catch (error) {
      toast.error(t("general.error.somethingWentWrong"));
    }
  };

  return (
    <div className=''>
      <button type='button' onClick={handleDownloadTemplate} className='btn'>
        {tt(locale, {
          en: "Download Grade Template",
          ar: "تحميل قالب الدرجات",
        })}
      </button>
    </div>
  );
}
