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

type ExperienceOverviewProps = {
  org?: string;
};

const ExperienceOverview: React.FC<ExperienceOverviewProps> = ({ org }) => (
  <div className="flex h-screen flex-1 bg-[#eef2fa]">
    <div className="h-screen w-full overflow-y-auto">
      <OverviewDashboard org={org} />
    </div>
  </div>
);

export default ExperienceOverview;
