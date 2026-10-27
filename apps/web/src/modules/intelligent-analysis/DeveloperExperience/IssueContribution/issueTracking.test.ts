import {
  getIssueProcessingStatus,
  getPendingReviewCount,
  getReviewablePainIssues,
  isIssueUndecided,
} from './issueTracking';
import { IssuePainTrackingStatus } from './types';
import type { IssuePainTracking, IssuePainTrackingIssue } from './types';

const pending = {
  number: '609',
  valid: null,
  invalid_review: { status: 'pending', period: 'current' },
} as IssuePainTrackingIssue;
const valid = {
  number: '610',
  valid: true,
  fixed: true,
} as IssuePainTrackingIssue;
const tracking = {
  status: IssuePainTrackingStatus.PENDING,
  trackingType: 'fix',
  lastSeenPeriod: 'current',
  activeIssues: [pending, valid],
  archivedIssues: [],
} as unknown as IssuePainTracking;

describe('independent Issue review and repair progress', () => {
  it('counts submitted reviews as decisions, but rejected reviews require a decision', () => {
    expect(isIssueUndecided(pending)).toBe(false);
    expect(
      isIssueUndecided({
        ...pending,
        invalid_review: { ...pending.invalid_review!, status: 'rejected' },
      })
    ).toBe(true);
  });
  it('allows fixed valid Issues to retest while other Issues await a decision', () => {
    expect(getIssueProcessingStatus(tracking)).toBe(
      IssuePainTrackingStatus.FIXED_PENDING_RETEST
    );
    expect(
      getIssueProcessingStatus({ ...tracking, activeIssues: [pending] })
    ).toBe(IssuePainTrackingStatus.PENDING);
  });
  it('counts only the current review period and respects the server count', () => {
    expect(getPendingReviewCount(tracking)).toBe(1);
    expect(getPendingReviewCount({ ...tracking, pendingReviewCount: 3 })).toBe(
      3
    );
    expect(
      getPendingReviewCount({
        ...tracking,
        activeIssues: [],
        archivedIssues: [pending],
        lastSeenPeriod: 'next',
      })
    ).toBe(0);
  });
  it('keeps current pending reviews visible even after a rerun removed their rows', () => {
    const rows = getReviewablePainIssues(
      [{ number: '610', score: 60, metric_code: '' }],
      tracking,
      true
    );
    expect(rows.map((row) => row.number)).toEqual(['609']);
  });
});
