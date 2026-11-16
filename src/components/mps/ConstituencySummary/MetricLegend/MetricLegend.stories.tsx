import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetricLegend } from "./MetricLegend";

const meta: Meta<typeof MetricLegend> = {
  title: "Mps/MetricLegend",
  component: MetricLegend,
  args: {
    participationFrom: 64,
    participationTo: 66,
    sittingsLabel: "posiedzenia 64–66",
    totalMps: 460,
    medianInterpellations: 30.5,
  },
};

export default meta;
type Story = StoryObj<typeof MetricLegend>;

export const Default: Story = {};

export const NoSittingsRange: Story = {
  args: { sittingsLabel: undefined },
};
