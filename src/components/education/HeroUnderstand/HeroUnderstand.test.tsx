import { render, screen } from "@testing-library/react";
import { HeroUnderstand } from "./HeroUnderstand";

const TITLE = "Jak liczą się mandaty";
const DESCRIPTION = "Przesuń suwaki i zobacz miejsca w Sejmie.";

describe("<HeroUnderstand />", () => {
  describe("given a title and a description", () => {
    it("renders the title as an h1", () => {
      render(<HeroUnderstand title={TITLE} description={DESCRIPTION} />);

      expect(
        screen.getByRole("heading", { level: 1, name: TITLE }),
      ).toBeInTheDocument();
    });

    it("renders the description as a paragraph", () => {
      render(<HeroUnderstand title={TITLE} description={DESCRIPTION} />);

      expect(screen.getByText(DESCRIPTION).tagName).toBe("P");
    });
  });

  describe("given no description", () => {
    it("renders the title only", () => {
      const { container } = render(<HeroUnderstand title={TITLE} />);

      expect(
        screen.getByRole("heading", { level: 1, name: TITLE }),
      ).toBeInTheDocument();
      expect(container.querySelector("p")).not.toBeInTheDocument();
    });
  });

  describe("given no title", () => {
    it("renders nothing", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { container } = render(<HeroUnderstand title="   " />);

      expect(container).toBeEmptyDOMElement();
      expect(warn).toHaveBeenCalledOnce();

      warn.mockRestore();
    });
  });

  describe("given a long title and description", () => {
    it("keeps the full text in the DOM", () => {
      const longTitle = "Bardzo długi tytuł ".repeat(20).trim();
      const longDescription = "Bardzo długi opis ".repeat(60).trim();

      render(
        <HeroUnderstand title={longTitle} description={longDescription} />,
      );

      expect(
        screen.getByRole("heading", { level: 1, name: longTitle }),
      ).toBeInTheDocument();
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });
});
