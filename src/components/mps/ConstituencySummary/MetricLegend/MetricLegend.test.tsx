import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { MetricLegend } from "./MetricLegend";
import type { MetricLegendProps } from "./MetricLegend.types";

const renderLegend = (props: Partial<MetricLegendProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <MetricLegend
        participationFrom={64}
        participationTo={66}
        totalMps={460}
        medianInterpellations={30.5}
        {...props}
      />
    </I18nProvider>,
  );

describe("<MetricLegend />", () => {
  describe("given a sittings range and median 30.5", () => {
    it("renders both items with the median in Polish format", () => {
      renderLegend();
      const items = screen.getAllByRole("listitem");

      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("posiedzenia 64–66");
      expect(items[1]).toHaveTextContent("(30,5)");
    });
  });

  describe("given no sittings range", () => {
    it("omits the range instead of inventing it", () => {
      renderLegend({
        participationFrom: undefined,
        participationTo: undefined,
      });
      const items = screen.getAllByRole("listitem");

      expect(items[0]).toHaveTextContent("Głosowania");
      expect(items[0]).not.toHaveTextContent("posiedzenia");
      expect(items[0]).not.toHaveTextContent("64");
    });
  });

  describe("given only one end of the sittings range", () => {
    it("omits the range", () => {
      renderLegend({ participationTo: undefined });

      expect(screen.getAllByRole("listitem")[0]).not.toHaveTextContent(
        "posiedzenia",
      );
    });
  });

  describe("given no median", () => {
    it("does not show the median value", () => {
      renderLegend({ medianInterpellations: undefined });

      expect(screen.getAllByRole("listitem")[1]).not.toHaveTextContent("(");
    });
  });

  describe("given a different number of MPs", () => {
    it("shows that number instead of a hardcoded 460", () => {
      renderLegend({ totalMps: 450 });
      const second = screen.getAllByRole("listitem")[1];

      expect(second).toHaveTextContent("450");
      expect(second).not.toHaveTextContent("460");
    });
  });

  describe("given 1, 2 and 22 MPs", () => {
    it("uses the correct Polish plural form after wśród", () => {
      const { rerender } = renderLegend({ totalMps: 1 });
      expect(screen.getAllByRole("listitem")[1]).toHaveTextContent(
        "wśród 1 posła",
      );

      rerender(
        <I18nProvider i18n={i18n}>
          <MetricLegend totalMps={2} />
        </I18nProvider>,
      );
      expect(screen.getAllByRole("listitem")[1]).toHaveTextContent(
        "wśród 2 posłów",
      );

      rerender(
        <I18nProvider i18n={i18n}>
          <MetricLegend totalMps={22} />
        </I18nProvider>,
      );
      expect(screen.getAllByRole("listitem")[1]).toHaveTextContent(
        "wśród 22 posłów",
      );
    });
  });

  describe("accessibility", () => {
    it("hides the decorative swatches from screen readers", () => {
      const { container } = renderLegend();

      expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(
        2,
      );
    });
  });
});
