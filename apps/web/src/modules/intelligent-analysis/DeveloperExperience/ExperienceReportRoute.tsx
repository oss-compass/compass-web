import React from 'react';
import dynamic from 'next/dynamic';
import type { ExperienceType } from './experienceModules';

type ExperienceModulePageProps = {
  org?: string;
};

type ExperienceReportRouteProps = {
  experienceType: ExperienceType;
  org?: string;
};

const loading = () => (
  <div
    role="status"
    className="flex min-h-[520px] items-center justify-center text-sm text-slate-500"
  >
    报告数据加载中...
  </div>
);

// 报告数据在浏览器加载，服务端只渲染轻量外壳，避免首次请求初始化表格等模块。
const CommunityOnboarding = dynamic<ExperienceModulePageProps>(
  () => import('./CommunityOnboarding'),
  { ssr: false, loading }
);
const IssueContribution = dynamic<ExperienceModulePageProps>(
  () => import('./IssueContribution'),
  { ssr: false, loading }
);
const CiExperience = dynamic<ExperienceModulePageProps>(
  () => import('./CiExperience'),
  { ssr: false, loading }
);

const EXPERIENCE_REPORT_COMPONENTS: Record<
  ExperienceType,
  React.ComponentType<ExperienceModulePageProps>
> = {
  'community-onboarding': CommunityOnboarding,
  'issue-contribution': IssueContribution,
  'ci-experience': CiExperience,
};

const ExperienceReportRoute: React.FC<ExperienceReportRouteProps> = ({
  experienceType,
  org,
}) => {
  const ReportComponent = EXPERIENCE_REPORT_COMPONENTS[experienceType];

  // 报告页不再展示顶部 navbar 与模块切换 Tabs，返回看板按钮由各报告页标题区提供
  return (
    <div className="flex h-[100dvh] h-screen min-h-0 flex-col bg-[#eef2fa] text-slate-950">
      <main className="min-h-0 flex-1 overflow-y-auto">
        <ReportComponent org={org} />
      </main>
    </div>
  );
};

export default ExperienceReportRoute;
