import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MpsSearchToolbar } from "./MpsSearchToolbar";
import type { SortOption } from "./MpsSearchToolbar.types";

type StoryProps = {
  initialQuery?: string;
  initialSort?: SortOption;
};

const MpsSearchToolbarStory = ({
  initialQuery = "",
  initialSort = "surnameAsc",
}: StoryProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortOption>(initialSort);

  return (
    <MpsSearchToolbar
      query={query}
      onQueryChange={setQuery}
      sort={sort}
      onSortChange={setSort}
    />
  );
};

const meta: Meta<typeof MpsSearchToolbarStory> = {
  title: "Mps/MpsSearchToolbar",
  component: MpsSearchToolbarStory,
};

export default meta;
type Story = StoryObj<typeof MpsSearchToolbarStory>;

export const Default: Story = {};

export const FilledQuery: Story = {
  args: { initialQuery: "" },
};

export const ReverseSort: Story = {
  args: { initialSort: "surnameDesc" },
};
