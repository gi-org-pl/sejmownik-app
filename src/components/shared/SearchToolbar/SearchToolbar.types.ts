export type SearchToolbarSortOption<TSort extends string> = {
  value: TSort;
  label: string;
};

export type SearchToolbarProps<TSort extends string = string> = {
  query: string;
  onQueryChange: (query: string) => void;
  searchLabel: string;
  searchPlaceholder: string;
  sortOptions: ReadonlyArray<SearchToolbarSortOption<TSort>>;
  sort: TSort;
  onSortChange: (sort: TSort) => void;
};
