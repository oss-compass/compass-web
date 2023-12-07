import React from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/analyze/components/SectionTitle';
import { Section } from '@modules/analyze/components/SideBar/config';
import TotalScore from './TotalScore';
import ActivityCoreContributionPerPerson from './ActivityCoreContributionPerPerson';
import ActivityCoreCount from './ActivityCoreCount';
import ActivityRegularCount from './ActivityRegularCount';
import ActivityRegularContribution from './ActivityRegularContribution';
import ActivityCasualCount from './ActivityCasualCount';
import ActivityCasualContribution from './ActivityCasualContribution';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLine from '@modules/analyze/components/ConnectLine';

const ContributorMilestonePersona = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle id={Section.ContributorMilestonePersona}>
        {t('metrics_models:contributor_milestone_persona.title')}
      </SectionTitle>

      <div className="mb-4">
        <TotalScore />
      </div>

      <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4  md:grid-cols-1">
        <ConnectLine />
        <ActivityCoreCount />
        <ActivityCoreContributionPerPerson />
        <ActivityRegularCount />
        <ActivityRegularContribution />
        <ActivityCasualCount />
        <ActivityCasualContribution />
      </div>
    </>
  );
};

export default withErrorBoundary(ContributorMilestonePersona, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
