import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '../hooks/useCompareItems';
import useQueryDateRange from '../hooks/useQueryDateRange';
import Trend from './Trend';
import CodeQuality from './CodeQuality';
import CommunityServiceSupport from './CommunityServiceSupport';
import CommunityActivity from './CommunityActivity';

const Charts = () => {
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

  return (
    <>
      <Trend />
      <CodeQuality />
      <CommunityServiceSupport />
      <CommunityActivity />
    </>
  );
};

export default Charts;
