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
    count,
    commentState,
    commentCommitterPermission,
    commentSigLeadPermission,
  } = data || {};

  return {
    count,
    commentState,
    commentCommitterPermission,
    commentSigLeadPermission,
  };
};
