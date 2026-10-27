import { execFileSync } from 'child_process';
import type { RepoProgressRow } from './types';
import {
  buildScoreTrend,
  buildSuccessRateTrend,
  buildTeamScoreTrend,
  buildTeamSuccessRateTrend,
  buildTeamScannedRepoCountTrend,
  buildTeamScore95PlusRepoCountTrend,
} from './scoreTrend';

const repo = (
  id: string,
  scoreHistory: RepoProgressRow['scoreHistory']
): RepoProgressRow => ({ id, scoreHistory } as RepoProgressRow);

describe('overview repository count trends', () => {
  const repos = [
    repo('repo-a', [
      { reportId: 'a-1', date: '2026-09-01', score: 96 },
      { reportId: 'a-2', date: '2026-09-03', score: 94 },
      { reportId: 'a-3', date: '2026-09-08', score: 98 },
    ]),
    repo('repo-b', [{ reportId: 'b-1', date: '2026-09-02', score: 95 }]),
  ];

  it('keeps an online repository in subsequent weeks without requiring a new report', () => {
    expect(
      buildTeamScannedRepoCountTrend(repos).map((point) => point.score)
    ).toEqual([2, 2]);
  });

  it('uses the latest report in a week for the 95-point threshold', () => {
    const trend = buildTeamScore95PlusRepoCountTrend(repos);
    expect(trend.map((point) => point.score)).toEqual([1, 1]);
    expect(trend.map((point) => point.sampleCount)).toEqual([2, 1]);
  });
});

describe('calendar dates in weekly trends', () => {
  const history = [
    { reportId: 'monday', date: '2026-09-07', score: 4 },
    { reportId: 'sunday', date: '2026-09-13', score: 5 },
  ];

  it('groups Monday and Sunday in the same week with a Sunday label', () => {
    expect(buildScoreTrend(history)).toEqual([
      {
        key: '2026-09-07',
        date: '2026-09-07 - 2026-09-13',
        label: '9/13',
        score: 4.5,
        sampleCount: 2,
        weekStart: '2026-09-07',
        weekEnd: '2026-09-13',
      },
    ]);
  });

  it('uses the same calendar week for team scores and success rates', () => {
    const repos = [repo('repo-a', history)];
    expect(buildTeamScoreTrend(repos)).toEqual(buildScoreTrend(history));
    expect(buildSuccessRateTrend(history)).toEqual([
      expect.objectContaining({ key: '2026-09-07', label: '9/13', score: 90 }),
    ]);
    expect(buildTeamSuccessRateTrend(repos)).toEqual(
      buildSuccessRateTrend(history)
    );
  });

  it('uses the latest report in the calendar week for the 95-point count', () => {
    const trend = buildTeamScore95PlusRepoCountTrend([
      repo('repo-a', [
        { reportId: 'sunday', date: '2026-09-13', score: 94 },
        { reportId: 'monday', date: '2026-09-07', score: 96 },
      ]),
    ]);
    expect(trend).toEqual([
      expect.objectContaining({ key: '2026-09-07', score: 0, sampleCount: 1 }),
    ]);
  });

  it('counts new repositories in their calendar week across the year boundary', () => {
    const trend = buildTeamScannedRepoCountTrend([
      repo('repo-a', [{ reportId: 'a', date: '2025-12-29', score: 96 }]),
      repo('repo-b', [{ reportId: 'b', date: '2026-01-05', score: 98 }]),
    ]);
    expect(
      trend.map(({ key, label, score }) => ({ key, label, score }))
    ).toEqual([
      { key: '2025-12-29', label: '1/4', score: 1 },
      { key: '2026-01-05', label: '1/11', score: 2 },
    ]);
  });

  it('orders a date-only report before a later local timestamp that day', () => {
    const trend = buildTeamScore95PlusRepoCountTrend([
      repo('repo-a', [
        { reportId: 'later', date: '2026-09-07T01:00:00', score: 94 },
        { reportId: 'earlier', date: '2026-09-07', score: 96 },
      ]),
    ]);
    expect(trend).toEqual([
      expect.objectContaining({ key: '2026-09-07', score: 0, sampleCount: 1 }),
    ]);
  });
});

// Run in fresh processes: changing process.env.TZ inside Jest does not change
// the timezone of its VM's Date implementation.
it.each(['UTC', 'America/Los_Angeles', 'Asia/Shanghai'])(
  'preserves calendar weeks and report ordering in %s',
  (timezone) => {
    const output = execFileSync(
      process.execPath,
      [
        '-e',
        `
          const fs = require('fs');
          const ts = require('typescript');
          require.extensions['.ts'] = (module, filename) => {
            const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
              compilerOptions: { module: ts.ModuleKind.CommonJS },
              fileName: filename,
            });
            module._compile(outputText, filename);
          };
          const { buildScoreTrend, buildTeamScore95PlusRepoCountTrend } = require('./scoreTrend.ts');
          console.log(JSON.stringify({
            scores: buildScoreTrend([
              { reportId: 'monday', date: '2026-09-07', score: 96 },
              { reportId: 'sunday', date: '2026-09-13', score: 94 },
            ]),
            counts: buildTeamScore95PlusRepoCountTrend([{ id: 'repo-a', scoreHistory: [
              { reportId: 'later', date: '2026-09-07T01:00:00', score: 94 },
              { reportId: 'earlier', date: '2026-09-07', score: 96 },
            ] }]),
          }));
        `,
      ],
      {
        cwd: __dirname,
        env: { ...process.env, TZ: timezone },
        encoding: 'utf8',
      }
    );
    const { scores, counts } = JSON.parse(output);
    expect(scores).toEqual([
      expect.objectContaining({ key: '2026-09-07', label: '9/13', score: 95 }),
    ]);
    expect(counts).toEqual([
      expect.objectContaining({ key: '2026-09-07', score: 0, sampleCount: 1 }),
    ]);
  }
);
