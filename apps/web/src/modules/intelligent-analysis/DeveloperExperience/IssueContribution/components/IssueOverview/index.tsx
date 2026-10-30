import { formatScore } from '../../presentation';
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Empty, Skeleton, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { buildIssueRepoManagementHref } from '../../../routes';
import OperationGuide from '../../../components/OperationGuide';
import IssueTrendSparkline from './IssueTrendSparkline';
import {
  fetchIssueOverviewFrequentPains,
  fetchIssueOverviewPainSummary,
  fetchIssueOverviewScoreInsights,
  fetchIssueOverviewSummary,
  fetchIssueOverviewTrends,
} from '../../data';
import IssueTrendModal from './IssueTrendModal';
import IssueRepoProgressSection from './IssueRepoProgressSection';
import IssueMetricsAppendix from './IssueMetricsAppendix';
import {
  IssueRepoRankings,
  IssueScoreDistribution,
} from './IssueScoreInsights';
import {
  IssueFrequentPainSection,
  IssuePainProgressOverview,
} from './IssuePainInsights';
import type {
  IssueOverviewV2PainSummary,
  IssueOverviewV2Summary,
  IssueOverviewV2Trend,
} from '../../types';
import type {
  IssueTrendGranularity,
  IssueTrendModalData,
} from './IssueTrendModal';

const { Title } = Typography;

type IssueOverviewProps = { org?: string };

const shortPeriod = (period: string): string => {
  const [start, end = start] = period.split('_to_');
  return end.length > 5 ? end.slice(5) : end;
};

const buildMonthlyTrend = (
  values: Array<number | null>,
  periods: string[],
  mode: 'average' | 'last'
) => {
  const grouped = new Map<string, Array<number | null>>();
  periods.forEach((period, index) => {
    const [start, end = start] = period.split('_to_');
    const month = end.slice(0, 7);
    grouped.set(month, [...(grouped.get(month) ?? []), values[index] ?? null]);
  });
  const labels = Array.from(grouped.keys()).sort();
  return {
    labels,
    values: labels.map((month) => {
      const validValues = (grouped.get(month) ?? []).filter(
        (value): value is number => value != null && Number.isFinite(value)
      );
      if (!validValues.length) return null;
      if (mode === 'last') return validValues[validValues.length - 1];
      return +(
        validValues.reduce((total, value) => total + value, 0) /
        validValues.length
      ).toFixed(1);
    }),
  };
};

const buildReportHref =
  (orgSeg: string) =>
  (community: string, period?: string, stageId?: string, painId?: string) =>
    `/intelligent-analysis${orgSeg}/experience/issue-contribution?repo=${encodeURIComponent(
      community
    )}${period ? `&period=${encodeURIComponent(period)}` : ''}${
      stageId ? `&stage=${encodeURIComponent(stageId)}` : ''
    }${painId ? `&pain=${encodeURIComponent(painId)}` : ''}`;

type Kpi = {
  label: string;
  value: string;
  trend?: IssueOverviewV2Trend;
  trendMax?: number;
  trendUnit?: string;
  monthlyMode: 'average' | 'last';
};

const buildKpis = ({
  summary,
  painSummary,
  scoreTrend,
  closeTrend,
  score90Trend,
  coverageTrend,
}: {
  summary?: IssueOverviewV2Summary;
  painSummary?: IssueOverviewV2PainSummary;
  scoreTrend?: IssueOverviewV2Trend;
  closeTrend?: IssueOverviewV2Trend;
  score90Trend?: IssueOverviewV2Trend;
  coverageTrend?: IssueOverviewV2Trend;
}): Kpi[] => {
  const trackablePains = painSummary
    ? painSummary.total - (painSummary.counts.historical ?? 0)
    : 0;
  const resolvedPains = painSummary?.counts.resolved ?? 0;
  return [
    {
      label: '综合体验评分',
      value: formatScore(summary?.score ?? null),
      trend: scoreTrend,
      trendMax: 100,
      monthlyMode: 'average',
    },
    {
      label: '闭环情况',
      value: painSummary ? `${resolvedPains} / ${trackablePains}` : '-',
      trend: closeTrend,
      trendMax: 100,
      trendUnit: '%',
      monthlyMode: 'last',
    },
    {
      label: '达成 90 分以上仓数',
      value: summary ? String(summary.score90PlusRepoCount) : '-',
      trend: score90Trend,
      monthlyMode: 'last',
    },
    {
      label: '覆盖仓库数',
      value: summary ? String(summary.repoCount) : '-',
      trend: coverageTrend,
      monthlyMode: 'last',
    },
  ];
};

/** 按模块独立取数：首屏得分不再等待痛点索引，任一模块慢只影响自身。 */
const IssueOverview: React.FC<IssueOverviewProps> = ({ org }) => {
  const router = useRouter();
  const [appendixOpen, setAppendixOpen] = React.useState(false);
  const [repoReady, setRepoReady] = React.useState(false);
  const [trendModal, setTrendModal] =
    React.useState<IssueTrendModalData | null>(null);
  const [trendGranularity, setTrendGranularity] =
    React.useState<IssueTrendGranularity>('month');
  const repoManagementHref = buildIssueRepoManagementHref({ org });

  const summaryQuery = useQuery({
    queryKey: ['issue-overview-v2-summary', org],
    queryFn: ({ signal }) => fetchIssueOverviewSummary(org, signal),
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const insightsQuery = useQuery({
    queryKey: ['issue-overview-v2-score-insights', org],
    queryFn: ({ signal }) => fetchIssueOverviewScoreInsights(org, signal),
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const painSummaryQuery = useQuery({
    queryKey: ['issue-overview-v2-pain-summary', org],
    queryFn: ({ signal }) => fetchIssueOverviewPainSummary(org, signal),
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const frequentQuery = useQuery({
    queryKey: ['issue-overview-v2-frequent-pains', org],
    queryFn: ({ signal }) => fetchIssueOverviewFrequentPains(org, signal),
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const scoreTrendQuery = useQuery({
    queryKey: ['issue-overview-v2-trend', org, 'score'],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTrends({ org, weeks: 104, metric: 'score' }, signal),
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const closeTrendQuery = useQuery({
    queryKey: ['issue-overview-v2-trend', org, 'closeRate'],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTrends(
        { org, weeks: 104, metric: 'closeRate' },
        signal
      ),
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const score90TrendQuery = useQuery({
    queryKey: ['issue-overview-v2-trend', org, 'score90'],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTrends({ org, weeks: 104, metric: 'score90' }, signal),
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const coverageTrendQuery = useQuery({
    queryKey: ['issue-overview-v2-trend', org, 'coverage'],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTrends({ org, weeks: 104, metric: 'coverage' }, signal),
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const summary = summaryQuery.data;
  const latestRepos = React.useMemo(
    () => insightsQuery.data?.repos ?? [],
    [insightsQuery.data]
  );

  // 排行榜行内趋势只批量查询上榜仓库，避免给全部仓库下发历史。
  const rankingCommunities = React.useMemo(() => {
    const scored = [...latestRepos]
      .filter((repo) => repo.idxTotal != null)
      .sort((left, right) => right.idxTotal - left.idxTotal);
    return Array.from(
      new Set(
        [...scored.slice(0, 5), ...scored.slice(-5)].map(
          (repo) => repo.community
        )
      )
    );
  }, [latestRepos]);
  const rankingTrendQuery = useQuery({
    queryKey: [
      'issue-overview-v2-trend',
      org,
      'ranking',
      rankingCommunities.join(','),
    ],
    queryFn: ({ signal }) =>
      fetchIssueOverviewTrends(
        { org, weeks: 104, repos: rankingCommunities },
        signal
      ),
    enabled: rankingCommunities.length > 0,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const reposWithTrends = React.useMemo(() => {
    const trend = rankingTrendQuery.data;
    if (!trend?.repos) return latestRepos;
    return latestRepos.map((repo) => {
      const values = trend.repos?.[repo.community];
      if (!values?.length) return repo;
      const valid = values
        .map((value, index) => ({ value, period: trend.periods[index] }))
        .filter(
          (item): item is { value: number; period: string } =>
            item.value != null && Number.isFinite(item.value)
        );
      return {
        ...repo,
        idxTrend: valid.map((item) => item.value),
        idxTrendPeriods: valid.map((item) => item.period),
      };
    });
  }, [latestRepos, rankingTrendQuery.data]);

  const summaryHeading = (
    <div className="overview-summary-title-row">
      <Title level={4} className="oj-section-title">
        总览信息
      </Title>
      <div className="overview-summary-actions !ml-auto !w-auto !justify-end">
        <OperationGuide module="issue" />
      </div>
    </div>
  );

  if (summaryQuery.isError) {
    return (
      <>
        {summaryHeading}
        <section className="flex min-h-[420px] items-center justify-center rounded-3xl border border-[rgba(var(--overview-white-rgb),0.8)] bg-[rgba(var(--overview-white-rgb),0.9)] p-6 shadow-[0_24px_70px_rgba(var(--overview-text-rgb),0.08)]">
          <Empty
            description={
              <span className="text-sm text-[var(--overview-slate)]">
                Issue 总览数据加载失败，请稍后重试
              </span>
            }
          />
        </section>
      </>
    );
  }

  if (summary && summary.repoCount === 0) {
    return (
      <>
        {summaryHeading}
        <section className="flex min-h-[420px] items-center justify-center rounded-3xl border border-[rgba(var(--overview-white-rgb),0.8)] bg-[rgba(var(--overview-white-rgb),0.9)] p-6 shadow-[0_24px_70px_rgba(var(--overview-text-rgb),0.08)]">
          <Empty
            description={
              <span className="text-sm text-[var(--overview-slate)]">
                当前组织下暂无 Issue 贡献报告数据
              </span>
            }
          />
        </section>
      </>
    );
  }

  const painSummary = painSummaryQuery.data;
  const orgSeg =
    typeof router.query.org === 'string' ? `/${router.query.org}` : '';
  const reportHref = buildReportHref(orgSeg);
  const kpis = buildKpis({
    summary,
    painSummary,
    scoreTrend: scoreTrendQuery.data,
    closeTrend: closeTrendQuery.data,
    score90Trend: score90TrendQuery.data,
    coverageTrend: coverageTrendQuery.data,
  });

  const allReady =
    !summaryQuery.isLoading &&
    !insightsQuery.isLoading &&
    !painSummaryQuery.isLoading &&
    !frequentQuery.isLoading &&
    !scoreTrendQuery.isLoading &&
    !closeTrendQuery.isLoading &&
    !score90TrendQuery.isLoading &&
    !coverageTrendQuery.isLoading &&
    !summaryQuery.isError &&
    !insightsQuery.isError &&
    !painSummaryQuery.isError &&
    !frequentQuery.isError &&
    repoReady;

  return (
    <>
      <span hidden data-issue-weekly-ready={allReady} />
      {summaryHeading}
      <div
        className="overview-bottom-row"
        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
      >
        {kpis.map((kpi) => {
          const values = kpi.trend?.values ?? [];
          const periods = kpi.trend?.periods ?? [];
          const monthlyTrend = buildMonthlyTrend(
            values,
            periods,
            kpi.monthlyMode
          );
          return (
            <div key={kpi.label} className="bottom-metric">
              <div className="bm-label">{kpi.label}</div>
              <div className="bm-value">
                {summaryQuery.isLoading && kpi.label !== '闭环情况' ? (
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 1, width: 80 }}
                  />
                ) : (
                  <span className="bm-value-main">{kpi.value}</span>
                )}
                {values.length > 1 ? (
                  <IssueTrendSparkline
                    className="bm-trend-sparkline"
                    trend={{
                      title: `${kpi.label} · 趋势`,
                      subtitle:
                        kpi.label === '综合体验评分'
                          ? undefined
                          : '跨仓聚合 · 时间升序',
                      height: kpi.label === '综合体验评分' ? 340 : undefined,
                      unit: kpi.trendUnit,
                      values,
                      labels: periods.map(shortPeriod),
                      periods,
                      monthly: monthlyTrend,
                    }}
                    width={52}
                    height={26}
                    maxValue={kpi.trendMax ?? Math.max(1, ...values)}
                    granularity={trendGranularity}
                    onGranularityChange={setTrendGranularity}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {insightsQuery.isLoading ? (
        <div className="section-card">
          <Skeleton active title paragraph={{ rows: 8 }} />
        </div>
      ) : (
        <>
          <IssueScoreDistribution
            repos={latestRepos}
            reportHref={reportHref}
            overallScore={summary?.score ?? null}
          />
          <IssueRepoRankings repos={reposWithTrends} reportHref={reportHref} />
        </>
      )}

      {painSummaryQuery.isLoading ? (
        <div className="section-card">
          <Skeleton active title paragraph={{ rows: 6 }} />
        </div>
      ) : painSummary ? (
        <IssuePainProgressOverview
          summary={painSummary}
          reportHref={reportHref}
          org={org}
        />
      ) : (
        <div className="section-card">
          <Empty description="痛点数据加载失败，请稍后重试" />
        </div>
      )}

      <Title level={4} className="oj-section-title">
        TOP 问题
      </Title>
      {frequentQuery.isLoading ? (
        <div className="section-card">
          <Skeleton active title={false} paragraph={{ rows: 6 }} />
        </div>
      ) : (
        <IssueFrequentPainSection
          groups={frequentQuery.data?.items ?? []}
          stageOptions={painSummary?.stageOptions ?? []}
          reportHref={reportHref}
          org={org}
        />
      )}

      <IssueRepoProgressSection
        expandAllTeams={router.query.expandAllTeams === '1'}
        org={org}
        stageOptions={painSummary?.stageOptions ?? []}
        reportHref={reportHref}
        repoManagementHref={repoManagementHref}
        onReadyChange={setRepoReady}
        onOpenScoreTrend={(repo) =>
          setTrendModal({
            title: `${repo.repoShort} · 得分趋势`,
            subtitle: '该仓各周综合体验指数（时间升序）',
            values: repo.idxTrend,
            labels: repo.idxTrendPeriods.map(shortPeriod),
            periods: repo.idxTrendPeriods,
          })
        }
        onOpenAggregateScoreTrend={(name, values, periods) =>
          setTrendModal({
            title: `${name} · 得分趋势`,
            subtitle: '各仓库同周期综合体验指数平均值（时间升序）',
            values,
            labels: periods.map(shortPeriod),
            periods,
          })
        }
      />

      <Title level={4} className="oj-section-title">
        附录
      </Title>
      <div className="section-card oj-qa-section">
        <div
          className="oj-qa-question-row"
          onClick={() => setAppendixOpen((value) => !value)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setAppendixOpen((value) => !value);
            }
          }}
        >
          <RightOutlined
            className={`oj-qa-expand-icon${appendixOpen ? ' is-expanded' : ''}`}
          />
          <span className="oj-qa-q-label">Q</span>
          <span className="oj-qa-question">Issue 体验指标体系</span>
        </div>
        {appendixOpen ? (
          <div className="oj-qa-answer">
            <div className="oj-qa-a-label-row">
              <span className="oj-qa-a-label">A</span>
            </div>
            <div className="oj-qa-answer-body">
              <IssueMetricsAppendix />
            </div>
          </div>
        ) : null}
      </div>

      <IssueTrendModal
        open={!!trendModal}
        trend={trendModal}
        onClose={() => setTrendModal(null)}
      />
    </>
  );
};

export default IssueOverview;
