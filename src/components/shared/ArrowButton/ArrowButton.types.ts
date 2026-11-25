export type ArrowButtonTone = "light" | "dark";

type ArrowButtonBaseProps = {
  tone?: ArrowButtonTone;
};

export type ArrowButtonLinkProps = ArrowButtonBaseProps & {
  href: string;
  label: string;
  onClick?: never;
};

export type ArrowButtonButtonProps = ArrowButtonBaseProps & {
  onClick: () => void;
  label: string;
  href?: never;
};

export type ArrowButtonDecorativeProps = ArrowButtonBaseProps & {
  href?: never;
  onClick?: never;
  label?: string;
};

export type ArrowButtonProps =
  | ArrowButtonLinkProps
  | ArrowButtonButtonProps
  | ArrowButtonDecorativeProps;
