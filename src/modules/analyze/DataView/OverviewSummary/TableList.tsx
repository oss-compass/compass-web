import React, { useState } from 'react';
import Link from 'next/link';
import type { PropsWithChildren, ComponentProps } from 'react';
import classnames from 'classnames';
import { HiOutlineCodeBracketSquare } from 'react-icons/hi2';
import BaseCard from '@common/components/BaseCard';
import { useLatestMetricsQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { formatISO, getAnalyzeLink, toFixed } from '@common/utils';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { Topic } from '@modules/analyze/components/SideBar/config';
import { formatRepoName } from '@modules/analyze/options/format';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import { useTranslation } from 'next-i18next';
import styles from './index.module.scss';
import { Level } from '@modules/analyze/constant';

const TT: React.FC<PropsWithChildren<ComponentProps<'th'>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={classnames(
        'min-w-[150px] border-t-2 border-b border-b-[#ffffff] py-4 text-center font-semibold md:text-sm',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};

const Th: React.FC<PropsWithChildren<ComponentProps<'th'>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={classnames(
        'border-b border-b-white py-4 text-center font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};

const Td: React.FC<PropsWithChildren<ComponentProps<'td'>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={classnames(
        'border-b border-b-white py-4 text-center',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};

const TrendsList: React.FC = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const { compareItems } = useCompareItems();
  const data = useQueries({
    queries: compareItems.map(({ label, level }) => {
      return {
        queryKey: useLatestMetricsQuery.getKey({
          label,
          level,
        }),
        queryFn: useLatestMetricsQuery.fetcher(client, {
          label,
          level,
        }),
      };
    }),
  });

  const loading = data.some((i) => i.isLoading);
  const list = data.map((i) => i.data?.latestMetrics).filter(Boolean);
  const labels = list.map((item) => item?.label).filter(Boolean) as string[];

  const formatScore = (num: number | null | undefined) => {
    if (num === undefined || num === null) return '-';
    return onePointSys ? toFixed(num, 3) : transHundredMarkSystem(num);
  };

  return (
    <BaseCard
      loading={loading}
      title={t('analyze:overview')}
      id={Topic.Overview}
      className="mb-10"
      description=""
      bodyClass={'min-h-[200px]'}
      headRight={
        <ScoreConversion
          onePoint={onePointSys}
          onChange={(v) => {
            setOnePointSys(v);
          }}
        />
      }
    >
      <div className="overflow-auto">
        <table className={classnames(styles.table, 'w-full table-auto')}>
          <thead>
            <tr className="">
              <th style={{ width: '15%' }} />
              <TT className="border-t-[#90E6FF] bg-[#f2fcff]">
                {t('metrics_models:collaboration_development_index.title')}
              </TT>
              <TT className="border-t-[#FFB290] bg-[#fff9f3]">
                {t('metrics_models:community_service_and_support.title')}
              </TT>
              <TT className="border-t-[#B990FF] bg-[#f8f3ff]">
                {t('metrics_models:community_activity.title')}
              </TT>
              <TT className="border-t-[#61a2ff] bg-[#ddebff]">
                {t('metrics_models:organization_activity.title')}
              </TT>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) &&
              list.map((item, index) => {
                const r = formatRepoName({
                  label: item!.label!,
                  compareLabels: labels,
                });

                return (
                  <tr className="group" key={item!.label}>
                    <td className="flex flex-col px-1 py-2 ">
                      <Link
                        href={getAnalyzeLink({
                          label: item?.label,
                          level: item?.level,
                        })}
                      >
                        <a>
                          <p className="mb-1 break-words text-sm font-bold md:w-[140px]">
                            {r.name}
                          </p>
                          <p className="break-words text-xs text-gray-600 md:w-[140px]">
                            {r.meta?.namespace}
                            {r.meta?.showProvider
                              ? ` on ${r.meta?.provider}`
                              : ''}
                          </p>

                          {item?.level === Level.COMMUNITY ? (
                            <div className="mb-1 flex items-center text-xs text-gray-400">
                              <HiOutlineCodeBracketSquare className="mr-1" />
                              {item?.reposCount}
                              {t('analyze:repos')}
                            </div>
                          ) : null}

                          <p className={'text-xs text-gray-400'}>
                            {`${t('analyze:updated_on')} ${formatISO(
                              item!.activityScoreUpdatedAt!
                            )}`}
                          </p>
                        </a>
                      </Link>
                    </td>
                    <Td className="bg-[#f2fcff] ">
                      {formatScore(item!.codeQualityGuarantee)}
                    </Td>
                    <Td className="bg-[#fff9f3]">
                      {formatScore(item!.communitySupportScore)}
                    </Td>
                    <Td className="bg-[#f8f3ff]">
                      {formatScore(item!.activityScore)}
                    </Td>
                    <Td className="bg-[#ddebff] ">
                      {formatScore(item!.organizationsActivity)}
                    </Td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </BaseCard>
  );
};

export default TrendsList;
