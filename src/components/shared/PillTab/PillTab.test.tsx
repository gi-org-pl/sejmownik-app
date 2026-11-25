import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { PillTab } from "./PillTab";

describe("<PillTab />", () => {
  describe("given variant active with onClick", () => {
    it("renders a button with aria-pressed true", () => {
      render(<PillTab label="Wszystkie" variant="active" onClick={vi.fn()} />);

      expect(screen.getByRole("button", { name: "Wszystkie" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });
  });

  describe("given variant inactive with onClick", () => {
    it("renders a button with aria-pressed false", () => {
      render(<PillTab label="Wszystkie" onClick={vi.fn()} />);

      expect(screen.getByRole("button", { name: "Wszystkie" })).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });
  });

  describe("given variant white with onClick", () => {
    it("renders a button without aria-pressed", () => {
      render(<PillTab label="Druk 123" variant="white" onClick={vi.fn()} />);

      expect(
        screen.getByRole("button", { name: "Druk 123" }),
      ).not.toHaveAttribute("aria-pressed");
    });
  });

  describe("given no onClick", () => {
    it("renders a non-interactive element that is not focusable", () => {
      render(<PillTab label="Projekt rządowy" variant="white" />);

      const pill = screen.getByText("Projekt rządowy").parentElement;

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(pill).not.toHaveAttribute("tabindex");
      expect(pill).not.toHaveClass("cursor-pointer");
    });
  });

  describe("when the user clicks an interactive pill", () => {
    it("calls onClick once", () => {
      const onClick = vi.fn();
      render(<PillTab label="Wszystkie" onClick={onClick} />);

      fireEvent.click(screen.getByRole("button"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("given a count", () => {
    it("renders the counter after the label", () => {
      render(<PillTab label="Wszystkie" count={20} onClick={vi.fn()} />);

      expect(
        screen.getByRole("button", { name: "Wszystkie, 20" }),
      ).toHaveTextContent("Wszystkie, 20");
    });

    it("groups thousands with a space", () => {
      render(<PillTab label="Wszystkie" count={1234} />);

      expect(screen.getByText(/^1\s234$/)).toBeInTheDocument();
    });

    it("renders 0", () => {
      render(<PillTab label="Wszystkie" count={0} />);

      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("renders a negative count as given", () => {
      render(<PillTab label="Wszystkie" count={-3} />);

      expect(screen.getByText("-3")).toBeInTheDocument();
    });

    it.each([
      "active",
      "inactive",
      "white",
    ] as const)("renders the counter for the %s variant", (variant) => {
      render(<PillTab label="Wszystkie" count={5} variant={variant} />);

      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  describe("given no count", () => {
    it("renders no counter", () => {
      render(<PillTab label="Wszystkie" />);

      expect(
        screen.getByText("Wszystkie").parentElement?.children,
      ).toHaveLength(1);
    });
  });

  describe("given a long label", () => {
    it("keeps the full label in the DOM", () => {
      const label = "Komisja Polityki Społecznej i Rodziny";
      render(<PillTab label={label} variant="white" />);

      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  describe("given an empty label", () => {
    it("renders nothing", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { container } = render(<PillTab label="" />);

      expect(container).toBeEmptyDOMElement();
      expect(warn).toHaveBeenCalledTimes(1);
      warn.mockRestore();
    });
  });
});
