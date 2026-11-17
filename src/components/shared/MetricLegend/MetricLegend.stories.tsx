import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetricLegend } from "./MetricLegend";

const meta: Meta<typeof MetricLegend> = {
  title: "Shared/MetricLegend",
  component: MetricLegend,
  parameters: {
    docs: {
      description: {
        component:
          "Explains the MetricBar marks. Each item has a `symbol` (`percent` or `median`, drawn like the bar) and a `label` you write for the place where the legend is used.",
      },
    },
  },
  args: {
    items: [
      {
        symbol: "percent",
        label: "Głosowania: udział w głosowaniach, posiedzenia 64–66",
      },
      {
        symbol: "median",
        label:
          "Interpelacje: pozycja wśród 460 posłów, kreska = mediana Sejmu (30,5)",
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof MetricLegend>;

export const Default: Story = {};

export const PercentOnly: Story = {
  args: {
    items: [{ symbol: "percent", label: "Frekwencja klubu w głosowaniach" }],
  },
};

export const MedianOnly: Story = {
  args: {
    items: [
      { symbol: "median", label: "Kropka: wynik posła, kreska: mediana" },
    ],
  },
};
