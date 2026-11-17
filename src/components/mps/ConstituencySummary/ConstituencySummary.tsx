import { Trans } from "@lingui/react/macro";
import type { ConstituencySummaryProps } from "./ConstituencySummary.types";
import { formatMpCount } from "./utils/formatMpCount";

export const ConstituencySummary = ({
  number,
  name,
  mpCount,
  includesAbroadVotes,
}: ConstituencySummaryProps) => {
  const count = formatMpCount(mpCount);

  return (
    <div className="flex w-full flex-col gap-1">
      <h2 className="font-(family-name:--font-heading) text-2xl leading-8 font-bold text-gi-primary">
        <Trans>
          Okręg nr {number} · {name}
        </Trans>
      </h2>
      <p className="text-sm leading-5 text-gi-primary">
        {includesAbroadVotes ? (
          <Trans>{count} · także głosy oddane za granicą</Trans>
        ) : (
          count
        )}
      </p>
    </div>
  );
};
