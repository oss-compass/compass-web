import React, { useEffect, useRef, useState } from 'react';
import {
  AimOutlined,
  ArrowRightOutlined,
  BulbOutlined,
  DownOutlined,
  FlagOutlined,
  LinkOutlined,
  RocketOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import {
  cleanReportText,
  getPriorityTone,
  getScoreTone,
  normalizeGoal,
  stripMetricCode,
} from '../presentation';
import type {
  IssueReportPain,
  IssueReportRecommendation,
  IssueReportStage,
} from '../types';

type IssueExperiencePathProps = {
  projectName: string;
  stages: IssueReportStage[];
  pains: IssueReportPain[];
  recommendations: IssueReportRecommendation[];
  sampleSize: number;
  activeStageId: string;
  onStageChange: (stageId: string) => void;
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
  const [detailExpanded, setDetailExpanded] = useState(true);

  if (!activeStage) return null;

  const scoreTone = getScoreTone(activeStage.mixed);
  const panelVisible = Boolean(selectedStage) && detailExpanded;

  const handleCardClick = (stageId: string) => {
    if (stageId === activeStageId) {
      onStageChange('');
      return;
    }
    setDetailExpanded(true);
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

  const matchesStage = (stageId: string, stageName: string) => {
    if (stageId) return stageId === activeStage.id;
    const normalizedName = stageName.trim();
    return (
      normalizedName === activeStage.name ||
      activeStage.name.includes(normalizedName) ||
      normalizedName.includes(activeStage.name)
    );
  };
  const stagePains = pains.filter((pain) =>
    matchesStage(pain.stage_id, pain.stage_name)
  );
  const stagePainIds = new Set(stagePains.map((pain) => pain.id));
  const stageRecommendations = recommendations.filter(
    (recommendation) =>
      stagePainIds.has(recommendation.pp_id) ||
      matchesStage('', recommendation.stage_name)
  );

  return (
    <section
      id="issue-path"
      aria-labelledby="issue-path-title"
      className=">lg:scroll-mt-6 scroll-mt-20 border-slate-100 pt-5"
    >
      <div className="mb-3">
        <h2
          id="issue-path-title"
          className="text-xl font-semibold text-slate-900"
        >
          体验路径总览
        </h2>
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          点击阶段卡片展开该阶段的诊断详情（关键指标、痛点与代表 Issue）；G 为
          Bot / Agent 治理参考镜头，不计入总分。
        </p>
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
                          title="本阶段被判定存在痛点的 Issue 数，对应下方“痛点分析”"
                        >
                          <strong className="text-[20px] font-bold leading-none text-rose-500">
                            {stage.pain_count}
                          </strong>
                          <span className="mt-1 text-[14px] text-slate-400">
                            痛点
                          </span>
                        </span>
                        <span
                          className="flex flex-col items-center py-1"
                          title="本阶段代表性低分 Issue 数，对应下方“代表痛点 Issue”"
                        >
                          <strong className="text-[20px] font-bold leading-none text-sky-500">
                            {stage.low_issues.length}
                          </strong>
                          <span className="mt-1 text-[14px] text-slate-400">
                            低分
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

        <div className="mt-6">
          <button
            type="button"
            onClick={() => selectedStage && setDetailExpanded((v) => !v)}
            className={`group flex w-full items-center gap-3 text-left ${
              selectedStage ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <div className="h-px flex-1 bg-slate-200" />
            {selectedStage ? (
              <div
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors duration-150 ${
                  detailExpanded
                    ? 'border-slate-300 bg-white text-slate-700 shadow-sm'
                    : 'border-slate-200 bg-slate-100 text-slate-500'
                }`}
              >
                <span className="font-semibold">
                  {activeStage.id} · {activeStage.name}
                </span>
                <span className="text-slate-400">· 阶段诊断</span>
                <DownOutlined
                  className={`text-[10px] text-slate-400 transition-transform duration-200 ${
                    detailExpanded ? '' : '-rotate-90'
                  }`}
                />
              </div>
            ) : (
              <span className="text-base font-medium text-slate-400">
                阶段诊断
              </span>
            )}
            <div className="h-px flex-1 bg-slate-200" />
          </button>

          {panelVisible ? (
            <div
              id={`issue-stage-panel-${activeStage.id}`}
              role="tabpanel"
              aria-labelledby={`issue-stage-card-${activeStage.id}`}
              className="mt-4 overflow-hidden rounded-[24px] border border-slate-200/80 bg-[linear-gradient(180deg,#fbfdff_0%,#f8fbff_100%)]"
            >
              <div className=">md:px-5 border-b border-slate-200 bg-white px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-lg ${scoreTone.badge}`}
                    >
                      {activeStage.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-slate-900">
                          {activeStage.id} · {activeStage.name}
                        </h3>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${scoreTone.badge}`}
                        >
                          {activeStage.judgment}
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-3xl text-xs leading-5 text-slate-500">
                        {activeStage.intro}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                      阶段得分
                    </div>
                    <div
                      className={`mt-1 text-3xl font-bold ${scoreTone.text}`}
                    >
                      {activeStage.mixed}
                    </div>
                  </div>
                </div>
              </div>

              <div className=">lg:grid-cols-4 grid grid-cols-2 border-b border-slate-200 bg-white/70">
                {[
                  {
                    label: '痛点 Issue',
                    value: `${activeStage.pain_count}/${sampleSize}`,
                    note: `占比 ${activeStage.pain_pct.toFixed(1)}%`,
                    valueClass: 'text-rose-500',
                  },
                  {
                    label: '客观 / 主观',
                    value: `${activeStage.obj.toFixed(
                      1
                    )} / ${activeStage.subj.toFixed(1)}`,
                    note: '双轨评分',
                    valueClass: 'text-slate-900',
                  },
                  {
                    label: '最佳表现',
                    value: activeStage.best_metric.value,
                    note: activeStage.best_metric.name_cn,
                    valueClass: 'text-emerald-600',
                  },
                  {
                    label: '主要拖累',
                    value: activeStage.worst_metric.value,
                    note: activeStage.worst_metric.name_cn,
                    valueClass: 'text-rose-500',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className=">lg:border-b-0 border-b border-r border-slate-200 p-4 last:border-r-0"
                  >
                    <div className="text-[11px] font-medium text-slate-400">
                      {item.label}
                    </div>
                    <div
                      className={`mt-2 text-xl font-bold tabular-nums tracking-[-0.03em] ${item.valueClass}`}
                    >
                      {item.value}
                    </div>
                    <div className="mt-1 truncate text-[10px] text-slate-500">
                      {item.note}
                    </div>
                  </div>
                ))}
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
                        return (
                          <div
                            key={metric.key}
                            className="flex flex-col rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.04)]"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <span
                                  className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                    metric.kind === 'obj'
                                      ? 'bg-sky-50 text-sky-600'
                                      : 'bg-violet-50 text-violet-600'
                                  }`}
                                >
                                  {metric.kind === 'obj' ? '客观' : '主观'}
                                </span>
                                <div className="mt-1.5 truncate text-[13px] font-semibold leading-5 text-slate-700">
                                  {metric.name}
                                </div>
                              </div>
                              <span
                                className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-bold leading-none ${metricTone.badge}`}
                              >
                                {metric.score}分
                              </span>
                            </div>
                            {metric.reason ? (
                              <p className="mt-2 line-clamp-3 text-[12px] leading-5 text-slate-500">
                                {metric.reason}
                              </p>
                            ) : null}
                            <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-2 text-[10px] text-slate-400">
                              <span>中位 {metric.median}</span>
                              <span>覆盖 {metric.cover}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-base font-semibold text-slate-900">
                      痛点分析
                    </h4>
                    <span
                      className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600"
                      title="对应卡片“痛点”：本阶段被判定存在痛点的 Issue 数"
                    >
                      痛点 {activeStage.pain_count}/{sampleSize}
                    </span>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow-[0_10px_24px_rgba(245,158,11,0.08)]">
                    <div className="flex items-start gap-3 bg-[linear-gradient(180deg,#fffdf7_0%,#fff7ed_100%)] px-5 py-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <WarningOutlined className="text-sm" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-700">
                          核心问题
                        </div>
                        <p className="mt-1 text-[15px] font-medium leading-7 text-slate-800">
                          {activeStage.core_problem}
                        </p>
                      </div>
                    </div>
                    {activeStage.root_cause ? (
                      <div className="flex items-start gap-3 border-t border-amber-100 px-5 py-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                          <BulbOutlined className="text-sm" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                            根因判断
                          </div>
                          <p className="mt-1 text-[13px] leading-6 text-slate-600">
                            {activeStage.root_cause}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {stagePains.length || stageRecommendations.length ? (
                  <div className="border-t border-slate-200 pt-6">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h4 className="text-base font-semibold text-slate-900">
                          阶段改进闭环
                        </h4>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          将本阶段的主要问题与可执行行动放在一起，便于从诊断直接进入改进。
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold">
                        <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-rose-600">
                          {stagePains.length} 个问题
                        </span>
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                          {stageRecommendations.length} 项行动
                        </span>
                      </div>
                    </div>

                    <div
                      className={`mt-4 grid grid-cols-1 gap-4 ${
                        stagePains.length && stageRecommendations.length
                          ? '>xl:grid-cols-2'
                          : ''
                      }`}
                    >
                      {stagePains.length ? (
                        <div className="overflow-hidden rounded-2xl border border-rose-200/70 bg-white">
                          <div className="flex items-center gap-2 border-b border-rose-100 bg-rose-50/70 px-4 py-3">
                            <FlagOutlined className="text-rose-500" />
                            <span className="text-sm font-semibold text-slate-800">
                              主要问题
                            </span>
                          </div>
                          <div className="divide-y divide-slate-100">
                            {stagePains.map((pain) => {
                              const tone = getPriorityTone(pain.prio);
                              return (
                                <article key={pain.id} className="p-4">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span
                                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${tone.badge}`}
                                    >
                                      {pain.prio}
                                    </span>
                                    <span className="font-mono text-[11px] font-semibold text-slate-400">
                                      {pain.id}
                                    </span>
                                    <span className="text-[10px] text-slate-400">
                                      {pain.state}
                                    </span>
                                  </div>
                                  <h5 className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                                    {pain.title}
                                  </h5>
                                  <div className="mt-3 grid gap-2 text-xs leading-5">
                                    <p className="rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
                                      <span className="font-semibold text-slate-400">
                                        关键证据 ·{' '}
                                      </span>
                                      {pain.evidence}
                                    </p>
                                    <p className="px-1 text-slate-600">
                                      <span className="font-semibold text-slate-400">
                                        体验影响 ·{' '}
                                      </span>
                                      {pain.impact}
                                    </p>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}

                      {stageRecommendations.length ? (
                        <div className="overflow-hidden rounded-2xl border border-emerald-200/70 bg-white">
                          <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50/70 px-4 py-3">
                            <RocketOutlined className="text-emerald-600" />
                            <span className="text-sm font-semibold text-slate-800">
                              本周行动清单
                            </span>
                          </div>
                          <div className="divide-y divide-slate-100">
                            {stageRecommendations.map((recommendation) => {
                              const tone = getPriorityTone(recommendation.prio);
                              return (
                                <article
                                  key={recommendation.id}
                                  className="p-4"
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
                                    <span>
                                      {normalizeGoal(recommendation.goal)}
                                    </span>
                                  </p>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>

              {activeStage.low_issues.length ? (
                <div className=">md:p-5 border-t border-slate-200 bg-white/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-base font-semibold text-slate-900">
                      代表痛点 Issue
                    </h4>
                    <span
                      className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-600"
                      title="对应卡片“低分”：本阶段代表性低分 Issue 数"
                    >
                      低分 {activeStage.low_issues.length}
                      {activeStage.low_issues.length > 3
                        ? '（展示前 3 条）'
                        : ''}
                    </span>
                  </div>
                  <div className=">md:grid-cols-3 mt-3 grid gap-3">
                    {activeStage.low_issues.slice(0, 3).map((issue) => (
                      <a
                        key={issue.url}
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-w-0 items-start gap-2 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_10px_20px_rgba(15,23,42,0.04)] transition-colors hover:border-sky-200 hover:bg-sky-50/40"
                      >
                        <LinkOutlined className="mt-0.5 shrink-0 text-slate-400 group-hover:text-sky-600" />
                        <span className="min-w-0">
                          <span className="block text-[11px] font-semibold text-slate-500">
                            {issue.no} · {issue.score} 分
                          </span>
                          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-700">
                            {issue.title}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default IssueExperiencePath;
