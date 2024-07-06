import SignOutButton from "@/components/SignOutButton";
import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import Dropdown from "./Dropdown";
import ChangeLanguageButton from "./ChangeLanguageButton";
import {
  BookStack,
  Home,
  Industry,
  LeaderboardStar,
  Suitcase,
} from "iconoir-react";
import Image from "next/image";

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getI18n();

  return (
    <nav className='z-40 fixed top-0 left-0 right-0 bg-white flex justify-between items-center py-4 px-24 shadow-md gap-4'>
      <Image src={"/fcai.png"} alt='Logo' width={70} height={70} />
      <div className='flex gap-2'>
        <Link href='/' className='flex gap-2 items-center'>
          <Home />
          {t("home.title")}
        </Link>
        <Link href='/courses/teachings' className='flex gap-2 items-center'>
          <BookStack />
          {t("myCourses.title")}
        </Link>
        <Link href='/instructors' className='flex gap-2 items-center'>
          {t("nav.instructors")}
          <Industry />
        </Link>
        <Link href='/ta' className='flex gap-2 items-center'>
          {t("nav.teacherAssistants")}
          <Suitcase />
        </Link>
        <Link href='/top' className='flex gap-2 items-center'>
          {t("nav.top")}
          <LeaderboardStar />
        </Link>
        <I18nProviderClient locale={locale}>
          <Dropdown label={t("nav.more")}>
            <Link href='/profile' className='block w-full'>
              {t("profile.title")}
            </Link>
            <Link href='/chat' className='block w-full'>
              {t("nav.chat")}
            </Link>
            <Link href='/courses' className='block w-full'>
              {t("nav.courses")}
            </Link>
            <Link href='/graduation' className='block w-full'>
              {t("nav.graduation")}
            </Link>
            <SignOutButton />
          </Dropdown>
        </I18nProviderClient>
      </div>
      <I18nProviderClient locale={locale}>
        <ChangeLanguageButton />
      </I18nProviderClient>
    </nav>
  );
}
