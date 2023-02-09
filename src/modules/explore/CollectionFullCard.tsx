import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';
import Link from 'next/link';
import {
  getRepoName,
  getNameSpace,
  getAnalyzeLink,
  getProvider,
  getPathname,
} from '@common/utils';
import { Collection } from './type';
import { useTranslation } from 'next-i18next';
import MiniChart from '@common/components/EChartX/MiniChart';
import {
  useBulkOverviewQuery,
  useCollectionHottestQuery,
} from '@graphql/generated';
import client from '@graphql/client';

const CollectionFullCard = (props: { collection: Collection }) => {
  const { collection } = props;
  const { t, i18n } = useTranslation();
  const length = collection.items.length;
  const showPreviousThree = collection.items.slice(0, 3);
  const { data: hottestData, isLoading } = useCollectionHottestQuery(client, {
    ident: collection.ident,
  });
  const showHottestData =
    hottestData?.collectionHottest?.map((i) => i.label) || [];
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
                {showHottestData.map((label) => {
                  return (
                    <Link
                      key={label}
                      href={getAnalyzeLink({ label: label, level: 'repo' })}
                    >
                      <a className="block truncate text-sm hover:underline">
                        {getRepoName(label!)}
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
              const repo = getRepoName(label);
              const pathname = getPathname(label);
              const nameSpace = getNameSpace(label);
              const provider = getProvider(label);
              const overview = bulkOverview?.bulkOverview.find(
                (i) => i.path === pathname
              );
              const chartData = overview?.metricActivity.map(
                (i) => i.activityScore as number
              );

              return (
                <Link
                  key={label}
                  href={getAnalyzeLink({ label: label, level: 'repo' })}
                >
                  <div className="w-full cursor-pointer border py-4 px-6">
                    <div className="h-20">
                      <p className="mb-1 truncate break-words text-xl font-bold hover:underline">
                        {repo}
                      </p>
                      <p className="h-6 truncate text-sm text-gray-400">
                        {nameSpace}
                      </p>
                    </div>
                    <div className="flex w-full items-center">
                      <div className="mr-auto flex-1">
                        {provider ? (
                          provider === 'gitee' ? (
                            <SiGitee className="inline-block h-5 w-5 text-[#c71c27]" />
                          ) : (
                            <AiFillGithub className="inline-block h-5 w-5 text-[#000000]" />
                          )
                        ) : (
                          ''
                        )}
                      </div>
                      <MiniChart data={chartData} />
                    </div>
                  </div>
                </Link>
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
