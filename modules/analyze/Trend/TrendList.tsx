import React from 'react';
import type { PropsWithChildren, ComponentProps } from 'react';
import classnames from 'classnames';
import BaseCard from '@common/components/BaseCard';
import styles from './index.module.scss';
import { MetricQuery } from '@graphql/generated';
import { getLastPathSegment } from '@common/utils/url';

const TT: React.FC<PropsWithChildren<ComponentProps<'th'>>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={classnames(
        'w-72 border-t border-b border-b-[#ffffff] py-4 text-center font-semibold',
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

const TrendsList: React.FC<{
  loading: boolean;
  data: { label: string; result: MetricQuery | undefined }[];
}> = ({ loading, data }) => {
  return (
    <BaseCard
      loading={loading}
      title="Trending"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      <table className={classnames(styles.table, 'w-full')}>
        <thead>
          <tr className="">
            <th style={{ width: '15%' }} />
            <TT className="border-t-[#90E6FF] bg-[#f2fcff]">Code quality</TT>
            <TT className="border-t-[#FFB290] bg-[#fff9f3]">
              Community support
            </TT>
            <TT className="border-t-[#B990FF] bg-[#f8f3ff]">
              Community activity
            </TT>
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
          {Array.isArray(data) &&
            data.map((item, index) => {
              return (
                <tr className="" key={item.label}>
                  <td>{getLastPathSegment(item.label)}</td>
                  {/*<Td className="bg-[#f2fcff]">122</Td>*/}
                  <Td className="bg-[#f2fcff]">122</Td>
                  {/*<Td className="bg-[#fff9f3]">122</Td>*/}
                  <Td className="bg-[#fff9f3]">122</Td>
                  {/*<Td className="bg-[#f8f3ff]">122</Td>*/}
                  <Td className="bg-[#f8f3ff]">122</Td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </BaseCard>
  );
};

export default TrendsList;
