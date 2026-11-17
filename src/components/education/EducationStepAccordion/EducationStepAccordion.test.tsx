import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { EducationStepAccordion } from "./EducationStepAccordion";
import type { EducationStep } from "./EducationStepAccordion.types";

const STEPS: EducationStep[] = [
  {
    key: "submission",
    number: 1,
    title: "Inicjatywa ustawodawcza",
    description: "Projekt wpływa do Marszałka Sejmu.",
  },
  {
    key: "first-reading",
    number: 2,
    title: "I czytanie",
    description: "Wnioskodawca uzasadnia projekt.",
  },
  {
    key: "senate",
    number: 3,
    title: "Senat",
    description: "Senat ma 30 dni na stanowisko.",
    content: <p>przyjąć ustawę bez zmian</p>,
  },
  {
    key: "president",
    number: 4,
    title: "Prezydent",
    description: "Prezydent ma 21 dni.",
    content: <p>podpisać ustawę</p>,
  },
];

const STEP_LABELS = [
  "Krok 1: Inicjatywa ustawodawcza",
  "Krok 2: I czytanie",
  "Krok 3: Senat",
  "Krok 4: Prezydent",
];

const renderAccordion = (
  props: { steps?: EducationStep[]; initialOpenKey?: string } = {},
) =>
  render(
    <I18nProvider i18n={i18n}>
      <EducationStepAccordion
        steps={props.steps ?? STEPS}
        initialOpenKey={props.initialOpenKey}
      />
    </I18nProvider>,
  );

const getRows = () => screen.getAllByRole("button");
const getRow = (name: string) => screen.getByRole("button", { name });

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
    it("renders one collapsed row per step", () => {
      renderAccordion();

      const rows = getRows();

      expect(rows).toHaveLength(STEPS.length);
      expect(rows.map((row) => row.getAttribute("aria-label"))).toEqual(
        STEP_LABELS,
      );
      expect(screen.getByText("1")).toBeVisible();
      expect(screen.getByText("4")).toBeVisible();

      for (const row of rows) {
        expect(row).toHaveAttribute("aria-expanded", "false");
        expect(row).toHaveAttribute("aria-controls");
        expect(circleOf(row)).not.toHaveClass("bg-gi-secondary");
        expect(row.querySelector("svg")).not.toHaveClass("rotate-180");
        expectPanelClosed(row);
      }

      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });

  describe("given an empty steps list", () => {
    it("renders nothing", () => {
      const { container } = renderAccordion({ steps: [] });

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("when a closed row is clicked", () => {
    it("expands it and shows its description and content", () => {
      renderAccordion();

      const senate = getRow("Krok 3: Senat");
      fireEvent.click(senate);

      expect(senate).toHaveAttribute("aria-expanded", "true");
      expect(circleOf(senate)).toHaveClass("bg-gi-secondary");
      expect(senate.querySelector("svg")).toHaveClass("rotate-180");
      expect(screen.getByText("Senat ma 30 dni na stanowisko.")).toBeVisible();
      expect(screen.getByText("przyjąć ustawę bez zmian")).toBeVisible();

      const panel = panelOf(senate);
      expect(panel).toHaveAttribute("role", "region");
      expect(screen.getByRole("region", { name: "Senat" })).toBe(panel);
      expect(panel.firstElementChild?.firstElementChild).toHaveClass("pl-14");
      expectPanelClosed(getRow("Krok 1: Inicjatywa ustawodawcza"));
    });
  });

  describe("given a step with a description and no content", () => {
    it("shows only the description when opened", () => {
      renderAccordion({ initialOpenKey: "submission" });

      const panel = panelOf(getRow("Krok 1: Inicjatywa ustawodawcza"));

      expect(panel).toHaveAttribute("aria-hidden", "false");
      expect(
        screen.getByText("Projekt wpływa do Marszałka Sejmu."),
      ).toBeVisible();
      expect(panel.querySelectorAll("p")).toHaveLength(1);
    });
  });

  describe("when an open row is clicked", () => {
    it("collapses it", () => {
      renderAccordion({ initialOpenKey: "senate" });

      const senate = getRow("Krok 3: Senat");
      fireEvent.click(senate);

      expect(senate).toHaveAttribute("aria-expanded", "false");
      expect(circleOf(senate)).not.toHaveClass("bg-gi-secondary");
      expect(senate.querySelector("svg")).not.toHaveClass("rotate-180");
      expectPanelClosed(senate);
    });
  });

  describe("given one row is open and another is clicked", () => {
    it("closes the first and opens the second", () => {
      renderAccordion({ initialOpenKey: "senate" });

      fireEvent.click(getRow("Krok 4: Prezydent"));

      expect(getRow("Krok 3: Senat")).toHaveAttribute("aria-expanded", "false");
      expect(getRow("Krok 4: Prezydent")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
      expectPanelClosed(getRow("Krok 3: Senat"));
      expect(screen.getByText("podpisać ustawę")).toBeVisible();
    });
  });

  describe("given initialOpenKey matches a step", () => {
    it("renders that step expanded on first render", () => {
      renderAccordion({ initialOpenKey: "senate" });

      expect(getRow("Krok 3: Senat")).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("przyjąć ustawę bez zmian")).toBeVisible();
      expect(getRow("Krok 1: Inicjatywa ustawodawcza")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
  });

  describe("given initialOpenKey that matches no step", () => {
    it("renders every row collapsed and does not throw", () => {
      renderAccordion({ initialOpenKey: "missing" });

      for (const row of getRows()) {
        expect(row).toHaveAttribute("aria-expanded", "false");
      }

      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });

  describe("given a focused row", () => {
    it("leaves Enter and Space to the native button click", () => {
      renderAccordion();

      const [row] = getRows();
      row.focus();

      for (const key of ["Enter", " "]) {
        const event = new KeyboardEvent("keydown", {
          key,
          bubbles: true,
          cancelable: true,
        });
        row.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
        expect(row).toHaveAttribute("aria-expanded", "false");
      }
    });

    it("moves focus with the arrow, Home and End keys", () => {
      renderAccordion();

      const rows = getRows();
      const last = rows.length - 1;
      rows[0].focus();

      fireEvent.keyDown(rows[0], { key: "ArrowDown" });
      expect(rows[1]).toHaveFocus();

      fireEvent.keyDown(rows[1], { key: "ArrowUp" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "End" });
      expect(rows[last]).toHaveFocus();

      fireEvent.keyDown(rows[last], { key: "ArrowDown" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "ArrowUp" });
      expect(rows[last]).toHaveFocus();

      fireEvent.keyDown(rows[last], { key: "Home" });
      expect(rows[0]).toHaveFocus();

      fireEvent.keyDown(rows[0], { key: "Tab" });
      expect(rows[0]).toHaveFocus();
      expect(rows[0]).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("given two steps with the same key", () => {
    it("keeps them as separate rows and warns in development", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

      renderAccordion({
        steps: [STEPS[0], { ...STEPS[1], key: STEPS[0].key }],
      });

      fireEvent.click(getRows()[1]);

      expect(getRows()[0]).toHaveAttribute("aria-expanded", "false");
      expect(getRows()[1]).toHaveAttribute("aria-expanded", "true");
      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('duplicate step key "submission"'),
      );

      warn.mockRestore();
    });

    it("warns once, not again on re-render with a rebuilt steps array", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const buildSteps = () => [STEPS[0], { ...STEPS[1], key: STEPS[0].key }];

      const { rerender } = renderAccordion({ steps: buildSteps() });

      fireEvent.click(getRows()[0]);
      rerender(
        <I18nProvider i18n={i18n}>
          <EducationStepAccordion steps={buildSteps()} />
        </I18nProvider>,
      );

      expect(warn).toHaveBeenCalledTimes(1);

      warn.mockRestore();
    });
  });
});
