import set from 'lodash/set';
import { Level } from '@modules/analyze/constant';
import { MetricQuery } from '@graphql/generated';
import { formatISO, repoUrlFormat, toFixed } from '@common/utils';

interface DateItem {
  label: string;
  level: Level;
  result: MetricQuery | undefined;
}

export interface YResult {
  label: string;
  level: Level;
  yAxisResult: {
    legendName: string;
    key: string;
    data: (string | number)[];
  }[];
}

export interface TransResult {
  xAxis: string[];
  yResults: YResult[];
}

export interface TransOpts {
  metricType: Exclude<keyof MetricQuery, '__typename'>;
  xAxisKey: string;
  yAxisOpts: {
    legendName: string;
    valueKey: string;
    valueFormat?: (v: any) => number;
  }[];
}

// todo add generic type
export function transToAxis(
  data: Array<DateItem>,
  { metricType, xAxisKey, yAxisOpts }: TransOpts
): TransResult {
  let xAxis: string[] = [];
  const tempMap: any = {};
  const yResults: any = [];

  data.forEach((repo) => {
    // temporary store the value in map by xAxisKey
    const metrics = repo.result?.[metricType];
    metrics?.map((metric) => {
      // @ts-ignore
      const xAxis = metric[xAxisKey];
      yAxisOpts.forEach((yAxisOpt) => {
        const { valueKey } = yAxisOpt;
        // @ts-ignore
        set(tempMap, [xAxis, repo.label, valueKey], metric[valueKey]);
      });
    });

    // get value from map and fill null by xAxisKey
    xAxis = Object.keys(tempMap);
    const yAxisResult: any = [];
    yAxisOpts.forEach((yAxisOpt) => {
      const {
        valueKey,
        legendName,
        valueFormat = (v) => toFixed(v, 3),
      } = yAxisOpt;

      yAxisResult.push({
        key: valueKey,
        legendName,
        data: xAxis.map((xAxis) => {
          const obj = tempMap[xAxis];
          if (obj[repo.label] !== undefined) {
            return valueFormat
              ? valueFormat(obj[repo.label][valueKey])
              : obj[repo.label][valueKey];
          }
          return null;
        }),
      });
    });

    yResults.push({ label: repo.label, level: repo.level, yAxisResult });
  });

  return {
    xAxis: xAxis.map((i) => formatISO(i)),
    yResults,
  };
}

const formatLegendName = (name: string, level: Level) => {
  let label = name;
  if (level === Level.REPO) {
    label = repoUrlFormat(name);
  }
  return label;
};

export function getLegendName(
  legendName: string,
  opts: { label: string; level: Level; isCompare: boolean }
) {
  const { label, level, isCompare } = opts;
  // format legend name
  const compareNames = formatLegendName(label, level);
  const name = isCompare ? `${compareNames} ${legendName}` : legendName;
  return name;
}
