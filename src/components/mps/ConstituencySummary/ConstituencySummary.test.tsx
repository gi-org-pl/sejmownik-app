import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { ConstituencySummary } from "./ConstituencySummary";
import type { ConstituencySummaryProps } from "./ConstituencySummary.types";

const renderSummary = (props: Partial<ConstituencySummaryProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <ConstituencySummary
        number={19}
        name="Warszawa"
        mpCount={20}
        includesAbroadVotes
        {...props}
      />
    </I18nProvider>,
  );

describe("<ConstituencySummary />", () => {
  describe("given abroad votes are included", () => {
    it("renders the abroad clause", () => {
      renderSummary();

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: "Okręg nr 19 · Warszawa",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("20 posłów · także głosy oddane za granicą"),
      ).toBeInTheDocument();
    });
  });

  describe("given abroad votes are not included", () => {
    it("omits the abroad clause", () => {
      renderSummary({ includesAbroadVotes: false });

      expect(screen.getByText("20 posłów")).toBeInTheDocument();
      expect(screen.queryByText(/za granicą/)).not.toBeInTheDocument();
    });
  });

  describe("given 1, 2 and 5 MPs", () => {
    it("uses singular, paucal and genitive plural forms", () => {
      const { rerender } = renderSummary({
        mpCount: 1,
        includesAbroadVotes: false,
      });
      expect(screen.getByText("1 poseł")).toBeInTheDocument();

      rerender(
        <I18nProvider i18n={i18n}>
          <ConstituencySummary
            number={19}
            name="Warszawa"
            mpCount={2}
            includesAbroadVotes={false}
          />
        </I18nProvider>,
      );
      expect(screen.getByText("2 posłowie")).toBeInTheDocument();

      rerender(
        <I18nProvider i18n={i18n}>
          <ConstituencySummary
            number={19}
            name="Warszawa"
            mpCount={5}
            includesAbroadVotes={false}
          />
        </I18nProvider>,
      );
      expect(screen.getByText("5 posłów")).toBeInTheDocument();
    });
  });

  describe("given 0 MPs", () => {
    it("shows 0 posłów", () => {
      renderSummary({ mpCount: 0, includesAbroadVotes: false });

      expect(screen.getByText("0 posłów")).toBeInTheDocument();
    });
  });
});
