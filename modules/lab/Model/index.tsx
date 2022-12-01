import React from 'react';
import ModelTitle from './modelTitle';
import ModelTrends from './modelTrends';
import {
  useBetaMetricsIndexQuery,
  BetaMetricsIndexQuery,
} from '@graphql/generated';
import client from '@graphql/client';
import Loading from './Loading';

type BetaMetric = {
  __typename?: 'BetaMetric';
  id?: number | null;
  dimensionality?: string | null;
  desc?: string | null;
  extra?: string | null;
  metric?: string | null;
};

const ModelItem: React.FC<{ betaMetric: BetaMetric }> = ({ betaMetric }) => {
  const { id, dimensionality, desc, extra, metric } = betaMetric;
  return (
    <>
      <ModelTitle
        dimensionality={dimensionality}
        desc={desc}
        extra={extra}
        metric={metric}
      />
      <ModelTrends id={id!} />
    </>
  );
};

const Model = () => {
  const { isLoading, data } = useBetaMetricsIndexQuery(client, {
    per: 2,
  });

  return (
    <div className="mx-auto h-10 w-[1280px] xl:w-full xl:px-2">
      {!isLoading &&
        data?.betaMetricsIndex.map((i) => {
          return <ModelItem betaMetric={i} key={i.id} />;
        })}
    </div>
  );
};

export default Model;
