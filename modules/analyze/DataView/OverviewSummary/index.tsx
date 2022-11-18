import React from 'react';
import { MetricQuery } from '@graphql/generated';
import LineChart from './LineChart';
import TableList from './TableList';
import useMetricQueryData from '@modules//analyze/hooks/useMetricQueryData';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@common/components/ErrorFallback';

const Trends: React.FC<{
  data: { label: string; result: MetricQuery | undefined }[];
}> = ({ data }) => {
  if (data.length > 1) {
    return <TableList />;
  }

  if (data.length == 1) {
    return <LineChart />;
  }

  return null;
};

const TrendsWithData = () => {
  const data = useMetricQueryData();

  return <Trends data={data} />;
};

export default withErrorBoundary(TrendsWithData, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
    // Do something with the error
    // E.g. log to an error logging client here
  },
});
