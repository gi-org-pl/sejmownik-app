import { Trans, useLingui } from "@lingui/react/macro";
import type { ReactNode } from "react";
import type {
  MedianMetricProps,
  MetricLayout,
  MpMetricBarProps,
  PercentMetricProps,
} from "./MpMetricBar.types";
import { getScalePosition, getScaleRange } from "./utils/getScalePosition";

const TEXT_CLASS = "text-sm leading-4";
const LABEL_CLASS = "font-normal text-gi-dark-gray";
const VALUE_CLASS = "font-bold whitespace-nowrap text-gi-primary";

type MetricRowProps = {
  layout: MetricLayout;
  label: string;
  value: ReactNode;
  bar: ReactNode;
  children?: ReactNode;
};

const MetricRow = ({ layout, label, value, bar, children }: MetricRowProps) =>
  layout === "stacked" ? (
    <div className={`flex flex-col ${TEXT_CLASS}`}>
      <div className="flex h-5 items-center justify-between gap-2">
        <span className={LABEL_CLASS}>{label}</span>
        <span className={VALUE_CLASS}>{value}</span>
      </div>
      {bar}
      {children}
    </div>
  ) : (
    <div className={`flex items-center gap-2 ${TEXT_CLASS}`}>
      <span className={`w-20 shrink-0 ${LABEL_CLASS}`}>{label}</span>
      {bar}
      <span className={`min-w-7.5 shrink-0 text-right ${VALUE_CLASS}`}>
        {value}
      </span>
      {children}
    </div>
  );

const barPlacement = (layout: MetricLayout, stackedSpacing: string) =>
  layout === "stacked" ? stackedSpacing : "min-w-0 flex-1";

const PercentBar = ({
  label,
  percent,
  layout = "inline",
}: PercentMetricProps) => {
  const { i18n } = useLingui();

  return (
    <MetricRow
      layout={layout}
      label={label}
      value={
        percent !== null ? (
          `${i18n.number(percent)}%`
        ) : (
          <Trans>brak danych</Trans>
        )
      }
      bar={
        <span
          aria-hidden="true"
          className={`relative h-1.5 rounded-full bg-gi-dark-ash ${barPlacement(layout, "mt-3")}`}
        >
          {percent !== null && (
            <span
              data-testid="metric-fill"
              className="absolute inset-y-0 left-0 rounded-full bg-gi-primary"
              style={{ width: `${getScalePosition(percent, 100)}%` }}
            />
          )}
        </span>
      }
    />
  );
};

const MedianBar = ({
  label,
  value,
  median,
  q1,
  q3,
  scaleMax,
  layout = "inline",
}: MedianMetricProps) => {
  const { i18n } = useLingui();
  const dotPosition = value !== null ? getScalePosition(value, scaleMax) : null;
  const medianPosition = getScalePosition(median, scaleMax);
  const middleHalf = getScaleRange(q1, q3, scaleMax);
  const formattedMedian = i18n.number(median);

  return (
    <MetricRow
      layout={layout}
      label={label}
      value={value !== null ? i18n.number(value) : <Trans>brak danych</Trans>}
      bar={
        <span
          aria-hidden="true"
          className={`relative h-5 ${barPlacement(layout, "my-1")}`}
        >
          <span className="absolute inset-x-0 top-[7px] h-1.5 rounded-full bg-gi-dark-ash" />
          <span className="absolute inset-x-2 inset-y-0">
            <span
              data-testid="metric-middle"
              className="absolute top-[7px] h-1.5 rounded-full bg-gi-light-primary/35"
              style={{
                left: `${middleHalf.left}%`,
                width: `${middleHalf.width}%`,
              }}
            />
            <span
              data-testid="metric-median"
              className="absolute top-0 h-5 w-[1.5px] -translate-x-1/2 bg-gi-primary"
              style={{ left: `${medianPosition}%` }}
            />
            {dotPosition !== null && (
              <span
                data-testid="metric-dot"
                className="absolute top-0.5 size-4 -translate-x-1/2 rounded-full border-2 border-white bg-gi-primary"
                style={{ left: `${dotPosition}%` }}
              />
            )}
          </span>
        </span>
      }
    >
      <span className="sr-only">
        <Trans>mediana Sejmu: {formattedMedian}</Trans>
      </span>
    </MetricRow>
  );
};

export const MpMetricBar = (props: MpMetricBarProps) =>
  props.variant === "percent" ? (
    <PercentBar {...props} />
  ) : (
    <MedianBar {...props} />
  );
