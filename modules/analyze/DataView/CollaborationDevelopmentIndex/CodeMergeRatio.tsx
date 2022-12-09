import React from 'react';
import {
  ChartComponentProps,
  genSeries,
  getLineOption,
  lineArea,
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
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';

import { toFixed } from '@common/utils';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    {
      legendName: 'code merge ratio',
      valueKey: 'codeMergeRatio',
      valueFormat: (v) => toFixed(v * 100, 2),
    },
    { legendName: 'total pr', valueKey: 'prCount' },
    { legendName: 'code merge', valueKey: 'codeMergedCount' },
  ],
};

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<LineSeriesOption>({
    theme,
    comparesYAxis: yResults,
    seriesEachFunc: (
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
      if (legendName === 'code merge ratio') {
        return line({ name, data, color, yAxisIndex: 0 });
      }
      return line({ name, data, color, yAxisIndex: 1 });
    },
  });

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

const CodeMergeRatio = () => {
  const { t } = useTranslation();
  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio'
      )}
      id={CollaborationDevelopment.CodeMergeRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#code-merge-ratio'
      }
    >
      {(ref, fullScreen) => {
        return (
          <LoadInView containerRef={ref}>
            <Chart getOptions={getOptions} tansOpts={tansOpts} />
          </LoadInView>
        );
      }}
    </BaseCard>
  );
};

export default CodeMergeRatio;
