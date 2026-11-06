import type { CiJourney, CiRepoData, CiRepoKey } from '../../types';
import type { CiPainIssue, CiPainOverview } from '../../overviewApi';
import type { TrackingStatus } from '../PainTracking/model';
import { CI_REPOS, delta, repoSlug, type CiDelta } from '../../helpers';

const repoOrder = new Map(CI_REPOS.map(({ key }, index) => [key, index]));

export type CiRepoSummary = {
  repo: CiRepoKey;
  slug: string;
  workflow: string;
  days: string[];
  latestDay: string;
  scoreOverall: number | null;
  scoreHistory: Array<{ date: string; score: number | null }>;
  scoreMetrics: Array<{ key: string; label: string; score: number | null }>;
};

export type CiTopIssue = CiPainIssue & {
  key: string;
  repo: string;
  slug: string;
  workflow: string;
  day: string;
};

export type CiTrendItem = {
  title: string;
  meaning: string;
  values: (number | null)[];
  unit: string;
  color: string;
  last: number | null;
  delta: CiDelta;
};

type CiOverviewKpi = {
  label: string;
  value: string;
  unit: string;
  trend?: CiTrendItem;
};

export const TRACKING_STATES: TrackingStatus[] = [
  'pending',
  'confirmed',
  'fixed',
  'invalid',
];

export const countPainProgress = (issues: Pick<CiTopIssue, 'status'>[]) => {
  const counts = { pending: 0, confirmed: 0, fixed: 0, invalid: 0 };
  issues.forEach((issue) => {
    counts[issue.status] += 1;
  });
  const effective = issues.length - counts.invalid;
  return {
    ...counts,
    total: issues.length,
    effective,
    rate: effective ? (counts.fixed / effective) * 100 : 100,
  };
};

const average = (values: Array<number | null>) => {
  const measured = values.filter(
    (v): v is number => v != null && Number.isFinite(v)
  );
  return measured.length
    ? +(measured.reduce((a, b) => a + b, 0) / measured.length).toFixed(1)
    : null;
};

export const painReportsMatch = (
  repos: CiRepoSummary[],
  pain: CiPainOverview
) => {
  const expected = repos.filter((repo) => repo.latestDay);
  return (
    expected.length === pain.reports.length &&
    expected.every((repo) =>
      pain.reports.some(
        (report) =>
          report.repo === repo.repo &&
          report.day === repo.latestDay &&
          report.workflow === repo.workflow
      )
    )
  );
};

/** 日分只取后端 scores；当前值均为各仓最新完整日报的均值，缺失分不补零。 */
export const computeCommunityOverview = (
  data: Record<CiRepoKey, CiRepoData>,
  journeys: Partial<Record<CiRepoKey, CiJourney>>,
  pain?: CiPainOverview
) => {
  const repos: CiRepoSummary[] = Object.entries(data).map(([repo, dataset]) => {
    const latestDay = dataset.days[dataset.days.length - 1] || '';
    const scores = journeys[repo]?.boards[latestDay]?.scores;
    return {
      repo,
      slug: dataset.name || repoSlug(repo),
      workflow: dataset.workflow,
      days: dataset.days,
      latestDay,
      scoreOverall: journeys[repo]?.boards[latestDay]?.scores?.total ?? null,
      scoreHistory: dataset.days.map((date) => ({
        date,
        score: journeys[repo]?.boards[date]?.scores?.total ?? null,
      })),
      scoreMetrics: Object.entries(scores?.dims ?? {}).flatMap(
        ([dimension, item]) =>
          Object.entries(item.metrics ?? {}).map(([label, score]) => ({
            key: `${dimension}:${label}`,
            label,
            score,
          }))
      ),
    };
  });
  repos.sort(
    (a, b) =>
      (repoOrder.get(a.repo) ?? Infinity) -
      (repoOrder.get(b.repo) ?? Infinity)
  );
  const days = Array.from(new Set(repos.flatMap((repo) => repo.days))).sort();
  const datePool = repos
    .map((repo) => repo.latestDay)
    .filter(Boolean)
    .sort();
  const latestDay = datePool[datePool.length - 1] || '';
  const earliestDay = datePool[0] || '';
  const readScore = (repo: CiRepoSummary, day: string) =>
    journeys[repo.repo]?.boards[day]?.scores?.total ?? null;
  const overallScore = average(repos.map((repo) => repo.scoreOverall));
  // 每仓各取前一个观测日，避免拿整个历史首日作为“变化”。
  const comparable = repos.flatMap((repo) => {
    const current = repo.scoreOverall;
    const previous = readScore(repo, repo.days[repo.days.length - 2]);
    return current != null && previous != null ? [{ current, previous }] : [];
  });
  const trend: CiTrendItem = {
    title: '综合体验评分',
    meaning:
      '截至各观测日，取各仓最近一个完整日报的非空评分均值。已有日报缺失的评分不补分；变化与各仓前一观测日比较。',
    values: days.map((day) =>
      average(
        repos.map((repo) => {
          const reportDay = [...repo.days]
            .reverse()
            .find((date) => date <= day);
          return reportDay ? readScore(repo, reportDay) : null;
        })
      )
    ),
    unit: '分',
    color: '#19a796',
    last: overallScore,
    delta: delta(
      average(comparable.map((x) => x.previous)),
      average(comparable.map((x) => x.current)),
      false
    ),
  };
  const topIssues: CiTopIssue[] = (pain?.reports ?? [])
    .flatMap((report) =>
      report.issues.map((issue) => ({
        ...issue,
        key: JSON.stringify([
          report.repo,
          report.workflow,
          report.day,
          issue.problemKey,
        ]),
        repo: report.repo,
        slug: report.slug,
        workflow: report.workflow,
        day: report.day,
      }))
    )
    .sort(
      (a, b) =>
        a.pri.localeCompare(b.pri) || (b.impact.prs ?? 0) - (a.impact.prs ?? 0)
    );
  const progress = countPainProgress(topIssues);
  const trackingReady = !!pain && painReportsMatch(repos, pain);
  const kpis: CiOverviewKpi[] = [
    {
      label: '综合体验评分',
      value: overallScore == null ? '—' : String(overallScore),
      unit: overallScore == null ? '' : '分',
      trend,
    },
    {
      label: '问题闭环',
      value: trackingReady ? String(+progress.rate.toFixed(1)) : '—',
      unit: trackingReady ? '%' : '',
    },
    {
      label: '达成 90 分以上仓数',
      value: String(
        repos.filter(
          (repo) => repo.scoreOverall != null && repo.scoreOverall >= 90
        ).length
      ),
      unit: '',
    },
    { label: '覆盖仓库数', value: String(repos.length), unit: '' },
  ];
  return {
    hasData: days.length > 0,
    overallScore,
    repos,
    kpis,
    days,
    earliestDay,
    latestDay,
    topIssues,
    progress,
    scoredRepoCount: repos.filter((repo) => repo.scoreOverall != null).length,
  };
};
