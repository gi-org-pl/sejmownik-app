import { FOCUS_CLASS_NAME } from "@/constants/focus";
import type { ArrowButtonTone } from "./ArrowButton.types";

export const ARROW_BUTTON_BASE_CLASS_NAME =
  "flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors";

export const ARROW_BUTTON_TONE_CLASS_NAMES: Record<ArrowButtonTone, string> = {
  light: "border-gi-primary bg-transparent text-gi-primary",
  dark: "border-white bg-gi-primary text-white",
};

export const ARROW_BUTTON_HOVER_CLASS_NAMES: Record<ArrowButtonTone, string> = {
  light: "hover:bg-gi-dark-ash",
  dark: "hover:bg-gi-primary-hover",
};

export const ARROW_BUTTON_INTERACTIVE_CLASS_NAME = `cursor-pointer ${FOCUS_CLASS_NAME}`;

export const ARROW_BUTTON_ICON_CLASS_NAME = "size-6 mask-contain";

export const EXTERNAL_HREF_PATTERN = /^([a-z][a-z\d+.-]*:|\/\/)/i;
