import type { Meta, StoryObj } from "@storybook/react-vite";
import { BillStageProgress } from "./BillStageProgress";

const meta = {
  title: "Shared/BillStageProgress",
  component: BillStageProgress,
  args: {
    currentStep: 5,
    totalSteps: 6,
  },
} satisfies Meta<typeof BillStageProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotStarted: Story = {
  args: {
    currentStep: null,
  },
};

export const Halfway: Story = {
  args: {
    currentStep: 3,
    totalSteps: 6,
  },
};

export const AllStagesCompleted: Story = {
  args: {
    currentStep: 6,
    totalSteps: 6,
  },
};
