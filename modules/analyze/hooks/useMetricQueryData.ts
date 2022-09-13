import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { useQueryClient } from '@tanstack/react-query';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import { useDatePickerContext } from '@modules/analyze/context';

const useMetricQueryData = () => {
  const { value } = useDatePickerContext();
  const { startTime, endTime } = value;
  const { urls } = useCompareItems();
  const queryClient = useQueryClient();

  return urls.map((url) => {
    const data = queryClient.getQueryData<MetricQuery>(
      useMetricQuery.getKey({ url, start: startTime, end: endTime })
    );
    const states = queryClient.getQueryState(
      useMetricQuery.getKey({ url, start: startTime, end: endTime })
    );
    return {
      url,
      loading: states?.status === 'loading',
      result: data,
    };
  });
};
export default useMetricQueryData;
