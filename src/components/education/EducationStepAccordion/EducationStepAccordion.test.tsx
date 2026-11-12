import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { EducationStepAccordion } from "./EducationStepAccordion";
import type { EducationStep } from "./EducationStepAccordion.types";

const renderAccordion = (steps: EducationStep[], initialOpenKey?: string) =>
  render(
    <I18nProvider i18n={i18n}>
      <EducationStepAccordion steps={steps} initialOpenKey={initialOpenKey} />
    </I18nProvider>,
  );

const step = (
  key: string,
  number: number,
  title: string,
  description: string,
  content?: ReactNode,
): EducationStep => ({
  key,
  number,
  title,
  description,
  content,
});

const sixSteps = (): EducationStep[] => [
  step(
    "submission",
    1,
    "Wpłynięcie projektu",
    "Opis wpływu",
    <p>Treść wpływu</p>,
  ),
  step(
    "first-reading",
    2,
    "I czytanie",
    "Opis czytania",
    <p>Treść czytania</p>,
  ),
  step("committee", 3, "Komisja", "Opis komisji", <p>Treść komisji</p>),
  step(
    "sejm-vote",
    4,
    "Głosowanie w Sejmie",
    "Opis głosowania",
    <p>Treść głosowania</p>,
  ),
  step("senate", 5, "Senat", "Opis senatu", <p>Treść senatu</p>),
  step("president", 6, "Prezydent", "Opis prezydenta", <p>Treść prezydenta</p>),
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
    it("renders six collapsed rows", () => {
      renderAccordion(sixSteps());

      const rows = getRows();

      expect(rows).toHaveLength(6);
      expect(rows.map((row) => row.getAttribute("aria-label"))).toEqual([
        "Krok 1: Wpłynięcie projektu",
        "Krok 2: I czytanie",
        "Krok 3: Komisja",
        "Krok 4: Głosowanie w Sejmie",
        "Krok 5: Senat",
        "Krok 6: Prezydent",
      ]);
      expect(screen.getByText("1")).toBeVisible();
      expect(screen.getByText("6")).toBeVisible();

      for (const row of rows) {
        expect(row).toHaveAttribute("aria-expanded", "false");
        expect(row).toHaveAttribute("aria-controls");
        expect(circleOf(row)).not.toHaveClass("bg-[#00718F]");
        expect(row.querySelector("svg")).not.toHaveClass("rotate-180");
      }

      expectPanelClosed(rows[4]);
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });

  describe("when a closed row is clicked", () => {
    it("expands it and shows its description and content", () => {
      renderAccordion(sixSteps());

      const senate = screen.getByRole("button", { name: "Krok 5: Senat" });
      fireEvent.click(senate);

      expect(senate).toHaveAttribute("aria-expanded", "true");
      expect(circleOf(senate)).toHaveClass("bg-[#00718F]");
      expect(senate.querySelector("svg")).toHaveClass("rotate-180");
      expect(screen.getByText("Opis senatu")).toBeVisible();
      expect(screen.getByText("Treść senatu")).toBeVisible();

      const panel = document.getElementById(
        senate.getAttribute("aria-controls") ?? "",
      );
      expect(panel).toHaveAttribute("role", "region");
      expect(screen.getByRole("region", { name: "Senat" })).toBe(panel);
      expect(panel?.firstElementChild?.firstElementChild).toHaveClass("pl-14");
      expectPanelClosed(
        screen.getByRole("button", { name: "Krok 1: Wpłynięcie projektu" }),
      );
    });
  });

  describe("when an open row is clicked", () => {
    it("collapses it", () => {
      renderAccordion(sixSteps(), "senate");

      const senate = screen.getByRole("button", { name: "Krok 5: Senat" });
      fireEvent.click(senate);

      expect(senate).toHaveAttribute("aria-expanded", "false");
      expect(circleOf(senate)).not.toHaveClass("bg-[#00718F]");
      expect(senate.querySelector("svg")).not.toHaveClass("rotate-180");
      expectPanelClosed(senate);
    });
  });

  describe("given one row is open and another is clicked", () => {
    it("closes the first and opens the second", () => {
      renderAccordion(sixSteps(), "senate");

      fireEvent.click(
        screen.getByRole("button", { name: "Krok 6: Prezydent" }),
      );

      expect(
        screen.getByRole("button", { name: "Krok 5: Senat" }),
      ).toHaveAttribute("aria-expanded", "false");
      expect(
        screen.getByRole("button", { name: "Krok 6: Prezydent" }),
      ).toHaveAttribute("aria-expanded", "true");
      expectPanelClosed(screen.getByRole("button", { name: "Krok 5: Senat" }));
      expect(screen.getByText("Opis prezydenta")).toBeVisible();
      expect(screen.getByText("Treść prezydenta")).toBeVisible();
    });
  });

  describe("given initialOpenKey matches a step", () => {
    it("renders that step expanded on first render", () => {
      renderAccordion(sixSteps(), "senate");

      expect(
        screen.getByRole("button", { name: "Krok 5: Senat" }),
      ).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Opis senatu")).toBeVisible();
      expect(screen.getByText("Treść senatu")).toBeVisible();
      expect(
        screen.getByRole("button", { name: "Krok 1: Wpłynięcie projektu" }),
      ).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("given a focused row", () => {
    it("toggles on Enter and Space and moves focus with the arrow keys", () => {
      renderAccordion(sixSteps());

      const rows = getRows();
      rows[0].focus();

      fireEvent.keyDown(rows[0], { key: "Enter" });
      expect(rows[0]).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Opis wpływu")).toBeVisible();

      fireEvent.keyDown(rows[0], { key: " " });
      expect(rows[0]).toHaveAttribute("aria-expanded", "false");
      expectPanelClosed(rows[0]);

      fireEvent.keyDown(rows[0], { key: "ArrowDown" });
      expect(rows[1]).toHaveFocus();

      fireEvent.keyDown(rows[1], { key: "ArrowUp" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "End" });
      expect(rows[5]).toHaveFocus();

      fireEvent.keyDown(rows[5], { key: "ArrowDown" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "ArrowUp" });
      expect(rows[5]).toHaveFocus();

      fireEvent.keyDown(rows[5], { key: "Home" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "Tab" });
      expect(rows[0]).toHaveFocus();
      expect(rows[0]).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("given no steps", () => {
    it("renders nothing", () => {
      const { container } = renderAccordion([]);

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("given an expanded row with no content", () => {
    it("shows only the description", () => {
      renderAccordion([step("senate", 5, "Senat", "Opis senatu")]);

      fireEvent.click(screen.getByRole("button", { name: "Krok 5: Senat" }));

      const panel = screen.getByRole("region", { name: "Senat" });
      expect(panel).toHaveTextContent("Opis senatu");
      expect(panel.querySelectorAll("p")).toHaveLength(1);
    });
  });

  describe("given an expanded row with no description", () => {
    it("shows the content and no empty paragraph", () => {
      renderAccordion([step("senate", 5, "Senat", "   ", <p>Treść senatu</p>)]);

      fireEvent.click(screen.getByRole("button", { name: "Krok 5: Senat" }));

      const panel = screen.getByRole("region", { name: "Senat" });
      expect(screen.getByText("Treść senatu")).toBeVisible();
      expect(panel.querySelectorAll("p")).toHaveLength(1);
      expect(panel.querySelector("p")).toHaveTextContent("Treść senatu");
    });
  });

  describe("given initialOpenKey that matches no step", () => {
    it("renders every row collapsed and does not throw", () => {
      renderAccordion(sixSteps(), "missing");

      for (const row of getRows()) {
        expect(row).toHaveAttribute("aria-expanded", "false");
      }

      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });

  describe("given duplicate step keys", () => {
    it("warns in development and renders each row from its index", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

      try {
        renderAccordion(
          [
            step("senate", 5, "Senat", "Pierwszy opis", <p>Pierwsza treść</p>),
            step("senate", 5, "Senat drugi", "Drugi opis", <p>Druga treść</p>),
          ],
          "senate",
        );

        expect(warn).toHaveBeenCalledWith(
          'EducationStepAccordion: duplicate step key "senate". Using the index as the fallback identity.',
        );

        const rows = getRows();
        expect(rows).toHaveLength(2);
        expect(rows[0].getAttribute("aria-controls")).not.toBe(
          rows[1].getAttribute("aria-controls"),
        );
        expect(rows[0]).toHaveAttribute("aria-expanded", "true");
        expect(rows[1]).toHaveAttribute("aria-expanded", "false");
        expect(screen.getByText("Pierwszy opis")).toBeVisible();
        expectPanelClosed(rows[1]);

        fireEvent.click(rows[1]);

        expect(rows[0]).toHaveAttribute("aria-expanded", "false");
        expect(rows[1]).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByText("Druga treść")).toBeVisible();
      } finally {
        warn.mockRestore();
      }
    });
  });
});
