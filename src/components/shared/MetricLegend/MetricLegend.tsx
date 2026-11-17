import type { ComponentType } from "react";
import type {
  MetricLegendProps,
  MetricLegendSymbol,
} from "./MetricLegend.types";

const PercentSwatch = () => (
  <span
    aria-hidden="true"
    data-testid="metric-legend-swatch-percent"
    className="relative h-1.5 w-8 shrink-0 rounded-full bg-gi-dark-ash"
  >
    <span className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-gi-primary" />
  </span>
);

const MedianSwatch = () => (
  <span
    aria-hidden="true"
    data-testid="metric-legend-swatch-median"
    className="relative h-3 w-8 shrink-0"
  >
    <span className="absolute inset-x-0 top-[3px] h-1.5 rounded-full bg-gi-dark-ash" />
    <span className="absolute top-[3px] left-[8px] h-1.5 w-[16px] rounded-full bg-gi-light-primary/35" />
    <span className="absolute top-0 left-[15px] h-3 w-0.5 rounded-[1px] bg-gi-primary" />
    <span className="absolute top-px left-[19px] size-2.5 rounded-full border-2 border-white bg-gi-primary" />
  </span>
);

const SWATCHES: Record<MetricLegendSymbol, ComponentType> = {
  percent: PercentSwatch,
  median: MedianSwatch,
};

export const MetricLegend = ({ items }: MetricLegendProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm leading-5 text-gi-primary">
      {items.map((item, index) => {
        const Swatch = SWATCHES[item.symbol];

        return (
          <li key={index} className="flex items-center gap-2">
            <Swatch />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
};
