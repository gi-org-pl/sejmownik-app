import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MpProfileHeader } from "./MpProfileHeader";
import type { MpProfileHeaderProps } from "./MpProfileHeader.types";

const PHOTO_URL = "https://example.com/jan-kowalski.jpg";
const CLUB_HREF = "/kluby/koalicja-obywatelska";

const CURRENT_MP: MpProfileHeaderProps = {
  firstName: "Jan",
  lastName: "Kowalski",
  photoUrl: null,
  clubName: "Koalicja Obywatelska",
  clubHref: CLUB_HREF,
  currentTermNumber: 10,
  terms: [
    { number: 8, roman: "VIII" },
    { number: 9, roman: "IX" },
    { number: 10, roman: "X" },
  ],
};

const renderHeader = (props: Partial<MpProfileHeaderProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <MemoryRouter>
        <MpProfileHeader {...CURRENT_MP} {...props} />
      </MemoryRouter>
    </I18nProvider>,
  );

describe("<MpProfileHeader />", () => {
  describe("given a current MP with three terms", () => {
    it("renders name, club name and three term chips with the current one emphasised", () => {
      renderHeader();

      const heading = screen.getByRole("heading", {
        level: 1,
        name: "Jan Kowalski",
      });
      const photo = screen.getByRole("img", { name: "Jan Kowalski" });

      expect(heading).toHaveClass(
        "text-[32px]",
        "leading-11",
        "font-bold",
        "text-gi-primary",
      );
      expect(photo).toHaveClass("size-32", "bg-white");
      expect(photo).not.toHaveClass("bg-gi-ash");
      expect(photo.querySelector("img")).not.toBeInTheDocument();
      expect(photo).toHaveTextContent("JK");
      expect(photo.parentElement).toHaveClass(
        "flex-col",
        "gap-4",
        "p-4",
        "rounded-4xl",
        "border",
        "border-gi-light-gray-dark",
        "bg-gi-ash",
        "md:flex-row",
        "md:items-center",
        "md:gap-6",
        "md:p-6",
      );
      expect(heading.parentElement).toHaveClass("gap-3");
      const club = screen.getByRole("link", { name: "Koalicja Obywatelska" });

      expect(club).toHaveAttribute("href", CLUB_HREF);
      expect(club).toHaveClass("no-underline", "hover:text-gi-primary-hover");
      expect(club).not.toHaveClass("underline");
      expect(club.parentElement).toHaveClass(
        "text-base",
        "leading-[22px]",
        "font-normal",
        "text-gi-light-primary",
      );

      const items = screen.getAllByRole("listitem");

      expect(items[0]).toHaveAccessibleName("VIII kadencja");
      expect(items[1]).toHaveAccessibleName("IX kadencja");
      expect(items[2]).toHaveAccessibleName("X kadencja, obecna");
      expect(items[2].querySelector("span")).toHaveClass(
        "size-10",
        "bg-gi-light-primary",
        "text-white",
        "font-bold",
      );
      expect(items[0].querySelector("span")).toHaveClass(
        "bg-gi-ash",
        "border-gi-ash",
        "text-gi-light-primary",
      );
      expect(items[0].querySelector("span > span")).toHaveClass(
        "bg-gi-secondary/15",
      );
      expect(items[1]).toHaveClass("-ml-1.5");
      expect(screen.getByText("Kadencje Sejmu")).toHaveClass(
        "order-1",
        "text-base",
        "leading-[22px]",
        "font-normal",
        "text-gi-light-primary",
        "md:order-2",
      );
      expect(screen.queryByText(/były poseł/i)).not.toBeInTheDocument();
    });
  });

  describe("given a very long name", () => {
    it("wraps the name without truncating it", () => {
      const firstName = "Aleksandra Konstantynopolitańczykówna";
      const lastName = "Brzęczyszczykiewicz-Nowakowska";
      const fullName = `${firstName} ${lastName}`;

      renderHeader({ firstName, lastName });

      const heading = screen.getByRole("heading", { level: 1, name: fullName });

      expect(heading).toHaveTextContent(fullName);
      expect(heading).toHaveClass("break-words", "whitespace-normal");
      expect(heading.className).not.toMatch(/truncate|line-clamp/);
      expect(
        screen.getByRole("img", { name: fullName }).parentElement,
      ).toHaveClass("md:items-center");
    });
  });

  describe("given a photo", () => {
    it("renders the photo on the white area", () => {
      renderHeader({ photoUrl: PHOTO_URL });

      const photo = screen.getByRole("img", { name: "Jan Kowalski" });

      expect(photo).toHaveClass("bg-white");
      expect(photo.querySelector("img")).toHaveAttribute("src", PHOTO_URL);
      expect(photo.querySelector("img")).toHaveClass("object-cover");
    });
  });

  describe("given a photo that fails to load", () => {
    it("renders initials on the white area", () => {
      renderHeader({ photoUrl: PHOTO_URL });

      const photo = screen.getByRole("img", { name: "Jan Kowalski" });

      fireEvent.error(photo.querySelector("img") as HTMLImageElement);

      expect(photo.querySelector("img")).not.toBeInTheDocument();
      expect(photo).toHaveTextContent("JK");
      expect(photo).toHaveClass("bg-white");
    });
  });

  describe("given no club", () => {
    it('renders "Brak danych o klubie"', () => {
      renderHeader({ clubName: null, clubHref: null });

      expect(screen.getByText("Brak danych o klubie")).toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  describe("given no terms", () => {
    it('renders "Brak danych o kadencji" in place of the chips', () => {
      renderHeader({ terms: [] });

      expect(screen.queryByText("Kadencje Sejmu")).not.toBeInTheDocument();
      expect(screen.getByText("Brak danych o kadencji")).toBeInTheDocument();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("given a former MP with no current term", () => {
    it("renders no chip as current", () => {
      renderHeader({
        terms: [{ number: 9, roman: "IX" }],
      });

      const chip = screen.getByRole("listitem");

      expect(chip).toHaveAccessibleName("IX kadencja");
      expect(chip.querySelector(".bg-gi-light-primary")).toBeNull();
      expect(screen.queryByText(/obecna/)).not.toBeInTheDocument();
      expect(screen.queryByText(/były poseł/i)).not.toBeInTheDocument();
    });
  });
});
