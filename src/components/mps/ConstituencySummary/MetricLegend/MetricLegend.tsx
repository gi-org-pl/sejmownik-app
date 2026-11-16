import { plural } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import { formatDecimal } from "../utils/formatDecimal";
import type { MetricLegendProps } from "./MetricLegend.types";

export const MetricLegend = ({
  participationFrom,
  participationTo,
  totalMps,
  medianInterpellations,
}: MetricLegendProps) => {
  const { i18n } = useLingui();

  const hasRange =
    participationFrom !== undefined && participationTo !== undefined;
  const hasMedian = medianInterpellations !== undefined;
  const median = hasMedian
    ? formatDecimal(medianInterpellations, i18n.locale)
    : "";
  const mps = plural(totalMps, {
    one: "# posła",
    few: "# posłów",
    many: "# posłów",
    other: "# posła",
  });

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm leading-5 text-gi-primary">
      <li className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="relative h-1.5 w-8 shrink-0 rounded-full bg-gi-dark-ash"
        >
          <span className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-gi-secondary" />
        </span>
        <span>
          {hasRange ? (
            <Trans>
              Głosowania: udział w głosowaniach, posiedzenia {participationFrom}
              –{participationTo}
            </Trans>
          ) : (
            <Trans>Głosowania: udział w głosowaniach</Trans>
          )}
        </span>
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="relative h-3 w-8 shrink-0">
          <span className="absolute inset-x-0 top-[3px] h-1.5 rounded-full bg-gi-dark-ash" />
          <span className="absolute top-0 left-[15px] h-3 w-0.5 rounded-[1px] bg-gi-dark-gray" />
          <span className="absolute top-px left-[19px] size-2.5 rounded-full border-2 border-white bg-gi-secondary" />
        </span>
        <span>
          {hasMedian ? (
            <Trans>
              Interpelacje: pozycja wśród {mps}, kreska = mediana Sejmu (
              {median})
            </Trans>
          ) : (
            <Trans>
              Interpelacje: pozycja wśród {mps}, kreska = mediana Sejmu
            </Trans>
          )}
        </span>
      </li>
    </ul>
  );
};
