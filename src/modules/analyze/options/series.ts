import {
  BarSeriesOption,
  EChartsOption,
  LineSeriesOption,
  SeriesOption,
} from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { formatRepoName } from '@modules/analyze/options/format';
import isNumber from 'lodash/isNumber';
import { fmtEmptyDataValue } from './format';

export const line = (
  opts: {
    color?: string;
    data: (string | number)[];
  } & LineSeriesOption
): LineSeriesOption => {
  const { data, name, color, ...restOpts } = opts;

  return {
    name: opts.name,
    type: 'line',
    smooth: false,
    showSymbol: false,
    data,
    lineStyle: opts.color ? { color: opts.color } : {},
    itemStyle: opts.color ? { color: opts.color } : {},
    ...restOpts,
  };
};

export const lineArea = (
  opts: {
    color?: string;
    data: (string | number)[];
  } & LineSeriesOption
): LineSeriesOption => {
  const { name, data, color, ...restOpts } = opts;

  return {
    type: 'line',
    smooth: false,
    showSymbol: false,
    data,
    areaStyle: color ? { color } : {},
    itemStyle: opts.color ? { color } : {},
    ...restOpts,
  };
};

export const bar = (
  opts: {
    name: string;
    data: (string | number)[];
    stack?: string;
    color?: string;
  } & BarSeriesOption
): BarSeriesOption => {
  const { name, data, color, ...restOpts } = opts;

  return {
    name: opts.name,
    type: 'bar',
    data,
    emphasis: {
      focus: 'series',
    },
    stack: opts.stack ? opts.stack : undefined,
    itemStyle: opts.color ? { color: opts.color } : {},
    ...restOpts,
  };
};

export const getLegendSelected = (s: SeriesOption[], includeWord: string) => {
  return s.reduce<{ [key: string]: boolean }>((acc, cur) => {
    const name = cur.name as string;
    acc[name] = name.endsWith(includeWord);
    return acc;
  }, {});
};

export const legendFormat = (
  compareLabels: string[]
): EChartsOption['legend'] => {
  return {
    data: compareLabels.map((v) => ({ name: v })),
    textStyle: {
      rich: {
        a: {
          padding: [15, 0, 0, 0],
          fontWeight: 'bold',
          fontSize: 14,
        },
        b: {
          padding: [5, 0, 0, 0],
          fontSize: 12,
          color: '#A0A4AA',
        },
      },
    },
    formatter: function (label) {
      const { name, meta } = formatRepoName({ label, compareLabels });
      const { namespace = '', provider = '', showProvider } = meta || {};
      let b = `{b|${namespace}}`;
      if (showProvider) {
        b = `{b|${namespace} on ${provider}}`;
      }
      return [`{a|${name}}`].concat(b).join('\n');
    },
  };
};

const genTooltipsItem = (
  p: CallbackDataParams,
  compareLabels: string[],
  valueFormat?: (v: any) => any
) => {
  const { name, meta } = formatRepoName({
    label: p.seriesName || '',
    compareLabels,
  });
  const { namespace = '', provider = '', showProvider } = meta || {};
  let showMeta = namespace;
  if (showProvider) {
    showMeta = `${namespace} on ${provider}`;
  }

  return `
<div style="margin: 0 0 8px;line-height:1;">
  <div style="margin: 0 0 0;line-height:1;display: flex; justify-content:space-between;">
    <div style="display: flex">
       <div style="margin-right:4px;margin-top:3px;border-radius:10px;width:10px;height:10px;background-color:${
         p.color
       };"></div>
       <div style="display:flex;flex-direction: column;">
          <div style="font-size:14px;color:#333;font-weight:500;margin-bottom:3px;margin-left:2px">
            ${name}
          </div>
          <div style="font-size:12px;color:#A0A4AA;font-weight:400;margin-left:2px">
            ${showMeta}
          </div>
       </div>
    </div>
    
    <div style="margin-left:20px;margin-top:3px;font-size:14px;color:#666;font-weight:500">
      ${valueFormat ? valueFormat(p.value) : fmtEmptyDataValue(p.value)}
    </div>
  </div>
</div>`;
};

const genSummaryItem = (
  p: CallbackDataParams,
  valueFormat?: (v: any) => any
) => {
  return `
<div style="margin: 0 0 8px;line-height:1;">
  <div style="margin: 0 0 0;line-height:1;display: flex; justify-content:space-between;">
    <div style="display: flex">
       <div style="margin-right:4px;margin-top:3px;border-radius:10px;width:10px;height:10px;border:1px dashed ${
         p.color
       };"></div>
       <div style="display:flex;flex-direction: column;">
          <div style="font-size:14px;color:#333;font-weight:500;margin-bottom:3px;margin-left:2px">
            ${p.seriesName}
          </div>
       </div>
    </div>
    
    <div style="margin-left:20px;margin-top:3px;font-size:14px;color:#666;font-weight:500">
      ${valueFormat ? valueFormat(p.value) : fmtEmptyDataValue(p.value)}
    </div>
  </div>
</div>`;
};

export const getTooltipsFormatter = (args: {
  compareLabels: string[];
  valueFormat?: (v: any) => any;
  indicators?: string;
}) => {
  const { compareLabels, indicators, valueFormat } = args;
  return (
    params: CallbackDataParams | CallbackDataParams[]
  ): string | HTMLElement | HTMLElement[] => {
    const paramsArray = Array.isArray(params) ? params : [params];
    const [first] = paramsArray || [];

    const summaryItems: string[] = [];
    const items = paramsArray
      .sort((a, b) => {
        if (isNumber(a.data) && isNumber(b.data)) {
          return b.data - a.data;
        }
        return 0;
      })
      .map((p) => {
        if (p.seriesId === 'average' || p.seriesId === 'median') {
          summaryItems.push(genSummaryItem(p, valueFormat));
          return '';
        }
        return genTooltipsItem(p, compareLabels, valueFormat);
      });

    return `
<div style="margin: 0 0 0;line-height:1;">
  <div style="margin: 0 0 0;line-height:1;">
    <div style="font-size:14px;color:#000;font-weight:400;line-height:1;">
        <div style="display:flex;align-items: center;">
          <div style="font-size:14px;color:#333;font-weight:500;margin-left:2px">
            ${first?.name}
          </div>
          <div style="font-size:12px;color:#A0A4AA;margin-left:8px">
            ${indicators ? indicators : ''}
          </div>
       </div>
    </div>
    <div style="margin: 10px 0 0;line-height:1;">
      ${items.join('')}
      
      ${
        summaryItems.length > 0
          ? `<div style="position:relative;margin-top:10px;padding:10px 0 0;">
        <div style="position:absolute;top:0;left:-10px;right:-10px;border-top: 1px solid #E3E9ED;"></div>
        ${summaryItems.join('')}
      </div> `
          : ''
      }
      
      <div style="clear:both"></div>
    </div>
    <div style="clear:both"></div>
  </div>
  <div style="clear:both"></div>
</div>`;
  };
};
