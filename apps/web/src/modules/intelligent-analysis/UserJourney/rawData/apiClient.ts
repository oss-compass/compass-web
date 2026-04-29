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

export const compassApiUrl = (path: string): string => {
  const base = getApiBase();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${API_PREFIX}${normalizedPath}`;
};

/**
 * 通用 JSON 请求，抛出带状态码的错误
 */
export const compassApiFetch = async <T>(path: string): Promise<T> => {
  const url = compassApiUrl(path);
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`[CompassAPI] ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
};

// ---------- 痛点确认 ----------

export type PainConfirmationRecord = {
  file_key: string;
  step_id: string;
  pain_index: number;
  pain_text: string;
  status: number;
  severity: string;
  issue_link: string | null;
  pr_link: string | null;
  confirmed_by: string;
  confirmed_at: string;
};

export type PainConfirmationsResponse = {
  file_key: string;
  confirmations: PainConfirmationRecord[];
};

export type PainHistoryItem = {
  status: number;
  severity: string;
  issue_link: string | null;
  pr_link: string | null;
  confirmed_by: string | null;
  confirmed_at: string;
};

export type PainHistoryResponse = {
  file_key: string;
  step_id: string;
  pain_index: number;
  current: PainConfirmationRecord;
  history: PainHistoryItem[];
};

export type UpsertPainConfirmationPayload = {
  step_id: string;
  pain_index: number;
  pain_text: string;
  status: number;
  confirmed_by: string | null;
  severity?: string;
  issue_link?: string;
  pr_link?: string;
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
 * 查询单条痛点的完整历史记录
 */
export const fetchPainHistory = async (
  fileKey: string,
  stepId: string,
  painIndex: number
): Promise<PainHistoryResponse> => {
  const url = compassApiUrl(
    `/reports/${fileKey}/pain-confirmations/${stepId}/${painIndex}/history`
  );
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`[CompassAPI] ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<PainHistoryResponse>;
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
  fileKey: string;
  stepId: string;
  painIndex: number;
  journeyStage: string;
  firstFoundReportId: string;
  reportTotalScore: number;
  agentScoreAtFound: number;
  issueType: string;
  chipModel: string;
  severity:
    | 'P0_BLOCKER'
    | 'P1_CRITICAL'
    | 'P2_MAJOR'
    | 'P3_MINOR'
    | 'P4_TRIVIAL';
  description: string;
  owner: string;
  isRealIssue: boolean | null;
  remark: string;
  improvementStatus: OverviewImprovementStatus;
  issueOrPrLink: string;
  retestReportId: string;
  retestReportScore: number | null;
  agentScoreAfterRetest: number | null;
};

export type OverviewCardItem = {
  id: string;
  name: string;
  sig: string;
  repoCount?: number;
  scoreHistory: Array<{ reportId: string; date: string; score: number }>;
  totalPainPoints: number;
  pendingPainPoints: number;
  closedPainPoints: number;
  painPoints: OverviewPainPointRow[];
};

export type OverviewSummary = {
  repoCount: number;
  sigCount: number;
  reportCount: number;
  totalPainPoints: number;
  pendingPainPoints: number;
  closedPainPoints: number;
  closureRate: number;
};

export type OverviewCardsResponse = {
  total: number;
  page: number;
  size: number;
  items: OverviewCardItem[];
};

export type OverviewSigConfig = {
  sig: string;
  projects: string[];
  updated_at?: string;
};

export const fetchOverviewSummary = async (params: {
  sig?: string;
  keyword?: string;
}): Promise<OverviewSummary> => {
  const search = new URLSearchParams();
  if (params.sig) search.set('sig', params.sig);
  if (params.keyword) search.set('keyword', params.keyword);
  const query = search.toString();
  return compassApiFetch<OverviewSummary>(
    `/overview/summary${query ? `?${query}` : ''}`
  );
};

export const fetchOverviewCards = async (params: {
  viewType: 'repo' | 'sig';
  sig?: string;
  keyword?: string;
  page?: number;
  size?: number;
}): Promise<OverviewCardsResponse> => {
  const search = new URLSearchParams();
  search.set('view_type', params.viewType);
  if (params.sig) search.set('sig', params.sig);
  if (params.keyword) search.set('keyword', params.keyword);
  search.set('page', String(params.page ?? 1));
  search.set('size', String(params.size ?? 20));
  return compassApiFetch<OverviewCardsResponse>(
    `/overview/cards?${search.toString()}`
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

export const updateOverviewPainDetail = async (
  payload: UpdateOverviewPainPayload
) => {
  const url = compassApiUrl('/overview/pain-details');
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error((errBody as { detail?: string }).detail || '更新痛点失败');
  }
  return res.json();
};
