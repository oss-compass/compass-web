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
  issue_resolution_numerator?: number | null;
  issue_resolution_denominator?: number | null;
  unresponsive_issue_count?: number | null;
  avg_response_time?: number | null;
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
  contributor?: ContributorOrganizationInfo | null;
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

export interface CommunityPullSummaryItem {
  identifier?: string | null;
  repoUrl?: string | null;
  pullTotalCount?: number | null;
  pullOpenCount?: number | null;
  closedLoopRate?: number | null;
  avgClosedLoopTime?: number | null;
  avgFirstResponseTime?: number | null;
  openUnresponsiveCount?: number | null;
}

// Issue 详情
export interface IssueDetail {
  assigneeLogin?: string | null;
  closedAt?: string | null;
  contributor?: ContributorOrganizationInfo | null;
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

export interface CommunityIssueSummaryItem {
  identifier?: string | null;
  repoUrl?: string | null;
  issueTotalCount?: number | null;
  issueOpenCount?: number | null;
  closedLoopRate?: number | null;
  avgClosedLoopTime?: number | null;
  avgFirstResponseTime?: number | null;
  openUnresponsiveCount?: number | null;
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

export interface ContributorOrganizationInfo {
  organization?: string | null;
  isInternal?: boolean | null;
}

// 分页响应
export interface PageResponse<T> {
  count: number;
  page: number;
  totalPage: number;
  total_page?: number;
  items: T[];
  origin?: string | null;
}

export interface RepositoryListResponse {
  items: string[];
}

export interface OrganizationListResponse {
  count?: number | null;
  organizations: string[];
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

export interface CommunityPullSummaryListRequest {
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
export interface CommunityIssueSummaryListRequest {
  label: string;
  level?: string;
  page?: number;
  per?: number;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
  beginDate?: Date;
  endDate?: Date;
}

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

export interface RepositoryListRequest {
  label: string;
  level?: string;
}

export interface OrganizationListRequest {
  label: string;
  beginDate?: Date;
  endDate?: Date;
}

export interface ManageUserOrgRequest {
  contributor: string;
  label: string;
  level: string;
  platform: string;
  organization: {
    org_name: string;
    first_date: string;
    last_date: string;
  };
}

export interface ManageUserOrgResponse {
  message?: string | null;
  pr_url?: string | null;
  prUrl?: string | null;
  status?: boolean | string | null;
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

const normalizeContributorOrganization = (
  rawContributor: any
): ContributorOrganizationInfo | null => {
  if (!rawContributor || typeof rawContributor !== 'object') {
    return null;
  }

  return {
    organization:
      rawContributor.organization ?? rawContributor.org_name ?? null,
    isInternal: rawContributor.isInternal ?? rawContributor.is_internal ?? null,
  };
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
  const data: any = response.data as any;
  const items = Array.isArray(data?.items)
    ? data.items.map((raw: any) => {
        if (!raw || typeof raw !== 'object') return raw;
        const url =
          typeof raw.url === 'string'
            ? raw.url.replaceAll('`', '').trim()
            : raw.url;
        const repository =
          typeof raw.repository === 'string'
            ? raw.repository.replaceAll('`', '').trim()
            : raw.repository;
        const createdAt = raw.createdAt ?? raw.created_at ?? null;
        const closedAt = raw.closedAt ?? raw.closed_at ?? null;
        const idInRepoRaw = raw.idInRepo ?? raw.id_in_repo ?? null;
        const idInRepo =
          typeof idInRepoRaw === 'string' ? Number(idInRepoRaw) : idInRepoRaw;
        const timeToCloseDays =
          raw.timeToCloseDays ?? raw.time_to_close_days ?? null;
        const timeToFirstAttentionWithoutBot =
          raw.timeToFirstAttentionWithoutBot ??
          raw.time_to_first_attention_without_bot ??
          null;
        const mergeAuthorLogin =
          raw.mergeAuthorLogin ?? raw.merge_author_login ?? null;
        const reviewersLogin =
          raw.reviewersLogin ?? raw.reviewers_login ?? null;
        const numReviewComments =
          raw.numReviewComments ?? raw.num_review_comments ?? null;
        const userLogin = raw.userLogin ?? raw.user_login ?? null;
        const contributor = normalizeContributorOrganization(raw.contributor);
        return {
          ...raw,
          url,
          repository,
          createdAt,
          closedAt,
          idInRepo: Number.isFinite(idInRepo) ? idInRepo : null,
          timeToCloseDays,
          timeToFirstAttentionWithoutBot,
          mergeAuthorLogin,
          reviewersLogin,
          numReviewComments,
          userLogin,
          contributor,
        } as PullDetail;
      })
    : [];
  return { ...data, items } as PageResponse<PullDetail>;
};

export const fetchCommunityPullSummaryList = async (
  params: CommunityPullSummaryListRequest
): Promise<PageResponse<CommunityPullSummaryItem>> => {
  const response = await axios.post<PageResponse<CommunityPullSummaryItem>>(
    '/services/dashboard/community_pull_summary_list',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  const data: any = response.data as any;
  const items = Array.isArray(data?.items)
    ? data.items.map((raw: any) => {
        if (!raw || typeof raw !== 'object') return raw;

        const identifier =
          typeof raw.identifier === 'string'
            ? raw.identifier.replaceAll('`', '').trim() || null
            : null;
        const repoUrlRaw = raw.repoUrl ?? raw.repo_url ?? null;
        const repoUrl =
          typeof repoUrlRaw === 'string'
            ? repoUrlRaw.replaceAll('`', '').trim()
            : null;
        const pullTotalCountRaw =
          raw.pullTotalCount ?? raw.pull_total_count ?? null;
        const pullOpenCountRaw =
          raw.pullOpenCount ?? raw.pull_open_count ?? null;
        const closedLoopRateRaw =
          raw.closedLoopRate ?? raw.closed_loop_rate ?? null;
        const avgClosedLoopTimeRaw =
          raw.avgClosedLoopTime ?? raw.avg_closed_loop_time ?? null;
        const avgFirstResponseTimeRaw =
          raw.avgFirstResponseTime ?? raw.avg_first_response_time ?? null;
        const openUnresponsiveCountRaw =
          raw.openUnresponsiveCount ?? raw.open_unresponsive_count ?? null;

        return {
          ...raw,
          identifier,
          repoUrl,
          pullTotalCount:
            pullTotalCountRaw == null ? null : Number(pullTotalCountRaw),
          pullOpenCount:
            pullOpenCountRaw == null ? null : Number(pullOpenCountRaw),
          closedLoopRate:
            closedLoopRateRaw == null ? null : Number(closedLoopRateRaw),
          avgClosedLoopTime:
            avgClosedLoopTimeRaw == null ? null : Number(avgClosedLoopTimeRaw),
          avgFirstResponseTime:
            avgFirstResponseTimeRaw == null
              ? null
              : Number(avgFirstResponseTimeRaw),
          openUnresponsiveCount:
            openUnresponsiveCountRaw == null
              ? null
              : Number(openUnresponsiveCountRaw),
        } as CommunityPullSummaryItem;
      })
    : [];

  return {
    ...data,
    totalPage: data?.totalPage ?? data?.total_page ?? 0,
    items,
  } as PageResponse<CommunityPullSummaryItem>;
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
  const data: any = response.data as any;
  const items = Array.isArray(data?.items)
    ? data.items.map((raw: any) => {
        if (!raw || typeof raw !== 'object') return raw;
        const url =
          typeof raw.url === 'string'
            ? raw.url.replaceAll('`', '').trim()
            : raw.url;
        const repository =
          typeof raw.repository === 'string'
            ? raw.repository.replaceAll('`', '').trim()
            : raw.repository;
        const createdAt = raw.createdAt ?? raw.created_at ?? null;
        const closedAt = raw.closedAt ?? raw.closed_at ?? null;
        const idInRepoRaw = raw.idInRepo ?? raw.id_in_repo ?? null;
        const idInRepo =
          typeof idInRepoRaw === 'string' ? Number(idInRepoRaw) : idInRepoRaw;
        const timeToCloseDays =
          raw.timeToCloseDays ?? raw.time_to_close_days ?? null;
        const timeToFirstAttentionWithoutBot =
          raw.timeToFirstAttentionWithoutBot ??
          raw.time_to_first_attention_without_bot ??
          null;
        const numOfCommentsWithoutBot =
          raw.numOfCommentsWithoutBot ??
          raw.num_of_comments_without_bot ??
          null;
        const userLogin = raw.userLogin ?? raw.user_login ?? null;
        const assigneeLogin = raw.assigneeLogin ?? raw.assignee_login ?? null;
        const contributor = normalizeContributorOrganization(raw.contributor);
        return {
          ...raw,
          url,
          repository,
          createdAt,
          closedAt,
          idInRepo: Number.isFinite(idInRepo) ? idInRepo : null,
          timeToCloseDays,
          timeToFirstAttentionWithoutBot,
          numOfCommentsWithoutBot,
          userLogin,
          assigneeLogin,
          contributor,
        } as IssueDetail;
      })
    : [];
  return { ...data, items } as PageResponse<IssueDetail>;
};

export const fetchCommunityIssueSummaryList = async (
  params: CommunityIssueSummaryListRequest
): Promise<PageResponse<CommunityIssueSummaryItem>> => {
  const response = await axios.post<PageResponse<CommunityIssueSummaryItem>>(
    '/services/dashboard/community_issue_summary_list',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  const data: any = response.data as any;
  const items = Array.isArray(data?.items)
    ? data.items.map((raw: any) => {
        if (!raw || typeof raw !== 'object') return raw;

        const identifier =
          typeof raw.identifier === 'string'
            ? raw.identifier.replaceAll('`', '').trim() || null
            : null;
        const repoUrlRaw = raw.repoUrl ?? raw.repo_url ?? null;
        const repoUrl =
          typeof repoUrlRaw === 'string'
            ? repoUrlRaw.replaceAll('`', '').trim()
            : null;
        const issueTotalCountRaw =
          raw.issueTotalCount ?? raw.issue_total_count ?? null;
        const issueOpenCountRaw =
          raw.issueOpenCount ?? raw.issue_open_count ?? null;
        const closedLoopRateRaw =
          raw.closedLoopRate ?? raw.closed_loop_rate ?? null;
        const avgClosedLoopTimeRaw =
          raw.avgClosedLoopTime ?? raw.avg_closed_loop_time ?? null;
        const avgFirstResponseTimeRaw =
          raw.avgFirstResponseTime ?? raw.avg_first_response_time ?? null;
        const openUnresponsiveCountRaw =
          raw.openUnresponsiveCount ?? raw.open_unresponsive_count ?? null;

        return {
          ...raw,
          identifier,
          repoUrl,
          issueTotalCount:
            issueTotalCountRaw == null ? null : Number(issueTotalCountRaw),
          issueOpenCount:
            issueOpenCountRaw == null ? null : Number(issueOpenCountRaw),
          closedLoopRate:
            closedLoopRateRaw == null ? null : Number(closedLoopRateRaw),
          avgClosedLoopTime:
            avgClosedLoopTimeRaw == null ? null : Number(avgClosedLoopTimeRaw),
          avgFirstResponseTime:
            avgFirstResponseTimeRaw == null
              ? null
              : Number(avgFirstResponseTimeRaw),
          openUnresponsiveCount:
            openUnresponsiveCountRaw == null
              ? null
              : Number(openUnresponsiveCountRaw),
        } as CommunityIssueSummaryItem;
      })
    : [];

  return {
    ...data,
    totalPage: data?.totalPage ?? data?.total_page ?? 0,
    items,
  } as PageResponse<CommunityIssueSummaryItem>;
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

/**
 * 获取社区/仓库下的仓库列表
 */
export const fetchRepositoryList = async (
  params: RepositoryListRequest
): Promise<RepositoryListResponse> => {
  const response = await axios.post<RepositoryListResponse>(
    '/services/dashboard/repository_list',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );
  return {
    items: Array.isArray(response.data?.items)
      ? response.data.items
          .filter((item): item is string => typeof item === 'string')
          .map((item) => item.replaceAll('`', '').trim())
      : [],
  };
};

export const fetchOrganizationList = async (
  params: OrganizationListRequest
): Promise<OrganizationListResponse> => {
  const response = await axios.post<OrganizationListResponse>(
    '/services/dashboard/organization_list',
    {
      ...params,
      label: formatProjectLabel(params.label),
    }
  );

  const organizations = Array.isArray(response.data?.organizations)
    ? response.data.organizations
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.replaceAll('`', '').trim())
        .filter((item) => item.length > 0)
    : [];

  return {
    count: response.data?.count ?? organizations.length,
    organizations,
  };
};

export const manageOsBoardUserOrg = async (
  params: ManageUserOrgRequest
): Promise<ManageUserOrgResponse> => {
  const response = await axios.post<ManageUserOrgResponse>(
    '/services/dashboard/manage_user_orgs',
    params
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
  dashboardType?: 'repo' | 'community';
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
  dashboardType = 'repo',
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
      dashboardType,
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
        level: dashboardType === 'community' ? 'community' : 'repo',
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
export const useOsBoardCommunityPullSummaryList = ({
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
      'osBoardCommunityPullSummaryList',
      project,
      page,
      per,
      filterOpts,
      sortOpts,
      timeStart,
      timeEnd,
    ],
    queryFn: () =>
      fetchCommunityPullSummaryList({
        label: project,
        level: 'community',
        page,
        per,
        filterOpts,
        sortOpts,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 * Issue 璇︽儏鍒楄〃 Hook
 */
export const useOsBoardIssuesDetailList = ({
  project,
  dashboardType = 'repo',
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
      dashboardType,
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
        level: dashboardType === 'community' ? 'community' : 'repo',
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

export const useOsBoardCommunityIssueSummaryList = ({
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
      'osBoardCommunityIssueSummaryList',
      project,
      page,
      per,
      filterOpts,
      sortOpts,
      timeStart,
      timeEnd,
    ],
    queryFn: () =>
      fetchCommunityIssueSummaryList({
        label: project,
        level: 'community',
        page,
        per,
        filterOpts,
        sortOpts,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

/**
 * 贡献者详情列表 Hook
 */
export const useOsBoardContributorsDetailList = ({
  project,
  dashboardType = 'repo',
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
      dashboardType,
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
        level: dashboardType === 'community' ? 'community' : 'repo',
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

interface UseRepositoryListOptions {
  project: string;
  level?: 'repo' | 'community';
  enabled?: boolean;
}

interface UseOrganizationListOptions {
  project: string;
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

/**
 * 仓库列表 Hook
 */
export const useOsBoardRepositoryList = ({
  project,
  level = 'community',
  enabled = true,
}: UseRepositoryListOptions) => {
  return useQuery({
    queryKey: ['osBoardRepositoryList', project, level],
    queryFn: () =>
      fetchRepositoryList({
        label: project,
        level,
      }),
    enabled: enabled && !!project,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useOsBoardOrganizationList = ({
  project,
  enabled = true,
}: UseOrganizationListOptions) => {
  const { timeStart, timeEnd } = useOsBoardDateRange();

  return useQuery({
    queryKey: ['osBoardOrganizationList', project, timeStart, timeEnd],
    queryFn: () =>
      fetchOrganizationList({
        label: project,
        beginDate: timeStart,
        endDate: timeEnd,
      }),
    enabled: enabled && !!project,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
