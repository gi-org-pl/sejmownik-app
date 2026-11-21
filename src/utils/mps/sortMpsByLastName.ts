import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";

export type MpsSortDirection = "asc" | "desc";

// Polski collator układa litery z ogonkami po polsku (Ł po L, Ż na końcu).
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
