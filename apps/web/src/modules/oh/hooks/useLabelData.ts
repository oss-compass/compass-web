import client from '@common/gqlClient';
import { useMemo } from 'react';
import {
  TpcSoftwareSelectionReportQuery,
  useTpcSoftwareSelectionReportQuery,
} from '@oss-compass/graphql';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { VerifiedLabelItem } from '@modules/analyze/context';
import { compareIdsSplit } from '@common/utils/links';
function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

const useExtractShortIds = () => {
  const shortIds = useMemo(() => {
    const url = new URL(window.location.href.replace('#', ''));
    const projectId = url.searchParams.get('projectId');
    return compareIdsSplit(projectId);
  }, [window.location.href]);
  return { shortIds };
};

const useLabelData = () => {
  const queryClient = useQueryClient();
  const { shortIds } = useExtractShortIds();

  // const queries = useQueries({
  //   queries: shortIds.map((shortCode) => {
  //     return {
  //       queryKey: useTpcSoftwareSelectionReportQuery.getKey({ shortCode }),
  //       queryFn: useTpcSoftwareSelectionReportQuery.fetcher(client, {
  //         shortCode,
  //       }),
  //     };
  //   }),
  // });

  // const isLoading = queries.some((query) => query.isLoading);

  // const queriesResult = shortIds.map((shortCode) => {
  //   const key = useTpcSoftwareSelectionReportQuery.getKey({ shortCode });
  //   const data = queryClient.getQueryData<TpcSoftwareSelectionReportQuery>(key);
  //   return { ...data?.tpcSoftwareSelectionReport };
  // });

  // // server verified Items
  // const reportItems = queriesResult.filter(nonNullable);
  // // .filter((item) => Boolean(item?.label));
  // // .filter((item) => {
  // //   return ['pending', 'progress', 'success'].includes(item?.status || '');
  // // }) as VerifiedLabelItem[];

  // // single
  // if (reportItems.length === 1) {
  //   return {
  //     isLoading,
  //     status: reportItems[0]?.tpcSoftwareReportMetric?.status || '',
  //     notFound: false,
  //     reportItems,
  //   };
  // }

  // //  compare
  // if (reportItems.length > 1) {
  //   const isSuccess = reportItems.every(
  //     ({ tpcSoftwareReportMetric }) =>
  //       tpcSoftwareReportMetric?.status === 'success'
  //   );
  //   return {
  //     isLoading,
  //     status: isSuccess ? 'success' : 'progress',
  //     notFound: false,
  //     reportItems,
  //   };
  // }

  const reportItems = shortIds.map((shortCode) => {
    return { shortCode };
  });
  return { reportItems: reportItems };
};

export default useLabelData;
