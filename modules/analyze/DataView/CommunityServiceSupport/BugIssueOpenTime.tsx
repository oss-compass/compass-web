import React, { useMemo } from 'react';
import {
  genSeries,
  GetChartOptions,
  getLineOption,
  line,
} from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';

import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCommunity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'avg', valueKey: 'issueOpenTimeAvg' },
    { legendName: 'mid', valueKey: 'issueOpenTimeMid' },
  ],
};

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const series = genSeries<LineSeriesOption>({
    theme,
    comparesYAxis: yResults,
    seriesEachFunc: (opts, len) => {
      const getName = getLegendName(opts.legendName, {
        label: opts.label,
        compareLabels: opts.compareLabels,
        level: opts.level,
        isCompare: opts.isCompare,
        legendTypeCount: len,
      });
      return line({
        name: getName,
        data: opts.data,
        color: opts.color,
      });
    },
  });
  return getLineOption({ xAxisData: xAxis, series });
};

const BugIssueOpenTime = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.bug_issue_open_time'
      )}
      id={Support.BugIssueOpenTime}
      description={t(
        'metrics_models:community_service_and_support.metrics.bug_issue_open_time_desc'
      )}
      docLink={
        'docs/metrics-models/productivity/niche-creation/#bug-issue-open-time'
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

export default BugIssueOpenTime;
