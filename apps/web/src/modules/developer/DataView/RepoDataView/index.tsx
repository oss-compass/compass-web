import React from 'react';
import { useTranslation } from 'next-i18next';
import RepoGraph from './RepoGraph';
import RepoRanks from './RepoRanks';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLineMini from '@modules/developer/components/ConnectLineMini';
import { useContributorApi } from '@modules/developer/hooks/useContributorApi';

const RepoDataView = () => {
  const url = '/api/v2/contributor_portrait/repo_collaboration';
  const { data, error, isLoading } = useContributorApi(
    url,
    'repo_collaboration'
  );
  return (
    <>
      {/* <CommunityRepos data={data} />
      <ConnectLineMini /> */}
      <RepoGraph data={data} error={error} isLoading={isLoading} />
      <ConnectLineMini />
      <RepoRanks data={data} isLoading={isLoading} />
    </>
  );
};

export default withErrorBoundary(RepoDataView, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
