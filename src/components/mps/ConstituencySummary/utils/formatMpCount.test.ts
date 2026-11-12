import { i18n } from "@lingui/core";
import { formatMpCount } from "./formatMpCount";

describe("formatMpCount", () => {
  beforeEach(() => {
    i18n.activate("pl");
  });

  describe("given 1 MP", () => {
    it("uses the singular form", () => {
      expect(formatMpCount(1)).toBe("1 poseł");
    });
  });

  describe("given 2 to 4 MPs", () => {
    it("uses the paucal form", () => {
      expect(formatMpCount(2)).toBe("2 posłowie");
      expect(formatMpCount(4)).toBe("4 posłowie");
    });
  });

  describe("given 0 or 5 and more MPs", () => {
    it("uses the genitive plural form", () => {
      expect(formatMpCount(0)).toBe("0 posłów");
      expect(formatMpCount(5)).toBe("5 posłów");
      expect(formatMpCount(20)).toBe("20 posłów");
    });
  });

  describe("given numbers like 12 and 22", () => {
    it("follows Polish plural rules", () => {
      expect(formatMpCount(12)).toBe("12 posłów");
      expect(formatMpCount(22)).toBe("22 posłowie");
    });
  });
});
