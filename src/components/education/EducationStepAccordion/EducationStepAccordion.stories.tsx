import type { Meta, StoryObj } from "@storybook/react-vite";
import { EducationStepNotes } from "../EducationStepNotes/EducationStepNotes";
import { EducationStepAccordion } from "./EducationStepAccordion";
import type { EducationStep } from "./EducationStepAccordion.types";

const STEPS: EducationStep[] = [
  {
    key: "submission",
    number: 1,
    title: "Inicjatywa ustawodawcza",
    description:
      "Projekt ustawy wpływa do Marszałka Sejmu i dostaje numer druku. Wnioskodawca przedstawia skutki finansowe jego wykonania.",
  },
  {
    key: "first-reading",
    number: 2,
    title: "I czytanie",
    description:
      "Wnioskodawca uzasadnia projekt, posłowie zadają pytania i dyskutują o jego zasadach.",
  },
  {
    key: "committee",
    number: 3,
    title: "Komisja",
    description:
      "Komisja rozpatruje projekt przepis po przepisie. Może powołać podkomisję i zapraszać ekspertów.",
  },
  {
    key: "sejm-vote",
    number: 4,
    title: "Głosowanie w Sejmie",
    description:
      "To końcowe głosowanie w trzecim czytaniu, zanim ustawa trafi do Senatu.",
  },
  {
    key: "senate",
    number: 5,
    title: "Senat",
    description:
      "Marszałek Sejmu przekazuje uchwaloną ustawę Marszałkowi Senatu. Senat ma 30 dni na stanowisko.",
    content: (
      <EducationStepNotes
        heading="Senat może"
        items={[
          { key: "accept", label: "przyjąć ustawę bez zmian" },
          { key: "amend", label: "uchwalić poprawki" },
          { key: "reject", label: "wnieść o odrzucenie ustawy w całości" },
        ]}
      />
    ),
  },
  {
    key: "president",
    number: 6,
    title: "Prezydent",
    description:
      "Marszałek Sejmu przedstawia ustawę Prezydentowi. Prezydent ma 21 dni i wybiera jedną z trzech dróg.",
  },
];

const meta = {
  title: "education/EducationStepAccordion",
  component: EducationStepAccordion,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[784px]">
        <Story />
      </div>
    ),
  ],
  args: { steps: STEPS },
} satisfies Meta<typeof EducationStepAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllCollapsed: Story = {};

export const FirstStepDescriptionOnly: Story = {
  args: { initialOpenKey: "submission" },
};

export const StepWithContentOpen: Story = {
  args: { initialOpenKey: "senate" },
};

export const Empty: Story = {
  args: { steps: [] },
};
