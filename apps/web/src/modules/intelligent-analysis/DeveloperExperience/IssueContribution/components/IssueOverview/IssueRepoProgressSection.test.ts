import type { IssueOverviewRepo } from '../../types';
import { buildAggregateRow } from './IssueRepoProgressSection';

const repo = (
  name: string,
  values: Partial<IssueOverviewRepo>
): IssueOverviewRepo =>
  ({
    repoShort: name,
    idxTotal: 0,
    nTotal: 0,
    painTotal: 0,
    painPending: 0,
    painInProgress: 0,
    painResolved: 0,
    idxTrend: [],
    idxTrendPeriods: [],
    ...values,
  } as IssueOverviewRepo);

describe('community contribution category aggregation', () => {
  it('uses the existing weighted score and sums P0 progress fields', () => {
    const result = buildAggregateRow('aal（领域加速库）', [
      repo('a', {
        idxTotal: 60,
        nTotal: 1,
        painTotal: 2,
        painPending: 1,
        painResolved: 1,
      }),
      repo('b', {
        idxTotal: 90,
        nTotal: 3,
        painTotal: 3,
        painInProgress: 1,
        painResolved: 2,
      }),
    ]);

    expect(result).toMatchObject({
      name: 'aal（领域加速库）',
      repoCount: 2,
      score: 82.5,
      painTotal: 5,
      painPending: 1,
      painInProgress: 1,
      painResolved: 3,
      closeRate: 60,
    });
  });

  it('averages repository scores for each period in chronological order', () => {
    const result = buildAggregateRow('算子分队', [
      repo('a', {
        idxTrend: [60, 80],
        idxTrendPeriods: [
          '2026-08-01_to_2026-08-07',
          '2026-08-08_to_2026-08-14',
        ],
      }),
      repo('b', {
        idxTrend: [100, 70],
        idxTrendPeriods: [
          '2026-08-08_to_2026-08-14',
          '2026-08-15_to_2026-08-21',
        ],
      }),
    ]);

    expect(result.scoreTrendPeriods).toEqual([
      '2026-08-01_to_2026-08-07',
      '2026-08-08_to_2026-08-14',
      '2026-08-15_to_2026-08-21',
    ]);
    expect(result.scoreTrend).toEqual([60, 90, 70]);
  });

  it('keeps an empty category visible with neutral aggregate values', () => {
    expect(buildAggregateRow('render（可微渲染）', [])).toMatchObject({
      repoCount: 0,
      score: 0,
      painTotal: 0,
      closeRate: 100,
      scoreTrend: [],
      scoreTrendPeriods: [],
      repos: [],
    });
  });
});
