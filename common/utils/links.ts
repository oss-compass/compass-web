import { SearchQuery, BetaMetricOverviewQuery } from '@graphql/generated';
import { Level } from '@modules/analyze/constant';

export const getAnalyzeLink = (item: SearchQuery['fuzzySearch'][number]) => {
  return `/analyze?label=${encodeURIComponent(item.label!)}&level=${
    item.level
  }`;
};

export const getLabDetailLink = (
  repo: NonNullable<
    BetaMetricOverviewQuery['betaMetricOverview']['trends']
  >[number]
) => {
  return `/lab/explore?label=${encodeURIComponent(repo?.origin!)}&level=${
    Level.REPO
  }`;
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
