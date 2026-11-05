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
