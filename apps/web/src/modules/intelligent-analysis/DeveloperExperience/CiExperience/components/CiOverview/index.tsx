import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Table, Tag, Tooltip, Typography } from 'antd';
import type { TableProps } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import type { CiPri, CiRepoData, CiRepoKey } from '../../types';
import type { CiDelta } from '../../helpers';
import { EmptyState } from '../shared';
import Appendix from '../Appendix';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import {
  computeCommunityOverview,
  type CiLevel,
  type CiPriCard,
  type CiRepoSummary,
  type CiTopIssue,
  type CiTrendItem,
} from './communityMetrics';
import CiTrendModal from './CiTrendModal';

const { Title } = Typography;

type CiOverviewProps = {
  /** 跨仓数据源（runtime + ops-nn），社区 CI/CD 总览为两仓聚合视图 */
  data: Record<CiRepoKey, CiRepoData>;
};

/** 语义配色（对齐设计稿：红=风险 / 绿=改善 / 灰=持平） */
const TONE_BAD = '#d03b3b';
const TONE_GOOD = '#16835e';
const TONE_FLAT = '#64748b';

/** 问题闭环三段进度色（照搬社区 overview-progress 段色语义） */
const SEG_ACTIVE = '#e0962b';
const SEG_BACKFILL = '#4f98ff';
const SEG_FADED = '#33c998';

const LEVEL_META: Record<CiLevel, { text: string; color: string; bg: string }> =
  {
    crit: { text: '需重点关注', color: '#c2413b', bg: '#fff0ee' },
    warn: { text: '需关注', color: '#b7791f', bg: '#fef6e7' },
    good: { text: '总体平稳', color: '#16835e', bg: '#e8f7f1' },
  };

const PRI_TAG: Record<CiPri, { bg: string; color: string; border: string }> = {
  P0: { bg: '#fdecec', color: '#c2413b', border: '#f5c7c3' },
  P1: { bg: '#fef4e6', color: '#b7791f', border: '#f3ddb0' },
  P2: { bg: '#f1f5f9', color: '#64748b', border: '#d7dee8' },
};

const deltaColor = (d: CiDelta) =>
  d.cls === 'bad' ? TONE_BAD : d.cls === 'good' ? TONE_GOOD : TONE_FLAT;

/** 变化小标（箭头 + 幅度），无变化时不渲染 */
const DeltaTag: React.FC<{ delta?: CiDelta }> = ({ delta }) => {
  if (!delta || delta.cls === 'flat' || !delta.txt) {
    return null;
  }
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[11px] font-semibold"
      style={{ color: deltaColor(delta) }}
    >
      {delta.arrow} {delta.txt}
    </span>
  );
};

const PriTag: React.FC<{ pri: CiPri }> = ({ pri }) => {
  const c = PRI_TAG[pri];
  return (
    <Tag
      className="overview-ant-tag"
      style={{ background: c.bg, color: c.color, borderColor: c.border }}
    >
      {pri}
    </Tag>
  );
};

const STATUS_META: Record<string, { text: string; color: string; bg: string }> =
  {
    active: { text: '仍活跃', color: '#b7791f', bg: '#fef4e6' },
    backfill: { text: '待回填', color: '#3b6fd6', bg: '#eaf2ff' },
    faded: { text: '已消退', color: '#16835e', bg: '#e8f7f1' },
  };
const statusCat = (s: string): 'active' | 'backfill' | 'faded' | 'other' =>
  /^仍活跃/.test(s)
    ? 'active'
    : /待回填/.test(s)
    ? 'backfill'
    : /已消退/.test(s)
    ? 'faded'
    : 'other';

/**
 * 社区 CI/CD 总览（跨仓聚合视图）。
 * 五个模块：① 社区 CI/CD 总览（六 KPI）② 问题闭环进展 ③ 关键指标趋势
 * ④ 各仓库对比 ⑤ 重点待办问题。
 * 所有模块样式照搬社区「入门体验总览」类（oj-section-title / section-card /
 * overview-bottom-row / bm-* / capability-* / overview-progress-* /
 * overview-ant-table），仅数据取自 CI 看板。
 */
const CiOverview: React.FC<CiOverviewProps> = ({ data }) => {
  const router = useRouter();
  const m = computeCommunityOverview(data);
  const [trendModal, setTrendModal] = React.useState<CiTrendItem | null>(null);
  const [appendixOpen, setAppendixOpen] = React.useState(false);

  if (!m.hasData) {
    return (
      <>
        <Title level={4} className="oj-section-title">
          总览信息
        </Title>
        <div className="section-card">
          <EmptyState>CI 数据落库中，暂无总览内容。</EmptyState>
        </div>
      </>
    );
  }

  const topSlugs = m.topIssues
    .map((t) => t.slug)
    .filter((s, i, arr) => arr.indexOf(s) === i);
  const topPris = (['P0', 'P1', 'P2'] as CiPri[]).filter((p) =>
    m.topIssues.some((t) => t.pri === p)
  );
  const topStatCats = (['active', 'backfill', 'faded'] as const).filter((c) =>
    m.topIssues.some((t) => statusCat(t.status) === c)
  );
  // 跳转到对应仓库的 CI 报告页（slug 即路由 query 值：runtime / ops-nn）
  const orgSeg =
    typeof router.query.org === 'string' ? `/${router.query.org}` : '';
  const reportHref = (slug: string) =>
    `/intelligent-analysis${orgSeg}/experience/ci-experience?repo=${slug}`;

  const topColumns: TableProps<CiTopIssue>['columns'] = [
    {
      title: '序号',
      key: 'index',
      width: 64,
      render: (_v, _r, i) => <span className="row-num">{i + 1}</span>,
    },
    {
      title: '仓库',
      dataIndex: 'slug',
      key: 'slug',
      width: 96,
      filters: topSlugs.map((s) => ({ text: s, value: s })),
      onFilter: (value, r) => r.slug === value,
      render: (slug: string) => (
        <span className="font-medium text-slate-600">{slug}</span>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'pri',
      key: 'pri',
      width: 88,
      filters: topPris.map((p) => ({ text: p, value: p })),
      onFilter: (value, r) => r.pri === value,
      render: (pri: CiPri) => <PriTag pri={pri} />,
    },
    {
      title: '问题状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: topStatCats.map((c) => ({
        text: STATUS_META[c].text,
        value: c,
      })),
      onFilter: (value, r) => statusCat(r.status) === value,
      render: (status: string) => {
        const meta = STATUS_META[statusCat(status)] ?? {
          color: '#64748b',
          bg: '#f1f5f9',
        };
        return (
          <Tag
            className="overview-ant-tag"
            style={{
              background: meta.bg,
              color: meta.color,
              borderColor: meta.bg,
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: '维度',
      dataIndex: 'dim',
      key: 'dim',
      width: 96,
      responsive: ['md'],
      ellipsis: true,
    },
    {
      title: '问题机理',
      dataIndex: 'kb',
      key: 'kb',
      width: 260,
      ellipsis: true,
      render: (kb: string) => (
        <Tooltip title={kb}>
          <span>{kb}</span>
        </Tooltip>
      ),
    },
    {
      title: '涉及阶段',
      dataIndex: 'journeyStages',
      key: 'journeyStages',
      width: 180,
      responsive: ['lg'],
      ellipsis: true,
      filters: m.journeyStageOrder.map((s) => ({ text: s, value: s })),
      onFilter: (value, r) => r.journeyStages.includes(value as string),
      render: (segs: string[]) => {
        const text = segs.length ? segs.join(' · ') : '—';
        return (
          <Tooltip title={text}>
            <span>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '累计 run·PR',
      key: 'runs',
      width: 116,
      responsive: ['md'],
      render: (_v, r) => (
        <span className="tabular-nums text-slate-600">
          {r.runs}
          <span className="text-slate-300"> · </span>
          {r.prs}
        </span>
      ),
    },
    {
      title: '首现',
      dataIndex: 'first',
      key: 'first',
      width: 96,
      responsive: ['md'],
      render: (first: string) => (
        <span className="tabular-nums text-slate-500">{first}</span>
      ),
    },
    {
      title: '命中天',
      dataIndex: 'daysHit',
      key: 'daysHit',
      width: 80,
      responsive: ['lg'],
      render: (d: number) => <span className="tabular-nums">{d}</span>,
    },
    {
      title: '日走势',
      key: 'trend',
      width: 72,
      responsive: ['lg'],
      render: (_v, r) => (
        <CloseRateSparkline
          values={r.trend}
          stroke={PRI_TAG[r.pri].color}
          minValue={0}
          maxValue={Math.max(1, ...r.trend)}
        />
      ),
    },
    {
      title: '建议动作 → 去向',
      key: 'action',
      width: 420,
      responsive: ['lg'],
      render: (_v, r) => (
        <Tooltip title={`${r.action} → ${r.dest}`}>
          <span className="text-slate-500">
            {r.action}
            <span className="text-slate-300"> → </span>
            <span className="text-slate-600">{r.dest}</span>
          </span>
        </Tooltip>
      ),
    },
    {
      title: '报告',
      key: 'report',
      width: 92,
      fixed: 'right',
      render: (_v, r) => (
        <Link href={reportHref(r.slug)} className="overview-table-link">
          查看报告
        </Link>
      ),
    },
  ];

  return (
    <>
      {/* ① 报告概览五项得分 · 最新日期（综合 + 四维，两仓最新观测日池化值，含趋势缩略图） */}
      <Title level={4} className="oj-section-title">
        总览信息
      </Title>
      <div
        className="overview-bottom-row"
        style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
      >
        {m.kpis.map((k) => (
          <div key={k.label} className="bottom-metric">
            <div className="bm-label">{k.label}</div>
            <div className="bm-value">
              <span className="bm-value-main">{k.value}</span>
              {k.trend ? (
                <button
                  type="button"
                  className="bm-trend-sparkline"
                  title="点击查看大图"
                  onClick={() => setTrendModal(k.trend ?? null)}
                >
                  <CloseRateSparkline
                    values={k.trend.values}
                    width={52}
                    height={26}
                    minValue={0}
                    maxValue={Math.max(1, ...k.trend.values.map((v) => v ?? 0))}
                  />
                </button>
              ) : null}
            </div>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] leading-4 text-slate-400">
              <span className="truncate">{k.sub}</span>
              <DeltaTag delta={k.delta} />
            </div>
          </div>
        ))}
      </div>

      {/* ② 问题闭环进展 · 各仓库对比（合并为同一卡片） */}
      <div className="section-card">
        <div className="mb-3 text-[16px] font-extrabold leading-6 text-slate-900">
          问题闭环进展
        </div>
        <div className="ov-row">
          <div className="ov-item">
            <div className="ov-label">全部</div>
            <div className="ov-value">{m.closure.total}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">仍活跃</div>
            <div className="ov-value ov-value-pending">{m.closure.active}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">待回填</div>
            <div className="ov-value ov-value-blue">{m.closure.backfill}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">已消退</div>
            <div className="ov-value ov-value-green">{m.closure.faded}</div>
          </div>
          <div className="ov-item">
            <div className="ov-label">整体消退率</div>
            <div className="ov-value">{m.closure.rate}%</div>
          </div>
        </div>
        <div
          className="capability-overview-grid mt-4"
          style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
        >
          {m.closure.cards.map((c: CiPriCard) => {
            const total = c.total || 1;
            const segs = [
              { key: 'active', v: c.active, color: SEG_ACTIVE },
              { key: 'backfill', v: c.backfill, color: SEG_BACKFILL },
              { key: 'faded', v: c.faded, color: SEG_FADED },
            ];
            return (
              <div key={c.pri} className="capability-card">
                <div className="capability-card-title">
                  <span>
                    {c.pri} · {c.name}
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: c.rate >= 60 ? TONE_GOOD : TONE_FLAT }}
                  >
                    消退率 {c.rate}%
                  </span>
                </div>
                <div className="mb-3 text-[11.5px] leading-relaxed text-slate-400">
                  {c.desc}
                </div>
                <div className="overview-progress-bar">
                  {segs.map((s) =>
                    s.v > 0 ? (
                      <span
                        key={s.key}
                        className="overview-progress-segment"
                        style={{
                          width: `${(s.v / total) * 100}%`,
                          background: s.color,
                        }}
                      />
                    ) : null
                  )}
                </div>
                <div className="overview-progress-meta mt-2 !justify-start">
                  <span
                    className="overview-progress-text"
                    style={{ color: SEG_ACTIVE }}
                  >
                    仍活跃 {c.active}
                  </span>
                  <span
                    className="overview-progress-text"
                    style={{ color: SEG_BACKFILL }}
                  >
                    待回填 {c.backfill}
                  </span>
                  <span
                    className="overview-progress-text"
                    style={{ color: SEG_FADED }}
                  >
                    已消退 {c.faded}
                  </span>
                  <span className="overview-progress-text">共 {c.total}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 各仓库对比 */}
        <div className="mb-3 mt-6 text-[16px] font-extrabold leading-6 text-slate-900">
          各仓库对比
        </div>
        <div className="capability-overview-grid">
          {m.repos.map((r: CiRepoSummary) => {
            const lv = LEVEL_META[r.level];
            const stats = [
              { label: '综合', value: r.scoreOverall ?? '—' },
              { label: '稳定性', value: r.scoreStability ?? '—' },
              { label: '效率', value: r.scoreEfficiency ?? '—' },
              { label: '交互体验', value: r.scoreInteraction ?? '—' },
              { label: '成本', value: r.scoreCost ?? '—' },
              { label: '活跃 P0/P1', value: r.activeP01 },
            ];
            return (
              <div key={r.repo} className="capability-card">
                <div className="capability-card-title">
                  <span className="inline-flex items-baseline gap-2">
                    <span>{r.slug}</span>
                    <Link
                      href={reportHref(r.slug)}
                      className="text-[12px] font-semibold text-[#1677ff] underline underline-offset-[3px] transition-colors hover:text-[#0958d9]"
                    >
                      查看最新报告 →
                    </Link>
                  </span>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ background: lv.bg, color: lv.color }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: lv.color }}
                    />
                    {lv.text}
                  </span>
                </div>
                <div className="capability-stat-grid">
                  {stats.map((s) => (
                    <div key={s.label} className="capability-stat-card">
                      <span className="capability-stat-value">{s.value}</span>
                      <span className="capability-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11.5px] leading-relaxed text-slate-400">
                  {r.workflow} · 全窗 {r.totFail}/{r.totRun} run · 已消退{' '}
                  {r.faded}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ③ 重点待办问题 */}
      <Title level={4} className="oj-section-title">
        重点待办问题
      </Title>
      <div className="section-card">
        <Table<CiTopIssue>
          className="overview-ant-table"
          dataSource={m.topIssues}
          columns={topColumns}
          rowKey="key"
          pagination={false}
          scroll={{ x: 1780 }}
          locale={{ emptyText: '当前无匹配的待办问题' }}
        />
      </div>

      {/* 附录 · 口径与来源（展示形式参考社区 QA 部分） */}
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
          <span className="oj-qa-question">指标口径与数据来源如何定义？</span>
        </div>

        {appendixOpen && (
          <div className="oj-qa-answer">
            <div className="oj-qa-a-label-row">
              <span className="oj-qa-a-label">A</span>
            </div>
            <div className="oj-qa-answer-body">
              <Appendix />
            </div>
          </div>
        )}
      </div>

      <CiTrendModal
        open={!!trendModal}
        trend={trendModal}
        days={m.agg.days}
        onClose={() => setTrendModal(null)}
      />
    </>
  );
};

export default CiOverview;
