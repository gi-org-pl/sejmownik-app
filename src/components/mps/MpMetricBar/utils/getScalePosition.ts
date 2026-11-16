export const getScalePosition = (value: number, max: number): number => {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (value / max) * 100));
};
