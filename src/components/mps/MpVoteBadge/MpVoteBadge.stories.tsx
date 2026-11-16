import type { Meta, StoryObj } from "@storybook/react-vite";
import { MpVoteBadge } from "./MpVoteBadge";
import type { MpVoteBadgeProps } from "./MpVoteBadge.types";

const meta = {
  title: "mps/MpVoteBadge",
  component: MpVoteBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Badge showing how an MP voted. Meaning comes from the icon **and** the text label (not colour alone).

### Types

\`\`\`ts
type MpVote = "yes" | "no" | "abstain" | "absent";

type MpVoteBadgeProps = {
  vote: MpVote | null; // null = no vote recorded → "brak danych"
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
  } satisfies MpVoteBadgeProps,
  argTypes: {
    vote: {
      description:
        'Recorded vote: `"yes"` | `"no"` | `"abstain"` | `"absent"`, or `null` when none is recorded.',
      control: "select",
      options: ["yes", "no", "abstain", "absent", null],
      table: {
        type: {
          summary: "MpVote | null",
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
} satisfies Meta<typeof MpVoteBadge>;

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
      <MpVoteBadge vote="yes" />
      <MpVoteBadge vote="no" />
      <MpVoteBadge vote="abstain" />
      <MpVoteBadge vote="absent" />
      <MpVoteBadge vote={null} />
    </div>
  ),
};

export const AllIcons: Story = {
  name: "Wszystkie ikony",
  args: { vote: "yes", showLabel: false },
  render: () => (
    <div className="flex items-center gap-3">
      <MpVoteBadge vote="yes" showLabel={false} />
      <MpVoteBadge vote="no" showLabel={false} />
      <MpVoteBadge vote="abstain" showLabel={false} />
      <MpVoteBadge vote="absent" showLabel={false} />
      <MpVoteBadge vote={null} showLabel={false} />
    </div>
  ),
};
