import React, { useState } from 'react';
import { Alert, Pagination, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import {
  fetchOverviewCards,
  fetchOverviewScoreInsights,
} from '../rawData/apiClient';
import { toRepoProgressRow } from './cardRows';
import type { RepoProgressRow } from './types';

export type CardQueryParams = Parameters<typeof fetchOverviewCards>[0];
export type RemoteCards = {
  params: CardQueryParams;
  page: number;
  total: number;
  error?: string;
  severityFilters: string[];
  onSeverityChange: (values: string[]) => void;
  onPageChange: (page: number) => void;
  onProgressSortChange: (key: string, order: 'asc' | 'desc') => void;
};

const PagedTeamRepos: React.FC<{
  params: CardQueryParams;
  team: string;
  renderRows: (rows: RepoProgressRow[]) => React.ReactNode;
}> = ({ params, team, renderRows }) => {
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useQuery({
    queryKey: ['overview-team-repo-summaries-v2', params, team, page],
    queryFn: ({ signal }) =>
      fetchOverviewCards({ ...params, viewType: 'repo', team, page }, signal),
    keepPreviousData: true,
  });
  const { data: insights } = useQuery({
    queryKey: ['overview-score-insights', params.org],
    queryFn: () => fetchOverviewScoreInsights({ org: params.org }),
  });
  if (error)
    return (
      <Alert
        type="error"
        message={error instanceof Error ? error.message : String(error)}
      />
    );
  return (
    <Spin spinning={isFetching}>
      {renderRows(
        (data?.items ?? []).map((card) =>
          toRepoProgressRow(
            card,
            insights?.repos.find((repo) => repo.id === card.id)?.scoreHistory
          )
        )
      )}
      <Pagination
        current={page}
        pageSize={params.size ?? 20}
        total={data?.total ?? 0}
        showSizeChanger={false}
        hideOnSinglePage
        onChange={setPage}
      />
    </Spin>
  );
};
export default PagedTeamRepos;
