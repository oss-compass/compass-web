import React from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/analyze/components/SectionTitle';
import { Section } from '@modules/analyze/components/SideBar/config';
import TotalScore from './TotalScore';
import ActivityOrganizationContribution from './ActivityOrganizationContribution';
import ActivityOrganizationCount from './ActivityOrganizationCount';
import ActivityIndividualContribution from './ActivityIndividualContribution';
import ActivityIndividualCount from './ActivityIndividualCount';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLine from '@modules/analyze/components/ConnectLine';

const ContributorRolePersona = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle id={Section.ContributorRolePersona}>
        {t('metrics_models:contributor_role_persona.title')}
      </SectionTitle>

      <div className="mb-4">
        <TotalScore />
      </div>

      <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
        <ConnectLine />
        <ActivityOrganizationCount />
        <ActivityOrganizationContribution />
        <ActivityIndividualCount />
        <ActivityIndividualContribution />
      </div>
    </>
  );
};

export default withErrorBoundary(ContributorRolePersona, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
