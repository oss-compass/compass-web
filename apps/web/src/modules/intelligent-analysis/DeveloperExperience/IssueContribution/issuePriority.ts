export type PainIssuePriority = 'P0' | 'P1' | 'P2' | 'P3';

export type PainIssuePriorityMeta = {
  priority: PainIssuePriority;
  label: string;
  description: string;
  minScore: number;
  maxScore: number;
  badgeClass: string;
  activeClass: string;
};

/**
 * 痛点低分 Issue 的统一优先级规则。
 * 顺序同时用于筛选标签展示：最高优先级排在最前面。
 */
export const PAIN_ISSUE_PRIORITY_LEVELS: readonly PainIssuePriorityMeta[] = [
  {
    priority: 'P0',
    label: 'P0 完全阻塞',
    description: '完全阻塞，需立即治理',
    minScore: 0,
    maxScore: 40,
    badgeClass: 'border-rose-200 bg-rose-50 text-rose-700',
    activeClass: 'border-rose-400 bg-rose-100 text-rose-800 ring-rose-200',
  },
  {
    priority: 'P1',
    label: 'P1 显著影响',
    description: '显著影响，需尽快修复',
    minScore: 41,
    maxScore: 59,
    badgeClass: 'border-amber-200 bg-amber-50 text-amber-700',
    activeClass: 'border-amber-400 bg-amber-100 text-amber-800 ring-amber-200',
  },
  {
    priority: 'P2',
    label: 'P2 明显影响',
    description: '明显影响，应纳入优化计划',
    minScore: 60,
    maxScore: 69,
    badgeClass: 'border-sky-200 bg-sky-50 text-sky-700',
    activeClass: 'border-sky-400 bg-sky-100 text-sky-800 ring-sky-200',
  },
  {
    priority: 'P3',
    label: 'P3 轻微影响',
    description: '轻微影响，可顺手改进',
    minScore: 70,
    maxScore: 79,
    badgeClass: 'border-slate-200 bg-slate-50 text-slate-600',
    activeClass: 'border-slate-400 bg-slate-100 text-slate-800 ring-slate-200',
  },
] as const;

const PRIORITY_META_BY_LEVEL = new Map(
  PAIN_ISSUE_PRIORITY_LEVELS.map((meta) => [meta.priority, meta])
);

export const getPainIssuePriority = (
  score: unknown
): PainIssuePriority | undefined => {
  if (score === null || score === undefined || score === '') return undefined;
  const numericScore = Number(score);
  if (!Number.isFinite(numericScore)) return undefined;
  return PAIN_ISSUE_PRIORITY_LEVELS.find(
    ({ minScore, maxScore }) =>
      numericScore >= minScore && numericScore < maxScore + 1
  )?.priority;
};

export const normalizePainIssuePriority = (
  value: unknown
): PainIssuePriority | undefined => {
  const matched = /^P[0-3]$/i.exec(String(value ?? '').trim());
  return matched?.[0].toUpperCase() as PainIssuePriority | undefined;
};

export const getPainIssuePriorityMeta = (
  priority: unknown
): PainIssuePriorityMeta | undefined => {
  const normalized = normalizePainIssuePriority(priority);
  return normalized ? PRIORITY_META_BY_LEVEL.get(normalized) : undefined;
};

/** 后端字段优先；兼容未重新入库的旧报告时由 score 回退计算。 */
export const resolvePainIssuePriority = (
  priority: unknown,
  score: unknown
): PainIssuePriority | undefined =>
  normalizePainIssuePriority(priority) ?? getPainIssuePriority(score);
