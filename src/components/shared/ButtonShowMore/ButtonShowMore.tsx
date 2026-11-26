import { Button } from "@gi-org-pl/athena";
import { useEffect } from "react";
import chevronDownIcon from "@/assets/vectors/chevron-down.svg";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import type { ButtonShowMoreProps } from "./ButtonShowMore.types";

// Overrides of Athena's ghost/primary Button, which are twMerge-d over its
// defaults: Figma has a bold 14/17 label, a height that hugs it (41 px) and a
// label that wraps instead of staying on one line. `max-w-full` lets a long
// label wrap inside a flex parent, where Athena's `shrink-0` would overflow.
const BUTTON_CLASS_NAME = `h-auto max-w-full py-3 text-left leading-[17px] font-bold whitespace-normal ${FOCUS_CLASS_NAME}`;

export const ButtonShowMore = ({
  label,
  onClick,
  showIcon = true,
  disabled = false,
}: ButtonShowMoreProps) => {
  const hasLabel = label.trim() !== "";

  useEffect(() => {
    if (!import.meta.env.DEV || hasLabel) {
      return;
    }
    console.warn("ButtonShowMore: missing label, nothing is rendered.");
  }, [hasLabel]);

  if (!hasLabel) {
    return null;
  }

  return (
    <Button
      type="ghost"
      variant="primary"
      disabled={disabled}
      onClick={() => onClick()}
      className={BUTTON_CLASS_NAME}
      RightIcon={
        showIcon ? (
          <span
            aria-hidden="true"
            data-testid="button-show-more-chevron"
            className={`${BUTTON_ICON_MASK_CLASS_NAME} h-[6.86px] w-3 mask-contain`}
            style={getIconMaskStyle(chevronDownIcon)}
          />
        ) : undefined
      }
    >
      {label}
    </Button>
  );
};
