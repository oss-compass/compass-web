import React, { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import ChartsDataProvider from '../context/ChartsDataProvider';
import OverviewSummary from './OverviewSummary';
import MetricDashboard from '@modules/analyze/DataView/MetricDetail/MetricDashboard';
import CollaborationDevelopmentIndex from './CollaborationDevelopmentIndex';
import CommunityServiceSupport from './CommunityServiceSupport';
import CommunityActivity from './CommunityActivity';
import OrganizationsActivity from './OrganizationsActivity';
import TopicTitle from '@modules/analyze/components/TopicTitle';
import { Topic } from '@modules/analyze/components/SideBar/config';
import { CiGrid41 } from 'react-icons/ci';
import ProductivityIcon from '@modules/analyze/components/SideBar/assets/Productivity.svg';
import RobustnessIcon from '@modules/analyze/components/SideBar/assets/Robustness.svg';
import NicheCreationIcon from '@modules/analyze/components/SideBar/assets/NicheCreation.svg';
import { useTopicType } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';

const Charts = () => {
  const { t } = useTranslation();
  const { topicType } = useSnapshot(useTopicType);

  return (
    <ChartsDataProvider>
      <h1
        className={
          'group relative z-20 mt-8 mb-8 flex scroll-mt-[200px] text-3xl font-semibold md:px-4 md:text-3xl'
        }
      >
        <CiGrid41 className="mt-2 mr-2 h-[21px] w-[21px] flex-shrink-0" />
        {t('analyze:overview')}
        <a href={`#${Topic.Overview}`}>
          <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
            #
          </span>
        </a>
      </h1>
      <OverviewSummary />
      <MetricDashboard />
      {topicType === 'collaboration' ? (
        <CollaborationDataView />
      ) : (
        <ContributorDataView />
      )}
    </ChartsDataProvider>
  );
};
const CollaborationDataView = () => {
  const { t } = useTranslation();
  return (
    <>
      <TopicTitle
        icon={<ProductivityIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.Productivity}
      >
        {t('analyze:topic.productivity')}
      </TopicTitle>
      <CollaborationDevelopmentIndex />
      <CommunityServiceSupport />

      <TopicTitle
        icon={<RobustnessIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.Robustness}
      >
        {t('analyze:topic.robustness')}
      </TopicTitle>
      <CommunityActivity />

      <TopicTitle
        icon={<NicheCreationIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.NicheCreation}
      >
        {t('analyze:topic.niche_creation')}
      </TopicTitle>
      <OrganizationsActivity />
    </>
  );
};

const ContributorDataView = () => {
  const { t } = useTranslation();
  return (
    <>
      <TopicTitle
        icon={<ProductivityIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.Productivity}
      >
        {t('analyze:topic.productivity')}
      </TopicTitle>
      <CollaborationDevelopmentIndex />

      {/* <TopicTitle
        icon={<RobustnessIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.Robustness}
      >
        {t('analyze:topic.robustness')}
      </TopicTitle>

      <TopicTitle
        icon={<NicheCreationIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.NicheCreation}
      >
        {t('analyze:topic.niche_creation')}
      </TopicTitle> */}
    </>
  );
};

export default Charts;
