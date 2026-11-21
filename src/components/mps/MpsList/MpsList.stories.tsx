import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import { MpsList } from "./MpsList";

const MP_NAMES: [string, string, string | null][] = [
  ["Władysław", "Bartoszewski", "PSL – Trzecia Droga"],
  ["Andrzej", "Domański", "Koalicja Obywatelska"],
  ["Aleksandra", "Gajewska", "Koalicja Obywatelska"],
  ["Piotr", "Gliński", "Prawo i Sprawiedliwość"],
  ["Bożenna", "Hołownia", "Polska 2050"],
  ["Klaudia", "Jachira", "Koalicja Obywatelska"],
  ["Marek", "Jakubiak", "Rozwój Plus"],
  ["Sebastian", "Kaleta", "Prawo i Sprawiedliwość"],
  ["Jarosław", "Krajewski", "Prawo i Sprawiedliwość"],
  ["Katarzyna", "Lubnauer", "Koalicja Obywatelska"],
  ["Dorota", "Łoboda", "Koalicja Obywatelska"],
  ["Sławomir", "Mentzen", "Konfederacja"],
  ["Anna", "Nowak", "Lewica"],
  ["Jan", "Kowalski", "Centrum"],
  ["Ewa", "Wiśniewska", null],
  ["Tomasz", "Zieliński", "Razem"],
  ["Maria", "Lewandowska", "Koalicja Obywatelska"],
  ["Paweł", "Kamiński", "Prawo i Sprawiedliwość"],
  ["Joanna", "Wójcik", "Lewica"],
  ["Michał", "Szymański", "PSL – Trzecia Droga"],
];

const createMps = (count: number): MpCardProps[] =>
  MP_NAMES.slice(0, count).map(([firstName, lastName, clubName], index) => ({
    id: index + 1,
    firstName,
    lastName,
    clubName,
    photoUrl: null,
    participationPercent: 76 + ((index * 7) % 24),
    interpellations: {
      // Zawsze za kreską mediany (30,5) i przed końcem pasma q3 (62).
      count: 40 + ((index * 8) % 21),
      median: 30.5,
      q1: 12,
      q3: 62,
      scaleMax: 120,
    },
  }));

const meta: Meta<typeof MpsList> = {
  title: "Mps/MpsList",
  component: MpsList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="max-w-300">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: { mps: createMps(20), emptyReason: "noMps" },
};

export default meta;
type Story = StoryObj<typeof MpsList>;

// 20 posłów: widać 12 kart i przycisk "Pokaż wszystkich (20)".
export const Default: Story = {};

// Wszystkie 20 kart naraz (initialVisibleCount = 20, więc przycisku nie ma).
export const Expanded: Story = { args: { initialVisibleCount: 20 } };

export const SixMps: Story = { args: { mps: createMps(6) } };

export const EmptyNoMatch: Story = {
  args: { mps: [], emptyReason: "noMatch", query: "Kowalski" },
};

export const EmptyNoData: Story = {
  args: { mps: [], emptyReason: "noMps" },
};
