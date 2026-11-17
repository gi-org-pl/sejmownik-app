/**
 * inline: label, bar and value in one row (MP list card).
 * stacked: label and value above the bar (MP profile header).
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
 * Scale from 0 to `scaleMax` that shows the MP's value against all MPs,
 * e.g. interpellation count. The statistics are computed by the data layer.
 */
export type MedianMetricProps = {
  variant: "median";
  label: string;
  layout?: MetricLayout;
  /** The MP's value, drawn as the dot; null = no data. */
  value: number | null;
  /** Sejm median, drawn as the tick. */
  median: number;
  /** 25th percentile, start of the middle-half band. */
  q1: number;
  /** 75th percentile, end of the middle-half band. */
  q3: number;
  /** End of the scale, e.g. the 95th percentile; larger values are clamped. */
  scaleMax: number;
};

export type MpMetricBarProps = PercentMetricProps | MedianMetricProps;
