import { useLingui } from "@lingui/react/macro";
import type { BillStageProgressProps } from "./BillStageProgress.types";

export const BillStageProgress = ({
  currentStep: currentStepProp,
  totalSteps,
}: BillStageProgressProps) => {
  const { t } = useLingui();

  if (!Number.isInteger(totalSteps) || totalSteps < 1) {
    return null;
  }

  const currentStep = currentStepProp == null ? 0 : currentStepProp;

  if (
    !Number.isInteger(currentStep) ||
    currentStep < 0 ||
    currentStep > totalSteps
  ) {
    return null;
  }

  return (
    <div
      role="progressbar"
      aria-valuemin={currentStep === 0 ? 0 : 1}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep}
      aria-label={
        currentStep === 0
          ? t`Żaden etap się nie rozpoczął`
          : t`Etap ${currentStep} z ${totalSteps}`
      }
      className="flex w-full gap-1"
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const segment = index + 1;

        return (
          <span
            key={segment}
            className={`h-2 min-w-0 flex-1 rounded-full ${
              currentStep === 0
                ? "bg-gi-dark-ash"
                : segment < currentStep
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
