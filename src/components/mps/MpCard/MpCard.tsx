import { useLingui } from "@lingui/react/macro";
import { Link } from "react-router";
import { MetricBar } from "@/components/shared/MetricBar/MetricBar";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { PATHS } from "@/constants/paths";
import type { MpCardProps } from "./MpCard.types";
import { MpCardHeader } from "./MpCardHeader/MpCardHeader";

export const MpCard = ({
  id,
  firstName,
  lastName,
  clubName,
  photoUrl,
  participationPercent,
  interpellations,
}: MpCardProps) => {
  const { t } = useLingui();
  const accessibleName = `${firstName} ${lastName}, ${clubName ?? t`Brak klubu`}`;

  return (
    <Link
      to={`${PATHS.mps}/${id}`}
      aria-label={accessibleName}
      className={`flex h-full flex-col gap-4 rounded-3xl border border-gi-light-gray-dark bg-gi-ash p-4 no-underline ${FOCUS_CLASS_NAME}`}
    >
      <MpCardHeader
        firstName={firstName}
        lastName={lastName}
        clubName={clubName}
        photoUrl={photoUrl}
      />
      <div className="flex flex-col gap-4">
        <MetricBar
          variant="percent"
          layout="stacked"
          label={t`Głosowania`}
          percent={participationPercent}
        />
        <MetricBar
          variant="median"
          layout="stacked"
          label={t`Interpelacje`}
          value={interpellations.count}
          median={interpellations.median}
          q1={interpellations.q1}
          q3={interpellations.q3}
          scaleMax={interpellations.scaleMax}
        />
      </div>
    </Link>
  );
};
