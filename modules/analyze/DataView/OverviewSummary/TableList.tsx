import React, { useState } from 'react';
import type { PropsWithChildren, ComponentProps } from 'react';
import classnames from 'classnames';
import BaseCard from '@common/components/BaseCard';
import styles from './index.module.scss';
import {
  MetricQuery,
  useLatestMetricsQuery,
  useMetricQuery,
} from '@graphql/generated';
import { getRepoName } from '@common/utils/url';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { formatISO, toFixed } from '@common/utils';
import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';
import { Topic } from '@modules/analyze/components/SideBar/config';
import { formatRepoName } from '@modules/analyze/DataTransform/transToAxis';
import { Level } from '@modules/analyze/constant';

const TT: React.FC<PropsWithChildren<ComponentProps<'th'>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={classnames(
        'min-w-[150px] border-t border-b border-b-[#ffffff] py-4 text-center font-semibold md:text-sm',
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
  const [markingSys, setMarkingSys] = useState(true);

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

  const hasOrganizations =
    !loading && data.some((i) => i.data!.latestMetrics?.organizationsActivity);
  return (
    <BaseCard
      loading={loading}
      title="Overview"
      id={Topic.Overview}
      className="mb-10"
      description=""
      showMarkingSysBtn={true}
      getMarkingSys={(val) => setMarkingSys(val)}
    >
      <div className="overflow-auto">
        <table className={classnames(styles.table, 'w-full table-auto')}>
          <thead>
            <tr className="">
              <th style={{ width: '15%' }} />
              <TT className="border-t-[#90E6FF] bg-[#f2fcff]">
                Code Quality Guarantee
              </TT>
              <TT className="border-t-[#FFB290] bg-[#fff9f3]">
                Community Service and Support
              </TT>
              <TT className="border-t-[#B990FF] bg-[#f8f3ff]">
                Community Activity
              </TT>
              {hasOrganizations && (
                <TT className="border-t-[#61a2ff] bg-[#ddebff]">
                  Organizations Activity
                </TT>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) &&
              list.map((item, index) => {
                return (
                  <tr className="" key={item!.label}>
                    <td className="flex flex-col px-1">
                      <p className="break-words md:w-[140px]">
                        {formatRepoName({
                          label: item!.label!,
                          level: item!.level as Level,
                          compareLabels: labels,
                        })}
                      </p>
                      <p className={'text-xs text-gray-400'}>
                        {`update at ${formatISO(
                          item!.activityScoreUpdatedAt!
                        )}`}
                      </p>
                    </td>
                    <Td className="bg-[#f2fcff]">
                      {markingSys
                        ? transMarkingSystem(item!.codeQualityGuarantee!)
                        : toFixed(item!.codeQualityGuarantee!, 3)}
                    </Td>
                    <Td className="bg-[#fff9f3]">
                      {markingSys
                        ? transMarkingSystem(item!.communitySupportScore!)
                        : toFixed(item!.communitySupportScore!, 3)}
                    </Td>
                    <Td className="bg-[#f8f3ff]">
                      {markingSys
                        ? transMarkingSystem(item!.activityScore!)
                        : toFixed(item!.activityScore!, 3)}
                    </Td>
                    {hasOrganizations && (
                      <Td className="bg-[#ddebff]">
                        {markingSys
                          ? transMarkingSystem(item!.organizationsActivity!)
                          : toFixed(item!.organizationsActivity!, 3)}
                      </Td>
                    )}
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
