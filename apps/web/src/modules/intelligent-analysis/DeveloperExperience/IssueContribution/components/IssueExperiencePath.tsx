import React, { useEffect, useRef, useState } from 'react';
import {
  AimOutlined,
  ArrowRightOutlined,
  BulbOutlined,
  DownOutlined,
  FlagOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  RocketOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Popover } from 'antd';
import {
  cleanReportText,
  getPriorityTone,
  getScoreTone,
  normalizeGoal,
  stripMetricCode,
} from '../presentation';
import { getMetricDefinition } from '../metricDefinitions';
import type { MetricDefinition } from '../metricDefinitions';
import type {
  IssueReportPain,
  IssueReportRecommendation,
  IssueReportStage,
} from '../types';
import HintIcon from './HintIcon';
import IssueStageDirectory from './IssueStageDirectory';

type IssueExperiencePathProps = {
  projectName: string;
  stages: IssueReportStage[];
  pains: IssueReportPain[];
  recommendations: IssueReportRecommendation[];
  sampleSize: number;
  activeStageId: string;
  onStageChange: (stageId: string) => void;
};

const EVIDENCE_TYPE_META: Record<string, { label: string; cls: string }> = {
  open: { label: '创建', cls: 'bg-sky-50 text-sky-600' },
  comment: { label: '评论', cls: 'bg-slate-100 text-slate-600' },
  assign: { label: '指派', cls: 'bg-violet-50 text-violet-600' },
  label: { label: '打标', cls: 'bg-amber-50 text-amber-600' },
  close: { label: '关闭', cls: 'bg-rose-50 text-rose-600' },
  reopen: { label: '重开', cls: 'bg-emerald-50 text-emerald-600' },
  pr: { label: '关联 PR', cls: 'bg-indigo-50 text-indigo-600' },
};

const getEvidenceMeta = (type: string) =>
  EVIDENCE_TYPE_META[type] ?? {
    label: type || '动作',
    cls: 'bg-slate-100 text-slate-500',
  };

/**
 * 关键指标卡片 hover 浮窗内容：展示「指标含义」文字 + 「算分算法」评分表。
 * 表格分数列复用 getScoreTone 着色，与卡片评分徽章保持一致视觉语言。
 */
const MetricDefinitionContent: React.FC<{
  name: string;
  definition: MetricDefinition;
}> = ({ name, definition }) => (
  <div className="w-[480px] max-w-[86vw]">
    <div className="text-[13px] font-semibold text-slate-900">{name}</div>
    <div className="mt-2">
      <div className="text-[11px] font-semibold text-slate-400">指标含义</div>
      <p className="mt-1 text-[12px] leading-5 text-slate-600">
        {definition.meaning}
      </p>
    </div>
    <div className="mt-3">
      <div className="text-[11px] font-semibold text-slate-400">算分算法</div>
      <div className="mt-1.5 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full border-collapse text-[12px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-[52px] border-b border-slate-200 px-2 py-1.5 text-center text-[11px] font-semibold text-slate-500">
                分数
              </th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-left text-[11px] font-semibold text-slate-500">
                判定条件
              </th>
            </tr>
          </thead>
          <tbody>
            {definition.rubric.map((row) => {
              const rowTone = getScoreTone(row.score);
              return (
                <tr key={row.score} className="align-top">
                  <td className="border-b border-slate-100 px-2 py-1.5 text-center">
                    <span
                      className={`inline-flex rounded-full border px-1.5 py-0.5 text-[11px] font-bold leading-none ${rowTone.badge}`}
                    >
                      {row.score}
                    </span>
                  </td>
                  <td className="border-b border-slate-100 px-2 py-1.5 leading-5 text-slate-600">
                    {row.condition}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/**
 * 单个痛点卡：可展开查看关键证据、体验影响，以及涉及的具体 Issue 明细表
 *（对齐 CI 报告「问题定位」中每个问题以表格展示关联记录的形式）。
 */
const StagePainCard: React.FC<{ pain: IssueReportPain }> = ({ pain }) => {
  const tone = getPriorityTone(pain.prio);
  const issues = pain.low_score_issues ?? [];
  const [open, setOpen] = useState(true);

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
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${tone.badge}`}
            >
              {pain.prio}
            </span>
            <span className="font-mono text-[11px] font-semibold text-slate-400">
              {pain.id}
            </span>
            {pain.state ? (
              <span className="text-[10px] text-slate-400">{pain.state}</span>
            ) : null}
            {issues.length ? (
              <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-600">
                {issues.length} 个 Issue
              </span>
            ) : null}
          </span>
          <span className="mt-2 block text-sm font-semibold leading-6 text-slate-900">
            {pain.title}
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
          <div className="grid gap-2 text-xs leading-5">
            <p className="rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
              <span className="font-semibold text-slate-400">关键证据 · </span>
              {pain.evidence}
            </p>
            <p className="px-1 text-slate-600">
              <span className="font-semibold text-slate-400">体验影响 · </span>
              {pain.impact}
            </p>
          </div>

          {issues.length ? (
            <div className="mt-3">
              <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-slate-500">
                <FlagOutlined className="text-rose-400" />
                涉及 Issue 明细 · {issues.length} 个
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[720px] border-collapse text-[12px]">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="w-[220px] border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                        Issue
                      </th>
                      <th className="w-[56px] border-b border-slate-200 px-3 py-2 text-center text-[11px] font-semibold text-slate-500">
                        得分
                      </th>
                      <th className="w-[220px] border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                        低分原因
                      </th>
                      <th className="border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                        原文依据
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue) => {
                      const issueTone = getScoreTone(issue.score);
                      return (
                        <tr key={issue.number} className="align-top">
                          <td className="border-b border-slate-100 px-3 py-2.5">
                            <a
                              href={issue.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                            >
                              <LinkOutlined className="text-[11px]" />#
                              {issue.number}
                            </a>
                            <div className="mt-1 leading-5 text-slate-600">
                              {issue.title}
                            </div>
                          </td>
                          <td className="border-b border-slate-100 px-3 py-2.5 text-center">
                            <span
                              className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold ${issueTone.badge}`}
                            >
                              {issue.score}
                            </span>
                          </td>
                          <td className="border-b border-slate-100 px-3 py-2.5 leading-5 text-slate-600">
                            {issue.reason}
                          </td>
                          <td className="border-b border-slate-100 px-3 py-2.5">
                            {issue.evidence.length ? (
                              <ul className="space-y-1">
                                {issue.evidence.map((ev, i) => {
                                  const meta = getEvidenceMeta(ev.type);
                                  return (
                                    <li
                                      key={`${ev.type}-${i}`}
                                      className="flex items-start gap-1.5"
                                    >
                                      <span
                                        className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${meta.cls}`}
                                      >
                                        {meta.label}
                                      </span>
                                      <span className="min-w-0 leading-5 text-slate-600">
                                        {ev.actor ? (
                                          <span className="font-medium text-slate-500">
                                            {ev.actor}：
                                          </span>
                                        ) : null}
                                        {ev.url ? (
                                          <a
                                            href={ev.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                          >
                                            {ev.text}
                                          </a>
                                        ) : (
                                          ev.text
                                        )}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const IssueExperiencePath: React.FC<IssueExperiencePathProps> = ({
  projectName,
  stages,
  pains,
  recommendations,
  sampleSize,
  activeStageId,
  onStageChange,
}) => {
  const selectedStage = stages.find((stage) => stage.id === activeStageId);
  const activeStage = selectedStage ?? stages[0];
  const stageScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeStageId) return;
    const container = stageScrollRef.current;
    const card = document.getElementById(`issue-stage-card-${activeStageId}`);
    if (!container || !card) return;
    // 仅在横向滚动容器内居中激活卡片，避免驱动整页纵向滚动导致进入页面不在顶部
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta =
      cardRect.left -
      containerRect.left -
      (container.clientWidth - card.clientWidth) / 2;
    container.scrollBy({ left: delta });
  }, [activeStageId]);

  const [metricsOpen, setMetricsOpen] = useState(true);

  if (!activeStage) return null;

  const scoreTone = getScoreTone(activeStage.mixed);

  const handleCardClick = (stageId: string) => {
    onStageChange(stageId);
  };

  const stageMetrics = [
    ...activeStage.metrics_obj.map((metric) => ({
      key: `obj-${metric.code}`,
      kind: 'obj' as const,
      name: metric.name_cn,
      code: metric.code,
      score: metric.mean,
      median: metric.median,
      cover: metric.cover,
      reason: stripMetricCode(metric.evidence ?? ''),
    })),
    ...activeStage.metrics_sub.map((metric) => ({
      key: `sub-${metric.code}`,
      kind: 'sub' as const,
      name: metric.name_cn,
      code: metric.code,
      score: metric.mean,
      median: metric.median,
      cover: metric.cover,
      reason: stripMetricCode(metric.main_reason ?? ''),
    })),
  ];

  const matchesStage = (
    stage: IssueReportStage,
    stageId: string,
    stageName: string
  ) => {
    if (stageId) return stageId === stage.id;
    const normalizedName = stageName.trim();
    return (
      normalizedName === stage.name ||
      stage.name.includes(normalizedName) ||
      normalizedName.includes(stage.name)
    );
  };
  const getStagePains = (stage: IssueReportStage) =>
    pains.filter((pain) => matchesStage(stage, pain.stage_id, pain.stage_name));
  const getStageRecommendations = (
    stage: IssueReportStage,
    matchedPains: IssueReportPain[]
  ) => {
    const painIds = new Set(matchedPains.map((pain) => pain.id));
    return recommendations.filter(
      (recommendation) =>
        painIds.has(recommendation.pp_id) ||
        matchesStage(stage, '', recommendation.stage_name)
    );
  };
  const stagePains = getStagePains(activeStage);
  const stageRecommendations = getStageRecommendations(activeStage, stagePains);

  return (
    <section
      id="issue-path"
      aria-labelledby="issue-path-title"
      className=">lg:scroll-mt-6 scroll-mt-20 border-slate-100 pt-5"
    >
      <div className="mb-3">
        <div className="flex items-center gap-1.5">
          <h2
            id="issue-path-title"
            className="text-xl font-semibold text-slate-900"
          >
            体验路径总览
          </h2>
          <HintIcon title="点击阶段卡片展开该阶段的诊断详情（关键指标、痛点及其涉及的 Issue 明细、行动清单）；G 为 Bot / Agent 治理参考镜头，不计入总分。" />
        </div>
      </div>

      <div className=">md:px-6 rounded-[28px] border border-slate-200 bg-white px-4 py-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="text-center text-lg font-semibold text-slate-900">
            {projectName}
          </div>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div
          ref={stageScrollRef}
          className="mt-6 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin]"
        >
          <div
            role="tablist"
            aria-label="Issue 贡献体验阶段"
            className="flex w-max min-w-full items-stretch justify-center gap-1 px-2"
          >
            {stages.map((stage, index) => {
              const active = stage.id === activeStageId;
              const cardPains = getStagePains(stage);
              const recommendationCount = getStageRecommendations(
                stage,
                cardPains
              ).length;
              const tone = getScoreTone(stage.mixed);
              const cardTone = stage.is_lens
                ? 'border-dashed border-slate-300 bg-slate-50/80'
                : stage.mixed >= 80
                ? 'border-emerald-200 bg-emerald-50/20'
                : stage.mixed >= 60
                ? 'border-amber-200 bg-amber-50/20'
                : 'border-rose-200 bg-rose-50/20';
              return (
                <React.Fragment key={stage.id}>
                  <button
                    id={`issue-stage-card-${stage.id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`issue-stage-panel-${stage.id}`}
                    onClick={() => handleCardClick(stage.id)}
                    className={`flex h-[260px] w-[208px] flex-none cursor-pointer flex-col rounded-[20px] border px-4 pb-3 pt-4 text-left shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${cardTone} ${
                      active
                        ? 'ring-2 ring-violet-400'
                        : 'hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.10)]'
                    }`}
                  >
                    <div className="flex min-h-[40px] items-center justify-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-base ${tone.badge}`}
                      >
                        {stage.icon || index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                          {stage.is_lens ? '参考镜头' : stage.id}
                        </span>
                        <span className="block truncate text-[17px] font-semibold text-slate-900">
                          {stage.name}
                        </span>
                      </span>
                    </div>

                    <div className="mt-3 text-center text-[19px] font-semibold leading-none tracking-[0.18em] text-amber-500">
                      {stage.stars}
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-[28px] font-semibold leading-none text-slate-900">
                        {stage.mixed}
                      </span>
                      <span className="ml-1 text-xs font-medium text-slate-500">
                        分
                      </span>
                    </div>

                    <div className="mt-3 flex flex-1 flex-col rounded-2xl border border-slate-200/70 bg-white/80 px-2 py-1.5">
                      <div className="truncate text-center text-sm font-semibold text-slate-600">
                        {stage.judgment}
                      </div>
                      <div className="mt-2 grid grid-cols-3">
                        <span
                          className="flex flex-col items-center py-1"
                          title="本阶段评估的指标数量（客观 + 主观），对应下方“关键指标”"
                        >
                          <strong className="text-[20px] font-bold leading-none text-slate-900">
                            {stage.metrics_obj.length +
                              stage.metrics_sub.length}
                          </strong>
                          <span className="mt-1 text-[14px] text-slate-400">
                            指标
                          </span>
                        </span>
                        <span
                          className="flex flex-col items-center py-1"
                          title="本阶段主要问题的痛点数量，对应下方“痛点”"
                        >
                          <strong className="text-[20px] font-bold leading-none text-rose-500">
                            {cardPains.length}
                          </strong>
                          <span className="mt-1 text-[14px] text-slate-400">
                            痛点
                          </span>
                        </span>
                        <span
                          className="flex flex-col items-center py-1"
                          title="本阶段关联的改进建议数量，对应下方“本周行动清单”"
                        >
                          <strong className="text-[20px] font-bold leading-none text-emerald-600">
                            {recommendationCount}
                          </strong>
                          <span className="mt-1 text-[14px] text-slate-400">
                            建议
                          </span>
                        </span>
                      </div>
                    </div>
                  </button>

                  {index < stages.length - 1 ? (
                    <span className="flex h-[260px] flex-none items-center px-1 text-slate-300">
                      <ArrowRightOutlined className="text-base" />
                    </span>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className=">md:p-4 mt-6 rounded-[24px] border border-slate-200 bg-slate-50/70 p-3">
          <div className="flex flex-col gap-4 >lg:flex-row">
          <div className=">lg:w-[240px] >lg:flex-none">
            <div className=">lg:sticky >lg:top-5">
              <IssueStageDirectory
                stages={stages}
                activeStageId={activeStageId}
                onStageChange={onStageChange}
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div
              id={`issue-stage-panel-${activeStage.id}`}
              role="tabpanel"
              aria-labelledby={`issue-stage-card-${activeStage.id}`}
              className=">lg:h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            >
              <div className=">md:px-5 border-b border-slate-100 px-4 py-4">
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border text-xl ${scoreTone.badge}`}
                  >
                    {activeStage.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold text-slate-900">
                      {activeStage.id} {activeStage.name}
                    </div>
                    <p className="mt-0.5 text-sm leading-6 text-slate-500">
                      {activeStage.intro}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${scoreTone.badge}`}
                  >
                    <span>阶段得分</span>
                    <span className="text-base leading-none">
                      {activeStage.mixed}
                    </span>
                  </span>
                  {[
                    {
                      label: '痛点 Issue',
                      value: `${activeStage.pain_count}/${sampleSize}`,
                      badgeClass: 'bg-rose-50 text-rose-600',
                    },
                    {
                      label: '客观 / 主观',
                      value: `${activeStage.obj.toFixed(
                        1
                      )} / ${activeStage.subj.toFixed(1)}`,
                      badgeClass: 'bg-slate-100 text-slate-700',
                    },
                    {
                      label: '最佳表现',
                      value: activeStage.best_metric.value,
                      badgeClass: 'bg-emerald-50 text-emerald-700',
                    },
                    {
                      label: '主要拖累',
                      value: activeStage.worst_metric.value,
                      badgeClass: 'bg-rose-50 text-rose-600',
                    },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm"
                    >
                      <span className="font-medium text-slate-600">
                        {item.label}
                      </span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold leading-none tabular-nums ${item.badgeClass}`}
                      >
                        {item.value}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className=">md:p-5 space-y-6 p-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setMetricsOpen((open) => !open)}
                    aria-expanded={metricsOpen}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-semibold text-slate-900">
                        关键指标
                      </h4>
                      <span
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600"
                        title="对应卡片“指标”：本阶段评估的指标总数"
                      >
                        指标{' '}
                        {activeStage.metrics_obj.length +
                          activeStage.metrics_sub.length}
                        <span className="font-normal text-slate-400">
                          （客观 {activeStage.metrics_obj.length} · 主观{' '}
                          {activeStage.metrics_sub.length}）
                        </span>
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-slate-400">
                      {metricsOpen ? '收起' : '展开'}
                      <DownOutlined
                        className={`text-[10px] transition-transform ${
                          metricsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>
                  {metricsOpen ? (
                    <div className=">lg:grid-cols-3 >2xl:grid-cols-4 mt-3 grid grid-cols-2 gap-3">
                      {stageMetrics.map((metric) => {
                        const metricTone = getScoreTone(metric.score);
                        const metricDef = getMetricDefinition(metric.code);
                        const card = (
                          <div
                            className={`flex h-full flex-col rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.04)] ${
                              metricDef
                                ? 'cursor-help transition-shadow hover:border-slate-300 hover:shadow-[0_12px_26px_rgba(15,23,42,0.08)]'
                                : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex min-w-0 items-center gap-1.5">
                                <span className="truncate text-[13px] font-semibold leading-5 text-slate-700">
                                  {metric.name}
                                </span>
                                <span
                                  className={`inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                    metric.kind === 'obj'
                                      ? 'bg-sky-50 text-sky-600'
                                      : 'bg-violet-50 text-violet-600'
                                  }`}
                                >
                                  {metric.kind === 'obj' ? '客观' : '主观'}
                                </span>
                                {metricDef ? (
                                  <InfoCircleOutlined className="shrink-0 text-[11px] text-slate-300" />
                                ) : null}
                              </div>
                              <span
                                className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-bold leading-none ${metricTone.badge}`}
                              >
                                {metric.score}分
                              </span>
                            </div>
                            {metricDef?.meaning || metric.reason ? (
                              <p className="mt-2 line-clamp-3 text-[12px] leading-5 text-slate-500">
                                {metricDef?.meaning || metric.reason}
                              </p>
                            ) : null}
                            <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-2 text-[10px] text-slate-400">
                              <span>中位 {metric.median}</span>
                              <span>覆盖 {metric.cover}</span>
                            </div>
                          </div>
                        );
                        if (!metricDef) {
                          return (
                            <div key={metric.key} className="flex">
                              {card}
                            </div>
                          );
                        }
                        return (
                          <Popover
                            key={metric.key}
                            trigger="hover"
                            placement="top"
                            mouseEnterDelay={0.15}
                            content={
                              <MetricDefinitionContent
                                name={metric.name}
                                definition={metricDef}
                              />
                            }
                          >
                            <div className="flex">{card}</div>
                          </Popover>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                {stagePains.length ? (
                  <div className="border-t border-slate-200 pt-6">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                        <FlagOutlined className="text-rose-500" />
                        <h4 className="text-base font-semibold text-slate-900">
                          痛点
                        </h4>
                        <HintIcon title="本阶段的主要问题及其涉及的具体 Issue 明细，点击卡片可展开查看关联 Issue 的低分原因与原文依据。" />
                      </div>
                      <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600">
                        {stagePains.length} 个问题
                      </span>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-xl border border-amber-200/70 bg-white shadow-[0_6px_16px_rgba(245,158,11,0.06)]">
                      <div className="flex items-start gap-2.5 bg-[linear-gradient(180deg,#fffdf7_0%,#fff7ed_100%)] px-3.5 py-2.5">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-600">
                          <WarningOutlined className="text-[12px]" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-700">
                            核心问题
                          </div>
                          <p className="mt-0.5 text-[13px] leading-6 text-slate-800">
                            {activeStage.core_problem}
                          </p>
                        </div>
                      </div>
                      {activeStage.root_cause ? (
                        <div className="flex items-start gap-2.5 border-t border-amber-100 px-3.5 py-2.5">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                            <BulbOutlined className="text-[12px]" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                              根因判断
                            </div>
                            <p className="mt-0.5 text-[12px] leading-5 text-slate-600">
                              {activeStage.root_cause}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-4 flex flex-col gap-4">
                      {stagePains.map((pain) => (
                        <StagePainCard key={pain.id} pain={pain} />
                      ))}
                    </div>
                  </div>
                ) : null}

                {stageRecommendations.length ? (
                  <div className="border-t border-slate-200 pt-6">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                        <RocketOutlined className="text-emerald-600" />
                        <h4 className="text-base font-semibold text-slate-900">
                          本周行动清单
                        </h4>
                        <HintIcon title="针对本阶段痛点的可执行改进建议，便于从诊断直接进入改进。" />
                      </div>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                        {stageRecommendations.length} 项行动
                      </span>
                    </div>

                    <div className=">xl:grid-cols-2 mt-4 grid grid-cols-1 gap-4">
                      {stageRecommendations.map((recommendation) => {
                        const tone = getPriorityTone(recommendation.prio);
                        return (
                          <article
                            key={recommendation.id}
                            className="overflow-hidden rounded-2xl border border-emerald-200/70 bg-white p-4"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${tone.badge}`}
                              >
                                {recommendation.prio}
                              </span>
                              <span className="font-mono text-[11px] font-semibold text-emerald-600">
                                {recommendation.id}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                对应 {recommendation.pp_id}
                              </span>
                            </div>
                            <h5 className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                              {recommendation.action_title}
                            </h5>
                            <p className="mt-1 text-xs leading-5 text-slate-600">
                              {cleanReportText(recommendation.action)}
                            </p>
                            <div className="mt-3 rounded-xl bg-emerald-50/60 px-3 py-2 text-[11px] leading-5 text-slate-600">
                              <div>
                                <span className="font-semibold text-slate-400">
                                  承接 ·{' '}
                                </span>
                                {recommendation.owner_team}
                                {recommendation.owner_candidate
                                  ? ` / 候选 ${recommendation.owner_candidate}`
                                  : ''}
                              </div>
                              <div>
                                <span className="font-semibold text-slate-400">
                                  触发 ·{' '}
                                </span>
                                {recommendation.trigger}
                              </div>
                            </div>
                            <p className="mt-2 flex items-start gap-1.5 text-[11px] font-medium leading-5 text-slate-600">
                              <AimOutlined className="mt-1 shrink-0 text-emerald-600" />
                              <span>{normalizeGoal(recommendation.goal)}</span>
                            </p>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default IssueExperiencePath;
