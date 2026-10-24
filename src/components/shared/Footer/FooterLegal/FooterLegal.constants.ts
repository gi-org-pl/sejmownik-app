import { PATHS } from "@/constants/paths";
import type { LinkItem } from "./FooterLegal.types";

export const LEGAL_LINKS: LinkItem[] = [
  { label: "Regulamin", href: PATHS.terms },
  { label: "Prywatność", href: PATHS.privacy },
  { label: "O nas", href: PATHS.about },
];
