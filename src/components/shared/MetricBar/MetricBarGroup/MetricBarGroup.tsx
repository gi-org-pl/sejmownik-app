import { METRIC_ROW_COLUMNS_CLASS } from "../MetricBar.constants";
import { MetricBarGroupContext } from "./MetricBarGroup.context";
import type { MetricBarGroupProps } from "./MetricBarGroup.types";

export const MetricBarGroup = ({ children }: MetricBarGroupProps) => (
  <MetricBarGroupContext.Provider value={true}>
    <div className={`grid gap-x-2 gap-y-2 ${METRIC_ROW_COLUMNS_CLASS}`}>
      {children}
    </div>
  </MetricBarGroupContext.Provider>
);
