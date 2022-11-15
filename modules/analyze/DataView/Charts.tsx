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
import OrganizationsActivity from './OrganizationsActivity';
import useHashScroll from '@common/hooks/useHashScroll';
import TopicTitle from '@modules/analyze/Misc/TopicTitle';
import { Topic } from '@modules/analyze/Misc/SideBar/config';

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

      <TopicTitle id={Topic.Productivity}>Productivity</TopicTitle>
      <CodeQuality />
      <CommunityServiceSupport />

      <TopicTitle id={Topic.Robustness}>Robustness</TopicTitle>
      <CommunityActivity />

      <TopicTitle id={Topic.NicheCreation}>Niche Creation</TopicTitle>
      <OrganizationsActivity />
    </>
  );
};

export default Charts;
