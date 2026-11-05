import { render, screen } from "@testing-library/react";
import { DefinitionList } from "./DefinitionList";
import type { DefinitionListItem } from "./DefinitionList.types";

const threeItems: DefinitionListItem[] = [
  {
    key: "druk",
    term: "Druk",
    description: "Dokument zawierający projekt ustawy.",
  },
  {
    key: "czytanie",
    term: "Czytanie",
    description: "Omówienie projektu ustawy w Sejmie.",
  },
  {
    key: "wiekszosc",
    term: "Większość bezwzględna",
    description: "Więcej niż połowa ważnie oddanych głosów.",
  },
];

describe("<DefinitionList />", () => {
  describe("given three items", () => {
    it("renders each term as a dt with its description as a dd", () => {
      const { container } = render(
        <DefinitionList title="Słowniczek" items={threeItems} />,
      );

      expect(screen.getByText("Słowniczek")).toBeInTheDocument();

      const terms = container.querySelectorAll("dt");
      const descriptions = container.querySelectorAll("dd");

      expect(terms).toHaveLength(3);
      expect(descriptions).toHaveLength(3);
      expect(terms[0]).toHaveTextContent("Druk");
      expect(descriptions[0]).toHaveTextContent(
        "Dokument zawierający projekt ustawy.",
      );
      expect(terms[1]).toHaveTextContent("Czytanie");
      expect(descriptions[1]).toHaveTextContent(
        "Omówienie projektu ustawy w Sejmie.",
      );
      expect(terms[2]).toHaveTextContent("Większość bezwzględna");
      expect(descriptions[2]).toHaveTextContent(
        "Więcej niż połowa ważnie oddanych głosów.",
      );
    });
  });

  describe("given a single item", () => {
    it("renders it without a trailing divider", () => {
      const { container } = render(
        <DefinitionList title="Słowniczek" items={[threeItems[0]!]} />,
      );

      const itemWrappers = container.querySelectorAll("dl > div");
      expect(itemWrappers).toHaveLength(1);
      expect(itemWrappers[0]).not.toHaveClass("border-b");
    });
  });

  describe("given an item with a null description", () => {
    it("renders the term without a description line", () => {
      const { container } = render(
        <DefinitionList
          title="Słowniczek"
          items={[{ key: "druk", term: "Druk", description: null }]}
        />,
      );

      expect(container.querySelector("dt")).toHaveTextContent("Druk");
      expect(container.querySelector("dd")).not.toBeInTheDocument();
    });
  });

  describe("given no items and an empty message", () => {
    it("renders the title and the empty message", () => {
      render(
        <DefinitionList
          title="Słowniczek"
          items={[]}
          emptyMessage="Brak haseł w słowniczku"
        />,
      );

      expect(screen.getByText("Słowniczek")).toBeInTheDocument();
      expect(screen.getByText("Brak haseł w słowniczku")).toBeInTheDocument();
      expect(document.querySelector("dt")).not.toBeInTheDocument();
    });
  });

  describe("given no items and no empty message", () => {
    it("renders the title only", () => {
      const { container } = render(
        <DefinitionList title="Słowniczek" items={[]} />,
      );

      expect(screen.getByText("Słowniczek")).toBeInTheDocument();
      expect(container.querySelector("dl")).not.toBeInTheDocument();
      expect(container.querySelectorAll("p")).toHaveLength(1);
    });
  });

  describe("given a source without a link", () => {
    it("renders the source label with the link icon", () => {
      const { container } = render(
        <DefinitionList
          title="Szczegóły"
          items={threeItems}
          source={{ label: "Źródło danych: api.sejm.gov.pl" }}
        />,
      );

      expect(
        screen.getByText("Źródło danych: api.sejm.gov.pl"),
      ).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(
        container.querySelector("[aria-hidden='true']"),
      ).toBeInTheDocument();
    });
  });

  describe("given a source with a link", () => {
    it("renders the source label as a link", () => {
      render(
        <DefinitionList
          title="Szczegóły"
          items={threeItems}
          source={{
            label: "Źródło danych: api.sejm.gov.pl",
            href: "https://api.sejm.gov.pl",
          }}
        />,
      );

      expect(
        screen.getByRole("link", { name: "Źródło danych: api.sejm.gov.pl" }),
      ).toHaveAttribute("href", "https://api.sejm.gov.pl");
    });
  });

  describe("given duplicate item keys", () => {
    it("logs a development warning and still renders both items", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { container } = render(
        <DefinitionList
          title="Słowniczek"
          items={[
            { key: "dup", term: "Pierwszy", description: "A" },
            { key: "dup", term: "Drugi", description: "B" },
          ]}
        />,
      );

      expect(container.querySelectorAll("dt")).toHaveLength(2);
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });
  });
});
