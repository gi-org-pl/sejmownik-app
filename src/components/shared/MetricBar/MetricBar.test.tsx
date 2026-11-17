import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { MetricBar } from "./MetricBar";
import type { MetricBarProps } from "./MetricBar.types";

const renderBar = (props: MetricBarProps) =>
  render(
    <I18nProvider i18n={i18n}>
      <MetricBar {...props} />
    </I18nProvider>,
  );

const participation = (percent: number | null): MetricBarProps => ({
  variant: "percent",
  label: "Głosowania",
  percent,
});

// Scale 0–200: median 30.5 → 15.25%, middle half 10–60 → 5%–30%.
const interpellations = (value: number | null): MetricBarProps => ({
  variant: "median",
  label: "Interpelacje",
  value,
  median: 30.5,
  q1: 10,
  q3: 60,
  scaleMax: 200,
});

const leftOf = (testId: string) =>
  Number.parseFloat(screen.getByTestId(testId).style.left);

describe("<MetricBar />", () => {
  describe("given participation 98", () => {
    it("fills the bar to 98% and shows the value", () => {
      renderBar(participation(98));

      expect(screen.getByTestId("metric-fill")).toHaveStyle({ width: "98%" });
      expect(screen.getByText("98%")).toBeInTheDocument();
      expect(screen.getByText("Głosowania")).toBeInTheDocument();
    });
  });

  describe("given participation 0", () => {
    it("shows an empty fill and 0%", () => {
      renderBar(participation(0));

      expect(screen.getByTestId("metric-fill")).toHaveStyle({ width: "0%" });
      expect(screen.getByText("0%")).toBeInTheDocument();
    });
  });

  describe("given participation null", () => {
    it("shows brak danych and no fill", () => {
      renderBar(participation(null));

      expect(screen.getByText("brak danych")).toBeInTheDocument();
      expect(screen.queryByTestId("metric-fill")).not.toBeInTheDocument();
    });
  });

  describe("given participation above 100", () => {
    it("clamps the fill but shows the value unchanged", () => {
      renderBar(participation(120));

      expect(screen.getByTestId("metric-fill")).toHaveStyle({ width: "100%" });
      expect(screen.getByText("120%")).toBeInTheDocument();
    });
  });

  describe("given interpellations count 0", () => {
    it("puts the dot at the start of the scale", () => {
      renderBar(interpellations(0));

      expect(screen.getByTestId("metric-dot")).toHaveStyle({ left: "0%" });
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("given interpellations count 117", () => {
    it("places the dot by count on the scale and shows the value", () => {
      renderBar(interpellations(117));

      expect(leftOf("metric-dot")).toBeCloseTo(58.5, 1);
      expect(screen.getByText("117")).toBeInTheDocument();
    });
  });

  describe("given interpellations null", () => {
    it("hides the dot and shows brak danych", () => {
      renderBar(interpellations(null));

      expect(screen.getByText("brak danych")).toBeInTheDocument();
      expect(screen.queryByTestId("metric-dot")).not.toBeInTheDocument();
    });
  });

  describe("given a count above the scale max", () => {
    it("clamps the dot to the end and shows the full value", () => {
      renderBar(interpellations(505));

      expect(screen.getByTestId("metric-dot")).toHaveStyle({ left: "100%" });
      expect(screen.getByText("505")).toBeInTheDocument();
    });
  });

  describe("median tick", () => {
    it.each([
      ["with data", 117],
      ["without data", null],
    ])("is drawn at the median position %s", (_, value) => {
      renderBar(interpellations(value));

      expect(leftOf("metric-median")).toBeCloseTo(15.25, 2);
    });

    it("puts the dot on the tick when the count equals the median", () => {
      renderBar({ ...interpellations(30), median: 30 });

      expect(leftOf("metric-dot")).toBe(leftOf("metric-median"));
    });

    it("exposes the median value as text for screen readers", () => {
      renderBar(interpellations(117));

      expect(screen.getByText("mediana: 30,5")).toBeInTheDocument();
    });
  });

  describe("given the stacked layout", () => {
    it("renders participation with the label and value above the fill", () => {
      renderBar({ ...participation(98), layout: "stacked" });

      expect(screen.getByText("Głosowania")).toBeInTheDocument();
      expect(screen.getByText("98%")).toBeInTheDocument();
      expect(screen.getByTestId("metric-fill")).toHaveStyle({ width: "98%" });
    });

    it("draws the middle half of MPs from q1 to q3", () => {
      renderBar({ ...interpellations(117), layout: "stacked" });

      expect(screen.getByTestId("metric-middle")).toHaveStyle({
        left: "5%",
        width: "25%",
      });
      expect(screen.getByTestId("metric-dot")).toBeInTheDocument();
    });

    it("hides the dot without data but keeps the median and the band", () => {
      renderBar({ ...interpellations(null), layout: "stacked" });

      expect(screen.getByText("brak danych")).toBeInTheDocument();
      expect(screen.queryByTestId("metric-dot")).not.toBeInTheDocument();
      expect(screen.getByTestId("metric-median")).toBeInTheDocument();
      expect(screen.getByTestId("metric-middle")).toBeInTheDocument();
    });
  });

  describe("given the inline layout", () => {
    it("draws the middle half band", () => {
      renderBar(interpellations(117));

      expect(screen.getByTestId("metric-middle")).toHaveStyle({
        left: "5%",
        width: "25%",
      });
    });
  });

  describe("accessibility", () => {
    it("hides the decorative track from screen readers", () => {
      const { container } = renderBar(participation(98));

      expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(
        1,
      );
    });
  });
});
