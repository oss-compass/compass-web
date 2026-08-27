import type {
  IssueOverviewApiResponse,
  IssueReportApiResponse,
  IssueReportFilters,
  IssueTopPainsApiResponse,
  IssueTopPainsQuery,
} from './types';

/**
 * 报告数据已入库 cogito-backend（ES），此处直连后端 API。
 *
 * 环境变量优先级（与社区入门 UserJourney apiClient 一致）：
 * - 本地开发：设置 NEXT_PUBLIC_COMPASS_API_URL=http://localhost:8099
 * - 生产部署：留空，使用相对路径，由域名服务器 Nginx 转发到后端
 */
const getApiBase = (): string =>
  process.env.NEXT_PUBLIC_COMPASS_API_URL?.replace(/\/$/, '') || '';

// 本地开发指向测试后端：NEXT_PUBLIC_USER_JOURNEY_API_PREFIX=/user-journey-api-test/user-journey
const USER_JOURNEY_PREFIX =
  process.env.NEXT_PUBLIC_USER_JOURNEY_API_PREFIX ||
  '/user-journey-api/user-journey';

const API_PREFIX = `${USER_JOURNEY_PREFIX}/issue-experience`;

const REPORT_API_PATH = `${API_PREFIX}/reports`;
const OVERVIEW_API_PATH = `${API_PREFIX}/overview`;
const TOP_PAINS_API_PATH = `${API_PREFIX}/overview/top-pains`;
const REPO_TEAMS_API_PATH = `${API_PREFIX}/overview/repo-teams`;

export type RepoTeamItem = { repoShort: string; teamName: string };

export const fetchRepoTeams = async (
  signal?: AbortSignal
): Promise<{ items: RepoTeamItem[] }> => {
  const response = await fetch(`${getApiBase()}${REPO_TEAMS_API_PATH}`, {
    signal,
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Repo teams request failed: ${response.status}`);
  }
  return response.json() as Promise<{ items: RepoTeamItem[] }>;
};

export const fetchIssueReportData = async (
  filters: IssueReportFilters,
  signal?: AbortSignal
): Promise<IssueReportApiResponse> => {
  const search = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });

  const query = search.toString();
  const base = `${getApiBase()}${REPORT_API_PATH}`;
  const response = await fetch(query ? `${base}?${query}` : base, { signal });

  if (!response.ok) {
    throw new Error(`Issue report request failed: ${response.status}`);
  }

  return response.json() as Promise<IssueReportApiResponse>;
};

export const fetchIssueOverview = async (
  org?: string,
  signal?: AbortSignal
): Promise<IssueOverviewApiResponse> => {
  const query = org ? `?org=${encodeURIComponent(org)}` : '';
  const response = await fetch(`${getApiBase()}${OVERVIEW_API_PATH}${query}`, {
    signal,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Issue overview request failed: ${response.status}`);
  }

  return response.json() as Promise<IssueOverviewApiResponse>;
};

/** 重点待办痛点：服务端分页 + 仓库/优先级过滤，按页拉取。 */
export const fetchIssueTopPains = async (
  params: IssueTopPainsQuery,
  signal?: AbortSignal
): Promise<IssueTopPainsApiResponse> => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value));
  });

  const query = search.toString();
  const base = `${getApiBase()}${TOP_PAINS_API_PATH}`;
  const response = await fetch(query ? `${base}?${query}` : base, {
    signal,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Issue top pains request failed: ${response.status}`);
  }

  return response.json() as Promise<IssueTopPainsApiResponse>;
};
