import type { EducationStepNotesProps } from "./EducationStepNotes.types";

export const EducationStepNotes = ({
  heading,
  items,
}: EducationStepNotesProps) => (
  <div className="flex flex-col gap-2">
    <h4 className="m-0 text-[16px] leading-[22px] font-bold text-gi-light-primary">
      {heading}
    </h4>
    <ul className="flex list-disc flex-col gap-2 pl-5">
      {items.map((item) => (
        <li key={item.key}>{item.label}</li>
      ))}
    </ul>
  </div>
);
