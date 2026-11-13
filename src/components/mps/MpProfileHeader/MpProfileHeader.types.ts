export type MpProfileHeaderProps = {
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  clubName: string | null;
  clubHref: string | null;
  currentTermNumber: number;
  terms: { number: number; roman: string }[];
};

export type MpProfileTermsProps = {
  terms: MpProfileHeaderProps["terms"];
  currentTermNumber: number;
};
