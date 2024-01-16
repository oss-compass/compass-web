import client from '@common/gqlClient';
import { useVerifyDetailDataRangeQuery } from '@oss-compass/graphql';
import useExtractShortIds from './useExtractShortIds';

const useVerifyDetailRange = () => {
  const { shortIds } = useExtractShortIds();

  const { data, isLoading } = useVerifyDetailDataRangeQuery(
    client,
    {
      shortCode: shortIds[0],
    },
    {
      staleTime: 300000, // 5 minutes
    }
  );

  return { isLoading, data };
};

export default useVerifyDetailRange;
