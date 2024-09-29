import { proxy, useSnapshot } from 'valtio';

export const riskEvent = {
  REFRESH: 'refresh' as const,
};

export type RiskEventType = typeof riskEvent[keyof typeof riskEvent];

export const RiskStore = proxy<{
  loading: boolean;
  data: any;
  event$: any;
}>({
  loading: true,
  data: {},
  event$: {},
});

export const setRiskData = (shortCode, res) => {
  RiskStore.data = { ...RiskStore.data, [shortCode]: res };
};

export const setRiskLoading = (loading: boolean) => {
  RiskStore.loading = loading;
};
export const useGetRisk = (shortCode, key) => {
  const { data, loading } = useSnapshot(RiskStore);
  if (loading) {
    return { count: 0, state: null };
  }
  const report = data[shortCode];
  const count = report?.metricClarificationCount[key];
  const metricState = report?.metricClarificationState[key];
  return { count, metricState };
};
export const useGetAllRisk = (shortCode) => {
  const { data, loading } = useSnapshot(RiskStore);
  if (loading) {
    return { count: 0, state: null };
  }
  const report = data[shortCode];
  const metricClarificationState = report?.metricClarificationState;
  return { metricClarificationState };
};
export const resetRiskStore = () => {
  RiskStore.data = {};
  RiskStore.event$ = {};
};
// export const resetRiskData = () => {
//   RiskStore.loading = false;
// };
