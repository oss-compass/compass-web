import React from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';

import Chart from '@modules/analyze/components/Chart';

import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'commit frequency', valueKey: 'commitFrequency' }],
};

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const series = genSeries<LineSeriesOption>({
    theme,
    comparesYAxis: yResults,
    seriesEachFunc: (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return line({
        name: getLegendName(legendName, {
          label,
          compareLabels,
          level,
          isCompare,
          legendTypeCount: len,
        }),
        data: data,
        color,
      });
    },
  });
  return getLineOption({ xAxisData: xAxis, series });
};

const CommitFrequency = () => {
  const { t } = useTranslation();
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
          <Chart
            containerRef={ref}
            getOptions={getOptions}
            tansOpts={tansOpts}
          />
        );
      }}
    </BaseCard>
  );
};

export default CommitFrequency;
