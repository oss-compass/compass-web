import React from 'react';
import { MetricQuery, SummaryQuery } from '@oss-compass/graphql';
import CommunityRepos from './CommunityRepos';
import LineChart from './LineChart';
import TableList from './TableList';
import useMetricQueryData from '@modules//analyze/hooks/useMetricQueryData';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';
import { Level } from '@modules/analyze/constant';
import DistributionMap from '@modules/analyze/components/DistributionMap';

const Overview: React.FC<{
  data: DeepReadonly<
    { label: string; level: Level; result: MetricQuery | undefined }[]
  >;
}> = ({ data }) => {
  if (data.length == 1) {
    return (
      <>
        {data[0].level === Level.COMMUNITY && <CommunityRepos />}
        <div className="flex gap-4 md:flex-col">
          <div className="min-w-0 flex-1">
            <LineChart />
          </div>
          <div className="w-[352px] flex-shrink-0">
            <DistributionMap />
          </div>
        </div>
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
