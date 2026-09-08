import {
  groupOperatorRepos,
  summarizeOperatorRepos,
} from './operatorCategories';
import type { RepoProgressRow } from './types';

function repo(
  id: string,
  overrides: Partial<RepoProgressRow> = {}
): RepoProgressRow {
  return {
    id,
    name: id,
    team: '算子分队',
    repoCategory: 'aal',
    score: null,
    successRate: null,
    executionTime: null,
    hardwareEnv: 'repo-default',
    operatingSystem: 'repo-default',
    scoreHistory: [],
    issues: [],
    overall: {
      total: 2,
      pending: 1,
      inProgress: 0,
      resolved: 1,
      na: 0,
      closeRate: 50,
    },
    key: {
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      na: 0,
      closeRate: 0,
    },
    ...overrides,
  };
}

test('averages measured values including zero, excludes missing values and sums counts', () => {
  const summary = summarizeOperatorRepos([
    repo('a', { score: 0, successRate: 0, executionTime: 0 }),
    repo('b', { score: 100, successRate: 80, executionTime: 120 }),
    repo('c'),
  ]);
  expect(summary).toMatchObject({
    score: 50,
    successRate: 40,
    executionTime: 60,
    total: 6,
    pending: 3,
    resolved: 3,
    inProgress: 0,
    closeRate: 50,
  });
});

test('environment and report come from the same newest timestamp, independent of order and timezone', () => {
  const older = repo('a', {
    latestReportId: 'older',
    latestReportMetadata: {
      generatedAt: '2026-09-08T12:00:00+08:00',
      hardwareEnv: '910B',
      operatingSystem: 'old-os',
    },
  });
  const newer = repo('b', {
    latestReportId: 'newer',
    latestReportMetadata: {
      generatedAt: '2026-09-08T05:00:00Z',
      hardwareEnv: '950',
      operatingSystem: 'new-os',
    },
  });
  const invalid = repo('c', {
    latestReportId: 'invalid',
    latestReportMetadata: {
      generatedAt: 'invalid',
      hardwareEnv: 'invalid',
      operatingSystem: 'invalid',
    },
  });
  for (const rows of [
    [older, newer, invalid],
    [invalid, newer, older],
  ]) {
    const summary = summarizeOperatorRepos(rows);
    expect(summary.latestRepo?.latestReportId).toBe('newer');
    expect(summary.hardwareEnvs).toEqual(['950', '910B']);
    expect(summary.operatingSystems).toEqual(['new-os', 'old-os']);
  }
});

test('does not fill missing newest report environment from older reports or repository defaults', () => {
  const summary = summarizeOperatorRepos([
    repo('a', {
      latestReportId: 'report',
      latestReportMetadata: {
        generatedAt: '2026-09-08T05:00:00Z',
        hardwareEnv: '',
        operatingSystem: '',
      },
    }),
  ]);
  expect(summary.hardwareEnvs).toEqual([]);
  expect(summary.operatingSystems).toEqual([]);
  expect(
    summarizeOperatorRepos([repo('no-report')]).latestRepo
  ).toBeUndefined();
});

test('keeps eight empty groups and returns missing averages for empty categories', () => {
  expect(groupOperatorRepos([])).toHaveLength(8);
  expect(summarizeOperatorRepos([])).toMatchObject({
    score: null,
    successRate: null,
    executionTime: null,
    closeRate: null,
    total: 0,
    hardwareEnvs: [],
    operatingSystems: [],
  });
});

test('category environments use child latest reports, deduplicate and cap at two', () => {
  const rows = [
    repo('newest', {
      latestReportId: 'r3',
      latestReportMetadata: {
        generatedAt: '2026-09-09T00:00:00Z',
        hardwareEnv: '950',
        operatingSystem: 'openEuler',
      },
    }),
    repo('second', {
      latestReportId: 'r2',
      latestReportMetadata: {
        generatedAt: '2026-09-08T00:00:00Z',
        hardwareEnv: '910B',
        operatingSystem: 'Ubuntu',
      },
    }),
    repo('duplicate', {
      latestReportId: 'r1',
      latestReportMetadata: {
        generatedAt: '2026-09-07T00:00:00Z',
        hardwareEnv: '950',
        operatingSystem: 'openEuler',
      },
    }),
    repo('third', {
      latestReportId: 'r0',
      latestReportMetadata: {
        generatedAt: '2026-09-06T00:00:00Z',
        hardwareEnv: '910C',
        operatingSystem: 'Debian',
      },
    }),
  ];
  const summary = summarizeOperatorRepos(rows);
  expect(summary.hardwareEnvs).toEqual(['950', '910B']);
  expect(summary.operatingSystems).toEqual(['openEuler', 'Ubuntu']);
});

test('grouping preserves ascending and descending repository order and retains unknown categories', () => {
  for (const rows of [
    [repo('a'), repo('b')],
    [repo('b'), repo('a')],
  ]) {
    expect(groupOperatorRepos(rows)[0].repos).toEqual(rows);
  }
  expect(
    groupOperatorRepos([repo('unknown', { repoCategory: 'unknown' })]).at(-1)
      ?.key
  ).toBe('uncategorized');
});

test('closure rate is the repository average, not a ratio weighted by issue count', () => {
  const summary = summarizeOperatorRepos([
    repo('small', {
      overall: {
        total: 2,
        pending: 2,
        inProgress: 0,
        resolved: 0,
        na: 0,
        closeRate: 0,
      },
    }),
    repo('large', {
      overall: {
        total: 98,
        pending: 0,
        inProgress: 0,
        resolved: 98,
        na: 0,
        closeRate: 100,
      },
    }),
  ]);
  expect(summary.closeRate).toBe(50);
  expect(summary.total).toBe(100);
});

test('category trend averages repositories equally despite different report counts', () => {
  const { buildOperatorCategoryTrends } = require('./operatorCategoryTrends');
  const rows = [
    repo('a', {
      scoreHistory: [
        { reportId: 'a1', date: '2026-09-07', score: 0 },
        { reportId: 'a2', date: '2026-09-08', score: 0 },
      ],
    }),
    repo('b', {
      scoreHistory: [{ reportId: 'b1', date: '2026-09-08', score: 100 }],
    }),
  ];
  const trends = buildOperatorCategoryTrends(
    rows,
    7,
    new Date('2026-09-08T12:00:00')
  );
  expect(trends.scoreTrend[0].score).toBe(50);
  expect(trends.scoreTrend[0].sampleCount).toBe(2);
  expect(trends.successRateTrend).toHaveLength(1);
  expect(trends.closeRateTrend).toHaveLength(7);
  expect(
    trends.closeRateTrend.every(
      (point: { closeRate: number }) => point.closeRate === 100
    )
  ).toBe(true);
  expect(buildOperatorCategoryTrends([]).closeRateTrend).toEqual([]);
});
