import { buildCiFrequentPains } from './frequentPainGroups';
import type { CiTopIssue } from './communityMetrics';

const issue = (
  key: string,
  repo: string,
  kb: string,
  overrides: Partial<CiTopIssue> = {}
): CiTopIssue => ({
  key,
  problemKey: key,
  repo,
  slug: repo,
  workflow: 'ci',
  day: '2026-11-03',
  kb,
  title: `${repo} 的实际问题`,
  pri: 'P2',
  status: 'pending',
  dim: '稳定性',
  journeyStages: ['编译'],
  impact: {},
  ...overrides,
});

it('groups backend problem types across repositories, deduplicates reports and preserves separate dimensions', () => {
  const first = issue('a', 'one', '执行失败');
  const groups = buildCiFrequentPains(
    [
      first,
      first,
      issue('b', 'one', '执行失败', { pri: 'P1', journeyStages: ['静态检查'] }),
      issue('c', 'two', '执行失败', { status: 'fixed' }),
      issue('d', 'three', '执行失败', { dim: '效率' }),
      issue('invalid', 'four', '执行失败', { pri: 'P0', status: 'invalid' }),
    ],
    'all'
  );
  expect(groups).toHaveLength(2);
  expect(groups[0]).toMatchObject({
    title: '执行失败',
    dimension: '稳定性',
    repoCount: 2,
    priority: 'P1',
    stages: ['编译', '静态检查'],
  });
  expect(groups[0].issues.map((entry) => entry.key)).toEqual(['a', 'b', 'c']);
  expect(groups[1]).toMatchObject({ dimension: '效率', repoCount: 1 });
});

it('filters closure views before computing counts, coverage and priority', () => {
  const input = [
    issue('pending', 'one', '同类问题'),
    issue('confirmed', 'two', '同类问题', { status: 'confirmed', pri: 'P1' }),
    issue('fixed', 'three', '同类问题', { status: 'fixed', pri: 'P0' }),
    issue('invalid', 'four', '同类问题', { status: 'invalid' }),
  ];
  expect(buildCiFrequentPains(input, 'all')[0]).toMatchObject({
    repoCount: 3,
    priority: 'P0',
  });
  const open = buildCiFrequentPains(input, 'open')[0];
  expect(open).toMatchObject({ repoCount: 2, priority: 'P1' });
  expect(open.issues.map((entry) => entry.status)).toEqual([
    'pending',
    'confirmed',
  ]);
  const done = buildCiFrequentPains(input, 'done')[0];
  expect(done).toMatchObject({ repoCount: 1, priority: 'P0' });
  expect(done.issues.map((entry) => entry.status)).toEqual(['fixed']);
});

it('ranks all problems by repository coverage and open problems by problem count', () => {
  const input = [
    issue('a1', 'one', '集中问题'),
    issue('a2', 'one', '集中问题'),
    issue('a3', 'one', '集中问题'),
    issue('b1', 'one', '广泛问题'),
    issue('b2', 'two', '广泛问题'),
  ];
  expect(
    buildCiFrequentPains(input, 'all').map((group) => group.title)
  ).toEqual(['广泛问题', '集中问题']);
  expect(
    buildCiFrequentPains(input, 'open').map((group) => group.title)
  ).toEqual(['集中问题', '广泛问题']);
});

it('uses actual titles when a problem type is missing and handles empty views', () => {
  const input = [
    issue('a', 'one', '', { title: '问题甲' }),
    issue('b', 'two', '', { title: '问题乙' }),
  ];
  expect(
    buildCiFrequentPains(input, 'all')
      .map((group) => group.title)
      .sort()
  ).toEqual(['问题乙', '问题甲'].sort());
  expect(buildCiFrequentPains(input, 'done')).toEqual([]);
  expect(buildCiFrequentPains([], 'all')).toEqual([]);
});
