import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCiDatasetsQuery } from '../CiExperience/queries';

const OverviewDashboard = dynamic(
  () => import('@modules/intelligent-analysis/UserJourney/OverviewDashboard'),
  {
    ssr: false,
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

const ExperienceOverview: React.FC<ExperienceOverviewProps> = ({ org }) => {
  const router = useRouter();
  const activeModule = Array.isArray(router.query.module)
    ? router.query.module[0]
    : router.query.module;
  // 数据请求与看板脚本并行；内层使用同一 Query Key，复用在途请求和结果。
  useCiDatasetsQuery(
    router.isReady &&
      activeModule === 'ci' &&
      (!org || org.toLowerCase() === 'cann')
  );
  return (
    <div className="flex h-screen flex-1 bg-[#eef2fa]">
      <div className="h-screen w-full overflow-y-auto">
        <OverviewDashboard org={org} />
      </div>
    </div>
  );
};

export default ExperienceOverview;
