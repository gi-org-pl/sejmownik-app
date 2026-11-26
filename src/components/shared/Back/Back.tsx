import { Trans } from "@lingui/react/macro";
import { useEffect } from "react";
import { Link } from "react-router";
import arrowLeftIcon from "@/assets/vectors/arrow-left.svg";
import { FOCUS_CLASS_NAME } from "@/constants/focus";
import { LINK_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import type { BackProps } from "./Back.types";

export const Back = ({ label, href }: BackProps) => {
  const hasHref = href.trim() !== "";
  const hasLabel = label.trim() !== "";

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }
    if (!hasHref) {
      console.warn("Back: missing href, nothing is rendered.");
    } else if (!hasLabel) {
      console.warn("Back: missing label, using the fallback label.");
    }
  }, [hasHref, hasLabel]);

  if (!hasHref) {
    return null;
  }

  return (
    <Link
      to={href}
      className={`group inline-flex max-w-full items-start gap-3 rounded-full text-gi-primary no-underline hover:text-gi-primary-hover ${FOCUS_CLASS_NAME}`}
    >
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gi-ash transition-colors group-hover:bg-gi-ash-hover"
      >
        <span
          className={`${LINK_ICON_MASK_CLASS_NAME} h-3.5 w-[12.25px] mask-contain`}
          style={getIconMaskStyle(arrowLeftIcon)}
        />
      </span>
      <span className="min-w-0 break-words py-[10.5px] text-base leading-[19px] font-bold">
        {hasLabel ? label : <Trans>Wróć</Trans>}
      </span>
    </Link>
  );
};
