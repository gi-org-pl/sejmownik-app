import type { ReactNode } from "react";

export type MetricLegendSymbol = "percent" | "median";

export type MetricLegendItem = {
  symbol: MetricLegendSymbol;
  label: ReactNode;
};

export type MetricLegendProps = {
  items: readonly MetricLegendItem[];
};
