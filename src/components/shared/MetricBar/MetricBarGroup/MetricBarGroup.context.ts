import { createContext, useContext } from "react";

export const MetricBarGroupContext = createContext(false);

export const useIsInMetricBarGroup = () => useContext(MetricBarGroupContext);
