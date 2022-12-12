import React, { useMemo } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
} from '@modules/analyze/options';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';

import Chart from '@modules/analyze/components/Chart';

import { LineSeriesOption } from 'echarts';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'groupMetricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'org count', valueKey: 'orgCount' }],
};

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const series = genSeries<LineSeriesOption>({
    theme,
    yResults,
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

const OrgCount = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t('metrics_models:organization_activity.metrics.org_count')}
      id={Organizations.OrgCount}
      description={t(
        'metrics_models:organization_activity.metrics.org_count_desc'
      )}
      docLink={
        '/docs/metrics-models/niche-creation/developer-retention/#org-count'
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

export default OrgCount;
