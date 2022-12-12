import React from 'react';
import {
  bar,
  genSeries,
  getBarOption,
  GetChartOptions,
  getLegendSelected,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';

import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { BarSeriesOption, LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';

import Chart from '@modules/analyze/components/Chart';

import { toFixed } from '@common/utils';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    {
      legendName: 'lines add',
      valueKey: 'linesAddedFrequency',
    },
    {
      legendName: 'lines remove',
      valueKey: 'linesRemovedFrequency',
      valueFormat: (v) => toFixed(v * -1, 3),
    },
  ],
};

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<BarSeriesOption>({
    theme,
    yResults,
    seriesEachFunc: (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return bar({
        name: getLegendName(legendName, {
          label,
          compareLabels,
          level,
          isCompare,
          legendTypeCount: len,
        }),
        stack: label,
        data: data,
        color,
      });
    },
  });
  return getBarOption({
    xAxisData: xAxis,
    series,
    legend: {
      selected: isCompare ? getLegendSelected(series, 'add') : {},
    },
  });
};

const LocFrequency = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency'
      )}
      id={CollaborationDevelopment.LocFrequency}
      description={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#lines-of-code-frequency'
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

export default LocFrequency;
