export type DefinitionListItem = {
  key: string;
  term: string;
  description: string | null;
};

export type DefinitionListSource = {
  label: string;
  href?: string;
};

export type DefinitionListProps = {
  title: string;
  items: DefinitionListItem[];
  emptyMessage?: string;
  info?: string;
  source?: DefinitionListSource;
};
