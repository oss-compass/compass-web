import React from 'react';
import { MetricQuery } from '@graphql/generated';
import LineChart from './LineChart';
import TableList from './TableList';
import useMetricQueryData from '@modules//analyze/hooks/useMetricQueryData';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';

const Overview: React.FC<{
  data: { label: string; result: MetricQuery | undefined }[];
}> = ({ data }) => {
  if (data.length == 1) {
    return <LineChart />;
  }

  if (data.length > 1) {
    return <TableList />;
  }
  return null;
};

const OverviewSummary = () => {
  const data = useMetricQueryData();
  return <Overview data={data} />;
};

export default withErrorBoundary(OverviewSummary, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
