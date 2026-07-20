import type {
  CiDimKey,
  CiPri,
  CiRepoKey,
  CiRootStatus,
  CiStatus,
  CiVal,
} from './types';

const repoSlug = (repo: CiRepoKey) => (repo === 'opsnn' ? 'ops-nn' : 'runtime');

export const runURL = (repo: CiRepoKey, id: string) =>
  `https://gitcode.com/cann/${repoSlug(repo)}/actions/runs/${id}`;

export const prURL = (repo: CiRepoKey, n: string | number) =>
  `https://gitcode.com/cann/${repoSlug(repo)}/merge_requests/${n}`;

/** 归一化 query 中的 repo 值（兼容 ops-nn / opsnn） */
export const normalizeRepoKey = (
  value: string | string[] | undefined
): CiRepoKey => {
  const raw = (Array.isArray(value) ? value[0] : value)?.trim().toLowerCase();
  if (raw === 'opsnn' || raw === 'ops-nn') {
    return 'opsnn';
  }
  return 'runtime';
};

/** repo key -> query 参数值（对外用 ops-nn） */
export const repoKeyToQuery = (repo: CiRepoKey) =>
  repo === 'opsnn' ? 'ops-nn' : 'runtime';

/** 维度中文名 */
export const DIM_NAME: Record<CiDimKey, string> = {
  stability: '稳定性',
  efficiency: '效率',
  interaction: '交互体验',
  cost: '成本',
};

export const DIM_KEYS: CiDimKey[] = [
  'stability',
  'efficiency',
  'interaction',
  'cost',
];

/** 根因状态标签 */
export const ROOT_STATUS_LABEL: Record<CiRootStatus, string> = {
  known: '根因已核',
  partial: '部分已核（含推测）',
  guide: '分析指引',
  pending: '待人工判读',
};

/** 数值单元格式化：null → —；带 demo 返回 isDemo 标记供渲染层挂徽标 */
export const fmt = (
  x: CiVal | string | number | null | undefined
): { text: string; demo: boolean } => {
  if (x == null) {
    return { text: '—', demo: false };
  }
  if (typeof x === 'object') {
    return { text: x.v, demo: Boolean(x.demo) };
  }
  return { text: String(x), demo: false };
};

/** 秒 → 人类可读（≥120s 用 min，否则 s） */
export const mmss = (s: number | null | undefined): string => {
  if (s == null) {
    return '—';
  }
  return s >= 120 ? `${(s / 60).toFixed(1)} min` : `${s} s`;
};

/** 状态点填充色（维度卡状态圆点） */
export const statusDotClass: Record<CiStatus, string> = {
  red: 'bg-rose-500',
  yellow: 'bg-amber-500',
  green: 'bg-emerald-500',
};

/** 状态词文字色 */
export const statusWordClass: Record<CiStatus, string> = {
  red: 'text-rose-600',
  yellow: 'text-amber-600',
  green: 'text-emerald-600',
};

/** 优先级徽章（社区痛点软色，无彩色边框装饰） */
export const priBadgeClass: Record<CiPri, string> = {
  P0: 'border border-rose-200 bg-rose-50 text-rose-700',
  P1: 'border border-amber-200 bg-amber-50 text-amber-700',
  P2: 'border border-slate-200 bg-slate-50 text-slate-600',
};

/** 根因状态徽章色 */
export const rootStatusBadgeClass: Record<CiRootStatus, string> = {
  known: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
  partial: 'border border-amber-200 bg-amber-50 text-amber-700',
  guide: 'border border-blue-200 bg-blue-50 text-blue-700',
  pending: 'border border-rose-200 bg-rose-50 text-rose-700',
};
