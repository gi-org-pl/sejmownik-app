export type SocialPlatform =
  | "facebook"
  | "x"
  | "instagram"
  | "linkedin"
  | "telegram"
  | "github"
  | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  icon: string;
  ariaLabel: string;
}
