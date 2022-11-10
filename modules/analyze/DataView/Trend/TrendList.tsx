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
import { getLastPathSegment } from '@common/utils/url';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { formatISO, toFixed } from '@common/utils';
import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';
import { Topic } from '@modules/analyze/Misc/SideBar/config';

const TT: React.FC<PropsWithChildren<ComponentProps<'th'>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={classnames(
        'w-1/4 border-t border-b border-b-[#ffffff] py-4 text-center font-semibold md:text-sm',
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
      <table className={classnames(styles.table, 'w-full')}>
        <thead>
          <tr className="">
            <th style={{ width: '15%' }} />
            <TT className="border-t-[#90E6FF] bg-[#f2fcff]">
              Code Quality Guarantee
            </TT>
            <TT className="border-t-[#FFB290] bg-[#fff9f3]">
              Community Service and Support
            </TT>
            <TT className="border-t-[#B990FF] bg-[#f8f3ff]">Activity</TT>
          </tr>
          {/*<tr>*/}
          {/*  <th></th>*/}
          {/*  <Th className="bg-[#f2fcff]">Code quality</Th>*/}
          {/*  <Th className="bg-[#f2fcff]">Community support</Th>*/}
          {/*  <Th className="bg-[#fff9f3]">Community activity</Th>*/}
          {/*  <Th className="bg-[#fff9f3]">Developer Retention</Th>*/}
          {/*  <Th className="bg-[#f8f3ff]">Diversity</Th>*/}
          {/*  <Th className="bg-[#f8f3ff]">Developer Attraction</Th>*/}
          {/*</tr>*/}
        </thead>
        <tbody>
          {Array.isArray(list) &&
            list.map((item, index) => {
              return (
                <tr className="" key={item!.label}>
                  <td className="flex flex-col px-1">
                    <p className="break-words md:w-[140px]">
                      {getLastPathSegment(item!.label!)}
                    </p>
                    <p className={'text-xs text-gray-400'}>
                      {`update at ${formatISO(item!.activityScoreUpdatedAt!)}`}
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
                </tr>
              );
            })}
        </tbody>
      </table>
    </BaseCard>
  );
};

export default TrendsList;
