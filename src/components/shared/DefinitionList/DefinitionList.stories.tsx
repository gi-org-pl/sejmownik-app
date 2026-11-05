import type { Meta, StoryObj } from "@storybook/react-vite";
import { DefinitionList } from "./DefinitionList";

const meta = {
  title: "Shared/DefinitionList",
  component: DefinitionList,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-80">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DefinitionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Słowniczek",
    info: "Krótki opis kluczowych pojęć z procesu legislacyjnego.",
    items: [
      {
        key: "druk",
        term: "Druk",
        description: "Dokument zawierający projekt ustawy.",
      },
      {
        key: "czytanie",
        term: "Czytanie",
        description: "Omówienie projektu ustawy w Sejmie.",
      },
      {
        key: "wiekszosc",
        term: "Większość bezwzględna",
        description: "Więcej niż połowa ważnie oddanych głosów.",
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    title: "Szczegóły",
    items: [
      {
        key: "votes",
        term: "Głosy w wyborach 2023",
        description: "38 426",
      },
    ],
  },
};

export const WithSource: Story = {
  args: {
    title: "Szczegóły",
    items: [
      {
        key: "votes",
        term: "Głosy w wyborach 2023",
        description: "38 426",
      },
      {
        key: "oath",
        term: "Ślubowanie",
        description: "13.11.2023",
      },
      {
        key: "education",
        term: "Wykształcenie",
        description: "wyższe",
      },
      {
        key: "profession",
        term: "Zawód",
        description: "prawnik",
      },
    ],
    source: {
      label: "Źródło danych: api.sejm.gov.pl",
      href: "https://api.sejm.gov.pl",
    },
  },
};
