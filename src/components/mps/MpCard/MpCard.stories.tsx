import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { MpCard } from "./MpCard";
import type { MpCardProps } from "./MpCard.types";

const baseArgs: MpCardProps = {
  id: 1,
  firstName: "Andrzej",
  lastName: "Domański",
  clubName: "Koalicja Obywatelska",
  photoUrl: null,
  participationPercent: 76,
  interpellations: { count: 117, median: 30.5, q1: 5, q3: 80, scaleMax: 200 },
};

const meta: Meta<typeof MpCard> = {
  title: "Mps/MpCard",
  component: MpCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-72">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: baseArgs,
};

export default meta;
type Story = StoryObj<typeof MpCard>;

export const Default: Story = {};

export const LongName: Story = {
  args: { firstName: "Władysław", lastName: "Bartoszewski" },
};

export const NoClub: Story = { args: { clubName: null } };

export const NoPhoto: Story = { args: { photoUrl: null } };

export const NoMetricData: Story = {
  args: {
    participationPercent: null,
    interpellations: { ...baseArgs.interpellations, count: null },
  },
};
