import type { PillTabVariant } from "./PillTab.types";

export const PILL_TAB_BASE_CLASS_NAME =
  "inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-left text-sm leading-5 wrap-anywhere";

export const PILL_TAB_INTERACTIVE_CLASS_NAME =
  "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-primary";

export const PILL_TAB_VARIANT_CLASS_NAMES: Record<PillTabVariant, string> = {
  active: "border border-gi-primary bg-gi-primary font-bold text-white",
  inactive:
    "border border-gi-primary bg-transparent font-normal text-gi-primary",
  white: "border border-transparent bg-white font-normal text-gi-primary",
};

export const PILL_TAB_COUNT_CLASS_NAMES: Record<PillTabVariant, string> = {
  active: "font-normal",
  inactive: "font-normal text-gi-gray",
  white: "font-normal text-gi-gray",
};

const THOUSANDS_PATTERN = /\B(?=(\d{3})+(?!\d))/g;
const INTEGER_PART_PATTERN = /^-?\d+/;
const NON_BREAKING_SPACE = " ";

export const formatPillTabCount = (count: number): string =>
  String(count).replace(INTEGER_PART_PATTERN, (integerPart) =>
    integerPart.replace(THOUSANDS_PATTERN, NON_BREAKING_SPACE),
  );
