import client from '@common/gqlClient';
import { useVerifyDetailDataRangeQuery } from '@oss-compass/graphql';
import useExtractShortIds from './useExtractShortIds';
import { RangeTag, rangeTags, timeRange } from '@modules/developer/constant';

const useVerifyDetailRangeQuery = () => {
  const { shortIds } = useExtractShortIds();
  const beginDate = timeRange['1Y'].start;
  const endDate = timeRange['1Y'].end;

  const { data, isLoading } = useVerifyDetailDataRangeQuery(
    client,
    {
      shortCode: shortIds[0],
      beginDate,
      endDate,
    },
    {
      staleTime: 300000, // 5 minutes
    }
  );

  return { isLoading, data };
};

export default useVerifyDetailRangeQuery;
