import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { BillStageProgress } from "./BillStageProgress";
import type { BillStageProgressProps } from "./BillStageProgress.types";

const renderProgress = (props: Partial<BillStageProgressProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <BillStageProgress currentStep={5} totalSteps={6} {...props} />
    </I18nProvider>,
  );

const segments = () => screen.getByRole("progressbar").querySelectorAll("span");

describe("BillStageProgress", () => {
  describe("given step 5 of 6", () => {
    it("fills five segments and names the step", () => {
      renderProgress();

      const bar = screen.getByRole("progressbar", { name: "Etap 5 z 6" });

      expect(bar).toHaveAttribute("aria-valuenow", "5");
      expect(bar).toHaveAttribute("aria-valuemax", "6");
      expect(segments()).toHaveLength(6);
      expect(segments()[0]).toHaveClass("bg-gi-light-primary");
      expect(segments()[3]).toHaveClass("bg-gi-light-primary");
      expect(segments()[4]).toHaveClass("bg-gi-secondary");
      expect(segments()[5]).toHaveClass("bg-gi-dark-ash");
    });
  });

  describe("given step 2 of 3", () => {
    it("draws as many segments as totalSteps", () => {
      renderProgress({ currentStep: 2, totalSteps: 3 });

      const bar = screen.getByRole("progressbar", { name: "Etap 2 z 3" });

      expect(bar).toHaveAttribute("aria-valuemax", "3");
      expect(segments()).toHaveLength(3);
      expect(segments()[0]).toHaveClass("bg-gi-light-primary");
      expect(segments()[1]).toHaveClass("bg-gi-secondary");
      expect(segments()[2]).toHaveClass("bg-gi-dark-ash");
    });
  });

  describe("given no current step", () => {
    it("renders every segment inactive", () => {
      const { rerender } = renderProgress({ currentStep: undefined });

      const bar = screen.getByRole("progressbar", {
        name: "Żaden etap się nie rozpoczął",
      });

      expect(bar).toHaveAttribute("aria-valuenow", "0");
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "6");
      expect(segments()).toHaveLength(6);
      for (const segment of segments()) {
        expect(segment).toHaveClass("bg-gi-dark-ash");
      }

      rerender(
        <I18nProvider i18n={i18n}>
          <BillStageProgress currentStep={0} totalSteps={6} />
        </I18nProvider>,
      );

      expect(segments()).toHaveLength(6);
      for (const segment of segments()) {
        expect(segment).toHaveClass("bg-gi-dark-ash");
      }
    });
  });

  describe("given a step outside 1..totalSteps", () => {
    it("does not render", () => {
      const { rerender } = renderProgress({ currentStep: 7, totalSteps: 6 });

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

      rerender(
        <I18nProvider i18n={i18n}>
          <BillStageProgress currentStep={1} totalSteps={0} />
        </I18nProvider>,
      );

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });
});
