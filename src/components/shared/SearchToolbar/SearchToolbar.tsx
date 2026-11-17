import { ActionList, Input, Select } from "@gi-org-pl/athena";
import { useLingui } from "@lingui/react/macro";
import searchIcon from "@/assets/vectors/search-icon.svg";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import type { SearchToolbarProps } from "./SearchToolbar.types";

export const SearchToolbar = <TSort extends string>({
  query,
  onQueryChange,
  searchLabel,
  searchPlaceholder,
  sortOptions,
  sort,
  onSortChange,
}: SearchToolbarProps<TSort>) => {
  const { t } = useLingui();
  const currentSortLabel =
    sortOptions.find((option) => option.value === sort)?.label ?? "";

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:w-100">
        <Input
          aria-label={searchLabel}
          placeholder={searchPlaceholder}
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
      <Select
        aria-label={t`Sortuj: ${currentSortLabel}`}
        className="h-auto px-4 py-3"
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
          items={sortOptions.map((option) => ({
            label: option.label,
            isSelected: option.value === sort,
            onClick: () => onSortChange(option.value),
          }))}
        />
      </Select>
    </div>
  );
};
