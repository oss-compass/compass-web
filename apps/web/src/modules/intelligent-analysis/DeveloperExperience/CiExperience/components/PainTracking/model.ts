import type { CiProblem } from '../../types';

export type TrackingStatus = 'pending' | 'confirmed' | 'fixed' | 'invalid';
export type TrackingAction =
  | 'confirm'
  | 'mark_invalid'
  | 'restore_valid'
  | 'mark_fixed'
  | 'undo_fixed'
  | 'reset';

export type TrackingScope = {
  org: string;
  repo: string;
  workflow: string;
  day: string;
};

export type TrackingRecord = {
  problemKey: string;
  status: TrackingStatus;
  revision: number;
  updatedAt: string;
  history: Array<{
    action: TrackingAction;
    from: TrackingStatus;
    to: TrackingStatus;
    operator: string;
    reason: string;
    at: string;
  }>;
};

export const STATUS_META: Record<
  TrackingStatus,
  { label: string; color: string }
> = {
  pending: { label: '待确认', color: 'gold' },
  confirmed: { label: '已确认待修复', color: 'blue' },
  fixed: { label: '已修复待复测', color: 'purple' },
  invalid: { label: '非有效问题', color: 'default' },
};

export const ACTION_LABELS: Record<TrackingAction, string> = {
  confirm: '确认有效问题',
  mark_invalid: '判为非有效问题',
  restore_valid: '改判为有效问题',
  mark_fixed: '完成修复',
  undo_fixed: '撤销修复',
  reset: '回退待确认',
};

export const ACTIONS: Record<TrackingStatus, TrackingAction[]> = {
  pending: ['confirm', 'mark_invalid'],
  confirmed: ['mark_fixed', 'mark_invalid', 'reset'],
  fixed: ['undo_fixed', 'mark_invalid', 'reset'],
  invalid: ['restore_valid', 'reset'],
};

// 不包含步骤：同一痛点在多个步骤、维度详情中的入口必须共享判读。
// 日期/仓库/流水线在服务端作为独立 scope 参与主键计算。
export const trackingProblemKey = (problem: CiProblem): string =>
  JSON.stringify([problem.dimkey, problem.kb, problem.title]);

export const uniqueProblems = (problems: CiProblem[]): CiProblem[] =>
  Array.from(
    new Map(
      problems.map((problem) => [trackingProblemKey(problem), problem])
    ).values()
  );
