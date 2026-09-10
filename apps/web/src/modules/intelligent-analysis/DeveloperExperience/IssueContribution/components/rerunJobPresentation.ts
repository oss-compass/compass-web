import type { IssuePainRerunJob, IssuePainRerunResult } from '../types';

/** 重跑任务的组合状态元信息：展示口径与后端 RERUN_STATUS_FILTERS 保持一致。 */
export const RERUN_STATUS_META: Record<
  string,
  { label: string; color: string }
> = {
  pending: { label: '排队中', color: 'text-amber-600' },
  running: { label: '重跑中', color: 'text-sky-600' },
  waiting_report: { label: '等待报告', color: 'text-violet-600' },
  applying: { label: '正在应用', color: 'text-blue-600' },
  applied: { label: '已完成', color: 'text-emerald-600' },
  failed: { label: '失败', color: 'text-rose-600' },
  cancelled: { label: '已取消', color: 'text-slate-500' },
  apply_failed: { label: '应用失败', color: 'text-rose-600' },
};

export const RERUN_STATUS_OPTIONS = [
  { value: 'pending', label: '排队中' },
  { value: 'running', label: '重跑中' },
  { value: 'waiting_report', label: '等待报告' },
  { value: 'applying', label: '正在应用' },
  { value: 'applied', label: '已完成' },
  { value: 'apply_failed', label: '应用失败' },
  { value: 'failed', label: '失败' },
  { value: 'cancelled', label: '已取消' },
] as const;

export const getRerunStatusKey = (job: IssuePainRerunJob) => {
  if (job.applyStatus === 'waiting_report') return 'waiting_report';
  if (job.applyStatus === 'applying') return 'applying';
  if (job.applyStatus === 'applied') return 'applied';
  if (job.applyStatus === 'apply_failed') return 'apply_failed';
  return job.taskStatus;
};

/** 任务尚未应用且未进入终态时，同仓同周期仍被锁定。 */
export const isRerunLocked = (job?: IssuePainRerunJob | null) =>
  Boolean(
    job &&
      job.applyStatus !== 'applied' &&
      job.taskStatus !== 'failed' &&
      job.taskStatus !== 'cancelled'
  );

export const getLockedRerunIssueNumbers = (job?: IssuePainRerunJob | null) =>
  isRerunLocked(job) ? job?.issueNumbers ?? [] : [];

export const getRerunModeLabel = (mode?: string | null) =>
  mode === 'retest' ? '发起复测' : '重跑检查';

export const getRerunResultLabel = (
  result: Pick<IssuePainRerunResult, 'result' | 'mode'>,
  fallbackMode?: string | null
) => {
  const isRetest = (result.mode ?? fallbackMode) === 'retest';
  if (result.result === 'resolved') {
    return isRetest ? '复测通过' : '已自动标记修复';
  }
  return '复测未通过';
};

export const getMetricChangeSummary = (result: IssuePainRerunResult) =>
  (result.metrics ?? []).flatMap((metric) => {
    const delta = metric.delta_blended;
    if (delta === null || delta === undefined || delta === 0) return [];
    return [
      `${metric.stage_name || metric.stage_id || '指标'} ${
        delta > 0 ? '+' : ''
      }${delta}`,
    ];
  });

export const formatRerunEtaTime = (minutes: number) =>
  new Date(Date.now() + minutes * 60_000).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

export const formatRerunDateTime = (value?: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

/** 任务从创建到应用完成的耗时区间（分钟），用于锁定原因与列表展示。 */
export const getRerunEtaRangeText = (job: IssuePainRerunJob) =>
  `${formatRerunDateTime(job.eta.earliestAt)}–${formatRerunDateTime(
    job.eta.latestAt
  )}`;
