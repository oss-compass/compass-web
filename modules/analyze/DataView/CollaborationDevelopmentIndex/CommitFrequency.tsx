import React from 'react';
import {
  line,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  getColorWithLabel,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import BaseCard from '@common/components/BaseCard';
import ChartWithDataV2 from '@modules/analyze/components/ChartWithDataV2';
import EChartX from '@common/components/EChartX';

import { useTranslation } from 'next-i18next';

const CommitFrequency = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: 'commit frequency',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.commitFrequency',
    summaryKey: 'summaryCodequality.commitFrequency',
  };

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults },
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
      title={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency'
      )}
      id={CollaborationDevelopment.CommitFrequency}
      description={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#commit-frequency'
      }
    >
      {(ref) => {
        return (
          <ChartWithDataV2 tansOpts={tansOpts} getOptions={getOptions}>
            {(loading, option) => {
              return (
                <EChartX containerRef={ref} loading={loading} option={option} />
              );
            }}
          </ChartWithDataV2>
        );
      }}
    </BaseCard>
  );
};

export default CommitFrequency;
