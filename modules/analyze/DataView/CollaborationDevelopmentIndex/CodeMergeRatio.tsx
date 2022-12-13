import React, { useMemo, useState } from 'react';
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

import Chart from '@modules/analyze/components/Chart';

import { toFixed } from '@common/utils';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<LineSeriesOption>({ theme, yResults })(
    (opt, len) => {
      const {
        legendName,
        label,
        compareLabels,
        level,
        isCompare,
        color,
        data,
      } = opt;
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
    }
  );

  return getLineOption({
    xAxisData: xAxis,
    series,
    yAxis: [
      { type: 'value', axisLabel: { formatter: '{value}%' } },
      { type: 'value' },
    ],
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

const tabOptions = [
  { label: 'code merge ratio', value: '1' },
  { label: 'total pr', value: '2' },
  { label: 'code merge', value: '3' },
];

const chartTabs = {
  '1': [
    {
      legendName: 'code merge ratio',
      valueKey: 'codeMergeRatio',
      valueFormat: (v: number) => toFixed(v * 100, 2),
    },
  ],
  '2': [{ legendName: 'total pr', valueKey: 'prCount' }],
  '3': [{ legendName: 'code merge', valueKey: 'codeMergedCount' }],
};

type TabValue = keyof typeof chartTabs;
const CodeMergeRatio = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');

  const tansOpts: TransOpts = useMemo(() => {
    return {
      metricType: 'metricCodequality',
      xAxisKey: 'grimoireCreationDate',
      yAxisOpts: chartTabs[tab],
    };
  }, [tab]);

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
          <>
            <div className="mb-4">
              <Tab
                options={tabOptions}
                value={tab}
                onChange={(v) => setTab(v as TabValue)}
              />
            </div>
            <Chart
              containerRef={ref}
              getOptions={getOptions}
              tansOpts={tansOpts}
            />
          </>
        );
      }}
    </BaseCard>
  );
};

export default CodeMergeRatio;
