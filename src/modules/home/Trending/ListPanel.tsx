import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { BsCodeSquare } from 'react-icons/bs';
import { TrendingQuery } from '@oss-compass/graphql';
import { formatLabel } from '@common/utils/format';
import { getShortAnalyzeLink, getAnalyzeLink } from '@common/utils/links';
import ProviderIcon from '@common/components/ProviderIcon';
import transHundredMarkSystem from '@common/transform/transHundredMarkSystem';
import { Level } from '@modules/analyze/constant';

const Loading = () => (
  <div className="rounded border px-6 py-6 shadow">
    <div className="flex flex-1 flex-col bg-white">
      <div className="animate-pulse">
        <div className="flex-1 space-y-4 ">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 "></div>
            <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-1 h-4 rounded "></div>
            <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ListPanel = (props: {
  loading: boolean;
  trending: TrendingQuery['trending'];
}) => {
  const { t } = useTranslation();

  if (props.loading) {
    return <Loading />;
  }

  return (
    <div className="rounded border px-6 py-1 shadow">
      {props.trending.map((item) => {
        const info = formatLabel(item.label || '');
        return (
          <Link key={item.label} href={getShortAnalyzeLink(item.shortCode)}>
            {/*<Link*/}
            {/*  key={item.label}*/}
            {/*  href={getAnalyzeLink({ label: item.label, level: item.level })}*/}
            {/*>*/}
            <a className="flex cursor-pointer justify-between border-b py-3 last:border-0">
              <div className="">
                <div className="mb-1 font-bold">{info.name}</div>
                <div className="flex items-center">
                  <ProviderIcon provider={item.origin || ''} />

                  {info.namespace ? (
                    <span className="ml-2 text-xs text-secondary">
                      {info.namespace}
                    </span>
                  ) : null}

                  {item?.level === Level.COMMUNITY ? (
                    <div className="ml-2 flex items-center text-xs text-gray58">
                      <BsCodeSquare />
                      <span className="ml-1">
                        {`${item?.reposCount} ${t('analyze:repos')}`}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="mb-1 text-right font-medium italic">
                  {transHundredMarkSystem(item.activityScore || 0)}
                </div>
                <div className="text-xs text-secondary">
                  {t('home:activity')}
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default ListPanel;
