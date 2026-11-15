export type ClubFilterOption = {
  id: string;
  label: string;
  count: number;
};

export type ClubFilterProps = {
  options: ClubFilterOption[];
  totalCount: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};
