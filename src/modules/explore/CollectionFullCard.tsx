import React from 'react';
import Link from 'next/link';
import { getRepoName, getAnalyzeLink, getPathname } from '@common/utils';
import { Collection } from './type';
import { useTranslation } from 'next-i18next';
import {
  useBulkOverviewQuery,
  useCollectionHottestQuery,
} from '@graphql/generated';
import client from '@graphql/client';
import RepoCard from '@modules/explore/RepoCard';
import { Level } from '@modules/analyze/constant';

const CollectionFullCard = (props: { collection: Collection }) => {
  const { collection } = props;
  const { t, i18n } = useTranslation();
  const length = collection.items.length;
  const showPreviousThree = collection.items.slice(0, 3);
  const { data: hottestData, isLoading } = useCollectionHottestQuery(client, {
    ident: collection.ident,
  });
  const showHottestData = hottestData?.collectionHottest || [];
  const { data: bulkOverview } = useBulkOverviewQuery(client, {
    labels: showPreviousThree,
  });
  const nameKey = i18n.language === 'zh' ? 'name_cn' : 'name';

  return (
    <div className="mb-6 rounded-xl bg-white p-7 shadow">
      <div className="flex">
        <div className="w-[250px]">
          <Link href={`/collection${collection.slug}`}>
            <a className="mb-2 block truncate text-xl font-bold hover:underline">
              {collection[nameKey]}
            </a>
          </Link>
          <div className="mb-4 text-sm text-[#868690]">
            {t('collection:repositories', { length: length })}
          </div>
          <div className="mb-2 text-sm font-medium">
            {t('collection:recently_hottest')}
          </div>
          <div>
            {isLoading ? (
              <div className="flex animate-pulse">
                <div className="flex-1 space-y-6 pt-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                    <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                    <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                    <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                    <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {showHottestData.map(({ label, level }) => {
                  return (
                    <Link key={label} href={getAnalyzeLink({ label, level })}>
                      <a className="flex w-full items-center text-sm hover:underline">
                        <span className="mr-1 h-1 w-1 flex-shrink-0 bg-black" />
                        <span className="truncate">
                          {level === Level.REPO ? getPathname(label!) : label}
                        </span>
                      </a>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 items-end pl-5">
          <div className="grid flex-1 grid-cols-3 gap-6">
            {showPreviousThree.map((label) => {
              const pathname = getPathname(label);
              const overview = bulkOverview?.bulkOverview.find(
                (i) => i.path === pathname
              );
              const chartData = overview?.metricActivity.map(
                (i) => i.activityScore as number
              );
              return (
                <RepoCard key={label} label={label} chartData={chartData} />
              );
            })}
          </div>
        </div>
      </div>
      <Link href={`/collection${collection.slug}`}>
        <div className="mt-4 flex cursor-pointer justify-end text-xs hover:underline">
          {t('collection:more_repositories')}
        </div>
      </Link>
    </div>
  );
};

export default CollectionFullCard;
