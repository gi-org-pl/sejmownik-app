import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PillTab } from "./PillTab";

const meta: Meta<typeof PillTab> = {
  title: "Shared/PillTab",
  component: PillTab,
  args: { label: "Wszystkie", onClick: () => {} },
};

export default meta;
type Story = StoryObj<typeof PillTab>;

export const ActiveWithCount: Story = {
  args: { variant: "active", count: 20 },
};

export const InactiveWithCount: Story = {
  args: { variant: "inactive", count: 1234 },
};

export const ActiveNoCount: Story = {
  args: { variant: "active" },
};

export const InactiveNoCount: Story = {
  args: { variant: "inactive" },
};

export const WhiteWithCount: Story = {
  args: { variant: "white", count: 12 },
  decorators: [
    (Story) => (
      <div className="bg-gi-light-gray p-4">
        <Story />
      </div>
    ),
  ],
};

export const WhiteNoCount: Story = {
  args: { variant: "white" },
  decorators: WhiteWithCount.decorators,
};

export const StaticTag: Story = {
  args: {
    variant: "white",
    label: "Komisja Polityki Społecznej i Rodziny",
    onClick: undefined,
  },
  decorators: [
    (Story) => (
      <div className="max-w-48 bg-gi-light-gray p-4">
        <Story />
      </div>
    ),
  ],
};

const GROUP_ITEMS = [
  { id: "all", label: "Wszystkie", count: 20 },
  { id: "gov", label: "Rządowe", count: 8 },
  { id: "mps", label: "Poselskie", count: 12 },
  { id: "empty", label: "Obywatelskie", count: 0 },
];

const GroupStory = () => {
  const [selectedId, setSelectedId] = useState("all");

  return (
    <div role="group" aria-label="Filtr ustaw" className="flex flex-wrap gap-2">
      {GROUP_ITEMS.map((item) => (
        <PillTab
          key={item.id}
          label={item.label}
          count={item.count}
          variant={selectedId === item.id ? "active" : "inactive"}
          onClick={() => setSelectedId(item.id)}
        />
      ))}
    </div>
  );
};

export const Group: Story = {
  render: () => <GroupStory />,
};
