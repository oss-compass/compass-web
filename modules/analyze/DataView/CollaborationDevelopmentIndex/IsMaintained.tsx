import React from 'react';
import {
  genSeries,
  getBarOption,
  bar,
  GetChartOptions,
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

import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'is maintained', valueKey: 'isMaintained' }],
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
        data: data,
        color,
      });
    },
  });
  return getBarOption({ xAxisData: xAxis, series });
};

const IsMaintained = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained'
      )}
      id={CollaborationDevelopment.IsMaintained}
      description={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#is-maintained'
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

export default IsMaintained;
