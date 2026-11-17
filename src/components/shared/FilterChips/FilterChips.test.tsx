import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { FilterChips } from "./FilterChips";
import type { FilterChipsOption, FilterChipsProps } from "./FilterChips.types";

const OPTIONS: FilterChipsOption[] = [
  { id: "KO", label: "KO", count: 9 },
  { id: "PiS", label: "PiS", count: 3 },
  { id: "Lewica", label: "Lewica", count: 2 },
];

const renderFilter = (props: Partial<FilterChipsProps> = {}) => {
  const onSelect = vi.fn();

  render(
    <I18nProvider i18n={i18n}>
      <FilterChips
        label="Filtruj według klubu"
        options={OPTIONS}
        totalCount={14}
        selectedId={null}
        onSelect={onSelect}
        {...props}
      />
    </I18nProvider>,
  );

  return { onSelect };
};

describe("<FilterChips />", () => {
  describe("given nothing is selected", () => {
    it("shows Wszystkie as active with the total", () => {
      renderFilter();

      const all = screen.getByRole("button", { name: "Wszystkie 14" });

      expect(all).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByRole("button", { name: "KO 9" })).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("groups the chips under an accessible label", () => {
      renderFilter();

      expect(
        screen.getByRole("group", { name: "Filtruj według klubu" }),
      ).toBeInTheDocument();
    });
  });

  describe("given a club is selected", () => {
    it("marks only that club as active", () => {
      renderFilter({ selectedId: "PiS" });

      expect(screen.getByRole("button", { name: "PiS 3" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      expect(
        screen.getByRole("button", { name: "Wszystkie 14" }),
      ).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("when a club chip is clicked", () => {
    it("calls onSelect with that club id", () => {
      const { onSelect } = renderFilter();

      fireEvent.click(screen.getByRole("button", { name: "KO 9" }));

      expect(onSelect).toHaveBeenCalledWith("KO");
    });
  });

  describe("when Wszystkie is clicked", () => {
    it("calls onSelect with null", () => {
      const { onSelect } = renderFilter({ selectedId: "KO" });

      fireEvent.click(screen.getByRole("button", { name: "Wszystkie 14" }));

      expect(onSelect).toHaveBeenCalledWith(null);
    });
  });

  describe("given an option with count 0", () => {
    it("does not render that chip", () => {
      renderFilter({
        options: [...OPTIONS, { id: "Razem", label: "Razem", count: 0 }],
      });

      expect(screen.queryByText("Razem")).not.toBeInTheDocument();
    });
  });

  describe("given a selectedId that is not in options", () => {
    it("treats Wszystkie as active", () => {
      renderFilter({ selectedId: "unknown" });

      expect(
        screen.getByRole("button", { name: "Wszystkie 14" }),
      ).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("given empty options", () => {
    it("shows only Wszystkie 0", () => {
      renderFilter({ options: [], totalCount: 0 });

      expect(screen.getAllByRole("button")).toHaveLength(1);
      expect(
        screen.getByRole("button", { name: "Wszystkie 0" }),
      ).toBeInTheDocument();
    });
  });
});
