import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";

export type MpsSortDirection = "asc" | "desc";

const collator = new Intl.Collator("pl");

export const sortMpsByLastName = (
  mps: MpCardProps[],
  direction: MpsSortDirection,
): MpCardProps[] =>
  [...mps].sort((first, second) => {
    const order =
      collator.compare(first.lastName, second.lastName) ||
      collator.compare(first.firstName, second.firstName);

    return direction === "asc" ? order : -order;
  });
