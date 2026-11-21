import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import type { FilterChipsOption } from "@/components/shared/FilterChips/FilterChips.types";
import { normalizeText } from "./normalizeText";

export const getClubId = (clubName: string) =>
  normalizeText(clubName)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Przyciski klubów: tylko kluby, które mają posłów na liście, od największego
// do najmniejszego, a przy remisie alfabetycznie. Posłowie bez klubu są tylko
// w przycisku "Wszystkie".
export const getClubOptions = (
  mps: MpCardProps[],
  shortNames: Readonly<Record<string, string>>,
): FilterChipsOption[] => {
  const options = new Map<string, FilterChipsOption>();

  for (const { clubName } of mps) {
    if (!clubName) {
      continue;
    }

    const id = getClubId(clubName);
    const existing = options.get(id);

    options.set(id, {
      id,
      label: shortNames[clubName] ?? clubName,
      count: (existing?.count ?? 0) + 1,
    });
  }

  return [...options.values()].sort(
    (first, second) =>
      second.count - first.count ||
      first.label.localeCompare(second.label, "pl"),
  );
};
