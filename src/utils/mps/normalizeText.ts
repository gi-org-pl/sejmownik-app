// Upraszcza tekst do porównań w wyszukiwarce: małe litery, bez polskich
// znaków (ł nie rozkłada się przy NFD, więc zamieniamy ją osobno) i bez
// zbędnych spacji. Dzięki temu "krakow" znajdzie "Kraków".
export const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
