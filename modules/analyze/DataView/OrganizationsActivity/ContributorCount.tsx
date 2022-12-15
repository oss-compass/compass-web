import React, { useMemo } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  legendFormat,
  getTooltipsFormatter,
} from '@modules/analyze/options';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';

import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

import { LineSeriesOption } from 'echarts';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'groupMetricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'contributor count', valueKey: 'contributorCount' },
    // { legendName: 'contributor org count', valueKey: 'contributorOrgCount' },
  ],
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

const ContributorCount = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:organization_activity.metrics.contributor_count'
      )}
      id={Organizations.ContributorCount}
      description={t(
        'metrics_models:organization_activity.metrics.contributor_count_desc'
      )}
      docLink={
        '/docs/metrics-models/niche-creation/developer-retention/#contributor-count'
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

export default ContributorCount;
