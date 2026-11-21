import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import Poslowie from "./poslowie";

const renderPage = () => {
  const router = createMemoryRouter(
    [{ path: "/poslowie", element: <Poslowie /> }],
    { initialEntries: ["/poslowie"] },
  );

  return render(
    <I18nProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
};

const search = (value: string) =>
  fireEvent.change(
    screen.getByRole("textbox", { name: "Szukaj okręgu lub posła" }),
    { target: { value } },
  );

// Lista kart posłów ma nazwę typu "20 posłów" lub "1 poseł" (pose?ł łapie obie
// formy), w odróżnieniu od list w nagłówku.
const getMpsGrid = () => screen.getByRole("list", { name: /^\d+ pose?ł/ });

describe("Posłowie page", () => {
  describe("given the default fixture", () => {
    it("renders the page header, toolbar, summary, chips, legend and grid", () => {
      renderPage();

      expect(
        screen.getByRole("heading", { level: 1, name: "Posłowie" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: "Szukaj okręgu lub posła" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Okręg nr 19 · Warszawa" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("20 posłów · także głosy oddane za granicą"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Wszystkie 20" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Interpelacje: pozycja wśród 460 posłów/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Głosowania: udział we wszystkich głosowaniach w tej kadencji",
        ),
      ).toBeInTheDocument();
      expect(getMpsGrid()).toHaveAccessibleName("20 posłów");
      expect(within(getMpsGrid()).getAllByRole("listitem")).toHaveLength(12);
    });
  });

  describe('when the user searches for "Warszawa"', () => {
    it("shows constituency 19 and its MPs", () => {
      renderPage();

      search("Kraków");
      expect(
        screen.getByRole("heading", { name: "Okręg nr 13 · Kraków" }),
      ).toBeInTheDocument();

      search("Warszawa");

      expect(
        screen.getByRole("heading", { name: "Okręg nr 19 · Warszawa" }),
      ).toBeInTheDocument();
      expect(getMpsGrid()).toHaveAccessibleName("20 posłów");
    });
  });

  describe("when the user searches for a surname", () => {
    it("lists the matching MPs across constituencies without a summary", () => {
      renderPage();

      search("Mazur");

      expect(
        screen.getByRole("heading", { name: "Wyniki dla „Mazur”" }),
      ).toBeInTheDocument();
      expect(
        within(getMpsGrid()).getByRole("link", {
          name: "Krzysztof Mazur, Prawo i Sprawiedliwość",
        }),
      ).toBeInTheDocument();
      expect(within(getMpsGrid()).getAllByRole("listitem")).toHaveLength(1);
      expect(screen.queryByText(/Okręg nr/)).not.toBeInTheDocument();
    });
  });

  describe("when the user searches for a city in several constituencies", () => {
    it("shows the first one and says so", () => {
      renderPage();

      search("Brzesko");

      expect(
        screen.getByRole("heading", { name: "Okręg nr 13 · Kraków" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("status")).toHaveTextContent(
        "Ta miejscowość leży w kilku okręgach (nr 13, 14). Pokazujemy okręg nr 13.",
      );
    });
  });

  describe("when the user searches for an unknown city", () => {
    it("shows the no-constituency message and no grid", () => {
      renderPage();

      search("Atlantyda");

      expect(
        screen.getByRole("heading", { name: "Nie znaleziono okręgu" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Nie znaleziono posłów dla „Atlantyda”"),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("list", { name: /^\d+ pose?ł/ }),
      ).not.toBeInTheDocument();
    });
  });

  describe("when a club chip is selected", () => {
    it("shows only that club's MPs and keeps the summary count", () => {
      renderPage();

      fireEvent.click(screen.getByRole("button", { name: "KO 9" }));

      expect(within(getMpsGrid()).getAllByRole("listitem")).toHaveLength(9);
      expect(
        screen.getByText("20 posłów · także głosy oddane za granicą"),
      ).toBeInTheDocument();
    });
  });

  describe("when the sort is changed", () => {
    it("re-sorts the grid by surname", () => {
      renderPage();

      const firstLink = () => within(getMpsGrid()).getAllByRole("link")[0];

      expect(firstLink()).toHaveAccessibleName(/Bartoszewski/);

      fireEvent.keyDown(screen.getByRole("button", { name: /Sortuj/ }), {
        key: "Enter",
      });
      fireEvent.click(screen.getByText("Nazwisko Ż–A"));

      expect(firstLink()).toHaveAccessibleName(/Zielińska/);
    });
  });
});
