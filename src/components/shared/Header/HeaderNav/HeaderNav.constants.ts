import billsIcon from "@/assets/vectors/bills-icon.svg";
import educationIcon from "@/assets/vectors/education-icon.svg";
import mpsIcon from "@/assets/vectors/mps-icon.svg";
import { PATHS } from "@/constants/paths";
import type {
  HeaderNavEntry,
  HeaderNavLook,
  HeaderNavVariant,
} from "./HeaderNav.types";

export const HEADER_NAV_ENTRIES: HeaderNavEntry[] = [
  {
    key: "bills",
    label: "Ustawy",
    path: PATHS.bills,
    icon: billsIcon,
    iconClassName: "h-4 w-3",
  },
  {
    key: "mps",
    label: "Posłowie",
    path: PATHS.mps,
    icon: mpsIcon,
    iconClassName: "h-3.75 w-4.5",
  },
  {
    key: "education",
    label: "Edukacja",
    path: PATHS.education,
    icon: educationIcon,
    iconClassName: "h-4 w-5",
  },
];

export const HEADER_NAV_LOOKS: Record<HeaderNavVariant, HeaderNavLook> = {
  bar: {
    className: "hidden gap-3 md:flex",
    entries: HEADER_NAV_ENTRIES,
  },
  menu: {
    className:
      "absolute top-full left-0 z-50 mt-px flex w-full flex-col gap-3 border-b border-[#d4e1e4] bg-white px-3.75 py-6 md:hidden",
    entries: [...HEADER_NAV_ENTRIES].reverse(),
  },
};
