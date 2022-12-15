import React from 'react';
import {
  genSeries,
  getBarOption,
  bar,
  GetChartOptions,
  getTooltipsFormatter,
  legendFormat,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { BarSeriesOption, LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';

import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'is maintained', valueKey: 'isMaintained' }],
};

const getOptions: GetChartOptions = (
  { xAxis, compareLabels, yResults },
  theme
) => {
  const series = genSeries<BarSeriesOption>({ theme, yResults })(
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return bar({
        name: label,
        data: data,
        color,
      });
    }
  );
  return getBarOption({
    xAxisData: xAxis,
    series,
    legend: legendFormat(compareLabels),
    tooltip: {
      formatter: getTooltipsFormatter({ compareLabels }),
    },
  });
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

export default IsMaintained;
