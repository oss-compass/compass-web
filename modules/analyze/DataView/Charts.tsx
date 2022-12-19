import React, { PropsWithChildren, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'next-i18next';
import ChartsDataProvider from '../context/ChartsDataProvider';
import OverviewSummary from './OverviewSummary';
import CollaborationDevelopmentIndex from './CollaborationDevelopmentIndex';
import CommunityServiceSupport from './CommunityServiceSupport';
import CommunityActivity from './CommunityActivity';
import OrganizationsActivity from './OrganizationsActivity';
import TopicTitle from '@modules/analyze/components/TopicTitle';
import { Topic } from '@modules/analyze/components/SideBar/config';

const Charts = () => {
  const { t } = useTranslation();
  console.log('--------------Charts------------------');
  return (
    <ChartsDataProvider>
      <OverviewSummary />

      <TopicTitle id={Topic.Productivity}>
        {t('analyze:topic.productivity')}
      </TopicTitle>
      <CollaborationDevelopmentIndex />
      <CommunityServiceSupport />

      <TopicTitle id={Topic.Robustness}>
        {t('analyze:topic.robustness')}
      </TopicTitle>
      <CommunityActivity />

      <TopicTitle id={Topic.NicheCreation}>
        {t('analyze:topic.niche_creation')}
      </TopicTitle>
      <OrganizationsActivity />
    </ChartsDataProvider>
  );
};

export default Charts;
