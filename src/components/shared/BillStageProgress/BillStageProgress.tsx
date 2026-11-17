import { useLingui } from "@lingui/react/macro";
import type { BillStageProgressProps } from "./BillStageProgress.types";

export const BillStageProgress = ({
  currentStep,
  totalSteps,
}: BillStageProgressProps) => {
  const { t } = useLingui();

  if (
    !Number.isInteger(totalSteps) ||
    totalSteps < 1 ||
    currentStep == null ||
    !Number.isInteger(currentStep) ||
    currentStep < 1 ||
    currentStep > totalSteps
  ) {
    return null;
  }

  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep}
      aria-label={t`Etap ${currentStep} z ${totalSteps}`}
      className="flex w-full gap-1"
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const segment = index + 1;

        return (
          <span
            key={segment}
            className={`h-2 min-w-0 flex-1 rounded-full ${
              segment < currentStep
                ? "bg-gi-light-primary"
                : segment === currentStep
                  ? "bg-gi-secondary"
                  : "bg-gi-dark-ash"
            }`}
          />
        );
      })}
    </div>
  );
};
