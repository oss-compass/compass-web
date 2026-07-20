import React from 'react';
import type { ExperienceType } from './experienceModules';
import ExperienceShell from './components/ExperienceShell';
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

  return (
    <ExperienceShell activeType={experienceType} org={org}>
      <ReportComponent org={org} />
    </ExperienceShell>
  );
};

export default ExperienceReportRoute;
