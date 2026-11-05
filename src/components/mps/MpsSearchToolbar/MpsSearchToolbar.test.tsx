import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MpsSearchToolbar } from "./MpsSearchToolbar";
import type { MpsSearchToolbarProps } from "./MpsSearchToolbar.types";

const renderToolbar = (props: Partial<MpsSearchToolbarProps> = {}) => {
  const onQueryChange = vi.fn();
  const onSortChange = vi.fn();

  render(
    <I18nProvider i18n={i18n}>
      <MpsSearchToolbar
        query=""
        onQueryChange={onQueryChange}
        sort="surnameAsc"
        onSortChange={onSortChange}
        {...props}
      />
    </I18nProvider>,
  );

  return { onQueryChange, onSortChange };
};

describe("<MpsSearchToolbar />", () => {
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
    renderToolbar({ query: "Warszawa" });

    expect(screen.getByRole("textbox")).toHaveValue("Warszawa");
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
      screen.getByRole("button", { name: "Sortuj posłów: Nazwisko A–Ż" }),
    ).toBeInTheDocument();
  });

  it("shows the descending sort option in the trigger", () => {
    renderToolbar({ sort: "surnameDesc" });

    expect(
      screen.getByRole("button", { name: "Sortuj posłów: Nazwisko Z–A" }),
    ).toBeInTheDocument();
  });

  it("calls onSortChange when another option is chosen", () => {
    const { onSortChange } = renderToolbar({ sort: "surnameAsc" });

    fireEvent.keyDown(screen.getByRole("button", { name: /Sortuj/ }), {
      key: "Enter",
    });
    fireEvent.click(screen.getByText("Nazwisko Z–A"));

    expect(onSortChange).toHaveBeenCalledWith("surnameDesc");
  });
});
