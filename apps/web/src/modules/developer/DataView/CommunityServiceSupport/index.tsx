import React from 'react';
import { useTranslation } from 'next-i18next';
import UpdatedIssuesCount from './UpdatedIssuesCount';
import CommentFrequency from './CommentFrequency';
import ConnectLineMini from '@modules/developer/components/ConnectLineMini';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';

const CommunitySupport = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-4">
        <UpdatedIssuesCount />
        <ConnectLineMini />
        <CommentFrequency />
      </div>
    </>
  );
};

export default withErrorBoundary(CommunitySupport, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
