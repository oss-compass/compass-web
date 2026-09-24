import { formatScore } from '../../presentation';
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Empty, Skeleton, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { buildIssueRepoManagementHref } from '../../../routes';
import IssueTrendSparkline from './IssueTrendSparkline';
import { fetchIssueOverview, fetchIssueTopPains } from '../../data';
import type { IssueOverviewTopPain } from '../../types';
import { computeIssueOverview, latestReposByPeriod } from './issueMetrics';
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
import type { IssueTrendModalData } from './IssueTrendModal';

const { Title } = Typography;

type IssueOverviewProps = { org?: string };

const ISSUE_QUERY_STALE_TIME = 5 * 60 * 1000;

const shortPeriod = (period: string): string => {
  const [start, end = start] = period.split('_to_');
  return end.length > 5 ? end.slice(5) : end;
};

const isResolvedPain = (pain: IssueOverviewTopPain) => {
  if (pain.trackingStatus === 5) return true;
  return /已闭环|已完成|已解决|closed|resolved/i.test(String(pain.state || ''));
};

/** Issue 贡献总览：参考 Compass 体验总览的信息架构，并复用当前页面视觉与交互。 */
const IssueOverview: React.FC<IssueOverviewProps> = ({ org }) => {
  const router = useRouter();
  const [appendixOpen, setAppendixOpen] = React.useState(false);
  const [trendModal, setTrendModal] =
    React.useState<IssueTrendModalData | null>(null);
  const repoManagementHref = buildIssueRepoManagementHref({ org });

  const {
    data: overviewResp,
    isLoading: overviewLoading,
    isError: loadError,
  } = useQuery({
    // 查询键带数据模型版本，避免旧的无 metrics 响应命中五分钟客户端缓存。
    queryKey: ['issue-overview', 'with-repo-category-v2', org],
    queryFn: ({ signal }) => fetchIssueOverview(org, signal),
    staleTime: ISSUE_QUERY_STALE_TIME,
  });
  const data = overviewResp?.overview ?? null;

  const { data: allPainsResp, isLoading: painsLoading } = useQuery({
    queryKey: ['issue-overview-all-pains', org],
    queryFn: ({ signal }) =>
      // slim：剔除 issue 明细大字段（evidence/reason/url/title 占响应体积
      // 九成以上），弹窗“涉及 Issue”明细按 painIds 按需拉取。
      fetchIssueTopPains({ org, page: 1, pageSize: 5000, slim: true }, signal),
    staleTime: ISSUE_QUERY_STALE_TIME,
  });

  // 总览主体先使用轻量聚合接口渲染；全量痛点较慢时仅对应模块显示骨架屏，
  // 不再阻塞评分、仓库排行和覆盖情况等首屏内容。
  if (overviewLoading) {
    return (
      <>
        <Title level={4} className="oj-section-title">
          总览信息
        </Title>
        <div
          className="overview-bottom-row"
          style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
        >
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="bottom-metric">
              <Skeleton active title={false} paragraph={{ rows: 3 }} />
            </div>
          ))}
        </div>
        {[0, 1, 2].map((index) => (
          <div key={index} className="section-card">
            <Skeleton active title paragraph={{ rows: 6 }} />
          </div>
        ))}
      </>
    );
  }

  const model = data ? computeIssueOverview(data) : null;
  if (!data || !model || !model.hasData) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-3xl border border-[rgba(var(--overview-white-rgb),0.8)] bg-[rgba(var(--overview-white-rgb),0.9)] p-6 shadow-[0_24px_70px_rgba(var(--overview-text-rgb),0.08)]">
        <Empty
          description={
            <span className="text-sm text-[var(--overview-slate)]">
              {loadError
                ? 'Issue 总览数据加载失败，请稍后重试'
                : '当前组织下暂无 Issue 贡献报告数据'}
            </span>
          }
        />
      </section>
    );
  }

  const latestRepos = latestReposByPeriod(data.repos);
  const scoredRepos = latestRepos.filter((repo) => repo.idxTotal != null);
  const latestAverageScore = scoredRepos.length
    ? scoredRepos.reduce((total, repo) => total + repo.idxTotal, 0) /
      scoredRepos.length
    : null;
  const pains = allPainsResp?.items ?? [];
  const resolvedPains = pains.filter(isResolvedPain).length;
  const score90PlusRepos = latestRepos.filter(
    (repo) => repo.idxTotal >= 90
  ).length;
  const orgSeg =
    typeof router.query.org === 'string' ? `/${router.query.org}` : '';
  const reportHref = (
    community: string,
    period?: string,
    stageId?: string,
    painId?: string
  ) =>
    `/intelligent-analysis${orgSeg}/experience/issue-contribution?repo=${encodeURIComponent(
      community
    )}${period ? `&period=${encodeURIComponent(period)}` : ''}${
      stageId ? `&stage=${encodeURIComponent(stageId)}` : ''
    }${painId ? `&pain=${encodeURIComponent(painId)}` : ''}`;
  const painCloseTrend = data.agg.periods.map((period) => {
    const appeared = pains.filter((pain) => pain.period <= period);
    return appeared.length
      ? +(
          (appeared.filter(isResolvedPain).length / appeared.length) *
          100
        ).toFixed(1)
      : 0;
  });
  const score90PlusRepoTrend = data.agg.periods.map(
    (period) =>
      data.repos.filter((repo) => repo.period === period && repo.idxTotal >= 90)
        .length
  );
  const coverageRepoTrend = data.agg.periods.map(
    (period) =>
      new Set(
        data.repos
          .filter((repo) => repo.period === period)
          .map((repo) => repo.community)
      ).size
  );

  const kpis = [
    {
      label: '综合体验评分',
      value: formatScore(latestAverageScore),
      trend: data.agg.idx,
      trendMax: 100,
    },
    {
      label: '闭环情况',
      value: `${resolvedPains} / ${pains.length}`,
      trend: painCloseTrend,
      trendMax: 100,
      trendUnit: '%',
    },
    {
      label: '达成 90 分以上仓数',
      value: String(score90PlusRepos),
      trend: score90PlusRepoTrend,
    },
    {
      label: '覆盖仓库数',
      value: String(latestRepos.length),
      trend: coverageRepoTrend,
    },
  ];

  return (
    <>
      <Title level={4} className="oj-section-title">
        总览信息
      </Title>
      <div
        className="overview-bottom-row"
        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
      >
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bottom-metric">
            <div className="bm-label">{kpi.label}</div>
            <div className="bm-value">
              <span className="bm-value-main">{kpi.value}</span>
              {kpi.trend && kpi.trend.length > 1 ? (
                <IssueTrendSparkline
                  className="bm-trend-sparkline"
                  trend={{
                    title: `${kpi.label} · 逐周趋势`,
                    subtitle:
                      kpi.label === '综合体验评分'
                        ? undefined
                        : '跨仓聚合 · 时间升序',
                    height: kpi.label === '综合体验评分' ? 340 : undefined,
                    unit: kpi.trendUnit,
                    values: kpi.trend,
                    labels: data.agg.periods.map(shortPeriod),
                    periods: data.agg.periods,
                  }}
                  width={52}
                  height={26}
                  maxValue={kpi.trendMax ?? Math.max(1, ...kpi.trend)}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <IssueScoreDistribution
        repos={latestRepos}
        reportHref={reportHref}
        overallScore={model.idxAverage}
      />
      <IssueRepoRankings repos={latestRepos} reportHref={reportHref} />

      {painsLoading ? (
        <div className="section-card">
          <Skeleton active title paragraph={{ rows: 6 }} />
        </div>
      ) : (
        <IssuePainProgressOverview
          pains={pains}
          repos={latestRepos}
          reportHref={reportHref}
          org={org}
        />
      )}

      <Title level={4} className="oj-section-title">
        TOP 问题
      </Title>
      {painsLoading ? (
        <div className="section-card">
          <Skeleton active title={false} paragraph={{ rows: 6 }} />
        </div>
      ) : (
        <IssueFrequentPainSection
          pains={pains}
          repos={latestRepos}
          reportHref={reportHref}
          org={org}
        />
      )}

      <IssueRepoProgressSection
        org={org}
        repos={latestRepos}
        reportHref={reportHref}
        repoManagementHref={repoManagementHref}
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
