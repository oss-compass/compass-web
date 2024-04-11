import React, { useState } from 'react';
import { useQueryState, queryTypes } from 'next-usequerystate';
import { useLabModelPublicOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import Pagination from '@common/components/Antd/Pagination';
import CreateGuide from './CreateGuide';
import ModelItem from './ModelItem';
import Loading from './Loading';

const per = 5;

const Model = () => {
  const { t } = useTranslation();
  const [page, setPage] = useQueryState(
    'page',
    queryTypes.integer.withDefault(1)
  );
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

  if (count === 0) {
    return (
      <div className="text-secondary text-center">{t('common:no_data')}</div>
    );
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

      <div className="flex justify-center py-6">
        {pageTotal > 1 ? (
          <Pagination
            current={page}
            total={count}
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
