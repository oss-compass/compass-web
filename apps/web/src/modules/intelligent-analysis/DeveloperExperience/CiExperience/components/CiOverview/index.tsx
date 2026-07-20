import React, { type ReactNode, useState } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { CiRepoData, CiRepoKey } from '../../types';
import { EmptyState } from '../shared';
import WeeklyProblemBoard from '../WeeklyProblemBoard';
import PlatformObservability from '../PlatformObservability';
import { computeOverview, type CiOverviewLevel } from './metrics';

type CiOverviewProps = {
  data: CiRepoData;
  repo: CiRepoKey;
};

/** 可点选联动面板键：问题管理 / 平台能力 */
type OvSel = 'probs' | 'cap' | null;

const HERO_TONE: Record<
  CiOverviewLevel,
  { dot: string; text: string; ring: string; bg: string }
> = {
  crit: {
    dot: 'bg-rose-500',
    text: 'text-rose-600',
    ring: 'ring-rose-100',
    bg: 'bg-rose-50/70',
  },
  warn: {
    dot: 'bg-amber-500',
    text: 'text-amber-600',
    ring: 'ring-amber-100',
    bg: 'bg-amber-50/70',
  },
  good: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-600',
    ring: 'ring-emerald-100',
    bg: 'bg-emerald-50/70',
  },
};

type BadgeTone = 'slate' | 'amber' | 'rose' | 'sky' | 'emerald';

const BADGE_TONE: Record<BadgeTone, string> = {
  slate: 'border-slate-200 bg-slate-50 text-slate-600',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  rose: 'border-rose-200 bg-rose-50 text-rose-700',
  sky: 'border-sky-200 bg-sky-50 text-sky-700',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

type MetricCardProps = {
  label: string;
  value: ReactNode;
  suffix?: string;
  description: string;
  sub: ReactNode;
  badge?: string;
  badgeTone?: BadgeTone;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
};

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  suffix,
  description,
  sub,
  badge,
  badgeTone = 'slate',
  selectable = false,
  selected = false,
  onToggle,
}) => {
  const base =
    'flex h-full flex-col justify-between rounded-2xl border bg-white/90 px-4 py-3 text-left shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-all duration-150';
  const tone = selected
    ? 'border-slate-200/80 ring-2 ring-violet-400'
    : selectable
    ? 'border-slate-200/80 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]'
    : 'border-slate-200/80';
  const chip = selectable ? (selected ? '收起' : '明细') : badge;
  const chipTone: BadgeTone = selectable ? 'sky' : badgeTone;
  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-slate-500">
          <span className="truncate">{label}</span>
          <Tooltip title={description}>
            <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
          </Tooltip>
        </div>
        {chip ? (
          <span
            className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4 ${BADGE_TONE[chipTone]}`}
          >
            {chip}
            {selectable ? (selected ? ' ▴' : ' ▾') : ''}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <div className="text-2xl font-semibold leading-none text-slate-900">
          {value}
        </div>
        {suffix ? (
          <div className="text-sm font-medium text-slate-500">{suffix}</div>
        ) : null}
      </div>
      <div className="mt-2 text-[11.5px] leading-relaxed text-slate-400">
        {sub}
      </div>
    </>
  );

  if (selectable) {
    return (
      <button type="button" onClick={onToggle} className={`${base} ${tone}`}>
        {body}
      </button>
    );
  }
  return <div className={`${base} ${tone}`}>{body}</div>;
};

/** 联动面板小节壳（标题 + 说明 + 内容），对齐社区报告卡内分节 */
const PanelSection: React.FC<{
  title: string;
  anno?: string;
  children: ReactNode;
}> = ({ title, anno, children }) => (
  <div className=">md:p-5 mt-4 rounded-2xl border border-slate-200 bg-white p-4">
    <div className="mb-3 flex flex-wrap items-baseline gap-2">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {anno ? (
        <span className="text-[11.5px] leading-relaxed text-slate-400">
          {anno}
        </span>
      ) : null}
    </div>
    {children}
  </div>
);

/**
 * 总览部分（自包含，便于后续整体迁移）：
 * hero 状态行 + 五张 KPI 卡（后两张可点选联动）+ 联动面板（问题管理 / 平台可观测性）。
 * 样式基准：IssueReportOverview 圆角白卡 + OverviewMetricCard。
 */
const CiOverview: React.FC<CiOverviewProps> = ({ data, repo }) => {
  const [ovsel, setOvsel] = useState<OvSel>('probs');

  if (!data.days.length) {
    return (
      <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <div className="mb-3 text-base font-semibold text-slate-800">
          总览 · {repo === 'opsnn' ? 'ops-nn' : 'runtime'}
        </div>
        <EmptyState>该仓库数据落库中，暂无总览内容。</EmptyState>
      </section>
    );
  }

  const m = computeOverview(data);
  const tone = HERO_TONE[m.level];
  const toggle = (k: Exclude<OvSel, null>) =>
    setOvsel((cur) => (cur === k ? null : k));

  const verdict: ReactNode =
    m.level === 'good' ? (
      <>观测窗内未见持续性平台故障，失败以贡献者代码问题为主，反馈链路顺畅。</>
    ) : (
      <>
        主要拖累来自 <b className="font-semibold text-slate-800">平台侧故障</b>
        ——约占全部失败{' '}
        <b className="font-semibold text-slate-800">
          {m.platMed != null ? m.platMed.toFixed(0) : '—'}%
        </b>
        ，连带卡住约{' '}
        <b className="font-semibold text-slate-800">
          {m.blkL != null ? m.blkL : '—'} 个 PR
        </b>
        、浪费约{' '}
        <b className="font-semibold text-slate-800">
          {m.totWaste.toFixed(0)} 机时
        </b>
        ，需基础设施团队优先跟进。
      </>
    );

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      {/* 标题 */}
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-base font-semibold text-slate-800">
          总览 · {repo === 'opsnn' ? 'ops-nn' : 'runtime'}
        </div>
        <span className="text-xs text-slate-400">
          全 {m.dayCount} 个实测日汇总 · 点「在跟踪的问题 /
          平台能力就绪」查看详情
        </span>
      </div>

      {/* hero 状态行 */}
      <div
        className={`>md:flex-row >md:items-center flex flex-col gap-2 rounded-2xl px-4 py-3 ring-1 ${tone.bg} ${tone.ring}`}
      >
        <div className="flex shrink-0 items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />
          <span className={`text-sm font-semibold ${tone.text}`}>
            {m.levelText}
          </span>
        </div>
        <div className=">md:border-l >md:border-slate-200/70 >md:pl-3 text-[13px] leading-relaxed text-slate-600">
          {verdict}
        </div>
      </div>

      {/* 五张 KPI 卡（占满整行，不换行） */}
      <div className="mt-4 grid grid-cols-5 gap-3">
        <MetricCard
          label="流水线失败率"
          value={m.failRate.toFixed(1)}
          suffix="%"
          description="完结 run 里失败的比例（全窗汇总）"
          sub={`全窗 ${m.totFail}/${m.totRun} run · 平台故障 ${
            m.platMed != null ? m.platMed.toFixed(0) : '—'
          }%`}
          badge={m.failRate >= 30 ? '偏高' : '正常'}
          badgeTone={m.failRate >= 30 ? 'rose' : 'emerald'}
        />
        <MetricCard
          label="被 CI 卡住的 PR"
          value={m.blkL != null ? m.blkL : '—'}
          suffix="个"
          description="被失败流水线阻塞的 PR 数（最新观测日）"
          sub={`窗口 ${m.blk0 != null ? m.blk0 : '—'} → ${
            m.blkL != null ? m.blkL : '—'
          } 个`}
          badge={
            m.blk0 != null && m.blkL != null && m.blkL > m.blk0
              ? '累积中'
              : '平稳'
          }
          badgeTone={
            m.blk0 != null && m.blkL != null && m.blkL > m.blk0
              ? 'amber'
              : 'slate'
          }
        />
        <MetricCard
          label="无效机时(可回收)"
          value={m.totWaste.toFixed(0)}
          suffix="机时"
          description="浪费在非代码失败上的算力（取消/挂死/平台故障）"
          sub={`占总机时约 ${m.wasteShare}%`}
          badge={m.wasteShare >= 20 ? '偏高' : '可控'}
          badgeTone={m.wasteShare >= 20 ? 'amber' : 'slate'}
        />
        <MetricCard
          label="在跟踪的问题"
          value={m.activeP01}
          suffix="活跃"
          description="活跃 P0/P1 问题数；点击查看问题管理明细"
          sub={`已消退 ${m.faded} · 待回填 ${m.backfill}`}
          selectable
          selected={ovsel === 'probs'}
          onToggle={() => toggle('probs')}
        />
        <MetricCard
          label="平台能力就绪"
          value={m.capOk}
          suffix={`/ ${m.capTotal}`}
          description="GitCode Action 平台可观测性能力；缺口即向平台提交的需求"
          sub="观测性缺口 = 对平台的需求"
          selectable
          selected={ovsel === 'cap'}
          onToggle={() => toggle('cap')}
        />
      </div>

      {/* 联动面板 */}
      {ovsel === 'probs' ? (
        <PanelSection
          title="问题管理 · 正在跟踪的问题"
          anno="按机理跨日聚合；随「在跟踪的问题」卡片联动"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700">
              活跃 P0/P1 · {m.activeP01}
            </span>
            <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              已消退 · {m.faded}
            </span>
            <span className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
              待回填 · {m.backfill}
            </span>
          </div>
          <WeeklyProblemBoard probs={data.weekly.probs} />
        </PanelSection>
      ) : ovsel === 'cap' ? (
        <PanelSection
          title="平台可观测性面板"
          anno="GitCode Action 能力现状；缺口即向平台提交的需求"
        >
          <PlatformObservability />
        </PanelSection>
      ) : null}
    </section>
  );
};

export default CiOverview;
