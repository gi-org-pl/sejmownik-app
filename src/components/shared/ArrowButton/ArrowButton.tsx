import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import chevronRightIcon from "@/assets/icons/chevron-right.svg";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import {
  ARROW_BUTTON_BASE_CLASS_NAME,
  ARROW_BUTTON_HOVER_CLASS_NAMES,
  ARROW_BUTTON_ICON_CLASS_NAME,
  ARROW_BUTTON_INTERACTIVE_CLASS_NAME,
  ARROW_BUTTON_TONE_CLASS_NAMES,
  EXTERNAL_HREF_PATTERN,
} from "./ArrowButton.constants";
import type { ArrowButtonProps } from "./ArrowButton.types";

const ArrowIcon = () => (
  <span
    aria-hidden="true"
    className={`${BUTTON_ICON_MASK_CLASS_NAME} ${ARROW_BUTTON_ICON_CLASS_NAME}`}
    style={getIconMaskStyle(chevronRightIcon)}
  />
);

export const ArrowButton = ({
  tone = "light",
  label,
  href,
  onClick,
}: ArrowButtonProps) => {
  const isInteractive = href !== undefined || onClick !== undefined;
  const isNamed = Boolean(label);

  if (isInteractive && !isNamed && import.meta.env.DEV) {
    console.warn("ArrowButton: interactive arrow without a label.");
  }

  if (!isInteractive || !isNamed) {
    return (
      <span
        aria-hidden="true"
        className={twMerge(
          ARROW_BUTTON_BASE_CLASS_NAME,
          ARROW_BUTTON_TONE_CLASS_NAMES[tone],
        )}
      >
        <ArrowIcon />
      </span>
    );
  }

  const className = twMerge(
    ARROW_BUTTON_BASE_CLASS_NAME,
    ARROW_BUTTON_TONE_CLASS_NAMES[tone],
    ARROW_BUTTON_INTERACTIVE_CLASS_NAME,
    ARROW_BUTTON_HOVER_CLASS_NAMES[tone],
  );

  if (href !== undefined) {
    if (EXTERNAL_HREF_PATTERN.test(href)) {
      return (
        <a href={href} aria-label={label} className={className}>
          <ArrowIcon />
        </a>
      );
    }

    return (
      <Link to={href} aria-label={label} className={className}>
        <ArrowIcon />
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={onClick}
    >
      <ArrowIcon />
    </button>
  );
};
