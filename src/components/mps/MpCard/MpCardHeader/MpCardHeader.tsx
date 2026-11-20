import { Avatar } from "@gi-org-pl/athena";
import { Trans } from "@lingui/react/macro";
import type { MpCardHeaderProps } from "./MpCardHeader.types";

export const MpCardHeader = ({
  firstName,
  lastName,
  clubName,
  photoUrl,
}: MpCardHeaderProps) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar
        src={photoUrl ?? undefined}
        name={fullName}
        fallback="initials"
        size="large"
        aria-hidden="true"
        className="size-16 shrink-0 bg-white text-xl"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-lg leading-[21px] font-bold break-words text-gi-light-primary">
          {fullName}
        </span>
        <span className="text-sm leading-4 font-normal text-gi-dark-gray">
          {clubName ?? <Trans>Brak klubu</Trans>}
        </span>
      </div>
    </div>
  );
};
