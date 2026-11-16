import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import { MpsPageHeader } from "./MpsPageHeader";
import type { MpsPageHeaderProps } from "./MpsPageHeader.types";

const HINT = "Znajdź swój okręg po miejscowości albo posła po nazwisku.";

const renderHeader = (props: MpsPageHeaderProps) =>
  render(
    <I18nProvider i18n={i18n}>
      <MpsPageHeader {...props} />
    </I18nProvider>,
  );

describe("<MpsPageHeader />", () => {
  describe("given term 10 and 460 MPs", () => {
    it('renders the "Posłowie" heading and the subtitle with count and term', () => {
      renderHeader({ termNumber: 10, mpCount: 460 });

      expect(
        screen.getByRole("heading", { level: 1, name: "Posłowie" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`460 posłów X kadencji Sejmu. ${HINT}`),
      ).toBeInTheDocument();
    });
  });

  describe("given mpCount is 0", () => {
    it("renders the subtitle with 0 without hiding it", () => {
      renderHeader({ termNumber: 10, mpCount: 0 });

      expect(
        screen.getByText(`0 posłów X kadencji Sejmu. ${HINT}`),
      ).toBeInTheDocument();
    });
  });

  describe("given an unknown term number", () => {
    it('renders the term as "{n} kadencji"', () => {
      renderHeader({ termNumber: 99, mpCount: 460 });

      expect(
        screen.getByText(`460 posłów 99 kadencji Sejmu. ${HINT}`),
      ).toBeInTheDocument();
    });
  });

  describe("given missing data", () => {
    it("renders the subtitle without the count when it is missing", () => {
      renderHeader({ termNumber: 10, mpCount: Number.NaN });

      expect(
        screen.getByText(`Posłowie X kadencji Sejmu. ${HINT}`),
      ).toBeInTheDocument();
    });

    it("renders the subtitle without the term when it is missing", () => {
      renderHeader({ termNumber: Number.NaN, mpCount: 460 });

      expect(screen.getByText(`460 posłów Sejmu. ${HINT}`)).toBeInTheDocument();
    });

    it("renders only the hint when both are missing", () => {
      renderHeader({ termNumber: Number.NaN, mpCount: Number.NaN });

      expect(screen.getByText(HINT)).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 1, name: "Posłowie" }),
      ).toBeInTheDocument();
    });
  });
});
