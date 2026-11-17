import { getScalePosition, getScaleRange } from "./getScalePosition";

describe("getScalePosition", () => {
  describe("given a value inside the scale", () => {
    it("maps it to a percentage", () => {
      expect(getScalePosition(50, 200)).toBe(25);
    });
  });

  describe("given a value above the maximum", () => {
    it("clamps to the end of the scale", () => {
      expect(getScalePosition(505, 200)).toBe(100);
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

describe("getScaleRange", () => {
  describe("given a range inside the scale", () => {
    it("returns its left offset and width", () => {
      expect(getScaleRange(10, 60, 200)).toEqual({ left: 5, width: 25 });
    });
  });

  describe("given a range reaching past the maximum", () => {
    it("clamps the end to the scale", () => {
      expect(getScaleRange(150, 300, 200)).toEqual({ left: 75, width: 25 });
    });
  });

  describe("given a reversed range", () => {
    it("still returns a non-negative width", () => {
      expect(getScaleRange(60, 10, 200)).toEqual({ left: 5, width: 25 });
    });
  });
});
