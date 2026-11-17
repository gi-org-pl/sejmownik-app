import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { SearchToolbar } from "./SearchToolbar";
import type {
  SearchToolbarProps,
  SearchToolbarSortOption,
} from "./SearchToolbar.types";

type SortOption = "surnameAsc" | "surnameDesc";

const SORT_OPTIONS: ReadonlyArray<SearchToolbarSortOption<SortOption>> = [
  { value: "surnameAsc", label: "Nazwisko A–Ż" },
  { value: "surnameDesc", label: "Nazwisko Ż–A" },
];

const renderToolbar = (props: Partial<SearchToolbarProps<SortOption>> = {}) => {
  const onQueryChange = vi.fn();
  const onSortChange = vi.fn();

  render(
    <I18nProvider i18n={i18n}>
      <SearchToolbar
        query=""
        onQueryChange={onQueryChange}
        searchLabel="Szukaj posła lub okręgu"
        searchPlaceholder="Miejscowość lub nazwisko posła"
        sortOptions={SORT_OPTIONS}
        sort="surnameAsc"
        onSortChange={onSortChange}
        {...props}
      />
    </I18nProvider>,
  );

  return { onQueryChange, onSortChange };
};

describe("<SearchToolbar />", () => {
  it("renders the search input with placeholder", () => {
    renderToolbar();

    expect(
      screen.getByPlaceholderText("Miejscowość lub nazwisko posła"),
    ).toBeInTheDocument();
  });

  it("gives the search input an accessible name", () => {
    renderToolbar();

    expect(
      screen.getByRole("textbox", { name: "Szukaj posła lub okręgu" }),
    ).toBeInTheDocument();
  });

  it("shows the current query value", () => {
    renderToolbar({ query: "Kowalski" });

    expect(screen.getByRole("textbox")).toHaveValue("Kowalski");
  });

  it("calls onQueryChange when typing", () => {
    const { onQueryChange } = renderToolbar();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Kraków" },
    });

    expect(onQueryChange).toHaveBeenCalledWith("Kraków");
  });

  it("shows the ascending sort option in the trigger", () => {
    renderToolbar({ sort: "surnameAsc" });

    expect(
      screen.getByRole("button", { name: "Sortuj: Nazwisko A–Ż" }),
    ).toBeInTheDocument();
  });

  it("shows the descending sort option in the trigger", () => {
    renderToolbar({ sort: "surnameDesc" });

    expect(
      screen.getByRole("button", { name: "Sortuj: Nazwisko Ż–A" }),
    ).toBeInTheDocument();
  });

  it("pads the sort trigger 16px on the sides and 12px top and bottom", () => {
    renderToolbar();

    const trigger = screen.getByRole("button", { name: /Sortuj/ });

    expect(trigger).toHaveClass("h-auto", "px-4", "py-3");
    expect(trigger).not.toHaveClass("px-3", "py-2", "h-10");
  });

  it("calls onSortChange when another option is chosen", () => {
    const { onSortChange } = renderToolbar({ sort: "surnameAsc" });

    fireEvent.keyDown(screen.getByRole("button", { name: /Sortuj/ }), {
      key: "Enter",
    });
    fireEvent.click(screen.getByText("Nazwisko Ż–A"));

    expect(onSortChange).toHaveBeenCalledWith("surnameDesc");
  });
});
