"use client";

import { useI18n } from "@/locales/client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const t = useI18n();
  return (
    <button
      className="block w-full text-red-500 p-2 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors duration-300 text-start"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      {t("nav.signOut")}
    </button>
  );
}
