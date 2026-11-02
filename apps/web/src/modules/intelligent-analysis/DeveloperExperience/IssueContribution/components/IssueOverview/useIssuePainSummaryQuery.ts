import { useQuery } from '@tanstack/react-query';
import { fetchIssueOverviewPainSummary } from '../../data';

/** 部署补齐周度快照期间自动重查；就绪后停止轮询。上下两处趋势共用此查询。 */
export const useIssuePainSummaryQuery = (org?: string) =>
  useQuery({
    queryKey: ['issue-overview-v2-pain-summary', org],
    queryFn: ({ signal }) => fetchIssueOverviewPainSummary(org, signal),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchInterval: (data) => (data?.periodsReady === false ? 10000 : false),
  });
