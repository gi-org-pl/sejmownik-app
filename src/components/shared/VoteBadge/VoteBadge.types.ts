export type Vote = "yes" | "no" | "abstain" | "absent";

export type VoteBadgeProps = {
  vote: Vote | null;
  showLabel?: boolean;
};
