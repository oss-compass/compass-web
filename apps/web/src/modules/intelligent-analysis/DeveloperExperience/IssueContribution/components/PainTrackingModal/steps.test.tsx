import { getCurrentFlowStep, getFlowItems } from './steps';
import { IssuePainTrackingStatus } from '../../types';
import { formatTrackingTime } from './utils';
import type { IssuePainTracking } from '../../types';

const CONFIRMED_AT = '2026-01-02T12:00:00Z';
const RETEST_AT = '2026-03-01T12:00:00Z';
const INVALID_AT = '2026-01-05T12:00:00Z';

const buildTracking = (
  partial: Partial<IssuePainTracking>
): IssuePainTracking =>
  ({
    status: IssuePainTrackingStatus.PENDING,
    confirmedAt: CONFIRMED_AT,
    history: [],
    retest: null,
    ...partial,
  } as IssuePainTracking);

const descriptionText = (item: { description: any }) => {
  if (item.description === null) return null;
  // createFlowItem 的 description 是 <span>{formatTrackingTime(time)}</span>
  return item.description.props.children;
};

describe('getCurrentFlowStep', () => {
  it('maps each in-flight status to its step', () => {
    expect(getCurrentFlowStep(IssuePainTrackingStatus.PENDING, false)).toBe(0);
    expect(getCurrentFlowStep(IssuePainTrackingStatus.TRACKING, false)).toBe(1);
    expect(
      getCurrentFlowStep(IssuePainTrackingStatus.FIXED_PENDING_RETEST, false)
    ).toBe(2);
    expect(
      getCurrentFlowStep(IssuePainTrackingStatus.RETEST_FAILED, false)
    ).toBe(3);
  });

  it('marks terminal statuses as fully finished', () => {
    // 回归点：PASSED 之前返回 isObserve ? 2 : 3（最后一步下标），
    // 终态被渲染成“进行中”，且终步说明时间被剥离规则丢弃
    expect(getCurrentFlowStep(IssuePainTrackingStatus.PASSED, false)).toBe(4);
    expect(getCurrentFlowStep(IssuePainTrackingStatus.PASSED, true)).toBe(3);
    expect(getCurrentFlowStep(IssuePainTrackingStatus.INVALID, false)).toBe(2);
  });
});

describe('getFlowItems', () => {
  it('pending step carries no timestamp, confirmed time belongs to step 2', () => {
    // 回归点：待确认 / 已确认待修复 两步之前都渲染 confirmedAt
    const items = getFlowItems(
      buildTracking({ status: IssuePainTrackingStatus.TRACKING }),
      false
    );

    expect(items.map((item) => item.title)).toEqual([
      '待确认',
      '已确认待修复',
      '已修复待复测',
      '已复测通过',
    ]);
    expect(descriptionText(items[0])).toBeNull();
    expect(descriptionText(items[1])).toBe(formatTrackingTime(CONFIRMED_AT));
    expect(descriptionText(items[2])).toBeNull();
    expect(descriptionText(items[3])).toBeNull();
  });

  it('passed flow shows the retest time on the final step', () => {
    const items = getFlowItems(
      buildTracking({
        status: IssuePainTrackingStatus.PASSED,
        retest: { decision: 'passed', auto: true, at: RETEST_AT },
      }),
      false
    );

    expect(descriptionText(items[3])).toBe(formatTrackingTime(RETEST_AT));
  });

  it('invalid flow shows the invalid transition time', () => {
    const items = getFlowItems(
      buildTracking({
        status: IssuePainTrackingStatus.INVALID,
        history: [
          {
            at: INVALID_AT,
            by: 'alice',
            action: 'mark_invalid',
            from: IssuePainTrackingStatus.PENDING,
            to: IssuePainTrackingStatus.INVALID,
            reason: 'not a real pain',
            latestTitle: 'pain',
          },
        ],
      }),
      false
    );

    expect(items.map((item) => item.title)).toEqual(['待确认', '非有效问题']);
    expect(descriptionText(items[1])).toBe(formatTrackingTime(INVALID_AT));
  });
});
