import { Trans, useLingui } from "@lingui/react/macro";
import {
  type KeyboardEvent,
  type ReactNode,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import type {
  EducationStep,
  EducationStepAccordionProps,
  PreparedEducationStep,
} from "./EducationStepAccordion.types";

// Athena has no accordion. These are native buttons and panels, wired to the
// WAI-ARIA accordion keyboard pattern.

const STEP_KEY = {
  submission: "submission",
  firstReading: "first-reading",
  committee: "committee",
  readings: "readings",
  vote: "sejm-vote",
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
    <h4 className="m-0 text-[16px] leading-[22px] font-bold text-[#005669]">
      {heading}
    </h4>
    <ul className="flex list-disc flex-col gap-2 pl-5">
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  </div>
);

const prepareSteps = (
  steps: readonly EducationStep[],
): PreparedEducationStep[] => {
  const counts = new Map<string, number>();

  for (const step of steps) {
    counts.set(step.key, (counts.get(step.key) ?? 0) + 1);
  }

  const duplicateKeys = new Set<string>();

  for (const [key, count] of counts) {
    if (count > 1) {
      duplicateKeys.add(key);
    }
  }

  return steps.map((step, index) => ({
    ...step,
    openId: duplicateKeys.has(step.key) ? `index-${index}` : step.key,
  }));
};

const resolveInitialOpenId = (
  steps: readonly PreparedEducationStep[],
  initialOpenKey: string | undefined,
) => {
  if (initialOpenKey === undefined) {
    return null;
  }

  return steps.find((step) => step.key === initialOpenKey)?.openId ?? null;
};

const warnAboutDuplicateKeys = (steps: readonly EducationStep[]) => {
  if (!import.meta.env.DEV) {
    return;
  }

  const seen = new Set<string>();
  const reported = new Set<string>();

  for (const step of steps) {
    if (seen.has(step.key) && !reported.has(step.key)) {
      reported.add(step.key);
      console.warn(
        `EducationStepAccordion: duplicate step key "${step.key}". Using the index as the fallback identity.`,
      );
    }

    seen.add(step.key);
  }
};

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    aria-hidden="true"
    focusable="false"
    className={`h-4 w-3 shrink-0 text-[#005669] motion-safe:transition-transform motion-reduce:transition-none ${
      isOpen ? "rotate-180" : ""
    }`}
  >
    <path
      d="M1.5 5.25 6 10.25 10.5 5.25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EducationStepAccordion = ({
  initialOpenKey,
}: EducationStepAccordionProps) => {
  const { t } = useLingui();
  const steps: EducationStep[] = [
    {
      key: STEP_KEY.submission,
      number: 1,
      title: t`Inicjatywa ustawodawcza`,
      description: t`Projekt ustawy wpływa do Marszałka Sejmu i dostaje numer druku. Wnioskodawca przedstawia skutki finansowe jego wykonania.`,
      content: (
        <StageNotes
          heading={<Trans>Projekt mogą wnieść</Trans>}
          items={[
            { id: "committee", label: <Trans>komisja sejmowa</Trans> },
            { id: "mps", label: <Trans>co najmniej 15 posłów</Trans> },
            { id: "senate", label: <Trans>Senat</Trans> },
            { id: "president", label: <Trans>Prezydent</Trans> },
            { id: "government", label: <Trans>Rada Ministrów</Trans> },
            {
              id: "citizens",
              label: (
                <Trans>
                  co najmniej 100 000 obywateli mających prawo wybierania do
                  Sejmu
                </Trans>
              ),
            },
          ]}
        />
      ),
    },
    {
      key: STEP_KEY.firstReading,
      number: 2,
      title: t`I czytanie`,
      description: t`Wnioskodawca uzasadnia projekt, posłowie zadają pytania i dyskutują o jego zasadach. O poszczególnych przepisach Sejm rozstrzyga później.`,
      content: (
        <div className="flex flex-col gap-6">
          <StageNotes
            heading={<Trans>Gdzie się odbywa</Trans>}
            items={[
              {
                id: "committee",
                label: (
                  <Trans>zwykle w komisji właściwej dla tematu projektu</Trans>
                ),
              },
              {
                id: "plenary",
                label: (
                  <Trans>
                    na posiedzeniu Sejmu przy projektach zmiany Konstytucji,
                    budżetowych, podatkowych, wyborczych, ustrojowych i przy
                    kodeksach
                  </Trans>
                ),
              },
              {
                id: "marshal",
                label: (
                  <Trans>
                    na posiedzeniu Sejmu także wtedy, gdy tak skieruje projekt
                    Marszałek Sejmu
                  </Trans>
                ),
              },
            ]}
          />
          <StageNotes
            heading={<Trans>Sejm może</Trans>}
            items={[
              {
                id: "send",
                label: <Trans>skierować projekt do komisji</Trans>,
              },
              {
                id: "reject",
                label: (
                  <Trans>
                    odrzucić projekt w całości, i wtedy ustawa nie powstaje
                  </Trans>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      key: STEP_KEY.committee,
      number: 3,
      title: t`Komisja`,
      description: t`Komisja rozpatruje projekt przepis po przepisie. Może powołać podkomisję i zapraszać ekspertów.`,
      content: (
        <div className="flex flex-col gap-6">
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
          <StageNotes
            heading={<Trans>Zanim skończy się drugie czytanie</Trans>}
            items={[
              {
                id: "withdraw",
                label: (
                  <Trans>
                    wnioskodawca może wycofać projekt, także na posiedzeniu
                    komisji
                  </Trans>
                ),
              },
              {
                id: "support",
                label: (
                  <Trans>
                    projekt poselski upada, gdy popiera go mniej niż 15 posłów
                    spośród tych, którzy go podpisali
                  </Trans>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      key: STEP_KEY.readings,
      number: 4,
      title: t`II i III czytanie`,
      description: t`Drugie czytanie odbywa się na posiedzeniu Sejmu: sprawozdanie komisji, debata i poprawki. Trzecie czytanie zaczyna się od dodatkowego sprawozdania, jeśli poprawki wróciły do komisji.`,
      content: (
        <StageNotes
          heading={<Trans>Poprawki</Trans>}
          items={[
            {
              id: "who",
              label: (
                <Trans>
                  może je zgłaszać wnioskodawca, posłowie i Rada Ministrów
                </Trans>
              ),
            },
            {
              id: "return",
              label: (
                <Trans>
                  po drugim czytaniu wracają do komisji po dodatkowe
                  sprawozdanie, chyba że Sejm przejdzie od razu do trzeciego
                  czytania
                </Trans>
              ),
            },
          ]}
        />
      ),
    },
    {
      key: STEP_KEY.vote,
      number: 5,
      title: t`Głosowanie w Sejmie`,
      description: t`To końcowe głosowanie w trzecim czytaniu, zanim ustawa trafi do Senatu. Sejm rozstrzyga najpierw o poprawkach, potem o całej ustawie.`,
      content: (
        <StageNotes
          heading={<Trans>Uchwalenie</Trans>}
          items={[
            {
              id: "majority",
              label: (
                <Trans>
                  wystarcza zwykła większość: więcej głosów „za” niż „przeciw”
                </Trans>
              ),
            },
            {
              id: "quorum",
              label: (
                <Trans>
                  w sali musi być co najmniej połowa ustawowej liczby posłów,
                  czyli 230 z 460
                </Trans>
              ),
            },
            {
              id: "reject",
              label: (
                <Trans>
                  odrzucenie projektu na tym etapie kończy postępowanie
                </Trans>
              ),
            },
          ]}
        />
      ),
    },
    {
      key: STEP_KEY.senate,
      number: 6,
      title: t`Senat`,
      description: t`Marszałek Sejmu przekazuje uchwaloną ustawę Marszałkowi Senatu. Senat ma 30 dni na stanowisko.`,
      content: (
        <div className="flex flex-col gap-6">
          <StageNotes
            heading={<Trans>Senat może</Trans>}
            items={[
              {
                id: "accept",
                label: <Trans>przyjąć ustawę bez zmian</Trans>,
              },
              { id: "amend", label: <Trans>uchwalić poprawki</Trans> },
              {
                id: "reject",
                label: <Trans>wnieść o odrzucenie ustawy w całości</Trans>,
              },
              {
                id: "silence",
                label: (
                  <Trans>
                    nie podjąć uchwały: ustawa zostaje wtedy w brzmieniu Sejmu i
                    idzie do Prezydenta
                  </Trans>
                ),
              },
            ]}
          />
          <StageNotes
            heading={<Trans>Gdy Senat zgłosi poprawki albo odrzucenie</Trans>}
            items={[
              {
                id: "return",
                label: (
                  <Trans>
                    ustawa wraca do Sejmu, który rozpatruje ją po sprawozdaniu
                    komisji
                  </Trans>
                ),
              },
              {
                id: "absolute",
                label: (
                  <Trans>
                    Sejm odrzuca poprawkę albo wniosek o odrzucenie tylko
                    bezwzględną większością: więcej głosów „za” niż „przeciw” i
                    „wstrzymuję się” łącznie, przy kworum 230 posłów
                  </Trans>
                ),
              },
              {
                id: "kept",
                label: (
                  <Trans>
                    poprawka, której Sejm nie odrzuci, wchodzi do ustawy
                  </Trans>
                ),
              },
              {
                id: "fails",
                label: (
                  <Trans>
                    nieodrzucenie wniosku o odrzucenie oznacza, że ustawa nie
                    dochodzi do skutku
                  </Trans>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      key: STEP_KEY.president,
      number: 7,
      title: t`Prezydent`,
      description: t`Marszałek Sejmu przedstawia ustawę Prezydentowi. Prezydent ma 21 dni i wybiera jedną z trzech dróg.`,
      content: (
        <div className="flex flex-col gap-6">
          <StageNotes
            heading={<Trans>Prezydent może</Trans>}
            items={[
              {
                id: "sign",
                label: (
                  <Trans>
                    podpisać ustawę i zarządzić jej ogłoszenie w Dzienniku Ustaw
                  </Trans>
                ),
              },
              {
                id: "tribunal",
                label: (
                  <Trans>
                    przed podpisem skierować ją do Trybunału Konstytucyjnego
                  </Trans>
                ),
              },
              {
                id: "veto",
                label: (
                  <Trans>
                    zawetować ją, czyli odesłać do Sejmu z umotywowanym
                    wnioskiem o ponowne rozpatrzenie
                  </Trans>
                ),
              },
            ]}
          />
          <StageNotes
            heading={<Trans>Trybunał Konstytucyjny</Trans>}
            items={[
              {
                id: "conform",
                label: (
                  <Trans>
                    orzeczenie o zgodności z Konstytucją zobowiązuje Prezydenta
                    do podpisu
                  </Trans>
                ),
              },
              {
                id: "whole",
                label: (
                  <Trans>niezgodność całej ustawy oznacza odmowę podpisu</Trans>
                ),
              },
              {
                id: "part",
                label: (
                  <Trans>
                    gdy niezgodne są tylko niektóre przepisy i nie są
                    nierozerwalnie związane z całą ustawą, Prezydent po opinii
                    Marszałka Sejmu podpisuje ustawę z ich pominięciem albo
                    zwraca ją Sejmowi
                  </Trans>
                ),
              },
            ]}
          />
          <StageNotes
            heading={<Trans>Weto</Trans>}
            items={[
              {
                id: "override",
                label: (
                  <Trans>
                    Sejm odrzuca weto większością 3/5 głosów w obecności co
                    najmniej 230 posłów
                  </Trans>
                ),
              },
              {
                id: "sign",
                label: (
                  <Trans>
                    po ponownym uchwaleniu Prezydent podpisuje ustawę w ciągu 7
                    dni i nie może zawetować jej drugi raz ani skierować do
                    Trybunału
                  </Trans>
                ),
              },
              {
                id: "fail",
                label: (
                  <Trans>
                    bez większości 3/5 ustawa nie dochodzi do skutku
                  </Trans>
                ),
              },
            ]}
          />
          <StageNotes
            heading={<Trans>Ogłoszenie</Trans>}
            items={[
              {
                id: "journal",
                label: (
                  <Trans>podpisana ustawa ukazuje się w Dzienniku Ustaw</Trans>
                ),
              },
              {
                id: "date",
                label: (
                  <Trans>wchodzi w życie w terminie w niej wskazanym</Trans>
                ),
              },
              {
                id: "default",
                label: (
                  <Trans>
                    gdy terminu nie ma, wchodzi w życie po 14 dniach od
                    ogłoszenia
                  </Trans>
                ),
              },
            ]}
          />
        </div>
      ),
    },
  ];
  const baseId = useId();
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const preparedSteps = useMemo(() => {
    warnAboutDuplicateKeys(steps);
    return prepareSteps(steps);
  }, [steps]);
  const [openId, setOpenId] = useState<string | null>(() =>
    resolveInitialOpenId(prepareSteps(steps), initialOpenKey),
  );

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const moveFocus = (index: number) => {
    headerRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = preparedSteps.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveFocus(index === lastIndex ? 0 : index + 1);
        return;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(index === 0 ? lastIndex : index - 1);
        return;
      case "Home":
        event.preventDefault();
        moveFocus(0);
        return;
      case "End":
        event.preventDefault();
        moveFocus(lastIndex);
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        toggle(preparedSteps[index].openId);
        return;
      default:
        return;
    }
  };

  return (
    <article className="mx-auto flex w-full max-w-[784px] flex-col gap-6 px-4 py-10 md:px-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-[32px] leading-10 font-bold text-[#005669]">
          <Trans>Jak powstaje ustawa</Trans>
        </h1>
        <p className="text-[16px] leading-[22px] text-[#004554]">
          <Trans>
            Ustawa zwykła przechodzi przez Sejm, Senat i Prezydenta. Poniżej
            jest jej droga od wniesienia projektu do ogłoszenia w Dzienniku
            Ustaw, razem z miejscami, w których może upaść.
          </Trans>
        </p>
      </header>
      <div className="flex w-full flex-col gap-2">
        {preparedSteps.map((step, index) => {
          const isOpen = openId === step.openId;
          const titleId = `${baseId}-title-${index}`;
          const panelId = `${baseId}-panel-${index}`;
          const hasDescription = step.description.trim().length > 0;

          return (
            <div
              key={step.openId}
              className={`flex flex-col overflow-hidden rounded-[24px] border border-[#D4E1E4] p-4 motion-safe:transition-colors motion-safe:duration-300 motion-reduce:transition-none ${
                isOpen ? "bg-[#ECF0F2]" : "bg-white"
              }`}
            >
              <h3 className="m-0">
                <button
                  ref={(element) => {
                    headerRefs.current[index] = element;
                  }}
                  type="button"
                  className={`flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent p-0 text-left ${FOCUS_CLASS_NAME}`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={t`Krok ${step.number}: ${step.title}`}
                  onClick={() => toggle(step.openId)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span
                    aria-hidden="true"
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-base leading-none font-bold motion-safe:transition-colors motion-reduce:transition-none ${
                      isOpen
                        ? "border-[#00718F] bg-[#00718F] text-white"
                        : "border-[#00718F] bg-transparent text-[#00718F]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    id={titleId}
                    className="min-w-0 flex-1 text-[20px] leading-[24px] font-bold text-[#005669]"
                  >
                    {step.title}
                  </span>
                  <ChevronIcon isOpen={isOpen} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={titleId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="flex flex-col gap-5 pt-4 pl-14 text-[16px] leading-[22px] font-normal text-[#004554]">
                    {hasDescription ? <p>{step.description}</p> : null}
                    {step.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <section className="flex flex-col gap-3 text-[16px] leading-[22px] text-[#004554]">
        <h2 className="text-[20px] leading-6 font-bold text-[#005669]">
          <Trans>Inne tryby</Trans>
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            <Trans>
              Projekt rządowy, zanim trafi do Sejmu, przechodzi uzgodnienia,
              konsultacje i uchwałę Rady Ministrów.
            </Trans>
          </li>
          <li>
            <Trans>
              W trybie pilnym Senat ma 14 dni, a Prezydent 7 dni na podpis. Tryb
              ten nie obejmuje projektów podatkowych, wyborczych, ustrojowych i
              kodeksów.
            </Trans>
          </li>
          <li>
            <Trans>
              Zmiana Konstytucji oraz ustawa budżetowa mają własne większości i
              terminy.
            </Trans>
          </li>
        </ul>
      </section>
    </article>
  );
};
