import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { PATHS } from "@/constants/paths";
import { FooterLeft } from "./FooterLeft";

describe("<FooterLeft />", () => {
  describe("given any year", () => {
    it("renders the myPolitics logo with its name", () => {
      render(<FooterLeft />);

      expect(screen.getByRole("img", { name: "myPolitics" })).toHaveAttribute(
        "src",
      );
    });

    it("renders both logos at the smallest heights their brand books allow", () => {
      render(<FooterLeft />);

      expect(screen.getByRole("img", { name: "myPolitics" })).toHaveClass(
        "h-6",
      );
      expect(
        screen.getByRole("img", { name: "Generacja Innowacja" }),
      ).toHaveClass("h-5");
    });

    it("renders the Generacja Innowacja logo as a link named after it", () => {
      render(<FooterLeft />);

      expect(
        screen.getByRole("link", { name: "Generacja Innowacja" }),
      ).toHaveAttribute("href", PATHS.generacjaInnowacja);
    });

    it("opens the Generacja Innowacja site in a new tab without access to the opener", () => {
      render(<FooterLeft />);

      const link = screen.getByRole("link", { name: "Generacja Innowacja" });

      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("shows keyboard focus on the link as the shared outline", () => {
      render(<FooterLeft />);

      expect(
        screen.getByRole("link", { name: "Generacja Innowacja" }),
      ).toHaveClass(...FOCUS_CLASS_NAME.split(" "));
    });
  });

  describe("given the year 2031", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2031-06-15T12:00:00"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("renders the copyright sign with that year", () => {
      render(<FooterLeft />);

      expect(screen.getByText("© 2031")).toBeInTheDocument();
    });
  });
});
