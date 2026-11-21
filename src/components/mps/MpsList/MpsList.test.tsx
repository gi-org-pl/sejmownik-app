import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { MpCardProps } from "@/components/mps/MpCard/MpCard.types";
import { MpsList } from "./MpsList";
import type { MpsListProps } from "./MpsList.types";

const createMp = (id: number): MpCardProps => ({
  id,
  firstName: "Poseł",
  lastName: `Numer${id}`,
  clubName: "Koalicja Obywatelska",
  photoUrl: null,
  participationPercent: 90,
  interpellations: { count: 10, median: 10, q1: 5, q3: 15, scaleMax: 100 },
});

const createMps = (count: number) =>
  Array.from({ length: count }, (_, index) => createMp(index + 1));

const renderList = (props: Partial<MpsListProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <MemoryRouter>
        <MpsList mps={createMps(20)} emptyReason="noMps" {...props} />
      </MemoryRouter>
    </I18nProvider>,
  );

describe("<MpsList />", () => {
  describe("given 20 MPs", () => {
    it('renders 12 cards and the "Pokaż wszystkich (20)" button', () => {
      renderList();

      const list = screen.getByRole("list", { name: "20 posłów" });

      expect(within(list).getAllByRole("listitem")).toHaveLength(12);
      expect(
        screen.getByRole("button", { name: "Pokaż wszystkich (20)" }),
      ).toBeInTheDocument();
    });
  });

  describe("when the button is clicked", () => {
    it("renders all 20 cards and hides the button", () => {
      renderList();

      fireEvent.click(
        screen.getByRole("button", { name: "Pokaż wszystkich (20)" }),
      );

      expect(screen.getAllByRole("listitem")).toHaveLength(20);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("moves focus to the first newly revealed card", () => {
      renderList();

      fireEvent.click(
        screen.getByRole("button", { name: "Pokaż wszystkich (20)" }),
      );

      expect(screen.getByRole("link", { name: /Numer13/ })).toHaveFocus();
    });
  });

  describe("given the list changes after expanding", () => {
    it("goes back to 12 cards and shows the button again", () => {
      const { rerender } = renderList();

      fireEvent.click(
        screen.getByRole("button", { name: "Pokaż wszystkich (20)" }),
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(20);

      rerender(
        <I18nProvider i18n={i18n}>
          <MemoryRouter>
            <MpsList mps={createMps(20).reverse()} emptyReason="noMps" />
          </MemoryRouter>
        </I18nProvider>,
      );

      expect(screen.getAllByRole("listitem")).toHaveLength(12);
      expect(
        screen.getByRole("button", { name: "Pokaż wszystkich (20)" }),
      ).toBeInTheDocument();
    });
  });

  describe("given 12 MPs", () => {
    it("renders no button", () => {
      renderList({ mps: createMps(12) });

      expect(screen.getAllByRole("listitem")).toHaveLength(12);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("given 6 MPs", () => {
    it("renders 6 cards, no button and a plural count", () => {
      renderList({ mps: createMps(6) });

      expect(screen.getAllByRole("listitem")).toHaveLength(6);
      expect(screen.getByRole("list", { name: "6 posłów" })).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("given a custom initialVisibleCount", () => {
    it("shows only that many cards first", () => {
      renderList({ initialVisibleCount: 4 });

      expect(screen.getAllByRole("listitem")).toHaveLength(4);
    });
  });

  describe("given no MPs and noMatch", () => {
    it("renders the no-match message with the query", () => {
      renderList({ mps: [], emptyReason: "noMatch", query: "Kowalski" });

      expect(
        screen.getByText("Nie znaleziono posłów dla „Kowalski”"),
      ).toBeInTheDocument();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("renders a message without the query when none is given", () => {
      renderList({ mps: [], emptyReason: "noMatch" });

      expect(screen.getByText("Nie znaleziono posłów")).toBeInTheDocument();
    });
  });

  describe("given no MPs and noMps", () => {
    it('renders "Brak danych o posłach"', () => {
      renderList({ mps: [], emptyReason: "noMps" });

      expect(screen.getByText("Brak danych o posłach")).toBeInTheDocument();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("given duplicate MP ids", () => {
    it("renders both entries and logs a development warning", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

      renderList({ mps: [createMp(1), createMp(1), createMp(2)] });

      expect(screen.getAllByRole("listitem")).toHaveLength(3);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("1"));

      warn.mockRestore();
    });
  });
});
