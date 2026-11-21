import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import { getClubId, getClubOptions } from "./getClubOptions";

const createMp = (id: number, clubName: string | null): MpCardProps => ({
  id,
  firstName: "Jan",
  lastName: "Kowalski",
  clubName,
  photoUrl: null,
  participationPercent: null,
  interpellations: { count: null, median: 1, q1: 1, q3: 2, scaleMax: 3 },
});

describe("getClubId", () => {
  it("builds a url-safe id from the club name", () => {
    expect(getClubId("PSL – Trzecia Droga")).toBe("psl-trzecia-droga");
  });
});

describe("getClubOptions", () => {
  it("counts MPs per club, largest first, then alphabetically", () => {
    const options = getClubOptions(
      [
        createMp(1, "Razem"),
        createMp(2, "Koalicja Obywatelska"),
        createMp(3, "Koalicja Obywatelska"),
        createMp(4, "Centrum"),
      ],
      { "Koalicja Obywatelska": "KO" },
    );

    expect(options).toEqual([
      { id: "koalicja-obywatelska", label: "KO", count: 2 },
      { id: "centrum", label: "Centrum", count: 1 },
      { id: "razem", label: "Razem", count: 1 },
    ]);
  });

  it("skips MPs without a club", () => {
    expect(getClubOptions([createMp(1, null)], {})).toEqual([]);
  });
});
