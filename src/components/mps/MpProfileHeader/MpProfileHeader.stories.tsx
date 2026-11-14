import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { MpProfileHeader } from "./MpProfileHeader";
import type { MpProfileHeaderProps } from "./MpProfileHeader.types";

const ROMAN_NUMERALS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
] as const;

const currentMp: MpProfileHeaderProps = {
  firstName: "Anna Maria",
  lastName: "Żukowska",
  photoUrl: null,
  clubName: "Koalicyjny Klub Parlamentarny Lewicy",
  clubHref: "/kluby/koalicyjny-klub-parlamentarny-lewicy",
  currentTermNumber: 10,
  terms: [
    { number: 8, roman: "VIII" },
    { number: 9, roman: "IX" },
    { number: 10, roman: "X" },
  ],
};

const meta = {
  title: "Mps/MpProfileHeader",
  component: MpProfileHeader,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  args: currentMp,
} satisfies Meta<typeof MpProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const photoUrl = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" fill="white"/><circle cx="64" cy="50" r="22" fill="currentColor"/><ellipse cx="64" cy="112" rx="36" ry="28" fill="currentColor"/></svg>`,
)}`;

export const Default: Story = {
  name: "Default (current MP, 3 terms)",
};

export const WithPhoto: Story = {
  name: "With photo",
  args: {
    photoUrl,
  },
};

export const LongName: Story = {
  name: "Long name",
  args: {
    firstName: "Aleksandra Konstantynopolitańczykówna",
    lastName: "Brzęczyszczykiewicz-Nowakowska",
  },
};

export const NoClub: Story = {
  name: "No club data",
  args: {
    clubName: null,
    clubHref: null,
  },
};

export const FormerMp: Story = {
  name: "Former MP",
  args: {
    terms: [{ number: 9, roman: "IX" }],
  },
};

export const NoTerms: Story = {
  name: "No terms data",
  args: {
    terms: [],
  },
};

export const AllTerms: Story = {
  name: "All terms",
  args: {
    terms: ROMAN_NUMERALS.map((roman, index) => ({
      number: index + 1,
      roman,
    })),
  },
};
