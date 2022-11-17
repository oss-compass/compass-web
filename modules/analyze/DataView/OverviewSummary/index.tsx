import React from 'react';
import { MetricQuery } from '@graphql/generated';
import LineChart from './LineChart';
import TableList from './TableList';
import useMetricQueryData from '@modules//analyze/hooks/useMetricQueryData';

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

export default TrendsWithData;
