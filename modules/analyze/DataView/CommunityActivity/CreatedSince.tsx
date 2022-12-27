import React, { useMemo } from 'react';
import {
  line,
  getLineOption,
  legendFormat,
  getTooltipsFormatter,
  getColorWithLabel,
  summaryLine,
} from '@modules/analyze/options';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';

const CreatedSince = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: 'created since',
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.createdSince',
    summaryKey: 'summaryActivity.createdSince',
  };

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults, summaryMedian, summaryMean },
    theme
  ) => {
    const series = yResults.map(({ legendName, label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: data,
        color,
      });
    });

    series.push(
      summaryLine({
        id: 'median',
        name: 'Median',
        data: summaryMedian,
        color: '#5B8FF9',
      })
    );
    series.push(
      summaryLine({
        id: 'average',
        name: 'Average',
        data: summaryMean,
        color: '#F95B5B',
      })
    );

    return getLineOption({
      xAxisData: xAxis,
      series,
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({ compareLabels }),
      },
    });
  };

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.created_since')}
      id={Activity.CreatedSince}
      description={t(
        'metrics_models:community_activity.metrics.created_since_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#created-since'}
    >
      {(ref) => {
        return (
          <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
            {(loading, option) => {
              return (
                <EChartX containerRef={ref} loading={loading} option={option} />
              );
            }}
          </ChartWithData>
        );
      }}
    </BaseCard>
  );
};

export default CreatedSince;
