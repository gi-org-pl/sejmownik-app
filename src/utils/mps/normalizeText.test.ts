import { normalizeText } from "./normalizeText";

describe("normalizeText", () => {
  it("lowercases and strips Polish diacritics including ł", () => {
    expect(normalizeText("Łódź Kraków Żółć")).toBe("lodz krakow zolc");
  });

  it("trims and collapses whitespace", () => {
    expect(normalizeText("  Jan   Kowalski ")).toBe("jan kowalski");
  });
});
