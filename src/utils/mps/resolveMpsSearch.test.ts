import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import type { Constituency } from "@/types/mps";
import { resolveMpsSearch } from "./resolveMpsSearch";

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

const createConstituency = (
  number: number,
  name: string,
  cities: string[],
  mps: MpCardProps[],
): Constituency => ({
  number,
  name,
  cities,
  includesAbroadVotes: false,
  mps,
});

const WARSZAWA = createConstituency(
  19,
  "Warszawa",
  ["Warszawa"],
  [createMp(1, "Jan", "Łoboda")],
);
const KRAKOW = createConstituency(
  13,
  "Kraków",
  ["Kraków", "Brzesko"],
  [createMp(2, "Anna", "Mazur")],
);
const TARNOW = createConstituency(
  14,
  "Tarnów",
  ["Tarnów", "Brzesko"],
  [createMp(3, "Piotr", "Mazurek")],
);
const ALL = [WARSZAWA, KRAKOW, TARNOW];

const search = (query: string, constituencies = ALL) =>
  resolveMpsSearch({
    query,
    constituencies,
    defaultConstituencyNumber: 19,
  });

describe("resolveMpsSearch", () => {
  it("returns noData when there are no constituencies", () => {
    expect(search("x", [])).toEqual({ type: "noData" });
  });

  it("shows the default constituency for an empty query", () => {
    expect(search("  ")).toEqual({
      type: "constituency",
      constituency: WARSZAWA,
      otherConstituencies: [],
    });
  });

  it("falls back to the first constituency when the default is missing", () => {
    expect(search("", [KRAKOW, TARNOW])).toMatchObject({
      constituency: KRAKOW,
    });
  });

  it("finds a constituency by city, ignoring case and diacritics", () => {
    expect(search("krakow")).toEqual({
      type: "constituency",
      constituency: KRAKOW,
      otherConstituencies: [],
    });
  });

  it("returns the first constituency and the others for a shared city", () => {
    expect(search("Brzesko")).toEqual({
      type: "constituency",
      constituency: KRAKOW,
      otherConstituencies: [TARNOW],
    });
  });

  it("lists matching MPs across constituencies for a surname", () => {
    const result = search("Mazur");

    expect(result.type).toBe("mps");
    expect(result).toMatchObject({
      mps: [{ lastName: "Mazur" }, { lastName: "Mazurek" }],
    });
  });

  it("matches a full name and a surname typed without diacritics", () => {
    expect(search("jan loboda")).toMatchObject({ type: "mps" });
    expect(search("loboda")).toMatchObject({ type: "mps" });
  });

  it("returns none when nothing matches", () => {
    expect(search("Atlantyda")).toEqual({ type: "none" });
  });
});
