import { Button } from "@gi-org-pl/athena";
import { Trans, useLingui } from "@lingui/react/macro";
import { Link } from "react-router";
import playIcon from "@/assets/icons/play.svg";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { BUTTON_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import type { EducationQuizCardStartLinkProps } from "./EducationQuizCardStartLink.types";

export const EducationQuizCardStartLink = ({
  href,
  title,
}: EducationQuizCardStartLinkProps) => {
  const { t } = useLingui();

  return (
    <Button
      asChild
      type="primary"
      variant="primary"
      className={`size-12 gap-3 border border-transparent bg-gi-light-primary p-0 text-base leading-none font-bold hover:bg-gi-primary has-[>svg]:px-0 md:-my-0.5 md:h-12.75 md:w-auto md:px-3.75 md:has-[>svg]:px-3.75 ${FOCUS_CLASS_NAME}`}
      RightIcon={
        <span
          className={`${BUTTON_ICON_MASK_CLASS_NAME} h-4 w-3.5 mask-contain`}
          style={getIconMaskStyle(playIcon)}
        />
      }
    >
      <Link to={href} aria-label={t`Rozpocznij quiz: ${title}`}>
        <span className="hidden md:inline">
          <Trans>Rozpocznij</Trans>
        </span>
      </Link>
    </Button>
  );
};
