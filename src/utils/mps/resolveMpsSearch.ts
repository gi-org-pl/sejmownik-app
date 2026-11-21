import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import type { Constituency } from "@/types/mps";
import { normalizeText } from "./normalizeText";

export type MpsSearchResult =
  | { type: "noData" }
  | {
      type: "constituency";
      constituency: Constituency;
      /** Inne okręgi z tą samą miejscowością (pokazujemy pierwszy i mówimy o reszcie). */
      otherConstituencies: Constituency[];
    }
  | { type: "mps"; mps: MpCardProps[] }
  | { type: "none" };

type ResolveMpsSearchParams = {
  query: string;
  constituencies: Constituency[];
  defaultConstituencyNumber: number;
};

// Reguła z issue #11: miejscowość wybiera okręg, a nazwisko daje listę posłów
// ze wszystkich okręgów. Pusta fraza pokazuje okręg domyślny.
export const resolveMpsSearch = ({
  query,
  constituencies,
  defaultConstituencyNumber,
}: ResolveMpsSearchParams): MpsSearchResult => {
  if (constituencies.length === 0) {
    return { type: "noData" };
  }

  const normalizedQuery = normalizeText(query);

  if (normalizedQuery === "") {
    const constituency =
      constituencies.find(
        (candidate) => candidate.number === defaultConstituencyNumber,
      ) ?? constituencies[0];

    return { type: "constituency", constituency, otherConstituencies: [] };
  }

  const cityMatches = constituencies.filter((constituency) =>
    [constituency.name, ...constituency.cities].some((city) =>
      normalizeText(city).startsWith(normalizedQuery),
    ),
  );

  if (cityMatches.length > 0) {
    const [constituency, ...otherConstituencies] = cityMatches;

    return { type: "constituency", constituency, otherConstituencies };
  }

  const mps = constituencies
    .flatMap((constituency) => constituency.mps)
    .filter(
      (mp) =>
        normalizeText(mp.lastName).startsWith(normalizedQuery) ||
        normalizeText(`${mp.firstName} ${mp.lastName}`).includes(
          normalizedQuery,
        ),
    );

  return mps.length > 0 ? { type: "mps", mps } : { type: "none" };
};
