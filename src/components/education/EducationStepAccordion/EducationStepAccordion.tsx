import { useLingui } from "@lingui/react/macro";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import type {
  EducationStep,
  EducationStepAccordionProps,
  PreparedEducationStep,
} from "./EducationStepAccordion.types";

// Athena has no accordion. These are native buttons and panels, wired to the
// WAI-ARIA accordion keyboard pattern.

const prepareSteps = (
  steps: readonly EducationStep[],
): PreparedEducationStep[] => {
  const counts = new Map<string, number>();

  for (const step of steps) {
    counts.set(step.key, (counts.get(step.key) ?? 0) + 1);
  }

  return steps.map((step, index) => ({
    ...step,
    openId: (counts.get(step.key) ?? 0) > 1 ? `index-${index}` : step.key,
  }));
};

const resolveInitialOpenId = (
  steps: readonly PreparedEducationStep[],
  initialOpenKey: string | undefined,
) => {
  if (initialOpenKey === undefined) {
    return null;
  }

  return steps.find((step) => step.key === initialOpenKey)?.openId ?? null;
};

// The duplicate-key warning depends on the keys joined into one string, not on
// the steps array, which callers may rebuild every render.
const KEY_SEPARATOR = "\u0000";

const warnAboutDuplicateKeys = (keys: readonly string[]) => {
  if (!import.meta.env.DEV) {
    return;
  }

  const seen = new Set<string>();
  const reported = new Set<string>();

  for (const key of keys) {
    if (seen.has(key) && !reported.has(key)) {
      reported.add(key);
      console.warn(
        `EducationStepAccordion: duplicate step key "${key}". Using the index as the fallback identity.`,
      );
    }

    seen.add(key);
  }
};

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    aria-hidden="true"
    focusable="false"
    className={`h-4 w-3 shrink-0 text-gi-light-primary motion-safe:transition-transform motion-reduce:transition-none ${
      isOpen ? "rotate-180" : ""
    }`}
  >
    <path
      d="M1.5 5.25 6 10.25 10.5 5.25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EducationStepAccordion = ({
  steps,
  initialOpenKey,
}: EducationStepAccordionProps) => {
  const { t } = useLingui();
  const baseId = useId();
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  // Cheap (one pass over a handful of steps), so it is not memoised.
  const preparedSteps = prepareSteps(steps);
  const keySignature = steps.map((step) => step.key).join(KEY_SEPARATOR);

  useEffect(() => {
    warnAboutDuplicateKeys(keySignature.split(KEY_SEPARATOR));
  }, [keySignature]);

  const [openId, setOpenId] = useState<string | null>(() =>
    resolveInitialOpenId(preparedSteps, initialOpenKey),
  );

  if (preparedSteps.length === 0) {
    return null;
  }

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const moveFocus = (index: number) => {
    headerRefs.current[index]?.focus();
  };

  // Enter and Space are left to the native <button>, which fires click for both.
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = preparedSteps.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveFocus(index === lastIndex ? 0 : index + 1);
        return;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(index === 0 ? lastIndex : index - 1);
        return;
      case "Home":
        event.preventDefault();
        moveFocus(0);
        return;
      case "End":
        event.preventDefault();
        moveFocus(lastIndex);
        return;
      default:
        return;
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {preparedSteps.map((step, index) => {
        const isOpen = openId === step.openId;
        const titleId = `${baseId}-title-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        const hasDescription = step.description.trim().length > 0;

        return (
          <div
            key={step.openId}
            className={`flex flex-col overflow-hidden rounded-[24px] border border-gi-light-gray-dark p-4 motion-safe:transition-colors motion-safe:duration-300 motion-reduce:transition-none ${
              isOpen ? "bg-gi-ash" : "bg-white"
            }`}
          >
            <h3 className="m-0">
              <button
                ref={(element) => {
                  headerRefs.current[index] = element;
                }}
                type="button"
                className={`flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent p-0 text-left ${FOCUS_CLASS_NAME}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={t`Krok ${step.number}: ${step.title}`}
                onClick={() => toggle(step.openId)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gi-secondary text-base leading-none font-bold motion-safe:transition-colors motion-reduce:transition-none ${
                    isOpen
                      ? "bg-gi-secondary text-white"
                      : "bg-transparent text-gi-secondary"
                  }`}
                >
                  {step.number}
                </span>
                <span
                  id={titleId}
                  className="min-w-0 flex-1 text-[20px] leading-[24px] font-bold text-gi-light-primary"
                >
                  {step.title}
                </span>
                <ChevronIcon isOpen={isOpen} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={titleId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex flex-col gap-5 pt-4 pl-14 text-[16px] leading-[22px] font-normal text-gi-primary">
                  {hasDescription ? <p>{step.description}</p> : null}
                  {step.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
