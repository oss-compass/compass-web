import type { IssueOverviewRepo } from '../../types';
import { buildRepoCountTrends, latestReposByPeriod } from './issueMetrics';

const report = (community: string, period: string, idxTotal: number | null) =>
  ({ community, period, idxTotal } as IssueOverviewRepo);

describe('repository count trends', () => {
  const early = '2026-10-01_to_2026-10-07';
  const latest = '2026-10-08_to_2026-10-14';

  it('includes all seven qualified repositories in the final October snapshot', () => {
    const repos = [
      ...['a', 'b', 'c'].map((name) => report(name, early, 95)),
      ...['d', 'e', 'f', 'g'].map((name) => report(name, latest, 90)),
    ];
    const result = buildRepoCountTrends(repos, [early, latest]);
    expect(result.score90Plus).toEqual([3, 7]);
    expect(result.coverage).toEqual([3, 7]);
    // 月度数量取当月最后一个快照，应与首页各仓最新报告统计相同。
    expect(result.score90Plus[1]).toBe(
      latestReposByPeriod(repos).filter((repo) => repo.idxTotal! >= 90).length
    );
  });

  it('uses the latest score per repository without counting future reports', () => {
    const repos = [
      report('a', latest, 80),
      report('a', early, 95),
      report('b', early, 90),
      report('c', latest, null),
    ];
    expect(
      buildRepoCountTrends(repos, ['2026-09-01_to_2026-09-07', early, latest])
    ).toEqual({ score90Plus: [0, 2, 1], coverage: [0, 2, 3] });
  });
});
