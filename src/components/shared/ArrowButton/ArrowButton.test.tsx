import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import { ArrowButton } from "./ArrowButton";
import type { ArrowButtonProps } from "./ArrowButton.types";

const renderArrow = (props: ArrowButtonProps) =>
  render(
    <MemoryRouter>
      <ArrowButton {...props} />
    </MemoryRouter>,
  );

describe("<ArrowButton />", () => {
  describe("given href and label", () => {
    it("renders a link named by the label", () => {
      renderArrow({ href: "/ustawy/1", label: "Zobacz ustawę" });

      expect(
        screen.getByRole("link", { name: "Zobacz ustawę" }),
      ).toHaveAttribute("href", "/ustawy/1");
    });

    it("renders an external href as a plain anchor", () => {
      renderArrow({ href: "https://www.sejm.gov.pl", label: "Sejm" });

      expect(screen.getByRole("link", { name: "Sejm" })).toHaveAttribute(
        "href",
        "https://www.sejm.gov.pl",
      );
    });
  });

  describe("given onClick and label", () => {
    it("renders a button named by the label", () => {
      renderArrow({ onClick: vi.fn(), label: "Otwórz" });

      expect(
        screen.getByRole("button", { name: "Otwórz" }),
      ).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
      const onClick = vi.fn();
      renderArrow({ onClick, label: "Otwórz" });

      fireEvent.click(screen.getByRole("button", { name: "Otwórz" }));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("given neither href nor onClick", () => {
    it("renders a decorative element hidden from assistive technology", () => {
      const { container } = renderArrow({});

      expect(container.firstElementChild).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("is not focusable", () => {
      const { container } = renderArrow({});

      expect(container.firstElementChild).not.toHaveAttribute("tabindex");
      expect(container.querySelector("a, button")).toBeNull();
    });
  });

  describe("given an interactive arrow without a label", () => {
    it("falls back to the decorative mode", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { container } = renderArrow({
        href: "/ustawy",
      } as unknown as ArrowButtonProps);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(container.firstElementChild).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(warn).toHaveBeenCalledTimes(1);
      warn.mockRestore();
    });
  });

  describe("given a tone", () => {
    it("applies the light look by default", () => {
      renderArrow({ href: "/a", label: "Dalej" });

      expect(screen.getByRole("link")).toHaveClass("text-gi-primary");
    });

    it("applies the dark look when tone is dark", () => {
      renderArrow({ href: "/a", label: "Dalej", tone: "dark" });

      expect(screen.getByRole("link")).toHaveClass(
        "bg-gi-primary",
        "text-white",
      );
    });
  });
});
