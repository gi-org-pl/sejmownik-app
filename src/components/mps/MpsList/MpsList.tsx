import { Button } from "@gi-org-pl/athena";
import { plural } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import { useEffect, useMemo, useRef, useState } from "react";
import chevronDownIcon from "@/assets/icons/chevron-down.svg";
import { MpCard } from "@/components/mps/MpCard/MpCard";
import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import { INITIAL_VISIBLE_COUNT } from "./MpsList.constants";
import type { MpsListProps } from "./MpsList.types";

type MpsListItem = { key: string; mp: MpCardProps };

// React wymaga unikalnych kluczy. Gdy w danych jest zdublowane id, drugi (i
// kolejny) wpis dostaje przyrostek, dzięki czemu oba się renderują.
const getListItems = (mps: MpCardProps[]): MpsListItem[] => {
  const seen = new Map<number, number>();

  return mps.map((mp) => {
    const occurrence = seen.get(mp.id) ?? 0;
    seen.set(mp.id, occurrence + 1);

    return {
      key: occurrence === 0 ? String(mp.id) : `${mp.id}-duplicate-${occurrence}`,
      mp,
    };
  });
};

const getDuplicateIds = (mps: MpCardProps[]): number[] => {
  const seen = new Set<number>();
  const duplicates = new Set<number>();

  for (const { id } of mps) {
    if (seen.has(id)) {
      duplicates.add(id);
    }
    seen.add(id);
  }

  return [...duplicates];
};

export const MpsList = ({
  mps,
  initialVisibleCount = INITIAL_VISIBLE_COUNT,
  emptyReason,
  query,
}: MpsListProps) => {
  const { t } = useLingui();
  const listRef = useRef<HTMLUListElement>(null);
  const shouldFocusRevealedRef = useRef(false);

  const items = useMemo(() => getListItems(mps), [mps]);

  // "Odcisk" listy: zmienia się, gdy rodzic poda inne posłanki/posłów (np. nowy
  // filtr). Dzięki temu rozwinięcie dotyczy tylko konkretnej listy i po zmianie
  // filtra wracamy do 12 kart bez żadnego ręcznego resetowania stanu.
  const listKey = items.map((item) => item.key).join(",");
  const [expandedListKey, setExpandedListKey] = useState<string | null>(null);
  const isExpanded = expandedListKey === listKey;

  const totalCount = items.length;
  const visibleItems = isExpanded ? items : items.slice(0, initialVisibleCount);
  const hasHiddenItems = totalCount > visibleItems.length;

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    const duplicateIds = getDuplicateIds(mps);

    if (duplicateIds.length > 0) {
      console.warn(
        `MpsList: duplicate MP id(s): ${duplicateIds.join(", ")}. Both entries are rendered, fix the data source.`,
      );
    }
  }, [mps]);

  // Przycisk znika po kliknięciu, więc bez tego fokus "wypadłby" ze strony.
  // Przenosimy go na pierwszą nowo pokazaną kartę (czyli na link w jej <li>).
  useEffect(() => {
    if (!isExpanded || !shouldFocusRevealedRef.current) {
      return;
    }

    shouldFocusRevealedRef.current = false;
    listRef.current?.children[initialVisibleCount]
      ?.querySelector<HTMLElement>("a")
      ?.focus();
  }, [isExpanded, initialVisibleCount]);

  if (totalCount === 0) {
    return (
      <p
        role="status"
        className="py-10 text-center text-base leading-5 text-gi-dark-gray"
      >
        {emptyReason === "noMatch" ? (
          query ? (
            t`Nie znaleziono posłów dla „${query}”`
          ) : (
            <Trans>Nie znaleziono posłów</Trans>
          )
        ) : (
          <Trans>Brak danych o posłach</Trans>
        )}
      </p>
    );
  }

  const handleShowAll = () => {
    shouldFocusRevealedRef.current = true;
    setExpandedListKey(listKey);
  };

  const listLabel = plural(totalCount, {
    one: "# poseł",
    few: "# posłowie",
    many: "# posłów",
    other: "# posła",
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <ul
        ref={listRef}
        aria-label={listLabel}
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visibleItems.map(({ key, mp }) => (
          <li key={key} className="min-w-0">
            <MpCard {...mp} />
          </li>
        ))}
      </ul>

      {hasHiddenItems ? (
        <Button
          type="ghost"
          variant="primary"
          className="font-bold"
          onClick={handleShowAll}
          RightIcon={
            <span
              aria-hidden="true"
              className={`${BUTTON_ICON_MASK_CLASS_NAME} h-4 w-3 mask-contain`}
              style={getIconMaskStyle(chevronDownIcon)}
            />
          }
        >
          <Trans>Pokaż wszystkich ({totalCount})</Trans>
        </Button>
      ) : null}
    </div>
  );
};
