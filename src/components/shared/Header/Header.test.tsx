import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { PATHS } from "@/constants/paths";
import { Header } from "./Header";

const NAVIGATION_NAME = "Nawigacja główna";
const OPEN_MENU_NAME = "Otwórz menu nawigacji";
const CLOSE_MENU_NAME = "Zamknij menu nawigacji";

const renderHeader = (path: string = PATHS.home) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>,
  );

const getNavigations = () =>
  screen.getAllByRole("navigation", { name: NAVIGATION_NAME });

const openMenu = () => {
  fireEvent.click(screen.getByRole("button", { name: OPEN_MENU_NAME }));

  return getNavigations()[1];
};

describe("<Header />", () => {
  describe("given any page", () => {
    it("renders the banner landmark", () => {
      renderHeader();

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("renders the brand as a link to the home page", () => {
      renderHeader();

      const homeLink = screen.getByRole("link", { name: "Strona główna" });

      expect(homeLink).toHaveAttribute("href", PATHS.home);
      expect(homeLink.querySelectorAll("img")).toHaveLength(2);
    });

    it("renders the navigation bar with Ustawy, Posłowie and Edukacja in that order", () => {
      renderHeader();

      const [bar] = getNavigations();

      expect(
        within(bar)
          .getAllByRole("link")
          .map((link) => link.textContent),
      ).toEqual(["Ustawy", "Posłowie", "Edukacja"]);
    });

    it("renders the menu button collapsed, with the menu closed", () => {
      renderHeader();

      expect(
        screen.getByRole("button", { name: OPEN_MENU_NAME, expanded: false }),
      ).toBeInTheDocument();
      expect(getNavigations()).toHaveLength(1);
    });

    it("draws the menu button's icon as a mask", () => {
      renderHeader();

      const icon = screen
        .getByRole("button", { name: OPEN_MENU_NAME })
        .querySelector("span");

      expect(icon?.style.maskImage).toMatch(/^url\(".+"\)$/);
    });

    it("draws the menu button's icon in the shared way that survives forced colours", () => {
      renderHeader();

      expect(
        screen
          .getByRole("button", { name: OPEN_MENU_NAME })
          .querySelector("span"),
      ).toHaveClass(...BUTTON_ICON_MASK_CLASS_NAME.split(" "));
    });

    it("shows keyboard focus on the logo link and the menu button as the shared outline", () => {
      renderHeader();

      for (const control of [
        screen.getByRole("link", { name: "Strona główna" }),
        screen.getByRole("button", { name: OPEN_MENU_NAME }),
      ]) {
        expect(control).toHaveClass(...FOCUS_CLASS_NAME.split(" "));
      }
    });
  });

  describe("given the page a navigation link leads to", () => {
    it("marks that link as the current page", () => {
      renderHeader(PATHS.education);

      expect(
        screen.getByRole("link", { name: "Edukacja", current: "page" }),
      ).toBeInTheDocument();
    });
  });

  describe("when the menu button is clicked", () => {
    it("opens the menu with Edukacja first and Ustawy last", () => {
      renderHeader();

      const menu = openMenu();

      expect(
        within(menu)
          .getAllByRole("link")
          .map((link) => link.textContent),
      ).toEqual(["Edukacja", "Posłowie", "Ustawy"]);
    });

    it("marks the button as expanded and offers to close the menu", () => {
      renderHeader();

      openMenu();

      expect(
        screen.getByRole("button", { name: CLOSE_MENU_NAME, expanded: true }),
      ).toBeInTheDocument();
    });

    it("points the button at the menu it controls", () => {
      renderHeader();

      const menu = openMenu();

      expect(
        screen.getByRole("button", { name: CLOSE_MENU_NAME }),
      ).toHaveAttribute("aria-controls", menu.id);
    });
  });

  describe("when the menu button is clicked again", () => {
    it("closes the menu", () => {
      renderHeader();

      openMenu();
      fireEvent.click(screen.getByRole("button", { name: CLOSE_MENU_NAME }));

      expect(getNavigations()).toHaveLength(1);
      expect(
        screen.getByRole("button", { name: OPEN_MENU_NAME, expanded: false }),
      ).toBeInTheDocument();
    });
  });

  describe("when a link of the open menu is clicked", () => {
    it("closes the menu", () => {
      renderHeader();

      const menu = openMenu();
      fireEvent.click(within(menu).getByRole("link", { name: "Edukacja" }));

      expect(getNavigations()).toHaveLength(1);
    });
  });

  describe("when the user presses outside the open menu", () => {
    it("closes the menu", () => {
      renderHeader();

      openMenu();
      fireEvent.mouseDown(document.body);

      expect(getNavigations()).toHaveLength(1);
    });
  });

  describe("when the user presses inside the open menu", () => {
    it("keeps the menu open", () => {
      renderHeader();

      const menu = openMenu();
      fireEvent.mouseDown(menu);

      expect(getNavigations()).toHaveLength(2);
    });
  });
});
