import {
  computeCommunityOverview,
  countPainProgress,
  painReportsMatch,
} from './communityMetrics';
import rawData from '../../ci-runtime-data.json';
import rawJourneys from '../CiReport/ci-journey.json';
import type { CiJourney, CiRepoData, CiRepoKey } from '../../types';
import type { CiPainOverview } from '../../overviewApi';

it('uses injected backend scores, includes new repositories and preserves zero scores', () => {
  const data = JSON.parse(JSON.stringify(rawData)) as CiRepoData;
  const journey = JSON.parse(JSON.stringify(rawJourneys.runtime)) as CiJourney;
  const day = data.days[data.days.length - 1];
  journey.days = [...data.days];
  journey.boards[day].scores!.total = 0;
  const m = computeCommunityOverview(
    { ge: data } as Record<CiRepoKey, CiRepoData>,
    { ge: journey }
  );
  expect(m.repos).toHaveLength(1);
  expect(m.repos[0]).toMatchObject({ repo: 'ge', scoreOverall: 0 });
  expect(m.kpis[0].value).toBe('0');
});

it('does not fill a missing latest score from an earlier date', () => {
  const data = JSON.parse(JSON.stringify(rawData)) as CiRepoData;
  const journey = JSON.parse(JSON.stringify(rawJourneys.runtime)) as CiJourney;
  journey.days = [...data.days];
  journey.boards[data.days[data.days.length - 1]].scores = null;
  const m = computeCommunityOverview(
    { runtime: data } as Record<CiRepoKey, CiRepoData>,
    { runtime: journey }
  );
  expect(m.repos[0].scoreOverall).toBeNull();
  expect(m.kpis[0].value).toBe('—');
});

it('counts real tracking states, excludes invalid issues and treats zero problems as 100 percent', () => {
  expect(countPainProgress([]).rate).toBe(100);
  expect(countPainProgress([{ status: 'invalid' }]).rate).toBe(100);
  expect(
    countPainProgress([
      { status: 'pending' },
      { status: 'confirmed' },
      { status: 'fixed' },
      { status: 'invalid' },
    ])
  ).toMatchObject({
    pending: 1,
    confirmed: 1,
    fixed: 1,
    invalid: 1,
    effective: 3,
  });
});

it('uses latest daily pain cards without legacy weekly problems and rejects mismatched dates', () => {
  const data = JSON.parse(JSON.stringify(rawData)) as CiRepoData;
  const journey = JSON.parse(JSON.stringify(rawJourneys.runtime)) as CiJourney;
  const day = data.days[data.days.length - 1];
  const pain: CiPainOverview = {
    reports: [
      {
        org: 'cann',
        repo: 'runtime',
        slug: data.name,
        workflow: data.workflow,
        day,
        issues: [
          {
            problemKey: '["stability","flaky","test"]',
            pri: 'P2',
            status: 'confirmed',
            title: '后端当日问题',
            kb: 'flaky',
            dim: '稳定性',
            journeyStages: ['跨段/未映射'],
            impact: { prs: 0 },
          },
        ],
      },
    ],
  };
  const overview = computeCommunityOverview(
    { runtime: data },
    { runtime: journey },
    pain
  );
  expect(overview.topIssues).toHaveLength(1);
  expect(overview.topIssues[0].title).toBe('后端当日问题');
  expect(overview.kpis[1]).toMatchObject({ value: '0', unit: '%' });
  expect(painReportsMatch(overview.repos, pain)).toBe(true);
  pain.reports[0].day = '2000-01-01';
  expect(painReportsMatch(overview.repos, pain)).toBe(false);
  expect(
    computeCommunityOverview({ runtime: data }, { runtime: journey }, pain)
      .kpis[1]
  ).toMatchObject({ value: '—', unit: '' });
  expect(
    computeCommunityOverview({ runtime: data }, { runtime: journey }).topIssues
  ).toEqual([]);
});

it('averages each latest report and compares the previous observation instead of the historical first', () => {
  const data = JSON.parse(JSON.stringify(rawData)) as CiRepoData;
  const journey = JSON.parse(JSON.stringify(rawJourneys.runtime)) as CiJourney;
  const days = data.days.slice(-3);
  data.days = days;
  journey.days = days;
  [10, 50, 75].forEach((score, index) => {
    journey.boards[days[index]].scores!.total = score;
  });
  const m = computeCommunityOverview({ runtime: data }, { runtime: journey });
  expect(m.kpis[0].value).toBe('75');
  expect(m.kpis[0].trend?.delta.txt).toBe('+50%');
  const olderData = { ...data, days: [days[0]] };
  const mixed = computeCommunityOverview(
    { runtime: data, ge: olderData },
    { runtime: journey, ge: journey }
  );
  expect(mixed.kpis[0].value).toBe('42.5');
  expect(mixed.kpis[0].trend?.values.slice(-1)).toEqual([42.5]);
});

it('counts repositories with latest scores of at least 90 and includes unscored repositories in coverage', () => {
  const data = JSON.parse(JSON.stringify(rawData)) as CiRepoData;
  const journey = JSON.parse(JSON.stringify(rawJourneys.runtime)) as CiJourney;
  const day = data.days[data.days.length - 1];
  const datasets: Record<CiRepoKey, CiRepoData> = {};
  const journeys: Partial<Record<CiRepoKey, CiJourney>> = {};
  [90, 100, 89.9, 0, null].forEach((score, index) => {
    const repo = `backend-repo-${index}`;
    const repoJourney = JSON.parse(JSON.stringify(journey)) as CiJourney;
    repoJourney.boards[day].scores =
      score == null
        ? null
        : { ...repoJourney.boards[day].scores!, total: score };
    datasets[repo] = data;
    journeys[repo] = repoJourney;
  });
  const overview = computeCommunityOverview(datasets, journeys);
  expect(overview.kpis.map(({ label }) => label)).toEqual([
    '综合体验评分',
    '问题闭环',
    '达成 90 分以上仓数',
    '覆盖仓库数',
  ]);
  expect(overview.kpis[2]).toMatchObject({ value: '2', unit: '' });
  expect(overview.kpis[3]).toMatchObject({ value: '5', unit: '' });
});

it('shows 100 percent only for a known report with no effective pain issues', () => {
  const data = JSON.parse(JSON.stringify(rawData)) as CiRepoData;
  const journey = JSON.parse(JSON.stringify(rawJourneys.runtime)) as CiJourney;
  const pain: CiPainOverview = {
    reports: [
      {
        org: 'cann',
        repo: 'runtime',
        slug: data.name,
        workflow: data.workflow,
        day: data.days[data.days.length - 1],
        issues: [],
      },
    ],
  };
  const compute = (input?: CiPainOverview) =>
    computeCommunityOverview({ runtime: data }, { runtime: journey }, input)
      .kpis[1];
  expect(compute()).toMatchObject({ value: '—', unit: '' });
  expect(compute({ reports: [] })).toMatchObject({ value: '—', unit: '' });
  expect(compute(pain)).toMatchObject({ value: '100', unit: '%' });
  pain.reports[0].issues = [
    {
      problemKey: 'invalid',
      title: '非有效问题',
      status: 'invalid',
      pri: 'P2',
      kb: 'test',
      dim: null,
      journeyStages: [],
      impact: {},
    },
  ];
  expect(compute(pain)).toMatchObject({ value: '100', unit: '%' });
  pain.reports[0].issues.push({
    ...pain.reports[0].issues[0],
    problemKey: 'fixed',
    title: '已修复待复测',
    status: 'fixed',
  });
  pain.reports[0].issues.push({
    ...pain.reports[0].issues[0],
    problemKey: 'pending',
    title: '待确认',
    status: 'pending',
  });
  expect(compute(pain)).toMatchObject({ value: '50', unit: '%' });
});
