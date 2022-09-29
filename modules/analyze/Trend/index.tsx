import React from 'react';
import { MetricQuery } from '@graphql/generated';
import TrendChart from './TrendChart';
import TrendList from './TrendList';
import useMetricQueryData from '../hooks/useMetricQueryData';

const Trends: React.FC<{
  loading: boolean;
  data: { label: string; result: MetricQuery | undefined }[];
}> = ({ loading, data }) => {
  if (data.length > 1) {
    return <TrendList />;
  }

  if (data.length == 1) {
    return <TrendChart />;
  }

  return null;
};

const TrendsWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  return <Trends loading={isLoading} data={data} />;
};

export default TrendsWithData;
