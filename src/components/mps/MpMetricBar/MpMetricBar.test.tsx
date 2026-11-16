import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { MpMetricBar } from "./MpMetricBar";
import type { MpMetricBarProps } from "./MpMetricBar.types";

const renderBar = (props: MpMetricBarProps) =>
  render(
    <I18nProvider i18n={i18n}>
      <MpMetricBar {...props} />
    </I18nProvider>,
  );

const participation = (percent: number | null): MpMetricBarProps => ({
  variant: "participation",
  label: "Głosowania",
  percent,
});

const interpellations = (
  count: number | null,
  rank: number | null,
): MpMetricBarProps => ({
  variant: "interpellations",
  label: "Interpelacje",
  count,
  rank,
  totalMps: 460,
});

describe("<MpMetricBar />", () => {
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

  describe("given interpellations 0 at the last rank", () => {
    it("puts the dot at the start of the scale", () => {
      renderBar(interpellations(0, 460));

      expect(screen.getByTestId("metric-dot")).toHaveStyle({ left: "0%" });
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("given interpellations 117 at rank 77 of 460", () => {
    it("places the dot by rank and shows the count", () => {
      renderBar(interpellations(117, 77));

      const left = Number.parseFloat(
        screen.getByTestId("metric-dot").style.left,
      );

      expect(left).toBeCloseTo(83.44, 1);
      expect(screen.getByText("117")).toBeInTheDocument();
    });
  });

  describe("given interpellations null", () => {
    it("hides the dot and shows brak danych", () => {
      renderBar(interpellations(null, null));

      expect(screen.getByText("brak danych")).toBeInTheDocument();
      expect(screen.queryByTestId("metric-dot")).not.toBeInTheDocument();
    });
  });

  describe("given the top-ranked MP with 505 interpellations", () => {
    it("puts the dot at the end of the scale and shows the full value", () => {
      renderBar(interpellations(505, 1));

      expect(screen.getByTestId("metric-dot")).toHaveStyle({ left: "100%" });
      expect(screen.getByText("505")).toBeInTheDocument();
    });
  });

  describe("given a count without a rank", () => {
    it("shows the value but does not invent a dot position", () => {
      renderBar(interpellations(30, null));

      expect(screen.getByText("30")).toBeInTheDocument();
      expect(screen.queryByTestId("metric-dot")).not.toBeInTheDocument();
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
