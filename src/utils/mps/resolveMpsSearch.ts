import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import type { Constituency } from "@/types/mps";
import { normalizeText } from "./normalizeText";

export type MpsSearchResult =
  | { type: "noData" }
  | { type: "constituency"; constituency: Constituency }
  | { type: "mps"; mps: MpCardProps[] }
  | { type: "none" };

type ResolveMpsSearchParams = {
  query: string;
  constituencies: Constituency[];
  defaultConstituencyNumber: number;
};

// Pusta fraza pokazuje okręg domyślny, niepusta szuka posłów po imieniu
// i nazwisku we wszystkich okręgach.
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

    return { type: "constituency", constituency };
  }

  const mps = constituencies
    .flatMap((constituency) => constituency.mps)
    .filter((mp) =>
      normalizeText(`${mp.firstName} ${mp.lastName}`).includes(normalizedQuery),
    );

  return mps.length > 0 ? { type: "mps", mps } : { type: "none" };
};
