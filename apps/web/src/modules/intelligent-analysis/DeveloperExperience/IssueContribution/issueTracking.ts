import { IssuePainTrackingStatus } from './types';
import type {
  IssuePainTracking,
  IssuePainTrackingIssue,
  IssueReportPainIssue,
} from './types';

export const isIssueAwaitingReview = (issue?: IssuePainTrackingIssue) =>
  issue?.invalid_review?.status === 'pending';

export const isIssueUndecided = (issue: IssuePainTrackingIssue) =>
  issue.valid == null && !isIssueAwaitingReview(issue);

export const isIssueValidityActionable = (issue: IssuePainTrackingIssue) =>
  typeof issue.valid === 'boolean' &&
  !isIssueAwaitingReview(issue) &&
  issue.retest_status !== 'passed';

export const isIssueRepairActionable = (issue: IssuePainTrackingIssue) =>
  issue.valid === true && isIssueValidityActionable(issue);

export const getPendingReviewCount = (tracking: IssuePainTracking) =>
  tracking.pendingReviewCount ??
  [...tracking.activeIssues, ...tracking.archivedIssues].filter(
    (issue) =>
      isIssueAwaitingReview(issue) &&
      (tracking.activeIssues.includes(issue) ||
        !issue.invalid_review?.period ||
        issue.invalid_review.period === tracking.lastSeenPeriod)
  ).length;

export const getIssueProcessingStatus = (tracking?: IssuePainTracking) => {
  const valid =
    tracking?.activeIssues.filter(
      (issue) => issue.valid === true && !isIssueAwaitingReview(issue)
    ) ?? [];
  if (tracking?.status === IssuePainTrackingStatus.PENDING && valid.length) {
    return valid.every((issue) => issue.fixed)
      ? IssuePainTrackingStatus.FIXED_PENDING_RETEST
      : IssuePainTrackingStatus.TRACKING;
  }
  return tracking?.status;
};

export const getReviewablePainIssues = (
  issues: IssueReportPainIssue[],
  tracking: IssuePainTracking,
  reviewOnly = false
): IssueReportPainIssue[] => {
  const pending = [...tracking.activeIssues, ...tracking.archivedIssues].filter(
    (issue) =>
      isIssueAwaitingReview(issue) &&
      (tracking.activeIssues.includes(issue) ||
        !issue.invalid_review?.period ||
        issue.invalid_review.period === tracking.lastSeenPeriod)
  );
  const numbers = new Set(pending.map((issue) => issue.number));
  const known = new Set(issues.map((issue) => issue.number));
  const missing = pending
    .filter((issue) => !known.has(issue.number))
    .map((issue) => ({
      number: issue.number,
      title: issue.title,
      url: issue.url,
      score: issue.score,
      metric_code: issue.metric_code ?? '',
    }));
  return [...issues, ...missing].filter(
    (issue) => !reviewOnly || numbers.has(issue.number)
  );
};
