import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { EducationCurrentStageCard } from "./EducationCurrentStageCard";
import type { EducationCurrentStageCardProps } from "./EducationCurrentStageCard.types";

const BADGE = "Teraz na tym etapie";
const TITLE = "Składki ZUS dla artystów";
const STATUS = "Uchwalona przez Sejm 8 paź 2026 · czeka na stanowisko Senatu";
const BILL_HREF = "/ustawy/skladki-zus-dla-artystow";

const senateBill = {
  id: "skladki-zus-dla-artystow",
  title: TITLE,
  currentStep: 5,
  statusLine: STATUS,
};

const defaultProps: EducationCurrentStageCardProps = {
  badgeLabel: BADGE,
  bill: senateBill,
  totalSteps: 6,
  billHref: BILL_HREF,
};

const Pathname = () => {
  const { pathname } = useLocation();

  return <span data-testid="pathname">{pathname}</span>;
};

const renderCard = (props: Partial<EducationCurrentStageCardProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <MemoryRouter initialEntries={["/edukacja"]}>
        <Pathname />
        <EducationCurrentStageCard {...defaultProps} {...props} />
      </MemoryRouter>
    </I18nProvider>,
  );

describe("EducationCurrentStageCard", () => {
  describe("given a bill in the Senate", () => {
    it("renders the badge, title, progress at step 5 and status line", () => {
      renderCard();

      expect(screen.getByText(BADGE)).toBeInTheDocument();
      expect(screen.getByText(TITLE)).toBeInTheDocument();
      expect(screen.getByText(STATUS)).toHaveClass(
        "text-[14px]",
        "leading-[20px]",
        "font-normal",
        "text-gi-dark-gray",
      );
      expect(
        screen.getByRole("progressbar", { name: "Etap 5 z 6" }),
      ).toHaveAttribute("aria-valuenow", "5");
      expect(screen.getByText(TITLE)).toHaveClass(
        "text-[18px]",
        "leading-[22px]",
        "font-bold",
        "text-gi-light-primary",
      );
      expect(
        screen.getByRole("link").querySelector("span.rounded-full"),
      ).toHaveClass("size-10", "border-gi-dark-ash");
    });

    it("links the whole card to billHref", () => {
      renderCard();

      const link = screen.getByRole("link", {
        name: `${TITLE} ${BADGE} Etap 5 z 6 ${STATUS}`,
      });

      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(link).toHaveAttribute("href", BILL_HREF);

      fireEvent.click(link);

      expect(screen.getByTestId("pathname")).toHaveTextContent(BILL_HREF);
    });
  });

  describe("given a different number of steps", () => {
    it("draws the progress bar for that total", () => {
      renderCard({
        totalSteps: 4,
        bill: { ...senateBill, currentStep: 2 },
      });

      expect(
        screen.getByRole("progressbar", { name: "Etap 2 z 4" }),
      ).toHaveAttribute("aria-valuemax", "4");
    });
  });

  describe("given a very long title", () => {
    it("keeps the full title in the accessible name", () => {
      const title = `${TITLE} ${TITLE} ${TITLE} ${TITLE}`;

      renderCard({ bill: { ...senateBill, title } });

      expect(screen.getByRole("link")).toHaveAccessibleName(
        `${title} ${BADGE} Etap 5 z 6 ${STATUS}`,
      );
      expect(screen.getByText(title)).toHaveClass("line-clamp-2");
    });
  });

  describe("given a very long status line", () => {
    it("wraps it without truncation", () => {
      const statusLine = `${STATUS} ${STATUS}`;

      renderCard({ bill: { ...senateBill, statusLine } });

      const line = screen.getByText(statusLine);

      expect(line).toHaveClass("wrap-break-word");
      expect(line.className).not.toMatch(/truncate|line-clamp/);
    });
  });

  describe("given no bill", () => {
    it("does not render", () => {
      const { unmount } = renderCard({ bill: undefined });

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.queryByText(BADGE)).not.toBeInTheDocument();
      expect(screen.queryByText(TITLE)).not.toBeInTheDocument();
      unmount();

      renderCard({ bill: null });

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("given no statusLine", () => {
    it("omits the status line", () => {
      renderCard({ bill: { ...senateBill, statusLine: undefined } });

      expect(screen.queryByText(STATUS)).not.toBeInTheDocument();
      expect(screen.getByText(TITLE)).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("given no currentStep", () => {
    it("renders every segment inactive", () => {
      renderCard({ bill: { ...senateBill, currentStep: undefined } });

      const bar = screen.getByRole("progressbar", {
        name: "Żaden etap się nie rozpoczął",
      });

      expect(bar.querySelectorAll("span")).toHaveLength(6);
      for (const segment of bar.querySelectorAll("span")) {
        expect(segment).toHaveClass("bg-gi-dark-ash");
      }
      expect(screen.getByRole("link")).toHaveAccessibleName(
        `${TITLE} ${BADGE} Żaden etap się nie rozpoczął ${STATUS}`,
      );
    });
  });
});
