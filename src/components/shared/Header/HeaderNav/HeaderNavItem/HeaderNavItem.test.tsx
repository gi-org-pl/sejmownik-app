import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { LINK_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import type { HeaderNavEntry } from "../HeaderNav.types";
import { HeaderNavItem } from "./HeaderNavItem";

const ENTRY: HeaderNavEntry = {
  key: "education",
  label: "Edukacja",
  path: "/edukacja",
  icon: "education-icon.svg",
  iconClassName: "h-4 w-5",
};

const EXTERNAL_ENTRY: HeaderNavEntry = {
  ...ENTRY,
  key: "external",
  label: "Zewnętrzne",
  path: "https://example.com",
  external: true,
};

const renderItem = (
  props: Partial<React.ComponentProps<typeof HeaderNavItem>> = {},
) => {
  const handleNavigate = vi.fn();

  render(
    <MemoryRouter>
      <HeaderNavItem
        entry={ENTRY}
        isActive={false}
        onNavigate={handleNavigate}
        {...props}
      />
    </MemoryRouter>,
  );

  return { handleNavigate };
};

describe("<HeaderNavItem />", () => {
  describe("given an entry of the app", () => {
    it("renders a link to its path, named by its label", () => {
      renderItem();

      expect(screen.getByRole("link", { name: "Edukacja" })).toHaveAttribute(
        "href",
        "/edukacja",
      );
    });

    it("opens it in the same tab", () => {
      renderItem();

      const link = screen.getByRole("link", { name: "Edukacja" });

      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("keeps the icon out of the name of the link", () => {
      renderItem();

      expect(screen.getByRole("link")).toHaveAccessibleName("Edukacja");
    });

    it("draws the icon of the entry as a mask", () => {
      renderItem();

      const icon = screen.getByRole("link").querySelector("span");

      expect(icon?.style.maskImage).toBe('url("education-icon.svg")');
    });

    it("draws the icon in the shared way that survives forced colours", () => {
      renderItem();

      expect(screen.getByRole("link").querySelector("span")).toHaveClass(
        ...LINK_ICON_MASK_CLASS_NAME.split(" "),
      );
    });

    it("shows keyboard focus as the shared outline", () => {
      renderItem();

      expect(screen.getByRole("link", { name: "Edukacja" })).toHaveClass(
        ...FOCUS_CLASS_NAME.split(" "),
      );
    });
  });

  describe("given an entry that is not the current page", () => {
    it("does not mark the link as current", () => {
      renderItem({ isActive: false });

      expect(
        screen.getByRole("link", { name: "Edukacja" }),
      ).not.toHaveAttribute("aria-current");
    });
  });

  describe("given the entry of the current page", () => {
    it("marks the link as the current page", () => {
      renderItem({ isActive: true });

      expect(
        screen.getByRole("link", { name: "Edukacja", current: "page" }),
      ).toBeInTheDocument();
    });
  });

  describe("given an entry that leads outside the app", () => {
    it("opens it in a new tab without access to the opener", () => {
      renderItem({ entry: EXTERNAL_ENTRY });

      const link = screen.getByRole("link", { name: "Zewnętrzne" });

      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("when the link is clicked", () => {
    it("reports the navigation", () => {
      const { handleNavigate } = renderItem();

      fireEvent.click(screen.getByRole("link", { name: "Edukacja" }));

      expect(handleNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
