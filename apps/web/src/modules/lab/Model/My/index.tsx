import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useEventEmitter } from 'ahooks';
import { Button } from '@oss-compass/ui';
import { useMyLabModelsQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { ReFetch } from '@common/constant';
import Pagination from '@common/components/Pagination';
import { Center } from '@common/components/Layout';
import ModelItem from './ModelItem';

const per = 5;

const MyModal = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useMyLabModelsQuery(gqlClient, {
    page: page,
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
      return <div className="py-20 text-center text-gray-500">暂无数据</div>;
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
          <div className="font-semibold">我的模型</div>
          <div>
            <Button
              size="sm"
              onClick={() => {
                router.push('/lab/model/create');
              }}
            >
              新建模型
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
