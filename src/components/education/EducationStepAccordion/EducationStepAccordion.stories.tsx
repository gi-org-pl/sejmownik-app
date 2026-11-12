import { Trans, useLingui } from "@lingui/react/macro";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { EducationCurrentStageCard } from "@/components/education/EducationCurrentStageCard/EducationCurrentStageCard";
import { EducationStepAccordion } from "./EducationStepAccordion";
import type { EducationStep } from "./EducationStepAccordion.types";

const STEP_KEY = {
  submission: "submission",
  firstReading: "first-reading",
  committee: "committee",
  sejmVote: "sejm-vote",
  senate: "senate",
  president: "president",
} as const;

const StageNotes = ({
  heading,
  items,
}: {
  heading: ReactNode;
  items: { id: string; label: ReactNode }[];
}) => (
  <div className="flex flex-col gap-2">
    <p>{heading}</p>
    <ul className="flex list-disc flex-col gap-2 pl-5">
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  </div>
);

const SenateStageCard = () => {
  const { t } = useLingui();

  return (
    <EducationCurrentStageCard
      badgeLabel={t`Teraz na tym etapie`}
      totalSteps={6}
      billHref="/ustawy/skladki-zus-dla-artystow"
      bill={{
        id: "skladki-zus-dla-artystow",
        title: t`Składki ZUS dla artystów`,
        currentStep: 5,
        statusLine: t`Uchwalona przez Sejm 8 paź 2026 · czeka na stanowisko Senatu`,
      }}
    />
  );
};

const SubmissionContent = () => (
  <StageNotes
    heading={<Trans>Projekt mogą wnieść</Trans>}
    items={[
      { id: "mps", label: <Trans>grupa posłów</Trans> },
      { id: "senate", label: <Trans>Senat</Trans> },
      { id: "president", label: <Trans>Prezydent</Trans> },
      { id: "government", label: <Trans>Rada Ministrów</Trans> },
      {
        id: "citizens",
        label: <Trans>obywatele — co najmniej 100 tysięcy podpisów</Trans>,
      },
    ]}
  />
);

const FirstReadingContent = () => (
  <StageNotes
    heading={<Trans>Sejm może</Trans>}
    items={[
      { id: "committee", label: <Trans>skierować projekt do komisji</Trans> },
      { id: "reject", label: <Trans>odrzucić projekt w całości</Trans> },
    ]}
  />
);

const CommitteeContent = () => (
  <StageNotes
    heading={<Trans>Sprawozdanie komisji zawiera</Trans>}
    items={[
      {
        id: "proposal",
        label: <Trans>propozycję uchwalenia albo odrzucenia</Trans>,
      },
      { id: "amendments", label: <Trans>przyjęte poprawki</Trans> },
      {
        id: "dissent",
        label: <Trans>zdania odrębne, jeśli je zgłoszono</Trans>,
      },
    ]}
  />
);

const SejmVoteContent = () => (
  <StageNotes
    heading={<Trans>Po uchwaleniu</Trans>}
    items={[
      { id: "senate", label: <Trans>ustawa trafia do Senatu</Trans> },
      { id: "days", label: <Trans>Senat ma 30 dni na stanowisko</Trans> },
      {
        id: "silence",
        label: (
          <Trans>brak stanowiska oznacza przyjęcie ustawy bez zmian</Trans>
        ),
      },
    ]}
  />
);

const PresidentContent = () => (
  <StageNotes
    heading={<Trans>Prezydent może</Trans>}
    items={[
      {
        id: "sign",
        label: <Trans>podpisać ustawę i zarządzić jej publikację</Trans>,
      },
      {
        id: "veto",
        label: (
          <Trans>zawetować ją — Sejm odrzuca weto większością 3/5 głosów</Trans>
        ),
      },
      {
        id: "tribunal",
        label: <Trans>skierować ją do Trybunału Konstytucyjnego</Trans>,
      },
    ]}
  />
);

const EducationStepsPreview = ({
  initialOpenKey,
  omitContentKey,
}: {
  initialOpenKey?: string;
  omitContentKey?: string;
}) => {
  const { t } = useLingui();
  const contentFor = (key: string, content: ReactNode) =>
    omitContentKey === key ? undefined : content;

  const steps: EducationStep[] = [
    {
      key: STEP_KEY.submission,
      number: 1,
      title: t`Wpłynięcie projektu`,
      description: t`Projekt ustawy wpływa do Sejmu i dostaje numer druku. Od tej chwili zaczyna się jego droga przez sześć etapów.`,
      content: contentFor(STEP_KEY.submission, <SubmissionContent />),
    },
    {
      key: STEP_KEY.firstReading,
      number: 2,
      title: t`I czytanie`,
      description: t`Posłowie dyskutują o celu projektu. Sejm nie rozstrzyga jeszcze o poszczególnych przepisach.`,
      content: contentFor(STEP_KEY.firstReading, <FirstReadingContent />),
    },
    {
      key: STEP_KEY.committee,
      number: 3,
      title: t`Komisja`,
      description: t`Komisja rozpatruje projekt przepis po przepisie, może zapraszać ekspertów i zgłaszać poprawki.`,
      content: contentFor(STEP_KEY.committee, <CommitteeContent />),
    },
    {
      key: STEP_KEY.sejmVote,
      number: 4,
      title: t`Głosowanie w Sejmie`,
      description: t`Po czytaniach Sejm głosuje nad ustawą. Do jej uchwalenia wystarcza zwykła większość głosów przy kworum.`,
      content: contentFor(STEP_KEY.sejmVote, <SejmVoteContent />),
    },
    {
      key: STEP_KEY.senate,
      number: 5,
      title: t`Senat`,
      description: t`Senat ma 30 dni na stanowisko. Może przyjąć ustawę, zaproponować poprawki albo ją odrzucić.`,
      content: contentFor(STEP_KEY.senate, <SenateStageCard />),
    },
    {
      key: STEP_KEY.president,
      number: 6,
      title: t`Prezydent`,
      description: t`Prezydent dostaje uchwaloną ustawę i ma 21 dni na decyzję: podpis, weto albo wniosek do Trybunału Konstytucyjnego.`,
      content: contentFor(STEP_KEY.president, <PresidentContent />),
    },
  ];

  return (
    <MemoryRouter>
      <EducationStepAccordion steps={steps} initialOpenKey={initialOpenKey} />
    </MemoryRouter>
  );
};

const meta = {
  title: "education/EducationStepAccordion",
  component: EducationStepAccordion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Athena does not include an accordion. This one is built from native buttons and panels and follows the WAI-ARIA accordion pattern. Editorial copy comes from the parent. Step 5 renders EducationCurrentStageCard in the content slot.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[784px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EducationStepAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const withPreview = (preview: ReactElement): Story => ({
  args: { steps: [] },
  render: () => preview,
});

export const AllCollapsed: Story = withPreview(<EducationStepsPreview />);

export const StepFiveOpenWithContent: Story = withPreview(
  <EducationStepsPreview initialOpenKey={STEP_KEY.senate} />,
);

export const StepOneOpenDescriptionOnly: Story = withPreview(
  <EducationStepsPreview
    initialOpenKey={STEP_KEY.submission}
    omitContentKey={STEP_KEY.submission}
  />,
);
