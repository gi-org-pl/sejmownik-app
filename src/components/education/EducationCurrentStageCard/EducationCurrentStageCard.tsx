import { useLingui } from "@lingui/react/macro";
import { Link } from "react-router";
import arrowRightIcon from "@/assets/icons/arrow-right.svg";
import { BillStageProgress } from "@/components/shared/BillStageProgress/BillStageProgress";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import { BILL_STAGE_COUNT } from "./EducationCurrentStageCard.constants";
import type { EducationCurrentStageCardProps } from "./EducationCurrentStageCard.types";

export const EducationCurrentStageCard = ({
  badgeLabel,
  bill,
  billHref,
}: EducationCurrentStageCardProps) => {
  const { t } = useLingui();

  if (!bill) {
    return null;
  }

  const currentStep = bill.currentStep;
  const totalSteps = BILL_STAGE_COUNT;
  const hasStage =
    currentStep != null &&
    Number.isInteger(currentStep) &&
    currentStep >= 1 &&
    currentStep <= totalSteps;
  const accessibleName = [
    bill.title,
    badgeLabel,
    hasStage ? t`Etap ${currentStep} z ${totalSteps}` : null,
    bill.statusLine,
  ]
    .filter((part) => part)
    .join(" ");

  return (
    <Link
      to={billHref}
      aria-label={accessibleName}
      className={`block w-full cursor-pointer overflow-hidden rounded-3xl border border-gi-light-gray-dark bg-white no-underline text-gi-primary ${FOCUS_CLASS_NAME}`}
    >
      <p className="w-fit max-w-full rounded-br-2xl bg-gi-primary px-4 py-3 text-sm leading-4.5 font-bold wrap-break-word text-white">
        {badgeLabel}
      </p>

      <div className="flex flex-col gap-2.5 p-4">
        <div className="flex items-center gap-4">
          <p className="line-clamp-2 min-w-0 flex-1 text-[18px] leading-[22px] font-bold wrap-break-word text-gi-light-primary">
            {bill.title}
          </p>
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gi-dark-ash bg-transparent text-gi-primary transition-colors hover:bg-gi-dark-ash"
          >
            <span
              className={`${BUTTON_ICON_MASK_CLASS_NAME} h-5 w-[17.5px] mask-contain`}
              style={getIconMaskStyle(arrowRightIcon)}
            />
          </span>
        </div>

        {hasStage ? (
          <BillStageProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        ) : null}

        {bill.statusLine ? (
          <p className="text-[14px] leading-[20px] font-normal wrap-break-word text-gi-dark-gray">
            {bill.statusLine}
          </p>
        ) : null}
      </div>
    </Link>
  );
};
