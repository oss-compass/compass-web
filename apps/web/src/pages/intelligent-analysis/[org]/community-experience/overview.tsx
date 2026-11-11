import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useOverviewEntryData } from '@modules/intelligent-analysis/DeveloperExperience/Overview/useOverviewEntryData';
import OverviewLoadingState from '@modules/intelligent-analysis/UserJourney/OverviewDashboard/OverviewLoadingState';

const OverviewDashboard = dynamic(
  () => import('@modules/intelligent-analysis/UserJourney/OverviewDashboard'),
  {
    loading: OverviewLoadingState,
  }
);

const CommunityExperienceOverviewPage: React.FC = () => {
  const router = useRouter();
  const { org } = router.query;
  useOverviewEntryData(typeof org === 'string' ? org : undefined);

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-1 bg-[#eef2fa]">
      <div className="w-full min-w-0">
        <OverviewDashboard org={typeof org === 'string' ? org : undefined} />
      </div>
    </div>
  );
};

export default CommunityExperienceOverviewPage;
