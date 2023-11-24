import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import SectionTitle from '@modules/analyze/components/SectionTitle';
import { ContributorsPersona } from '@modules/analyze/components/SideBar/config';
import MetricContributor from './MetricContributor';
import MetricIssue from './MetricIssue';
import MetricPr from './MetricPr';

import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLine from '@modules/analyze/components/ConnectLine';

const OrganizationsActivity = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle id={ContributorsPersona.Overview}>
        {t('metrics_models:contributors_persona.title')}
      </SectionTitle>

      <div className="relative mb-4 grid gap-y-4 md:grid-cols-1">
        <ConnectLine />
        <MetricContributor />
        <MetricIssue />
        <MetricPr />
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
