import { Avatar } from "@gi-org-pl/athena";
import { Trans } from "@lingui/react/macro";
import { Link } from "react-router";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import type { MpProfileHeaderProps } from "./MpProfileHeader.types";
import { MpProfileTerms } from "./MpProfileTerms/MpProfileTerms";

export const MpProfileHeader = ({
  firstName,
  lastName,
  photoUrl,
  clubName,
  clubHref,
  currentTermNumber,
  terms,
}: MpProfileHeaderProps) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <header className="flex w-full min-w-0 flex-col gap-4 rounded-4xl border border-gi-light-gray-dark bg-gi-ash p-4 md:flex-row md:items-center md:gap-6 md:p-6">
      <Avatar
        src={photoUrl ?? undefined}
        name={fullName}
        alt={fullName}
        fallback="initials"
        size="large"
        aria-label={fullName}
        className="size-32 bg-white text-3xl"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h1 className="m-0 break-words whitespace-normal text-[32px] leading-11 font-bold text-gi-primary">
          {fullName}
        </h1>
        <p className="m-0 break-words text-base leading-[22px] font-normal text-gi-light-primary">
          {clubName !== null && clubHref !== null ? (
            <Link
              to={clubHref}
              className={`no-underline hover:text-gi-primary-hover ${FOCUS_CLASS_NAME}`}
            >
              {clubName}
            </Link>
          ) : (
            (clubName ?? <Trans>Brak danych o klubie</Trans>)
          )}
        </p>
        <MpProfileTerms terms={terms} currentTermNumber={currentTermNumber} />
      </div>
    </header>
  );
};
