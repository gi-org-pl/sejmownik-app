import { useLingui } from "@lingui/react/macro";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { EducationCurrentStageCard } from "./EducationCurrentStageCard";
import type { EducationCurrentStageCardProps } from "./EducationCurrentStageCard.types";

const SENATE_BILL = {
  id: "skladki-zus-dla-artystow",
  title: "Składki ZUS dla artystów",
  currentStep: 5,
  statusLine: "Uchwalona przez Sejm 8 paź 2026 · czeka na stanowisko Senatu",
};

const EducationCurrentStageCardStory = (
  props: EducationCurrentStageCardProps,
) => {
  const { t } = useLingui();

  return (
    <MemoryRouter>
      <div className="w-full max-w-[700px]">
        <EducationCurrentStageCard
          {...props}
          badgeLabel={t`Teraz na tym etapie`}
        />
      </div>
    </MemoryRouter>
  );
};

const meta = {
  title: "Education/EducationCurrentStageCard",
  component: EducationCurrentStageCardStory,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    badgeLabel: "Teraz na tym etapie",
    bill: SENATE_BILL,
    totalSteps: 6,
    billHref: "/ustawy/skladki-zus-dla-artystow",
  },
} satisfies Meta<typeof EducationCurrentStageCardStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NotStarted: Story = {
  args: {
    bill: {
      id: SENATE_BILL.id,
      title: SENATE_BILL.title,
      currentStep: null,
      statusLine: "Projekt nie rozpoczął jeszcze procedowania",
    },
  },
};

export const Halfway: Story = {
  args: {
    bill: {
      ...SENATE_BILL,
      currentStep: 3,
      statusLine: "Po I czytaniu w Sejmie · skierowany do komisji",
    },
  },
};

export const AllStagesCompleted: Story = {
  args: {
    bill: {
      ...SENATE_BILL,
      currentStep: 6,
      statusLine: "Ustawa ogłoszona · procedura zakończona",
    },
  },
};

export const LongTitle: Story = {
  args: {
    bill: {
      ...SENATE_BILL,
      title:
        "Składki ZUS dla artystów wykonujących działalność na podstawie umowy o dzieło, którzy po zmianie ustawy mają być objęci obowiązkowym ubezpieczeniem społecznym",
    },
  },
};

export const WithoutStatusLine: Story = {
  args: {
    bill: {
      id: SENATE_BILL.id,
      title: SENATE_BILL.title,
      currentStep: SENATE_BILL.currentStep,
    },
  },
};
