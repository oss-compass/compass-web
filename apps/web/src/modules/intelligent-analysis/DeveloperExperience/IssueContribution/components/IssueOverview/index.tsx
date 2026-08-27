import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Empty, Skeleton, Table, Tag, Tooltip, Typography } from 'antd';
import type { TableProps } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import { fetchIssueOverview, fetchIssueTopPains } from '../../data';
import type { IssueOverviewRepo, IssueOverviewTopPain } from '../../types';
import { computeIssueOverview, latestReposByPeriod } from './issueMetrics';
import type { IssueStageAgg } from './issueMetrics';
import IssueTrendModal from './IssueTrendModal';
import IssueRepoProgressSection from './IssueRepoProgressSection';
import type { IssueTrendModalData } from './IssueTrendModal';

const { Title } = Typography;

type IssueOverviewProps = {
  org?: string;
};

const GRADE_META: Record<string, { color: string; bg: string }> = {
  A: { color: '#16835e', bg: '#e8f7f1' },
  B: { color: '#1f7a5c', bg: '#eafaf3' },
  C: { color: '#3b6fd6', bg: '#eaf2ff' },
  D: { color: '#b7791f', bg: '#fef4e6' },
  F: { color: '#d03b3b', bg: '#fdecec' },
};

const PRI_META: Record<string, { color: string; bg: string }> = {
  P0: { color: '#d03b3b', bg: '#fdecec' },
  P1: { color: '#b7791f', bg: '#fef4e6' },
  P2: { color: '#3b6fd6', bg: '#eaf2ff' },
  P3: { color: '#64748b', bg: '#f1f5f9' },
};

const gradeStyle = (grade: string) =>
  GRADE_META[grade.toUpperCase()] ?? GRADE_META.C;

const priStyle = (prio: string) => {
  const key = /P0/i.test(prio)
    ? 'P0'
    : /P1/i.test(prio)
    ? 'P1'
    : /P2/i.test(prio)
    ? 'P2'
    : 'P3';
  return PRI_META[key];
};

/** 'YYYY-MM-DD_to_YYYY-MM-DD' → 起始日 'MM-DD'（趋势 X 轴短标签） */
const shortPeriod = (period: string): string => {
  const since = period.split('_to_')[0] ?? period;
  return since.length > 5 ? since.slice(5) : since;
};

// 缓存新鲜期：切换模块 tab 时组件会卸载重挂，命中 react-query 缓存即不重新请求，
// 与「社区入门」总览的缓存体验保持一致（后端本身另有 60s 聚合缓存）
const ISSUE_QUERY_STALE_TIME = 5 * 60 * 1000;

/**
 * Issue 贡献总览（跨仓聚合）。
 * 结构与「社区 CI/CD 总览」一致：① 顶部 KPI ② 痛点概览·阶段体验·各仓库对比
 * ③ 重点待办痛点表格 ④ 附录 QA；样式全量复用社区总览看板全局类。
 */
const IssueOverview: React.FC<IssueOverviewProps> = ({ org }) => {
  const router = useRouter();
  const [appendixOpen, setAppendixOpen] = React.useState(false);
  const [trendModal, setTrendModal] =
    React.useState<IssueTrendModalData | null>(null);
  // 重点待办痛点：服务端分页，按页/按筛选条件拉取，不一次性下发全量
  const [painPage, setPainPage] = React.useState(1);
  const [painPageSize, setPainPageSize] = React.useState(10);
  const [painFilters, setPainFilters] = React.useState<{
    repo?: string;
    prio?: string;
  }>({});

  // 切换组织时重置痛点表格的分页与筛选状态
  React.useEffect(() => {
    setPainPage(1);
    setPainFilters({});
  }, [org]);

  const {
    data: overviewResp,
    isLoading: loading,
    isError: loadError,
  } = useQuery({
    queryKey: ['issue-overview', org],
    queryFn: ({ signal }) => fetchIssueOverview(org, signal),
    staleTime: ISSUE_QUERY_STALE_TIME,
  });
  const data = overviewResp?.overview ?? null;

  const { data: pains, isFetching: painsLoading } = useQuery({
    queryKey: [
      'issue-top-pains',
      org,
      painPage,
      painPageSize,
      painFilters.repo,
      painFilters.prio,
    ],
    queryFn: ({ signal }) =>
      fetchIssueTopPains(
        {
          org,
          repo: painFilters.repo,
          prio: painFilters.prio,
          page: painPage,
          pageSize: painPageSize,
        },
        signal
      ),
    staleTime: ISSUE_QUERY_STALE_TIME,
    // 翻页/筛选时保留上一页数据，避免表格闪空
    keepPreviousData: true,
  });

  if (loading) {
    // 骨架屏：与真实页面分区一致（KPI 四卡 + 概览卡片 + 痛点表格），
    // 展示形式对齐社区入门总览的 Skeleton 加载态
    return (
      <>
        <Title level={4} className="oj-section-title">
          总览信息
        </Title>
        <div
          className="overview-bottom-row"
          style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bottom-metric">
              <Skeleton active title={false} paragraph={{ rows: 3 }} />
            </div>
          ))}
        </div>
        <div className="section-card">
          <Skeleton active title paragraph={{ rows: 8 }} />
        </div>
        <Title level={4} className="oj-section-title">
          重点待办痛点
        </Title>
        <div className="section-card">
          <Skeleton active title={false} paragraph={{ rows: 6 }} />
        </div>
      </>
    );
  }

  const m = data ? computeIssueOverview(data) : null;

  if (!data || !m || !m.hasData) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <Empty
          description={
            <span className="text-sm text-slate-500">
              {loadError
                ? 'Issue 总览数据加载失败，请稍后重试'
                : '当前组织下暂无 Issue 贡献报告数据'}
            </span>
          }
        />
      </section>
    );
  }

  const orgSeg =
    typeof router.query.org === 'string' ? `/${router.query.org}` : '';
  const reportHref = (community: string, period?: string) =>
    `/intelligent-analysis${orgSeg}/experience/issue-contribution?repo=${encodeURIComponent(
      community
    )}${period ? `&period=${encodeURIComponent(period)}` : ''}`;

  const painRepos = pains?.repoOptions ?? [];
  const painPris = pains?.prioOptions ?? [];

  const topColumns: TableProps<IssueOverviewTopPain>['columns'] = [
    {
      title: '序号',
      width: 64,
      align: 'center',
      render: (_v, _r, i) => (
        <span className="row-num">{(painPage - 1) * painPageSize + i + 1}</span>
      ),
    },
    {
      title: '仓库',
      dataIndex: 'repoShort',
      width: 132,
      filters: painRepos.map((s) => ({ text: s, value: s })),
      filterMultiple: false,
      filteredValue: painFilters.repo ? [painFilters.repo] : null,
      render: (v: string) => (
        <span className="font-semibold text-slate-700">{v}</span>
      ),
    },
    {
      title: '周期',
      dataIndex: 'periodLabel',
      width: 168,
    },
    {
      title: '优先级',
      dataIndex: 'prio',
      width: 88,
      filters: painPris.map((p) => ({ text: p, value: p })),
      filterMultiple: false,
      filteredValue: painFilters.prio ? [painFilters.prio] : null,
      render: (v: string) => {
        const s = priStyle(v);
        return (
          <Tag
            className="overview-ant-tag"
            style={{ color: s.color, background: s.bg, borderColor: s.bg }}
          >
            {v}
          </Tag>
        );
      },
    },
    { title: '阶段', dataIndex: 'stageName', width: 128 },
    {
      title: '痛点',
      dataIndex: 'title',
      width: 300,
      ellipsis: true,
      render: (v: string) => (
        <Tooltip title={v} placement="topLeft">
          <span>{v}</span>
        </Tooltip>
      ),
    },
    {
      title: '影响',
      dataIndex: 'impact',
      width: 280,
      ellipsis: true,
      render: (v: string) => (
        <Tooltip title={v} placement="topLeft">
          <span className="text-slate-500">{v}</span>
        </Tooltip>
      ),
    },
    {
      title: '建议动作',
      dataIndex: 'action',
      width: 320,
      ellipsis: true,
      render: (v: string) => (
        <Tooltip title={v} placement="topLeft">
          <span>{v}</span>
        </Tooltip>
      ),
    },
    {
      title: '报告',
      dataIndex: 'community',
      width: 92,
      fixed: 'right',
      align: 'center',
      render: (community: string, r) => (
        <Link
          href={reportHref(community, r.period)}
          className="overview-table-link"
        >
          查看报告
        </Link>
      ),
    },
  ];

  const stageColumns: TableProps<IssueStageAgg>['columns'] = [
    {
      title: '序号',
      width: 64,
      align: 'center',
      render: (_v, _r, i) => <span className="row-num">{i + 1}</span>,
    },
    {
      title: '阶段',
      dataIndex: 'name',
      width: 220,
      render: (_v, r) => (
        <span className="font-semibold text-slate-700">
          {r.icon} {r.name}
        </span>
      ),
    },
    {
      title: '综合体验评分',
      dataIndex: 'score',
      width: 132,
      align: 'right',
      sorter: (a, b) => a.score - b.score,
      render: (_v, r) => {
        const g = gradeStyle(r.grade);
        return (
          <span className="font-semibold" style={{ color: g.color }}>
            {r.score}
          </span>
        );
      },
    },
    {
      title: '痛点数',
      dataIndex: 'painCount',
      width: 110,
      align: 'right',
      sorter: (a, b) => a.painCount - b.painCount,
    },
    {
      title: '痛点级别分布',
      width: 300,
      render: (_v, r) => {
        const priorities = [
          { key: 'p0' as const, label: 'P0', color: '#f4840c' },
          { key: 'p1' as const, label: 'P1', color: '#4791ff' },
          { key: 'p2' as const, label: 'P2', color: '#2eb78a' },
          { key: 'p3' as const, label: 'P3', color: '#94a3b8' },
        ];
        return (
          <div className="overview-progress-cell">
            <div className="overview-progress-bar">
              {priorities.map((priority) => {
                const value = r.painPriorityCounts[priority.key];
                return value > 0 ? (
                  <span
                    key={priority.key}
                    className="overview-progress-segment"
                    style={{
                      width: `${(value / r.painCount) * 100}%`,
                      background: priority.color,
                    }}
                  />
                ) : null;
              })}
            </div>
            <div className="overview-progress-meta">
              {priorities.map((priority) => (
                <span
                  key={priority.key}
                  className="overview-progress-text"
                  style={{ color: priority.color }}
                >
                  {priority.label} {r.painPriorityCounts[priority.key]}
                </span>
              ))}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {/* ① Issue 贡献总览 · 四 KPI（含跨仓逐周趋势缩略图） */}
      <Title level={4} className="oj-section-title">
        总览信息
      </Title>
      <div
        className="overview-bottom-row"
        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
      >
        {m.kpis.map((k) => (
          <div key={k.label} className="bottom-metric">
            <div className="bm-label">{k.label}</div>
            <div className="bm-value">
              <span className="bm-value-main">{k.value}</span>
              {k.trend && k.trend.length > 1 ? (
                <button
                  type="button"
                  className="bm-trend-sparkline"
                  title="点击查看大图"
                  onClick={() =>
                    setTrendModal({
                      title: `${k.label} · 逐周趋势`,
                      subtitle: '跨仓聚合·各周（时间升序）',
                      unit: k.trendUnit,
                      values: k.trend as Array<number | null>,
                      labels: data.agg.periods.map(shortPeriod),
                    })
                  }
                >
                  <CloseRateSparkline
                    values={k.trend}
                    width={52}
                    height={26}
                    minValue={0}
                    maxValue={
                      k.trendMax ?? Math.max(1, ...k.trend.map((v) => v ?? 0))
                    }
                  />
                </button>
              ) : null}
            </div>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] leading-4 text-slate-400">
              <span className="truncate">{k.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ② 痛点概览 · 阶段体验 */}
      <div className="section-card">
        <div className="mb-3 text-[16px] font-extrabold leading-6 text-slate-900">
          痛点概览
        </div>
        <div
          className="ov-row"
          style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}
        >
          <div className="ov-item">
            <div className="ov-label">痛点总数</div>
            <div className="ov-value">{m.painSummary.total}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">P0 痛点</div>
            <div className="ov-value ov-value-pending">{m.painSummary.p0}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">P1 痛点</div>
            <div className="ov-value ov-value-pending">{m.painSummary.p1}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">P2 痛点</div>
            <div className="ov-value">{m.painSummary.p2}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">P3 痛点</div>
            <div className="ov-value">{m.painSummary.p3}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">覆盖仓库</div>
            <div className="ov-value ov-value-blue">
              {m.painSummary.repoCount}
            </div>
          </div>
        </div>

        <div className="mb-3 mt-6 text-[16px] font-extrabold leading-6 text-slate-900">
          阶段体验概览
        </div>
        <Table<IssueStageAgg>
          className="overview-ant-table"
          dataSource={m.stages}
          columns={stageColumns}
          rowKey="id"
          pagination={false}
          scroll={{ x: 940 }}
          locale={{ emptyText: '暂无阶段数据' }}
        />
      </div>

      {/* ③ 进展：独立区块，与重点待办痛点同级 */}
      <IssueRepoProgressSection
        org={org}
        repos={latestReposByPeriod(data.repos)}
        reportHref={reportHref}
        onOpenScoreTrend={(repo) =>
          setTrendModal({
            title: `${repo.repoShort} · 得分趋势`,
            subtitle: '该仓各周综合体验指数（时间升序）',
            values: repo.idxTrend,
            labels: repo.idxTrendPeriods.map(shortPeriod),
          })
        }
      />

      {/* ④ 重点待办痛点 */}
      <Title level={4} className="oj-section-title">
        重点待办痛点
      </Title>
      <div className="section-card">
        <Table<IssueOverviewTopPain>
          className="overview-ant-table"
          dataSource={pains?.items ?? []}
          columns={topColumns}
          rowKey="key"
          loading={painsLoading}
          pagination={{
            current: painPage,
            pageSize: painPageSize,
            total: pains?.total ?? 0,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          onChange={(pagination, filters) => {
            const repo = (filters.repoShort?.[0] as string) || undefined;
            const prio = (filters.prio?.[0] as string) || undefined;
            const filtersChanged =
              repo !== painFilters.repo || prio !== painFilters.prio;
            if (filtersChanged) setPainFilters({ repo, prio });
            // 筛选变化时回到第一页，否则跟随翻页器
            setPainPage(filtersChanged ? 1 : pagination.current ?? 1);
            setPainPageSize(pagination.pageSize ?? 10);
          }}
          scroll={{ x: 1588 }}
          locale={{ emptyText: '当前无匹配的待办痛点' }}
        />
      </div>

      {/* ④ 附录 · 口径与来源（展示形式参考社区 QA 部分） */}
      <Title level={4} className="oj-section-title">
        附录
      </Title>
      <div className="section-card oj-qa-section">
        <div
          className="oj-qa-question-row"
          onClick={() => setAppendixOpen((v) => !v)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setAppendixOpen((v) => !v);
          }}
        >
          <RightOutlined
            className={`oj-qa-expand-icon${appendixOpen ? ' is-expanded' : ''}`}
          />
          <span className="oj-qa-q-label">Q</span>
          <span className="oj-qa-question">Issue 体验指数如何计算与取数？</span>
        </div>
        {appendixOpen && (
          <div className="oj-qa-answer">
            <div className="oj-qa-a-label-row">
              <span className="oj-qa-a-label">A</span>
            </div>
            <div className="oj-qa-answer-body">
              <div className="flex flex-col gap-3 text-[13px] leading-relaxed text-slate-600">
                <p>
                  综合体验指数按 issue
                  全生命周期切分为以下阶段，每阶段结合客观信号与
                  主观评审打分后加权汇总；总览页综合得分只取各仓最新一周报告，
                  按「Issue 数」加权平均；痛点数与 Issue 总数 /
                  关闭率仍按全部报告周期统计。
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.stageOrder.map((s) => (
                    <span
                      key={s.id}
                      className="rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-[12.5px] font-medium text-slate-700"
                    >
                      {s.icon} {s.name}
                    </span>
                  ))}
                </div>
                <p>
                  等级口径：A ≥ 85 · B ≥ 75 · C ≥ 65 · D ≥ 50 · F &lt;
                  50。痛点总数为各仓全部报告周期的 top_pains
                  合计；重点待办取其中 P0/P1 痛点。痛点是从一组 Issue
                  的阶段指标中归纳出的改进项， 不等同于具体 Issue，也不使用
                  Issue 的打开/关闭状态。顶部 Issue 关闭率仍按 Issue
                  生命周期口径计算：已关闭 Issue ÷ Issue 总数。
                  数据来源为各仓周报（rawdata/&lt;repo&gt;/report_*.json），
                  原始 issue
                  正文与评论仅存于服务端，不进入浏览器。点击「查看最新报告」
                  可进入对应仓库的 Issue 贡献报告详情。
                </p>
              </div>
            </div>
          </div>
        )}
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
