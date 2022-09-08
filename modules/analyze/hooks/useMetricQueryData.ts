import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { useQueryClient } from '@tanstack/react-query';
import { MetricQuery, useMetricQuery } from '@graphql/generated';

const useMetricQueryData = () => {
  const { urls } = useCompareItems();
  const queryClient = useQueryClient();

  return urls.map((url) => {
    const data = queryClient.getQueryData<MetricQuery>(
      useMetricQuery.getKey({ url })
    );
    return { url, result: data };
  });
};
export default useMetricQueryData;
