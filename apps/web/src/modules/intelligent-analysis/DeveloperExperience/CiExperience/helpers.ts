import type {
  CiBoard,
  CiDimKey,
  CiPri,
  CiRepoData,
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
  guide: 'border border-sky-200 bg-sky-50 text-sky-700',
  pending: 'border border-rose-200 bg-rose-50 text-rose-700',
};

// ============ 共享计算 helpers（移植 dashboard.js 数学层，供总览与报告共用） ============

/** 从 CiVal/字符串/数字解析数字（取首个数字，去千分位逗号） */
export const num = (
  x: CiVal | string | number | null | undefined
): number | null => {
  if (x == null) {
    return null;
  }
  const raw = typeof x === 'object' ? x.v : x;
  const m = String(raw)
    .replace(/,/g, '')
    .match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
};

/** 中位数（忽略 null） */
export const median = (a: (number | null)[]): number | null => {
  const v = a
    .filter((x): x is number => x != null)
    .slice()
    .sort((p, q) => p - q);
  if (!v.length) {
    return null;
  }
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
};

/** 求和（null 视作 0） */
export const sum = (a: (number | null)[]): number =>
  a.reduce<number>((p, q) => p + (q || 0), 0);

/** 首个非零值 */
export const firstNZ = (a: (number | null)[]): number | null =>
  a.find((v): v is number => v != null && v !== 0) ?? null;

/** 末个非零值 */
export const lastNZ = (a: (number | null)[]): number | null =>
  [...a].reverse().find((v): v is number => v != null && v !== 0) ?? null;

/** 数值格式化（整数直出，否则一位小数） */
export const fixed = (x: number | null | undefined): string =>
  x == null ? '—' : Number.isInteger(x) ? String(x) : x.toFixed(1);

export type CiDelta = {
  cls: 'good' | 'bad' | 'flat';
  arrow: string;
  word: string;
  txt: string;
};

/** 变化判读：按「越低越好/越高越好」给出 改善/恶化/持平（社区管理者视角） */
export const delta = (
  first: number | null,
  last: number | null,
  lowerBetter: boolean
): CiDelta => {
  if (first == null || last == null || first === last) {
    return { cls: 'flat', arrow: '→', word: '持平', txt: '' };
  }
  const up = last > first;
  const worse = lowerBetter ? up : !up;
  const pct =
    first !== 0 ? Math.round(((last - first) / Math.abs(first)) * 100) : null;
  return {
    cls: worse ? 'bad' : 'good',
    arrow: up ? '▲' : '▼',
    word: worse ? '恶化' : '改善',
    txt:
      (up ? '+' : '') + (pct != null ? `${pct}%` : (last - first).toFixed(1)),
  };
};

const dimOf = (b: CiBoard, k: CiDimKey) =>
  (b.dims || []).find((d) => d.key === k);

/** 按维度卡 vals 标签子串取数 */
export const pick = (b: CiBoard, k: CiDimKey, label: string): number | null => {
  const d = dimOf(b, k);
  const f = (d?.vals || []).find((v) => v[0].indexOf(label) >= 0);
  return f ? num(f[1]) : null;
};

/** 按 board.meta 标签子串取数 */
export const metaNum = (b: CiBoard, label: string): number | null => {
  const f = (b.meta || []).find((m) => m[0].indexOf(label) >= 0);
  return f ? num(f[1]) : null;
};

export type CiDaySeries = {
  days: string[];
  finish: (number | null)[];
  plat: (number | null)[];
  waste: (number | null)[];
  dur: (number | null)[];
  block: (number | null)[];
  hours: (number | null)[];
};

/** 全窗逐日序列（仓库级，与 grain 无关；对应 dashboard daySeries） */
export const daySeries = (d: CiRepoData): CiDaySeries => {
  const { days } = d;
  return {
    days,
    finish: days.map((dt) => metaNum(d.boards[dt], '完结失败率')),
    plat: days.map((dt) =>
      pick(d.boards[dt], 'stability', 'Action 平台失败率')
    ),
    waste: days.map((dt) => pick(d.boards[dt], 'cost', '无效机时')),
    dur: days.map((dt) => pick(d.boards[dt], 'efficiency', '流水线时长 中位')),
    block: days.map((dt) => pick(d.boards[dt], 'interaction', 'CI 阻塞 PR')),
    hours: days.map((dt) => pick(d.boards[dt], 'cost', '机时(全部池)')),
  };
};

/** 平台能力就绪（与 PlatformObservability 的 5/12 一致） */
export const CI_CAP_OK = 5;
export const CI_CAP_TOTAL = 12;
