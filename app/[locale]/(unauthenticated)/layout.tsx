import ChangeLanguageButton from "@/components/ChangeLanguageButton";
import { ensureUnauthenticated } from "@/lib";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await ensureUnauthenticated();
  return (
    <>
      <ChangeLanguageButton className="absolute top-0 left-0 m-4" />
      {children}
    </>
  );
}
