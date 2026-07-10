/**
 * UserJourney 后端 API 客户端
 *
 * 环境变量优先级：
 * NEXT_PUBLIC_COMPASS_API_URL （前端运行时可访问）
 *
 * 本地开发默认值：http://localhost:8000
 */

const getApiBase = (): string => {
  // 本地开发：设置 NEXT_PUBLIC_COMPASS_API_URL=http://localhost:8099
  // 生产部署：留空，使用相对路径，由域名服务器 Nginx 转发到后端
  return process.env.NEXT_PUBLIC_COMPASS_API_URL?.replace(/\/$/, '') || '';
};

const API_PREFIX = '/user-journey-api/user-journey';
const COMPASS_OPERATOR_TOKEN_KEY = 'compass:user-journey:operator-token';

export const compassApiUrl = (path: string): string => {
  const base = getApiBase();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${API_PREFIX}${normalizedPath}`;
};

/**
 * 通用 JSON 请求，抛出带状态码的错误
 */
export const compassApiFetch = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const url = compassApiUrl(path);
  const res = await fetch(url, { cache: 'no-store', ...(init ?? {}) });

  if (!res.ok) {
    throw new Error(`[CompassAPI] ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
};

export type CompassOperatorRole = 'admin' | 'repo_owner';

export type CompassOperatorUser = {
  user_id: string;
  username: string;
  display_name: string;
  role: CompassOperatorRole;
  repo_keys: string[];
  repo_names: string[];
  enabled: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  last_login_at?: string | null;
};

export type CompassOperatorLoginResponse = {
  access_token: string;
  token_type: 'bearer';
  expires_in_seconds: number;
  user: CompassOperatorUser;
};

export type CompassOperatorChangePasswordResponse = {
  message: string;
  user: CompassOperatorUser;
};

export type RepoManagementItem = {
  id: string;
  seq_no: number;
  repo_name: string;
  community_name?: string;
  project_key: string;
  owner: string | string[];
  owner_email: string | string[];
  team_no?: number | null;
  team_name: string;
  hardware_env: string;
  hardware_envs?: string[];
  benchmark_repo_name: string;
  benchmark_project_key: string;
  overview_enabled?: boolean;
  repo_status?: 'online' | 'registered' | 'offline';
  latest_report_id?: string;
  latestReportId?: string;
  latest_report_detail_url?: string;
  latestReportDetailUrl?: string;
  remark: string;
  updated_at?: string | null;
  updated_by?: string | null;
};

export type RepoManagementListResponse = {
  total: number;
  page: number;
  size: number;
  items: RepoManagementItem[];
  status_counts?: {
    all?: number;
    online?: number;
    registered?: number;
    offline?: number;
  };
  team_options?: string[];
  owner_options?: string[];
  hardware_options?: string[];
  all_team_options?: string[];
  all_hardware_options?: string[];
  all_owner_options?: Array<{ name: string; email?: string }>;
};

export type RepoManagementRegisterOption = {
  value: string;
  label: string;
  repo_name?: string;
  community_name?: string;
};

export type RepoManagementRegisterOptionsResponse = {
  total: number;
  items: RepoManagementRegisterOption[];
};

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item || '').trim()).filter(Boolean);
};

const normalizeCompassOperatorUser = (
  user: Partial<CompassOperatorUser> | null | undefined
): CompassOperatorUser => ({
  user_id: String(user?.user_id || user?.username || ''),
  username: String(user?.username || ''),
  display_name: String(user?.display_name || user?.username || ''),
  role: user?.role === 'admin' ? 'admin' : 'repo_owner',
  repo_keys: toStringArray(user?.repo_keys),
  repo_names: toStringArray(user?.repo_names),
  enabled: Boolean(user?.enabled),
  created_at: user?.created_at ?? null,
  updated_at: user?.updated_at ?? null,
  last_login_at: user?.last_login_at ?? null,
});

export type RepoRerunJob = {
  job_id: string;
  project_key: string;
  repo_name: string;
  repo_url?: string;
  team_name: string;
  file_key: string;
  report_id: string;
  branch?: string;
  requested_by: string;
  requested_by_role: CompassOperatorRole;
  trigger_source?: 'manual' | 'scheduled';
  schedule_date?: string;
  status:
    | 'queued'
    | 'pending'
    | 'running'
    | 'completed'
    | 'failed'
    | 'cancelled'
    | 'timeout';
  message: string;
  third_party_task_id?: string;
  third_party_status?: string;
  third_party_hardware?: string;
  queue_rank?: number | null;
  generated_report_id?: string;
  generated_file_key?: string;
  generated_report_review_id?: string;
  generated_report_review_status?: string;
  generated_report_detail_url?: string;
  selected_node_id?: string;
  selected_node_name?: string;
  selected_node_hardware?: string;
  progress_current_phase?: string;
  progress_completed_phases?: string[];
  error_message?: string;
  worker_node?: string;
  retry_count?: number;
  report_json_url?: string;
  report_md_url?: string;
  log_json_url?: string;
  container_log_url?: string;
  sdx_score?: number | null;
  log_items?: RepoRerunLogItem[];
  sync_error?: string;
  last_synced_at?: string;
  started_at?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type RepoRerunJobListResponse = {
  total: number;
  page: number;
  size: number;
  items: RepoRerunJob[];
};

export type RepoRerunScheduleConfig = {
  enabled: boolean;
  schedule_period: 'daily' | 'weekly';
  timezone: string;
  next_trigger_at?: string | null;
  updated_by?: string;
  updated_at?: string | null;
  last_run_at?: string | null;
  last_run_date?: string;
  last_run_result?: {
    candidate_count?: number;
    triggered_count?: number;
    already_running_count?: number;
    failed_count?: number;
  };
};

export type RepoRerunLogItem = {
  timestamp?: string;
  time?: string;
  created_at?: string;
  level?: string;
  status?: string;
  phase?: string;
  step?: string;
  message?: string;
  detail?: string;
  output?: string;
  output_summary?: string;
  [key: string]: unknown;
};

export type DevxNodeStatus = {
  node_id?: string;
  node_name?: string;
  name?: string;
  hostname?: string;
  hardware?: string;
  max_slots?: number;
  used_slots?: number;
  free_slots?: number;
  status?: string;
  [key: string]: unknown;
};

export const getCompassOperatorToken = (): string => {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(COMPASS_OPERATOR_TOKEN_KEY) || '';
};

export const setCompassOperatorToken = (token: string) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COMPASS_OPERATOR_TOKEN_KEY, token);
};

export const clearCompassOperatorToken = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(COMPASS_OPERATOR_TOKEN_KEY);
};

const compassApiAuthedFetch = async <T>(
  path: string,
  token: string,
  init?: RequestInit
): Promise<T> => {
  const headers = new Headers(init?.headers ?? {});
  headers.set('Authorization', `Bearer ${token}`);
  const url = compassApiUrl(path);
  const res = await fetch(url, {
    cache: 'no-store',
    ...(init ?? {}),
    headers,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const detail = (errBody as { detail?: string }).detail;
    throw new Error(detail || `[CompassAPI] ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
};

export const loginCompassOperator = async (payload: {
  username: string;
  password: string;
}): Promise<CompassOperatorLoginResponse> => {
  const url = compassApiUrl('/auth/login');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error((errBody as { detail?: string }).detail || '登录失败');
  }
  const data = (await res.json()) as CompassOperatorLoginResponse;
  return {
    ...data,
    user: normalizeCompassOperatorUser(data.user),
  };
};

export const registerCompassOperator = async (payload: {
  username: string;
  password: string;
  repo_keys: string[];
  repo_names: string[];
}): Promise<CompassOperatorLoginResponse> => {
  const url = compassApiUrl('/auth/register');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error((errBody as { detail?: string }).detail || '注册失败');
  }
  const data = (await res.json()) as CompassOperatorLoginResponse;
  return {
    ...data,
    user: normalizeCompassOperatorUser(data.user),
  };
};

export const fetchRepoManagementRegisterOptions =
  async (): Promise<RepoManagementRegisterOptionsResponse> => {
    const url = compassApiUrl('/auth/register-repo-options');
    const res = await fetch(url);
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(
        (errBody as { detail?: string }).detail || '获取负责仓库列表失败'
      );
    }
    return (await res.json()) as RepoManagementRegisterOptionsResponse;
  };

export const fetchCompassOperatorMe = async (
  token = getCompassOperatorToken()
): Promise<CompassOperatorUser> => {
  if (!token) {
    throw new Error('未登录');
  }
  const user = await compassApiAuthedFetch<CompassOperatorUser>(
    '/auth/me',
    token
  );
  return normalizeCompassOperatorUser(user);
};

export const changeCompassOperatorPassword = async (
  payload: {
    current_password: string;
    new_password: string;
  },
  token = getCompassOperatorToken()
): Promise<CompassOperatorChangePasswordResponse> => {
  if (!token) {
    throw new Error('未登录');
  }
  const result =
    await compassApiAuthedFetch<CompassOperatorChangePasswordResponse>(
      '/auth/change-password',
      token,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
  return {
    ...result,
    user: normalizeCompassOperatorUser(result.user),
  };
};

export const fetchRepoManagementRepos = async (
  params: {
    keyword?: string;
    teamName?: string;
    owner?: string;
    hardwareEnv?: string;
    status?: 'online' | 'registered' | 'offline';
    sortKey?: 'benchmark_repo_name' | 'overview_enabled';
    sortOrder?: 'ascend' | 'descend';
    page?: number;
    size?: number;
  },
  token = getCompassOperatorToken()
): Promise<RepoManagementListResponse> => {
  if (!token) {
    throw new Error('未登录');
  }
  const search = new URLSearchParams();
  if (params.keyword) search.set('keyword', params.keyword);
  if (params.teamName) search.set('team_name', params.teamName);
  if (params.owner) search.set('owner', params.owner);
  if (params.hardwareEnv) search.set('hardware_env', params.hardwareEnv);
  if (params.status) search.set('status', params.status);
  if (params.sortKey) search.set('sort_key', params.sortKey);
  if (params.sortOrder) search.set('sort_order', params.sortOrder);
  search.set('page', String(params.page ?? 1));
  search.set('size', String(params.size ?? 20));
  return compassApiAuthedFetch<RepoManagementListResponse>(
    `/repo-management/repos?${search.toString()}`,
    token
  );
};

export const upsertRepoManagementRepo = async (
  payload: {
    repo_name: string;
    community_name?: string;
    owner?: string | string[];
    owner_email?: string | string[];
    team_no?: number | null;
    team_name?: string;
    hardware_env?: string;
    hardware_envs?: string[];
    benchmark_repo_name?: string;
    overview_enabled?: boolean;
    remark?: string;
  },
  token = getCompassOperatorToken()
): Promise<{ message: string; data: RepoManagementItem }> => {
  if (!token) {
    throw new Error('未登录');
  }
  return compassApiAuthedFetch<{ message: string; data: RepoManagementItem }>(
    '/repo-management/repos',
    token,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
};

export const deleteRepoManagementRepo = async (
  repoName: string,
  token = getCompassOperatorToken()
): Promise<{ message: string; data: { repo_name: string } }> => {
  if (!token) {
    throw new Error('未登录');
  }
  return compassApiAuthedFetch<{
    message: string;
    data: { repo_name: string };
  }>(`/repo-management/repos/${encodeURIComponent(repoName)}`, token, {
    method: 'DELETE',
  });
};

export const triggerOverviewRepoRerun = async (
  projectKey: string,
  payload?: {
    selected_node_id?: string;
    selected_node_name?: string;
    selected_node_hardware?: string;
  },
  token = getCompassOperatorToken()
): Promise<{ message: string; data: RepoRerunJob }> => {
  if (!token) {
    throw new Error('未登录');
  }
  return compassApiAuthedFetch<{ message: string; data: RepoRerunJob }>(
    `/overview/repos/${encodeURIComponent(projectKey)}/rerun`,
    token,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload ?? {}),
    }
  );
};

export const cancelOverviewRepoRerun = async (
  projectKey: string,
  jobId: string,
  token = getCompassOperatorToken()
): Promise<{ message: string; data: RepoRerunJob }> => {
  if (!token) {
    throw new Error('未登录');
  }
  return compassApiAuthedFetch<{ message: string; data: RepoRerunJob }>(
    `/overview/repos/${encodeURIComponent(
      projectKey
    )}/rerun-jobs/${encodeURIComponent(jobId)}`,
    token,
    { method: 'DELETE' }
  );
};

export const fetchOverviewRepoRerunStatuses = async (
  projectKeys: string[]
): Promise<{
  items: RepoRerunJob[];
  by_project_key: Record<string, RepoRerunJob>;
}> => {
  const keys = projectKeys
    .map((item) => String(item || '').trim())
    .filter(Boolean);
  if (!keys.length) {
    return { items: [], by_project_key: {} };
  }
  const search = new URLSearchParams();
  search.set('project_keys', keys.join(','));
  return compassApiFetch<{
    items: RepoRerunJob[];
    by_project_key: Record<string, RepoRerunJob>;
  }>(`/overview/repos/rerun-statuses?${search.toString()}`);
};

export const fetchOverviewRepoRerunRecords = async (
  projectKey: string,
  size = 10
): Promise<{ items: RepoRerunJob[] }> => {
  const search = new URLSearchParams();
  search.set('size', String(size));
  return compassApiFetch<{ items: RepoRerunJob[] }>(
    `/overview/repos/${encodeURIComponent(
      projectKey
    )}/rerun-records?${search.toString()}`
  );
};

export const fetchOverviewAllRepoRerunRecords = async (
  params: {
    keyword?: string;
    status?: RepoRerunJob['status'];
    teamName?: string;
    repoName?: string;
    triggerSource?: 'manual' | 'scheduled';
    page?: number;
    size?: number;
  },
  token = getCompassOperatorToken()
): Promise<RepoRerunJobListResponse> => {
  if (!token) {
    throw new Error('未登录');
  }
  const search = new URLSearchParams();
  if (params.keyword) search.set('keyword', params.keyword);
  if (params.status) search.set('status', params.status);
  if (params.teamName) search.set('team_name', params.teamName);
  if (params.repoName) search.set('repo_name', params.repoName);
  if (params.triggerSource) search.set('trigger_source', params.triggerSource);
  search.set('page', String(params.page ?? 1));
  search.set('size', String(params.size ?? 20));
  return compassApiAuthedFetch<RepoRerunJobListResponse>(
    `/overview/repos/rerun-records?${search.toString()}`,
    token
  );
};

export const deleteOverviewRepoRerunRecord = async (
  jobId: string,
  token = getCompassOperatorToken()
): Promise<{ message: string; data: RepoRerunJob }> => {
  if (!token) throw new Error('未登录');
  return compassApiAuthedFetch<{ message: string; data: RepoRerunJob }>(
    `/overview/repos/rerun-records/${encodeURIComponent(jobId)}`,
    token,
    { method: 'DELETE' }
  );
};

export const fetchRepoRerunScheduleConfig = async (
  token = getCompassOperatorToken()
): Promise<RepoRerunScheduleConfig> => {
  if (!token) throw new Error('未登录');
  return compassApiAuthedFetch<RepoRerunScheduleConfig>(
    '/overview/repos/rerun-schedule',
    token
  );
};

export const updateRepoRerunScheduleConfig = async (
  payload: {
    enabled?: boolean;
    schedule_period?: 'daily' | 'weekly';
  },
  token = getCompassOperatorToken()
): Promise<{ message: string; data: RepoRerunScheduleConfig }> => {
  if (!token) throw new Error('未登录');
  return compassApiAuthedFetch<{
    message: string;
    data: RepoRerunScheduleConfig;
  }>('/overview/repos/rerun-schedule', token, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const fetchOverviewRerunNodes = async (
  token = getCompassOperatorToken()
): Promise<{ items: DevxNodeStatus[] }> => {
  if (!token) {
    throw new Error('未登录');
  }
  return compassApiAuthedFetch<{ items: DevxNodeStatus[] }>(
    '/overview/rerun-nodes',
    token
  );
};

// ---------- 痛点确认 ----------

export type PainConfirmationRecord = {
  file_key: string;
  step_id: string;
  pain_index: number;
  pain_text: string;
  status: number;
  severity: string;
  action_reason?: string | null;
  reason?: string | null;
  is_common_issue?: boolean;
  common_issue_type?: string | null;
  issue_link: string | null;
  pr_link: string | null;
  expected_close_time?: string | null;
  actual_close_time?: string | null;
  retest_decision?: 'passed' | 'failed' | 'not_detected' | null;
  retest_passed_file_key?: string | null;
  latest_file_key?: string | null;
  non_project_review_status?: 'pending' | 'approved' | 'rejected' | null;
  non_project_review_reason?: string | null;
  non_project_reviewed_by?: string | null;
  non_project_reviewed_at?: string | null;
  confirmed_by: string;
  confirmed_at: string;
  history?: PainHistoryItem[];
};

export type PainConfirmationsResponse = {
  file_key: string;
  confirmations: PainConfirmationRecord[];
  overview_pains: any[]; // 对应 ES 中的 user_journey_overview_pains 结构
};

export type PainHistoryItem = {
  status: number;
  severity: string;
  action_reason?: string | null;
  reason?: string | null;
  is_common_issue?: boolean;
  common_issue_type?: string | null;
  issue_link: string | null;
  pr_link: string | null;
  expected_close_time?: string | null;
  actual_close_time?: string | null;
  retest_decision?: 'passed' | 'failed' | 'not_detected' | null;
  retest_passed_file_key?: string | null;
  non_project_review_status?: 'pending' | 'approved' | 'rejected' | null;
  non_project_review_reason?: string | null;
  non_project_reviewed_by?: string | null;
  non_project_reviewed_at?: string | null;
  confirmed_by: string | null;
  confirmed_at: string;
};

export type UpsertPainConfirmationPayload = {
  step_id: string;
  pain_index: number;
  pain_text: string;
  status: number;
  confirmed_by: string | null;
  action?: string;
  action_reason?: string;
  severity?: string;
  is_common_issue?: boolean;
  common_issue_type?: string | null;
  issue_link?: string;
  pr_link?: string;
  expected_close_time?: string;
  retest_decision?: 'passed' | 'failed' | 'not_detected';
  retest_passed_file_key?: string;
};

/**
 * 获取指定报告的所有痛点确认记录
 */
export const fetchPainConfirmations = async (
  fileKey: string
): Promise<PainConfirmationsResponse> => {
  const url = compassApiUrl(`/reports/${fileKey}/pain-confirmations`);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[CompassAPI] ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<PainConfirmationsResponse>;
};

/**
 * 新增或更新一条痛点确认（状态流转）
 */
export const upsertPainConfirmation = async (
  fileKey: string,
  payload: UpsertPainConfirmationPayload
): Promise<{ message: string; data: PainConfirmationRecord }> => {
  const url = compassApiUrl(`/reports/${fileKey}/pain-confirmations`);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      (errBody as { detail?: string }).detail ||
        `[CompassAPI] ${res.status} ${res.statusText}`
    );
  }
  return res.json();
};

// ---------- Overview Dashboard ----------

export type OverviewImprovementStatus =
  | 'pending'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export type OverviewPainPointRow = {
  id: string;
  parentId?: string;
  sourceType?: 'child' | 'parent';
  fileKey: string;
  stepId: string;
  taskId?: string;
  painIndex: number;
  journeyStage: string;
  firstFoundReportId: string;
  reportTotalScore: number;
  agentScoreAtFound: number;
  issueType: string;
  chipModel: string;
  projectKey?: string;
  projectName?: string;
  sig?: string;
  team?: string;
  teamOwner?: string;
  createdAt?: string;
  created_at?: string;
  report_generated_at?: string;
  isCommonIssue?: boolean;
  commonIssueType?: string;
  childIds?: string[];
  severity:
    | 'P0_BLOCKER'
    | 'P1_CRITICAL'
    | 'P2_MAJOR'
    | 'P3_MINOR'
    | 'P4_TRIVIAL'
    | '';
  description: string;
  owner: string;
  isRealIssue: boolean | null;
  remark: string;
  improvementStatus: OverviewImprovementStatus;
  status?: string;
  issueLink?: string;
  prLink?: string;
  issueOrPrLink: string;
  retestReportId: string;
  retestReportScore: number | null;
  agentScoreAfterRetest: number | null;
  actionReason?: string;
  confirmedBy?: string;
  confirmedAt?: string;
  statusHistory?: Array<{
    from_status?: string;
    to_status?: string;
    action?: string;
    reason?: string | null;
    by?: string | null;
    at?: string;
  }>;
};

export type OverviewCardItem = {
  id: string;
  name: string;
  sig: string;
  team?: string;
  teamOwner?: string;
  repoCount?: number;
  hardwareEnv?: string;
  latestReportId?: string;
  detailReportUrl?: string;
  latestScore?: number | null;
  latestSuccessRate?: number | null;
  latestExecutionTime?: number | null;
  scoreHistory: Array<{ reportId: string; date: string; score: number }>;
  totalPainPoints: number;
  pendingPainPoints: number;
  inProgressPainPoints: number;
  closedPainPoints: number;
  naPainPoints: number;
  closeRate: number;
  painPoints: OverviewPainPointRow[];
  benchmark?: {
    repoKey: string;
    repoName: string;
    latestReportId?: string;
    detailReportUrl?: string;
    latestScore?: number | null;
    latestSuccessRate?: number | null;
    latestExecutionTime?: number | null;
    hardwareEnv?: string;
    scoreBreakdown: Array<{
      key: string;
      label: string;
      cannScore?: number | null;
      benchmarkScore?: number | null;
    }>;
  } | null;
};

export type OverviewMetricSummary = {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  na: number;
  closeRate: number;
};

export type OverviewIssueBucket = 'pending' | 'inProgress' | 'resolved' | 'na';

export type OverviewCommonIssueItem = OverviewPainPointRow & {
  repoName: string;
  team: string;
  score: number | null;
  successRate: number | null;
  normalizedStatus: OverviewIssueBucket;
  blocking: boolean;
};

export type OverviewCommonIssueGroup = {
  key: string;
  journeyStages: string[];
  issueType: string;
  description: string;
  severity: OverviewPainPointRow['severity'] | string;
  severities?: Array<OverviewPainPointRow['severity'] | string>;
  repoCount: number;
  parentPainCount?: number;
  duplicateParentPainCount?: number;
  status: OverviewIssueBucket;
  items: OverviewCommonIssueItem[];
};

export type OverviewSummary = {
  overviewSummary: OverviewMetricSummary;
  keyIssueSummary: OverviewMetricSummary;
  blockingSummary?: OverviewMetricSummary;
  summaryScore: number | null;
  summarySuccessRate: number | null;
  summaryAvgExecutionTime: number | null;
  repoCount: number;
  sigCount: number;
  reportCount: number;
  totalPainPoints: number;
  pendingPainPoints: number;
  closedPainPoints: number;
  closureRate: number;
};

export type OverviewCapabilityBenchmark = {
  pairCount: number;
  includedPairs: Array<{
    cannRepoName: string;
    benchmarkRepoName: string;
    cannScore?: number | null;
    benchmarkScore?: number | null;
    scoreBreakdown?: Array<{
      key: string;
      label: string;
      cannScore: number | null;
      benchmarkScore: number | null;
    }>;
  }>;
  summaryScore: number | null;
  summarySuccessRate: number | null;
  summaryAvgExecutionTime: number | null;
  closureRate: number;
  teamSummaries: Array<{
    teamName: string;
    summaryScore: number | null;
    summarySuccessRate: number | null;
    summaryAvgExecutionTime: number | null;
    closureRate: number;
  }>;
  scoreBreakdown: Array<{
    key: string;
    label: string;
    cannScore: number | null;
    benchmarkScore: number | null;
  }>;
};

export type OverviewCapabilityBenchmarkDashboard = {
  pairCount: number;
  summaryScore: number | null;
  summarySuccessRate: number | null;
  summaryAvgExecutionTime: number | null;
  closureRate: number;
  totalScoreResult: {
    lead: number;
    tie: number;
    lag: number;
    total: number;
    leadRepos: string[];
    lagRepos: string[];
  };
  stageScoreResults: Array<{
    key: string;
    label: string;
    shortLabel: string;
    description: string;
    lead: number;
    tie: number;
    lag: number;
    total: number;
  }>;
  detailRows: Array<{
    id: string;
    cannProjectKey: string;
    benchmarkProjectKey: string;
    cannRepoName: string;
    benchmarkRepoName: string;
    teamName: string;
    cannScore: number | null;
    benchmarkScore: number | null;
    scoreDiff: number | null;
    scoreStatus: 'lead' | 'tie' | 'lag' | 'unknown';
    stageScores: Array<{
      key: string;
      label: string;
      shortLabel: string;
      description: string;
      cannScore: number | null;
      benchmarkScore: number | null;
      diff: number | null;
      status: 'lead' | 'tie' | 'lag' | 'unknown';
    }>;
    stageResult: {
      lead: number;
      tie: number;
      lag: number;
    };
    cannReportId: string;
    benchmarkReportId: string;
    compareReportUrl: string;
  }>;
};

export type OverviewCapabilityBenchmarkSummary = Pick<
  OverviewCapabilityBenchmarkDashboard,
  'pairCount' | 'totalScoreResult' | 'stageScoreResults'
>;

export type OverviewCapabilityBenchmarkDetails = Pick<
  OverviewCapabilityBenchmarkDashboard,
  'pairCount' | 'detailRows'
>;

export type OverviewCardsResponse = {
  total: number;
  page: number;
  size: number;
  teamOptions?: string[];
  repoOptions?: Array<{ value: string; label: string }>;
  hardwareOptions?: string[];
  items: OverviewCardItem[];
};

export type OverviewParentChildPain = {
  id: string;
  file_key: string;
  task_id?: string;
  pain_index?: number;
  pain_text: string;
  status?: string;
  report_generated_at?: string;
  updated_at?: string;
};

export type OverviewSigConfig = {
  sig: string;
  projects: string[];
  updated_at?: string;
};

export const fetchOverviewSummary = async (params: {
  sig?: string;
  keyword?: string;
  org?: string;
  includeCommonIssues?: boolean;
  commonOnly?: boolean | null;
}): Promise<OverviewSummary> => {
  const search = new URLSearchParams();
  if (params.org) search.set('org', params.org);
  if (params.sig) search.set('sig', params.sig);
  if (params.keyword) search.set('keyword', params.keyword);
  if (typeof params.includeCommonIssues === 'boolean') {
    search.set('include_common_issues', String(params.includeCommonIssues));
  }
  if (params.commonOnly !== undefined && params.commonOnly !== null) {
    search.set('common_only', String(params.commonOnly));
  }
  const query = search.toString();
  return compassApiFetch<OverviewSummary>(
    `/overview/summary${query ? `?${query}` : ''}`
  );
};

export type IssueTypeCount = {
  issueType: string;
  count: number;
};

export type OverviewCloseRateTrendPoint = {
  weekStart: string;
  weekEnd: string;
  label: string;
  total: number;
  p0: number;
  p1: number;
  p2: number;
  p3: number;
  issueTypeCounts?: IssueTypeCount[];
  closeRate: number;
};

export type OverviewCloseRateTrendsResponse = {
  weeks: number;
  overall: OverviewCloseRateTrendPoint[];
  key: OverviewCloseRateTrendPoint[];
};

export const fetchOverviewCloseRateTrends = async (params: {
  sig?: string;
  keyword?: string;
  org?: string;
  includeCommonIssues?: boolean;
  commonOnly?: boolean | null;
  weeks?: number;
  startDate?: string;
  endDate?: string;
  countChildPains?: boolean;
}): Promise<OverviewCloseRateTrendsResponse> => {
  const search = new URLSearchParams();
  if (params.org) search.set('org', params.org);
  if (params.sig) search.set('sig', params.sig);
  if (params.keyword) search.set('keyword', params.keyword);
  if (typeof params.includeCommonIssues === 'boolean') {
    search.set('include_common_issues', String(params.includeCommonIssues));
  }
  if (params.commonOnly !== undefined && params.commonOnly !== null) {
    search.set('common_only', String(params.commonOnly));
  }
  if (typeof params.weeks === 'number' && Number.isFinite(params.weeks)) {
    search.set('weeks', String(params.weeks));
  }
  if (params.startDate) search.set('start_date', params.startDate);
  if (params.endDate) search.set('end_date', params.endDate);
  if (params.countChildPains === true) {
    search.set('count_child_pains', 'true');
  }
  const query = search.toString();
  return compassApiFetch<OverviewCloseRateTrendsResponse>(
    `/overview/close-rate-trends${query ? `?${query}` : ''}`
  );
};

export const fetchOverviewCapabilityBenchmark =
  async (): Promise<OverviewCapabilityBenchmark> =>
    compassApiFetch<OverviewCapabilityBenchmark>(
      '/overview/capability-benchmark'
    );

export const fetchOverviewCapabilityBenchmarkDashboard =
  async (): Promise<OverviewCapabilityBenchmarkDashboard> =>
    compassApiFetch<OverviewCapabilityBenchmarkDashboard>(
      '/overview/capability-benchmark-dashboard'
    );

export const fetchOverviewCapabilityBenchmarkSummary =
  async (): Promise<OverviewCapabilityBenchmarkSummary> =>
    compassApiFetch<OverviewCapabilityBenchmarkSummary>(
      '/overview/capability-benchmark-summary'
    );

export const fetchOverviewCapabilityBenchmarkDetails =
  async (): Promise<OverviewCapabilityBenchmarkDetails> =>
    compassApiFetch<OverviewCapabilityBenchmarkDetails>(
      '/overview/capability-benchmark-details'
    );

export const fetchOverviewCards = async (params: {
  viewType: 'repo' | 'team' | 'sig';
  tab?: 'overall' | 'key' | 'blocking';
  includeCommonIssues?: boolean;
  commonOnly?: boolean | null;
  team?: string;
  repo?: string;
  hardwareEnv?: string;
  sig?: string;
  keyword?: string;
  page?: number;
  size?: number;
  org?: string;
}): Promise<OverviewCardsResponse> => {
  const search = new URLSearchParams();
  search.set('view_type', params.viewType);
  if (params.org) search.set('org', params.org);
  if (params.tab) search.set('tab', params.tab);
  if (typeof params.includeCommonIssues === 'boolean')
    search.set('include_common_issues', String(params.includeCommonIssues));
  if (params.commonOnly !== undefined && params.commonOnly !== null)
    search.set('common_only', String(params.commonOnly));
  if (params.team) search.set('team', params.team);
  if (params.repo) search.set('repo', params.repo);
  if (params.hardwareEnv) search.set('hardware_env', params.hardwareEnv);
  if (params.sig) search.set('sig', params.sig);
  if (params.keyword) search.set('keyword', params.keyword);
  search.set('page', String(params.page ?? 1));
  search.set('size', String(params.size ?? 20));
  return compassApiFetch<OverviewCardsResponse>(
    `/overview/cards?${search.toString()}`
  );
};

export const fetchOverviewParentChildren = async (
  parentId: string,
  params?: {
    size?: number;
  }
): Promise<{ items: OverviewParentChildPain[] }> => {
  const search = new URLSearchParams();
  search.set('size', String(params?.size ?? 200));
  return compassApiFetch<{ items: OverviewParentChildPain[] }>(
    `/overview/parent-pains/${encodeURIComponent(
      parentId
    )}/children?${search.toString()}`
  );
};

export const fetchOverviewCommonIssues = async (params: {
  tab?: 'overall' | 'key' | 'blocking';
  team?: string;
  sig?: string;
  keyword?: string;
  org?: string;
}): Promise<{ items: OverviewCommonIssueGroup[] }> => {
  const search = new URLSearchParams();
  if (params.org) search.set('org', params.org);
  if (params.tab) search.set('tab', params.tab);
  if (params.team) search.set('team', params.team);
  if (params.sig) search.set('sig', params.sig);
  if (params.keyword) search.set('keyword', params.keyword);
  const query = search.toString();
  return compassApiFetch<{ items: OverviewCommonIssueGroup[] }>(
    `/overview/common-issues${query ? `?${query}` : ''}`
  );
};

export const fetchSigConfigs = async (): Promise<{
  items: OverviewSigConfig[];
}> => compassApiFetch<{ items: OverviewSigConfig[] }>('/overview/sig-configs');

export const createSigConfig = async (sig: string) => {
  const url = compassApiUrl('/overview/sig-configs');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sig }),
  });
  if (!res.ok) throw new Error('新增 SIG 失败');
  return res.json();
};

export const deleteSigConfig = async (sig: string) => {
  const url = compassApiUrl(`/overview/sig-configs/${encodeURIComponent(sig)}`);
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('删除 SIG 失败');
  return res.json();
};

export const addSigProject = async (sig: string, project: string) => {
  const url = compassApiUrl('/overview/sig-configs/project');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sig, project }),
  });
  if (!res.ok) throw new Error('新增 SIG 项目失败');
  return res.json();
};

export const removeSigProject = async (sig: string, project: string) => {
  const search = new URLSearchParams({ sig, project });
  const url = compassApiUrl(
    `/overview/sig-configs/project?${search.toString()}`
  );
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('删除 SIG 项目失败');
  return res.json();
};

export type UpdateOverviewPainPayload = {
  file_key: string;
  step_id: string;
  pain_index: number;
  issue_type?: string;
  severity?: string;
  description?: string;
  owner?: string;
  is_real_issue?: boolean | null;
  remark?: string;
  improvement_status?: OverviewImprovementStatus;
  issue_or_pr_link?: string;
  retest_report_id?: string;
  retest_report_score?: number | null;
  agent_score_after_retest?: number | null;
};

export type UpdateOverviewParentPainPayload = {
  parent_id: string;
  severity?: OverviewPainPointRow['severity'];
  owner?: string;
  remark?: string;
  issue_link?: string;
  pr_link?: string;
  is_common_issue?: boolean;
  common_issue_type?: string | null;
  status?: string;
  action?: string;
  action_by?: string;
  action_reason?: string;
};

export const updateOverviewParentPain = async (
  payload: UpdateOverviewParentPainPayload
) => {
  const { parent_id, ...body } = payload;
  const url = compassApiUrl(
    `/overview/parent-pains/${encodeURIComponent(parent_id)}`
  );
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      (errBody as { detail?: string }).detail || '更新父级痛点失败'
    );
  }
  return res.json();
};
