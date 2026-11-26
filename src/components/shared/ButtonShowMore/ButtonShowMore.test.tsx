import { fireEvent, render, screen } from "@testing-library/react";
import type { MockInstance } from "vitest";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { ButtonShowMore } from "./ButtonShowMore";
import type { ButtonShowMoreProps } from "./ButtonShowMore.types";

const LABEL = "Starsze głosowania";

const renderButton = (props: Partial<ButtonShowMoreProps> = {}) =>
  render(<ButtonShowMore label={LABEL} onClick={() => undefined} {...props} />);

describe("<ButtonShowMore />", () => {
  let warn: MockInstance<typeof console.warn>;

  beforeEach(() => {
    warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
    vi.unstubAllEnvs();
  });

  describe("given a label", () => {
    it("renders a button named by the label", () => {
      renderButton();

      expect(screen.getByRole("button", { name: LABEL })).toBeInTheDocument();
      expect(warn).not.toHaveBeenCalled();
    });

    it("renders the chevron by default", () => {
      renderButton();

      expect(
        screen.getByTestId("button-show-more-chevron"),
      ).toBeInTheDocument();
    });

    it("hides the chevron from assistive technology", () => {
      renderButton();

      expect(screen.getByTestId("button-show-more-chevron")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("shows a visible keyboard focus outline", () => {
      renderButton();

      expect(screen.getByRole("button")).toHaveClass(FOCUS_CLASS_NAME);
    });

    it("overrides Athena's one-line, fixed-height, medium-weight defaults", () => {
      renderButton();

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-auto", "font-bold", "whitespace-normal");
      expect(button).not.toHaveClass(
        "h-10",
        "font-medium",
        "whitespace-nowrap",
      );
    });

    it("places the chevron after the label", () => {
      renderButton();

      const chevron = screen.getByTestId("button-show-more-chevron");
      expect(chevron.previousSibling).toHaveTextContent(LABEL);
    });
  });

  describe("given showIcon false", () => {
    it("renders no chevron", () => {
      renderButton({ showIcon: false });

      expect(
        screen.queryByTestId("button-show-more-chevron"),
      ).not.toBeInTheDocument();
    });
  });

  describe("when clicked", () => {
    it("calls onClick once", () => {
      const onClick = vi.fn();
      renderButton({ onClick });

      fireEvent.click(screen.getByRole("button"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not pass the click event to the parent", () => {
      const onClick = vi.fn();
      renderButton({ onClick });

      fireEvent.click(screen.getByRole("button"));

      expect(onClick).toHaveBeenCalledWith();
    });
  });

  describe("given disabled", () => {
    it("uses the native disabled attribute", () => {
      renderButton({ disabled: true });

      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not call onClick", () => {
      const onClick = vi.fn();
      renderButton({ onClick, disabled: true });

      fireEvent.click(screen.getByRole("button"));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("given an empty label", () => {
    it("renders nothing and warns in development", () => {
      const { container } = renderButton({ label: "" });

      expect(container).toBeEmptyDOMElement();
      expect(warn).toHaveBeenCalledTimes(1);
    });

    it("treats a whitespace-only label as empty", () => {
      const { container } = renderButton({ label: "   " });

      expect(container).toBeEmptyDOMElement();
    });

    it("does not warn outside development", () => {
      vi.stubEnv("DEV", false);
      renderButton({ label: "" });

      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe("given a long label", () => {
    it("keeps the full label in the DOM", () => {
      const longLabel = "Pokaż kolejne głosowania ".repeat(8).trim();
      renderButton({ label: longLabel });

      const button = screen.getByRole("button", { name: longLabel });
      expect(button).toHaveTextContent(longLabel);
    });

    it("can shrink inside a flex parent so the label wraps", () => {
      renderButton();

      expect(screen.getByRole("button")).toHaveClass("max-w-full");
    });
  });
});
