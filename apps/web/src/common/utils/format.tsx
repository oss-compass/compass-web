import {
  getCanonicalRepoPath,
  getNameSpace,
  getProvider,
  getRepoName,
  toFixed,
} from '@common/utils';
import capitalize from 'lodash/capitalize';
import { OptionDataValue } from 'echarts/types/src/util/types';

/**
 * Whether the provider should be appended to the legend/tooltip of `label`.
 *
 * eg:
 * https://github.com/cli/cli
 * https://gitee.com/cli/cli
 *
 * need show gitee or github, because the two entries would otherwise render the
 * exact same `name` / `namespace` and be indistinguishable.
 *
 * The comparison is done on the canonical `namespace/repo` path (see
 * `getCanonicalRepoPath`) instead of on a substring of the URL. A substring
 * test is wrong in both directions:
 * - false positive: `apache/dubbo` is a substring of `apache/dubbo-go`, so two
 *   unrelated repos were treated as the same one;
 * - false negative: a trailing slash or a different letter case made the very
 *   same repo (`github.com/oss-compass/compass-web/` vs
 *   `gitee.com/oss-compass/compass-web`) look like two different ones.
 *
 * The provider is only useful when the same canonical path really is present
 * under two different hosts, so the result requires at least two distinct
 * providers; a path repeated on a single provider has nothing to disambiguate.
 */
export const checkHasSameRepoPath = (label: string, labels: string[]) => {
  const canonicalPath = getCanonicalRepoPath(label);
  // Non-URL labels (or URLs without a full namespace/repo pair) cannot be
  // compared reliably, so never append a provider for them.
  if (!canonicalPath) return false;

  const providers = new Set<string>();
  let matches = 0;

  // Fold the label in as well so that a single duplicate inside `labels` cannot
  // satisfy the `matches >= 2` condition on its own.
  [label, ...(labels || [])].forEach((item) => {
    if (getCanonicalRepoPath(item) !== canonicalPath) return;
    matches += 1;
    // Hosts are case-insensitive, so compare them lowercased as well.
    providers.add(getProvider(item).toLowerCase());
  });

  return matches >= 2 && providers.size >= 2;
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
  if (label && label.indexOf('https://') != -1) {
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

export const toUnderline = (str: string) => {
  //驼峰命名法转换为下划线命名
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};
