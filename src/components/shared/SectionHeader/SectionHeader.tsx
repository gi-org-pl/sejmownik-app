import { Tooltip } from "@gi-org-pl/athena";
import infoIcon from "@/assets/vectors/info.svg";
import { ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import type { SectionHeaderProps } from "./SectionHeader.types";

export const SectionHeader = ({ title, info }: SectionHeaderProps) => {
  return (
    <div className="flex items-center">
      <p className="m-0 min-w-0 flex-1 rounded-lg border border-gi-ash text-center text-base leading-[30px] font-bold tracking-normal text-gi-primary">
        {title}
      </p>

      {info ? (
        <Tooltip content={info} side="top" className="ml-2 shrink-0">
          <button
            type="button"
            aria-label={info}
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border-0 bg-gi-ash p-0 text-gi-primary"
          >
            <span
              aria-hidden="true"
              className={`${ICON_MASK_CLASS_NAME} h-3 w-[5px] mask-contain`}
              style={getIconMaskStyle(infoIcon)}
            />
          </button>
        </Tooltip>
      ) : null}
    </div>
  );
};
