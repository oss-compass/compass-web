import React, { useState } from 'react';
import Link from 'next/link';
import type { PropsWithChildren, ComponentProps } from 'react';
import classnames from 'classnames';
import { BsCodeSquare } from 'react-icons/bs';
import BaseCard from '@common/components/BaseCard';
import { useMetricModelsOverviewQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { useQueries } from '@tanstack/react-query';
import { formatISO, getShortAnalyzeLink, toFixed } from '@common/utils';
import transHundredMarkSystem from '@common/transform/transHundredMarkSystem';
import { Topic } from '@modules/analyze/components/SideBar/config';
import { formatRepoName } from '@common/utils/format';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import { useTranslation } from 'next-i18next';
import { Level } from '@modules/analyze/constant';
import { chartUserSettingState } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';
import useQueryMetricType from '@modules/analyze/hooks/useQueryMetricType';

const getModelScore = (list, models) => {
  return list.map((item) => {
    const obj = {};
    if (item.length > 0) {
      obj['label'] = item[0].label;
      obj['level'] = item[0].level;
      obj['activityScoreUpdatedAt'] = item[0].grimoireCreationDate;
    }
    const tableData = models.map((z) => {
      const s = item.find((y) => y.ident === z.key);
      return { mainScore: s?.mainScore, key: z.key };
    });
    obj['tableData'] = tableData;
    return obj;
  });
};

const borderList = [
  'border-t-[#90E6FF]',
  'border-t-[#FFB290]',
  'border-t-[#B990FF]',
  'border-t-[#61a2ff]',
];
const bgList = ['bg-[#f2fcff]', 'bg-[#fff9f3]', 'bg-[#f8f3ff]', 'bg-[#ddebff]'];
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
  const models = [
    {
      name: t('analyze:all_model:collaboration_development_index'),
      key: 'collab_dev_index',
      value: null,
      scope: 'collaboration',
    },
    {
      name: t('analyze:all_model:community_service_and_support'),
      key: 'community',
      value: null,
      scope: 'collaboration',
    },
    {
      name: t('analyze:all_model:community_activity'),
      key: 'activity',
      value: null,
      scope: 'collaboration',
    },
    {
      name: t('analyze:all_model:organization_activity'),
      key: 'organizations_activity',
      value: null,
      scope: 'collaboration',
    },
    {
      name: t('analyze:all_model:contributors_milestone_persona'),
      key: 'milestone_persona',
      value: null,
      scope: 'contributor',
    },

    {
      name: t('analyze:all_model:contributors_role_persona'),
      key: 'role_persona',
      value: null,
      scope: 'contributor',
    },
    {
      name: t('analyze:all_model:contributors_domain_persona'),
      key: 'domain_persona',
      value: null,
      scope: 'contributor',
    },
  ];
  const [onePointSys, setOnePointSys] = useState(false);

  const { compareItems } = useCompareItems();
  const snap = useSnapshot(chartUserSettingState);
  const rType = snap.repoType;
  const topicType = useQueryMetricType();
  const tHeader = models.filter((item) => item.scope === topicType);
  const data = useQueries({
    queries: compareItems.map(({ label, level }) => {
      const repoType = level === Level.COMMUNITY ? rType : null;
      return {
        queryKey: useMetricModelsOverviewQuery.getKey({
          label,
          level,
          repoType,
        }),
        queryFn: useMetricModelsOverviewQuery.fetcher(client, {
          label,
          level,
          repoType,
        }),
      };
    }),
  });
  const loading = data.some((i) => i.isLoading);
  const AllList = data.map((i) => i.data?.metricModelsOverview).filter(Boolean);
  const list = getModelScore(AllList, tHeader);
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
        <table className={classnames('w-full table-auto')}>
          <thead>
            <tr className="">
              <th style={{ width: '15%' }} />
              {tHeader.map((item, index) => {
                return (
                  <TT
                    key={item.name}
                    className={classnames(borderList[index], bgList[index])}
                  >
                    {item.name}
                  </TT>
                );
              })}
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
                      <Link href={getShortAnalyzeLink(item!.shortCode)}>
                        <p className="break-words text-sm font-bold md:w-[140px]">
                          {r.name}
                          {item?.level === Level.COMMUNITY ? (
                            <span className="ml-2 inline-block rounded-[10px] bg-[#FFF9F2] px-2 py-0.5 text-xs font-normal text-[#D98523]">
                              {t('home:community')}
                            </span>
                          ) : null}
                        </p>
                        <p className="break-words text-xs text-gray-600 md:w-[140px]">
                          {r.meta?.namespace}
                          {r.meta?.showProvider
                            ? ` on ${r.meta?.provider}`
                            : ''}
                        </p>
                        {item?.level === Level.COMMUNITY ? (
                          <div className="text-steel mb-1 mt-1 flex items-center text-xs">
                            {/* <BsCodeSquare />
                            <span className="ml-1">
                              {item?.reposCount}
                              {t('analyze:repos')}
                            </span> */}
                          </div>
                        ) : null}
                        <p className={'text-xs text-gray-400'}>
                          {`${t('analyze:updated_on')} ${formatISO(
                            item!.activityScoreUpdatedAt!
                          )}`}
                        </p>
                      </Link>
                    </td>
                    {tHeader.map((z, i) => {
                      return (
                        <Td
                          key={z.name}
                          className={classnames(borderList[i], bgList[i])}
                        >
                          {formatScore(item.tableData[i].mainScore)}
                        </Td>
                      );
                    })}
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
