import { Link } from "react-router";
import arrowRightIcon from "@/assets/icons/arrow-right.svg";
import { BillStageProgress } from "@/components/shared/BillStageProgress/BillStageProgress";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import type { EducationCurrentStageCardProps } from "./EducationCurrentStageCard.types";

export const EducationCurrentStageCard = ({
  badgeLabel,
  bill,
  totalSteps,
  billHref,
}: EducationCurrentStageCardProps) => {
  if (!bill) {
    return null;
  }

  return (
    <Link
      to={billHref}
      aria-label={`${bill.title} ${badgeLabel}`}
      className={`group block w-full cursor-pointer overflow-hidden rounded-3xl border border-gi-light-gray-dark bg-white no-underline text-gi-primary ${FOCUS_CLASS_NAME}`}
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
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gi-dark-ash bg-transparent text-gi-primary transition-colors group-hover:bg-gi-primary/10"
          >
            <span
              className={`${BUTTON_ICON_MASK_CLASS_NAME} h-5 w-[17.5px] mask-contain`}
              style={getIconMaskStyle(arrowRightIcon)}
            />
          </span>
        </div>

        <BillStageProgress
          currentStep={bill.currentStep}
          totalSteps={totalSteps}
        />

        {bill.statusLine ? (
          <p className="text-[14px] leading-[20px] font-normal wrap-break-word text-gi-dark-gray">
            {bill.statusLine}
          </p>
        ) : null}
      </div>
    </Link>
  );
};
