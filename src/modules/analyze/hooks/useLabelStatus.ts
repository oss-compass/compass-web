import { useEffect } from 'react';
import client from '@graphql/client';
import { StatusVerifyQuery, useStatusVerifyQuery } from '@graphql/generated';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import useExtractShortId from './useExtractShortId';
import { setVerifiedLabels, VerifiedLabelItem } from '@modules/analyze/store';

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

const useLabelStatus = () => {
  const queryClient = useQueryClient();
  const { shortIds } = useExtractShortId();

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
    .filter((item) => Boolean(item?.label))
    .filter((item) => {
      return ['pending', 'progress', 'success'].includes(item?.status || '');
    }) as VerifiedLabelItem[];

  // store
  useEffect(() => {
    if (!isLoading && verifiedItems.length > 0) {
      setVerifiedLabels(verifiedItems);
    }
  }, [isLoading, verifiedItems]);

  // single
  if (verifiedItems.length === 1) {
    return {
      isLoading,
      status: verifiedItems[0].status || '',
      notFound: false,
    };
  }

  //  compare
  if (verifiedItems.length > 1) {
    const isSuccess = verifiedItems.every(({ status }) => status === 'success');
    return {
      isLoading,
      status: isSuccess ? 'success' : 'progress',
      notFound: false,
    };
  }

  // not found
  return { isLoading, status: '', notFound: true };
};

export default useLabelStatus;
