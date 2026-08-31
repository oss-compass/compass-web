import { IssuePainTrackingStatus } from '../../types';

export const TRACKING_OPERATOR_STORAGE_KEY =
  'issue-contribution-pain-tracking-operator';

export const getTrackingStatusMeta = (
  status: IssuePainTrackingStatus,
  trackingType: 'fix' | 'observe',
  label?: string
) => {
  const labels: Record<number, string> = {
    [IssuePainTrackingStatus.PENDING]: '待确认',
    [IssuePainTrackingStatus.TRACKING]: '已确认待修复',
    [IssuePainTrackingStatus.FIXED_PENDING_RETEST]: '已修复待复测',
    [IssuePainTrackingStatus.PASSED]:
      trackingType === 'observe' ? '已闭环' : '已复测通过',
    [IssuePainTrackingStatus.INVALID]: '非有效问题',
    [IssuePainTrackingStatus.RETEST_FAILED]: '复测不通过',
  };
  const classes: Record<number, string> = {
    [IssuePainTrackingStatus.PENDING]:
      'border-amber-300 bg-amber-50 text-amber-700',
    [IssuePainTrackingStatus.TRACKING]: 'border-sky-200 bg-sky-50 text-sky-700',
    [IssuePainTrackingStatus.FIXED_PENDING_RETEST]:
      'border-violet-200 bg-violet-50 text-violet-700',
    [IssuePainTrackingStatus.PASSED]:
      'border-emerald-200 bg-emerald-50 text-emerald-700',
    [IssuePainTrackingStatus.INVALID]:
      'border-slate-200 bg-slate-100 text-slate-500',
    [IssuePainTrackingStatus.RETEST_FAILED]:
      'border-rose-200 bg-rose-50 text-rose-700',
  };
  return {
    label: labels[status] || label || '未知状态',
    className: classes[status] || 'border-slate-200 bg-slate-50 text-slate-500',
    automatic: [
      IssuePainTrackingStatus.FIXED_PENDING_RETEST,
      IssuePainTrackingStatus.PASSED,
    ].includes(status),
  };
};

export const ACTION_LABELS: Record<string, string> = {
  confirm: '确认痛点',
  confirm_issues: '逐项确认涉及 Issue',
  decide_issue: '判定 Issue 有效性',
  decide_issues: '批量判定 Issue 有效性',
  mark_invalid: '判定为非有效问题',
  rollback_to_pending: '回退到待确认',
  mark_issue_fixed: '标记已修复',
  undo_issue_fixed: '撤销修复标记',
  mark_issues_fixed: '批量标记已修复',
  undo_issues_fixed: '批量撤销修复标记',
  retest_failed: '自动复测不通过',
  auto_passed: '自动判定闭环',
  reopened: '再次复现并重新激活',
};

export const TRACKING_STATUS_SHORT_LABELS: Record<number, string> = {
  1: '待确认',
  2: '跟踪/修复中',
  3: '待自动复测',
  5: '已闭环',
  6: '非有效问题',
  7: '复测不通过',
};
