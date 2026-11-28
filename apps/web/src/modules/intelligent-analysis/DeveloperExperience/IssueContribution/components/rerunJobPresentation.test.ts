import type { IssuePainRerunJob } from '../types';

import {
  getLockedRerunIssueNumbers,
  isRerunLocked,
} from './rerunJobPresentation';

const makeJob = (
  overrides: Partial<IssuePainRerunJob> = {}
): IssuePainRerunJob => ({
  jobId: 'job-1',
  taskId: 'task-1',
  community: 'cann-ops-nn',
  platform: 'gitcode',
  period: '2026-07-13_to_2026-07-19',
  reportKey: 'report_cann-ops-nn_2026-07-13_to_2026-07-19',
  trackingKey: 'tracking-1',
  affectedTrackingKeys: ['tracking-2'],
  mode: 'retest',
  issueNumbers: ['#101', '#102'],
  taskStatus: 'succeeded',
  applyStatus: 'waiting_report',
  progress: 100,
  operator: 'alice',
  createdAt: '2026-09-08T00:00:00Z',
  eta: {
    minMinutes: 5,
    maxMinutes: 10,
    earliestAt: '2026-09-08T00:05:00Z',
    latestAt: '2026-09-08T00:10:00Z',
  },
  results: [],
  ...overrides,
});

describe('isRerunLocked', () => {
  it('keeps the issue locked while the rerun is still running', () => {
    expect(isRerunLocked(makeJob({ applyStatus: 'waiting_report' }))).toBe(
      true
    );
    expect(isRerunLocked(makeJob({ applyStatus: 'applying' }))).toBe(true);
    expect(
      isRerunLocked(
        makeJob({ taskStatus: 'running', applyStatus: 'waiting_task' })
      )
    ).toBe(true);
  });

  it('releases the lock once the rerun reached a terminal state', () => {
    expect(isRerunLocked(makeJob({ applyStatus: 'applied' }))).toBe(false);
    expect(
      isRerunLocked(
        makeJob({ taskStatus: 'failed', applyStatus: 'waiting_task' })
      )
    ).toBe(false);
    expect(
      isRerunLocked(
        makeJob({ taskStatus: 'cancelled', applyStatus: 'waiting_task' })
      )
    ).toBe(false);
  });

  it('releases the lock when applying the report failed', () => {
    // apply_failed 是应用阶段的终态：任务不会再前进，
    // 继续锁定会让该 Issue 永远无法再次发起复测。
    expect(isRerunLocked(makeJob({ applyStatus: 'apply_failed' }))).toBe(false);
  });
});

describe('getLockedRerunIssueNumbers', () => {
  it('only reports locked issues while the rerun is still active', () => {
    expect(
      getLockedRerunIssueNumbers(makeJob({ applyStatus: 'applying' }))
    ).toEqual(['#101', '#102']);
    expect(
      getLockedRerunIssueNumbers(makeJob({ applyStatus: 'applied' }))
    ).toEqual([]);
  });

  it('does not keep issues locked after the report application failed', () => {
    expect(
      getLockedRerunIssueNumbers(makeJob({ applyStatus: 'apply_failed' }))
    ).toEqual([]);
  });
});
