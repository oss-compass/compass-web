import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  createContext,
} from 'react';
import { proxy } from 'valtio';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import useHashScroll from '@common/hooks/useHashScroll';
import { QueryStatus, useQueries, useQueryClient } from '@tanstack/react-query';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import { Level } from '@modules/analyze/constant';

interface Store {
  loading: boolean;
  showOrganizations: boolean;
  items: {
    label: string;
    level: Level;
    status: QueryStatus | undefined;
    result: MetricQuery | undefined;
  }[];
}

const defaultVal = {
  loading: false,
  // if it is completely contributed by individuals， hidden organizations section
  showOrganizations: false,
  items: [],
};

const dataState = proxy<Store>(defaultVal);
export const ChartsDataContext = createContext<typeof dataState>(dataState);

const toggleShowOrganizations = (bool: boolean) => {
  dataState.showOrganizations = bool;
};

const ChartsDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const state = useRef(dataState).current;

  const queryClient = useQueryClient();
  const { timeStart, timeEnd } = useQueryDateRange();
  const { compareItems } = useCompareItems();
  useHashScroll();

  useQueries({
    queries: compareItems.map(({ label, level }) => {
      const variables = { label, level, start: timeStart, end: timeEnd };
      return {
        queryKey: useMetricQuery.getKey(variables),
        queryFn: useMetricQuery.fetcher(client, variables),
      };
    }),
  });

  const items = compareItems
    .map(({ label, level }) => {
      const variables = { label, level, start: timeStart, end: timeEnd };
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
  const hasOrganizations = items.some((i) => {
    const metricGroupActivity = i.result?.metricGroupActivity;
    if (Array.isArray(metricGroupActivity)) {
      return metricGroupActivity.length > 0;
    }
    return false;
  });

  useEffect(() => {
    state.loading = isLoading;
    if (!isLoading) {
      state.items = items;
      toggleShowOrganizations(hasOrganizations);
    }
  }, [isLoading, items, hasOrganizations, state]);

  return (
    <ChartsDataContext.Provider value={state}>
      {children}
    </ChartsDataContext.Provider>
  );
};

export default ChartsDataProvider;
