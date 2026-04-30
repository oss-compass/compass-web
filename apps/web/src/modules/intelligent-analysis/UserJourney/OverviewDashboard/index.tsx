import React, { useMemo, useState } from 'react';
import { Button, Card, Input, Modal, Select, Tooltip, message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addSigProject,
  createSigConfig,
  deleteSigConfig,
  fetchOverviewCards,
  fetchOverviewSummary,
  fetchSigConfigs,
  removeSigProject,
  updateOverviewPainDetail,
  type OverviewCardItem,
  type OverviewImprovementStatus,
  type OverviewPainPointRow,
  type OverviewSigConfig,
} from '../rawData/apiClient';

// ─────────────────────────────────────────
// Icons
// ─────────────────────────────────────────

const ChevronIcon: React.FC<{ expanded: boolean; className?: string }> = ({
  expanded,
  className = '',
}) => (
  <svg
    className={`transition-transform duration-200 ${
      expanded ? 'rotate-180' : ''
    } ${className}`}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M10.5 10.5L13 13"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const SettingsIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 2.5V5M10 15v2.5M2.5 10H5M15 10h2.5M4.4 4.4l1.77 1.77M13.83 13.83l1.77 1.77M4.4 15.6l1.77-1.77M13.83 6.17l1.77-1.77"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const ExternalLinkIcon: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path
      d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M10 2h4v4M14 2L8 8"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─────────────────────────────────────────
// Severity Badge
// ─────────────────────────────────────────

type Severity = OverviewPainPointRow['severity'];

const SEVERITY_CFG: Record<
  Severity,
  { label: string; bg: string; text: string; border: string }
> = {
  P0_BLOCKER: {
    label: 'P0 阻断',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  P1_CRITICAL: {
    label: 'P1 严重',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
  },
  P2_MAJOR: {
    label: 'P2 主要',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  P3_MINOR: {
    label: 'P3 次要',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  P4_TRIVIAL: {
    label: 'P4 轻微',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
  },
};

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const cfg = SEVERITY_CFG[severity];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  );
};

// ─────────────────────────────────────────
// ImprovementStatus Badge
// ─────────────────────────────────────────

const STATUS_CFG: Record<
  OverviewImprovementStatus,
  { label: string; dot: string; badge: string }
> = {
  pending: {
    label: '待处理',
    dot: 'bg-amber-400',
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  in_progress: {
    label: '处理中',
    dot: 'bg-blue-500',
    badge: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  resolved: {
    label: '已处理',
    dot: 'bg-emerald-500',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  closed: {
    label: '已闭环',
    dot: 'bg-slate-400',
    badge: 'border-slate-200 bg-slate-100 text-slate-600',
  },
};

const ImprovementStatusBadge: React.FC<{
  status: OverviewImprovementStatus;
}> = ({ status }) => {
  const cfg = STATUS_CFG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

// ─────────────────────────────────────────
// Mini Sparkline
// ─────────────────────────────────────────

const MiniSparkline: React.FC<{
  scores: { score: number; label: string }[];
  width?: number;
  height?: number;
}> = ({ scores, width = 88, height = 34 }) => {
  if (scores.length === 0)
    return <span className="text-xs text-slate-400">—</span>;

  if (scores.length === 1) {
    return (
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold leading-none text-slate-900">
          {scores[0].score}
        </span>
        <span className="text-xs text-slate-400">分</span>
      </div>
    );
  }

  const pad = 4;
  const minVal = Math.min(...scores.map((s) => s.score));
  const maxVal = Math.max(...scores.map((s) => s.score));
  const range = maxVal - minVal || 1;

  const pts = scores.map((s, i) => ({
    x: pad + (i / (scores.length - 1)) * (width - pad * 2),
    y: pad + ((maxVal - s.score) / range) * (height - pad * 2),
    score: s.score,
    label: s.label,
  }));

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = [
    `M ${pts[0].x} ${height}`,
    ...pts.map((p) => `L ${p.x} ${p.y}`),
    `L ${pts[pts.length - 1].x} ${height}`,
    'Z',
  ].join(' ');

  const last = pts[pts.length - 1];
  const first = pts[0];
  const trend = last.score - first.score;
  const lineColor = trend > 0 ? '#10b981' : trend < 0 ? '#f43f5e' : '#94a3b8';

  return (
    <Tooltip
      title={
        <div className="space-y-1 py-0.5">
          {pts.map((p, i) => (
            <div key={i} className="flex justify-between gap-6 text-xs">
              <span className="text-slate-400">{scores[i].label}</span>
              <span className="font-semibold">{p.score} 分</span>
            </div>
          ))}
        </div>
      }
    >
      <div className="flex cursor-default items-center gap-2">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          <path d={areaPath} fill={lineColor} opacity={0.1} />
          <polyline
            points={polyline}
            fill="none"
            stroke={lineColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === pts.length - 1 ? 3.5 : 2}
              fill={i === pts.length - 1 ? lineColor : 'white'}
              stroke={lineColor}
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <div className="flex items-baseline gap-0.5">
          <span
            className="text-xl font-bold leading-none"
            style={{ color: lineColor }}
          >
            {last.score}
          </span>
          <span className="text-xs text-slate-400">分</span>
        </div>
      </div>
    </Tooltip>
  );
};

// ─────────────────────────────────────────
// Pain Points Table
// ─────────────────────────────────────────

const PainPointsTable: React.FC<{
  rows: OverviewPainPointRow[];
  onEdit: (row: OverviewPainPointRow) => void;
}> = ({ rows, onEdit }) => {
  if (rows.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-slate-400">
        暂无痛点记录
      </div>
    );
  }

  const HEADERS = [
    '旅程阶段',
    '首次发现\n报告编号',
    '报告\n总评分',
    'Agent 评分\n（发现时）',
    '问题类型',
    '芯片型号',
    '问题严重度',
    '问题描述及根因分析',
    '责任人',
    '是否是问题',
    '备注',
    '改进状态',
    'Issue / PR 链接',
    '复测\n报告编号',
    '报告\n总评分',
    'Agent 评分\n（复测后）',
    '操作',
  ];

  const boolLabel = (v: boolean | null) => {
    if (v === null) return <span className="text-slate-400">待确认</span>;
    return v ? (
      <span className="font-semibold text-emerald-600">是</span>
    ) : (
      <span className="text-slate-500">否</span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-100 bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]">
            {HEADERS.map((h) => (
              <th
                key={h}
                className="whitespace-pre-line px-3 py-2.5 text-left text-[11px] font-semibold leading-tight text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.id}
              className={`border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/60 ${
                idx % 2 === 1 ? 'bg-slate-50/30' : ''
              }`}
            >
              <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-700">
                {row.journeyStage}
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-mono text-slate-500">
                {row.firstFoundReportId || '—'}
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-bold text-slate-700">
                {row.reportTotalScore}
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-bold text-slate-700">
                {row.agentScoreAtFound}
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                {row.issueType}
              </td>
              <td className="px-3 py-3">
                <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                  {row.chipModel}
                </code>
              </td>
              <td className="px-3 py-3">
                <SeverityBadge severity={row.severity} />
              </td>
              <td className="max-w-[260px] px-3 py-3 text-slate-600">
                <Tooltip
                  title={row.description}
                  styles={{ root: { maxWidth: 480 } }}
                >
                  <span className="line-clamp-2 cursor-default">
                    {row.description}
                  </span>
                </Tooltip>
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                {row.owner || '—'}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {boolLabel(row.isRealIssue)}
              </td>
              <td className="max-w-[100px] px-3 py-3 text-slate-500">
                <span className="line-clamp-2">{row.remark || '—'}</span>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <ImprovementStatusBadge status={row.improvementStatus} />
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {row.issueOrPrLink ? (
                  <a
                    href={row.issueOrPrLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1677ff] hover:underline"
                  >
                    查看
                    <ExternalLinkIcon className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-mono text-slate-500">
                {row.retestReportId || '—'}
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-bold text-slate-700">
                {row.retestReportScore != null ? row.retestReportScore : '—'}
              </td>
              <td className="whitespace-nowrap px-3 py-3 font-bold text-slate-700">
                {row.agentScoreAfterRetest != null
                  ? row.agentScoreAfterRetest
                  : '—'}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <Button type="link" size="small" onClick={() => onEdit(row)}>
                  编辑
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─────────────────────────────────────────
// Repo Card
// ─────────────────────────────────────────

const OverviewDataCard: React.FC<{
  data: OverviewCardItem;
  index: number;
  type: 'repo' | 'sig';
  onEditPain: (row: OverviewPainPointRow) => void;
}> = ({ data, index, type, onEditPain }) => {
  const [expanded, setExpanded] = useState(false);

  const scorePoints = data.scoreHistory.map((s) => ({
    score: s.score,
    label: `${s.reportId} · ${s.date}`,
  }));

  const closureRate =
    data.totalPainPoints > 0
      ? Math.round((data.closedPainPoints / data.totalPainPoints) * 100)
      : 0;

  const rateColor =
    closureRate >= 70
      ? 'text-emerald-600'
      : closureRate >= 40
      ? 'text-amber-600'
      : 'text-rose-600';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      {/* 卡片头 */}
      <div className="flex items-center gap-0 border-b border-slate-100">
        {/* 左侧序号 */}
        <div className="flex w-14 shrink-0 flex-col items-center justify-center self-stretch border-r border-slate-100 bg-slate-50 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
            {index}
          </span>
        </div>

        {/* 中间：标题 + 描述 */}
        <div className="min-w-0 flex-1 px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-slate-900">
              {data.name}
            </span>
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              {type === 'repo' ? data.sig : `${data.repoCount} 个仓库`}
            </span>
          </div>

          {/* 指标行 */}
          <div className="mt-3 flex flex-wrap items-end gap-6">
            {/* 评分趋势 */}
            <div>
              <div className="mb-1.5 text-[11px] font-medium text-slate-400">
                评分趋势
              </div>
              <MiniSparkline scores={scorePoints} />
            </div>

            <div className="mb-0.5 h-10 w-px bg-slate-100" />

            {/* 痛点总数 */}
            <div>
              <div className="text-[11px] font-medium text-slate-400">
                痛点总数
              </div>
              <div className="mt-1 text-2xl font-bold leading-none text-slate-800">
                {data.totalPainPoints}
              </div>
            </div>

            {/* 待处理 */}
            <div>
              <div className="text-[11px] font-medium text-slate-400">
                待处理
              </div>
              <div className="mt-1 text-2xl font-bold leading-none text-amber-500">
                {data.pendingPainPoints}
              </div>
            </div>

            {/* 已闭环 */}
            <div>
              <div className="text-[11px] font-medium text-slate-400">
                已闭环
              </div>
              <div className="mt-1 text-2xl font-bold leading-none text-emerald-500">
                {data.closedPainPoints}
              </div>
            </div>

            {/* 闭环率 */}
            <div>
              <div className="text-[11px] font-medium text-slate-400">
                闭环率
              </div>
              <div
                className={`mt-1 text-2xl font-bold leading-none ${rateColor}`}
              >
                {closureRate}%
              </div>
            </div>
          </div>
        </div>

        {/* 折叠按钮 */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mr-4 inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
        >
          <ChevronIcon expanded={expanded} className="h-3 w-3" />
          {expanded ? '收起痛点' : '查看痛点'}
        </button>
      </div>

      {/* 痛点表格 */}
      {expanded && (
        <div className="bg-white">
          <div className="flex items-center justify-between bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] px-6 py-3">
            <span className="text-sm font-semibold text-slate-700">
              痛点明细
            </span>
            <span className="text-xs text-slate-400">
              共 {data.painPoints.length} 条记录
            </span>
          </div>
          <PainPointsTable rows={data.painPoints} onEdit={onEditPain} />
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// Overview Stats Section  ── 汇总在一张卡片里
// ─────────────────────────────────────────

const OverviewStatsCard: React.FC<{
  repoCount: number;
  sigCount: number;
  reportCount: number;
  totalPainPoints: number;
  pendingPainPoints: number;
  closedPainPoints: number;
  closureRate: number;
}> = ({
  repoCount,
  sigCount,
  reportCount,
  totalPainPoints,
  pendingPainPoints,
  closedPainPoints,
  closureRate,
}) => {
  const inProgress = totalPainPoints - pendingPainPoints - closedPainPoints;

  // Donut chart
  const cx = 44;
  const cy = 44;
  const r = 32;
  const strokeW = 8;
  const circ = 2 * Math.PI * r;

  type Seg = { label: string; value: number; color: string };
  const segments: Seg[] = [
    { label: '待处理', value: pendingPainPoints, color: '#f59e0b' },
    { label: '处理中', value: inProgress, color: '#3b82f6' },
    { label: '已闭环', value: closedPainPoints, color: '#10b981' },
  ].filter((s) => s.value > 0);

  let offset = 0;
  const arcs = segments.map((seg) => {
    const dash = (seg.value / (totalPainPoints || 1)) * circ;
    const arc = { ...seg, dash, gap: circ - dash, offset };
    offset += dash;
    return arc;
  });

  const rateColor =
    closureRate >= 70 ? '#10b981' : closureRate >= 40 ? '#f59e0b' : '#f43f5e';

  const topStats = [
    {
      label: '仓库数',
      value: repoCount,
      color: '#6366f1',
      bg: 'bg-[linear-gradient(180deg,#eef2ff_0%,#e0e7ff_100%)]',
      border: 'border-indigo-100',
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="none"
          style={{ color: '#6366f1' }}
        >
          <rect
            x="3"
            y="5"
            width="14"
            height="11"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M3 8.5h14"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M7 5V4a1 1 0 011-1h4a1 1 0 011 1v1"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      ),
    },
    {
      label: 'SIG 数',
      value: sigCount,
      color: '#8b5cf6',
      bg: 'bg-[linear-gradient(180deg,#f5f3ff_0%,#ede9fe_100%)]',
      border: 'border-violet-100',
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="none"
          style={{ color: '#8b5cf6' }}
        >
          <circle
            cx="10"
            cy="10"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="10"
            cy="10"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M10 3.5V7M10 13v3.5M3.5 10H7M13 10h3.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: '报告数',
      value: reportCount,
      color: '#0ea5e9',
      bg: 'bg-[linear-gradient(180deg,#f0f9ff_0%,#e0f2fe_100%)]',
      border: 'border-sky-100',
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="none"
          style={{ color: '#0ea5e9' }}
        >
          <rect
            x="4"
            y="3"
            width="12"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 7h6M7 10h6M7 13h4"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: '痛点总数',
      value: totalPainPoints,
      color: '#f43f5e',
      bg: 'bg-[linear-gradient(180deg,#fff1f2_0%,#ffe4e6_100%)]',
      border: 'border-rose-100',
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="none"
          style={{ color: '#f43f5e' }}
        >
          <path
            d="M10 3L3 15.5h14L10 3z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M10 9.5v3M10 13.8v.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <Card
      bordered={false}
      className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      bodyStyle={{ padding: 24 }}
    >
      <div className=">lg:flex-row >lg:items-stretch flex flex-col gap-5">
        {/* ── 左侧：指标概览（50%）── */}
        <div className=">lg:w-1/2 flex w-full flex-col">
          <div className="mb-2 text-base font-semibold text-slate-800">
            总体概览
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {topStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5 text-sm font-medium text-slate-500">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${stat.border} ${stat.bg}`}
                    >
                      {stat.icon}
                    </div>
                    <span className="truncate">{stat.label}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <div className="text-2xl font-semibold leading-none text-slate-900">
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 右侧：痛点处理状态（50%）── */}
        <div className=">lg:w-1/2 flex w-full flex-col">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-base font-semibold text-slate-800">
              痛点概览
            </div>
            <div className="whitespace-nowrap text-xs font-medium text-slate-400">
              {closedPainPoints} / {totalPainPoints} 已闭环
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
            <div className="grid h-full grid-cols-2 divide-x divide-slate-100 py-6">
              {/* Donut chart and Legend */}
              <div className="flex items-center justify-center gap-10 px-6">
                <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center">
                  <svg
                    width={100}
                    height={100}
                    viewBox="0 0 100 100"
                    className="-rotate-90"
                  >
                    <circle
                      cx={50}
                      cy={50}
                      r={38}
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth={8}
                    />
                    {arcs.map((arc, i) => (
                      <circle
                        key={i}
                        cx={50}
                        cy={50}
                        r={38}
                        fill="none"
                        stroke={arc.color}
                        strokeWidth={8}
                        strokeDasharray={`${
                          (arc.dash / circ) * (2 * Math.PI * 38)
                        } ${((circ - arc.dash) / circ) * (2 * Math.PI * 38)}`}
                        strokeDashoffset={
                          -((arc.offset / circ) * (2 * Math.PI * 38))
                        }
                        strokeLinecap="round"
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-xl font-bold leading-none"
                      style={{ color: rateColor }}
                    >
                      {closureRate}%
                    </span>
                  </div>
                </div>

                <div className="flex w-full max-w-[160px] flex-col gap-3.5">
                  {[
                    {
                      label: '总计',
                      value: totalPainPoints,
                      dot: '#94a3b8',
                      text: '#475569',
                    },
                    {
                      label: '待处理',
                      value: pendingPainPoints,
                      dot: '#f59e0b',
                      text: '#b45309',
                    },
                    {
                      label: '处理中',
                      value: inProgress,
                      dot: '#3b82f6',
                      text: '#1d4ed8',
                    },
                    {
                      label: '已闭环',
                      value: closedPainPoints,
                      dot: '#10b981',
                      text: '#047857',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.dot }}
                        />
                        <span className="text-[13px] font-medium text-slate-500">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className="text-[14px] font-bold leading-none"
                        style={{ color: item.text }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 闭环率 */}
              <div className="flex flex-col items-center justify-center gap-2 px-6">
                <div className="text-xs font-semibold text-slate-500">
                  整体痛点闭环率
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span
                    className="text-[42px] font-black leading-none tracking-tight"
                    style={{ color: rateColor }}
                  >
                    {closureRate}
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: rateColor }}
                  >
                    %
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-slate-100 shadow-inner">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${closureRate}%`,
                      background:
                        closureRate >= 70
                          ? 'linear-gradient(90deg,#34d399,#10b981)'
                          : closureRate >= 40
                          ? 'linear-gradient(90deg,#fbbf24,#f59e0b)'
                          : 'linear-gradient(90deg,#fb7185,#f43f5e)',
                    }}
                  />
                </div>
                {pendingPainPoints > 0 && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="text-[11px] font-semibold text-amber-700">
                      {pendingPainPoints} 个待处理
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ─────────────────────────────────────────
// SIG Config Modal
// ─────────────────────────────────────────

const SigConfigModal: React.FC<{
  open: boolean;
  onClose: () => void;
  configs: OverviewSigConfig[];
  loading: boolean;
  onCreateSig: (sig: string) => Promise<void>;
  onDeleteSig: (sig: string) => Promise<void>;
  onAddProject: (sig: string, project: string) => Promise<void>;
  onRemoveProject: (sig: string, project: string) => Promise<void>;
}> = ({
  open,
  onClose,
  configs,
  loading,
  onCreateSig,
  onDeleteSig,
  onAddProject,
  onRemoveProject,
}) => {
  const [newSig, setNewSig] = useState('');
  const [newProjectBySig, setNewProjectBySig] = useState<
    Record<string, string>
  >({});

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      title={
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-800">SIG 配置</span>
        </div>
      }
      width={640}
      okText="完成"
      cancelText="取消"
    >
      <div className="space-y-3 py-2">
        <p className="text-xs text-slate-500">支持 SIG 与项目的增删查。</p>
        <div className="flex gap-2">
          <Input
            placeholder="新增 SIG 名称"
            value={newSig}
            onChange={(e) => setNewSig(e.target.value)}
          />
          <Button
            type="primary"
            onClick={async () => {
              const v = newSig.trim();
              if (!v) return;
              await onCreateSig(v);
              setNewSig('');
            }}
          >
            新增 SIG
          </Button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-sm text-slate-400">
            加载中...
          </div>
        ) : (
          <div className="space-y-3">
            {configs.map((cfg) => (
              <div
                key={cfg.sig}
                className="rounded-2xl border border-slate-200/80 bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-800">
                    {cfg.sig}
                  </div>
                  <Button
                    size="small"
                    danger
                    type="link"
                    onClick={() => void onDeleteSig(cfg.sig)}
                  >
                    删除 SIG
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cfg.projects.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1 rounded-md bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600 shadow-sm ring-1 ring-slate-200"
                    >
                      {r}
                      <button
                        type="button"
                        className="text-rose-500"
                        onClick={() => void onRemoveProject(cfg.sig, r)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input
                    placeholder="新增项目"
                    value={newProjectBySig[cfg.sig] ?? ''}
                    onChange={(e) =>
                      setNewProjectBySig((prev) => ({
                        ...prev,
                        [cfg.sig]: e.target.value,
                      }))
                    }
                  />
                  <Button
                    onClick={async () => {
                      const p = (newProjectBySig[cfg.sig] ?? '').trim();
                      if (!p) return;
                      await onAddProject(cfg.sig, p);
                      setNewProjectBySig((prev) => ({
                        ...prev,
                        [cfg.sig]: '',
                      }));
                    }}
                  >
                    新增项目
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

const PainEditModal: React.FC<{
  open: boolean;
  row: OverviewPainPointRow | null;
  onClose: () => void;
  onSubmit: (
    row: OverviewPainPointRow,
    patch: Record<string, unknown>
  ) => Promise<void>;
}> = ({ open, row, onClose, onSubmit }) => {
  const [formState, setFormState] = useState<Record<string, unknown>>({});

  React.useEffect(() => {
    if (!row) {
      setFormState({});
      return;
    }
    setFormState({
      issue_type: row.issueType,
      severity: row.severity,
      description: row.description,
      owner: row.owner,
      is_real_issue: row.isRealIssue,
      remark: row.remark,
      improvement_status: row.improvementStatus,
      issue_or_pr_link: row.issueOrPrLink,
      retest_report_id: row.retestReportId,
      retest_report_score: row.retestReportScore,
      agent_score_after_retest: row.agentScoreAfterRetest,
    });
  }, [row]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={async () => {
        if (!row) return;
        await onSubmit(row, formState);
        onClose();
      }}
      title="编辑痛点"
      width={720}
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          value={(formState.issue_type as string) ?? ''}
          onChange={(e) =>
            setFormState((s) => ({ ...s, issue_type: e.target.value }))
          }
          placeholder="问题类型"
        />
        <Select
          value={(formState.severity as string) ?? undefined}
          onChange={(v) => setFormState((s) => ({ ...s, severity: v }))}
          options={Object.keys(SEVERITY_CFG).map((v) => ({
            value: v,
            label: v,
          }))}
          placeholder="问题严重度"
        />
        <Input
          value={(formState.owner as string) ?? ''}
          onChange={(e) =>
            setFormState((s) => ({ ...s, owner: e.target.value }))
          }
          placeholder="责任人"
        />
        <Select
          value={formState.is_real_issue as boolean | null}
          onChange={(v) => setFormState((s) => ({ ...s, is_real_issue: v }))}
          options={[
            { value: true, label: '是问题' },
            { value: false, label: '不是问题' },
            { value: null, label: '待确认' },
          ]}
          placeholder="是否是问题"
        />
        <Input
          value={(formState.improvement_status as string) ?? 'pending'}
          onChange={(e) =>
            setFormState((s) => ({ ...s, improvement_status: e.target.value }))
          }
          placeholder="改进状态"
        />
        <Input
          value={(formState.issue_or_pr_link as string) ?? ''}
          onChange={(e) =>
            setFormState((s) => ({ ...s, issue_or_pr_link: e.target.value }))
          }
          placeholder="Issue / PR 链接"
        />
      </div>
      <Input.TextArea
        className="mt-3"
        rows={4}
        value={(formState.description as string) ?? ''}
        onChange={(e) =>
          setFormState((s) => ({ ...s, description: e.target.value }))
        }
        placeholder="问题描述及根因分析"
      />
      <Input.TextArea
        className="mt-3"
        rows={3}
        value={(formState.remark as string) ?? ''}
        onChange={(e) =>
          setFormState((s) => ({ ...s, remark: e.target.value }))
        }
        placeholder="备注"
      />
    </Modal>
  );
};

// ─────────────────────────────────────────
// Main Dashboard
// ─────────────────────────────────────────

type OverviewDashboardProps = {
  org?: string;
};

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ org }) => {
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<'repo' | 'sig'>('repo');
  const [sigFilter, setSigFilter] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [sigModalOpen, setSigModalOpen] = useState(false);
  const [editingPain, setEditingPain] = useState<OverviewPainPointRow | null>(
    null
  );

  const { data: stats } = useQuery({
    queryKey: ['overview-summary', org, sigFilter, searchText],
    queryFn: () =>
      fetchOverviewSummary({
        org,
        sig: sigFilter || undefined,
        keyword: searchText || undefined,
      }),
  });

  const { data: cardsResp, isLoading: cardsLoading } = useQuery({
    queryKey: ['overview-cards', org, activeTab, sigFilter, searchText],
    queryFn: () =>
      fetchOverviewCards({
        viewType: activeTab,
        org,
        sig: sigFilter || undefined,
        keyword: searchText || undefined,
      }),
  });

  const { data: sigConfigResp, isLoading: sigLoading } = useQuery({
    queryKey: ['overview-sig-configs'],
    queryFn: fetchSigConfigs,
  });

  const sigOptions = useMemo(
    () =>
      (sigConfigResp?.items ?? []).map((s) => ({ value: s.sig, label: s.sig })),
    [sigConfigResp]
  );

  const cards = cardsResp?.items ?? [];

  const refreshOverview = async () => {
    await qc.invalidateQueries({ queryKey: ['overview-summary'] });
    await qc.invalidateQueries({ queryKey: ['overview-cards'] });
    await qc.invalidateQueries({ queryKey: ['overview-sig-configs'] });
  };

  const sigMutation = useMutation({
    mutationFn: async (args: { op: string; sig: string; project?: string }) => {
      if (args.op === 'create-sig') return createSigConfig(args.sig);
      if (args.op === 'delete-sig') return deleteSigConfig(args.sig);
      if (args.op === 'add-project' && args.project)
        return addSigProject(args.sig, args.project);
      if (args.op === 'remove-project' && args.project)
        return removeSigProject(args.sig, args.project);
      throw new Error('invalid op');
    },
    onSuccess: async () => {
      message.success('SIG 配置已更新');
      await refreshOverview();
    },
    onError: (e: Error) => message.error(e.message),
  });

  const painMutation = useMutation({
    mutationFn: (payload: Parameters<typeof updateOverviewPainDetail>[0]) =>
      updateOverviewPainDetail(payload),
    onSuccess: async () => {
      message.success('痛点已更新');
      await refreshOverview();
    },
    onError: (e: Error) => message.error(e.message),
  });

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_24%),linear-gradient(180deg,#f6f8fc_0%,#eef3fb_100%)]">
      {/* ── Header ── */}
      <nav className="flex h-12 items-center justify-between border-b border-slate-200/60 bg-white/80 px-5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="h-5 w-0.5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500" />
          <h1 className="text-[15px] font-bold text-slate-900">
            CANN 社区入门体验
          </h1>
          <span className="text-sm font-semibold text-indigo-500">
            总览看板
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSigModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_2px_6px_rgba(15,23,42,0.06)] transition-all hover:border-indigo-200 hover:text-indigo-600 hover:shadow-[0_4px_10px_rgba(99,102,241,0.12)]"
        >
          <SettingsIcon className="h-3.5 w-3.5" />
          SIG 配置
        </button>
      </nav>

      <div className="flex min-h-[calc(100vh-48px)] flex-col gap-5 p-5">
        {/* ── 总体概览 ── */}
        <OverviewStatsCard
          repoCount={stats?.repoCount ?? 0}
          sigCount={stats?.sigCount ?? 0}
          reportCount={stats?.reportCount ?? 0}
          totalPainPoints={stats?.totalPainPoints ?? 0}
          pendingPainPoints={stats?.pendingPainPoints ?? 0}
          closedPainPoints={stats?.closedPainPoints ?? 0}
          closureRate={stats?.closureRate ?? 0}
        />

        {/* ── 列表概览 ── */}
        <Card
          bordered={false}
          className="rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
          bodyStyle={{ padding: 24 }}
        >
          {/* 区块标题 + 筛选 */}
          <div className="mb-5 flex flex-wrap items-center gap-6 border-b border-slate-100 pb-2">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('repo')}
                className={`flex items-center gap-2 border-b-2 pb-2 text-base font-semibold transition-colors ${
                  activeTab === 'repo'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                仓库概览
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">
                  {activeTab === 'repo' ? cards.length : 0}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sig')}
                className={`flex items-center gap-2 border-b-2 pb-2 text-base font-semibold transition-colors ${
                  activeTab === 'sig'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                SIG 概览
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">
                  {activeTab === 'sig' ? cards.length : 0}
                </span>
              </button>
            </div>

            <div className="ml-auto flex flex-wrap items-center gap-3">
              {/* SIG 筛选 */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-slate-400">SIG</span>
                <Select
                  value={sigFilter || undefined}
                  placeholder="全部"
                  allowClear
                  onChange={(v) => setSigFilter(v ?? '')}
                  options={sigOptions}
                  style={{ height: 30, minWidth: 130 }}
                  className="[&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!border-slate-200/80 [&_.ant-select-selector]:!text-sm [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
                />
              </div>

              {/* 搜索 */}
              <Input
                prefix={
                  <SearchIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                }
                placeholder={
                  activeTab === 'repo' ? '搜索仓库名称...' : '搜索 SIG 名称...'
                }
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                style={{ height: 30, width: 220 }}
                className="!rounded-2xl [&_.ant-input-affix-wrapper]:!border-slate-200/80 [&_.ant-input-affix-wrapper]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-input]:!text-sm"
              />

              {(sigFilter || searchText) && (
                <button
                  type="button"
                  onClick={() => {
                    setSigFilter('');
                    setSearchText('');
                  }}
                  className="text-xs font-medium text-indigo-500 hover:text-indigo-700"
                >
                  清除筛选
                </button>
              )}
            </div>
          </div>

          {/* 卡片列表 */}
          {cardsLoading ? (
            <div className="py-16 text-center text-sm text-slate-400">
              加载中...
            </div>
          ) : cards.length > 0 ? (
            <div className="space-y-4">
              {cards.map((item, index) => (
                <OverviewDataCard
                  key={item.id}
                  data={item}
                  index={index + 1}
                  type={activeTab}
                  onEditPain={(row) => setEditingPain(row)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 py-16 text-slate-500">
              <SearchIcon className="mb-3 h-8 w-8 text-slate-300" />
              <p className="text-sm">
                未找到匹配的{activeTab === 'repo' ? '仓库' : 'SIG'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSigFilter('');
                  setSearchText('');
                }}
                className="mt-3 text-xs font-medium text-indigo-500 hover:text-indigo-700"
              >
                清除筛选条件
              </button>
            </div>
          )}
        </Card>
      </div>

      <SigConfigModal
        open={sigModalOpen}
        onClose={() => setSigModalOpen(false)}
        configs={sigConfigResp?.items ?? []}
        loading={sigLoading}
        onCreateSig={async (sig) => {
          await sigMutation.mutateAsync({ op: 'create-sig', sig });
        }}
        onDeleteSig={async (sig) => {
          await sigMutation.mutateAsync({ op: 'delete-sig', sig });
        }}
        onAddProject={async (sig, project) => {
          await sigMutation.mutateAsync({ op: 'add-project', sig, project });
        }}
        onRemoveProject={async (sig, project) => {
          await sigMutation.mutateAsync({ op: 'remove-project', sig, project });
        }}
      />
      <PainEditModal
        open={!!editingPain}
        row={editingPain}
        onClose={() => setEditingPain(null)}
        onSubmit={async (row, patch) => {
          await painMutation.mutateAsync({
            file_key: row.fileKey,
            step_id: row.stepId,
            pain_index: row.painIndex,
            ...patch,
          });
        }}
      />
    </div>
  );
};

export default OverviewDashboard;
