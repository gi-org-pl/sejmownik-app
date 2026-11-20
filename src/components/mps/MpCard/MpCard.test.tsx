import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { MpCard } from "./MpCard";
import type { MpCardProps } from "./MpCard.types";

const baseProps: MpCardProps = {
  id: 7,
  firstName: "Władysław",
  lastName: "Bartoszewski",
  clubName: "Koalicja Obywatelska",
  photoUrl: null,
  participationPercent: 98,
  interpellations: { count: 117, median: 30.5, q1: 5, q3: 80, scaleMax: 200 },
};

const renderCard = (props: Partial<MpCardProps> = {}) => {
  const router = createMemoryRouter(
    [
      { path: "/", element: <MpCard {...baseProps} {...props} /> },
      { path: "/poslowie/:id", element: <p>Profil posła</p> },
    ],
    { initialEntries: ["/"] },
  );

  return render(
    <I18nProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
};

describe("<MpCard />", () => {
  describe("given a full MP record", () => {
    it("renders name, club and both metric rows", () => {
      renderCard();

      expect(screen.getByText("Władysław Bartoszewski")).toBeInTheDocument();
      expect(screen.getByText("Koalicja Obywatelska")).toBeInTheDocument();
      expect(screen.getByText("Głosowania")).toBeInTheDocument();
      expect(screen.getByText("98%")).toBeInTheDocument();
      expect(screen.getByText("Interpelacje")).toBeInTheDocument();
      expect(screen.getByText("117")).toBeInTheDocument();
      expect(
        screen.getByRole("link", {
          name: "Władysław Bartoszewski, Koalicja Obywatelska",
        }),
      ).toHaveAttribute("href", "/poslowie/7");
    });
  });

  describe("given a very long name", () => {
    it("wraps the name without truncating it", () => {
      renderCard({
        firstName: "Władysław Kazimierz",
        lastName: "Bartoszewski-Kowalczykiewicz",
      });

      const name = screen.getByText(
        "Władysław Kazimierz Bartoszewski-Kowalczykiewicz",
      );

      expect(name).toHaveClass("break-words");
      expect(name).not.toHaveClass("truncate");
    });
  });

  describe("given no club", () => {
    it('renders "Brak klubu"', () => {
      renderCard({ clubName: null });

      expect(screen.getByText("Brak klubu")).toBeInTheDocument();
      expect(
        screen.getByRole("link", {
          name: "Władysław Bartoszewski, Brak klubu",
        }),
      ).toBeInTheDocument();
    });
  });

  describe("given no photo", () => {
    it("renders initials in the avatar", () => {
      const { container } = renderCard({ photoUrl: null });

      expect(container.querySelector("img")).not.toBeInTheDocument();
      expect(screen.getByText("WB")).toBeInTheDocument();
    });
  });

  describe("when the card is activated", () => {
    it("navigates to the MP profile route", () => {
      renderCard();

      fireEvent.click(screen.getByRole("link"));

      expect(screen.getByText("Profil posła")).toBeInTheDocument();
    });
  });
});
