import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";

export type Constituency = {
  number: number;
  name: string;
  includesAbroadVotes: boolean;
  mps: MpCardProps[];
};

export type MpsFixture = {
  termNumber: number;
  totalMpCount: number;
  interpellationStats: {
    median: number;
    q1: number;
    q3: number;
    scaleMax: number;
  };
  constituencies: Constituency[];
};
