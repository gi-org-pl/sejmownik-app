export type SocialPlatform =
  | "facebook"
  | "x"
  | "instagram"
  | "linkedin"
  | "telegram"
  | "github"
  | "youtube";

export interface LinkItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  ariaLabel: string;
}
