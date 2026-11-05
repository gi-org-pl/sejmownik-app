import { render, screen } from "@testing-library/react";
import { SectionHeader } from "./SectionHeader";

describe("<SectionHeader />", () => {
  describe("given a title", () => {
    it("renders the title text", () => {
      render(<SectionHeader title="Szczegóły" />);

      expect(screen.getByText("Szczegóły")).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("given an info message", () => {
    it("renders the info button next to the title", () => {
      render(
        <SectionHeader
          title="Słowniczek"
          info="Krótki opis kluczowych pojęć z procesu legislacyjnego."
        />,
      );

      expect(screen.getByText("Słowniczek")).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: "Krótki opis kluczowych pojęć z procesu legislacyjnego.",
        }),
      ).toBeInTheDocument();
    });
  });
});
