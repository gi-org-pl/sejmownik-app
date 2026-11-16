import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import voteAbsentIcon from "@/assets/vectors/vote-absent.svg";
import voteAbstainIcon from "@/assets/vectors/vote-abstain.svg";
import voteCheckIcon from "@/assets/vectors/vote-check.svg";
import voteCrossIcon from "@/assets/vectors/vote-cross.svg";
import type { MpVote } from "./MpVoteBadge.types";

export const MP_VOTE_BADGE_TEST_ID = "mp-vote-badge";

export type MpVoteBadgeConfig = {
  iconUrl: string | null;
  label: MessageDescriptor;
  circleClassName: string;
  iconMaskSize: string | null;
  iconTestId: string | null;
};

export const NULL_VOTE_BADGE: MpVoteBadgeConfig = {
  iconUrl: null,
  label: msg({ id: "mps.vote-badge.null", message: "brak danych" }),
  circleClassName: "border border-gi-gray bg-transparent text-gi-gray",
  iconMaskSize: null,
  iconTestId: null,
};

export const VOTE_BADGE_BY_VOTE: Record<MpVote, MpVoteBadgeConfig> = {
  yes: {
    iconUrl: voteCheckIcon,
    label: msg({ id: "mps.vote-badge.yes", message: "Za" }),
    circleClassName: "border border-transparent bg-gi-green text-white",
    iconMaskSize: "12px 12px",
    iconTestId: "mp-vote-badge-icon-check",
  },
  no: {
    iconUrl: voteCrossIcon,
    label: msg({ id: "mps.vote-badge.no", message: "Przeciw" }),
    circleClassName: "border border-transparent bg-gi-red text-white",
    iconMaskSize: "12px 12px",
    iconTestId: "mp-vote-badge-icon-cross",
  },
  abstain: {
    iconUrl: voteAbstainIcon,
    label: msg({ id: "mps.vote-badge.abstain", message: "Wstrzymał się" }),
    circleClassName: "border border-transparent bg-gi-ash text-gi-dark-gray",
    iconMaskSize: "8px 4px",
    iconTestId: "mp-vote-badge-icon-tilde",
  },
  absent: {
    iconUrl: voteAbsentIcon,
    label: msg({ id: "mps.vote-badge.absent", message: "Nie głosował" }),
    circleClassName:
      "border border-gi-dark-gray bg-transparent text-gi-dark-gray",
    iconMaskSize: "8px 2px",
    iconTestId: "mp-vote-badge-icon-minus",
  },
};

export const getVoteBadgeConfig = (vote: MpVote | null): MpVoteBadgeConfig =>
  vote === null ? NULL_VOTE_BADGE : VOTE_BADGE_BY_VOTE[vote];
