import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { EducationQuizCardPills } from "./EducationQuizCardPills";
import type { EducationQuizCardPillsProps } from "./EducationQuizCardPills.types";

const renderPills = (props: Partial<EducationQuizCardPillsProps> = {}) => {
  const ui: ReactElement = (
    <I18nProvider i18n={i18n}>
      <EducationQuizCardPills
        questionCount={8}
        durationMinutes={5}
        {...props}
      />
    </I18nProvider>
  );

  return render(ui);
};

const pillTexts = () =>
  screen.queryAllByRole("listitem").map((pill) => pill.textContent);

describe("<EducationQuizCardPills />", () => {
  describe("given both counts", () => {
    it("renders a question pill and a duration pill as text", () => {
      renderPills();

      expect(pillTexts()).toEqual(["8 pytań", "5 min"]);
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
  });

  describe("given one question", () => {
    it("uses the singular Polish form", () => {
      renderPills({ questionCount: 1 });

      expect(screen.getByText("1 pytanie")).toBeInTheDocument();
    });
  });

  describe("given two questions", () => {
    it("uses the few Polish form", () => {
      renderPills({ questionCount: 2 });

      expect(screen.getByText("2 pytania")).toBeInTheDocument();
    });
  });

  describe("given five questions", () => {
    it("uses the many Polish form", () => {
      renderPills({ questionCount: 5 });

      expect(screen.getByText("5 pytań")).toBeInTheDocument();
    });
  });

  describe("given one minute", () => {
    it("reads the duration as 1 min", () => {
      renderPills({ durationMinutes: 1 });

      expect(screen.getByText("1 min")).toBeInTheDocument();
    });
  });

  describe("given a zero or negative count", () => {
    it("omits that pill", () => {
      const { unmount } = renderPills({ questionCount: 0 });

      expect(pillTexts()).toEqual(["5 min"]);
      unmount();

      renderPills({ durationMinutes: -3 });

      expect(pillTexts()).toEqual(["8 pytań"]);
    });

    it("renders nothing when both counts are missing", () => {
      const { container } = renderPills({
        questionCount: 0,
        durationMinutes: 0,
      });

      expect(container).toBeEmptyDOMElement();
    });
  });
});
