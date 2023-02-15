import React, { useState } from 'react';
import { useRouter } from 'next/router';
import RepoCard from '../explore/RepoCard';
import { useTranslation } from 'next-i18next';
import { Collection } from '@modules/explore/type';
import classnames from 'classnames';
import jsonData from '../../../script/tmp/collections.json';
import {
  useBulkOverviewQuery,
  useCollectionHottestQuery,
} from '@graphql/generated';
import client from '@graphql/client';
import { getPathname, getCompareAnalyzeLink } from '@common/utils';
import Compare from './assets/compare.svg';

const collections = jsonData as unknown as Record<string, Collection>;

const MainContent = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [select, setSelect] = useState(false);
  const { t, i18n } = useTranslation();
  const nameKey = i18n.language === 'zh' ? 'name_cn' : 'name';

  const ident = Object.keys(collections).find((ident) => {
    return collections[ident].slug === `/${slug}`;
  });
  const collection = ident ? collections[ident] : null;
  const length = collection?.items.length;

  const labelList = collection?.items || [];
  const { data: bulkOverview } = useBulkOverviewQuery(client, {
    labels: labelList,
  });
  const selectList: string[] = [];
  return (
    <div className="flex-1 px-8 py-4">
      <div className="flex justify-between pb-5">
        <div className="">
          <div className="text-xl font-bold">
            {collection && collection[nameKey]}
          </div>
          <div className="text-xs text-gray-400">
            {t('collection:repositories', { length: length })}
          </div>
        </div>
        <div className="pt-2">
          {select ? (
            <div className="flex text-xs ">
              <div className="text-sm leading-8 text-gray-400">
                {t('collection:please_select_two_or_more_repositories_below')}
              </div>
              <div
                onClick={() => {
                  setSelect(false);
                }}
                className="ml-5 h-8 cursor-pointer border border-gray-500 px-3 py-2 text-center text-xs text-black "
              >
                {t('collection:cancel')}
              </div>
              <div
                onClick={() => {
                  router.push(getCompareAnalyzeLink(selectList, 'repo'));
                  // setSelect(false);
                }}
                className="ml-2 h-8 cursor-pointer border-0 border-gray-500 bg-blue-600 px-3 py-2 text-center text-xs text-gray-50"
              >
                {t('collection:compare')}
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setSelect(true);
              }}
              className="h-8 w-36 flex-none cursor-pointer border border-gray-500 text-center text-xs font-semibold leading-8"
            >
              <div className="mr-2 inline-block align-text-bottom">
                <Compare></Compare>
              </div>

              {t('collection:pick_for_compare')}
            </div>
          )}
        </div>
      </div>
      <div>
        <div
          className={classnames(
            'grid flex-1 gap-6',
            '>2xl:grid-cols-5',
            '2xl:grid-cols-5',
            'xl:grid-cols-4',
            'lg:grid-cols-3',
            'md:grid-cols-2',
            'sm:grid-cols-1'
          )}
        >
          {collection?.items?.map((label) => {
            const pathname = getPathname(label);
            const overview = bulkOverview?.bulkOverview.find(
              (i) => i.path === pathname
            );
            const chartData = overview?.metricActivity.map(
              (i) => i.activityScore as number
            );
            return (
              <div className="w-full" key={label}>
                <RepoCard
                  key={label}
                  label={label}
                  chartData={chartData}
                  checked={select}
                  checkedFun={(e, label) => {
                    if (e) {
                      selectList.push(label);
                    } else {
                      selectList.splice(selectList.indexOf(label), 1);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
