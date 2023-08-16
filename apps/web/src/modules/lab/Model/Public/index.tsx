import React, { useState } from 'react';
import CreateGuide from './CreateGuide';
import { useLabModelPublicOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import Pagination from '@common/components/Pagination';
import ModelItem from './ModelItem';
import Loading from './Loading';

const per = 5;

const Model = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useLabModelPublicOverviewQuery(client, {
    page: page,
    per,
  });

  const list = data?.labModelPublicOverview?.items || [];

  const pageTotal = data?.labModelPublicOverview?.totalPage || 0;
  const count = data?.labModelPublicOverview?.count || 0;

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

      <div className="py-6">
        {pageTotal > 1 ? (
          <Pagination
            page={page}
            pageTotal={pageTotal}
            onChange={(p) => {
              setPage(p);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Model;
