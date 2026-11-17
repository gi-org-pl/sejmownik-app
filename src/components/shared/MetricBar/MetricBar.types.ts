/**
 * inline: label, bar and value in one row (e.g. a list card).
 * stacked: label and value above the bar (e.g. a profile header).
 */
export type MetricLayout = "inline" | "stacked";

/** Fill bar for a share of a whole, e.g. voting attendance. */
export type PercentMetricProps = {
  variant: "percent";
  label: string;
  layout?: MetricLayout;
  /** 0–100, null = no data. */
  percent: number | null;
};

/**
 * Scale from 0 to `scaleMax` that shows one value against the whole group,
 * e.g. interpellation count. The statistics are computed by the data layer.
 */
export type MedianMetricProps = {
  variant: "median";
  label: string;
  layout?: MetricLayout;
  /** The value, drawn as the dot; null = no data. */
  value: number | null;
  /** Group median, drawn as the tick. */
  median: number;
  /** 25th percentile, start of the middle-half band. */
  q1: number;
  /** 75th percentile, end of the middle-half band. */
  q3: number;
  /** End of the scale, e.g. the 95th percentile; larger values are clamped. */
  scaleMax: number;
};

export type MetricBarProps = PercentMetricProps | MedianMetricProps;
