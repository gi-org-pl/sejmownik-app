export type FilterChipsOption = {
  id: string;
  label: string;
  count: number;
};

export type FilterChipsProps = {
  label: string;
  options: FilterChipsOption[];
  totalCount: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};
