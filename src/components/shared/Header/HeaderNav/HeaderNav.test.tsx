import { fireEvent, render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { MemoryRouter } from "react-router";
import { PATHS } from "@/constants/paths";
import { HeaderNav } from "./HeaderNav";

const renderNav = (
  props: Partial<React.ComponentProps<typeof HeaderNav>> = {},
  path: string = PATHS.home,
) => {
  const handleNavigate = vi.fn();

  render(
    <MemoryRouter initialEntries={[path]}>
      <HeaderNav variant="bar" onNavigate={handleNavigate} {...props} />
    </MemoryRouter>,
  );

  return { handleNavigate };
};

const getLinkNames = () =>
  within(screen.getByRole("navigation"))
    .getAllByRole("link")
    .map((link) => link.textContent);

describe("<HeaderNav />", () => {
  describe("given any variant", () => {
    it("renders a navigation landmark named as the main navigation", () => {
      renderNav();

      expect(
        screen.getByRole("navigation", { name: "Nawigacja główna" }),
      ).toBeInTheDocument();
    });

    it("links to Ustawy, Posłowie and Edukacja", () => {
      renderNav();

      const navigation = screen.getByRole("navigation");

      expect(
        within(navigation).getByRole("link", { name: "Ustawy" }),
      ).toHaveAttribute("href", PATHS.bills);
      expect(
        within(navigation).getByRole("link", { name: "Posłowie" }),
      ).toHaveAttribute("href", PATHS.mps);
      expect(
        within(navigation).getByRole("link", { name: "Edukacja" }),
      ).toHaveAttribute("href", PATHS.education);
    });
  });

  describe("given the bar variant", () => {
    it("lists Ustawy first and Edukacja last", () => {
      renderNav({ variant: "bar" });

      expect(getLinkNames()).toEqual(["Ustawy", "Posłowie", "Edukacja"]);
    });
  });

  describe("given the menu variant", () => {
    it("lists Edukacja first and Ustawy last", () => {
      renderNav({ variant: "menu" });

      expect(getLinkNames()).toEqual(["Edukacja", "Posłowie", "Ustawy"]);
    });
  });

  describe("given an id and a ref", () => {
    it("puts both on the navigation landmark", () => {
      const ref = createRef<HTMLElement>();
      renderNav({ variant: "menu", id: "menu-id", ref });

      const navigation = screen.getByRole("navigation");

      expect(navigation).toHaveAttribute("id", "menu-id");
      expect(ref.current).toBe(navigation);
    });
  });

  describe("given a page that none of the links leads to", () => {
    it("marks no link as current", () => {
      renderNav({}, PATHS.home);

      expect(
        screen.queryByRole("link", { current: "page" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("given the page one of the links leads to", () => {
    it("marks only that link as the current page", () => {
      renderNav({}, PATHS.education);

      expect(screen.getAllByRole("link", { current: "page" })).toEqual([
        screen.getByRole("link", { name: "Edukacja" }),
      ]);
    });
  });

  describe("when a link is clicked", () => {
    it("reports the navigation", () => {
      const { handleNavigate } = renderNav();

      fireEvent.click(screen.getByRole("link", { name: "Edukacja" }));

      expect(handleNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
