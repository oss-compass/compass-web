import { OVERVIEW_PRIORITY_CLASSES } from '../../UserJourney/OverviewDashboard/theme';

export const getScoreTone = (score: number) => {
  if (score >= 80) {
    return {
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      bar: 'bg-emerald-500',
      text: 'text-emerald-600',
    };
  }
  if (score >= 60) {
    return {
      badge: 'border-sky-200 bg-sky-50 text-sky-700',
      bar: 'bg-sky-500',
      text: 'text-sky-600',
    };
  }
  if (score >= 40) {
    return {
      badge: 'border-amber-200 bg-amber-50 text-amber-700',
      bar: 'bg-amber-500',
      text: 'text-amber-600',
    };
  }
  return {
    badge: 'border-rose-200 bg-rose-50 text-rose-700',
    bar: 'bg-rose-500',
    text: 'text-rose-600',
  };
};

export const getPriorityTone = (priority: string) => {
  const key = priority.toUpperCase();
  return (
    OVERVIEW_PRIORITY_CLASSES[key as keyof typeof OVERVIEW_PRIORITY_CLASSES] ??
    OVERVIEW_PRIORITY_CLASSES.P3
  );
};

export const getPriorityLabel = (priority: string) => {
  const labels: Record<string, string> = {
    P0: 'P0 完全阻塞',
    P1: 'P1 关键卡点',
    P2: 'P2 显著影响',
    P3: 'P3 轻微影响',
  };
  return labels[priority.toUpperCase()] || priority;
};

export const cleanReportText = (value: string) => value.replace(/`/g, '');

/**
 * Strip the leading metric-code prefix (e.g. `OBJ_INPUT_QUALITY：`) that the
 * report attaches to evidence / reason strings, keeping only the human text.
 */
export const stripMetricCode = (value: string) =>
  cleanReportText(value)
    .replace(/^[A-Z0-9_]+\s*[:：]\s*/, '')
    .trim();

export const normalizeGoal = (value: string) =>
  cleanReportText(value).replace('提升至 100 以上', '提升至 100 分');

export const formatGeneratedAt = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Shanghai',
  }).format(date);
};

/** Display numeric scores to one decimal, omitting a trailing zero. */
export const formatScore = (value: number | string | null | undefined) => {
  if (value == null) return 'N/A';
  const score = typeof value === 'number' ? value : Number(value);
  return String(value).trim() !== '' && Number.isFinite(score)
    ? String(Number(score.toFixed(1)))
    : String(value);
};
