import { useQueryClient, useIsFetching } from '@tanstack/react-query';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import useQueryDateRange from './useQueryDateRange';
import useCompareItems from './useCompareItems';

const useMetricQueryData = () => {
  const queryClient = useQueryClient();
  const { timeStart, timeEnd } = useQueryDateRange();
  const { compareItems } = useCompareItems();

  // todo: it causes multiple updates
  useIsFetching({ queryKey: ['metric'] });

  return compareItems.map(({ label, level }) => {
    const variables = { label, level, start: timeStart, end: timeEnd };
    const key = useMetricQuery.getKey(variables);
    const data = queryClient.getQueryData<MetricQuery>(key);
    const state = queryClient.getQueryState<MetricQuery>(key);
    return {
      label,
      level,
      loading: state?.status === 'loading',
      result: data,
    };
  });
};

export default useMetricQueryData;
