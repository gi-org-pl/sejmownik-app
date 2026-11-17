export type SectionHeadingLevel = 2 | 3 | 4 | 5 | 6;

export type SectionHeaderProps = {
  title: string;
  info?: string;
  headingLevel?: SectionHeadingLevel;
};
