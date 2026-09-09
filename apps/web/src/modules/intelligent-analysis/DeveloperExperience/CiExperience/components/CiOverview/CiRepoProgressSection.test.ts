import type { CiTopIssue } from './communityMetrics';
import { buildCiAggregateRow, type RepoRow } from './CiRepoProgressSection';

const issue = (key: string, status: string): CiTopIssue =>
  ({ key, status } as CiTopIssue);

const repo = (
  slug: string,
  scoreOverall: number | null,
  issues: CiTopIssue[]
): RepoRow =>
  ({
    repo: slug,
    slug,
    teamName: '算子分队',
    scoreOverall,
    issues,
  } as unknown as RepoRow);

describe('community engineering repository category aggregation', () => {
  it('averages measured repository scores and aggregates issue progress', () => {
    const result = buildCiAggregateRow('ops-nn（神经网络算子）', [
      repo('ops-nn', 60, [issue('a', '仍活跃'), issue('b', '已消退')]),
      repo('ops-tensor', 90, [issue('c', '待回填'), issue('d', '已消退')]),
      repo('missing-score', null, []),
    ]);

    expect(result).toMatchObject({
      name: 'ops-nn（神经网络算子）',
      repoCount: 3,
      score: 75,
      active: 1,
      backfill: 1,
      faded: 2,
      total: 4,
      closeRate: 50,
    });
  });

  it('keeps empty categories neutral', () => {
    expect(buildCiAggregateRow('render（可微渲染）', [])).toMatchObject({
      repoCount: 0,
      score: null,
      total: 0,
      closeRate: 100,
      repos: [],
    });
  });
});
