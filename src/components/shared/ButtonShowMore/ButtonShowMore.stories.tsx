import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ButtonShowMore } from "./ButtonShowMore";
import type { ButtonShowMoreProps } from "./ButtonShowMore.types";

const meta = {
  title: "Shared/ButtonShowMore",
  component: ButtonShowMore,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Button at the end of a long list that loads the next part. Presentational: the parent decides what "more" means, translates the label, hides the button when nothing is left and shows its own loading state. Placement is chosen by the parent. An empty label renders nothing.

### Types

\`\`\`ts
type ButtonShowMoreProps = {
  label: string; // "Pokaż 16 kolejnych", "Starsze głosowania"
  onClick: () => void;
  showIcon?: boolean; // chevron after the label; default true
  disabled?: boolean;
};
\`\`\`
        `,
      },
    },
  },
  args: {
    label: "Starsze głosowania",
    onClick: fn(),
  } satisfies ButtonShowMoreProps,
} satisfies Meta<typeof ButtonShowMore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcon: Story = {
  args: { label: "Pokaż 16 kolejnych", showIcon: false },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LongLabel: Story = {
  args: {
    label:
      "Pokaż kolejne głosowania z poprzednich posiedzeń Sejmu i komisji sejmowych",
  },
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
};

export const LongLabelInFlexRow: Story = {
  args: LongLabel.args,
  decorators: [
    (Story) => (
      <div className="flex w-60 justify-end">
        <Story />
      </div>
    ),
  ],
};
