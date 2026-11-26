export type ButtonShowMoreProps = {
  /** Already translated by the parent, e.g. "Pokaż 16 kolejnych". Empty renders nothing. */
  label: string;
  /** Called without arguments. */
  onClick: () => void;
  /** Chevron after the label. Default true. */
  showIcon?: boolean;
  disabled?: boolean;
};
