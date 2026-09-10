import client from '@common/gqlClient';
import { useStatusVerifyQuery } from '@oss-compass/graphql';
import { useQueries } from '@tanstack/react-query';
import useExtractShortIds from './useExtractShortIds';
import { ConfigValue, VerifiedLabelItem } from '@modules/analyze/context';

// This endpoint reports project status, not independent insight-stage readiness.
// See docs/insight-analysis-states.md for the backend contract.
const activeStatuses = ['pending', 'progress'];
const knownStatuses = [...activeStatuses, 'success', 'error', 'canceled'];

const useLabelStatus = (): ConfigValue => {
  const { shortIds } = useExtractShortIds();
  const queries = useQueries({
    queries: shortIds.map((shortCode) => ({
      queryKey: useStatusVerifyQuery.getKey({ shortCode }),
      queryFn: useStatusVerifyQuery.fetcher(client, { shortCode }),
      keepPreviousData: false,
      staleTime: 5000,
      refetchInterval: (data, query) =>
        query.state.status !== 'error' &&
        activeStatuses.includes(data?.analysisStatusVerify.status || '')
          ? 5000
          : false,
    })),
  });

  const items = queries.map((query) => query.data?.analysisStatusVerify);
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const verifiedItems = items.filter(
    (item) => item?.label && knownStatuses.includes(item.status || '')
  ) as VerifiedLabelItem[];
  const notFound =
    shortIds.length === 0 ||
    items.some((item) => !item?.label || item.status === 'unsubmit');
  // Unknown task states must not become an endless "under analysis" screen.
  const failed = items.some(
    (item) =>
      item?.label &&
      item.status !== 'unsubmit' &&
      ![...activeStatuses, 'success'].includes(item.status || '')
  );
  const status = failed
    ? 'error'
    : items.some((item) => item?.status === 'progress')
    ? 'progress'
    : items.some((item) => item?.status === 'pending')
    ? 'pending'
    : !notFound && items.every((item) => item?.status === 'success')
    ? 'success'
    : '';

  return {
    isLoading,
    isError,
    status,
    notFound,
    verifiedItems,
    refetch: () => {
      queries.forEach((query) => void query.refetch());
    },
  };
};

export default useLabelStatus;
