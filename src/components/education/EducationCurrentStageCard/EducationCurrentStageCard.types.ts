export type EducationCurrentStageBill = {
  id: string;
  title: string;
  currentStep?: number | null;
  statusLine?: string;
};

export type EducationCurrentStageCardProps = {
  badgeLabel: string;
  bill?: EducationCurrentStageBill | null;
  totalSteps: number;
  billHref: string;
};
