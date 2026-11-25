export type PillTabVariant = "active" | "inactive" | "white";

export type PillTabProps = {
  label: string;
  count?: number;
  variant?: PillTabVariant;
  onClick?: () => void;
};
