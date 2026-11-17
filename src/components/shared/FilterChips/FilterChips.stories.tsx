import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FilterChips } from "./FilterChips";
import type { FilterChipsOption } from "./FilterChips.types";

const DEFAULT_OPTIONS: FilterChipsOption[] = [
  { id: "KO", label: "KO", count: 9 },
  { id: "PiS", label: "PiS", count: 3 },
  { id: "Lewica", label: "Lewica", count: 2 },
  { id: "Centrum", label: "Centrum", count: 1 },
  { id: "Konfederacja", label: "Konfederacja", count: 1 },
  { id: "Polska2050", label: "Polska 2050", count: 1 },
  { id: "PSL-TD", label: "PSL – TD", count: 1 },
  { id: "Razem", label: "Razem", count: 1 },
  { id: "RozwojPlus", label: "Rozwój Plus", count: 1 },
];

const MANY_OPTIONS: FilterChipsOption[] = [
  ...DEFAULT_OPTIONS,
  { id: "Wolnosciowcy", label: "Wolnościowcy", count: 2 },
  { id: "Niezrzeszeni", label: "Niezrzeszeni", count: 1 },
  { id: "Republikanie", label: "Republikanie", count: 1 },
];

type StoryProps = {
  options: FilterChipsOption[];
  initialSelectedId?: string | null;
};

const FilterChipsStory = ({
  options,
  initialSelectedId = null,
}: StoryProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId,
  );
  const totalCount = options.reduce((sum, option) => sum + option.count, 0);

  return (
    <FilterChips
      label="Filtruj według klubu"
      options={options}
      totalCount={totalCount}
      selectedId={selectedId}
      onSelect={setSelectedId}
    />
  );
};

const meta: Meta<typeof FilterChipsStory> = {
  title: "Shared/FilterChips",
  component: FilterChipsStory,
};

export default meta;
type Story = StoryObj<typeof FilterChipsStory>;

export const Default: Story = {
  args: { options: DEFAULT_OPTIONS },
};

export const ClubSelected: Story = {
  args: { options: DEFAULT_OPTIONS, initialSelectedId: "PiS" },
};

export const ManyClubsWrapping: Story = {
  args: { options: MANY_OPTIONS },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};
