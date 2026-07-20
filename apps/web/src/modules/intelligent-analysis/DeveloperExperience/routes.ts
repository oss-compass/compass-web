import type { ExperienceType } from './experienceModules';

export type ExperienceRouteQueryValue = string | string[] | undefined;
export type ExperienceRouteQuery = Record<string, ExperienceRouteQueryValue>;

export type ExperienceRouteScope = {
  org?: string;
};

type ModuleSwitchQueryOptions = {
  sourceType?: ExperienceType;
  targetType: ExperienceType;
  query: ExperienceRouteQuery;
};

const EXPERIENCE_ROOT = '/intelligent-analysis';
const WEEKLY_EXPERIENCE_TYPES = new Set<ExperienceType>([
  'issue-contribution',
  'ci-experience',
]);
const MODULE_QUERY_KEYS: Record<ExperienceType, readonly string[]> = {
  'community-onboarding': [
    'project',
    'sig',
    'focusTaskId',
    'painId',
    'focusPainIndex',
    'autoOpenPain',
    'preview',
    'reviewId',
    'adminToken',
    'soc',
  ],
  'issue-contribution': [
    'platform',
    'repo',
    'period',
    'version',
    'dimension',
    'risk',
    'confidence',
    'reviewStatus',
    'page',
  ],
  'ci-experience': ['platform', 'repo', 'period', 'workflow'],
};

const appendQuery = (path: string, query?: ExperienceRouteQuery) => {
  if (!query) return path;

  const search = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => search.append(key, item));
      return;
    }
    if (value !== undefined) {
      search.append(key, value);
    }
  });

  const queryString = search.toString();
  return queryString ? `${path}?${queryString}` : path;
};

const getExperienceBasePath = ({ org }: ExperienceRouteScope) => {
  const orgSegment = org?.trim();
  return orgSegment
    ? `${EXPERIENCE_ROOT}/${encodeURIComponent(orgSegment)}/experience`
    : `${EXPERIENCE_ROOT}/experience`;
};

const pickModuleQuery = (
  experienceType: ExperienceType,
  query?: ExperienceRouteQuery
) => {
  if (!query) return undefined;

  return MODULE_QUERY_KEYS[experienceType].reduce<ExperienceRouteQuery>(
    (result, key) => {
      const value = query[key];
      if (value !== undefined) result[key] = value;
      return result;
    },
    {}
  );
};

const copySingleQueryValue = (
  target: ExperienceRouteQuery,
  source: ExperienceRouteQuery,
  key: string
) => {
  const value = source[key];
  if (Array.isArray(value)) {
    if (value[0]) target[key] = value[0];
    return;
  }
  if (value) target[key] = value;
};

export const buildExperienceOverviewHref = (scope: ExperienceRouteScope = {}) =>
  `${getExperienceBasePath(scope)}/overview`;

export const buildExperienceModuleHref = (
  experienceType: ExperienceType,
  scope: ExperienceRouteScope = {},
  query?: ExperienceRouteQuery
) =>
  appendQuery(
    `${getExperienceBasePath(scope)}/${experienceType}`,
    pickModuleQuery(experienceType, query)
  );

export const buildCommunityOnboardingHref = (
  scope: ExperienceRouteScope = {},
  query?: ExperienceRouteQuery
) => buildExperienceModuleHref('community-onboarding', scope, query);

export const buildIssueContributionHref = (
  scope: ExperienceRouteScope = {},
  query?: ExperienceRouteQuery
) => buildExperienceModuleHref('issue-contribution', scope, query);

export const buildCiExperienceHref = (
  scope: ExperienceRouteScope = {},
  query?: ExperienceRouteQuery
) => buildExperienceModuleHref('ci-experience', scope, query);

export const buildLegacyCommunityRepoManagementHref = (
  scope: ExperienceRouteScope = {}
) => {
  const orgSegment = scope.org?.trim();
  return orgSegment
    ? `${EXPERIENCE_ROOT}/${encodeURIComponent(
        orgSegment
      )}/community-experience/repo-management`
    : `${EXPERIENCE_ROOT}/community-experience/repo-management`;
};

export const buildLegacyCommunityTaskManagementHref = (
  scope: ExperienceRouteScope = {}
) => {
  const orgSegment = scope.org?.trim();
  return orgSegment
    ? `${EXPERIENCE_ROOT}/${encodeURIComponent(
        orgSegment
      )}/community-experience/task-management`
    : `${EXPERIENCE_ROOT}/community-experience/task-management`;
};

export const getExperienceModuleSwitchQuery = ({
  sourceType,
  targetType,
  query,
}: ModuleSwitchQueryOptions): ExperienceRouteQuery => {
  if (targetType === 'community-onboarding') {
    return {};
  }

  const targetQuery: ExperienceRouteQuery = {};
  if (
    sourceType &&
    sourceType !== targetType &&
    WEEKLY_EXPERIENCE_TYPES.has(sourceType) &&
    WEEKLY_EXPERIENCE_TYPES.has(targetType)
  ) {
    copySingleQueryValue(targetQuery, query, 'platform');
  }

  return targetQuery;
};
