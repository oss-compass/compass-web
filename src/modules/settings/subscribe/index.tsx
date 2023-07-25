import React, { useState } from 'react';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
import client from '@graphql/client';
import { useSubscriptionsQuery } from '@graphql/generated';
import Center from '@common/components/Layout/Center';
import { Button } from '@oss-compass/ui';
import Pagination from '@common/components/Pagination';
import SubscribeItem from './SubscribeItem';

const per = 10;

const Subscribe = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useSubscriptionsQuery(client, {
    page,
    per,
  });

  const pageTotal = data?.currentUser?.subscriptions?.totalPage || 0;
  const count = data?.currentUser?.subscriptions?.count || 0;

  const getContent = () => {
    if (isLoading) {
      return (
        <>
          <div className="flex-1 space-y-4 py-10">
            <div className="h-6 rounded bg-slate-200"></div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-6 rounded bg-slate-200"></div>
              <div className="col-span-1 h-6 rounded bg-slate-200"></div>
            </div>

            <div className="h-6 rounded bg-slate-200"></div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 h-6 rounded bg-slate-200"></div>
              <div className="col-span-2 h-6 rounded bg-slate-200"></div>
            </div>

            <div className="h-6 rounded bg-slate-200"></div>
          </div>
        </>
      );
    }

    if (!isLoading && count === 0) {
      return (
        <div className="py-20 text-center text-gray-500">
          {t('setting:subscriptions.empty_list')}
        </div>
      );
    }

    return (
      <>
        {data?.currentUser?.subscriptions?.items?.map((item) => {
          return (
            <SubscribeItem
              key={item.id}
              item={item}
              onRefresh={() => {
                refetch();
              }}
            />
          );
        })}
      </>
    );
  };

  return (
    <Center widthClassName="w-[1000px] pb-20 lg:px-6">
      <div className="flex justify-between pb-3 pt-10">
        <div className="text-xl font-bold">
          {t('setting:subscriptions.title')}
        </div>
        <div>
          <Button
            size="sm"
            intent="secondary"
            onClick={() => {
              router.push('/submit-your-project');
            }}
          >
            {t('setting:subscriptions.submit_a_project')}
          </Button>
        </div>
      </div>

      {getContent()}

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
    </Center>
  );
};

export default Subscribe;
