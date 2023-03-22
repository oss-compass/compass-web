import React, { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import ChartsDataProvider from '../context/ChartsDataProvider';
import OverviewSummary from './OverviewSummary';
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

const Charts = () => {
  const { t } = useTranslation();

  return (
    <ChartsDataProvider>
      <h1
        className={
          'group relative z-20 mt-8 mb-8 flex scroll-mt-[200px] text-3xl font-semibold md:px-4 md:text-3xl'
        }
        id="topic_overview_navbar"
      >
        <CiGrid41 className="mt-2 mr-2 h-[21px] w-[21px] flex-shrink-0" />
        {t('analyze:overview')}
        <a href={`#${Topic.Overview}`}>
          <span className="invisible ml-2 cursor-pointer group-hover:visible group-hover:text-primary">
            #
          </span>
        </a>
      </h1>
      <OverviewSummary />

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
    </ChartsDataProvider>
  );
};

export default Charts;
