import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import { sortMpsByLastName } from "./sortMpsByLastName";

const createMp = (
  id: number,
  firstName: string,
  lastName: string,
): MpCardProps => ({
  id,
  firstName,
  lastName,
  clubName: null,
  photoUrl: null,
  participationPercent: null,
  interpellations: { count: null, median: 1, q1: 1, q3: 2, scaleMax: 3 },
});

const MPS = [
  createMp(1, "Jan", "Żak"),
  createMp(2, "Anna", "Łoboda"),
  createMp(3, "Ewa", "Lubnauer"),
  createMp(4, "Adam", "Łoboda"),
];

const getIds = (mps: MpCardProps[]) => mps.map((mp) => mp.id);

describe("sortMpsByLastName", () => {
  it("sorts A–Ż using Polish letter order and the first name as tie-break", () => {
    expect(getIds(sortMpsByLastName(MPS, "asc"))).toEqual([3, 4, 2, 1]);
  });

  it("sorts Ż–A in the reverse order", () => {
    expect(getIds(sortMpsByLastName(MPS, "desc"))).toEqual([1, 2, 4, 3]);
  });

  it("does not mutate the input", () => {
    sortMpsByLastName(MPS, "asc");

    expect(getIds(MPS)).toEqual([1, 2, 3, 4]);
  });
});
