import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

export const EDUCATION_GLOSSARY_TITLE = msg`Słowniczek`;

export const EDUCATION_GLOSSARY_INFO = msg`Krótki opis kluczowych pojęć z procesu legislacyjnego.`;

type EducationGlossaryItem = {
  key: string;
  term: MessageDescriptor;
  description: MessageDescriptor;
};

export const EDUCATION_GLOSSARY_ITEMS: EducationGlossaryItem[] = [
  {
    key: "druk",
    term: msg`Druk`,
    description: msg`Dokument zawierający projekt ustawy.`,
  },
  {
    key: "czytanie",
    term: msg`Czytanie`,
    description: msg`Omówienie projektu ustawy w Sejmie.`,
  },
  {
    key: "wiekszosc",
    term: msg`Większość bezwzględna`,
    description: msg`Więcej niż połowa ważnie oddanych głosów.`,
  },
];

export const EDUCATION_LAW_TITLE = msg`Jak powstaje ustawa`;

export const EDUCATION_LAW_INTRO = msg`Ustawa zwykła przechodzi przez Sejm, Senat i Prezydenta. Poniżej jest jej droga od wniesienia projektu do ogłoszenia w Dzienniku Ustaw, razem z miejscami, w których może upaść.`;

type EducationLawStepNotes = {
  key: string;
  heading: MessageDescriptor;
  items: { key: string; label: MessageDescriptor }[];
};

type EducationLawStep = {
  key: string;
  title: MessageDescriptor;
  description: MessageDescriptor;
  notes: EducationLawStepNotes[];
};

export const EDUCATION_LAW_STEPS: EducationLawStep[] = [
  {
    key: "submission",
    title: msg`Inicjatywa ustawodawcza`,
    description: msg`Projekt ustawy wpływa do Marszałka Sejmu i dostaje numer druku. Wnioskodawca przedstawia skutki finansowe jego wykonania.`,
    notes: [
      {
        key: "who",
        heading: msg`Projekt mogą wnieść`,
        items: [
          { key: "committee", label: msg`komisja sejmowa` },
          { key: "mps", label: msg`co najmniej 15 posłów` },
          { key: "senate", label: msg`Senat` },
          { key: "president", label: msg`Prezydent` },
          { key: "government", label: msg`Rada Ministrów` },
          {
            key: "citizens",
            label: msg`co najmniej 100 000 obywateli mających prawo wybierania do Sejmu`,
          },
        ],
      },
    ],
  },
  {
    key: "first-reading",
    title: msg`I czytanie`,
    description: msg`Wnioskodawca uzasadnia projekt, posłowie zadają pytania i dyskutują o jego zasadach. O poszczególnych przepisach Sejm rozstrzyga później.`,
    notes: [
      {
        key: "where",
        heading: msg`Gdzie się odbywa`,
        items: [
          {
            key: "committee",
            label: msg`zwykle w komisji właściwej dla tematu projektu`,
          },
          {
            key: "plenary",
            label: msg`na posiedzeniu Sejmu przy projektach zmiany Konstytucji, budżetowych, podatkowych, wyborczych, ustrojowych i przy kodeksach`,
          },
          {
            key: "marshal",
            label: msg`na posiedzeniu Sejmu także wtedy, gdy tak skieruje projekt Marszałek Sejmu`,
          },
        ],
      },
      {
        key: "sejm",
        heading: msg`Sejm może`,
        items: [
          { key: "send", label: msg`skierować projekt do komisji` },
          {
            key: "reject",
            label: msg`odrzucić projekt w całości, i wtedy ustawa nie powstaje`,
          },
        ],
      },
    ],
  },
  {
    key: "committee",
    title: msg`Komisja`,
    description: msg`Komisja rozpatruje projekt przepis po przepisie. Może powołać podkomisję i zapraszać ekspertów.`,
    notes: [
      {
        key: "report",
        heading: msg`Sprawozdanie komisji zawiera`,
        items: [
          {
            key: "proposal",
            label: msg`propozycję uchwalenia albo odrzucenia`,
          },
          { key: "amendments", label: msg`przyjęte poprawki` },
          { key: "dissent", label: msg`zdania odrębne, jeśli je zgłoszono` },
        ],
      },
      {
        key: "before-second-reading",
        heading: msg`Zanim skończy się drugie czytanie`,
        items: [
          {
            key: "withdraw",
            label: msg`wnioskodawca może wycofać projekt, także na posiedzeniu komisji`,
          },
          {
            key: "support",
            label: msg`projekt poselski upada, gdy popiera go mniej niż 15 posłów spośród tych, którzy go podpisali`,
          },
        ],
      },
    ],
  },
  {
    key: "sejm-vote",
    title: msg`Głosowanie w Sejmie`,
    description: msg`To końcowe głosowanie w trzecim czytaniu, zanim ustawa trafi do Senatu. Sejm rozstrzyga najpierw o poprawkach, potem o całej ustawie.`,
    notes: [
      {
        key: "adoption",
        heading: msg`Uchwalenie`,
        items: [
          {
            key: "majority",
            label: msg`wystarcza zwykła większość: więcej głosów „za” niż „przeciw”`,
          },
          {
            key: "quorum",
            label: msg`w sali musi być co najmniej połowa ustawowej liczby posłów, czyli 230 z 460`,
          },
          {
            key: "reject",
            label: msg`odrzucenie projektu na tym etapie kończy postępowanie`,
          },
        ],
      },
    ],
  },
  {
    key: "senate",
    title: msg`Senat`,
    description: msg`Marszałek Sejmu przekazuje uchwaloną ustawę Marszałkowi Senatu. Senat ma 30 dni na stanowisko.`,
    notes: [
      {
        key: "options",
        heading: msg`Senat może`,
        items: [
          { key: "accept", label: msg`przyjąć ustawę bez zmian` },
          { key: "amend", label: msg`uchwalić poprawki` },
          { key: "reject", label: msg`wnieść o odrzucenie ustawy w całości` },
          {
            key: "silence",
            label: msg`nie podjąć uchwały: ustawa zostaje wtedy w brzmieniu Sejmu i idzie do Prezydenta`,
          },
        ],
      },
      {
        key: "return",
        heading: msg`Gdy Senat zgłosi poprawki albo odrzucenie`,
        items: [
          {
            key: "return",
            label: msg`ustawa wraca do Sejmu, który rozpatruje ją po sprawozdaniu komisji`,
          },
          {
            key: "absolute",
            label: msg`Sejm odrzuca poprawkę albo wniosek o odrzucenie tylko bezwzględną większością: więcej głosów „za” niż „przeciw” i „wstrzymuję się” łącznie, przy kworum 230 posłów`,
          },
          {
            key: "kept",
            label: msg`poprawka, której Sejm nie odrzuci, wchodzi do ustawy`,
          },
          {
            key: "fails",
            label: msg`nieodrzucenie wniosku o odrzucenie oznacza, że ustawa nie dochodzi do skutku`,
          },
        ],
      },
    ],
  },
  {
    key: "president",
    title: msg`Prezydent`,
    description: msg`Marszałek Sejmu przedstawia ustawę Prezydentowi. Prezydent ma 21 dni i wybiera jedną z trzech dróg.`,
    notes: [
      {
        key: "options",
        heading: msg`Prezydent może`,
        items: [
          {
            key: "sign",
            label: msg`podpisać ustawę i zarządzić jej ogłoszenie w Dzienniku Ustaw`,
          },
          {
            key: "tribunal",
            label: msg`przed podpisem skierować ją do Trybunału Konstytucyjnego`,
          },
          {
            key: "veto",
            label: msg`zawetować ją, czyli odesłać do Sejmu z umotywowanym wnioskiem o ponowne rozpatrzenie`,
          },
        ],
      },
      {
        key: "tribunal",
        heading: msg`Trybunał Konstytucyjny`,
        items: [
          {
            key: "conform",
            label: msg`orzeczenie o zgodności z Konstytucją zobowiązuje Prezydenta do podpisu`,
          },
          {
            key: "whole",
            label: msg`niezgodność całej ustawy oznacza odmowę podpisu`,
          },
          {
            key: "part",
            label: msg`gdy niezgodne są tylko niektóre przepisy i nie są nierozerwalnie związane z całą ustawą, Prezydent po opinii Marszałka Sejmu podpisuje ustawę z ich pominięciem albo zwraca ją Sejmowi`,
          },
        ],
      },
      {
        key: "veto",
        heading: msg`Weto`,
        items: [
          {
            key: "override",
            label: msg`Sejm odrzuca weto większością 3/5 głosów w obecności co najmniej 230 posłów`,
          },
          {
            key: "sign",
            label: msg`po ponownym uchwaleniu Prezydent podpisuje ustawę w ciągu 7 dni i nie może zawetować jej drugi raz ani skierować do Trybunału`,
          },
          {
            key: "fail",
            label: msg`bez większości 3/5 ustawa nie dochodzi do skutku`,
          },
        ],
      },
      {
        key: "publication",
        heading: msg`Ogłoszenie`,
        items: [
          {
            key: "journal",
            label: msg`podpisana ustawa ukazuje się w Dzienniku Ustaw`,
          },
          {
            key: "date",
            label: msg`wchodzi w życie w terminie w niej wskazanym`,
          },
          {
            key: "default",
            label: msg`gdy terminu nie ma, wchodzi w życie po 14 dniach od ogłoszenia`,
          },
        ],
      },
    ],
  },
];

export const EDUCATION_OTHER_PROCEDURES_TITLE = msg`Inne tryby`;

export const EDUCATION_OTHER_PROCEDURES_ITEMS: {
  key: string;
  label: MessageDescriptor;
}[] = [
  {
    key: "government",
    label: msg`Projekt rządowy, zanim trafi do Sejmu, przechodzi uzgodnienia, konsultacje i uchwałę Rady Ministrów.`,
  },
  {
    key: "urgent",
    label: msg`W trybie pilnym Senat ma 14 dni, a Prezydent 7 dni na podpis. Tryb ten nie obejmuje projektów podatkowych, wyborczych, ustrojowych i kodeksów.`,
  },
  {
    key: "special",
    label: msg`Zmiana Konstytucji oraz ustawa budżetowa mają własne większości i terminy.`,
  },
];
