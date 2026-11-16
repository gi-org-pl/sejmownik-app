import { useLingui } from "@lingui/react";
import type { CSSProperties } from "react";
import { ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import {
  getVoteBadgeConfig,
  MP_VOTE_BADGE_TEST_ID,
} from "./MpVoteBadge.constants";
import type { MpVoteBadgeProps } from "./MpVoteBadge.types";

const getVoteIconStyle = (
  iconUrl: string,
  iconMaskSize: string,
): CSSProperties => ({
  ...getIconMaskStyle(iconUrl),
  maskSize: iconMaskSize,
  WebkitMaskSize: iconMaskSize,
});

export const MpVoteBadge = ({ vote, showLabel = true }: MpVoteBadgeProps) => {
  const { _ } = useLingui();
  const config = getVoteBadgeConfig(vote);

  return (
    <span
      data-testid={MP_VOTE_BADGE_TEST_ID}
      className="inline-flex items-center gap-2"
    >
      <span
        className={`relative size-6 shrink-0 rounded-full ${config.circleClassName}`}
        aria-hidden="true"
      >
        {config.iconUrl && config.iconMaskSize && config.iconTestId ? (
          <span
            data-testid={config.iconTestId}
            className={`${ICON_MASK_CLASS_NAME} absolute inset-0 mask-center mask-no-repeat`}
            style={getVoteIconStyle(config.iconUrl, config.iconMaskSize)}
          />
        ) : null}
      </span>
      <span
        className={
          showLabel ? "text-base leading-5 text-gi-primary" : "sr-only"
        }
      >
        {_(config.label)}
      </span>
    </span>
  );
};
