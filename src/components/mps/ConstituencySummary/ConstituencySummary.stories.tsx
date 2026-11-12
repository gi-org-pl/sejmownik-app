import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConstituencySummary } from "./ConstituencySummary";

const meta: Meta<typeof ConstituencySummary> = {
  title: "Mps/ConstituencySummary",
  component: ConstituencySummary,
};

export default meta;
type Story = StoryObj<typeof ConstituencySummary>;

export const WarsawWithAbroadVotes: Story = {
  args: {
    number: 19,
    name: "Warszawa",
    mpCount: 20,
    includesAbroadVotes: true,
  },
};

export const SingleMpNoAbroadVotes: Story = {
  args: {
    number: 19,
    name: "Warszawa",
    mpCount: 1,
    includesAbroadVotes: false,
  },
};
