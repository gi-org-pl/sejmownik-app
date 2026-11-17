import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { VoteBadge } from "./VoteBadge";
import { VOTE_BADGE_TEST_ID } from "./VoteBadge.constants";

const renderBadge = (ui: ReactElement) =>
  render(<I18nProvider i18n={i18n}>{ui}</I18nProvider>);

describe("<VoteBadge />", () => {
  describe('given vote "yes"', () => {
    it('renders the "Za" label with the check icon', () => {
      renderBadge(<VoteBadge vote="yes" />);

      expect(screen.getByText("Za")).toBeInTheDocument();
      expect(screen.getByTestId("vote-badge-icon-check")).toBeInTheDocument();
      expect(
        screen.getByTestId(VOTE_BADGE_TEST_ID).querySelector("[aria-hidden]"),
      ).toBeInTheDocument();
    });
  });

  describe('given vote "no"', () => {
    it('renders the "Przeciw" label with the cross icon', () => {
      renderBadge(<VoteBadge vote="no" />);

      expect(screen.getByText("Przeciw")).toBeInTheDocument();
      expect(screen.getByTestId("vote-badge-icon-cross")).toBeInTheDocument();
    });
  });

  describe('given vote "abstain"', () => {
    it('renders the "Wstrzymał się" label', () => {
      renderBadge(<VoteBadge vote="abstain" />);

      expect(screen.getByText("Wstrzymał się")).toBeInTheDocument();
      expect(screen.getByTestId("vote-badge-icon-tilde")).toBeInTheDocument();
    });
  });

  describe('given vote "absent"', () => {
    it('renders the "Nie głosował" label', () => {
      renderBadge(<VoteBadge vote="absent" />);

      expect(screen.getByText("Nie głosował")).toBeInTheDocument();
      expect(screen.getByTestId("vote-badge-icon-minus")).toBeInTheDocument();
    });
  });

  describe("given vote null", () => {
    it('renders "brak danych" and no icon', () => {
      renderBadge(<VoteBadge vote={null} />);

      expect(screen.getByText("brak danych")).toBeInTheDocument();
      expect(
        screen.queryByTestId("vote-badge-icon-check"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("vote-badge-icon-cross"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("vote-badge-icon-tilde"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("vote-badge-icon-minus"),
      ).not.toBeInTheDocument();
      expect(
        screen
          .getByTestId(VOTE_BADGE_TEST_ID)
          .querySelector("[data-testid^='vote-badge-icon-']"),
      ).toBeNull();
    });
  });

  describe("given showLabel is false", () => {
    it("keeps the label as screen-reader text", () => {
      renderBadge(<VoteBadge vote="yes" showLabel={false} />);

      const label = screen.getByText("Za");

      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("sr-only");
      expect(screen.getByTestId("vote-badge-icon-check")).toBeInTheDocument();
    });
  });
});
