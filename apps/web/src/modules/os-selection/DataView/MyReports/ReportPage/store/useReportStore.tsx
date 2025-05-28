import { proxy, useSnapshot } from 'valtio';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';

export const ReportEvent = {
  REFRESH: 'refresh' as const,
};

export type ReportEventType = typeof ReportEvent[keyof typeof ReportEvent];

export const ReportStore = proxy<{
  loading: boolean;
  data: any;
  event$: EventEmitter<ReportEventType> | null;
}>({
  loading: true,
  data: null,
  event$: null,
});

export const setReportData = (res) => {
  ReportStore.data = res;
};

export const setReportLoading = (loading: boolean) => {
  ReportStore.loading = loading;
};
export const useGetReportData = () => {
  const { data, loading } = useSnapshot(ReportStore);
  if (loading) {
    return { count: 0, state: null };
  }
  const {
    state,
    count,
    commentState,
    commentCommitterPermission,
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
    commentQaPermission,
    targetSoftware,
    reason,
    demandSource,
    functionalDescription,
    incubationTime,
    committers,
    isSameTypeCheck,
    sameTypeSoftwareName,
    repoUrl,
    tpcSoftwareSelectionReports,
  } = data || {};
  return {
    state,
    count,
    commentState,
    commentCommitterPermission,
    commentSigLeadPermission,
    commentCompliancePermission,
    commentLegalPermission,
    commentQaPermission,
    targetSoftware,
    reason,
    demandSource,
    functionalDescription,
    incubationTime,
    committers,
    isSameTypeCheck,
    sameTypeSoftwareName,
    repoUrl,
    tpcSoftwareSelectionReports,
  };
};
export const useGetTaskTimelineData = () => {
  const { data, loading } = useSnapshot(ReportStore);
  if (loading) {
    return { state: null };
  }
  const {
    sigLeadCount,
    state,
    riskCount,
    legalCount,
    complianceCount,
    confirmedCount,
    committerCount,
    awaitingClarificationCount,
    awaitingConfirmationCount,
    clarifiedCount,
    userId,
  } = data || {};
  // const baseInfo =
  return {
    sigLeadCount,
    state,
    riskCount,
    legalCount,
    complianceCount,
    confirmedCount,
    committerCount,
    awaitingClarificationCount,
    awaitingConfirmationCount,
    clarifiedCount,
    userId,
  };
};
export const resetReportData = () => {
  ReportStore.loading = false;
  ReportStore.data = null;
};
