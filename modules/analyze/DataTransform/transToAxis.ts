import set from 'lodash/set';
import capitalize from 'lodash/capitalize';
import parseISO from 'date-fns/parseISO';
import getUnixTime from 'date-fns/getUnixTime';
import { Level } from '@modules/analyze/constant';
import { MetricQuery } from '@graphql/generated';
import {
  formatISO,
  getNameSpace,
  getPathname,
  getProvider,
  getRepoName,
  toFixed,
} from '@common/utils';

interface DataItem {
  label: string;
  level: Level;
  result: MetricQuery | undefined;
}

export interface YResult {
  label: string;
  level: Level;
  result: {
    legendName: string;
    key: string;
    data: (string | number)[];
  }[];
}

export interface TransResult {
  isCompare: boolean;
  compareLabels: string[];
  xAxis: string[];
  yResults: YResult[];
  tabValue?: string;
}

export interface TransOpts {
  metricType: Exclude<keyof MetricQuery, '__typename'>;
  xAxisKey: string;
  yAxisOpts: {
    legendName: string;
    valueKey: string;
    valueFormat?: (v: any) => number;
    metricStat?: {
      meanKey?: string;
      medianKey?: string;
    };
  }[];
  tabValue?: string;
}

// todo reduce complexity add generic type
export function transToAxis(
  data: DeepReadonly<Array<DataItem>>,
  { metricType, xAxisKey, yAxisOpts }: TransOpts
): {
  xAxis: string[];
  yResults: YResult[];
} {
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

    const result: YResult['result'] = [];
    yAxisOpts.forEach((yAxisOpt) => {
      const {
        valueKey,
        legendName,
        valueFormat = (v) => toFixed(v, 3),
      } = yAxisOpt;

      result.push({
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

    yResults.push({ label: repo.label, level: repo.level, result });
  });

  return {
    xAxis: xAxis.map((i) => formatISO(i)),
    yResults,
  };
}

/**
 * check is need show provider in legend
 * eg:
 * https://github.com/cli/cli
 * https://gitee.com/cli/cli
 *
 * need show gitee or github
 */
const checkHasSameRepoPath = (label: string, labels: string[]) => {
  const pathname = getPathname(label);

  let count = 0;
  return labels.some((item) => {
    if (item.indexOf(pathname) > -1) count++;
    return count >= 2;
  });
};
export const formatRepoNameV2 = ({
  label,
  compareLabels,
}: {
  label: string;
  compareLabels: string[];
}): {
  name: string;
  meta?: {
    namespace: string;
    provider: string;
    showProvider: boolean;
  };
} => {
  if (label.indexOf('https://') != -1) {
    const repoName = getRepoName(label);
    const namespace = getNameSpace(label);
    const provider = getProvider(label);
    const showProvider = checkHasSameRepoPath(label, compareLabels);

    return {
      name: repoName,
      meta: {
        namespace,
        provider: capitalize(provider),
        showProvider,
      },
    };
  } else {
    return { name: label };
  }
};

export const formatRepoName = ({
  label,
  compareLabels,
  level,
}: {
  label: string;
  compareLabels: string[];
  level: Level;
}) => {
  let name = label;
  if (level === Level.REPO) {
    const hasSamePath = checkHasSameRepoPath(label, compareLabels);
    const provider = getProvider(label);
    const repoName = getRepoName(name);
    name = hasSamePath ? `${provider} ${repoName}` : repoName;
  }
  return name;
};

export function getLegendName(
  legendName: string,
  opts: {
    label: string;
    compareLabels: string[];
    level: Level;
    isCompare: boolean;
    legendTypeCount?: number;
  }
) {
  const { compareLabels, label, level, isCompare, legendTypeCount } = opts;

  // format label
  const shortLabel = formatRepoName({ label, compareLabels, level });

  // if only one legend type, only show shortLabel
  if (isCompare && legendTypeCount === 1) {
    return shortLabel;
  }

  return isCompare ? `${shortLabel} ${legendName}` : legendName;
}
