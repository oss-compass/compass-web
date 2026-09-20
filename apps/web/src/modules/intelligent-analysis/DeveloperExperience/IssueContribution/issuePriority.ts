import { OVERVIEW_PRIORITY_CLASSES } from '../../UserJourney/OverviewDashboard/theme';

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
    badgeClass: OVERVIEW_PRIORITY_CLASSES.P0.badge,
    activeClass: `${OVERVIEW_PRIORITY_CLASSES.P0.badge} ${OVERVIEW_PRIORITY_CLASSES.P0.ring}`,
  },
  {
    priority: 'P1',
    label: 'P1 显著影响',
    description: '显著影响，需尽快修复',
    minScore: 41,
    maxScore: 59,
    badgeClass: OVERVIEW_PRIORITY_CLASSES.P1.badge,
    activeClass: `${OVERVIEW_PRIORITY_CLASSES.P1.badge} ${OVERVIEW_PRIORITY_CLASSES.P1.ring}`,
  },
  {
    priority: 'P2',
    label: 'P2 明显影响',
    description: '明显影响，应纳入优化计划',
    minScore: 60,
    maxScore: 69,
    badgeClass: OVERVIEW_PRIORITY_CLASSES.P2.badge,
    activeClass: `${OVERVIEW_PRIORITY_CLASSES.P2.badge} ${OVERVIEW_PRIORITY_CLASSES.P2.ring}`,
  },
  {
    priority: 'P3',
    label: 'P3 轻微影响',
    description: '轻微影响，可顺手改进',
    minScore: 70,
    maxScore: 79,
    badgeClass: OVERVIEW_PRIORITY_CLASSES.P3.badge,
    activeClass: `${OVERVIEW_PRIORITY_CLASSES.P3.badge} ${OVERVIEW_PRIORITY_CLASSES.P3.ring}`,
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

export const getHighestPainIssuePriority = (
  issues: ReadonlyArray<{ priority?: unknown; score?: unknown }> | undefined
): PainIssuePriority | undefined => {
  if (!issues?.length) return undefined;
  const priorities = issues.flatMap((issue) => {
    const priority = resolvePainIssuePriority(issue.priority, issue.score);
    return priority ? [priority] : [];
  });
  return PAIN_ISSUE_PRIORITY_LEVELS.find(({ priority }) =>
    priorities.includes(priority)
  )?.priority;
};
