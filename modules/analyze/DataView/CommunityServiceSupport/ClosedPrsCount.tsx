import React from 'react';
import {
  genSeries,
  GetChartOptions,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
} from '@modules/analyze/options';
import { Activity, Support } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';

import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCommunity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'closed pr count', valueKey: 'closedPrsCount' }],
};

const getOptions: GetChartOptions = (
  { xAxis, compareLabels, yResults },
  theme
) => {
  const series = genSeries<LineSeriesOption>({
    theme,
    yResults,
  })(
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return line({
        name: label,
        data: data,
        color,
      });
    }
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

const ClosedPrsCount = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.close_pr_count'
      )}
      id={Support.ClosedPrsCount}
      description={t(
        'metrics_models:community_service_and_support.metrics.close_pr_count_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#close-pr-count'
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

export default ClosedPrsCount;
