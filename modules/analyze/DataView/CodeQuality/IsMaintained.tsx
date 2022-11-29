import React from 'react';
import { genSeries, getBarOption, bar } from '@modules/analyze/options';
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
import { ChartThemeState } from '@modules/analyze/context';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'is maintained', valueKey: 'isMaintained' }],
};

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<BarSeriesOption>(
    yResults,
    (
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
        data: data,
        color,
      });
    },
    theme
  );
  return getBarOption({ xAxisData: xAxis, series });
};

const IsMaintained = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t('metrics_models:code_quality_guarantee.metrics.is_maintained')}
      id={CodeQuality.IsMaintained}
      description={t(
        'metrics_models:code_quality_guarantee.metrics.is_maintained_desc'
      )}
      docLink={
        'docs/metrics-models/productivity/code-quality-guarantee/#is-maintained'
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

export default IsMaintained;
