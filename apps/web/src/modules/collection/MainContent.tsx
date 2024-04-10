import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import RepoCard from '../explore/RepoCard';
import { useTranslation } from 'next-i18next';
import { Collection } from '@modules/explore/type';
import classnames from 'classnames';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import {
  useCollectionListQuery,
  CollectionListQuery,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Button } from '@oss-compass/ui';
import last from 'lodash/last';
import MainHeader from './MainHeader';
import MainMobileHeader from './MainMobileHeader';

const RenderList = ({
  total,
  isLoading,
  compareMode,
  data,
  compareIds,
  onCompareIdsChange,
}: {
  total: number;
  isLoading: boolean;
  compareMode: boolean;
  data?: InfiniteData<CollectionListQuery>;
  compareIds: string[];
  onCompareIdsChange: (ids: string[]) => void;
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col ">
        <div className="animate-pulse p-4">
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
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="py-10 text-center text-gray-400">
        {t('common:no_data')}
      </div>
    );
  }

  return (
    <div
      className={classnames(
        'grid flex-1 gap-6',
        '>2xl:grid-cols-5',
        '2xl:grid-cols-5',
        'xl:grid-cols-4',
        'lg:grid-cols-3',
        'md:grid-cols-2 md:gap-4',
        'sm:grid-cols-1'
      )}
    >
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.collectionList.items?.map(
            ({ origin, metricActivity, path, shortCode }) => {
              const chartData = metricActivity.map(
                (i) => i.activityScore as number
              );
              return (
                <div className="w-full" key={origin}>
                  <RepoCard
                    label={origin!}
                    shortCode={shortCode!}
                    chartData={chartData}
                    compareMode={compareMode}
                    onSelectChange={(checked, { shortCode }) => {
                      if (checked) {
                        onCompareIdsChange([...compareIds, shortCode]);
                      } else {
                        compareIds.splice(compareIds.indexOf(shortCode), 1);
                        onCompareIdsChange([...compareIds]);
                      }
                    }}
                  />
                </div>
              );
            }
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const MainContent = ({
  collectionArray,
}: {
  collectionArray: Collection[];
}) => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { t, i18n } = useTranslation();
  const nameKey = i18n.language === 'zh' ? 'name_cn' : 'name';

  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('');
  useEffect(() => {
    setKeyword('');
  }, [slug, router]);
  const params = {
    ident: slug,
    page: 1,
    per: 30,
    keyword,
    sortOpts: [{ type: 'activity_score', direction: 'asc' }],
  };
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    useCollectionListQuery.getKey(params),
    async ({ pageParam }) => {
      return await useCollectionListQuery.fetcher(client, {
        ...params,
        ...pageParam,
      })();
    },
    {
      getNextPageParam: (lastPage) => {
        const page = lastPage?.collectionList?.page! || 0;
        const totalPage = lastPage?.collectionList?.totalPage! || 0;
        if (totalPage > page) {
          return { page: page + 1 };
        }
        return null;
      },
    }
  );

  const lastItem = last(data?.pages);
  const total = lastItem?.collectionList.count || 0;
  console.log(data, lastItem, total, hasNextPage);
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full">
        <MainHeader
          slug={slug}
          nameKey={nameKey}
          compareIds={compareIds}
          total={total}
          compareMode={compareMode}
          onCompareModeChange={(v) => setCompareMode(v)}
          keyword={keyword}
          setKeyword={(v) => {
            console.log(v);
            setKeyword(v);
          }}
        />

        <MainMobileHeader
          slug={slug}
          nameKey={nameKey}
          collectionArray={collectionArray}
          total={total}
        />

        <div className={classnames('px-8 pb-10', 'md:px-4')}>
          <RenderList
            isLoading={isLoading}
            data={data}
            total={total}
            compareMode={compareMode}
            compareIds={compareIds}
            onCompareIdsChange={(ids) => {
              setCompareIds(ids);
            }}
          />

          {isLoading ? null : (
            <div className="flex justify-center py-6">
              {total > 0 ? (
                <Button
                  intent={'text'}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <div>{t('common:loading_more')}</div>
                  ) : hasNextPage ? (
                    <div className={'text-primary cursor-pointer'}>
                      {t('common:load_more')}
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      {t('common:nothing_more_to_load')}
                    </div>
                  )}
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
