import React from 'react';
import {
  ChartComponentProps,
  genSeries,
  getLineOption,
  lineArea,
} from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/config';
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

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'total pr', valueKey: 'prCount' },
    { legendName: 'code merge', valueKey: 'codeMergedCount' },
    { legendName: 'code merge ratio', valueKey: 'codeMergeRatio' },
  ],
};

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  let tooltips: Record<string, (string | number)[]> = {};
  const series = genSeries<LineSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      const name = getLegendName(legendName, { label, level, isCompare });
      if (legendName === 'code merge ratio') {
        tooltips[name] = data;
        return null;
      }
      return lineArea({ name, data, color });
    },
    theme
  );
  return getLineOption({
    xAxisData: xAxis,
    series,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      order: 'seriesDesc',

      // todo optimize code
      formatter: function (params: any) {
        if (!params) return '';
        let label = '';
        let tpl = params
          .map((param: any) => {
            label = param.axisValueLabel;
            const data = param.data === null ? '-' : param.data;
            let ratioTpl = '';
            const ratio =
              tooltips[param.seriesName + ' ratio']?.[param.dataIndex];
            const ratioValueFmt = ratio === null ? '-' : ratio;

            if (param.seriesName.indexOf('code merge') > -1) {
              ratioTpl = `<div style="margin: 0px 0 0;line-height:1;">
<span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">ratio: ${ratioValueFmt}</span><div style="clear:both;"/></div>`;
            }

            return (
              `<div style="margin: 5px 0 5px;line-height:1;">${param.marker}
<span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">${param.seriesName}</span>
<span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">${data}</span>
</div>` + ratioTpl
            );
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
  return (
    <BaseCard
      title="Code merge ratio"
      id={CodeQuality.CodeMergeRatio}
      description={
        'The percentage of PR Mergers and PR authors who are not the same person in the last 90 days of commits.'
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

export default CodeMergeRatio;
