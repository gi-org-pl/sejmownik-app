export type SortOption = "surnameAsc" | "surnameDesc";

export type MpsSearchToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};
