import { useLingui } from "@lingui/react/macro";
import { useMemo } from "react";
import { EducationStepAccordion } from "@/components/education/EducationStepAccordion/EducationStepAccordion";
import type { EducationStep } from "@/components/education/EducationStepAccordion/EducationStepAccordion.types";
import { EducationStepNotes } from "@/components/education/EducationStepNotes/EducationStepNotes";
import { DefinitionList } from "@/components/shared/DefinitionList/DefinitionList";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import {
  EDUCATION_GLOSSARY_INFO,
  EDUCATION_GLOSSARY_ITEMS,
  EDUCATION_GLOSSARY_TITLE,
  EDUCATION_LAW_INTRO,
  EDUCATION_LAW_STEPS,
  EDUCATION_LAW_TITLE,
  EDUCATION_OTHER_PROCEDURES_ITEMS,
  EDUCATION_OTHER_PROCEDURES_TITLE,
} from "@/constants/education";

const Education = () => {
  const { i18n, t } = useLingui();

  const lawSteps = useMemo<EducationStep[]>(
    () =>
      EDUCATION_LAW_STEPS.map((step, index) => ({
        key: step.key,
        number: index + 1,
        title: t(step.title),
        description: t(step.description),
        content: (
          <div className="flex flex-col gap-6">
            {step.notes.map((notes) => (
              <EducationStepNotes
                key={notes.key}
                heading={t(notes.heading)}
                items={notes.items.map((item) => ({
                  key: item.key,
                  label: t(item.label),
                }))}
              />
            ))}
          </div>
        ),
      })),
    [t],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto box-content flex max-w-300 flex-col gap-4 px-4 py-8 md:flex-row md:px-8">
          <article className="flex min-w-0 flex-1 flex-col gap-6">
            <header className="flex flex-col gap-2">
              <h1 className="text-[32px] leading-10 font-bold text-gi-light-primary">
                {i18n._(EDUCATION_LAW_TITLE)}
              </h1>
              <p className="text-[16px] leading-[22px] text-gi-primary">
                {i18n._(EDUCATION_LAW_INTRO)}
              </p>
            </header>
            <EducationStepAccordion steps={lawSteps} />
            <section className="flex flex-col gap-3 text-[16px] leading-[22px] text-gi-primary">
              <h2 className="text-[20px] leading-6 font-bold text-gi-light-primary">
                {i18n._(EDUCATION_OTHER_PROCEDURES_TITLE)}
              </h2>
              <ul className="flex list-disc flex-col gap-2 pl-5">
                {EDUCATION_OTHER_PROCEDURES_ITEMS.map((item) => (
                  <li key={item.key}>{i18n._(item.label)}</li>
                ))}
              </ul>
            </section>
          </article>
          <aside className="w-full shrink-0 md:w-[400px]">
            <DefinitionList
              title={i18n._(EDUCATION_GLOSSARY_TITLE)}
              info={i18n._(EDUCATION_GLOSSARY_INFO)}
              items={EDUCATION_GLOSSARY_ITEMS.map((item) => ({
                key: item.key,
                term: i18n._(item.term),
                description: i18n._(item.description),
              }))}
            />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Education;
