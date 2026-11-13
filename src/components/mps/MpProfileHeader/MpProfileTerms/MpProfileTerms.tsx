import { Trans, useLingui } from "@lingui/react/macro";
import type { MpProfileTermsProps } from "../MpProfileHeader.types";

const PAST_CHIP_CLASS_NAME =
  "border-gi-ash bg-gi-ash text-gi-light-primary";

const CURRENT_CHIP_CLASS_NAME =
  "border-gi-light-primary bg-gi-light-primary text-white";

export const MpProfileTerms = ({
  terms,
  currentTermNumber,
}: MpProfileTermsProps) => {
  const { t } = useLingui();

  if (terms.length === 0) {
    return (
      <p className="m-0 break-words text-base leading-[22px] font-normal text-gi-light-primary">
        <Trans>Brak danych o kadencji</Trans>
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
      <span className="order-1 text-base leading-[22px] font-normal text-gi-light-primary md:order-2">
        <Trans>Kadencje Sejmu</Trans>
      </span>
      <ul className="order-2 m-0 flex list-none p-0 md:order-1">
        {terms.map((term, index) => {
          const isCurrent = term.number === currentTermNumber;
          const label = isCurrent
            ? t`${term.roman} kadencja, obecna`
            : t`${term.roman} kadencja`;

          return (
            <li
              key={term.number}
              aria-label={label}
              className={`relative ${index > 0 ? "-ml-1.5" : ""} ${isCurrent ? "z-10" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`relative flex size-10 items-center justify-center rounded-full border-2 text-sm leading-none font-bold ${
                  isCurrent ? CURRENT_CHIP_CLASS_NAME : PAST_CHIP_CLASS_NAME
                }`}
              >
                {isCurrent ? null : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-gi-secondary/15"
                  />
                )}
                <span className="relative translate-y-px">{term.roman}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
