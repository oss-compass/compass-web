import React, { useMemo } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
} from '@modules/analyze/options';
import { Activity } from '@modules/analyze/components/SideBar/config';
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
  metricType: 'metricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'comment frequency', valueKey: 'commentFrequency' },
  ],
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

const CommentFrequency = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.comment_frequency')}
      id={Activity.CommentFrequency}
      description={t(
        'metrics_models:community_activity.metrics.comment_frequency_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#comment-frequency'}
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

export default CommentFrequency;
