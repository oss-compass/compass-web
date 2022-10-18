import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import useHashScroll from '@common/hooks/useHashScroll';
import useCompareItems from '../hooks/useCompareItems';
import Trend from '../Trend';
import CodeQuality from '../CodeQuality';
import CommunitySupport from '../CommunitySupport';
import CommunityActivity from '../CommunityActivity';
import useQueryDateRange from '../hooks/useQueryDateRange';

const DataView = () => {
  const { timeStart, timeEnd } = useQueryDateRange();

  const { compareItems } = useCompareItems();
  useQueries({
    queries: compareItems.map(({ label, level }) => {
      return {
        queryKey: useMetricQuery.getKey({
          label,
          level,
          start: timeStart,
          end: timeEnd,
        }),
        queryFn: useMetricQuery.fetcher(client, {
          label,
          level,
          start: timeStart,
          end: timeEnd,
        }),
      };
    }),
  });

  useHashScroll(50);

  return (
    <>
      <Trend />
      <CodeQuality />
      <CommunitySupport />
      <CommunityActivity />
    </>
  );
};

export default DataView;
