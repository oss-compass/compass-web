import React from 'react';
import { MetricQuery } from '@graphql/generated';
import CommunityRepos from './CommunityRepos';
import LineChart from './LineChart';
import TableList from './TableList';
import useMetricQueryData from '@modules//analyze/hooks/useMetricQueryData';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import { Level } from '@modules/analyze/constant';

const Overview: React.FC<{
  data: DeepReadonly<
    { label: string; level: Level; result: MetricQuery | undefined }[]
  >;
}> = ({ data }) => {
  if (data.length == 1) {
    return (
      <>
        {data[0].level === Level.COMMUNITY && <CommunityRepos />}
        <LineChart />
      </>
    );
  }

  if (data.length > 1) {
    return <TableList />;
  }
  return null;
};

const OverviewSummary = () => {
  const { items } = useMetricQueryData();
  return <Overview data={items} />;
};

export default withErrorBoundary(OverviewSummary, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
