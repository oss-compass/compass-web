import React from 'react';
import { useTranslation } from 'next-i18next';
import ContributorDomainPersona from './ContributorDomainPersona';
import ContributorMilestonePersona from './ContributorMilestonePersona';
import ContributorRolePersona from './ContributorRolePersona';

import OverviewSummary from './OverviewSummary';
import MetricDashboard from '@modules/analyze/DataView/MetricDetail/MetricDashboard';
import TopicTitle from '@modules/analyze/components/TopicTitle';
import { Topic } from '@modules/analyze/components/SideBar/config';
// import { CiGrid41 } from 'react-icons/ci';
import ProductivityIcon from '@modules/analyze/components/SideBar/assets/Productivity.svg';
// import RobustnessIcon from '@modules/analyze/components/SideBar/assets/Robustness.svg';
// import NicheCreationIcon from '@modules/analyze/components/SideBar/assets/NicheCreation.svg';

const ContributorDataView = () => {
  const { t } = useTranslation();
  return (
    <>
      <OverviewSummary />
      <MetricDashboard />
      <TopicTitle
        icon={<ProductivityIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.Productivity}
      >
        {t('analyze:topic.productivity')}
      </TopicTitle>
      <ContributorMilestonePersona />
      <ContributorRolePersona />
      <ContributorDomainPersona />
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

export default ContributorDataView;
