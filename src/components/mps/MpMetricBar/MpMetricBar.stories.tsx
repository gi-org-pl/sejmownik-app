import type { Meta, StoryObj } from "@storybook/react-vite";
import { MpMetricBar } from "./MpMetricBar";

const meta: Meta<typeof MpMetricBar> = {
  title: "Mps/MpMetricBar",
  component: MpMetricBar,
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MpMetricBar>;

export const Participation98: Story = {
  args: { variant: "participation", label: "Głosowania", percent: 98 },
};

export const ParticipationNoData: Story = {
  args: { variant: "participation", label: "Głosowania", percent: null },
};

export const Interpellations0: Story = {
  args: {
    variant: "interpellations",
    label: "Interpelacje",
    count: 0,
    rank: 460,
    totalMps: 460,
  },
};

export const Interpellations505: Story = {
  args: {
    variant: "interpellations",
    label: "Interpelacje",
    count: 505,
    rank: 1,
    totalMps: 460,
  },
};

export const InterpellationsNoData: Story = {
  args: {
    variant: "interpellations",
    label: "Interpelacje",
    count: null,
    rank: null,
    totalMps: 460,
  },
};
