import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { MpCardHeader } from "./MpCardHeader";
import type { MpCardHeaderProps } from "./MpCardHeader.types";

const baseProps: MpCardHeaderProps = {
  firstName: "Władysław",
  lastName: "Bartoszewski",
  clubName: "Koalicja Obywatelska",
  photoUrl: null,
};

const renderHeader = (props: Partial<MpCardHeaderProps> = {}) =>
  render(
    <I18nProvider i18n={i18n}>
      <MpCardHeader {...baseProps} {...props} />
    </I18nProvider>,
  );

describe("<MpCardHeader />", () => {
  describe("given a club", () => {
    it("renders the full name and club name", () => {
      renderHeader();

      expect(screen.getByText("Władysław Bartoszewski")).toBeInTheDocument();
      expect(screen.getByText("Koalicja Obywatelska")).toBeInTheDocument();
    });
  });

  describe("given no club", () => {
    it('renders "Brak klubu"', () => {
      renderHeader({ clubName: null });

      expect(screen.getByText("Brak klubu")).toBeInTheDocument();
    });
  });

  describe("given no photo", () => {
    it("renders initials", () => {
      renderHeader();

      expect(screen.getByText("WB")).toBeInTheDocument();
    });
  });
});
