import { twMerge } from "tailwind-merge";
import {
  formatPillTabCount,
  PILL_TAB_BASE_CLASS_NAME,
  PILL_TAB_COUNT_CLASS_NAMES,
  PILL_TAB_INTERACTIVE_CLASS_NAME,
  PILL_TAB_VARIANT_CLASS_NAMES,
} from "./PillTab.constants";
import type { PillTabProps } from "./PillTab.types";

export const PillTab = ({
  label,
  count,
  variant = "inactive",
  onClick,
}: PillTabProps) => {
  if (!label) {
    if (import.meta.env.DEV) {
      console.warn("PillTab: empty label, nothing rendered.");
    }
    return null;
  }

  const isInteractive = onClick !== undefined;
  const className = twMerge(
    PILL_TAB_BASE_CLASS_NAME,
    PILL_TAB_VARIANT_CLASS_NAMES[variant],
    isInteractive && PILL_TAB_INTERACTIVE_CLASS_NAME,
  );

  const content = (
    <>
      <span>
        {label}
        {count !== undefined ? <span className="sr-only">,</span> : null}
      </span>
      {count !== undefined ? " " : null}
      {count !== undefined ? (
        <span className={PILL_TAB_COUNT_CLASS_NAMES[variant]}>
          {formatPillTabCount(count)}
        </span>
      ) : null}
    </>
  );

  if (!isInteractive) {
    return <span className={className}>{content}</span>;
  }

  return (
    <button
      type="button"
      className={className}
      aria-pressed={variant === "white" ? undefined : variant === "active"}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
