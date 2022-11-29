import { useEffect } from 'react';
import client from '@graphql/client';
import { StatusQuery, useStatusQuery } from '@graphql/generated';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import useExtractUrlLabels from './useExtractUrlLabels';
import { setVerifiedLabels } from '../store/verifiedLabels';

const useLabelStatus = () => {
  const queryClient = useQueryClient();
  const { urlLabels } = useExtractUrlLabels();

  const queries = useQueries({
    queries: urlLabels.map(({ label, level }) => {
      return {
        queryKey: useStatusQuery.getKey({ label }),
        queryFn: useStatusQuery.fetcher(client, { label }),
      };
    }),
  });
  const isLoading = queries.some((query) => query.isLoading);
  const queriesResult = urlLabels.map(({ label, level }) => {
    const key = useStatusQuery.getKey({ label });
    const data = queryClient.getQueryData<StatusQuery>(key);
    return { label, level, data };
  });

  // server verified Items
  const verifiedItems = queriesResult
    .map(({ label, level, data }) => ({
      label,
      level,
      status: data?.analysisStatus,
    }))
    .filter(({ status }) => {
      return ['pending', 'progress', 'success'].includes(status || '');
    });

  // store
  useEffect(() => {
    if (!isLoading && verifiedItems.length > 0) {
      setVerifiedLabels(verifiedItems);
    }
  }, [isLoading, verifiedItems]);

  if (verifiedItems.length === 1) {
    return {
      isLoading,
      status: verifiedItems[0].status || '',
      isError: false,
    };
  }

  if (verifiedItems.length > 1) {
    const isSuccess = verifiedItems.every(({ status }) => status === 'success');
    return {
      isLoading,
      status: isSuccess ? 'success' : 'progress',
      isError: false,
    };
  }

  return {
    isError: true,
    isLoading: false,
    status: '',
  };
};

export default useLabelStatus;
