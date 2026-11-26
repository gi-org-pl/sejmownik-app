import { render, screen } from "@testing-library/react";
import type { MockInstance } from "vitest";
import { BadgeStage } from "./BadgeStage";

const LABEL = "W komisji";
const LONG_LABEL = "W tym tygodniu: II czytanie w Komisji Finansów Publicznych";

describe("<BadgeStage />", () => {
  let warn: MockInstance<typeof console.warn>;

  beforeEach(() => {
    warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
    vi.unstubAllEnvs();
  });

  describe("given a label", () => {
    it("renders the label as text", () => {
      render(<BadgeStage label={LABEL} />);

      expect(screen.getByText(LABEL)).toBeInTheDocument();
      expect(warn).not.toHaveBeenCalled();
    });

    it("renders plain text without a role", () => {
      render(<BadgeStage label={LABEL} />);

      expect(screen.getByText(LABEL)).not.toHaveAttribute("role");
    });
  });

  describe("given a label with a date and a number", () => {
    it("renders it as given", () => {
      render(<BadgeStage label="Głosowanie w Sejmie · 8 października" />);

      expect(
        screen.getByText("Głosowanie w Sejmie · 8 października"),
      ).toBeInTheDocument();
    });
  });

  describe("given an empty label", () => {
    it("renders nothing and warns in development", () => {
      const { container } = render(<BadgeStage label="" />);

      expect(container).toBeEmptyDOMElement();
      expect(warn).toHaveBeenCalledWith(
        "BadgeStage: missing label, nothing is rendered.",
      );
    });

    it("does not warn outside development", () => {
      vi.stubEnv("DEV", false);

      const { container } = render(<BadgeStage label="" />);

      expect(container).toBeEmptyDOMElement();
      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe("given a whitespace-only label", () => {
    it("renders nothing and warns in development", () => {
      const { container } = render(<BadgeStage label="   " />);

      expect(container).toBeEmptyDOMElement();
      expect(warn).toHaveBeenCalledTimes(1);
    });
  });

  describe("given a long label", () => {
    it("keeps the full label in one line and lets the badge grow", () => {
      render(<BadgeStage label={LONG_LABEL} />);

      const badge = screen.getByText(LONG_LABEL);

      expect(badge).toHaveTextContent(LONG_LABEL);
      expect(badge).toHaveClass("w-fit", "whitespace-nowrap");
      expect(badge.className).not.toMatch(/truncate|line-clamp|max-w-/);
    });
  });
});
