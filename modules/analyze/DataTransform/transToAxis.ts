import set from 'lodash/set';
import parseISO from 'date-fns/parseISO';
import getUnixTime from 'date-fns/getUnixTime';
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

// todo reduce complexity add generic type
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
      const xAxisVal = metric[xAxisKey];
      yAxisOpts.forEach((yAxisOpt) => {
        const { valueKey } = yAxisOpt;
        // @ts-ignore
        set(tempMap, [xAxisVal, repo.label, valueKey], metric[valueKey]);
      });
    });
  });

  data.forEach((repo) => {
    // get value from map and fill null by xAxisKey
    xAxis = Object.keys(tempMap).sort((a, b) => {
      return getUnixTime(parseISO(a)) - getUnixTime(parseISO(b));
    });

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

const formatRepoName = (name: string, level: Level) => {
  let label = name;
  if (level === Level.REPO) {
    label = repoUrlFormat(name);
  }
  return label;
};

export function getLegendName(
  legendName: string,
  opts: {
    label: string;
    level: Level;
    isCompare: boolean;
    legendTypeCount?: number;
  }
) {
  const { label, level, isCompare, legendTypeCount } = opts;
  // format legend name
  const compareNames = formatRepoName(label, level);

  // if only one legend type, only show compareNames
  if (isCompare && legendTypeCount === 1) {
    return compareNames;
  }

  const name = isCompare ? `${compareNames} ${legendName}` : legendName;
  return name;
}
