import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MpVoteBadge } from "./MpVoteBadge";
import { MP_VOTE_BADGE_TEST_ID } from "./MpVoteBadge.constants";

const renderBadge = (ui: ReactElement) =>
  render(<I18nProvider i18n={i18n}>{ui}</I18nProvider>);

describe("<MpVoteBadge />", () => {
  describe('given vote "yes"', () => {
    it('renders the "Za" label with the check icon', () => {
      renderBadge(<MpVoteBadge vote="yes" />);

      expect(screen.getByText("Za")).toBeInTheDocument();
      expect(screen.getByTestId("mp-vote-badge-icon-check")).toBeInTheDocument();
      expect(
        screen.getByTestId(MP_VOTE_BADGE_TEST_ID).querySelector("[aria-hidden]"),
      ).toBeInTheDocument();
    });
  });

  describe('given vote "no"', () => {
    it('renders the "Przeciw" label with the cross icon', () => {
      renderBadge(<MpVoteBadge vote="no" />);

      expect(screen.getByText("Przeciw")).toBeInTheDocument();
      expect(screen.getByTestId("mp-vote-badge-icon-cross")).toBeInTheDocument();
    });
  });

  describe('given vote "abstain"', () => {
    it('renders the "Wstrzymał się" label', () => {
      renderBadge(<MpVoteBadge vote="abstain" />);

      expect(screen.getByText("Wstrzymał się")).toBeInTheDocument();
      expect(screen.getByTestId("mp-vote-badge-icon-tilde")).toBeInTheDocument();
    });
  });

  describe('given vote "absent"', () => {
    it('renders the "Nie głosował" label', () => {
      renderBadge(<MpVoteBadge vote="absent" />);

      expect(screen.getByText("Nie głosował")).toBeInTheDocument();
      expect(screen.getByTestId("mp-vote-badge-icon-minus")).toBeInTheDocument();
    });
  });

  describe("given vote null", () => {
    it('renders "brak danych" and no icon', () => {
      renderBadge(<MpVoteBadge vote={null} />);

      expect(screen.getByText("brak danych")).toBeInTheDocument();
      expect(screen.queryByTestId("mp-vote-badge-icon-check")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mp-vote-badge-icon-cross")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mp-vote-badge-icon-tilde")).not.toBeInTheDocument();
      expect(screen.queryByTestId("mp-vote-badge-icon-minus")).not.toBeInTheDocument();
      expect(
        screen.getByTestId(MP_VOTE_BADGE_TEST_ID).querySelector("[data-testid^='mp-vote-badge-icon-']"),
      ).toBeNull();
    });
  });

  describe("given showLabel is false", () => {
    it("keeps the label as screen-reader text", () => {
      renderBadge(<MpVoteBadge vote="yes" showLabel={false} />);

      const label = screen.getByText("Za");

      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("sr-only");
      expect(screen.getByTestId("mp-vote-badge-icon-check")).toBeInTheDocument();
    });
  });
});
