import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { MetricBar } from "../MetricBar";
import { MetricBarGroup } from "./MetricBarGroup";

const getRow = (label: string) => screen.getByText(label).parentElement;

describe("<MetricBarGroup />", () => {
  describe("given inline rows inside a group", () => {
    it("puts every row on the group's columns", () => {
      render(
        <I18nProvider i18n={i18n}>
          <MetricBarGroup>
            <MetricBar variant="percent" label="Głosowania" percent={98} />
            <MetricBar
              variant="median"
              label="Interpelacje"
              value={85}
              median={30.5}
              q1={12}
              q3={62}
              scaleMax={120}
            />
          </MetricBarGroup>
        </I18nProvider>,
      );

      for (const label of ["Głosowania", "Interpelacje"]) {
        expect(getRow(label)).toHaveClass("col-span-3", "grid-cols-subgrid");
      }
      expect(getRow("Głosowania")?.parentElement).toHaveClass("grid");
    });
  });

  describe("given an inline row outside a group", () => {
    it("keeps its own columns with a gap", () => {
      render(
        <I18nProvider i18n={i18n}>
          <MetricBar variant="percent" label="Głosowania" percent={98} />
        </I18nProvider>,
      );

      const row = getRow("Głosowania");

      expect(row).toHaveClass("grid", "gap-x-2");
      expect(row).not.toHaveClass("grid-cols-subgrid");
    });
  });

  describe("given a long label", () => {
    it("lets the label wrap instead of overflowing the bar", () => {
      render(
        <I18nProvider i18n={i18n}>
          <MetricBar
            variant="percent"
            label="Udział w głosowaniach na posiedzeniach"
            percent={76}
          />
        </I18nProvider>,
      );

      expect(
        screen.getByText("Udział w głosowaniach na posiedzeniach"),
      ).toHaveClass("min-w-0", "wrap-break-word");
    });
  });
});
