import { getCurrentLocale } from "@/locales/server";
import moment from "moment";
import "moment/locale/ar";

export async function CreatedAt({ date }: { date: string }) {
  const locale = getCurrentLocale();
  const createdAtMoment = moment(date).locale(locale);
  return (
    <small>
      <i className="text-slate-400">
        {createdAtMoment.isSame(moment(), "day")
          ? createdAtMoment.fromNow()
          : createdAtMoment.format("LL")}
      </i>
    </small>
  );
}
