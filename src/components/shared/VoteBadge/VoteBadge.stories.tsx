import type { Meta, StoryObj } from "@storybook/react-vite";
import { VoteBadge } from "./VoteBadge";
import type { VoteBadgeProps } from "./VoteBadge.types";

const meta = {
  title: "Shared/VoteBadge",
  component: VoteBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Badge showing how an MP voted. Meaning comes from the icon **and** the text label (not colour alone).

### Types

\`\`\`ts
type Vote = "yes" | "no" | "abstain" | "absent";

type VoteBadgeProps = {
  vote: Vote | null; // null = no vote recorded → "brak danych"
  showLabel?: boolean; // default true; false = visual icon only (label remains as sr-only text)
};
\`\`\`

### Vote → UI

| \`vote\` | Label | Icon |
| --- | --- | --- |
| \`"yes"\` | Za | Green circle + check |
| \`"no"\` | Przeciw | Red circle + cross |
| \`"abstain"\` | Wstrzymał się | Ash circle + dark tilde |
| \`"absent"\` | Nie głosował | Outlined circle + minus |
| \`null\` | brak danych | Outlined circle, no icon |
        `,
      },
    },
  },
  args: {
    vote: "yes",
    showLabel: true,
  } satisfies VoteBadgeProps,
  argTypes: {
    vote: {
      description:
        'Recorded vote: `"yes"` | `"no"` | `"abstain"` | `"absent"`, or `null` when none is recorded.',
      control: "select",
      options: ["yes", "no", "abstain", "absent", null],
      table: {
        type: {
          summary: "Vote | null",
          detail: '"yes" | "no" | "abstain" | "absent" | null',
        },
        defaultValue: { summary: undefined },
      },
    },
    showLabel: {
      description:
        "When `true`, shows the visible text label. When `false`, only the circle icon is shown visually; the label stays as `sr-only` text for accessibility.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
} satisfies Meta<typeof VoteBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Za: Story = {
  name: "Za",
  args: { vote: "yes" },
};

export const Przeciw: Story = {
  name: "Przeciw",
  args: { vote: "no" },
};

export const WstrzymalSie: Story = {
  name: "Wstrzymał się",
  args: { vote: "abstain" },
};

export const NieGlosowal: Story = {
  name: "Nie głosował",
  args: { vote: "absent" },
};

export const BrakDanych: Story = {
  name: "Brak danych",
  args: { vote: null },
};

export const IconOnlyZa: Story = {
  name: "Ikona / Za",
  args: { vote: "yes", showLabel: false },
};

export const IconOnlyPrzeciw: Story = {
  name: "Ikona / Przeciw",
  args: { vote: "no", showLabel: false },
};

export const IconOnlyWstrzymalSie: Story = {
  name: "Ikona / Wstrzymał się",
  args: { vote: "abstain", showLabel: false },
};

export const IconOnlyNieGlosowal: Story = {
  name: "Ikona / Nie głosował",
  args: { vote: "absent", showLabel: false },
};

export const IconOnlyBrakDanych: Story = {
  name: "Ikona / Brak danych",
  args: { vote: null, showLabel: false },
};

export const AllBadges: Story = {
  name: "Wszystkie badge",
  args: { vote: "yes" },
  render: () => (
    <div className="flex flex-col gap-3">
      <VoteBadge vote="yes" />
      <VoteBadge vote="no" />
      <VoteBadge vote="abstain" />
      <VoteBadge vote="absent" />
      <VoteBadge vote={null} />
    </div>
  ),
};

export const AllIcons: Story = {
  name: "Wszystkie ikony",
  args: { vote: "yes", showLabel: false },
  render: () => (
    <div className="flex items-center gap-3">
      <VoteBadge vote="yes" showLabel={false} />
      <VoteBadge vote="no" showLabel={false} />
      <VoteBadge vote="abstain" showLabel={false} />
      <VoteBadge vote="absent" showLabel={false} />
      <VoteBadge vote={null} showLabel={false} />
    </div>
  ),
};
