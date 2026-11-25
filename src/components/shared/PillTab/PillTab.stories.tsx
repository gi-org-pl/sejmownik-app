import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PillTab } from "./PillTab";

const meta: Meta<typeof PillTab> = {
  title: "Shared/PillTab",
  component: PillTab,
  tags: ["autodocs"],
  args: { label: "Wszystkie", onClick: () => {} },
  parameters: {
    docs: {
      description: {
        component: `
One pill: a filter or tab option, or, in the white look, a static tag (print number, "Projekt rządowy", committee, topic). Presentational: the parent decides which pill is selected and what a click does.
`,
      },
    },
  },
  argTypes: {
    label: {
      description:
        "Text of the pill. Comes from the parent, already translated.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    count: {
      description: "Counter after the label. Hidden when undefined.",
      control: "number",
      table: { type: { summary: "number" } },
    },
    variant: {
      description: "Visual state of the pill.",
      control: "inline-radio",
      options: ["active", "inactive", "white"],
      table: {
        type: { summary: '"active" | "inactive" | "white"' },
        defaultValue: { summary: '"inactive"' },
      },
    },
    onClick: {
      description: "Present: interactive button. Absent: static label.",
      table: { type: { summary: "() => void" } },
    },
  },
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
    label: "Komisja Polityki Społecznej",
    onClick: undefined,
  },
  decorators: [
    (Story) => (
      <div className="bg-gi-light-gray p-4">
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
