import React from 'react';
import { MetricQuery } from '@graphql/generated';
import TrendChart from './TrendChart';
import TrendList from './TrendList';
import useMetricQueryData from '../hooks/useMetricQueryData';

const Trends: React.FC<{
  loading: boolean;
  data: { url: string; result: MetricQuery | undefined }[];
}> = ({ loading, data }) => {
  if (data.length > 1) {
    return <TrendList />;
  }

  if (data.length == 1) {
    return <TrendChart loading={false} data={data[0].result} />;
  }

  return null;
};

const TrendsWithData = () => {
  const data = useMetricQueryData();
  return <Trends loading data={data} />;
};

export default TrendsWithData;
