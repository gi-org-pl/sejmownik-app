import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";

export type MpsListEmptyReason = "noMatch" | "noMps";

export type MpsListProps = {
  /** Lista już przefiltrowana i posortowana przez stronę-rodzica. */
  mps: MpCardProps[];
  /** Ile kart widać na początku. Domyślnie INITIAL_VISIBLE_COUNT (12). */
  initialVisibleCount?: number;
  /** Dlaczego lista jest pusta: filtr nic nie znalazł albo nie mamy danych. */
  emptyReason: MpsListEmptyReason;
  /** Fraza z wyszukiwarki, pokazywana w komunikacie "noMatch". */
  query?: string;
};
