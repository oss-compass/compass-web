import React from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  getLegendSelected,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';

import Chart from '@modules/analyze/components/Chart';

import { LineSeriesOption } from 'echarts';
import { toFixed } from '@common/utils';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    {
      legendName: 'linked issue ratio',
      valueKey: 'prIssueLinkedRatio',
      valueFormat: (v) => toFixed(v * 100, 2),
    },
    { legendName: 'total pr', valueKey: 'prCount' },
    {
      legendName: 'linked issue',
      valueKey: 'prIssueLinkedCount',
    },
  ],
};

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<LineSeriesOption>({ theme, yResults })(
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      const name = getLegendName(legendName, {
        label,
        compareLabels,
        level,
        isCompare,
        legendTypeCount: len,
      });
      if (legendName === 'linked issue ratio') {
        return line({ name, data, color, yAxisIndex: 0 });
      }
      return line({ name, data, color, yAxisIndex: 1 });
    }
  );

  return getLineOption({
    xAxisData: xAxis,
    series,
    yAxis: [
      { type: 'value', axisLabel: { formatter: '{value}%' } },
      { type: 'value' },
    ],
    legend: {
      selected: isCompare ? getLegendSelected(series, 'ratio') : {},
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      order: 'seriesDesc',
      formatter: function (params: any) {
        if (!params) return '';
        let label = '';
        let tpl = params
          .map((param: any) => {
            label = param.axisValueLabel;
            let data = param.data === null ? '-' : param.data;
            if (param.seriesName.indexOf('ratio') > -1 && data !== '-') {
              data += '%';
            }
            return `<div style="margin: 5px 0 5px;line-height:1;">${param.marker}
<span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">${param.seriesName}</span>
<span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">${data}</span>
</div>`;
          })
          .join('');

        return (
          `<div style="font-size:14px;color:#666;font-weight:400;line-height:1;">${label}</div>` +
          tpl
        );
      },
    },
  });
};
const PRIssueLinked = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio'
      )}
      id={CollaborationDevelopment.PRIssueLinkedRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#pr-issue-linked-ratio'
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

export default PRIssueLinked;
