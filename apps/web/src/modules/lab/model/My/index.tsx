import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useEventEmitter } from 'ahooks';
import { Button } from '@oss-compass/ui';
import { useMyLabModelsQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useTranslation } from 'react-i18next';
import { useQueryState, queryTypes } from 'next-usequerystate';
import { ReFetch } from '@common/constant';
import Pagination from '@common/components/Pagination';
import { Center } from '@common/components/Layout';
import ModelItem from './ModelItem';

const per = 5;

const MyModal = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [page, setPage] = useQueryState(
    'page',
    queryTypes.integer.withDefault(1)
  );
  const { data, isLoading, refetch } = useMyLabModelsQuery(gqlClient, {
    page: page || 1,
    per,
  });

  const event$ = useEventEmitter<string>();
  event$.useSubscription((flag) => {
    if (flag === ReFetch) {
      refetch();
    }
  });

  const pageTotal = data?.myModels?.totalPage || 0;
  const count = data?.myModels?.count || 0;

  const getContent = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse py-4">
          <div className="flex-1 space-y-4 ">
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-4 rounded bg-slate-200"></div>
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            </div>
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            </div>
            <div className="h-4 rounded bg-slate-200"></div>
          </div>
        </div>
      );
    }

    if (count === 0) {
      return (
        <div className="py-20 text-center text-gray-500">
          {t('common:no_data')}
        </div>
      );
    }

    return (
      <>
        {data?.myModels.items.map((item) => {
          return <ModelItem key={item.id} model={item} event$={event$} />;
        })}
      </>
    );
  };

  return (
    <div className="flex-1 bg-[#FAFAFA] pb-10">
      <Center>
        <div className="flex items-center justify-between pt-10 pb-4">
          <div className="font-semibold">{t('lab:my_models')}</div>
          <div>
            <Button
              size="sm"
              onClick={() => {
                router.push('/lab/model/create');
              }}
            >
              {t('lab:new_model')}
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
    </div>
  );
};

export default MyModal;
