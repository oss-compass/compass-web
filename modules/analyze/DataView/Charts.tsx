import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '../hooks/useCompareItems';
import useQueryDateRange from '../hooks/useQueryDateRange';
import OverviewSummary from './OverviewSummary';
import CodeQuality from './CodeQuality';
import CommunityServiceSupport from './CommunityServiceSupport';
import CommunityActivity from './CommunityActivity';
import OrganizationsActivity from './OrganizationsActivity';
import useHashScroll from '@common/hooks/useHashScroll';
import TopicTitle from '@modules/analyze/components/TopicTitle';
import { Topic } from '@modules/analyze/components/SideBar/config';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const Charts = () => {
  const { t } = useTranslation();
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
  const data = useMetricQueryData();
  const hasOrganizations = data.some(
    (i) => i.result?.groupMetricActivity.length !== 0
  );
  return (
    <>
      <OverviewSummary />

      <TopicTitle id={Topic.Productivity}>
        {t('analyze:topic.productivity')}
      </TopicTitle>
      <CodeQuality />
      <CommunityServiceSupport />

      <TopicTitle id={Topic.Robustness}>
        {t('analyze:topic.robustness')}
      </TopicTitle>
      <CommunityActivity />

      <TopicTitle id={Topic.NicheCreation}>
        {t('analyze:topic.niche_creation')}
      </TopicTitle>
      {hasOrganizations && <OrganizationsActivity />}
    </>
  );
};

export default Charts;
