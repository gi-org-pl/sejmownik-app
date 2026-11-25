import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentType } from "react";
import { MemoryRouter } from "react-router";
import { ArrowButton } from "./ArrowButton";
import type { ArrowButtonProps } from "./ArrowButton.types";

const meta: Meta<typeof ArrowButton> = {
  title: "Shared/ArrowButton",
  component: ArrowButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A round arrow that tells the user a card or banner leads somewhere. With `href` it is a link, with `onClick` a button, with neither a decorative arrow hidden from assistive technology. Interactive modes need a `label`.",
      },
    },
  },
  argTypes: {
    tone: {
      description: "Light surface (`light`) or dark banner (`dark`).",
      control: "inline-radio",
      options: ["light", "dark"],
      table: {
        type: { summary: '"light" | "dark"' },
        defaultValue: { summary: '"light"' },
      },
    },
    label: {
      description:
        "Accessible name. Required when interactive, comes from the parent already translated.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    href: {
      description:
        "Renders a link. Internal values use the router link, external ones a plain anchor.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    onClick: {
      description: "Renders a button.",
      table: { type: { summary: "() => void" } },
    },
  },
};

export default meta;
type Story = StoryObj<ArrowButtonProps>;

export const Light: Story = {
  args: { tone: "light", href: "/ustawy", label: "Zobacz ustawy" },
};

export const Dark: Story = {
  args: { tone: "dark", href: "/ustawy", label: "Zobacz ustawy" },
  decorators: [
    (Story: ComponentType) => (
      <div className="inline-block rounded-2xl bg-gi-primary p-6">
        <Story />
      </div>
    ),
  ],
};

export const AsButton: Story = {
  args: { onClick: () => {}, label: "Otwórz szczegóły" },
};

export const Decorative: Story = {
  render: () => (
    <a
      href="/ustawy/1"
      className="flex w-80 items-center justify-between gap-4 rounded-3xl border border-gi-light-gray-dark bg-white p-4 text-gi-primary no-underline"
    >
      <span className="text-lg font-bold">Ustawa o ochronie zwierząt</span>
      <ArrowButton />
    </a>
  ),
};
