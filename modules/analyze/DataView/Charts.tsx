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
import useHashScroll from '@common/hooks/useHashScroll';

const Charts = () => {
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
