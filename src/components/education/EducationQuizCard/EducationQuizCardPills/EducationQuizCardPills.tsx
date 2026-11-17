import { Plural } from "@lingui/react/macro";
import type { EducationQuizCardPillsProps } from "./EducationQuizCardPills.types";

export const EducationQuizCardPills = ({
  questionCount,
  durationMinutes,
}: EducationQuizCardPillsProps) => {
  const showQuestions = questionCount > 0;
  const showDuration = durationMinutes > 0;

  if (!showQuestions && !showDuration) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {showQuestions ? (
        <li className="flex min-h-10 items-center rounded-full border border-gi-primary/10 px-2.75 py-2 text-base leading-none font-bold tracking-[-0.01em] wrap-anywhere text-gi-primary">
          <Plural
            value={questionCount}
            one="# pytanie"
            few="# pytania"
            many="# pytań"
            other="# pytań"
          />
        </li>
      ) : null}
      {showDuration ? (
        <li className="flex min-h-10 items-center rounded-full border border-gi-primary/10 px-2.75 py-2 text-base leading-none font-bold tracking-[-0.01em] wrap-anywhere text-gi-primary">
          <Plural
            value={durationMinutes}
            one="# min"
            few="# min"
            many="# min"
            other="# min"
          />
        </li>
      ) : null}
    </ul>
  );
};
