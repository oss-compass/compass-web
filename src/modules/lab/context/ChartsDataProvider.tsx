import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  createContext,
} from 'react';
import { proxy } from 'valtio';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import usePageLoadHashScroll from '@common/hooks/usePageLoadHashScroll';
import { QueryStatus, useQueries, useQueryClient } from '@tanstack/react-query';
import {
  LabMetricQuery,
  SummaryQuery,
  useLabMetricQuery,
  useSummaryQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Level } from '@modules/analyze/constant';

interface Store {
  loading: boolean;
  items: {
    label: string;
    level: Level;
    status: QueryStatus | undefined;
    result: LabMetricQuery | undefined;
  }[];
  summary: SummaryQuery | null;
}

const defaultVal = {
  loading: false,
  // if it is completely contributed by individuals， hidden organizations section
  items: [],
  summary: null,
};

const dataState = proxy<Store>(defaultVal);
export const ChartsDataContext = createContext<typeof dataState>(dataState);

const ChartsDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const proxyState = useRef(dataState).current;

  const queryClient = useQueryClient();
  const { timeStart, timeEnd } = useQueryDateRange();
  const { compareItems } = useCompareItems();

  useQueries({
    queries: compareItems.map(({ label, level }) => {
      const variables = { label, level, start: timeStart, end: timeEnd };
      return {
        queryKey: useLabMetricQuery.getKey(variables),
        queryFn: useLabMetricQuery.fetcher(client, variables),
      };
    }),
  });

  useSummaryQuery(
    client,
    { start: timeStart, end: timeEnd },
    {
      onSuccess(e) {
        proxyState.summary = e;
      },
    }
  );

  const items = compareItems
    .map(({ label, level }) => {
      const variables = { label, level, start: timeStart, end: timeEnd };
      const key = useLabMetricQuery.getKey(variables);
      return {
        label,
        level,
        status: queryClient.getQueryState<LabMetricQuery>(key)?.status,
        result: queryClient.getQueryData<LabMetricQuery>(key),
      };
    })
    .filter((i) => i.status !== 'error');

  const isLoading = items.some((i) => i.status === 'loading');

  // scroll to url hash element
  usePageLoadHashScroll(isLoading);

  useEffect(() => {
    proxyState.loading = isLoading;
    if (!isLoading) {
      proxyState.items = items;
    }
  }, [isLoading, items, proxyState]);

  return (
    <ChartsDataContext.Provider value={proxyState}>
      {children}
    </ChartsDataContext.Provider>
  );
};

export default ChartsDataProvider;
