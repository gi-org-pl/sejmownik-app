import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { EducationQuizCard } from "./EducationQuizCard";
import type { EducationQuizCardProps } from "./EducationQuizCard.types";

const TITLE = "Droga ustawy";
const START_HREF = "/quiz/droga-ustawy";
const START_NAME = "Rozpocznij quiz: Droga ustawy";
const DESCRIPTION =
  "Osiem pytań o to, kto i jak uchwala prawo. Po każdej odpowiedzi krótkie wyjaśnienie.";

const defaultProps: EducationQuizCardProps = {
  eyebrow: "Quiz",
  title: TITLE,
  description: DESCRIPTION,
  questionCount: 8,
  durationMinutes: 5,
  startHref: START_HREF,
};

const Pathname = () => {
  const { pathname } = useLocation();

  return <span data-testid="pathname">{pathname}</span>;
};

const renderCard = (props: Partial<EducationQuizCardProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <MemoryRouter initialEntries={["/edukacja"]}>
        <Pathname />
        <EducationQuizCard {...defaultProps} {...props} />
      </MemoryRouter>
    </I18nProvider>,
  );

const pillTexts = () =>
  screen.queryAllByRole("listitem").map((pill) => pill.textContent);

describe("EducationQuizCard", () => {
  describe("given the default props", () => {
    it("renders the eyebrow, title, description, pills and start button", () => {
      renderCard();

      expect(screen.getByRole("region", { name: TITLE })).toBeInTheDocument();
      expect(screen.getByText("Quiz")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: TITLE })).toBeInTheDocument();
      expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
      expect(pillTexts()).toEqual(["8 pytań", "5 min"]);
      expect(screen.getByRole("link", { name: START_NAME })).toHaveAttribute(
        "href",
        START_HREF,
      );
      expect(screen.getByText("Rozpocznij")).toBeInTheDocument();
    });
  });

  describe("when the start button is activated", () => {
    it("navigates to startHref", () => {
      renderCard();

      fireEvent.click(screen.getByRole("link", { name: START_NAME }));

      expect(screen.getByTestId("pathname")).toHaveTextContent(START_HREF);
    });
  });

  describe("given a long description", () => {
    it("wraps it to the width of the card without truncation", () => {
      const description = `${DESCRIPTION} ${DESCRIPTION}`;

      renderCard({ description });

      const paragraph = screen.getByText(description);

      expect(paragraph).toHaveClass("wrap-break-word");
      expect(paragraph.className).not.toMatch(/truncate|line-clamp/);
    });
  });

  describe("given a question count of 1", () => {
    it("uses the singular Polish form", () => {
      renderCard({ questionCount: 1 });

      expect(screen.getByText("1 pytanie")).toBeInTheDocument();
    });
  });

  describe("given a question count of 5", () => {
    it("uses the plural Polish form", () => {
      renderCard({ questionCount: 5 });

      expect(screen.getByText("5 pytań")).toBeInTheDocument();
    });
  });

  describe("given a duration of 1 minute", () => {
    it("reads the duration pill as 1 min", () => {
      renderCard({ durationMinutes: 1 });

      expect(screen.getByText("1 min")).toBeInTheDocument();
    });
  });

  describe("given no startHref", () => {
    it("does not render the start button", () => {
      renderCard({ startHref: undefined });

      expect(
        screen.queryByRole("link", { name: /Rozpocznij/ }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /Rozpocznij/ }),
      ).not.toBeInTheDocument();
    });
  });

  describe("given a blank startHref", () => {
    it("does not render the start button", () => {
      renderCard({ startHref: "   " });

      expect(
        screen.queryByRole("link", { name: /Rozpocznij/ }),
      ).not.toBeInTheDocument();
    });
  });

  describe("given a zero duration", () => {
    it("omits the duration pill", () => {
      renderCard({ durationMinutes: 0 });

      expect(pillTexts()).toEqual(["8 pytań"]);
      expect(screen.queryByText("0 min")).not.toBeInTheDocument();
    });
  });

  describe("given a negative duration", () => {
    it("omits the duration pill", () => {
      renderCard({ durationMinutes: -2 });

      expect(pillTexts()).toEqual(["8 pytań"]);
    });
  });

  describe("given a zero question count", () => {
    it("omits the question pill", () => {
      renderCard({ questionCount: 0 });

      expect(pillTexts()).toEqual(["5 min"]);
      expect(screen.queryByText("0 pytań")).not.toBeInTheDocument();
    });
  });

  describe("given a negative question count", () => {
    it("omits the question pill", () => {
      renderCard({ questionCount: -1 });

      expect(pillTexts()).toEqual(["5 min"]);
    });
  });
});
