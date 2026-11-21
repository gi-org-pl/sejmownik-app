// Litera ł nie rozkłada się przy NFD, dlatego zamieniamy ją osobno.
export const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
