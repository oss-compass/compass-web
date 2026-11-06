import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRepoTeams } from '../../../IssueContribution/data';

export const useCiRepoTeams = () => {
  const query = useQuery({
    queryKey: ['overview-repo-teams', 'with-category-v1'],
    queryFn: ({ signal }) => fetchRepoTeams(signal),
    staleTime: 5 * 60 * 1000,
  });
  const repoInfo = React.useMemo(
    () =>
      Object.fromEntries(
        (query.data?.items ?? []).map((item) => [
          item.repoShort.replace(/_/g, '-'),
          item,
        ])
      ),
    [query.data]
  );
  return { ...query, repoInfo };
};
