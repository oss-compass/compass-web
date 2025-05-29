import React from 'react';
import ReopleGraph from './ReopleGraph';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import ConnectLineMini from '@modules/developer/components/ConnectLineMini';
import { useContributorApi } from '@modules/developer/hooks/useContributorApi';

const PeopleData = () => {
  const url = '/api/v2/contributor_portrait/contributor_collaboration';
  const { data, error, isLoading } = useContributorApi(
    url,
    'contributor_collaboration'
  );

  return (
    <>
      <ConnectLineMini />
      <ReopleGraph data={data} error={error} isLoading={isLoading} />
    </>
  );
};

export default withErrorBoundary(PeopleData, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
