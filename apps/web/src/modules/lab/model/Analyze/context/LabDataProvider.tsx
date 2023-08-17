import React, { PropsWithChildren, createContext } from 'react';
import { useRouter } from 'next/router';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import {
  useLabModelVersionReportDetailQuery,
  LabModelVersionReportDetailQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Level } from '@common/constant';
import useVerifiedItems from '../hooks/useVerifiedItems';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';

interface Store {
  loading: boolean;
  items: {
    label: string;
    level: Level;
    result: LabModelVersionReportDetailQuery;
  }[];
}

const defaultVal = {
  loading: false,
  items: [],
};

export const ChartsDataContext = createContext<Store>(defaultVal);

const LabDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

  const queryClient = useQueryClient();
  const { compareItems } = useVerifiedItems();
  const { timeStart, timeEnd } = useQueryDateRange();

  useQueries({
    queries: compareItems.map(({ shortCode }) => {
      const variables = {
        modelId,
        versionId,
        shortCode,
        start: timeStart,
        end: timeEnd,
      };
      return {
        queryKey: useLabModelVersionReportDetailQuery.getKey(variables),
        queryFn: useLabModelVersionReportDetailQuery.fetcher(client, variables),
      };
    }),
  });

  const items = compareItems
    .map(({ label, level, shortCode }) => {
      const variables = {
        modelId,
        versionId,
        shortCode,
        start: timeStart,
        end: timeEnd,
      };
      const key = useLabModelVersionReportDetailQuery.getKey(variables);
      return {
        label,
        level,
        status:
          queryClient.getQueryState<LabModelVersionReportDetailQuery>(key)
            ?.status,
        result: queryClient.getQueryData<LabModelVersionReportDetailQuery>(key),
      };
    })
    .filter((i) => i.status !== 'error');

  const isLoading = items.some((i) => i.status === 'loading');
  const value = { loading: isLoading, items };

  return (
    <ChartsDataContext.Provider value={value}>
      {children}
    </ChartsDataContext.Provider>
  );
};

export default LabDataProvider;
