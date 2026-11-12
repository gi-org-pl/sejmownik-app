import type { Meta, StoryObj } from "@storybook/react-vite";
import { EducationStepAccordion } from "./EducationStepAccordion";

const meta = {
  title: "education/EducationStepAccordion",
  component: EducationStepAccordion,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[784px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EducationStepAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllCollapsed: Story = {};

export const SenateOpen: Story = {
  args: { initialOpenKey: "senate" },
};
