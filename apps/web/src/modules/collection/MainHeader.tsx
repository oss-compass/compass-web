import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Collection } from '@modules/explore/type';
import jsonData from '@public/data/collections.json';
import classnames from 'classnames';
import { getShortCompareLink } from '@common/utils';

import Compare from './assets/compare.svg';

const collectionsMap = jsonData as unknown as Record<string, Collection>;

const MainHeader = ({
  slug,
  nameKey,
  total,
  compareIds,
  compareMode,
  onCompareModeChange,
}: {
  slug: string;
  nameKey: 'name_cn' | 'name';
  total: number;
  compareIds: string[];
  compareMode: boolean;
  onCompareModeChange: (v: boolean) => void;
}) => {
  const router = useRouter();

  const { t } = useTranslation();

  const ident = Object.keys(collectionsMap).find((ident) => {
    return collectionsMap[ident].slug === `/${slug}`;
  });
  const collection = ident ? collectionsMap[ident] : null;

  return (
    <div className="flex px-8 pt-4 pb-5 md:hidden">
      <div className="mr-8">
        <div className="text-xl font-bold">
          {collection && collection[nameKey]}
        </div>
        <div className="text-xs text-gray-400">
          {t('collection:repositories', {
            length: total,
          })}
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
                onCompareModeChange(false);
              }}
              className="ml-5 h-8 cursor-pointer border border-gray-500 px-3 py-2 text-center text-xs text-black "
            >
              {t('collection:cancel')}
            </div>
            <div
              onClick={async () => {
                if (compareIds.length > 1) {
                  await window.open(getShortCompareLink(compareIds), '_blank');
                }
                // setSelect(false);
              }}
              className={classnames(
                'ml-2 h-8 cursor-pointer border-0 border-gray-500 bg-blue-600 px-3 py-2 text-center text-xs text-gray-50',
                { 'bg-gray-300': compareIds.length < 2 }
              )}
            >
              {t('collection:compare')}
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              onCompareModeChange(true);
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
};

export default MainHeader;
