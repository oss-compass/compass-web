import React from 'react';
import { OverviewQuery } from '@graphql/generated';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { formatToNow, getAnalyzeLink, getLastPathSegment } from '@common/utils';
import { Level } from '@modules/analyze/constant';

const RecentlyJoinIn = (props: { list?: OverviewQuery['recentUpdates'] }) => {
  const { list } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:px-4 lg:pb-10">
      <div className="mb-6 text-2xl font-bold">{t('home:recently')}</div>
      <div className="relative h-[307px] w-[496px] rounded border lg:w-full">
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto py-3 px-6">
          {list?.map((item, index) => {
            const isLast = list?.length === index + 1;
            return (
              <Link
                key={item.label}
                href={getAnalyzeLink({
                  label: item.label,
                  level: item.level,
                })}
              >
                <a className="group mb-6 flex justify-between">
                  <div className="flex items-center">
                    <div className="relative mr-4">
                      {!isLast && (
                        <div className="absolute left-0.5 top-0.5 h-12 w-0.5 bg-[#DFDFDF]" />
                      )}
                      <div className="relative h-1.5 w-1.5 rounded bg-[#C6C6C6]"></div>
                    </div>
                    <div className="cursor-pointer group-hover:underline">
                      {item.level === Level.REPO
                        ? getLastPathSegment(item.label!)
                        : item.label}
                    </div>
                  </div>
                  <div className="text-sm text-[#868690]">
                    {`${formatToNow(item.updatedAt)} ${t('common:ago')}`}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default RecentlyJoinIn;
