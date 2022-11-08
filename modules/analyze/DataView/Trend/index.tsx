import React from 'react';
import { MetricQuery } from '@graphql/generated';
import TrendChart from './TrendChart';
import TrendList from './TrendList';
import useMetricQueryData from '@modules//analyze/hooks/useMetricQueryData';

const Trends: React.FC<{
  data: { label: string; result: MetricQuery | undefined }[];
}> = ({ data }) => {
  if (data.length > 1) {
    return <TrendList />;
  }

  // if (data.length == 1) {
  //   return <TrendChart />;
  // }

  return null;
};

const TrendsWithData = () => {
  const data = useMetricQueryData();

  return <Trends data={data} />;
};

export default TrendsWithData;
