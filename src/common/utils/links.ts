import { SearchQuery, BetaMetricOverviewQuery } from '@graphql/generated';
import { Level } from '@modules/analyze/constant';

export const getShortAnalyzeLink = (
  item: SearchQuery['fuzzySearch'][number] | string | undefined | null
) => {
  if (!item) return '/';
  const shortCode = typeof item === 'string' ? item : item.shortCode;
  return `/analyze/${shortCode}`;
};

export const getShortCompareLink = (list: string[]) => {
  const url = list.reduce((pre, cur) => {
    if (pre === '') return cur;
    return pre + '..' + cur;
  }, '');
  return `/compare/${url}`;
};

export const getAnalyzeLink = (item: SearchQuery['fuzzySearch'][number]) => {
  return `/analyze?label=${encodeURIComponent(item.label!)}&level=${
    item.level
  }`;
};

export const getCompareAnalyzeLink = (list: string[], level: string) => {
  const url = list.reduce((pre, cur) => {
    return pre + `label=${encodeURIComponent(cur!)}&`;
  }, '/analyze?');
  return `${url}level=${level}`;
};

export const getLabDetailLink = (repo: { origin: string }) => {
  return `/lab/explore?label=${encodeURIComponent(repo?.origin!)}&level=${
    Level.REPO
  }`;
};
export const getLabCompareAnalyzeLink = (list: string[], level: string) => {
  const url = list.reduce((pre, cur) => {
    return pre + `label=${encodeURIComponent(cur!)}&`;
  }, '/lab/explore?');
  return `${url}level=${level}`;
};

export const getRepoLink = (
  path: string | null | undefined,
  backend: string | null | undefined
) => {
  switch (backend) {
    case 'GitHub':
      return `https://github.com/${path}`;
    case 'Gitee':
      return `https://gitee.com/${path}`;
    default:
      return '/';
  }
};
