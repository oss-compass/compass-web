import React from 'react';
import { useTranslation } from 'next-i18next';
import TopicTitle from '@modules/analyze/components/TopicTitle';
import { Topic } from '@modules/analyze/components/SideBar/config';
import { CiGrid41 } from 'react-icons/ci';
import MetricDashboard from '@modules/analyze/DataView/MetricDetail/MetricDashboard';
import ProductivityIcon from '@modules/analyze/components/SideBar/assets/Productivity.svg';
import MetricDetail from './MetricDetail';

const ContributorDetail = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1
        className={
          'group relative z-20 mt-2 mb-8 flex scroll-mt-[200px] text-3xl font-semibold md:px-4 md:text-3xl'
        }
        id={Topic.Overview}
      >
        <CiGrid41 className="mt-2 mr-2 h-[21px] w-[21px] flex-shrink-0" />
        {t('analyze:overview')}
        <a href={`#${Topic.Overview}`}>
          <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
            #
          </span>
        </a>
      </h1>
      <MetricDashboard />
      <TopicTitle
        icon={<ProductivityIcon className="mt-2 mr-2 h-[21px] w-[21px]" />}
        id={Topic.Productivity}
      >
        {t('analyze:topic.productivity')}
      </TopicTitle>
      <MetricDetail />
    </>
  );
};

export default ContributorDetail;
