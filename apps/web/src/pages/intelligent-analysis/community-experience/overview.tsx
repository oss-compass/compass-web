import React from 'react';
import dynamic from 'next/dynamic';

const OverviewDashboard = dynamic(
  () => import('@modules/intelligent-analysis/UserJourney/OverviewDashboard'),
  {
    loading: () => (
      <div className="flex min-h-screen items-center justify-center px-6 text-sm text-slate-500">
        看板加载中...
      </div>
    ),
  }
);

const CommunityExperienceOverviewPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-1 bg-[#eef2fa]">
      <div className="h-screen w-full overflow-y-auto">
        <OverviewDashboard />
      </div>
    </div>
  );
};

export default CommunityExperienceOverviewPage;
