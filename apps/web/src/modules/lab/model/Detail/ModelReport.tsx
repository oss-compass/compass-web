import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useReferenceModelReportsQuery } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useTranslation } from 'react-i18next';
import { useQueryState, queryTypes } from 'next-usequerystate';
import { Center } from '@common/components/Layout';
import ReportItem from '@modules/lab/report/My/ReportItem';

const per = 10;

const ModelReport = ({ modelId }) => {
  const { t } = useTranslation();

  const [page, setPage] = useQueryState(
    'page',
    queryTypes.integer.withDefault(1)
  );
  const params = {
    page: page || 1,
    per,
    modelId,
  };
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      useReferenceModelReportsQuery.getKey(params),
      async (arg) => {
        const { pageParam } = arg;
        return await useReferenceModelReportsQuery.fetcher(gqlClient, {
          ...params,
          ...pageParam,
        })();
      },
      {
        staleTime: 60 * 1000,
        getNextPageParam: (lastPage) => {
          const count = lastPage?.referenceModelReports?.count! || 0;
          const page = lastPage?.referenceModelReports?.page! || 0;
          const totalPage = lastPage?.referenceModelReports?.totalPage! || 0;
          if (totalPage > page) {
            return { page: page + 1 };
          }
          return null;
        },
      }
    );
  console.log(data);
  const list = data?.pages?.reduce((acc, cur) => {
    return acc.concat(cur.referenceModelReports.items);
  }, []);
  const getContent = () => {
    if (isLoading || list?.length === 0) {
      return null;
    }

    return (
      <>
        <div className="my-8">
          <div className="text-secondary mt-6 mb-2 flex items-center justify-between text-base font-semibold">
            {t('lab:evaluation_report')}
          </div>
          {list.map((model) => {
            return (
              <div
                className="mb-4 flex-1 border bg-[#fafafa] p-4"
                key={model.id}
              >
                <ReportItem model={model} simple={true} fullWidth />
              </div>
            );
          })}

          {hasNextPage ? (
            <div className="flex justify-center pb-6">
              <div
                className="text-primary cursor-pointer py-2 text-center text-xs"
                onClick={() => {
                  fetchNextPage();
                }}
              >
                {isFetchingNextPage
                  ? t('common:loading_more')
                  : t('common:load_more')}
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  };

  return (
    <div className="flex-1 pb-10 md:px-4">
      <Center>{getContent()}</Center>
    </div>
  );
};

export default ModelReport;
