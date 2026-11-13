import { CiProblemRuleSummary, CiRunRuleCell } from '../RuleReviews';
import { useCiRepositoryUrl } from '../../repository';
import React, { useEffect, useId, useState } from 'react';
import { CiPainTrackingButton } from '../PainTracking';
import {
  AppstoreOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  CommentOutlined,
  DownOutlined,
  ExperimentOutlined,
  FlagOutlined,
  MessageOutlined,
  RedoOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import type {
  CiJourneyFocus,
  CiJourneyProblem,
  CiJourneyStage,
  CiRepoKey,
  CiJourney,
} from '../../types';
import {
  ROOT_STATUS_LABEL,
  priBadgeClass,
  problemKey,
  prURL,
  rootStatusBadgeClass,
  runURL,
} from '../../helpers';
import {
  DIM_META,
  getStageProblems,
  getStageObservations,
  getStageRecommendations,
} from './journeySummary';

type CiJourneyPanoramaProps = {
  journey: CiJourney;
  repo: CiRepoKey;
  workflow: string;
  day: string;
  /** 外部跳转请求（报告概览问题行点击）：切段 + 滚动定位 + 高亮同一问题 */
  focus?: CiJourneyFocus | null;
};

type Tone = 'good' | 'warn' | 'bad' | 'neutral';

/** 段元信息（图标 / 主题色 / 英文眉标 / 简介），按段名索引（仓无关，家族同构） */
const SEG_META: Record<
  string,
  { icon: React.ReactNode; color: string; code: string }
> = {
  触发确认: {
    icon: <CommentOutlined />,
    color: '#2563eb',
    code: 'TRIGGER',
  },
  构建准备: {
    icon: <AppstoreOutlined />,
    color: '#7c3aed',
    code: 'BUILD',
  },
  静态检查: {
    icon: <CodeOutlined />,
    color: '#0891b2',
    code: 'LINT',
  },
  编译: {
    icon: <CodeOutlined />,
    color: '#ea580c',
    code: 'COMPILE',
  },
  单元测试: {
    icon: <ExperimentOutlined />,
    color: '#0d9488',
    code: 'UNIT',
  },
  系统测试: {
    icon: <RocketOutlined />,
    color: '#e11d48',
    code: 'SYSTEM',
  },
  结果反馈: {
    icon: <MessageOutlined />,
    color: '#d97706',
    code: 'FEEDBACK',
  },
  修复重试: {
    icon: <RedoOutlined />,
    color: '#64748b',
    code: 'RETRY',
  },
};

const segMeta = (seg: string) =>
  SEG_META[seg] ?? {
    icon: <FlagOutlined />,
    color: '#64748b',
    code: '',
  };

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

/** 段状态词：按优先级 需处理 > 关注 > 正常 扫描四维格（对齐源页 renderStrip 逻辑） */
const STATUS_WORDS = ['需处理', '关注', '正常'] as const;
const stageStatusWord = (stage: CiJourneyStage) =>
  STATUS_WORDS.find((w) =>
    DIM_META.some(({ key }) => stage.cells[key]?.word === w)
  ) ?? '未评估';

/** 段内问题总数（用于左菜单红点） */
const stageProblemCount = (stage: CiJourneyStage) =>
  getStageProblems(stage).length;

/** 单张旅程段卡（借鉴社区入门体验旅程全景图 StepNode 样式） */
const StageCard: React.FC<{
  stage: CiJourneyStage;
  active: boolean;
  onClick: () => void;
}> = ({ stage, active, onClick }) => {
  const meta = segMeta(stage.seg);
  const hasScore = stage.segscore != null;
  const tone = scoreTone(stage.segscore);
  const attention = stageAttention(stage);
  const statusWord = stageStatusWord(stage);
  const stars = Math.round((stage.segscore ?? 0) / 20);
  const problems = getStageProblems(stage);
  const observations = getStageObservations(stage);
  const recommendations = getStageRecommendations(problems);
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
        title={`${stage.seg} · ${hasScore ? statusWord : '本次未评估'}`}
        className={`flex h-[260px] w-full cursor-pointer flex-col rounded-[20px] border px-4 pb-3 pt-4 shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-all duration-200 ${
          CARD_TONE[tone]
        } ${stage.parallel ? 'border-dashed border-indigo-300' : ''} ${
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

        {hasScore ? (
          <>
            <div className="mt-3 text-center text-[19px] font-semibold leading-none tracking-[0.18em] text-amber-500">
              {getStarText(stars)}
            </div>
            <div className="mt-1.5 text-center">
              <span
                className={`text-[28px] font-semibold leading-none ${SCORE_TONE_TEXT[tone]}`}
              >
                {stage.segscore}
              </span>
              <span className="ml-1 text-xs font-medium text-slate-500">
                分
              </span>
            </div>
            <div
              className={`mt-1 text-center text-[12px] font-medium ${
                statusWord === '需处理'
                  ? 'text-rose-600'
                  : statusWord === '关注'
                  ? 'text-amber-600'
                  : 'text-slate-400'
              }`}
            >
              {statusWord}
            </div>
          </>
        ) : (
          /* 未评估态：对齐社区入门体验旅程全景图 StepNode 的 Not Evaluated 样式 */
          <div className="mt-3 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <span className="h-px w-5 bg-slate-300" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Not Evaluated
              </span>
              <span className="h-px w-5 bg-slate-300" />
            </div>
          </div>
        )}

        <div
          className={`mt-3 flex flex-1 flex-col justify-end rounded-2xl border px-2 py-1.5 ${
            hasScore
              ? 'border-slate-200/70 bg-white/80'
              : 'border-dashed border-slate-200 bg-slate-50/60'
          }`}
        >
          <div
            role="group"
            aria-label={`${stage.seg}统计`}
            className="grid grid-cols-3"
          >
            {[
              {
                label: '痛点',
                value: problems.length,
                color: problems.length ? 'text-rose-500' : 'text-slate-400',
                description: '本步骤关联的独立痛点数量，与下方痛点列表一致',
              },
              {
                label: '指标',
                value: observations.length,
                color: 'text-slate-900',
                description:
                  '本步骤实际有观测值的代表指标数，不含仓库级参考项；跨维度重复指标合并',
              },
              {
                label: '建议',
                value: recommendations.length,
                color: 'text-emerald-600',
                description: '本步骤痛点中实际提供的建议动作条目数',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                aria-label={`${stat.label}：${stat.value}`}
                title={stat.description}
                className="flex flex-col items-center py-1"
              >
                <span
                  className={`text-[20px] font-bold leading-none ${stat.color}`}
                >
                  {stat.value}
                </span>
                <span className="mt-1 whitespace-nowrap text-[12px] text-slate-400">
                  {stat.label}
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
  unsegCount: number;
  onSelect: (key: string) => void;
}> = ({ stages, activeKey, unsegCount, onSelect }) => (
  <Card
    bordered={false}
    className="w-full rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_48px_rgba(15,23,42,0.08)]"
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
            className={`w-full rounded-2xl border text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
              active
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200/80 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
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
                  {segMeta(stage.seg).code} ·{' '}
                  {stage.segscore != null
                    ? `${stage.segscore} 分`
                    : '本次未评估'}
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
      {/* 跨段/未映射 —— 只在有未归段问题时展示 */}
      {unsegCount > 0 ? (
        <>
          <div className="border-t border-slate-200" />
          <button
            type="button"
            aria-pressed={activeKey === '__unseg'}
            onClick={() => onSelect('__unseg')}
            className={`w-full rounded-2xl border text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
              activeKey === '__unseg'
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200/80 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-3 px-4 py-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
                  activeKey === '__unseg'
                    ? 'bg-white/[0.12] text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                ✚
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-sm font-semibold ${
                    activeKey === '__unseg' ? 'text-white' : 'text-slate-800'
                  }`}
                >
                  跨段/未映射
                </span>
              </span>
              <span
                className={`flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                  activeKey === '__unseg'
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-100 text-rose-600'
                }`}
              >
                {unsegCount}
              </span>
            </span>
          </button>
        </>
      ) : null}
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
  /** 外部跳转定位时临时高亮 */
  highlighted?: boolean;
}> = ({ problem, repo, highlighted }) => {
  const repositoryUrl = useCiRepositoryUrl();
  const { root, impact } = problem;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (highlighted) setOpen(true);
  }, [highlighted]);
  const [runsOpen, setRunsOpen] = useState(false);
  const metaLines: string[] = [];
  if (impact) {
    const parts = [
      `${impact.runs} 次执行`,
      `${impact.prs} PR`,
      `连续 ${impact.streak_days} 天`,
      `窗口累计 ${impact.window_total}`,
    ];
    if (impact.wasted_min != null) {
      parts.push(`浪费 ${impact.wasted_min} 分钟`);
    }
    metaLines.push(`影响：${parts.join(' · ')}`);
    if (impact.cross) {
      metaLines.push(...impact.cross);
    }
  }
  return (
    <div
      data-prob-key={problemKey(problem)}
      className={`scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-shadow ${
        highlighted ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="flex w-full items-start justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-slate-50">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="min-w-0 flex-1 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold ${
                  priBadgeClass[problem.pri]
                }`}
              >
                {problem.pri}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-500">
                {problem.dim}
              </span>
            </span>
            <span
              className={`mt-2 block text-sm font-medium leading-6 text-slate-900 ${
                open ? '' : 'line-clamp-2'
              }`}
            >
              {problem.title}
            </span>
          </span>
        </button>
        <div className="flex shrink-0 items-start gap-2 pt-0.5">
          <CiPainTrackingButton problem={problem} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? '收起痛点详情' : '展开痛点详情'}
            aria-expanded={open}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
          >
            <DownOutlined
              className={`text-xs transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
      <CiProblemRuleSummary problem={problem} />

      {open ? (
        <div className="border-t border-slate-200 px-4 py-4">
          {metaLines.map((m, i) => (
            <div
              key={i}
              className="mb-1 text-sm leading-relaxed text-slate-500"
            >
              {m}
            </div>
          ))}
          <div className="mt-2 rounded-2xl bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <b className="text-sm font-semibold text-slate-700">可能根因</b>
              <span
                className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-semibold ${
                  rootStatusBadgeClass[root.status]
                }`}
              >
                {ROOT_STATUS_LABEL[root.status]}
              </span>
            </div>
            {root.cause ? (
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {root.cause}
              </p>
            ) : null}
            {root.evidence && root.evidence.length ? (
              <div className="mt-2 text-sm leading-relaxed text-slate-600">
                <b className="font-semibold text-slate-700">已核证据</b>
                <ul className="mt-1 list-disc pl-5">
                  {root.evidence.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {root.guess ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                <b className="font-semibold text-slate-700">推测(未核)</b>：
                {root.guess}
              </p>
            ) : null}
            {root.action ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                <b className="font-semibold text-slate-700">建议动作</b>：
                {root.action}
                {root.dest ? (
                  <span className="ml-1 text-xs text-slate-400">
                    → {root.dest}
                  </span>
                ) : null}
              </p>
            ) : null}
          </div>

          {problem.runs.length ? (
            <div className="mt-3">
              <button
                type="button"
                aria-expanded={runsOpen}
                onClick={() => setRunsOpen((value) => !value)}
                className="flex w-full items-center gap-2 rounded-lg bg-slate-50 px-3.5 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                <span>关联执行记录</span>
                <span className="font-normal text-slate-400">
                  共 {problem.runs.length} 条
                </span>
                <DownOutlined
                  className={`ml-auto text-xs text-slate-400 transition-transform ${
                    runsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {runsOpen ? (
                <div className="mt-2 overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full min-w-[640px] border-collapse text-sm">
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
                        <th className="border-b border-slate-200 px-3 py-2 text-left font-semibold">
                          判据 / 审核
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {problem.runs.map((r) => (
                        <tr key={r.id} className="align-top text-slate-600">
                          <td className="border-b border-slate-100 px-3 py-2">
                            <a
                              href={runURL(repositoryUrl, r.id)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              #{r.n}
                            </a>
                          </td>
                          <td className="border-b border-slate-100 px-3 py-2">
                            <a
                              href={prURL(repositoryUrl, r.pr)}
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
                          <td className="border-b border-slate-100 px-3 py-2">
                            <CiRunRuleCell problem={problem} run={r} />
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
      ) : null}
    </div>
  );
};

const StageRecommendations: React.FC<{ problems: CiJourneyProblem[] }> = ({
  problems,
}) => {
  const recommendations = getStageRecommendations(problems);
  return (
    <section aria-label="建议" className="border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-slate-900">建议</h4>
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
          {recommendations.length} 项
        </span>
      </div>
      {recommendations.length ? (
        <ul className="mt-4 space-y-3">
          {recommendations.map(({ problem, action }) => (
            <li
              key={`${problem.dimkey}-${problemKey(problem)}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_20px_rgba(15,23,42,0.04)]"
            >
              <p className="whitespace-pre-line break-words px-4 py-4 text-sm leading-7 text-slate-800">
                {action}
              </p>
              <div className=">lg:grid-cols-2 grid gap-x-6 gap-y-2 border-t border-slate-100 bg-slate-50/60 px-4 py-3 text-xs leading-5 text-slate-600">
                <p className="min-w-0 break-words">
                  <span className="font-medium text-slate-400">关联痛点：</span>
                  {problem.title}
                </p>
                {problem.root.dest?.trim() ? (
                  <p className="min-w-0 break-words">
                    <span className="font-medium text-slate-400">执行方：</span>
                    {problem.root.dest}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-500">本步骤暂未提供建议。</p>
      )}
    </section>
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
  highlightKey?: string | null;
}> = ({ stage, repo, workflow, highlightKey }) => {
  const meta = segMeta(stage.seg);
  const problems = getStageProblems(stage);
  const observations = getStageObservations(stage);
  const recommendations = getStageRecommendations(problems);
  const [dimsOpen, setDimsOpen] = useState(true);

  return (
    <div className=">lg:h-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
      {/* 头部：icon + 标题 + 简介 + 徽章行 */}
      <div className=">md:px-5 border-b border-slate-100 bg-[linear-gradient(180deg,#fbfdff_0%,#f8fbff_100%)] px-4 py-4">
        <div className="flex items-start gap-4">
          <span
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-xl"
            style={{ color: meta.color, background: `${meta.color}12` }}
          >
            {meta.icon}
          </span>
          <div className="min-w-0">
            <div className="text-lg font-semibold text-slate-900">
              <span className="uppercase tracking-[0.12em]">{meta.code}</span>{' '}
              {stage.seg}
            </div>
            {stage.description?.trim() ? (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {stage.description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${
              stage.segscore != null
                ? 'border-fuchsia-300 bg-[linear-gradient(180deg,#fdf4ff_0%,#fae8ff_100%)] text-fuchsia-700'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <span>步骤得分</span>
            <span
              className={`text-base leading-none ${
                stage.segscore != null ? 'text-fuchsia-900' : ''
              }`}
            >
              {stage.segscore ?? '本次未评估'}
            </span>
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold ${
              problems.length
                ? 'border-rose-200 bg-rose-50 text-rose-600'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <span>痛点</span>
            <span className="text-base font-bold tabular-nums leading-none">
              {problems.length}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700">
            指标 <b className="text-base leading-none">{observations.length}</b>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            建议{' '}
            <b className="text-base leading-none">{recommendations.length}</b>
          </span>
          {stage.bare.length ? (
            <span className="inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
              <span>具体定位</span>
              <span className="break-words text-xs font-semibold text-slate-700">
                {workflow} · {stage.bare.join(' / ')}
              </span>
            </span>
          ) : null}
        </div>
      </div>

      {/* 主体 */}
      <div className=">md:p-5 space-y-6 p-4">
        <section aria-label="指标">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-semibold text-slate-900">关键指标</h4>
            <span
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600"
              title="对应卡片“指标”：本步骤实际有观测值的代表指标数"
            >
              指标 {observations.length}
            </span>
          </div>
          {observations.length ? (
            <ul className=">lg:grid-cols-3 >2xl:grid-cols-4 mt-3 grid grid-cols-2 gap-3 pb-1">
              {observations.map((observation) => (
                <li
                  key={JSON.stringify([observation.name, observation.value])}
                  className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 text-[13px] font-medium leading-5 text-slate-600">
                      {observation.name}
                    </div>
                  </div>
                  <div className="mt-2 break-words text-[22px] font-bold leading-none tracking-tight text-slate-900">
                    {observation.value}
                  </div>
                  <Tooltip title={observation.dimensions.join(' · ')}>
                    <div className="mt-3 truncate text-[12px] leading-5 text-slate-400">
                      {observation.dimensions.join(' · ')}
                    </div>
                  </Tooltip>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">
              本步骤暂无阶段指标，仓库级参考项见四维明细。
            </p>
          )}
        </section>
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
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
              {dimsOpen ? '收起' : '展开'}
              <DownOutlined
                className={`text-xs transition-transform ${
                  dimsOpen ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>
          {dimsOpen ? (
            <>
              <div className="mt-3 overflow-x-auto rounded-2xl">
                <table className="w-full min-w-[760px] border-collapse text-sm">
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
                          className={`border-b border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-500 ${
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
                      const attention = cell.word === '需处理';
                      return (
                        <tr
                          key={label}
                          className={cell.fallback ? 'bg-slate-50/50' : ''}
                        >
                          <td className="border-b border-slate-100 px-3 py-2 font-medium text-slate-700">
                            {label}
                          </td>
                          <td className="border-b border-slate-100 px-3 py-2 text-right font-semibold tabular-nums text-slate-900">
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
                                <span className="text-xs text-slate-400">
                                  该阶段无{label}日度信号
                                </span>
                                {cell.score != null ? (
                                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-500">
                                    仓库{label} {cell.score} 分 · 仅参考
                                  </span>
                                ) : null}
                              </div>
                            ) : (
                              <>
                                <span className="text-xs text-slate-400">
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
              <div className="mt-3 w-[320px] max-w-full rounded-2xl bg-slate-50 px-4 py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    {stage.trend.name}
                  </span>
                  <span className="text-xs text-slate-400">近 7 个观测日</span>
                </div>
                <div className="mt-1">
                  <StageSpark series={stage.trend.series} />
                </div>
              </div>
            </>
          ) : null}
        </div>

        <section aria-label="痛点" className="border-t border-slate-200 pt-6">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-base font-semibold text-slate-900">痛点</h4>
            <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600">
              {problems.length} 项
            </span>
          </div>
          {problems.length ? (
            <div className="mt-4 flex flex-col gap-4">
              {problems.map((p, i) => (
                <StageProblem
                  key={i}
                  problem={p}
                  repo={repo}
                  highlighted={highlightKey === problemKey(p)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-500">该步骤当日暂无痛点。</p>
          )}
        </section>
        <StageRecommendations problems={problems} />
      </div>
    </div>
  );
};

/** 跨段/未映射问题详情面板（无四维表、无趋势，仅展示问题列表） */
const UnsegDetailPanel: React.FC<{
  problems: CiJourneyProblem[];
  repo: CiRepoKey;
  highlightKey?: string | null;
}> = ({ problems, repo, highlightKey }) => (
  <div className=">lg:h-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
    <div className=">md:px-5 border-b border-slate-100 bg-[linear-gradient(180deg,#fbfdff_0%,#f8fbff_100%)] px-4 py-4">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">
          ✚
        </span>
        <div className="min-w-0">
          <div className="text-lg font-semibold text-slate-900">
            跨段/未映射
          </div>
          <p className="mt-0.5 text-sm leading-6 text-slate-500">
            跨步骤或暂未定位到具体步骤的问题。
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-sm font-semibold text-rose-600">
          <span>问题</span>
          <span className="text-base leading-none">{problems.length}</span>
        </span>
      </div>
    </div>
    <div className=">md:p-5 space-y-6 p-4">
      <section aria-label="痛点" className="border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-base font-semibold text-slate-900">痛点</h4>
          <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600">
            {problems.length} 项
          </span>
        </div>
        {problems.length ? (
          <div className="mt-4 flex flex-col gap-4">
            {problems.map((p, i) => (
              <StageProblem
                key={i}
                problem={p}
                repo={repo}
                highlighted={highlightKey === problemKey(p)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">当日无跨段/未映射问题。</p>
        )}
      </section>
      <StageRecommendations problems={problems} />
    </div>
  </div>
);

/**
 * 开发者旅程全景图：主轴=旅程段（八段横排，借鉴社区入门体验旅程全景图样式），
 * 每卡=段综合分 + 星级 + 状态词 + 段三宫格。详情区为主从式布局（对齐 Issue 体验路径总览）：
 * 左=旅程段菜单，右=段详情（四维明细 / 段趋势 / 段内问题）；顶部卡片与左菜单双向联动。
 * 内容参考 v2 设计稿；日观测板 / 周复盘切换已隐藏，默认只展示日观测板。
 */
const CiJourneyPanorama: React.FC<CiJourneyPanoramaProps> = ({
  journey,
  repo,
  workflow,
  day,
  focus,
}) => {
  const board = journey.boards[day];
  const stages = board?.stages ?? [];
  // 默认选中首个「有问题」段，其次首个「需处理」段（对齐设计稿默认落在系统测试）
  const defaultKey =
    stages.find((s) => stageProblemCount(s) > 0)?.seg ??
    stages.find((s) => stageAttention(s))?.seg ??
    stages[0]?.seg ??
    '';
  const [activeKey, setActiveKey] = useState<string>(defaultKey);
  const [detailExpanded, setDetailExpanded] = useState(true);
  const detailId = useId();
  const selectStage = (key: string) => {
    setActiveKey(key);
    setDetailExpanded(true);
  };
  // 外部跳转定位时临时高亮的问题 key
  const [highlightKey, setHighlightKey] = useState<string | null>(null);

  useEffect(() => {
    setActiveKey(defaultKey);
    setDetailExpanded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  // 响应报告概览问题行的跳转请求：切段 → 等详情渲染后滚动到同一问题 → 短暂高亮
  useEffect(() => {
    if (!focus) {
      return;
    }
    setActiveKey(focus.seg);
    setDetailExpanded(true);
    setHighlightKey(focus.probKey);
    const scrollTimer = window.setTimeout(() => {
      document
        .querySelector(`[data-prob-key="${CSS.escape(focus.probKey)}"]`)
        // block:'start' 让问题标题落在页面顶部（配合 scroll-mt 留出间距）；
        // center 对高卡会把标题顶出视口
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    const clearTimer = window.setTimeout(() => setHighlightKey(null), 2600);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.nonce]);

  const unsegProblems = board?.unsegProblems ?? [];

  const activeStage =
    activeKey === '__unseg'
      ? null
      : stages.find((s) => s.seg === activeKey) ?? stages[0] ?? null;

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <h2 className="text-base font-semibold text-slate-900">
            开发者旅程全景图
          </h2>
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
          {stages.map((stage, index) => {
            return (
              <div key={stage.seg} className="relative min-w-0">
                <StageCard
                  stage={stage}
                  active={activeKey === stage.seg}
                  onClick={() => selectStage(stage.seg)}
                />
                {index < stages.length - 1 ? (
                  <div
                    className="pointer-events-none absolute -right-7 top-0 flex h-[260px] w-4 items-center justify-center text-slate-300"
                    aria-hidden="true"
                  >
                    {/* 下一段与当前都 parallel 时，显示 ∥ */}
                    {stages[index + 1]?.parallel && stage.parallel ? (
                      <Tooltip title="报告标记为并行执行的步骤">
                        <span className="text-lg font-bold text-indigo-400">
                          ∥
                        </span>
                      </Tooltip>
                    ) : (
                      <ArrowRightOutlined className="text-base" />
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* 分隔条与社区入门报告一致；详情保留左目录、右内容布局。 */}
        <div className="mt-6">
          <button
            type="button"
            aria-expanded={detailExpanded}
            aria-controls={detailId}
            onClick={() => setDetailExpanded((value) => !value)}
            className="group flex w-full items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
            <span
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors duration-150 ${
                detailExpanded
                  ? 'border-slate-300 bg-white text-slate-700 shadow-sm'
                  : 'border-slate-200 bg-slate-100 text-slate-500'
              }`}
            >
              <span className="font-semibold">
                {activeKey === '__unseg'
                  ? '跨段/未映射'
                  : activeStage?.seg ?? '旅程详情'}
              </span>
              <span className="text-slate-400">· 任务总结与痛点</span>
              <svg
                className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 ${
                  detailExpanded ? '' : '-rotate-90'
                }`}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
          </button>

          <div
            id={detailId}
            role="region"
            aria-label="旅程步骤详情"
            hidden={!detailExpanded}
            className="mt-4"
          >
            <div className=">lg:flex-row flex flex-col gap-4">
              <div className=">lg:w-[240px] >lg:flex-none">
                <div className=">lg:sticky >lg:top-5">
                  <JourneyDirectory
                    stages={stages}
                    activeKey={activeKey}
                    unsegCount={unsegProblems.length}
                    onSelect={selectStage}
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                {activeKey === '__unseg' ? (
                  <UnsegDetailPanel
                    problems={unsegProblems}
                    repo={repo}
                    highlightKey={highlightKey}
                  />
                ) : activeStage ? (
                  <StageDetailPanel
                    stage={activeStage}
                    repo={repo}
                    workflow={workflow}
                    highlightKey={highlightKey}
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
      </div>
    </section>
  );
};

export default CiJourneyPanorama;
