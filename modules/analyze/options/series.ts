import {
  BarSeriesOption,
  EChartsOption,
  LineSeriesOption,
  SeriesOption,
} from 'echarts';
import {
  OptionDataValue,
  TooltipFormatterCallback,
} from 'echarts/types/src/util/types';
import {
  CallbackDataParams,
  TopLevelFormatterParams,
} from 'echarts/types/dist/shared';
import { formatRepoNameV2 } from '@modules/analyze/DataTransform/transToAxis';
import isNumber from 'lodash/isNumber';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { toFixed } from '@common/utils';

export const line = (
  opts: {
    color?: string;
    data: (string | number)[];
    formatDataToHundred?: boolean;
  } & LineSeriesOption
): LineSeriesOption => {
  const { formatDataToHundred = false, name, data, color, ...restOpts } = opts;

  let showData = opts.data;
  if (formatDataToHundred) {
    showData = opts.data?.map((i) => transHundredMarkSystem(i));
  }

  return {
    name: opts.name,
    type: 'line',
    smooth: false,
    showSymbol: false,
    data: showData,
    lineStyle: opts.color ? { color: opts.color } : {},
    itemStyle: opts.color ? { color: opts.color } : {},
    ...restOpts,
  };
};

export const lineArea = (
  opts: {
    color?: string;
    data: (string | number)[];
    formatDataToHundred?: boolean;
  } & LineSeriesOption
): LineSeriesOption => {
  const { formatDataToHundred = false, name, data, color, ...restOpts } = opts;

  let showData = opts.data;
  if (formatDataToHundred) {
    showData = opts.data?.map((i) => transHundredMarkSystem(i));
  }

  return {
    type: 'line',
    smooth: false,
    showSymbol: false,
    data: showData,
    areaStyle: color ? { color } : {},
    itemStyle: opts.color ? { color } : {},
    ...restOpts,
  };
};

export const bar = (
  opts: {
    name: string;
    data: (string | number)[];
    formatDataToHundred?: boolean;
    stack?: string;
    color?: string;
  } & BarSeriesOption
): BarSeriesOption => {
  const { formatDataToHundred = false, name, data, color, ...restOpts } = opts;

  let showData = opts.data;
  if (formatDataToHundred) {
    showData = opts.data?.map((i) => transHundredMarkSystem(i));
  }

  return {
    name: opts.name,
    type: 'bar',
    data: showData,
    emphasis: {
      focus: 'series',
    },
    stack: opts.stack ? opts.stack : undefined,
    itemStyle: opts.color ? { color: opts.color } : {},
    ...restOpts,
  };
};

export const mapToSeries = (
  arr: any[],
  key: string,
  name: string,
  func: (opts: { name: string; data: (string | number)[] }) => LineSeriesOption
): LineSeriesOption => {
  const values = arr.map((i) => String(i[key]));
  return func({ name: name, data: values });
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
      const { name, meta } = formatRepoNameV2({ label, compareLabels });
      const { namespace = '', provider = '', showProvider } = meta || {};
      let b = `{b|${namespace}}`;
      if (showProvider) {
        b = `{b|${namespace} on ${provider}}`;
      }
      return [`{a|${name}}`].concat(b).join('\n');
    },
  };
};

export const percentageValueFormat = (value: number) => {
  if (!isNaN(Number(value))) {
    return toFixed(value * 100, 3);
  }
  return value;
};

export const percentageUnitFormat = (
  value: OptionDataValue | OptionDataValue[]
): string => {
  if (value === undefined || value === null || value === '-') {
    return '-';
  }
  return value + '%';
};

export const fmtEmptyDataValue = (value: any): any => {
  if (value === undefined || value === null) {
    return '-';
  }
  return value;
};

const genTooltipsItem = (
  p: CallbackDataParams,
  compareLabels: string[],
  valueFormat?: (v: any) => any
) => {
  const { name, meta } = formatRepoNameV2({
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
}) => {
  const { compareLabels, valueFormat } = args;
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
      ${first?.name}
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
