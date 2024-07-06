import {
  ServiceRequestStatusEnum,
  ServiceRequestStatusEnumType,
  serviceRequestStatusLocalizedFields,
} from "@fcai-sis/shared-models";
import { CreatedAt } from "./CreatedAt";
import ServiceRequestCardImage from "./ServiceRequestCardImage";
import { tt } from "@/lib";
import { getCurrentLocale } from "@/locales/server";
import moment from "moment";
import "moment/locale/ar";

export default async function ServiceRequestCard({
  serviceRequest,
}: {
  serviceRequest: any;
}) {
  const locale = getCurrentLocale();
  const colors =
    serviceRequest.status === ServiceRequestStatusEnum[0]
      ? "bg-yellow-100 text-yellow-500"
      : serviceRequest.status === ServiceRequestStatusEnum[1]
      ? "bg-blue-100 text-blue-500"
      : serviceRequest.status === ServiceRequestStatusEnum[2]
      ? "bg-green-100 text-green-500"
      : "bg-red-100 text-red-500";
  const claimAtMoment = moment(serviceRequest.claimAt);
  return (
    <div className={`border border-slate-200 w-full p-4 rounded-lg my-2`}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <small className={`${colors} rounded-lg px-2 py-1 h-min`}>
              {tt(
                locale,
                serviceRequestStatusLocalizedFields[
                  serviceRequest.status as ServiceRequestStatusEnumType
                ]
              )}
            </small>
            <h5>{serviceRequest.serviceName}</h5>
          </div>
          {serviceRequest.message && <p>{serviceRequest.message}</p>}
          {serviceRequest.claimAt && (
            <p>
              {tt(locale, {
                en: "Can be claimed starting from ",
                ar: "بإمكانك الاستلام ابتداءً من ",
              })}
              {claimAtMoment.locale(locale).format("LL")} (
              {claimAtMoment.fromNow()})
            </p>
          )}
        </div>
        <ServiceRequestCardImage src={serviceRequest.image} />
      </div>
      <CreatedAt date={serviceRequest.createdAt} />
    </div>
  );
}
