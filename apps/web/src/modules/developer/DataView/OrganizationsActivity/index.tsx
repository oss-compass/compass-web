import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/developer/components/SectionTitle';
import { Section } from '@modules/developer/components/SideBar/config';

import TotalScore from './TotalScore';

import ContributorCount from './ContributorCount';
import CommitFrequency from './CommitFrequency';
import OrgCount from './OrgCount';
import ContributionLast from './ContributionLast';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLine from '@modules/developer/components/ConnectLine';

const OrganizationsActivity = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle id={Section.OrganizationsActivity}>
        {t('metrics_models:organization_activity.title')}
      </SectionTitle>

      <div className="mb-4">
        <TotalScore />
      </div>

      <div className="relative mb-4 grid min-w-0 grid-cols-2 gap-4  md:grid-cols-1">
        <ConnectLine />
        <ContributorCount />
        <CommitFrequency />
        <OrgCount />
        <ContributionLast />
      </div>
    </>
  );
};

export default withErrorBoundary(OrganizationsActivity, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
