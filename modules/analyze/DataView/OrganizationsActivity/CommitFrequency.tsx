import React, { useMemo } from 'react';
import {
  getLineOption,
  line,
  legendFormat,
  getTooltipsFormatter,
  getColorWithLabel,
  summaryLine,
} from '@modules/analyze/options';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpt = {
  legendName: 'commit frequency',
  xKey: 'grimoireCreationDate',
  yKey: 'metricGroupActivity.commitFrequency',
  summaryKey: 'summaryGroupActivity.commitFrequency',
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

const CommitFrequency = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t('metrics_models:organization_activity.metrics.commit_frequency')}
      id={Organizations.CommitFrequency}
      description={t(
        'metrics_models:organization_activity.metrics.commit_frequency_desc'
      )}
      docLink={
        '/docs/metrics-models/niche-creation/developer-retention/#commit-frequency'
      }
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

export default CommitFrequency;
