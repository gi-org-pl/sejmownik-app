import type { ReactNode } from "react";

export type EducationStepNotesItem = {
  key: string;
  label: ReactNode;
};

export type EducationStepNotesProps = {
  heading: ReactNode;
  items: EducationStepNotesItem[];
};
