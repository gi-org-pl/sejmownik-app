import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroUnderstand } from "./HeroUnderstand";

const meta = {
  title: "Education/HeroUnderstand",
  component: HeroUnderstand,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Jak liczą się mandaty",
    description:
      "Przesuń suwaki: zobacz, jak zmiana głosów, progu i metody przelicza się na miejsca w Sejmie.",
  },
} satisfies Meta<typeof HeroUnderstand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: { description: undefined },
};

export const LongText: Story = {
  args: {
    title:
      "Jak liczą się mandaty w wyborach do Sejmu przy różnych progach i metodach przeliczania głosów",
    description:
      "Przesuń suwaki: zobacz, jak zmiana głosów, progu i metody przelicza się na miejsca w Sejmie. Porównaj metodę D'Hondta z Sainte-Laguë i sprawdź, jak próg wyborczy wpływa na podział mandatów między komitety, także te, które łatwo przeoczyć.",
  },
};
