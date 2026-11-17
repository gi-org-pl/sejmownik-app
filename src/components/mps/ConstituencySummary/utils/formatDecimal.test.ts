import { formatDecimal } from "./formatDecimal";

describe("formatDecimal", () => {
  describe("given a number with a fractional part", () => {
    it("uses a decimal comma", () => {
      expect(formatDecimal(30.5, "pl")).toBe("30,5");
    });
  });

  describe("given a whole number", () => {
    it("shows no decimal part", () => {
      expect(formatDecimal(30, "pl")).toBe("30");
    });
  });
});
