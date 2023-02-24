import React, { useState, useRef, useEffect } from 'react';
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
import { AiFillCaretDown } from 'react-icons/ai';

const collections = jsonData as unknown as Record<string, Collection>;

const MainContent = ({ items }: { items: Collection[] }) => {
  const router = useRouter();
  const selectRef = useRef<HTMLSelectElement>(null);
  const { slug } = router.query;
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
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

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const checkEle = selectRef.current?.querySelector('option:checked');
        const helper = document.getElementById('select-element-width-helper')!;
        if (helper) {
          helper.innerHTML = checkEle!.innerHTML;
          const width = helper.offsetWidth;
          selectRef.current!.style.width = `${width + 10}px`;
        }
      } catch (e) {
        console.log(e);
      }
    }, 0);
    return () => {
      clearTimeout(t);
    };
  }, [slug]);

  const CompareBar = (
    <div className="flex px-8 pt-4 pb-5 md:hidden">
      <div className="mr-8">
        <div className="text-xl font-bold">
          {collection && collection[nameKey]}
        </div>
        <div className="text-xs text-gray-400">
          {t('collection:repositories', { length: length })}
        </div>
      </div>
      <div className="pt-1">
        {compareMode ? (
          <div className="flex text-xs ">
            <div className="text-sm leading-8 text-gray-400">
              {t('collection:please_select_two_or_more_repositories_below')}
            </div>
            <div
              onClick={() => {
                setCompareMode(false);
              }}
              className="ml-5 h-8 cursor-pointer border border-gray-500 px-3 py-2 text-center text-xs text-black "
            >
              {t('collection:cancel')}
            </div>
            <div
              onClick={async () => {
                if (compareList.length > 1) {
                  await router.push(getCompareAnalyzeLink(compareList, 'repo'));
                }
                // setSelect(false);
              }}
              className={classnames(
                'ml-2 h-8 cursor-pointer border-0 border-gray-500 bg-blue-600 px-3 py-2 text-center text-xs text-gray-50',
                { 'bg-gray-300': compareList.length < 2 }
              )}
            >
              {t('collection:compare')}
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setCompareMode(true);
            }}
            className="h-8 w-36 flex-none cursor-pointer border border-gray-500 text-center text-xs font-semibold leading-8"
          >
            <div className="mr-2 inline-block align-text-bottom">
              <Compare />
            </div>

            {t('collection:pick_for_compare')}
          </div>
        )}
      </div>
    </div>
  );

  const MobileBar = (
    <>
      <div className="mb-4 flex flex h-11 items-center justify-between border-b bg-white px-4 >md:hidden">
        <div className="flex items-center">
          <select
            ref={selectRef}
            className={classnames(
              'appearance-none bg-white font-medium outline-0'
            )}
            value={`/${slug}`}
            onChange={async (e) => {
              const collectionSlug = e.target.value;
              await router.push(`/collection${collectionSlug}`);
            }}
          >
            {items.map((item) => {
              return (
                <option key={item.ident} value={item.slug}>
                  {`${item[nameKey]}`}
                </option>
              );
            })}
          </select>
          <div className="text-xs">
            <AiFillCaretDown />
          </div>
        </div>
        <div className="text-xs text-gray-400">
          {t('collection:repositories', { length: length })}
        </div>
      </div>
      <span
        id="select-element-width-helper"
        className="absolute -left-[9999px]  appearance-none bg-white font-medium outline-0"
      />
    </>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full">
        {CompareBar}
        {MobileBar}
        <div className={classnames('px-8 pb-10', 'md:px-4')}>
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
                    compareMode={compareMode}
                    onSelectChange={(checked, label) => {
                      if (checked) {
                        setCompareList((pre) => [...pre, label]);
                      } else {
                        setCompareList((pre) => {
                          pre.splice(pre.indexOf(label), 1);
                          return [...pre];
                        });
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
