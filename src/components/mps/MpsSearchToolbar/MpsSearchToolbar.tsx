import { ActionList, Input, Select } from "@gi-org-pl/athena";
import { useLingui } from "@lingui/react/macro";
import searchIcon from "@/assets/vectors/search-icon.svg";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import { SORT_OPTION_LABELS, SORT_OPTIONS } from "./MpsSearchToolbar.constants";
import type { MpsSearchToolbarProps } from "./MpsSearchToolbar.types";

export const MpsSearchToolbar = ({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: MpsSearchToolbarProps) => {
  const { t, i18n } = useLingui();
  const currentSortLabel = i18n._(SORT_OPTION_LABELS[sort]);

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:w-100">
        <Input
          aria-label={t`Szukaj posła lub okręgu`}
          placeholder={t`Miejscowość lub nazwisko posła`}
          value={query}
          onChange={onQueryChange}
          LeftIcon={
            <span
              aria-hidden="true"
              className={`${BUTTON_ICON_MASK_CLASS_NAME} size-4.5 mask-contain`}
              style={getIconMaskStyle(searchIcon)}
            />
          }
        />
      </div>
      <div className="hidden md:block">
        <Select
          aria-label={t`Sortuj posłów: ${currentSortLabel}`}
          value={
            <>
              <span className="text-sm font-normal text-gi-dark-gray">
                {t`Sortuj:`}
              </span>{" "}
              {currentSortLabel}
            </>
          }
        >
          <ActionList
            items={SORT_OPTIONS.map((option) => ({
              label: i18n._(SORT_OPTION_LABELS[option]),
              isSelected: option === sort,
              onClick: () => onSortChange(option),
            }))}
          />
        </Select>
      </div>
    </div>
  );
};
