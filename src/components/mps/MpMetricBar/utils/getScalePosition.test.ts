import { getScalePosition } from "./getScalePosition";

describe("getScalePosition", () => {
  describe("given a value inside the scale", () => {
    it("maps it to a percentage", () => {
      expect(getScalePosition(50, 200)).toBe(25);
    });
  });

  describe("given a value above the maximum", () => {
    it("clamps to the end of the scale", () => {
      expect(getScalePosition(505, 460)).toBe(100);
    });
  });

  describe("given a negative value", () => {
    it("clamps to the start of the scale", () => {
      expect(getScalePosition(-5, 100)).toBe(0);
    });
  });

  describe("given a non-positive maximum", () => {
    it("returns the start of the scale", () => {
      expect(getScalePosition(10, 0)).toBe(0);
    });
  });
});
