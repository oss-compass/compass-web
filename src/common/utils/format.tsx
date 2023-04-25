import {
  getNameSpace,
  getPathname,
  getProvider,
  getRepoName,
  toFixed,
} from '@common/utils';
import capitalize from 'lodash/capitalize';
import { OptionDataValue } from 'echarts/types/src/util/types';

/**
 * check is need show provider in legend
 * eg:
 * https://github.com/cli/cli
 * https://gitee.com/cli/cli
 *
 * need show gitee or github
 */
export const checkHasSameRepoPath = (label: string, labels: string[]) => {
  const pathname = getPathname(label);

  let count = 0;
  return labels.some((item) => {
    if (item.indexOf(pathname) > -1) count++;
    return count >= 2;
  });
};

export const formatLabel = (
  label: string
): {
  name: string;
  namespace?: string;
  provider?: string;
} => {
  if (label.indexOf('https://') != -1) {
    const repoName = getRepoName(label);
    const namespace = getNameSpace(label);
    const provider = getProvider(label);

    return {
      name: repoName,
      namespace,
      provider: capitalize(provider),
    };
  } else {
    return { name: label };
  }
};

export const formatRepoName = ({
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

export const percentageValueFormat = (value: string | number) => {
  if (!isNaN(Number(value))) {
    return toFixed(+value * 100, 3);
  }
  return value;
};

export const checkFormatPercentageValue = (
  condition: boolean,
  data: (string | number)[]
) => {
  return condition ? data.map((v) => percentageValueFormat(v)) : data;
};

export const formatNegativeNumber = (
  condition: boolean,
  data: (string | number)[]
) => {
  return condition
    ? data.map((v) => {
        if (!isNaN(Number(v))) return -v;
        return v;
      })
    : data;
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

export const roundedNum = (num: number, decimalPoint?: number) => {
  const base = Math.pow(10, decimalPoint || 2);
  return Math.round(num * base) / base;
};

export function shortenAxisLabel(value: number | string) {
  const v = Number(value);
  if (isNaN(v)) return value;

  if (Math.abs(v) > 1000000) {
    return roundedNum(v / 1000000, 1) + 'm';
  }

  if (Math.abs(v) > 1000) {
    return roundedNum(v / 1000, 1) + 'k';
  }

  return value;
}

export const convertMonthsToDays = (value: number | string) => {
  if (value && !isNaN(Number(value))) {
    const days = +value * 30;
    // two decimal places
    return roundedNum(days);
  }
  return value;
};
