import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { userEvent, within } from "storybook/test";
import { PATHS } from "@/constants/paths";
import { Header } from "./Header";

type HeaderStoryProps = {
  initialPath: string;
};

const HeaderStory = ({ initialPath }: HeaderStoryProps) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Header />
  </MemoryRouter>
);

const meta: Meta<typeof HeaderStory> = {
  title: "Shared/Header",
  component: HeaderStory,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    initialPath: PATHS.home,
  },
};

export default meta;

type Story = StoryObj<typeof HeaderStory>;

export const Default: Story = {};

export const ActiveUstawy: Story = {
  args: {
    initialPath: PATHS.bills,
  },
};

export const ActivePoslowie: Story = {
  args: {
    initialPath: PATHS.mps,
  },
};

export const ActiveEdukacja: Story = {
  args: {
    initialPath: PATHS.education,
  },
};

export const MenuOpen: Story = {
  args: {
    initialPath: PATHS.bills,
  },
  globals: {
    viewport: { value: "mobile1" },
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button"));
  },
};
