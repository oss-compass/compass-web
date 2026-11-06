import type { CiTopIssue } from './communityMetrics';
import type { TrackingStatus } from '../PainTracking/model';
import {
  buildCiAggregateRow,
  groupCiRepoCategories,
  type RepoRow,
} from './CiRepoProgressSection';

const issue = (key: string, status: TrackingStatus): CiTopIssue =>
  ({ key, status } as CiTopIssue);

const repo = (
  slug: string,
  scoreOverall: number | null,
  issues: CiTopIssue[]
): RepoRow =>
  ({
    repo: slug,
    slug,
    teamName: '算子',
    scoreOverall,
    issues,
  } as unknown as RepoRow);

describe('community engineering repository category aggregation', () => {
  it('averages measured repository scores and aggregates issue progress', () => {
    const result = buildCiAggregateRow('ops-nn（神经网络算子）', [
      repo('ops-nn', 60, [issue('a', 'pending'), issue('b', 'fixed')]),
      repo('ops-tensor', 90, [issue('c', 'confirmed'), issue('d', 'invalid')]),
      repo('missing-score', null, []),
    ]);

    expect(result).toMatchObject({
      name: 'ops-nn（神经网络算子）',
      repoCount: 3,
      score: 75,
      pending: 1,
      confirmed: 1,
      fixed: 1,
      invalid: 1,
      total: 4,
    });
    expect(result.closeRate).toBeCloseTo(100 / 3);
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

it('only groups categories supplied by the API without static empty categories', () => {
  const item = {
    ...repo('dynamic', 0, []),
    repoCategory: 'backend-new-category',
  };
  const groups = groupCiRepoCategories([item]);
  expect(groups).toEqual([
    {
      key: 'backend-new-category',
      label: 'backend-new-category',
      repos: [item],
    },
  ]);
  expect(groupCiRepoCategories([])).toEqual([]);
});
