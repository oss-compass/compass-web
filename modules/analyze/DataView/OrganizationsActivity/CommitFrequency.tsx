import React, { useMemo } from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import { ChartThemeState } from '@modules/analyze/context';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'groupMetricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'commit frequency', valueKey: 'commitFrequency' }],
};

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    (
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
    theme
  );
  return getLineOption({ xAxisData: xAxis, series });
};

const CommitFrequency = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t('metrics_models:organization_activity.metrics.commit_frequency')}
      id={Organizations.CommitFrequency}
      description={t(
        'metrics_models:organization_activity.metrics.commit_frequency_desc'
      )}
      docLink={
        'docs/metrics-models/niche-creation/developer-retention/#commit-frequency'
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

export default CommitFrequency;
