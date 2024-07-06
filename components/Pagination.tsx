"use client";

import {
  I18nProviderClient,
  useCurrentLocale,
  useI18n,
} from "@/locales/client";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

function _Pagination({
  totalPages,
}: Readonly<{
  totalPages: number;
}>) {
  const locale = useCurrentLocale();
  const t = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const currentPage = parseInt(searchParams.get("page") ?? "1");

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex items-center gap-2">
      {prevPage && (
        <button
          className="p-2 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors duration-300 flex gap-2"
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString("page", prevPage.toString())
            );
          }}
        >
          {locale === "ar" ? <NavArrowRight /> : <NavArrowLeft />}
          {t("pagination.previous")}
        </button>
      )}
      <span className="p-2 bg-slate-100 rounded-lg w-10 h-10 flex justify-center items-center">
        {currentPage.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")}
      </span>
      {nextPage && (
        <button
          className="p-2 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors duration-300 flex gap-2"
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString("page", nextPage.toString())
            );
          }}
        >
          {t("pagination.next")}
          {locale === "ar" ? <NavArrowLeft /> : <NavArrowRight />}
        </button>
      )}
    </div>
  );
}

export default function Pagination({
  totalPages,
}: Readonly<{
  totalPages: number;
}>) {
  const locale = useCurrentLocale();
  return (
    <I18nProviderClient locale={locale}>
      <_Pagination totalPages={totalPages} />
    </I18nProviderClient>
  );
}
