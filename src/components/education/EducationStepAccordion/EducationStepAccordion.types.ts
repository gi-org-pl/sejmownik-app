import type { ReactNode } from "react";

export type EducationStep = {
  key: string;
  number: number;
  title: string;
  description: string;
  content?: ReactNode;
};

export type EducationStepAccordionProps = {
  initialOpenKey?: string;
};

export type PreparedEducationStep = EducationStep & {
  openId: string;
};
