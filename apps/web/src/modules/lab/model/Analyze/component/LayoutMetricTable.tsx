import React from 'react';
import CardMetricTable from './CardMetricTable';
import BaseCard from '@common/components/BaseCard';
import { useTranslation } from 'next-i18next';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import { tableMetricFilterOpts } from './utils';

const MetricTable = ({ metric, compareItems }) => {
  const { t } = useTranslation();
  const { timeStart, timeEnd } = useQueryDateRange();

  return (
    <div className="relative mb-12 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-1">
      {compareItems?.map((item) => {
        return (
          <BaseCard
            key={metric.id}
            id={metric.id}
            title={
              t(`lab_metrics:${metric.category}.${metric.ident}`) +
              ` (${item.name})`
            }
            description={t(
              `lab_metrics:${metric.category}.${metric.ident}_desc`
            )}
            headRight={() => <></>}
            bodyClass={'max-h-[800px] overflow-auto'}
            bodyRender={() => {
              return (
                <>
                  <CardMetricTable
                    label={item.label}
                    level={item.level}
                    beginDate={timeStart}
                    endDate={timeEnd}
                    key={metric.id}
                    defaultFilterOpts={tableMetricFilterOpts(metric.ident)}
                  />
                </>
              );
            }}
          />
        );
      })}
    </div>
  );
};

const LayoutMetricTable = ({ tableMetricList, compareItems }) => {
  console.log(tableMetricList, compareItems);
  return (
    <div>
      {tableMetricList?.map((metric) => {
        return (
          <MetricTable
            key={metric.id}
            metric={metric}
            compareItems={compareItems}
          />
        );
      })}
    </div>
  );
};

export default LayoutMetricTable;
