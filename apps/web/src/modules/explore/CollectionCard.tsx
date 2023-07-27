import React, { useRef, useEffect } from 'react';
import { useInViewport } from 'ahooks';
import Link from 'next/link';
import { getShortAnalyzeLink, getPathname } from '@common/utils';
import { Collection } from './type';
import { useTranslation } from 'next-i18next';
import { useCollectionHottestQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { Level } from '@modules/analyze/constant';

const CollectionCard = (props: { collection: Collection }) => {
  const { collection } = props;
  const fetched = useRef<Boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(ref);
  const { t, i18n } = useTranslation();
  const length = collection.items.length;

  const { data: hottestData, isLoading } = useCollectionHottestQuery(
    client,
    {
      ident: collection.ident,
    },
    {
      enabled: Boolean(inViewport && !fetched.current),
      onSuccess: () => {
        fetched.current = true;
      },
    }
  );

  const showHottestData = hottestData?.collectionHottest || [];
  const nameKey = i18n.language === 'zh' ? 'name_cn' : 'name';

  return (
    <div className="rounded-xl bg-white p-7 shadow" ref={ref}>
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
            {showHottestData.map(({ label, level, shortCode }) => {
              return (
                <Link key={label} href={getShortAnalyzeLink(shortCode)}>
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
  );
};
export default CollectionCard;
