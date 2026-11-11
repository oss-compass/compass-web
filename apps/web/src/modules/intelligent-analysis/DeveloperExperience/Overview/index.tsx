import React from 'react';
import dynamic from 'next/dynamic';
import { useOverviewEntryData } from './useOverviewEntryData';
import OverviewLoadingState from '../../UserJourney/OverviewDashboard/OverviewLoadingState';

const OverviewDashboard = dynamic(
  () => import('@modules/intelligent-analysis/UserJourney/OverviewDashboard'),
  {
    ssr: false,
    loading: OverviewLoadingState,
  }
);

type ExperienceOverviewProps = {
  org?: string;
};

const ExperienceOverview: React.FC<ExperienceOverviewProps> = ({ org }) => {
  useOverviewEntryData(org);
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-1 bg-[#eef2fa]">
      <div className="w-full min-w-0">
        <OverviewDashboard org={org} />
      </div>
    </div>
  );
};

export default ExperienceOverview;
