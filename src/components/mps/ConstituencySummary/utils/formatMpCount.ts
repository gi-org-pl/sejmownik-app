import { plural } from "@lingui/core/macro";

export const formatMpCount = (count: number) =>
  plural(count, {
    one: "# poseł",
    few: "# posłowie",
    many: "# posłów",
    other: "# posła",
  });
