import type { Meta, StoryObj } from "@storybook/react-vite";
import { MpsPageHeader } from "./MpsPageHeader";

const meta: Meta<typeof MpsPageHeader> = {
  title: "Mps/MpsPageHeader",
  component: MpsPageHeader,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof MpsPageHeader>;

export const Default: Story = {
  args: { termNumber: 10, mpCount: 460 },
};

export const ZeroMps: Story = {
  name: "Zero MPs",
  args: { termNumber: 10, mpCount: 0 },
};
