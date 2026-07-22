import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Empty, Spin, Table, Tag, Tooltip, Typography } from 'antd';
import type { TableProps } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import { fetchIssueOverview } from '../../data';
import type {
  IssueOverviewData,
  IssueOverviewRepo,
  IssueOverviewTopPain,
} from '../../types';
import { computeIssueOverview } from './issueMetrics';
import type { IssueStageAgg } from './issueMetrics';
import IssueTrendModal from './IssueTrendModal';
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
};

const gradeStyle = (grade: string) =>
  GRADE_META[grade.toUpperCase()] ?? GRADE_META.C;

const priStyle = (prio: string) => {
  const key = /P0/i.test(prio) ? 'P0' : /P1/i.test(prio) ? 'P1' : 'P2';
  return PRI_META[key];
};

const repoPainCount = (repo: IssueOverviewRepo) =>
  repo.stages.reduce((a, s) => a + s.painCount, 0);

/** 'YYYY-MM-DD_to_YYYY-MM-DD' → 起始日 'MM-DD'（趋势 X 轴短标签） */
const shortPeriod = (period: string): string => {
  const since = period.split('_to_')[0] ?? period;
  return since.length > 5 ? since.slice(5) : since;
};

/**
 * Issue 贡献总览（跨仓聚合）。
 * 结构与「社区 CI/CD 总览」一致：① 顶部 KPI ② 痛点概览·阶段体验·各仓库对比
 * ③ 重点待办痛点表格 ④ 附录 QA；样式全量复用社区总览看板全局类。
 */
const IssueOverview: React.FC<IssueOverviewProps> = ({ org }) => {
  const router = useRouter();
  const [data, setData] = React.useState<IssueOverviewData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState(false);
  const [appendixOpen, setAppendixOpen] = React.useState(false);
  const [trendModal, setTrendModal] =
    React.useState<IssueTrendModalData | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadError(false);
    void fetchIssueOverview(org, controller.signal)
      .then((res) => setData(res.overview))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setData(null);
        setLoadError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [org]);

  if (loading) {
    return (
      <section className="flex min-h-[420px] items-center justify-center rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <Spin tip="总览数据加载中..." />
      </section>
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

  const painRepos = data.topPains
    .map((p) => p.repoShort)
    .filter((s, i, arr) => arr.indexOf(s) === i);
  const painPris = ['P0', 'P1', 'P2'].filter((p) =>
    data.topPains.some((t) => priKey(t.prio) === p)
  );

  const topColumns: TableProps<IssueOverviewTopPain>['columns'] = [
    {
      title: '序号',
      width: 64,
      align: 'center',
      render: (_v, _r, i) => <span className="row-num">{i + 1}</span>,
    },
    {
      title: '仓库',
      dataIndex: 'repoShort',
      width: 132,
      filters: painRepos.map((s) => ({ text: s, value: s })),
      onFilter: (value, r) => r.repoShort === value,
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
      onFilter: (value, r) => priKey(r.prio) === value,
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

  const repoColumns: TableProps<IssueOverviewRepo>['columns'] = [
    {
      title: '序号',
      width: 64,
      align: 'center',
      render: (_v, _r, i) => <span className="row-num">{i + 1}</span>,
    },
    {
      title: '仓库',
      dataIndex: 'repoShort',
      width: 176,
      render: (v: string, r) => (
        <Tooltip
          placement="topLeft"
          title={`${r.periodLabel} · 响应 ${r.responseCount} 次 / ${r.responderCount} 人 · 置信度 ${r.confidence}`}
        >
          <span className="font-semibold text-slate-700">{v}</span>
        </Tooltip>
      ),
    },
    {
      title: '周期',
      dataIndex: 'periodLabel',
      width: 168,
    },
    {
      title: '综合指数',
      dataIndex: 'idxTotal',
      width: 128,
      sorter: (a, b) => a.idxTotal - b.idxTotal,
      render: (_v, r) => {
        const g = gradeStyle(r.grade);
        return (
          <span className="inline-flex items-center gap-1.5">
            <span className="font-semibold" style={{ color: g.color }}>
              {r.idxTotal.toFixed(1)}
            </span>
            <Tag
              className="overview-ant-tag"
              style={{ color: g.color, background: g.bg, borderColor: g.bg }}
            >
              {r.grade}
            </Tag>
          </span>
        );
      },
    },
    {
      title: '得分趋势',
      dataIndex: 'idxTrend',
      width: 96,
      align: 'center',
      render: (_v, r) =>
        r.idxTrend && r.idxTrend.length > 1 ? (
          <button
            type="button"
            className="bm-trend-sparkline"
            title="点击查看大图"
            onClick={() =>
              setTrendModal({
                title: `${r.repoShort} · 得分趋势`,
                subtitle: '该仓各周综合体验指数（时间升序）',
                values: r.idxTrend,
                labels: r.idxTrendPeriods.map(shortPeriod),
              })
            }
          >
            <CloseRateSparkline
              values={r.idxTrend}
              width={48}
              height={26}
              minValue={0}
              maxValue={100}
            />
          </button>
        ) : (
          <span className="text-slate-300">—</span>
        ),
    },
    {
      title: 'Issue 数',
      dataIndex: 'nTotal',
      width: 96,
      align: 'right',
      sorter: (a, b) => a.nTotal - b.nTotal,
    },
    {
      title: '关闭率',
      dataIndex: 'closeRate',
      width: 100,
      align: 'right',
      sorter: (a, b) => a.closeRate - b.closeRate,
      render: (_v, r) => `${r.closeRate.toFixed(0)}%`,
    },
    {
      title: '未关闭',
      dataIndex: 'nOpen',
      width: 96,
      align: 'right',
      sorter: (a, b) => a.nOpen - b.nOpen,
      render: (v: number) => <span className="text-slate-500">{v}</span>,
    },
    {
      title: '重点痛点',
      width: 100,
      align: 'right',
      sorter: (a, b) => repoPainCount(a) - repoPainCount(b),
      render: (_v, r) => repoPainCount(r),
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
      title: '综合分',
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
      title: '等级',
      dataIndex: 'grade',
      width: 96,
      align: 'center',
      render: (_v, r) => {
        const g = gradeStyle(r.grade);
        return (
          <Tag
            className="overview-ant-tag"
            style={{ color: g.color, background: g.bg, borderColor: g.bg }}
          >
            {r.grade}
          </Tag>
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
        Issue 贡献总览
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
              {k.grade ? (
                <>
                  <Tooltip
                    title="评分标准：A 85–100 分；B 75–84.9 分；C 65–74.9 分；D 50–64.9 分；F 低于 50 分"
                  >
                    <span
                      className="cursor-help border-b border-dashed border-slate-300"
                      tabIndex={0}
                    >
                      等级 {k.grade}
                    </span>
                  </Tooltip>
                  <span aria-hidden="true">·</span>
                </>
              ) : null}
              <span className="truncate">{k.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ② 痛点概览 · 阶段体验 · 各仓库对比（合并为同一卡片） */}
      <div className="section-card">
        <div className="mb-3 text-[16px] font-extrabold leading-6 text-slate-900">
          痛点概览
        </div>
        <div
          className="ov-row"
          style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
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

        <div className="mb-3 mt-6 text-[16px] font-extrabold leading-6 text-slate-900">
          各仓库对比
        </div>
        <Table<IssueOverviewRepo>
          className="overview-ant-table"
          dataSource={data.repos}
          columns={repoColumns}
          rowKey={(record) => `${record.community}-${record.period}`}
          pagination={false}
          scroll={{ x: 1228 }}
          locale={{ emptyText: '暂无仓库数据' }}
        />
      </div>

      {/* ③ 重点待办痛点 */}
      <Title level={4} className="oj-section-title">
        重点待办痛点
      </Title>
      <div className="section-card">
        <Table<IssueOverviewTopPain>
          className="overview-ant-table"
          dataSource={data.topPains}
          columns={topColumns}
          rowKey="key"
          pagination={false}
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
                  主观评审打分后加权汇总；总览页综合所有仓库、所有报告周期，
                  按各期「Issue 数」加权平均。
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
                  50。痛点总数为各仓全部报告周期的 top_pains 合计；重点待办取其中
                  P0/P1 痛点。痛点是从一组 Issue 的阶段指标中归纳出的改进项，
                  不等同于具体 Issue，也不使用 Issue 的打开/关闭状态。顶部 Issue
                  关闭率仍按 Issue 生命周期口径计算：已关闭 Issue ÷ Issue 总数。
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

/** 优先级归一到 P0 / P1 / P2 三档（用于筛选比较） */
function priKey(prio: string): string {
  return /P0/i.test(prio) ? 'P0' : /P1/i.test(prio) ? 'P1' : 'P2';
}

export default IssueOverview;
