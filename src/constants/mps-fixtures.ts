// TYMCZASOWE dane przykładowe. Okręg nr 19 odwzorowuje makietę Figmy,
// pozostałe wpisy są wymyślone na potrzeby wyszukiwarki.
import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import type { Constituency, MpsFixture } from "@/types/mps";

export const DEFAULT_CONSTITUENCY_NUMBER = 19;

export const CLUB_SHORT_NAMES: Readonly<Record<string, string>> = {
  "Koalicja Obywatelska": "KO",
  "Prawo i Sprawiedliwość": "PiS",
  "PSL – Trzecia Droga": "PSL – TD",
};

const INTERPELLATION_STATS = { median: 30.5, q1: 12, q3: 62, scaleMax: 120 };

const createMp = (
  id: number,
  firstName: string,
  lastName: string,
  clubName: string | null,
  participationPercent: number | null,
  interpellationCount: number | null,
): MpCardProps => ({
  id,
  firstName,
  lastName,
  clubName,
  photoUrl: null,
  participationPercent,
  interpellations: { count: interpellationCount, ...INTERPELLATION_STATS },
});

const WARSZAWA: Constituency = {
  number: 19,
  name: "Warszawa",
  includesAbroadVotes: true,
  mps: [
    createMp(13, "Władysław", "Bartoszewski", "PSL – Trzecia Droga", 98, 0),
    createMp(68, "Andrzej", "Domański", "Koalicja Obywatelska", 76, 0),
    createMp(86, "Aleksandra", "Gajewska", "Koalicja Obywatelska", 82, 0),
    createMp(100, "Piotr", "Gliński", "Prawo i Sprawiedliwość", 97, 117),
    createMp(470, "Bożenna", "Hołownia", "Polska 2050", 95, 117),
    createMp(138, "Klaudia", "Jachira", "Koalicja Obywatelska", 99, 95),
    createMp(139, "Marek", "Jakubiak", "Rozwój Plus", 98, 59),
    createMp(150, "Sebastian", "Kaleta", "Prawo i Sprawiedliwość", 99, 247),
    createMp(488, "Jarosław", "Krajewski", "Prawo i Sprawiedliwość", 98, 505),
    createMp(218, "Katarzyna", "Lubnauer", "Koalicja Obywatelska", 99, 15),
    createMp(222, "Dorota", "Łoboda", "Koalicja Obywatelska", 99, 50),
    createMp(241, "Sławomir", "Mentzen", "Konfederacja", 51, 33),
    createMp(301, "Adam", "Nowicki", "Koalicja Obywatelska", 94, 12),
    createMp(302, "Magdalena", "Ostrowska", "Lewica", 91, 41),
    createMp(303, "Karolina", "Piotrowska", "Koalicja Obywatelska", 97, 7),
    createMp(304, "Paweł", "Rutkowski", "Centrum", 88, 88),
    createMp(305, "Tomasz", "Sikorski", "Lewica", 93, 23),
    createMp(306, "Irena", "Tomaszewska", "Koalicja Obywatelska", 96, 64),
    createMp(307, "Marcin", "Urban", "Razem", 89, 0),
    createMp(308, "Ewa", "Zielińska", "Koalicja Obywatelska", 98, 30),
  ],
};

const KRAKOW: Constituency = {
  number: 13,
  name: "Kraków",
  includesAbroadVotes: false,
  mps: [
    createMp(401, "Barbara", "Wawrzyniec", "Prawo i Sprawiedliwość", 92, 45),
    createMp(402, "Michał", "Kwiatkowski", "Koalicja Obywatelska", 95, 52),
    createMp(403, "Zofia", "Dudek", "Lewica", 90, 38),
  ],
};

const TARNOW: Constituency = {
  number: 14,
  name: "Tarnów",
  includesAbroadVotes: false,
  mps: [
    createMp(501, "Krzysztof", "Mazur", "Prawo i Sprawiedliwość", 96, 47),
    createMp(502, "Helena", "Jabłońska", "Koalicja Obywatelska", 94, 55),
    createMp(503, "Stefan", "Czarnecki", "Konfederacja", 85, 42),
  ],
};

export const MPS_FIXTURE: MpsFixture = {
  termNumber: 10,
  totalMpCount: 460,
  interpellationStats: INTERPELLATION_STATS,
  constituencies: [WARSZAWA, KRAKOW, TARNOW],
};
