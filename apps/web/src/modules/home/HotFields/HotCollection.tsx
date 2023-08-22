import React from 'react';
import { useTranslation } from 'react-i18next';
import jsonData from '@public/data/collections.json';
import ProjectItem from './ProjectItem';
import { useBulkShortenedLabelQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { NoSsr } from '@mui/base';
import Link from 'next/link';

const CollectionItem = (props: { itemKey: string }) => {
  const { t, i18n } = useTranslation();
  const { itemKey } = props;
  const { items, name, name_cn } = jsonData[itemKey];
  const labels = items.map((i: string) => {
    return { label: i, level: 'repo' };
  });
  const { data, isLoading } = useBulkShortenedLabelQuery(client, {
    labels,
  });
  if (isLoading) {
    return (
      <div className="h-[318px] w-[50%] rounded border py-5 pl-6 shadow">
        <div className="flex flex-1 flex-col bg-white">
          <div className="animate-pulse">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-3 h-6 rounded bg-slate-200"></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 h-4 rounded bg-slate-200"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3 h-5 rounded bg-slate-200"></div>
                <div className="col-span-3 h-5 rounded bg-slate-200"></div>
                <div className="col-span-3 h-5 rounded bg-slate-200"></div>
                <div className="col-span-3 h-5 rounded bg-slate-200"></div>
                <div className="col-span-3 h-5 rounded bg-slate-200"></div>
                <div className="col-span-3 h-5 rounded bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-[318px] w-[50%] rounded border py-5 pl-6 shadow">
      <div className="line-clamp-1 text-xl font-bold text-black">
        {i18n.language === 'en' ? name : name_cn}
      </div>
      <div className="mt-1 text-[#868690]">
        {t('home:repositories', { length: items?.length })}
      </div>
      <div className="flex h-[220px] flex-col gap-1 overflow-y-auto pt-1">
        {data?.bulkShortenedLabel.map((i) => {
          return (
            <ProjectItem shortCode={i.shortCode} url={i.label} key={i.label} />
          );
        })}
      </div>
    </div>
  );
};

const HotCollection = () => {
  const { t } = useTranslation();
  const keys = Object.keys(jsonData);
  const length = keys.length;
  const randomKey1 = keys[Math.floor(Math.random() * length)];
  let randomKey2 = keys[Math.floor(Math.random() * length)];
  if (randomKey2 === randomKey1) {
    randomKey2 = keys[Math.floor(Math.random() * length)];
  }
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <div className="text-2xl font-bold">{t('home:hot_collection')}</div>
        <Link href="/explore">
          <div className="mt-1 cursor-pointer hover:underline">
            {t('home:more')}
          </div>
        </Link>
      </div>
      <div className="flex gap-6">
        <NoSsr>
          <CollectionItem itemKey={randomKey1} />
          <CollectionItem itemKey={randomKey2} />
        </NoSsr>
      </div>
    </div>
  );
};

export default HotCollection;
