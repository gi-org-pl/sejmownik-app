import { useEffect } from "react";
import linkIcon from "@/assets/vectors/link.svg";
import { SectionHeader } from "@/components/shared/SectionHeader/SectionHeader";
import { LINK_ICON_MASK_CLASS_NAME } from "@/constants/icon";
import { getIconMaskStyle } from "@/utils/style/getIconMaskStyle";
import type { DefinitionListProps } from "./DefinitionList.types";

const warnDuplicateKeys = (keys: string[]) => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const key of keys) {
    if (seen.has(key)) {
      duplicates.add(key);
    }
    seen.add(key);
  }

  if (duplicates.size > 0) {
    console.warn(
      `DefinitionList: duplicate item key(s): ${[...duplicates].join(", ")}. Falling back to index for React keys.`,
    );
  }
};

export const DefinitionList = ({
  title,
  items,
  emptyMessage,
  info,
  source,
}: DefinitionListProps) => {
  useEffect(() => {
    warnDuplicateKeys(items.map((item) => item.key));
  }, [items]);

  const seenKeys = new Set<string>();

  return (
    <div className="flex w-full flex-col gap-4">
      <section className="flex w-full flex-col gap-4 rounded-2xl border border-gi-ash bg-background p-4">
        <SectionHeader title={title} info={info} />

        {items.length === 0 ? (
          emptyMessage ? (
            <p className="m-0 text-sm leading-5 font-normal text-gi-dark-gray">
              {emptyMessage}
            </p>
          ) : null
        ) : (
          <dl className="m-0 flex flex-col gap-4">
            {items.map((item, index) => {
              const isDuplicate = seenKeys.has(item.key);
              seenKeys.add(item.key);
              const reactKey = isDuplicate ? String(index) : item.key;

              return (
                <div key={reactKey} className="flex flex-col gap-0.5">
                  <dt className="text-base leading-5 font-bold text-gi-primary">
                    {item.term}
                  </dt>
                  {item.description !== null ? (
                    <dd className="m-0 text-sm leading-5 font-normal text-gi-dark-gray">
                      {item.description}
                    </dd>
                  ) : null}
                </div>
              );
            })}
          </dl>
        )}
      </section>

      {source ? (
        <div className="flex items-center gap-2 text-sm leading-5 font-normal text-gi-dark-gray">
          <span
            aria-hidden="true"
            className={`${LINK_ICON_MASK_CLASS_NAME} h-3 w-4 mask-contain`}
            style={getIconMaskStyle(linkIcon)}
          />
          {source.href ? (
            <a href={source.href} className="text-inherit no-underline">
              {source.label}
            </a>
          ) : (
            <span>{source.label}</span>
          )}
        </div>
      ) : null}
    </div>
  );
};
