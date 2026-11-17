export type MpVote = "yes" | "no" | "abstain" | "absent";

export type MpVoteBadgeProps = {
  vote: MpVote | null;
  showLabel?: boolean;
};
