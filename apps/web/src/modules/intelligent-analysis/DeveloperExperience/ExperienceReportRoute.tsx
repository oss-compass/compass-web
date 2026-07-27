import React from 'react';
import type { ExperienceType } from './experienceModules';
import CommunityOnboarding from './CommunityOnboarding';
import IssueContribution from './IssueContribution';
import CiExperience from './CiExperience';

type ExperienceModulePageProps = {
  org?: string;
};

type ExperienceReportRouteProps = {
  experienceType: ExperienceType;
  org?: string;
};

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
