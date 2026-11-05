import { Trans } from "@lingui/react/macro";
import { TERM_ROMAN_NUMERALS } from "./MpsPageHeader.constants";
import type { MpsPageHeaderProps } from "./MpsPageHeader.types";

const Subtitle = ({ termNumber, mpCount }: MpsPageHeaderProps) => {
  const term = TERM_ROMAN_NUMERALS[termNumber] ?? String(termNumber);
  const hasTerm = Number.isFinite(termNumber);
  const hasCount = Number.isFinite(mpCount);

  if (hasCount && hasTerm) {
    return (
      <Trans>
        {mpCount} posłów {term} kadencji Sejmu. Znajdź swój okręg po
        miejscowości albo posła po nazwisku.
      </Trans>
    );
  }
  if (hasCount) {
    return (
      <Trans>
        {mpCount} posłów Sejmu. Znajdź swój okręg po miejscowości albo posła po
        nazwisku.
      </Trans>
    );
  }
  if (hasTerm) {
    return (
      <Trans>
        Posłowie {term} kadencji Sejmu. Znajdź swój okręg po miejscowości albo
        posła po nazwisku.
      </Trans>
    );
  }
  return (
    <Trans>Znajdź swój okręg po miejscowości albo posła po nazwisku.</Trans>
  );
};

// Figma: Page / Head. Vertical flow, fill width, hug height, 8 px gap.
export const MpsPageHeader = ({ termNumber, mpCount }: MpsPageHeaderProps) => (
  <div className="flex w-full flex-col gap-2">
    <h1 className="font-(family-name:--font-heading) text-[32px] leading-11 font-bold text-gi-primary">
      <Trans>Posłowie</Trans>
    </h1>
    <p className="text-base leading-5.5 text-gi-light-primary">
      <Subtitle termNumber={termNumber} mpCount={mpCount} />
    </p>
  </div>
);
