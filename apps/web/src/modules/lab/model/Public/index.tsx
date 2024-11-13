import React, { useState } from 'react';
import { useQueryState, queryTypes } from 'next-usequerystate';
import { useLabModelPublicOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import Pagination from '@common/components/Antd/Pagination';
import CreateGuide from './CreateGuide';
import PublicItem from './PublicItem';
import Loading from './Loading';
import MerticAside from './MerticAside';

const per = 12;

const Model = () => {
  const { t } = useTranslation();
  const [page, setPage] = useQueryState(
    'page',
    queryTypes.integer.withDefault(1)
  );
  const [activeList, setActiveList] = useState(0);

  const { isLoading, data } = useLabModelPublicOverviewQuery(client, {
    metricId: activeList === 0 ? undefined : activeList,
    page: page,
    per,
  });

  const list = data?.labModelPublicOverview?.items || [];

  const pageTotal = data?.labModelPublicOverview?.totalPage || 0;
  const count = data?.labModelPublicOverview?.count || 0;

  let content = null;
  if (isLoading) {
    content = (
      <Loading className="mx-auto w-[1280px] border-l px-4 pt-8 xl:w-full xl:px-2" />
    );
  } else {
    if (count === 0) {
      content = (
        <div className="text-secondary border-l px-4 pt-8 text-center">
          {t('common:no_data')}
        </div>
      );
    } else {
      content = (
        <div className="border-box flex-1 border-l p-5 pt-8">
          <div className="mb-5 flex items-center text-xl font-medium">
            {t('lab:public_model')}
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-5 xl:gap-6">
            {list.map((model, index) => {
              return <PublicItem model={model} key={model.modelId} fullWidth />;
            })}
          </div>

          <div className="flex justify-center py-6">
            {pageTotal > 1 ? (
              <Pagination
                pageSize={per}
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
    }
  }

  return (
    <div className="container relative mx-auto box-border flex w-[1280px] flex-1 space-y-0 xl:w-full xl:px-2">
      <aside className="border-box w-[312px] flex-shrink-0 pb-[22px] pt-8 sm:hidden lg:!w-[256px]">
        <MerticAside activeList={activeList} setActiveList={setActiveList} />
      </aside>
      {content}
    </div>
  );
};

export default Model;
