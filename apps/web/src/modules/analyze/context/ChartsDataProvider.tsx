import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  createContext,
} from 'react';
import { proxy, useSnapshot } from 'valtio';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import usePageLoadHashScroll from '@common/hooks/usePageLoadHashScroll';
import { QueryStatus, useQueries, useQueryClient } from '@tanstack/react-query';
import {
  MetricQuery,
  SummaryQuery,
  useMetricQuery,
  useSummaryQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Level } from '@modules/analyze/constant';
import { chartUserSettingState } from '@modules/analyze/store';
interface Store {
  loading: boolean;
  items: {
    label: string;
    level: Level;
    status: QueryStatus | undefined;
    result: MetricQuery | undefined;
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
  const snap = useSnapshot(chartUserSettingState);
  const repoType = snap.repoType;
  const queryClient = useQueryClient();
  const { timeStart, timeEnd } = useQueryDateRange();
  const { compareItems } = useCompareItems();

  useQueries({
    queries: compareItems.map(({ label, level }) => {
      const variables = {
        label,
        level,
        start: timeStart,
        end: timeEnd,
        repoType: level === Level.COMMUNITY ? repoType : '',
      };
      return {
        queryKey: useMetricQuery.getKey(variables),
        queryFn: useMetricQuery.fetcher(client, variables),
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
      const variables = {
        label,
        level,
        start: timeStart,
        end: timeEnd,
        repoType: level === Level.COMMUNITY ? repoType : '',
      };
      const key = useMetricQuery.getKey(variables);
      return {
        label,
        level,
        status: queryClient.getQueryState<MetricQuery>(key)?.status,
        result: queryClient.getQueryData<MetricQuery>(key),
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

  // useEffect(() => {
  //   rType = ;
  // }, [snap.repoType]);

  return (
    <ChartsDataContext.Provider value={proxyState}>
      {children}
    </ChartsDataContext.Provider>
  );
};

export default ChartsDataProvider;
