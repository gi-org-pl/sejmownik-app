import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { EducationStepAccordion } from "./EducationStepAccordion";

const renderAccordion = (initialOpenKey?: string) =>
  render(
    <I18nProvider i18n={i18n}>
      <EducationStepAccordion initialOpenKey={initialOpenKey} />
    </I18nProvider>,
  );

const STEP_LABELS = [
  "Krok 1: Inicjatywa ustawodawcza",
  "Krok 2: I czytanie",
  "Krok 3: Komisja",
  "Krok 4: II i III czytanie",
  "Krok 5: Głosowanie w Sejmie",
  "Krok 6: Senat",
  "Krok 7: Prezydent",
];

const getRows = () => screen.getAllByRole("button");

const circleOf = (row: HTMLElement) => row.querySelector("span");

const panelOf = (row: HTMLElement) => {
  const panel = document.getElementById(
    row.getAttribute("aria-controls") ?? "",
  );
  expect(panel).not.toBeNull();
  return panel as HTMLElement;
};

const expectPanelClosed = (row: HTMLElement) => {
  expect(panelOf(row)).toHaveAttribute("aria-hidden", "true");
};

describe("EducationStepAccordion", () => {
  describe("given no initially open step", () => {
    it("renders seven collapsed rows", () => {
      renderAccordion();

      const rows = getRows();

      expect(rows).toHaveLength(7);
      expect(rows.map((row) => row.getAttribute("aria-label"))).toEqual(
        STEP_LABELS,
      );
      expect(screen.getByText("1")).toBeVisible();
      expect(screen.getByText("7")).toBeVisible();

      for (const row of rows) {
        expect(row).toHaveAttribute("aria-expanded", "false");
        expect(row).toHaveAttribute("aria-controls");
        expect(circleOf(row)).not.toHaveClass("bg-[#00718F]");
        expect(row.querySelector("svg")).not.toHaveClass("rotate-180");
      }

      expectPanelClosed(rows[5]);
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });

  describe("when a closed row is clicked", () => {
    it("expands it and shows its description and content", () => {
      renderAccordion();

      const senate = screen.getByRole("button", { name: "Krok 6: Senat" });
      fireEvent.click(senate);

      expect(senate).toHaveAttribute("aria-expanded", "true");
      expect(circleOf(senate)).toHaveClass("bg-[#00718F]");
      expect(senate.querySelector("svg")).toHaveClass("rotate-180");
      expect(
        screen.getByText(
          "Marszałek Sejmu przekazuje uchwaloną ustawę Marszałkowi Senatu. Senat ma 30 dni na stanowisko.",
        ),
      ).toBeVisible();
      expect(screen.getByText("przyjąć ustawę bez zmian")).toBeVisible();

      const panel = document.getElementById(
        senate.getAttribute("aria-controls") ?? "",
      );
      expect(panel).toHaveAttribute("role", "region");
      expect(screen.getByRole("region", { name: "Senat" })).toBe(panel);
      expect(panel?.firstElementChild?.firstElementChild).toHaveClass("pl-14");
      expectPanelClosed(
        screen.getByRole("button", { name: "Krok 1: Inicjatywa ustawodawcza" }),
      );
    });
  });

  describe("when an open row is clicked", () => {
    it("collapses it", () => {
      renderAccordion("senate");

      const senate = screen.getByRole("button", { name: "Krok 6: Senat" });
      fireEvent.click(senate);

      expect(senate).toHaveAttribute("aria-expanded", "false");
      expect(circleOf(senate)).not.toHaveClass("bg-[#00718F]");
      expect(senate.querySelector("svg")).not.toHaveClass("rotate-180");
      expectPanelClosed(senate);
    });
  });

  describe("given one row is open and another is clicked", () => {
    it("closes the first and opens the second", () => {
      renderAccordion("senate");

      fireEvent.click(
        screen.getByRole("button", { name: "Krok 7: Prezydent" }),
      );

      expect(
        screen.getByRole("button", { name: "Krok 6: Senat" }),
      ).toHaveAttribute("aria-expanded", "false");
      expect(
        screen.getByRole("button", { name: "Krok 7: Prezydent" }),
      ).toHaveAttribute("aria-expanded", "true");
      expectPanelClosed(screen.getByRole("button", { name: "Krok 6: Senat" }));
      expect(
        screen.getByText(
          "Marszałek Sejmu przedstawia ustawę Prezydentowi. Prezydent ma 21 dni i wybiera jedną z trzech dróg.",
        ),
      ).toBeVisible();
      expect(
        screen.getByText(
          "podpisać ustawę i zarządzić jej ogłoszenie w Dzienniku Ustaw",
        ),
      ).toBeVisible();
    });
  });

  describe("given initialOpenKey matches a step", () => {
    it("renders that step expanded on first render", () => {
      renderAccordion("senate");

      expect(
        screen.getByRole("button", { name: "Krok 6: Senat" }),
      ).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("uchwalić poprawki")).toBeVisible();
      expect(
        screen.getByRole("button", { name: "Krok 1: Inicjatywa ustawodawcza" }),
      ).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("given a focused row", () => {
    it("toggles on Enter and Space and moves focus with the arrow keys", () => {
      renderAccordion();

      const rows = getRows();
      rows[0].focus();

      fireEvent.keyDown(rows[0], { key: "Enter" });
      expect(rows[0]).toHaveAttribute("aria-expanded", "true");
      expect(
        screen.getByText(
          "Projekt ustawy wpływa do Marszałka Sejmu i dostaje numer druku. Wnioskodawca przedstawia skutki finansowe jego wykonania.",
        ),
      ).toBeVisible();

      fireEvent.keyDown(rows[0], { key: " " });
      expect(rows[0]).toHaveAttribute("aria-expanded", "false");
      expectPanelClosed(rows[0]);

      fireEvent.keyDown(rows[0], { key: "ArrowDown" });
      expect(rows[1]).toHaveFocus();

      fireEvent.keyDown(rows[1], { key: "ArrowUp" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "End" });
      expect(rows[6]).toHaveFocus();

      fireEvent.keyDown(rows[6], { key: "ArrowDown" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "ArrowUp" });
      expect(rows[6]).toHaveFocus();

      fireEvent.keyDown(rows[6], { key: "Home" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "Tab" });
      expect(rows[0]).toHaveFocus();
      expect(rows[0]).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("given initialOpenKey that matches no step", () => {
    it("renders every row collapsed and does not throw", () => {
      renderAccordion("missing");

      for (const row of getRows()) {
        expect(row).toHaveAttribute("aria-expanded", "false");
      }

      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });

  describe("given the legislative copy", () => {
    it("explains the ordinary statute from initiative to publication", () => {
      renderAccordion();

      expect(
        screen.getByRole("heading", { level: 1, name: "Jak powstaje ustawa" }),
      ).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: "Krok 1: Inicjatywa ustawodawcza" }),
      );
      expect(screen.getByText("komisja sejmowa")).toBeVisible();
      expect(screen.getByText("co najmniej 15 posłów")).toBeVisible();

      fireEvent.click(
        screen.getByRole("button", { name: "Krok 5: Głosowanie w Sejmie" }),
      );
      expect(
        screen.getByText(
          "wystarcza zwykła większość: więcej głosów „za” niż „przeciw”",
        ),
      ).toBeVisible();

      fireEvent.click(
        screen.getByRole("button", { name: "Krok 7: Prezydent" }),
      );
      expect(
        screen.getByText(
          "gdy terminu nie ma, wchodzi w życie po 14 dniach od ogłoszenia",
        ),
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { level: 2, name: "Inne tryby" }),
      ).toBeInTheDocument();
    });
  });
});
