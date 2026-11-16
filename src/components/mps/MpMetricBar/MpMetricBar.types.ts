export type ParticipationMetricProps = {
  variant: "participation";
  label: string;
  percent: number | null;
};

export type InterpellationsMetricProps = {
  variant: "interpellations";
  label: string;
  count: number | null;
  rank: number | null;
  totalMps: number;
};

export type MpMetricBarProps =
  | ParticipationMetricProps
  | InterpellationsMetricProps;
