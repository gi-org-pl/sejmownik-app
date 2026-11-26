import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { Back } from "./Back";
import type { BackProps } from "./Back.types";

const meta = {
  title: "Shared/Back",
  component: Back,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Back link of a detail page. One link (arrow and label) that always leads to \`href\`; it does not use the browser history. The label and the target are built by the parent.

### Types

\`\`\`ts
type BackProps = {
  label: string; // "Posłowie · okręg nr 19", "Ustawy"; empty → fallback "Wróć"
  href: string; // "/poslowie"; empty → nothing is rendered
};
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    label: "Posłowie · okręg nr 19",
    href: "/poslowie",
  } satisfies BackProps,
} satisfies Meta<typeof Back>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortLabel: Story = {
  args: { label: "Ustawy", href: "/ustawy" },
};

export const LongLabel: Story = {
  args: {
    label:
      "Posłowie · okręg nr 19 · Komisja Sprawiedliwości i Praw Człowieka · bardzo długi opis",
  },
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
  parameters: { layout: "padded" },
};
