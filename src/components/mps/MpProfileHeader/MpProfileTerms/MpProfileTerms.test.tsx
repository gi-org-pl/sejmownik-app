import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import type { MpProfileTermsProps } from "../MpProfileHeader.types";
import { MpProfileTerms } from "./MpProfileTerms";

const CURRENT_TERM_NUMBER = 10;

const THREE_TERMS: MpProfileTermsProps["terms"] = [
  { number: 8, roman: "VIII" },
  { number: 9, roman: "IX" },
  { number: 10, roman: "X" },
];

const renderTerms = (
  terms: MpProfileTermsProps["terms"],
  currentTermNumber = CURRENT_TERM_NUMBER,
) =>
  render(
    <I18nProvider i18n={i18n}>
      <MpProfileTerms terms={terms} currentTermNumber={currentTermNumber} />
    </I18nProvider>,
  );

describe("<MpProfileTerms />", () => {
  describe("given three terms with the last one current", () => {
    it("renders overlapping circles with the current one emphasised", () => {
      renderTerms(THREE_TERMS);

      const items = screen.getAllByRole("listitem");

      expect(screen.getByText("Kadencje Sejmu")).toHaveClass(
        "order-1",
        "text-base",
        "leading-[22px]",
        "font-normal",
        "text-gi-light-primary",
        "md:order-2",
      );
      expect(screen.getByRole("list")).toHaveClass("order-2", "md:order-1");
      expect(screen.getByText("Kadencje Sejmu").parentElement).toHaveClass(
        "flex-col",
        "gap-3",
        "md:flex-row",
        "md:items-center",
      );
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveAccessibleName("VIII kadencja");
      expect(items[1]).toHaveAccessibleName("IX kadencja");
      expect(items[1]).toHaveClass("-ml-1.5");
      expect(items[2]).toHaveAccessibleName("X kadencja, obecna");
      expect(items[2].querySelector("span")).toHaveClass(
        "size-10",
        "rounded-full",
        "border-2",
        "bg-gi-light-primary",
        "text-white",
        "font-bold",
      );
      expect(items[2].querySelector("span span")).toHaveClass("translate-y-px");
      expect(items[0].querySelector("span")).toHaveClass(
        "bg-gi-ash",
        "border-gi-ash",
        "text-gi-light-primary",
      );
      expect(items[0].querySelector("span > span")).toHaveClass(
        "bg-gi-secondary/15",
      );
      expect(items[0].querySelector("span")).not.toHaveClass(
        "bg-gi-light-primary",
      );
    });
  });

  describe("given terms in an order other than chronological", () => {
    it("keeps the input order", () => {
      renderTerms([
        { number: 10, roman: "X" },
        { number: 8, roman: "VIII" },
      ]);

      const items = screen.getAllByRole("listitem");

      expect(items[0]).toHaveAccessibleName("X kadencja, obecna");
      expect(items[1]).toHaveAccessibleName("VIII kadencja");
    });
  });

  describe("given a former MP with no current term", () => {
    it("renders no chip as current", () => {
      renderTerms([{ number: 9, roman: "IX" }]);

      const chip = screen.getByRole("listitem");

      expect(chip).toHaveAccessibleName("IX kadencja");
      expect(screen.queryByText(/obecna/)).not.toBeInTheDocument();
      expect(chip.querySelector(".bg-gi-light-primary")).toBeNull();
    });
  });

  describe("given no terms", () => {
    it('renders "Brak danych o kadencji" in place of the chips', () => {
      renderTerms([]);

      expect(screen.getByText("Brak danych o kadencji")).toHaveClass(
        "text-base",
        "leading-[22px]",
        "font-normal",
        "text-gi-light-primary",
      );
      expect(screen.queryByText("Kadencje Sejmu")).not.toBeInTheDocument();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });
});
