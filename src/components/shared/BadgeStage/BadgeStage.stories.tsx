import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeStage } from "./BadgeStage";
import type { BadgeStageProps } from "./BadgeStage.types";

const meta = {
  title: "Shared/BadgeStage",
  component: BadgeStage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Short label that says where a bill is right now. Presentational: the parent maps the bill's status to a label and translates it; the component has no list of known stages and one look only. The stage is conveyed by words, not colour. Labels are short, so the text stays on one line and the badge simply grows with it (no width limit, never truncated). An empty or whitespace-only label renders nothing (and warns in development).

### Types

\`\`\`ts
type BadgeStageProps = {
  label: string; // "W komisji", "Uchwalona przez Sejm", "W tym tygodniu: II czytanie"
};
\`\`\`
        `,
      },
    },
  },
  args: {
    label: "W tym tygodniu: II czytanie",
  } satisfies BadgeStageProps,
  argTypes: {
    label: {
      description:
        "Already worded and translated stage label. Empty or whitespace-only renders nothing.",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof BadgeStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShortLabel: Story = {
  name: "Krótki tekst",
  args: { label: "W komisji" },
};

export const LongLabel: Story = {
  name: "Długi tekst",
  args: { label: "W tym tygodniu: II czytanie" },
};
