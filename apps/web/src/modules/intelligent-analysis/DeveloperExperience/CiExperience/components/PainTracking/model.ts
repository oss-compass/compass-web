import type { CiProblem } from '../../types';

export type TrackingStatus = 'pending' | 'confirmed' | 'fixed' | 'invalid';
export const RESPONSIBLE_PARTIES = ['开发者', '业务团队', '平台'] as const;
export type ResponsibleParty = (typeof RESPONSIBLE_PARTIES)[number];

export type TrackingAction =
  | 'confirm'
  | 'mark_invalid'
  | 'restore_valid'
  | 'reset'
  | 'change_responsible_party';

type HistoricalTrackingAction = TrackingAction | 'mark_fixed' | 'undo_fixed';

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
  manualDecision?: boolean;
  responsibleParty?: ResponsibleParty | null;
  observation?: {
    daysRequired: number;
    cleanDays: number;
    lastSeenDay: string;
    fixedOn: string | null;
  } | null;
  history: Array<{
    action: HistoricalTrackingAction;
    from: TrackingStatus;
    to: TrackingStatus;
    operator: string;
    reason: string;
    fromParty?: string | null;
    toParty?: ResponsibleParty;
    at: string;
  }>;
};

export const STATUS_META: Record<
  TrackingStatus,
  { label: string; color: string }
> = {
  pending: { label: '待确认', color: 'gold' },
  confirmed: { label: '进行中（观测中）', color: 'blue' },
  fixed: { label: '已修复', color: 'green' },
  invalid: { label: '非有效问题', color: 'default' },
};

export const ACTION_LABELS: Record<HistoricalTrackingAction, string> = {
  confirm: '确认有效问题',
  mark_invalid: '判为非有效问题',
  restore_valid: '改判为有效问题',
  mark_fixed: '人工记录修复（旧流程）',
  undo_fixed: '撤销人工修复（旧流程）',
  reset: '回退待确认',
  change_responsible_party: '更改责任方',
};

export const ACTIONS: Record<TrackingStatus, TrackingAction[]> = {
  pending: ['confirm', 'mark_invalid'],
  confirmed: ['mark_invalid', 'reset'],
  fixed: ['mark_invalid', 'reset'],
  invalid: ['restore_valid', 'reset'],
};

// 不包含步骤：同一痛点在多个步骤、维度详情中的入口必须共享判读。
// 同仓库、同流水线共享跨日报的判定与观测状态。
export const trackingProblemKey = (problem: CiProblem): string =>
  JSON.stringify([problem.dimkey, problem.kb, problem.title]);

export const uniqueProblems = (problems: CiProblem[]): CiProblem[] =>
  Array.from(
    new Map(
      problems.map((problem) => [trackingProblemKey(problem), problem])
    ).values()
  );
