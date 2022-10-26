import { useMemo } from 'react';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import useQueryDateRange from './useQueryDateRange';
import useCompareItems from './useCompareItems';
import client from '@graphql/client';

const useMetricQueryData = () => {
  const queryClient = useQueryClient();
  const { timeStart, timeEnd } = useQueryDateRange();
  const { compareItems } = useCompareItems();
  const queries = useQueries({
    queries: compareItems.map(({ label, level }) => {
      return {
        queryKey: useMetricQuery.getKey({
          label,
          level,
          start: timeStart,
          end: timeEnd,
        }),
        queryFn: useMetricQuery.fetcher(client, {
          label,
          level,
          start: timeStart,
          end: timeEnd,
        }),
      };
    }),
  });

  return useMemo(() => {
    return compareItems.map(({ label, level }) => {
      const variables = { label, level, start: timeStart, end: timeEnd };
      const key = useMetricQuery.getKey(variables);
      const data = queryClient.getQueryData<MetricQuery>(key);
      const loading = queries.some((q) => q.status === 'loading');
      return {
        label,
        level,
        loading: loading,
        result: data,
      };
    });
  }, [queryClient, compareItems, timeStart, timeEnd, queries]);
};

export default useMetricQueryData;
