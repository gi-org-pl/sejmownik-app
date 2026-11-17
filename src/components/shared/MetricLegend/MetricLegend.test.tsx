import { render, screen } from "@testing-library/react";
import { MetricLegend } from "./MetricLegend";
import type { MetricLegendItem } from "./MetricLegend.types";

const ITEMS: MetricLegendItem[] = [
  { symbol: "percent", label: "Głosowania: udział w głosowaniach" },
  { symbol: "median", label: "Interpelacje: kreska = mediana" },
];

describe("<MetricLegend />", () => {
  describe("given two items", () => {
    it("renders the labels it was given", () => {
      render(<MetricLegend items={ITEMS} />);

      expect(screen.getAllByRole("listitem")).toHaveLength(2);
      expect(
        screen.getByText("Głosowania: udział w głosowaniach"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Interpelacje: kreska = mediana"),
      ).toBeInTheDocument();
    });

    it("draws the swatch that matches each symbol", () => {
      render(<MetricLegend items={ITEMS} />);

      const [percentItem, medianItem] = screen.getAllByRole("listitem");

      expect(
        percentItem.querySelector(
          '[data-testid="metric-legend-swatch-percent"]',
        ),
      ).not.toBeNull();
      expect(
        medianItem.querySelector('[data-testid="metric-legend-swatch-median"]'),
      ).not.toBeNull();
    });
  });

  describe("given a label with markup", () => {
    it("renders it as given", () => {
      render(
        <MetricLegend
          items={[
            {
              symbol: "median",
              label: (
                <>
                  Pozycja wśród <strong>460</strong> posłów
                </>
              ),
            },
          ]}
        />,
      );

      expect(screen.getByText("460").tagName).toBe("STRONG");
    });
  });

  describe("given no items", () => {
    it("renders nothing", () => {
      const { container } = render(<MetricLegend items={[]} />);

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("accessibility", () => {
    it("hides the decorative swatches from screen readers", () => {
      render(<MetricLegend items={ITEMS} />);

      expect(
        screen.getByTestId("metric-legend-swatch-percent"),
      ).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByTestId("metric-legend-swatch-median")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });
  });
});
