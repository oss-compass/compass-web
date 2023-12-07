import React from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/analyze/components/SectionTitle';
import { Section } from '@modules/analyze/components/SideBar/config';
import TotalScore from './TotalScore';
import ActivityCodeCount from './ActivityCodeCount';
import ActivityCodeContribution from './ActivityCodeContribution';
import ActivityIssueCount from './ActivityIssueCount';
import ActivityIssueContribution from './ActivityIssueContribution';
import ActivityObservationCount from './ActivityObservationCount';
import ActivityObservationContribution from './ActivityObservationContribution';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLine from '@modules/analyze/components/ConnectLine';

const ContributorMilestonePersona = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle id={Section.ContributorDomainPersona}>
        {t('metrics_models:contributor_domain_persona.title')}
      </SectionTitle>

      <div className="mb-4">
        <TotalScore />
      </div>

      <div className="relative mb-4 grid min-w-0 grid-cols-2 gap-4  md:grid-cols-1">
        <ConnectLine />
        <ActivityCodeCount />
        <ActivityCodeContribution />
        <ActivityIssueCount />
        <ActivityIssueContribution />
        <ActivityObservationCount />
        <ActivityObservationContribution />
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
