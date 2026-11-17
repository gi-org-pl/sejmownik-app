/** Maps a value on a 0–max scale to a 0–100 position, clamped to the scale. */
export const getScalePosition = (value: number, max: number): number => {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (value / max) * 100));
};

/** Maps a from–to range on a 0–max scale to a clamped left offset and width. */
export const getScaleRange = (
  from: number,
  to: number,
  max: number,
): { left: number; width: number } => {
  const left = getScalePosition(Math.min(from, to), max);
  const right = getScalePosition(Math.max(from, to), max);

  return { left, width: right - left };
};
