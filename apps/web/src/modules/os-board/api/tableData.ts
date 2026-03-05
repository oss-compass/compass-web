import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useOsBoardDateRange from '../hooks/useOsBoardDateRange';

// ========== 类型定义 ==========

// 概览统计 - 最高贡献贡献者 (API 返回格式)
export interface TopContributor {
  name?: string | null;
  origin?: string | null;
}

// 概览统计 - 最高贡献组织 (API 返回格式)
export interface TopOrganization {
  name?: string | null;
  origin?: string | null;
}

// 贡献者概览响应 (匹配 API 实际返回字段)
export interface ContributorsOverviewResponse {
  contributors_count?: number | null;
  organizations_count?: number | null;
  top_contributors?: TopContributor[] | null;
  top_organizations?: TopOrganization[] | null;
}

// Issue 概览响应 (匹配 API 实际返回字段)
export interface IssuesOverviewResponse {
  new_issue_count?: number | null;
  issue_resolution_percentage?: string | null;
  unresponsive_issue_count?: number | null;
  avg_comments?: number | null;
}

// PR 概览响应 (匹配 API 实际返回字段)
export interface PullsOverviewResponse {
  new_pr_count?: number | null;
  pr_resolution_percentage?: string | null;
  unresponsive_pr_count?: number | null;
  commit_count?: number | null;
}

// PR 详情
export interface PullDetail {
  closedAt?: string | null;
  createdAt?: string | null;
  idInRepo?: number | null;
  labels?: string[] | null;
  mergeAuthorLogin?: string | null;
  numReviewComments?: number | null;
  repository?: string | null;
  reviewersLogin?: string[] | null;
  state?: string | null;
  timeToCloseDays?: number | null;
  timeToFirstAttentionWithoutBot?: number | null;
  title?: string | null;
  url?: string | null;
  userLogin?: string | null;
}

// Issue 详情
export interface IssueDetail {
  assigneeLogin?: string | null;
  closedAt?: string | null;
  createdAt?: string | null;
  idInRepo?: number | null;
  labels?: string[] | null;
  numOfCommentsWithoutBot?: number | null;
  repository?: string | null;
  state?: string | null;
  timeToCloseDays?: number | null;
  timeToFirstAttentionWithoutBot?: number | null;
  title?: string | null;
  url?: string | null;
  userLogin?: string | null;
}

// 贡献类型项
export interface ContributionTypeItem {
  contribution_type: string;
  contribution: number;
}

// 贡献者详情 (API 返回下划线命名)
export interface ContributorDetail {
  contributor?: string | null;
  ecological_type?: string | null;
  mileage_type?: string | null;
  contribution_type_list?: ContributionTypeItem[] | null;
  organization?: string | null;
  contribution?: number | null;
  contribution_without_observe?: number | null;
  is_bot?: boolean | null;
}

// 分页响应
export interface PageResponse<T> {
  count: number;
  page: number;
  totalPage: number;
  items: T[];
}

// 排序选项
export interface SortOptionInput {
  type: string;
  direction: 'asc' | 'desc';
}

// 过滤选项
export interface FilterOptionInput {
  type: string;
  values: string[];
}

// PR 列表请求参数
export interface PullsDetailListRequest {
  label: string;
  level?: string;
  page?: number;
  per?: number;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
  beginDate?: Date;
  endDate?: Date;
}

// Issue 列表请求参数
export interface IssuesDetailListRequest {
  label: string;
  level?: string;
  page?: number;
  per?: number;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
  beginDate?: Date;
  endDate?: Date;
}

// 贡献者列表请求参数
export interface ContributorsDetailListRequest {
  label: string;
  level?: string;
  page?: number;
  per?: number;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
  beginDate?: Date;
  endDate?: Date;
}

// ========== 工具函数 ==========

/**
 * 将项目 URL 转换为 API 所需的 label 格式
 */
const formatProjectLabel = (project: string): string => {
  if (
    project.startsWith('github:') ||
    project.startsWith('gitee:') ||
    project.startsWith('gitcode:')
  ) {
    return project;
  }
  return project;
};

// ========== API 函数 ==========

/**
 * 获取 PR 详情列表
 */
export const fetchPullsDetailList = async (
  params: PullsDetailListRequest
): Promise<PageResponse<PullDetail>> => {
  const response = await axios.post<PageResponse<PullDetail>>(
    '/services/dashboard/pulls_detail_list',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  return response.data;
};

/**
 * 获取 Issue 详情列表
 */
export const fetchIssuesDetailList = async (
  params: IssuesDetailListRequest
): Promise<PageResponse<IssueDetail>> => {
  const response = await axios.post<PageResponse<IssueDetail>>(
    '/services/dashboard/issues_detail_list',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  return response.data;
};

/**
 * 获取贡献者详情列表
 */
export const fetchContributorsDetailList = async (
  params: ContributorsDetailListRequest
): Promise<PageResponse<ContributorDetail>> => {
  const response = await axios.post<PageResponse<ContributorDetail>>(
    '/services/dashboard/contributors_detail_list',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  return response.data;
};

// ========== 概览统计 API ==========

/**
 * 获取贡献者概览统计
 */
export const fetchContributorsOverview = async (params: {
  label: string;
  level?: string;
  beginDate?: Date;
  endDate?: Date;
}): Promise<ContributorsOverviewResponse> => {
  const response = await axios.post<ContributorsOverviewResponse>(
    '/services/dashboard/contributors_overview',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  return response.data;
};

/**
 * 获取 Issue 概览统计
 */
export const fetchIssuesOverview = async (params: {
  label: string;
  level?: string;
  beginDate?: Date;
  endDate?: Date;
}): Promise<IssuesOverviewResponse> => {
  const response = await axios.post<IssuesOverviewResponse>(
    '/services/dashboard/issues_overview',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  return response.data;
};

/**
 * 获取 PR 概览统计
 */
export const fetchPullsOverview = async (params: {
  label: string;
  level?: string;
  beginDate?: Date;
  endDate?: Date;
}): Promise<PullsOverviewResponse> => {
  const response = await axios.post<PullsOverviewResponse>(
    '/services/dashboard/pulls_overview',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  return response.data;
};

// ========== React Query Hooks ==========

interface UseTableDataOptions {
  project: string;
  page?: number;
  per?: number;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
  enabled?: boolean;
}

/**
 * PR 详情列表 Hook
 */
export const useOsBoardPullsDetailList = ({
  project,
  page = 1,
  per = 10,
  filterOpts = [],
  sortOpts,
  enabled = true,
}: UseTableDataOptions) => {
  const { timeStart, timeEnd } = useOsBoardDateRange();

  return useQuery({
    queryKey: [
      'osBoardPullsDetailList',
      project,
      page,
      per,
      filterOpts,
      sortOpts,
      timeStart,
      timeEnd,
    ],
    queryFn: () =>
      fetchPullsDetailList({
        label: project,
        level: 'repo',
        page,
        per,
        filterOpts,
        sortOpts,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000, // 1 分钟
    refetchOnWindowFocus: false,
  });
};

/**
 * Issue 详情列表 Hook
 */
export const useOsBoardIssuesDetailList = ({
  project,
  page = 1,
  per = 10,
  filterOpts = [],
  sortOpts,
  enabled = true,
}: UseTableDataOptions) => {
  const { timeStart, timeEnd } = useOsBoardDateRange();

  return useQuery({
    queryKey: [
      'osBoardIssuesDetailList',
      project,
      page,
      per,
      filterOpts,
      sortOpts,
      timeStart,
      timeEnd,
    ],
    queryFn: () =>
      fetchIssuesDetailList({
        label: project,
        level: 'repo',
        page,
        per,
        filterOpts,
        sortOpts,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000, // 1 分钟
    refetchOnWindowFocus: false,
  });
};

/**
 * 贡献者详情列表 Hook
 */
export const useOsBoardContributorsDetailList = ({
  project,
  page = 1,
  per = 10,
  filterOpts = [],
  sortOpts,
  enabled = true,
}: UseTableDataOptions) => {
  const { timeStart, timeEnd } = useOsBoardDateRange();

  return useQuery({
    queryKey: [
      'osBoardContributorsDetailList',
      project,
      page,
      per,
      filterOpts,
      sortOpts,
      timeStart,
      timeEnd,
    ],
    queryFn: () =>
      fetchContributorsDetailList({
        label: project,
        level: 'repo',
        page,
        per,
        filterOpts,
        sortOpts,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000, // 1 分钟
    refetchOnWindowFocus: false,
  });
};

// ========== 概览统计 Hooks ==========

interface UseOverviewOptions {
  project: string;
  level?: 'repo' | 'community';
  enabled?: boolean;
}

/**
 * 贡献者概览统计 Hook
 */
export const useOsBoardContributorsOverview = ({
  project,
  level = 'repo',
  enabled = true,
}: UseOverviewOptions) => {
  const { timeStart, timeEnd } = useOsBoardDateRange();

  return useQuery({
    queryKey: [
      'osBoardContributorsOverview',
      project,
      level,
      timeStart,
      timeEnd,
    ],
    queryFn: () =>
      fetchContributorsOverview({
        label: project,
        level,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 * Issue 概览统计 Hook
 */
export const useOsBoardIssuesOverview = ({
  project,
  level = 'repo',
  enabled = true,
}: UseOverviewOptions) => {
  const { timeStart, timeEnd } = useOsBoardDateRange();

  return useQuery({
    queryKey: ['osBoardIssuesOverview', project, level, timeStart, timeEnd],
    queryFn: () =>
      fetchIssuesOverview({
        label: project,
        level,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 * PR 概览统计 Hook
 */
export const useOsBoardPullsOverview = ({
  project,
  level = 'repo',
  enabled = true,
}: UseOverviewOptions) => {
  const { timeStart, timeEnd } = useOsBoardDateRange();

  return useQuery({
    queryKey: ['osBoardPullsOverview', project, level, timeStart, timeEnd],
    queryFn: () =>
      fetchPullsOverview({
        label: project,
        level,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
