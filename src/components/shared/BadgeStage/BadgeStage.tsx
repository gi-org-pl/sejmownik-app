import { useEffect } from "react";
import type { BadgeStageProps } from "./BadgeStage.types";

export const BadgeStage = ({ label }: BadgeStageProps) => {
  const hasLabel = label.trim() !== "";

  useEffect(() => {
    if (!import.meta.env.DEV || hasLabel) {
      return;
    }
    console.warn("BadgeStage: missing label, nothing is rendered.");
  }, [hasLabel]);

  if (!hasLabel) {
    return null;
  }

  return (
    <p className="w-fit rounded-tl-3xl rounded-br-xl bg-gi-primary px-4 py-3 text-sm leading-4 font-bold whitespace-nowrap text-white">
      {label}
    </p>
  );
};
