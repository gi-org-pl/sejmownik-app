import { Button } from "@gi-org-pl/athena";
import { Trans, useLingui } from "@lingui/react/macro";
import type { ClubFilterProps } from "./ClubFilter.types";

export const ClubFilter = ({
  options,
  totalCount,
  selectedId,
  onSelect,
}: ClubFilterProps) => {
  const { t, i18n } = useLingui();

  const visibleOptions = options.filter((option) => option.count > 0);
  const activeId = visibleOptions.some((option) => option.id === selectedId)
    ? selectedId
    : null;

  return (
    <div
      role="group"
      aria-label={t`Filtruj według klubu`}
      className="flex flex-wrap gap-2"
    >
      <Button
        type={activeId === null ? "primary" : "outlined"}
        aria-pressed={activeId === null}
        onClick={() => onSelect(null)}
      >
        <Trans>Wszystkie</Trans>{" "}
        <span className="font-normal opacity-70">
          {i18n.number(totalCount)}
        </span>
      </Button>
      {visibleOptions.map((option) => (
        <Button
          key={option.id}
          type={activeId === option.id ? "primary" : "outlined"}
          aria-pressed={activeId === option.id}
          onClick={() => onSelect(option.id)}
        >
          {option.label}{" "}
          <span className="font-normal opacity-70">
            {i18n.number(option.count)}
          </span>
        </Button>
      ))}
    </div>
  );
};