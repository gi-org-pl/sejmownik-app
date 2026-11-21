import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";

export type Constituency = {
  number: number;
  name: string;
  /** Miejscowości, po których użytkownik może znaleźć ten okręg. */
  cities: string[];
  includesAbroadVotes: boolean;
  mps: MpCardProps[];
};

export type MpsFixture = {
  termNumber: number;
  /** Liczba wszystkich posłów w Sejmie (nagłówek strony i legenda). */
  totalMpCount: number;
  /** Statystyki interpelacji całego Sejmu, wspólne dla wszystkich kart. */
  interpellationStats: {
    median: number;
    q1: number;
    q3: number;
    scaleMax: number;
  };
  constituencies: Constituency[];
};
