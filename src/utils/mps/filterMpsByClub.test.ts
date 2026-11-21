import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import { filterMpsByClub } from "./filterMpsByClub";

const createMp = (id: number, clubName: string | null): MpCardProps => ({
  id,
  firstName: "Jan",
  lastName: "Kowalski",
  clubName,
  photoUrl: null,
  participationPercent: null,
  interpellations: { count: null, median: 1, q1: 1, q3: 2, scaleMax: 3 },
});

const MPS = [createMp(1, "Razem"), createMp(2, null), createMp(3, "Razem")];

describe("filterMpsByClub", () => {
  it("returns everyone when no club is selected", () => {
    expect(filterMpsByClub(MPS, null)).toBe(MPS);
  });

  it("returns only the MPs of the selected club", () => {
    expect(filterMpsByClub(MPS, "razem").map((mp) => mp.id)).toEqual([1, 3]);
  });
});
