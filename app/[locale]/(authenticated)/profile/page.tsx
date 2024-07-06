import { I18nProviderClient } from "@/locales/client";
import ProfileDisplay from "./ProfileDisplay";
import { getProfileAction } from "./actions";
import { getCurrentLocale } from "@/locales/server";
import { localizedTitleEnum, TitleEnum } from "@fcai-sis/shared-models";

export default async function Page() {
  const profileData = await getProfileAction();
  const editableFields = profileData.data?.editableFields;
  const viewableFields = profileData.data?.viewableFields;
  const locale = getCurrentLocale();
  const titleEnums = TitleEnum;

  return (
    <>
      <I18nProviderClient locale={locale}>
        <ProfileDisplay
          editableFields={editableFields}
          viewableFields={viewableFields}
          titleEnums={titleEnums}
          localizedTitleEnum={localizedTitleEnum}
        />
      </I18nProviderClient>
    </>
  );
}
