import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { useQueryClient } from '@tanstack/react-query';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import { useDatePickerContext } from '@modules/analyze/context';

const useMetricQueryData = () => {
  const { value } = useDatePickerContext();
  const { startTime, endTime } = value;
  const { compareItems } = useCompareItems();
  const queryClient = useQueryClient();

  return compareItems.map(({ label, level }) => {
    const data = queryClient.getQueryData<MetricQuery>(
      useMetricQuery.getKey({
        label,
        level,
        start: startTime,
        end: endTime,
      })
    );
    const states = queryClient.getQueryState(
      useMetricQuery.getKey({
        label,
        level,
        start: startTime,
        end: endTime,
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
