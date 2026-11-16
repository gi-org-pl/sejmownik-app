import { useLingui } from "@lingui/react";
import { ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import {
  getVoteBadgeConfig,
  MP_VOTE_BADGE_TEST_ID,
} from "./MpVoteBadge.constants";
import type { MpVoteBadgeProps } from "./MpVoteBadge.types";

export const MpVoteBadge = ({ vote, showLabel = true }: MpVoteBadgeProps) => {
  const { _ } = useLingui();
  const config = getVoteBadgeConfig(vote);

  return (
    <span
      data-testid={MP_VOTE_BADGE_TEST_ID}
      className="inline-flex items-center gap-2"
    >
      <span
        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${config.circleClassName}`}
        aria-hidden="true"
      >
        {config.iconUrl && config.iconTestId ? (
          <span
            data-testid={config.iconTestId}
            className={`${ICON_MASK_CLASS_NAME} h-3 w-3 mask-contain`}
            style={getIconMaskStyle(config.iconUrl)}
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
