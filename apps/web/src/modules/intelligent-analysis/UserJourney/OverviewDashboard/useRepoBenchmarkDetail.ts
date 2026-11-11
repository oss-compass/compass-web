import { useQuery } from '@tanstack/react-query';
import { fetchOverviewCards } from '../rawData/apiClient';
import { toRepoProgressRow } from './cardRows';
import type { RepoProgressRow } from './types';

export const useRepoBenchmarkDetail = (
  open: boolean,
  repo: RepoProgressRow | null
) => {
  const query = useQuery({
    queryKey: ['overview-repo-benchmark-detail', repo?.id],
    queryFn: ({ signal }) =>
      fetchOverviewCards({ viewType: 'repo', repo: repo?.id, size: 1 }, signal),
    enabled: open && !!repo?.summaryOnly,
  });
  const card = query.data?.items[0];
  return {
    repo: repo?.summaryOnly && card ? toRepoProgressRow(card) : repo,
    loading: open && !!repo?.summaryOnly && query.isFetching,
    error: query.error instanceof Error ? query.error.message : undefined,
  };
};
