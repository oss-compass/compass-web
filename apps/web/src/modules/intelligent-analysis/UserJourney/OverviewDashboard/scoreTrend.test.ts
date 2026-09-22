import type { RepoProgressRow } from './types';
import {
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
