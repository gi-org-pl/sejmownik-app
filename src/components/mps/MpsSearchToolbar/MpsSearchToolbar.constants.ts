import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import type { SortOption } from "./MpsSearchToolbar.types";

export const SORT_OPTIONS: SortOption[] = ["surnameAsc", "surnameDesc"];

export const SORT_OPTION_LABELS: Record<SortOption, MessageDescriptor> = {
  surnameAsc: msg`Nazwisko A–Ż`,
  surnameDesc: msg`Nazwisko Ż–A`,
};
