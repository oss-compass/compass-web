import { useQueryClient } from '@tanstack/react-query';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import useQueryDateRange from './useQueryDateRange';
import useCompareItems from './useCompareItems';

const useMetricQueryData = () => {
  const { timeStart, timeEnd } = useQueryDateRange();
  const { compareItems } = useCompareItems();
  const queryClient = useQueryClient();

  return compareItems.map(({ label, level }) => {
    const data = queryClient.getQueryData<MetricQuery>(
      useMetricQuery.getKey({
        label,
        level,
        start: timeStart,
        end: timeEnd,
      })
    );
    const states = queryClient.getQueryState(
      useMetricQuery.getKey({
        label,
        level,
        start: timeStart,
        end: timeEnd,
      })
    );

    return {
      label,
      level,
      loading: states?.status === 'loading',
      result: data,
    };
  });
};
export default useMetricQueryData;
