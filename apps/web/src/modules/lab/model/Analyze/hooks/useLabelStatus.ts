import client from '@common/gqlClient';
import { StatusVerifyQuery, useStatusVerifyQuery } from '@oss-compass/graphql';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import useExtractShortIds from '@modules/analyze/hooks/useExtractShortIds';
import { VerifiedLabelItem } from '../context/StatusContext';

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

const useLabelStatus = () => {
  const queryClient = useQueryClient();
  const { shortIds } = useExtractShortIds();

  const queries = useQueries({
    queries: shortIds.map((shortCode) => {
      return {
        queryKey: useStatusVerifyQuery.getKey({ shortCode }),
        queryFn: useStatusVerifyQuery.fetcher(client, { shortCode }),
      };
    }),
  });

  const isLoading = queries.some((query) => query.isLoading);

  const queriesResult = shortIds.map((shortCode) => {
    const key = useStatusVerifyQuery.getKey({ shortCode });
    const data = queryClient.getQueryData<StatusVerifyQuery>(key);
    return { ...data?.analysisStatusVerify };
  });

  // server verified Items
  const verifiedItems = queriesResult
    .filter(nonNullable)
    .filter((item) => Boolean(item?.label)) as VerifiedLabelItem[];

  // single
  if (verifiedItems.length === 1) {
    return {
      isLoading,
      notFound: false,
      verifiedItems,
    };
  }

  //  compare
  if (verifiedItems.length > 1) {
    return {
      isLoading,
      notFound: false,
      verifiedItems,
    };
  }

  // not found
  return { isLoading, verifiedItems: [], notFound: true };
};

export default useLabelStatus;
