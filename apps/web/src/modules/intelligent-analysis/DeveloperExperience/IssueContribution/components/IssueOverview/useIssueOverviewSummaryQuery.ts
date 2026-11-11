import { useQuery } from '@tanstack/react-query';
import { fetchIssueOverviewSummary } from '../../data';

export const useIssueOverviewSummaryQuery = (org?: string, enabled = true) =>
  useQuery({
    queryKey: ['issue-overview-v2-summary', org],
    queryFn: ({ signal }) => fetchIssueOverviewSummary(org, signal),
    staleTime: 15_000,
    enabled,
  });
