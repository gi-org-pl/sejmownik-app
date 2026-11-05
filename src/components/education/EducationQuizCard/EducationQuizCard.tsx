import { useId } from "react";
import type { EducationQuizCardProps } from "./EducationQuizCard.types";
import { EducationQuizCardPills } from "./EducationQuizCardPills/EducationQuizCardPills";
import { EducationQuizCardStartLink } from "./EducationQuizCardStartLink/EducationQuizCardStartLink";

export const EducationQuizCard = ({
  eyebrow,
  title,
  description,
  questionCount,
  durationMinutes,
  startHref,
}: EducationQuizCardProps) => {
  const titleId = useId();
  const startLink = startHref?.trim() || undefined;

  return (
    <section
      aria-labelledby={titleId}
      className="w-full overflow-hidden rounded-3xl bg-gi-ash outline-1 -outline-offset-1 outline-gi-dark-ash"
    >
      <p className="w-fit max-w-full rounded-br-2xl bg-gi-primary px-4 py-2.5 text-sm leading-4.5 font-bold wrap-break-word text-white">
        {eyebrow}
      </p>

      <div className="p-4">
        <div className="flex min-h-12 items-center justify-between gap-4">
          <h2
            id={titleId}
            className="min-w-0 text-2xl leading-7.25 font-bold tracking-[-0.01em] wrap-break-word text-gi-light-primary"
          >
            {title}
          </h2>

          {startLink ? (
            <EducationQuizCardStartLink href={startLink} title={title} />
          ) : null}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <p className="text-base leading-5.5 tracking-[-0.01em] wrap-break-word text-gi-primary">
            {description}
          </p>
          <EducationQuizCardPills
            questionCount={questionCount}
            durationMinutes={durationMinutes}
          />
        </div>
      </div>
    </section>
  );
};
