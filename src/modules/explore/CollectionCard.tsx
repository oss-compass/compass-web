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
import { useCollectionHottestQuery } from '@graphql/generated';
import client from '@graphql/client';
import { Level } from '@modules/analyze/constant';

const CollectionCard = (props: { collection: Collection }) => {
  const { collection } = props;
  const { t, i18n } = useTranslation();
  const length = collection.items.length;
  const { data: hottestData, isLoading } = useCollectionHottestQuery(client, {
    ident: collection.ident,
  });
  const showHottestData = hottestData?.collectionHottest || [];
  const nameKey = i18n.language === 'zh' ? 'name_cn' : 'name';
  return (
    <div className="rounded-xl bg-white p-7 shadow">
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
                      {level === Level.REPO ? getRepoName(label!) : label}
                    </span>
                  </a>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
