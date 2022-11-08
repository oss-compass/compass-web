import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '../hooks/useCompareItems';
import useQueryDateRange from '../hooks/useQueryDateRange';
import Trend from './Trend';
import OverView from './OverView';
import CodeQuality from './CodeQuality';
import CommunityServiceSupport from './CommunityServiceSupport';
import CommunityActivity from './CommunityActivity';
import useHashScroll from '@common/hooks/useHashScroll';
import Topic from '@common/components/Topic';
import { Topic as TopicID } from '@modules/analyze/Misc/SideBar/config';

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
      <Topic id={TopicID.Overview} paddingTop>
        OverView
      </Topic>
      <OverView />

      <Topic id={TopicID.Productivity}>Productivity</Topic>
      <CodeQuality />
      <CommunityServiceSupport />

      <Topic id={TopicID.Robustness}>Robustness</Topic>
      <CommunityActivity />

      {/*<Topic id={TopicID.NicheCreation}>Niche Creation</Topic>*/}
    </>
  );
};

export default Charts;
