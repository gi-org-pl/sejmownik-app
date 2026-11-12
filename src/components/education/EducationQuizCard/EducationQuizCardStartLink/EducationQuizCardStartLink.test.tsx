import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { EducationQuizCardStartLink } from "./EducationQuizCardStartLink";
import type { EducationQuizCardStartLinkProps } from "./EducationQuizCardStartLink.types";

const HREF = "/quiz/droga-ustawy";
const TITLE = "Droga ustawy";
const START_NAME = "Rozpocznij quiz: Droga ustawy";

const renderLink = (props: Partial<EducationQuizCardStartLinkProps> = {}) => {
  const ui: ReactElement = (
    <I18nProvider i18n={i18n}>
      <MemoryRouter>
        <EducationQuizCardStartLink href={HREF} title={TITLE} {...props} />
      </MemoryRouter>
    </I18nProvider>
  );

  return render(ui);
};

const getLink = () => screen.getByRole("link", { name: START_NAME });

describe("<EducationQuizCardStartLink />", () => {
  describe("given a quiz title", () => {
    it("names the link with the quiz it starts", () => {
      renderLink();

      expect(getLink()).toHaveAttribute("href", HREF);
      expect(getLink()).toHaveAccessibleName(START_NAME);
    });

    it("shows Rozpocznij from the wide breakpoint up", () => {
      renderLink();

      expect(within(getLink()).getByText("Rozpocznij")).toHaveClass(
        "hidden",
        "md:inline",
      );
    });

    it("draws the play icon as a decorative mask", () => {
      renderLink();

      const icon = getLink().querySelector<HTMLElement>(
        "span[aria-hidden='true']",
      );

      expect(getLink()).toHaveAccessibleName(START_NAME);
      expect(icon?.style.maskImage).toMatch(/^url\(".+"\)$/);
      expect(icon).toHaveClass(...BUTTON_ICON_MASK_CLASS_NAME.split(" "));
    });

    it("shows keyboard focus with the shared outline", () => {
      renderLink();

      expect(getLink()).toHaveClass(...FOCUS_CLASS_NAME.split(" "));
    });
  });

  describe("given another title", () => {
    it("includes that title in the name", () => {
      renderLink({ title: "Konstytucja" });

      expect(
        screen.getByRole("link", { name: "Rozpocznij quiz: Konstytucja" }),
      ).toBeInTheDocument();
    });
  });
});
