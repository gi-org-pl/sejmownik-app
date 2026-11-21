import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import { getClubId } from "./getClubOptions";

export const filterMpsByClub = (
  mps: MpCardProps[],
  clubId: string | null,
): MpCardProps[] =>
  clubId === null
    ? mps
    : mps.filter(
        (mp) => mp.clubName !== null && getClubId(mp.clubName) === clubId,
      );
