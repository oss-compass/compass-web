import React from 'react';
import {
  bar,
  genSeries,
  getBarOption,
  GetChartOptions,
} from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/components/SideBar/config';

import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { BarSeriesOption, LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
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
  const series = genSeries<BarSeriesOption>({
    theme,
    comparesYAxis: yResults,
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
  return getBarOption({ xAxisData: xAxis, series });
};

const LocFrequency = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:code_quality_guarantee.metrics.lines_of_code_frequency'
      )}
      id={CodeQuality.LocFrequency}
      description={t(
        'metrics_models:code_quality_guarantee.metrics.lines_of_code_frequency_desc'
      )}
      docLink={
        'docs/metrics-models/productivity/code-quality-guarantee/#lines-of-code-frequency'
      }
    >
      {(ref) => {
        return (
          <LoadInView containerRef={ref}>
            <Chart getOptions={getOptions} tansOpts={tansOpts} />
          </LoadInView>
        );
      }}
    </BaseCard>
  );
};

export default LocFrequency;
