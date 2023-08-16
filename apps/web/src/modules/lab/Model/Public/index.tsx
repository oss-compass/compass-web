import React from 'react';
import CreateGuide from './CreateGuide';
import { useLabModelPublicOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import ModelItem from './ModelItem';
import Loading from './Loading';

const Model = () => {
  const { isLoading, data } = useLabModelPublicOverviewQuery(client, {
    page: 1,
    per: 5,
  });

  const list = data?.labModelPublicOverview?.items || [];

  if (isLoading) {
    return <Loading className="mx-auto w-[1280px] xl:w-full xl:px-2" />;
  }

  return (
    <div className="mx-auto w-[1280px] xl:w-full xl:px-2">
      {list.map((model, index) => {
        if (index === 0) {
          return (
            <div className="flex  md:flex-wrap " key={model.modelId}>
              <ModelItem model={model} />
              <CreateGuide />
            </div>
          );
        }

        return <ModelItem model={model} key={model.modelId} fullWidth />;
      })}
    </div>
  );
};

export default Model;
