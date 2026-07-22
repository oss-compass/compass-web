import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  CommentOutlined,
  DownOutlined,
  ExperimentOutlined,
  FlagOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  RedoOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import type {
  CiJourneyCells,
  CiJourneyProblem,
  CiJourneyStage,
  CiRepoKey,
} from '../../types';
import {
  ROOT_STATUS_LABEL,
  priBadgeClass,
  prURL,
  rootStatusBadgeClass,
  runURL,
} from '../../helpers';
import { CI_JOURNEY } from './journeyData';

type CiJourneyPanoramaProps = {
  repo: CiRepoKey;
  workflow: string;
  day: string;
};

type Tone = 'good' | 'warn' | 'bad' | 'neutral';

/** 段元信息（图标 / 主题色 / 英文眉标 / 简介），按段名索引（仓无关，家族同构） */
const SEG_META: Record<
  string,
  { icon: React.ReactNode; color: string; code: string; intro: string }
> = {
  触发确认: {
    icon: <CommentOutlined />,
    color: '#2563eb',
    code: 'TRIGGER',
    intro: '评论触发 CI → 确认回帖：衡量 CI 是否被正确唤起并及时确认。',
  },
  构建准备: {
    icon: <AppstoreOutlined />,
    color: '#7c3aed',
    code: 'BUILD',
    intro: '镜像拉取 / 构建环境准备阶段的耗时与稳定性。',
  },
  编译: {
    icon: <CodeOutlined />,
    color: '#ea580c',
    code: 'COMPILE',
    intro: '源码编译阶段的耗时、机时消耗与稳定性。',
  },
  单元测试: {
    icon: <ExperimentOutlined />,
    color: '#0d9488',
    code: 'UNIT',
    intro: '单元测试执行与测试报告生成阶段。',
  },
  系统测试: {
    icon: <RocketOutlined />,
    color: '#e11d48',
    code: 'SYSTEM',
    intro: 'NPU 真机冒烟（PreSmoke），依赖 self-hosted 执行机在线注册。',
  },
  结果反馈: {
    icon: <MessageOutlined />,
    color: '#d97706',
    code: 'FEEDBACK',
    intro: '失败到首次反馈的时效与机器人回帖覆盖情况。',
  },
  修复重试: {
    icon: <RedoOutlined />,
    color: '#64748b',
    code: 'RETRY',
    intro: '失败后重跑的再失败率与重复执行机时消耗。',
  },
};

const segMeta = (seg: string) =>
  SEG_META[seg] ?? {
    icon: <FlagOutlined />,
    color: '#64748b',
    code: '',
    intro: '',
  };

/** 四维明细顺序与元信息（对齐设计稿旅程段四维） */
const DIM_META: Array<{ key: keyof CiJourneyCells; label: string }> = [
  { key: 'stability', label: '稳定性' },
  { key: 'efficiency', label: '效率' },
  { key: 'interaction', label: '交互体验' },
  { key: 'cost', label: '成本' },
];

const scoreTone = (score: number | null): Tone => {
  if (score == null) {
    return 'neutral';
  }
  if (score >= 80) {
    return 'good';
  }
  if (score >= 60) {
    return 'warn';
  }
  return 'bad';
};

const SCORE_TONE_TEXT: Record<Tone, string> = {
  good: 'text-emerald-600',
  warn: 'text-amber-600',
  bad: 'text-rose-600',
  neutral: 'text-slate-400',
};

const SCORE_BADGE: Record<Tone, string> = {
  good: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warn: 'border-amber-200 bg-amber-50 text-amber-700',
  bad: 'border-rose-200 bg-rose-50 text-rose-700',
  neutral: 'border-slate-200 bg-slate-50 text-slate-500',
};

const CARD_TONE: Record<Tone, string> = {
  good: 'border-emerald-200 bg-white',
  warn: 'border-amber-200 bg-white',
  bad: 'border-rose-200 bg-white',
  neutral: 'border-slate-200 bg-white',
};

const getStarText = (stars: number) => {
  const filled = Math.max(0, Math.min(5, Math.round(stars)));
  return `${'★'.repeat(filled)}${'☆'.repeat(5 - filled)}`;
};

/** 段状态：任一维需处理即整段需处理 */
const stageAttention = (stage: CiJourneyStage) =>
  DIM_META.some(({ key }) => stage.cells[key]?.word === '需处理');

/** 段内问题总数（用于左菜单红点） */
const stageProblemCount = (stage: CiJourneyStage) =>
  stage.problems?.length ?? 0;

/** 单张旅程段卡（借鉴社区入门体验旅程全景图 StepNode 样式） */
const StageCard: React.FC<{
  stage: CiJourneyStage;
  active: boolean;
  onClick: () => void;
}> = ({ stage, active, onClick }) => {
  const meta = segMeta(stage.seg);
  const tone = scoreTone(stage.segscore);
  const attention = stageAttention(stage);
  const statusWord = attention ? '需处理' : '正常';
  const stars = Math.round(stage.segscore / 20);
  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        title={`${stage.seg} · ${statusWord}`}
        className={`flex h-[260px] w-full cursor-pointer flex-col rounded-[20px] border px-4 pb-3 pt-4 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-all duration-200 ${
          CARD_TONE[tone]
        } ${
          active
            ? 'ring-2 ring-violet-400'
            : attention
            ? 'ring-1 ring-rose-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.10)]'
            : 'hover:shadow-[0_8px_20px_rgba(15,23,42,0.10)]'
        }`}
      >
        <div className="flex min-h-[40px] items-center justify-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl text-base"
            style={{ color: meta.color, background: `${meta.color}14` }}
          >
            {meta.icon}
          </span>
          <div className="min-w-0 text-left">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {meta.code}
            </div>
            <div className="truncate text-[17px] font-semibold text-slate-900">
              {stage.seg}
            </div>
          </div>
        </div>

        <div className="mt-3 text-center text-[19px] font-semibold leading-none tracking-[0.18em] text-amber-500">
          {getStarText(stars)}
        </div>
        <div className="mt-1.5 text-center">
          <span
            className={`text-[28px] font-semibold leading-none ${SCORE_TONE_TEXT[tone]}`}
          >
            {stage.segscore}
          </span>
          <span className="ml-1 text-xs font-medium text-slate-500">分</span>
        </div>
        <div
          className={`mt-1 text-center text-[12px] font-medium ${
            attention ? 'text-rose-600' : 'text-slate-400'
          }`}
        >
          {statusWord}
        </div>

        <div className="mt-3 flex flex-1 flex-col justify-end rounded-2xl border border-slate-200/70 bg-white/80 px-2 py-1.5">
          <div className="grid grid-cols-3">
            {stage.stats.map((st, i) => (
              <div
                key={`${st.label}-${i}`}
                className="flex flex-col items-center py-1"
              >
                <span className="text-[20px] font-bold leading-none text-slate-900">
                  {st.v}
                </span>
                <span className="mt-1 text-[13px] text-slate-400">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/** 左侧旅程段菜单（对齐 Issue 体验路径总览 IssueStageDirectory 交互/UI） */
const JourneyDirectory: React.FC<{
  stages: CiJourneyStage[];
  activeKey: string;
  onSelect: (key: string) => void;
}> = ({ stages, activeKey, onSelect }) => (
  <Card
    bordered={false}
    className="w-full rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)]"
    bodyStyle={{ padding: 16 }}
  >
    <h2 className="mb-4 text-base font-semibold text-slate-800">旅程名称</h2>
    <nav aria-label="旅程名称" className="flex flex-col gap-3">
      {stages.map((stage, index) => {
        const active = stage.seg === activeKey;
        const probn = stageProblemCount(stage);
        return (
          <button
            key={stage.seg}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(stage.seg)}
            className={`w-full rounded-2xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
              active
                ? 'border-slate-900 bg-slate-900 text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)]'
                : 'border-slate-200/80 bg-white/90 text-slate-700 shadow-[0_12px_32px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)]'
            }`}
          >
            <span className="flex items-center gap-3 px-4 py-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
                  active
                    ? 'bg-white/[0.12] text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-sm font-semibold ${
                    active ? 'text-white' : 'text-slate-800'
                  }`}
                >
                  {stage.seg}
                </span>
                <span
                  className={`mt-0.5 block truncate text-xs ${
                    active ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {segMeta(stage.seg).code} · {stage.segscore} 分
                </span>
              </span>
              {probn > 0 ? (
                <span
                  className={`flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-rose-100 text-rose-600'
                  }`}
                >
                  {probn}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </nav>
  </Card>
);

/** 段趋势缩略折线（对齐设计稿 spark：折线 + 末点，自动取值域） */
const StageSpark: React.FC<{ series: number[] }> = ({ series }) => {
  const w = 200;
  const h = 36;
  const pad = 3;
  const nums = series.filter((v) => Number.isFinite(v));
  const mn = nums.length ? Math.min(...nums) : 0;
  const mx = nums.length ? Math.max(...nums) : 1;
  const range = mx - mn;
  const n = series.length;
  const step = n > 1 ? (w - pad * 2) / (n - 1) : 0;
  const yOf = (v: number) =>
    range === 0
      ? h / 2
      : pad + (h - pad * 2) - ((v - mn) / range) * (h - pad * 2);
  const pts = series.map((v, i) => ({ x: pad + step * i, y: yOf(v) }));
  const line = pts
    .map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');
  const last = pts[pts.length - 1];
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-auto w-[240px] max-w-full"
      role="img"
      aria-label="近 7 个观测日趋势"
    >
      <path d={line} fill="none" stroke="#6366f1" strokeWidth={2} />
      {last ? <circle cx={last.x} cy={last.y} r={3} fill="#6366f1" /> : null}
    </svg>
  );
};

/** 段内单个问题卡（对齐 Issue StagePainCard：可展开、rose 主题、内嵌 run×PR 表） */
const StageProblem: React.FC<{
  problem: CiJourneyProblem;
  repo: CiRepoKey;
}> = ({ problem, repo }) => {
  const { root, impact } = problem;
  const [open, setOpen] = useState(true);
  const metaLines: string[] = [];
  if (impact) {
    const parts = [
      `${impact.runs} run`,
      `${impact.prs} PR`,
      `连续 ${impact.streak_days} 天`,
      `窗口累计 ${impact.window_total}`,
    ];
    if (impact.wasted_min != null) {
      parts.push(`浪费 ${impact.wasted_min} 机时`);
    }
    metaLines.push(`影响面：${parts.join(' · ')}`);
    if (impact.cross) {
      metaLines.push(...impact.cross);
    }
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-rose-200/70 bg-white shadow-[0_10px_24px_rgba(244,63,94,0.06)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-rose-50/40"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                priBadgeClass[problem.pri]
              }`}
            >
              {problem.pri}
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              {problem.dim}
            </span>
          </span>
          <span className="mt-2 block text-sm font-semibold leading-6 text-slate-900">
            {problem.title}
          </span>
        </span>
        <span className="shrink-0 pt-1 text-slate-400">
          <DownOutlined
            className={`text-[11px] transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {open ? (
        <div className="border-t border-rose-100 px-4 py-4">
          {metaLines.map((m, i) => (
            <div
              key={i}
              className="mb-1 text-[11.5px] leading-relaxed text-slate-500"
            >
              {m}
            </div>
          ))}
          <div className="mt-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
            <div className="flex items-center gap-2">
              <b className="text-[12px] font-semibold text-slate-700">
                可能根因
              </b>
              <span
                className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold ${
                  rootStatusBadgeClass[root.status]
                }`}
              >
                {ROOT_STATUS_LABEL[root.status]}
              </span>
            </div>
            {root.cause ? (
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">
                {root.cause}
              </p>
            ) : null}
            {root.evidence && root.evidence.length ? (
              <div className="mt-2 text-[12px] leading-relaxed text-slate-600">
                <b className="font-semibold text-slate-700">已核证据</b>
                <ul className="mt-1 list-disc pl-5">
                  {root.evidence.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {root.guess ? (
              <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                <b className="font-semibold text-slate-700">推测(未核)</b>：
                {root.guess}
              </p>
            ) : null}
            {root.action ? (
              <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                <b className="font-semibold text-slate-700">建议动作</b>：
                {root.action}
                {root.dest ? (
                  <span className="ml-1 text-[11px] text-slate-400">
                    → {root.dest}
                  </span>
                ) : null}
              </p>
            ) : null}
          </div>

          {problem.runs.length ? (
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[640px] border-collapse text-[11.5px]">
                <thead className="bg-slate-50/80">
                  <tr className="text-slate-500">
                    <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold">
                      run
                    </th>
                    <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold">
                      PR
                    </th>
                    <th className="border-b border-slate-200 px-3 py-2 text-right font-semibold">
                      触发
                    </th>
                    <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold">
                      失败位置
                    </th>
                    <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold">
                      失败信息 / 说明
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {problem.runs.map((r) => (
                    <tr key={r.id} className="align-top text-slate-600">
                      <td className="border-b border-slate-100 px-3 py-2">
                        <a
                          href={runURL(repo, r.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          #{r.n}
                        </a>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        <a
                          href={prURL(repo, r.pr)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {r.pr}
                        </a>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 text-right tabular-nums">
                        {r.t}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2">
                        {r.stage} / {r.job}
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-400">
                        {r.msg}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

/**
 * 右侧旅程段详情面板（对齐 Issue 体验路径总览详情卡：头部 icon + 标题 + 简介 + 徽章行；
 * 主体=四维明细卡片网格 + 段趋势 + 段内问题）。
 */
const StageDetailPanel: React.FC<{
  stage: CiJourneyStage;
  repo: CiRepoKey;
  workflow: string;
}> = ({ stage, repo, workflow }) => {
  const meta = segMeta(stage.seg);
  const tone = scoreTone(stage.segscore);
  const problems = stage.problems ?? [];
  const [dimsOpen, setDimsOpen] = useState(true);

  return (
    <div className=">lg:h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]">
      {/* 头部：icon + 标题 + 简介 + 徽章行 */}
      <div className=">md:px-5 border-b border-slate-100 px-4 py-4">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border text-xl ${SCORE_BADGE[tone]}`}
          >
            {meta.icon}
          </span>
          <div className="min-w-0">
            <div className="text-lg font-semibold text-slate-900">
              <span className="uppercase tracking-[0.12em] text-slate-400">
                {meta.code}
              </span>{' '}
              {stage.seg}
            </div>
            <p className="mt-0.5 text-sm leading-6 text-slate-500">
              {meta.intro}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${SCORE_BADGE[tone]}`}
          >
            <span>旅程得分</span>
            <span className="text-base leading-none">{stage.segscore}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">
            <span className="font-medium text-slate-600">问题</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums leading-none ${
                problems.length
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {problems.length}
            </span>
          </span>
          {stage.bare.length ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm">
              <span className="font-medium text-slate-600">具体定位</span>
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-slate-700">
                {workflow} · {stage.bare.join(' / ')}
              </span>
            </span>
          ) : null}
        </div>
      </div>

      {/* 主体 */}
      <div className=">md:p-5 space-y-6 p-4">
        {/* 四维明细 */}
        <div>
          <button
            type="button"
            onClick={() => setDimsOpen((v) => !v)}
            aria-expanded={dimsOpen}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <span className="flex flex-wrap items-center gap-2">
              <h4 className="text-base font-semibold text-slate-900">
                四维明细
              </h4>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                段综合分 = 各有效维度等权均值
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-slate-400">
              {dimsOpen ? '收起' : '展开'}
              <DownOutlined
                className={`text-[10px] transition-transform ${
                  dimsOpen ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>
          {dimsOpen ? (
            <>
              <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[760px] border-collapse text-[13px]">
                  <thead>
                    <tr>
                      {[
                        '维度',
                        '分数',
                        '状态',
                        '代表指标（当日值）',
                        '改进责任方',
                        '问题',
                      ].map((heading, index) => (
                        <th
                          key={heading}
                          className={`border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-[11.5px] font-semibold text-slate-500 ${
                            index === 1 || index === 5
                              ? 'text-right'
                              : 'text-left'
                          }`}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DIM_META.map(({ key, label }) => {
                      const cell = stage.cells[key];
                      const cellTone = scoreTone(
                        cell.fallback ? null : cell.score
                      );
                      const attention = cell.word === '需处理';
                      return (
                        <tr
                          key={label}
                          className={cell.fallback ? 'bg-slate-50/50' : ''}
                        >
                          <td className="border-b border-slate-100 px-3 py-2 font-medium text-slate-700">
                            {label}
                          </td>
                          <td
                            className={`border-b border-slate-100 px-3 py-2 text-right font-semibold tabular-nums ${SCORE_TONE_TEXT[cellTone]}`}
                          >
                            {cell.fallback ? '—' : cell.score ?? '—'}
                          </td>
                          <td
                            className={`border-b border-slate-100 px-3 py-2 ${
                              attention
                                ? 'font-semibold text-rose-600'
                                : 'text-slate-500'
                            }`}
                          >
                            {cell.fallback ? '—' : cell.word}
                          </td>
                          <td className="border-b border-slate-100 px-3 py-2 text-slate-500">
                            {cell.fallback ? (
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11.5px] text-slate-400">
                                  该阶段无{label}日度信号
                                </span>
                                {cell.score != null ? (
                                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10.5px] font-medium text-slate-500">
                                    仓库{label} {cell.score} 分 · 仅参考
                                  </span>
                                ) : null}
                              </div>
                            ) : (
                              <>
                                <span className="text-[11.5px] text-slate-400">
                                  {cell.name}
                                </span>{' '}
                              <b className="font-semibold text-slate-800">
                                {cell.disp}
                              </b>
                              </>
                            )}
                          </td>
                          <td
                            className={`border-b border-slate-100 px-3 py-2 font-semibold ${
                              cell.owner?.startsWith('混合')
                                ? 'text-amber-600'
                                : cell.owner
                                ? 'text-sky-600'
                                : 'text-slate-400'
                            }`}
                          >
                            {cell.owner || '—'}
                          </td>
                          <td className="border-b border-slate-100 px-3 py-2 text-right tabular-nums text-slate-600">
                            {cell.fallback || !cell.probn ? '·' : cell.probn}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* 段趋势缩略折线 */}
              <div className="mt-3 w-[320px] max-w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_20px_rgba(15,23,42,0.04)]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold text-slate-500">
                    {stage.trend.name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    近 7 个观测日
                  </span>
                </div>
                <div className="mt-1">
                  <StageSpark series={stage.trend.series} />
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* 问题 */}
        {problems.length ? (
          <div className="border-t border-slate-200 pt-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <FlagOutlined className="text-rose-500" />
                <h4 className="text-base font-semibold text-slate-900">
                  问题
                </h4>
              </div>
              <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600">
                {problems.length} 个问题
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {problems.map((p, i) => (
                <StageProblem key={i} problem={p} repo={repo} />
              ))}
            </div>
          </div>
        ) : (
          <div className="border-t border-slate-200 pt-6">
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-center text-[12.5px] text-slate-500">
              本段当日无独立问题信号（
              {stage.stats.map((s) => `${s.v} ${s.label}`).join(' · ')}）。
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 开发者旅程全景图：主轴=旅程段（八段横排，借鉴社区入门体验旅程全景图样式），
 * 每卡=段综合分 + 星级 + 状态词 + 段三宫格。详情区为主从式布局（对齐 Issue 体验路径总览）：
 * 左=旅程段菜单，右=段详情（四维明细 / 段趋势 / 段内问题）；顶部卡片与左菜单双向联动。
 * 内容参考 v2 设计稿；日观测板 / 周复盘切换已隐藏，默认只展示日观测板。
 */
const CiJourneyPanorama: React.FC<CiJourneyPanoramaProps> = ({
  repo,
  workflow,
  day,
}) => {
  const journey = CI_JOURNEY[repo];
  const board =
    journey.boards[day] ??
    journey.boards[journey.days[journey.days.length - 1]];
  const stages = board?.stages ?? [];
  // 默认选中首个「有问题」段，其次首个「需处理」段（对齐设计稿默认落在系统测试）
  const defaultKey =
    stages.find((s) => stageProblemCount(s) > 0)?.seg ??
    stages.find((s) => stageAttention(s))?.seg ??
    stages[0]?.seg ??
    '';
  const [activeKey, setActiveKey] = useState<string>(defaultKey);

  useEffect(() => {
    setActiveKey(defaultKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  const activeStage =
    stages.find((s) => s.seg === activeKey) ?? stages[0] ?? null;

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xl font-semibold text-slate-900">
            开发者旅程全景图
          </h2>
          <Tooltip title="主轴=旅程段（仓无关，家族同构形态）；每卡=段综合分 + 星级（视觉）+ 状态词（事件 + 水位双信号）+ 段三宫格；点卡或左侧菜单进入段详情。「本段当日无信号」不造数。">
            <InfoCircleOutlined className="shrink-0 cursor-help text-slate-400" />
          </Tooltip>
        </div>
      </div>

      <div className=">md:px-6 rounded-[28px] border border-slate-200 bg-white px-4 py-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900">
              {journey.projectName}
            </div>
          </div>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* 旅程段按可用宽度自动分列，空间不足时换行，避免横向滚动。 */}
        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(208px,1fr))] items-start gap-x-10 gap-y-6 px-2 pb-2 pt-1">
          {stages.map((stage, index) => (
            <div key={stage.seg} className="relative min-w-0">
              <StageCard
                stage={stage}
                active={activeKey === stage.seg}
                onClick={() => setActiveKey(stage.seg)}
              />
              {index < stages.length - 1 ? (
                <div
                  className="pointer-events-none absolute -right-7 top-0 flex h-[260px] w-4 items-center justify-center text-slate-300"
                  aria-hidden="true"
                >
                  <ArrowRightOutlined className="text-base" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* 旅程段详情 · 主从式布局（左菜单 + 右内容，对齐 Issue 体验路径总览） */}
        <div className=">md:p-4 mt-6 rounded-[24px] border border-slate-200 bg-slate-50/70 p-3">
          <div className=">lg:flex-row flex flex-col gap-4">
            <div className=">lg:w-[240px] >lg:flex-none">
              <div className=">lg:sticky >lg:top-5">
                <JourneyDirectory
                  stages={stages}
                  activeKey={activeKey}
                  onSelect={setActiveKey}
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              {activeStage ? (
                <StageDetailPanel
                  stage={activeStage}
                  repo={repo}
                  workflow={workflow}
                />
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-400">
                  点击左侧菜单或上方全景图卡片查看对应旅程段详情
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CiJourneyPanorama;
