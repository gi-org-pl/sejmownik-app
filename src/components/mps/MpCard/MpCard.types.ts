export type MpCardInterpellations = {
  count: number | null;
  median: number;
  q1: number;
  q3: number;
  scaleMax: number;
};

export type MpCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  clubName: string | null;
  photoUrl: string | null;
  participationPercent: number | null;
  interpellations: MpCardInterpellations;
};
