import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { BsCodeSquare } from 'react-icons/bs';
import { SiGitee } from 'react-icons/si';
import Image from 'next/image';
import { TrendingQuery } from '@oss-compass/graphql';
import { formatLabel } from '@common/utils/format';
import { getShortAnalyzeLink } from '@common/utils/links';
import { getGithubPng } from '@common/utils/url';
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

const Avatar = ({ item }: { item: TrendingQuery['trending'][number] }) => {
  return (
    <>
      {item.origin === 'github' ? (
        <div className="h-10 w-10 overflow-hidden rounded-full border">
          <Image
            src={getGithubPng(item.label) || ''}
            unoptimized
            width={40}
            height={40}
            style={{
              objectFit: 'cover',
            }}
            alt="icon"
          />
        </div>
      ) : (
        <SiGitee className="h-10 w-10 text-[#c71c27]" />
      )}

      {item.origin === 'github' ? (
        <div className="absolute -bottom-0.5 -right-0.5 z-10 rounded-full bg-white p-0.5">
          <ProviderIcon provider={item.origin || ''} />
        </div>
      ) : null}
    </>
  );
};

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
          <Link
            key={item.label}
            href={getShortAnalyzeLink(item.shortCode)}
            className="flex cursor-pointer justify-between border-b py-3 last:border-0"
          >
            {/*<Link*/}
            {/*  key={item.label}*/}
            {/*  href={getAnalyzeLink({ label: item.label, level: item.level })}*/}
            {/*>*/}

            <div className="flex">
              <div className="relative h-10 w-10">
                <Avatar item={item} />
              </div>

              <div className="ml-4">
                <div className="mb-1 font-bold">{info.name}</div>
                <div className="flex items-center">
                  {info.namespace ? (
                    <span className="text-secondary text-xs">
                      {info.namespace}
                    </span>
                  ) : null}

                  {item?.level === Level.COMMUNITY ? (
                    <div className="text-steel flex items-center text-xs">
                      <BsCodeSquare />
                      <span className="ml-1">
                        {`${item?.reposCount} ${t('analyze:repos')}`}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-1 text-right font-medium italic">
                {transHundredMarkSystem(item.activityScore || 0)}
              </div>
              <div className="text-secondary text-xs">{t('home:activity')}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListPanel;
