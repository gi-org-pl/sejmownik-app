import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SearchToolbar } from "./SearchToolbar";
import type { SearchToolbarSortOption } from "./SearchToolbar.types";

type SortOption = "surnameAsc" | "surnameDesc";

const SORT_OPTIONS: ReadonlyArray<SearchToolbarSortOption<SortOption>> = [
  { value: "surnameAsc", label: "Nazwisko A–Ż" },
  { value: "surnameDesc", label: "Nazwisko Ż–A" },
];

type StoryProps = {
  initialQuery?: string;
  initialSort?: SortOption;
};

const SearchToolbarStory = ({
  initialQuery = "",
  initialSort = "surnameAsc",
}: StoryProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortOption>(initialSort);

  return (
    <SearchToolbar
      query={query}
      onQueryChange={setQuery}
      searchLabel="Szukaj posła lub okręgu"
      searchPlaceholder="Miejscowość lub nazwisko posła"
      sortOptions={SORT_OPTIONS}
      sort={sort}
      onSortChange={setSort}
    />
  );
};

const meta: Meta<typeof SearchToolbarStory> = {
  title: "Shared/SearchToolbar",
  component: SearchToolbarStory,
};

export default meta;
type Story = StoryObj<typeof SearchToolbarStory>;

export const Default: Story = {};

export const FilledQuery: Story = {
  args: { initialQuery: "Kowalski" },
};

export const ReverseSort: Story = {
  args: { initialSort: "surnameDesc" },
};
