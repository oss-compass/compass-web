import React from 'react';
import { useTranslation } from 'next-i18next';
import TotalScore from './TotalScore';
import CommitFrequency from './CommitFrequency';
import LocFrequency from './LocFrequency';
import CodeMergeRatio from './CodeMergeRatio';

import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLineMini from '@modules/developer/components/ConnectLineMini';

const OrganizationsActivity = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-4">
        <CommitFrequency />
        <ConnectLineMini />
        <CodeMergeRatio />
        <ConnectLineMini />
        <LocFrequency />
      </div>

      {/* <div className="relative mb-4 grid min-w-0 grid-cols-2 gap-4  md:grid-cols-1">
        <ConnectLine />
        <ContributorCount />
        <CommitFrequency />
        <OrgCount />
        <ContributionLast />
      </div> */}
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
