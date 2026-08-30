import type { IssuePainTracking } from '../../types';
import { IssuePainTrackingStatus } from '../../types';
import { formatTrackingTime } from './utils';

export const getCurrentFlowStep = (
  status: IssuePainTrackingStatus,
  isObserve: boolean
) => {
  if (status === IssuePainTrackingStatus.PENDING) return 0;
  if (status === IssuePainTrackingStatus.TRACKING) return 1;
  if (status === IssuePainTrackingStatus.FIXED_PENDING_RETEST) return 2;
  // 终态（复测通过 / 非有效问题）流程已走完：
  // current 指到步数上限，最后一步按完成态渲染，说明时间也得以展示
  if (status === IssuePainTrackingStatus.PASSED) return isObserve ? 3 : 4;
  if (status === IssuePainTrackingStatus.INVALID) return 2;
  if (status === IssuePainTrackingStatus.RETEST_FAILED) return 3;
  return 1;
};

export const findStatusTime = (
  tracking: IssuePainTracking,
  status: IssuePainTrackingStatus
) =>
  [...tracking.history].reverse().find((item) => item.to === status)?.at ??
  null;

export const createFlowItem = (title: string, time?: string | null) => ({
  title,
  description: time ? (
    <span className="text-xs text-slate-500">{formatTrackingTime(time)}</span>
  ) : null,
});

// “待确认”阶段的开始时间没有记录（confirmedAt 是确认发生的时刻，
// 属于下一步），置空避免与“已确认待修复”显示同一个时间戳
export const createPendingFlowItem = () => {
  return createFlowItem('待确认');
};

export const getFlowItems = (
  tracking: IssuePainTracking,
  isObserve: boolean
) => {
  if (tracking.status === IssuePainTrackingStatus.INVALID) {
    const invalidAt = findStatusTime(tracking, IssuePainTrackingStatus.INVALID);
    return [createPendingFlowItem(), createFlowItem('非有效问题', invalidAt)];
  }
  if (isObserve) {
    return [
      createPendingFlowItem(),
      createFlowItem('已确认待修复', tracking.confirmedAt),
      createFlowItem('已闭环', tracking.retest?.at),
    ];
  }
  const retestFailed =
    tracking.status === IssuePainTrackingStatus.RETEST_FAILED;
  return [
    createPendingFlowItem(),
    createFlowItem('已确认待修复', tracking.confirmedAt),
    createFlowItem(
      '已修复待复测',
      findStatusTime(tracking, IssuePainTrackingStatus.FIXED_PENDING_RETEST)
    ),
    createFlowItem(
      retestFailed ? '复测不通过' : '已复测通过',
      retestFailed
        ? findStatusTime(tracking, IssuePainTrackingStatus.RETEST_FAILED)
        : tracking.retest?.at
    ),
  ];
};
