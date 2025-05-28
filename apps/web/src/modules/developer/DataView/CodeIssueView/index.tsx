import React from 'react';
import { useTranslation } from 'next-i18next';
// import TotalScore from './TotalScore';
import CommitFrequency from './CommitFrequency';
import IssueCount from './IssueCount';
import IssueCommentsCount from './IssueCommentsCount';

import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLineMini from '@modules/developer/components/ConnectLineMini';

const OrganizationsActivity = () => {
  const { t } = useTranslation();

  return (
    <>
      <ConnectLineMini />
      <CommitFrequency />
      <ConnectLineMini />
      <IssueCount />
      <ConnectLineMini />
      <IssueCommentsCount />
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
