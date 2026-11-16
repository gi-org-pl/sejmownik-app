import { Trans, useLingui } from "@lingui/react/macro";
import type {
  InterpellationsMetricProps,
  MpMetricBarProps,
  ParticipationMetricProps,
} from "./MpMetricBar.types";
import { getScalePosition } from "./utils/getScalePosition";

const ROW_CLASS = "flex items-center gap-2 text-sm leading-5";
const LABEL_CLASS = "w-21 shrink-0 text-gi-dark-gray";
const VALUE_CLASS =
  "min-w-8.5 shrink-0 text-right font-bold whitespace-nowrap text-gi-primary";

const ParticipationBar = ({ label, percent }: ParticipationMetricProps) => {
  const { i18n } = useLingui();

  return (
    <div className={ROW_CLASS}>
      <span className={LABEL_CLASS}>{label}</span>
      <span aria-hidden="true" className="relative h-3 min-w-0 flex-1">
        <span className="absolute inset-x-0 top-[3px] h-1.5 rounded-full bg-gi-dark-ash" />
        {percent !== null && (
          <span
            data-testid="metric-fill"
            className="absolute top-[3px] left-0 h-1.5 rounded-full bg-gi-primary"
            style={{ width: `${getScalePosition(percent, 100)}%` }}
          />
        )}
      </span>
      <span className={VALUE_CLASS}>
        {percent !== null ? (
          `${i18n.number(percent)}%`
        ) : (
          <Trans>brak danych</Trans>
        )}
      </span>
    </div>
  );
};

const InterpellationsBar = ({
  label,
  count,
  rank,
  totalMps,
}: InterpellationsMetricProps) => {
  const { i18n } = useLingui();
  const dotPosition =
    count !== null && rank !== null
      ? getScalePosition(totalMps - rank, totalMps - 1)
      : null;

  return (
    <div className={ROW_CLASS}>
      <span className={LABEL_CLASS}>{label}</span>
      <span aria-hidden="true" className="relative h-3 min-w-0 flex-1">
        <span className="absolute inset-x-0 top-[3px] h-1.5 rounded-full bg-gi-dark-ash" />
        <span className="absolute inset-x-[5px] inset-y-0">
          <span className="absolute top-0 left-1/2 h-3 w-0.5 -translate-x-1/2 rounded-[1px] bg-gi-dark-gray" />
          {dotPosition !== null && (
            <span
              data-testid="metric-dot"
              className="absolute top-px size-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-gi-primary"
              style={{ left: `${dotPosition}%` }}
            />
          )}
        </span>
      </span>
      <span className={VALUE_CLASS}>
        {count !== null ? i18n.number(count) : <Trans>brak danych</Trans>}
      </span>
    </div>
  );
};

export const MpMetricBar = (props: MpMetricBarProps) =>
  props.variant === "participation" ? (
    <ParticipationBar {...props} />
  ) : (
    <InterpellationsBar {...props} />
  );
