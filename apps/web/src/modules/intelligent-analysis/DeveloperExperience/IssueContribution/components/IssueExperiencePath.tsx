import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRightOutlined,
  DownOutlined,
  FlagOutlined,
  LinkOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Pagination, Popover, Tooltip } from 'antd';
import {
  getPriorityTone,
  getPriorityLabel,
  getScoreTone,
  stripMetricCode,
} from '../presentation';
import { getMetricCategory, getMetricDefinition } from '../metricDefinitions';
import type { MetricDefinition } from '../metricDefinitions';
import type {
  IssuePainTracking,
  IssuePainTrackingActionPayload,
  IssueReportPain,
  IssueReportRecommendation,
  IssueReportStage,
  IssueScoreRow,
  IssueScoreRowStageDetail,
} from '../types';
import { IssuePainTrackingStatus } from '../types';
import PainTrackingModal, {
  IssueFixButton,
  TrackingActionButton,
  TrackingProgress,
} from './PainTrackingModal';
import HintIcon from './HintIcon';
import PainIssueTable from './PainIssueTable';
import IssueStageDirectory from './IssueStageDirectory';

type IssueExperiencePathProps = {
  projectName: string;
  stages: IssueReportStage[];
  pains: IssueReportPain[];
  recommendations: IssueReportRecommendation[];
  issueScoreRows?: IssueScoreRow[];
  sampleSize: number;
  activeStageId: string;
  focusPainId?: string;
  onStageChange: (stageId: string) => void;
  trackingByPain?: Map<string, IssuePainTracking>;
  onTrackingAction?: (
    payload: Omit<IssuePainTrackingActionPayload, 'community'>
  ) => Promise<IssuePainTracking>;
};

const normalizePainMetricCode = (value: string) =>
  value
    .trim()
    .replace(/[-\s]+/g, '_')
    .toUpperCase();

/**
 * 关键指标卡片 hover 浮窗内容：展示「指标含义」文字 + 「算分算法」评分表。
 * 表格分数列复用 getScoreTone 着色，与卡片评分徽章保持一致视觉语言。
 */
const MetricDefinitionContent: React.FC<{
  name: string;
  definition: MetricDefinition;
}> = ({ name, definition }) => (
  <div className="max-h-[70vh] w-[480px] max-w-[86vw] overflow-y-auto overscroll-contain">
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

const STAGE_SCORE_PAGE_SIZE = 10;

/** 判断某 Issue 在当前阶段是否被标记为痛点（pain_stages 形如「I2、I3、G」） */
const isPainInStage = (painStages: string, stageId: string) =>
  painStages
    .split(/[、,，\s]+/)
    .filter(Boolean)
    .includes(stageId);

type StageScoreEntry = {
  row: IssueScoreRow;
  detail: IssueScoreRowStageDetail;
  score: number;
};

/** 未评估阶段的中性灰色调（无分数时不借用任何红/黄/绿语义） */
const NOT_EVALUATED_TONE = {
  badge: 'border-slate-200 bg-slate-50 text-slate-400',
  bar: 'bg-slate-300',
  text: 'text-slate-400',
};

/**
 * 阶段是否有有效评估结果：v4 部分阶段可能无样本，
 * 混合分为空且无任何指标数据，此时卡片/面板需按「本次未评估」展示。
 */
const isStageEvaluated = (stage: IssueReportStage) =>
  Number.isFinite(Number.parseFloat(String(stage.mixed ?? ''))) &&
  (stage.metrics_obj.length > 0 || stage.metrics_sub.length > 0);

/** 未评估提示块：对齐 CI 旅程全景图「本次未评估」样式（虚线圈 + 灰字） */
const NotEvaluatedHint: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center gap-2 py-8 ${className}`}
  >
    <svg
      className="h-7 w-7 text-slate-300"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
      <path
        d="M9 12h6M12 9v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
    <span className="text-center text-base leading-4 text-slate-400">
      本次未评估
    </span>
    <span className="text-center text-xs leading-4 text-slate-400">
      本周期内无样本进入该阶段，无得分与指标数据
    </span>
  </div>
);

/**
 * 全部 Issue 得分区块：展示当前阶段所有参与评分的 Issue，按本阶段得分
 * 从低到高排序；默认收起，展开后表格按 10 条一页分页，指标得分 tag 化
 * 展示并支持悬停查看原因，避免 Issue 数量多时面板过长。
 */
const StageIssueScoreSection: React.FC<{
  stageId: string;
  entries: StageScoreEntry[];
}> = ({ stageId, entries }) => {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  // 报告版本切换等场景会整体替换 entries，但父级 key 只含 stageId，
  // 组件不会重挂载；数据变化时必须回到第 1 页，
  // 否则旧页码可能越界渲染出空表格（且数据变少时分页器一并消失）
  const entriesKey = entries.map((entry) => entry.row.number).join(',');
  useEffect(() => {
    setPage(1);
  }, [entriesKey]);
  const lowCount = entries.filter((entry) => entry.score < 60).length;
  const visibleEntries = entries.slice(
    (page - 1) * STAGE_SCORE_PAGE_SIZE,
    page * STAGE_SCORE_PAGE_SIZE
  );

  return (
    <div className="border-t border-slate-200 pt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="flex flex-wrap items-center gap-2">
          <ProfileOutlined className="text-sky-500" />
          <h4 className="text-base font-semibold text-slate-900">
            全部 Issue 得分
          </h4>
          <HintIcon title="本阶段所有参与评分的 Issue 及其指标得分明细，按本阶段得分从低到高排列，每页 10 条；悬停指标标签可查看评分原因。" />
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-600">
            {entries.length} 个 Issue
          </span>
          {lowCount ? (
            <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600">
              低于 60 分 {lowCount} 个
            </span>
          ) : null}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-slate-400">
          {open ? '收起' : '展开'}
          <DownOutlined
            className={`text-[10px] transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {open ? (
        <>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[760px] border-collapse text-[12px]">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="w-[250px] border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                    Issue
                  </th>
                  <th className="w-[88px] border-b border-slate-200 px-3 py-2 text-center text-[11px] font-semibold text-slate-500">
                    本阶段得分
                  </th>
                  <th className="w-[96px] border-b border-slate-200 px-3 py-2 text-center text-[11px] font-semibold text-slate-500">
                    综合得分
                  </th>
                  <th className="border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
                    指标得分（悬停查看原因）
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleEntries.map(({ row, detail, score }) => {
                  const stageTone = getScoreTone(score);
                  // v4 无效样本 overall 为字符串（如「无效」），统一安全转数
                  const overallScore = Number.parseFloat(String(row.overall));
                  const overallTone = Number.isFinite(overallScore)
                    ? getScoreTone(overallScore)
                    : null;
                  const pained = isPainInStage(row.pain_stages, stageId);
                  return (
                    <tr key={row.number} className="align-top">
                      <td className="border-b border-slate-100 px-3 py-2.5">
                        <span className="flex flex-wrap items-center gap-1.5">
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                          >
                            <LinkOutlined className="text-[11px]" />#
                            {row.number}
                          </a>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                              row.state === 'closed'
                                ? 'bg-slate-100 text-slate-500'
                                : 'bg-emerald-50 text-emerald-600'
                            }`}
                          >
                            {row.state}
                          </span>
                          {pained ? (
                            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600">
                              痛点
                            </span>
                          ) : null}
                        </span>
                        <div className="mt-1 leading-5 text-slate-600">
                          {row.title}
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2.5 text-center">
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold tabular-nums ${stageTone.badge}`}
                        >
                          {detail.stage_score}
                        </span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2.5 text-center">
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                            overallTone
                              ? overallTone.badge
                              : 'border-dashed border-slate-200 bg-slate-50 text-slate-400'
                          }`}
                        >
                          {row.overall}
                        </span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-2.5">
                        <div className="flex flex-wrap gap-1.5">
                          {detail.metrics.map((metric) => {
                            const metricScore = Number.parseFloat(metric.score);
                            const metricTone = Number.isFinite(metricScore)
                              ? getScoreTone(metricScore)
                              : null;
                            const hasReason =
                              Boolean(metric.reason) && metric.reason !== '—';
                            const tag = (
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] ${
                                  hasReason
                                    ? 'cursor-help transition-colors hover:border-slate-300 hover:bg-slate-50'
                                    : ''
                                }`}
                              >
                                <span className="font-medium text-slate-500">
                                  {metric.name_cn}
                                </span>
                                <span
                                  className={`rounded-full border px-1.5 py-0.5 text-[10px] font-bold tabular-nums leading-none ${
                                    metricTone
                                      ? metricTone.badge
                                      : 'border-slate-200 bg-slate-50 text-slate-400'
                                  }`}
                                >
                                  {metric.score}
                                </span>
                              </span>
                            );
                            if (!hasReason) {
                              return (
                                <React.Fragment key={metric.code}>
                                  {tag}
                                </React.Fragment>
                              );
                            }
                            return (
                              <Popover
                                key={metric.code}
                                trigger="hover"
                                placement="top"
                                mouseEnterDelay={0.15}
                                content={
                                  <div className="max-h-[60vh] w-[320px] max-w-[80vw] overflow-y-auto overscroll-contain">
                                    <div className="text-[12px] font-semibold text-slate-900">
                                      {metric.name_cn} · {metric.score} 分
                                    </div>
                                    <p className="mt-1 text-[12px] leading-5 text-slate-600">
                                      {metric.reason}
                                    </p>
                                  </div>
                                }
                              >
                                {tag}
                              </Popover>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {entries.length > STAGE_SCORE_PAGE_SIZE ? (
            <div className="mt-3 flex justify-end">
              <Pagination
                size="small"
                current={page}
                pageSize={STAGE_SCORE_PAGE_SIZE}
                total={entries.length}
                showSizeChanger={false}
                onChange={setPage}
              />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

/**
 * 单个痛点卡：可展开查看关键证据、体验影响，以及涉及的具体 Issue 明细表
 *（对齐 CI 报告「问题定位」中每个问题以表格展示关联记录的形式）。
 */
const StagePainCard: React.FC<{
  pain: IssueReportPain;
  focused?: boolean;
  tracking?: IssuePainTracking;
  metricNamesByCode: Map<string, string>;
  onTrackingAction?: (
    payload: Omit<IssuePainTrackingActionPayload, 'community'>
  ) => Promise<IssuePainTracking>;
}> = ({ pain, focused, tracking, metricNamesByCode, onTrackingAction }) => {
  const tone = getPriorityTone(pain.prio);
  const issues = pain.low_score_issues ?? [];
  const [open, setOpen] = useState(true);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const evidenceMetricCode = pain.evidence.match(/^([A-Z0-9_-]+)\s*[:：]/)?.[1];
  const painMetricCodes = Array.from(
    new Set(
      [
        ...(tracking?.metricCodes ?? []),
        tracking?.metricCode,
        ...issues.map((issue) => issue.metric_code),
        evidenceMetricCode,
      ]
        .filter((code): code is string => Boolean(code?.trim()))
        .map(normalizePainMetricCode)
    )
  );
  const painMetricLabels = Array.from(
    new Set(
      painMetricCodes.flatMap((code) => {
        const chineseName = metricNamesByCode.get(code);
        return chineseName ? [chineseName] : [];
      })
    )
  );

  return (
    <div
      id={`issue-pain-${encodeURIComponent(pain.stage_id)}-${encodeURIComponent(
        pain.id
      )}`}
      className={`scroll-mt-24 overflow-hidden rounded-2xl border border-rose-200/70 bg-white shadow-[0_10px_24px_rgba(244,63,94,0.06)] transition-shadow ${
        focused ? 'ring-2 ring-blue-300' : ''
      }`}
    >
      <div className="flex w-full items-start justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-rose-50/40">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="min-w-0 flex-1 text-left"
        >
          <span className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${tone.badge}`}
            >
              {getPriorityLabel(pain.prio)}
            </span>
            {painMetricLabels.map((label) => (
              <span
                key={label}
                className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600"
              >
                {label}
              </span>
            ))}
          </span>
          <span className="mt-2 block text-sm font-semibold leading-6 text-slate-900">
            {pain.title}
          </span>
          {tracking?.trackingType === 'fix' &&
          tracking.status === IssuePainTrackingStatus.TRACKING &&
          tracking.activeTotal > 0 ? (
            <span className="mt-3 block max-w-[320px]">
              <TrackingProgress tracking={tracking} />
            </span>
          ) : null}
        </button>
        <div className="flex shrink-0 items-center gap-2 pt-0.5">
          {tracking && onTrackingAction ? (
            <TrackingActionButton
              tracking={tracking}
              onClick={() => setTrackingModalOpen(true)}
            />
          ) : (
            <span
              title="跟踪记录尚未生成，请稍后刷新"
              className="inline-flex rounded-full border border-dashed border-slate-300 bg-slate-50 px-2.5 py-1 text-[10px] text-slate-400"
            >
              跟踪数据准备中
            </span>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? '收起痛点详情' : '展开痛点详情'}
            aria-expanded={open}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
          >
            <DownOutlined
              className={`text-[11px] transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-rose-100 px-4 py-4">
          <div className="grid gap-2 text-xs leading-5">
            <p className="px-1 text-slate-600">
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
              <PainIssueTable
                issues={issues}
                tracking={tracking}
                onTrackingAction={onTrackingAction}
              />
            </div>
          ) : null}
          {tracking?.painLevelOnly && onTrackingAction ? (
            <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-xs text-slate-500">
                当前痛点没有关联 Issue，可直接标记痛点整体已修复。
              </span>
              <IssueFixButton
                tracking={tracking}
                issue={tracking.activeIssues[0]}
                onAction={onTrackingAction}
                compact
              />
            </div>
          ) : null}
        </div>
      ) : null}
      {tracking && onTrackingAction ? (
        <PainTrackingModal
          open={trackingModalOpen}
          pain={pain}
          tracking={tracking}
          metricLabels={painMetricLabels}
          onClose={() => setTrackingModalOpen(false)}
          onAction={onTrackingAction}
        />
      ) : null}
    </div>
  );
};

const IssueExperiencePath: React.FC<IssueExperiencePathProps> = ({
  projectName,
  stages,
  pains,
  recommendations,
  issueScoreRows,
  sampleSize,
  activeStageId,
  focusPainId,
  onStageChange,
  trackingByPain,
  onTrackingAction,
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

  useEffect(() => {
    if (!focusPainId || !activeStage?.id) return;
    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(
          `issue-pain-${encodeURIComponent(
            activeStage.id
          )}-${encodeURIComponent(focusPainId)}`
        )
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeStage?.id, focusPainId]);

  const [metricsOpen, setMetricsOpen] = useState(true);

  if (!activeStage) return null;

  // v4：无样本阶段（mixed 为空且无指标）按「本次未评估」展示，避免取值报错
  const stageEvaluated = isStageEvaluated(activeStage);
  const scoreTone = stageEvaluated
    ? getScoreTone(Number(activeStage.mixed))
    : NOT_EVALUATED_TONE;
  const metricNamesByCode = new Map(
    [...activeStage.metrics_obj, ...activeStage.metrics_sub].map((metric) => [
      normalizePainMetricCode(metric.code),
      metric.name_cn,
    ])
  );

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
  const efficiencyMetricCount = stageMetrics.filter(
    (metric) => getMetricCategory(metric.code) === 'efficiency'
  ).length;

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
  // 当前阶段有评分记录的全部 Issue，按本阶段得分从低到高排序（问题 Issue 优先）
  const stageScoreEntries = (issueScoreRows ?? [])
    .flatMap((row) => {
      const detail = row.stage_details.find(
        (item) => item.stage_id === activeStage.id
      );
      if (!detail) return [];
      const score = Number.parseFloat(detail.stage_score);
      return Number.isFinite(score) ? [{ row, detail, score }] : [];
    })
    .sort((a, b) => a.score - b.score);

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
          <HintIcon title="点击阶段卡片展开该阶段的诊断详情（关键指标、痛点、全部 Issue 得分）；虚线边框的 G 为 Bot / Agent 治理参考镜头，不计入总分。" />
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
              const evaluated = isStageEvaluated(stage);
              const tone = evaluated
                ? getScoreTone(Number(stage.mixed))
                : NOT_EVALUATED_TONE;
              const cardTone = stage.is_lens
                ? 'border-dashed border-slate-300 bg-slate-50/80'
                : !evaluated
                ? 'border-dashed border-slate-300 bg-slate-50/60'
                : stage.mixed !== null && stage.mixed >= 80
                ? 'border-emerald-200 bg-emerald-50/20'
                : stage.mixed !== null && stage.mixed >= 60
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

                    {evaluated ? (
                      <div className="mt-3 text-center text-[19px] font-semibold leading-none tracking-[0.18em] text-amber-500">
                        {stage.stars}
                      </div>
                    ) : (
                      /* 未评估态：对齐 CI 旅程全景图的 Not Evaluated 分隔线 */
                      <div className="mt-3 flex items-center justify-center gap-1.5">
                        <span className="h-px w-5 bg-slate-300" />
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                          Not Evaluated
                        </span>
                        <span className="h-px w-5 bg-slate-300" />
                      </div>
                    )}
                    <div className="mt-2 text-center">
                      <span
                        className={`text-[28px] font-semibold leading-none ${
                          evaluated ? 'text-slate-900' : 'text-slate-300'
                        }`}
                      >
                        {evaluated ? stage.mixed : '—'}
                      </span>
                      {evaluated ? (
                        <span className="ml-1 text-xs font-medium text-slate-500">
                          分
                        </span>
                      ) : null}
                    </div>

                    <div
                      className={`mt-3 flex flex-1 flex-col rounded-2xl border px-2 py-1.5 ${
                        evaluated
                          ? 'border-slate-200/70 bg-white/80'
                          : 'border-dashed border-slate-200 bg-slate-50/60'
                      }`}
                    >
                      {evaluated ? (
                        <>
                          <div className="truncate text-center text-sm font-semibold text-slate-600">
                            {stage.judgment}
                          </div>
                          <div className="mt-2 grid grid-cols-3">
                            <span
                              className="flex flex-col items-center py-1"
                              title="本阶段评估的指标数量（效率 + 质量），对应下方“关键指标”"
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
                              title="本阶段主要问题的痛点数量"
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
                              title="本阶段关联的改进建议数量"
                            >
                              <strong className="text-[20px] font-bold leading-none text-emerald-600">
                                {recommendationCount}
                              </strong>
                              <span className="mt-1 text-[14px] text-slate-400">
                                建议
                              </span>
                            </span>
                          </div>
                        </>
                      ) : (
                        /* 未评估态：对齐 CI 全景图虚线圈样式 */
                        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-2">
                          <svg
                            className="h-7 w-7 text-slate-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeDasharray="3 2"
                            />
                            <path
                              d="M9 12h6M12 9v6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="text-center text-base leading-4 text-slate-400">
                            本次未评估
                          </span>
                        </div>
                      )}
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
          <div className=">lg:flex-row flex flex-col gap-4">
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
                        {stageEvaluated ? activeStage.mixed : '本次未评估'}
                      </span>
                    </span>
                    {[
                      {
                        label: '痛点 Issue',
                        value: `${activeStage.pain_count}/${sampleSize}`,
                        badgeClass: 'bg-rose-50 text-rose-600',
                      },
                      {
                        label: '效率',
                        value: `${
                          activeStage.metrics_obj.length &&
                          activeStage.obj != null
                            ? activeStage.obj.toFixed(1)
                            : '—'
                        }`,
                        badgeClass: 'bg-sky-50 text-sky-700',
                      },
                      {
                        label: '质量',
                        value: `${
                          activeStage.metrics_sub.length &&
                          activeStage.subj != null
                            ? activeStage.subj.toFixed(1)
                            : '—'
                        }`,
                        badgeClass: 'bg-emerald-50 text-emerald-700',
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
                          className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums leading-none ${item.badgeClass}`}
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
                            （效率 {efficiencyMetricCount} · 质量{' '}
                            {stageMetrics.length - efficiencyMetricCount}）
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
                    {!stageEvaluated ? (
                      <NotEvaluatedHint className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60" />
                    ) : metricsOpen ? (
                      <div className=">lg:grid-cols-3 >2xl:grid-cols-4 mt-3 grid grid-cols-2 gap-3">
                        {stageMetrics.map((metric) => {
                          const metricTone = getScoreTone(metric.score);
                          const metricDef = getMetricDefinition(metric.code);
                          const metricCategory = getMetricCategory(metric.code);
                          const card = (
                            <div
                              key={metric.key}
                              className={`flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_20px_rgba(15,23,42,0.04)] ${
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
                                      metricCategory === 'efficiency'
                                        ? 'bg-sky-50 text-sky-600'
                                        : 'bg-emerald-50 text-emerald-600'
                                    }`}
                                  >
                                    {metricCategory === 'efficiency'
                                      ? '效率'
                                      : '质量'}
                                  </span>
                                </div>
                                <span
                                  className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-bold leading-none ${metricTone.badge}`}
                                >
                                  {metric.score}分
                                </span>
                              </div>
                              {metricDef?.meaning || metric.reason ? (
                                <div className="relative mt-2">
                                  <p
                                    className={`line-clamp-3 text-[12px] leading-5 text-slate-500 ${
                                      metricDef ? 'pr-5' : ''
                                    }`}
                                  >
                                    {metricDef?.meaning || metric.reason}
                                  </p>
                                  {metricDef ? (
                                    <DownOutlined
                                      className="absolute bottom-0 right-0 bg-white pl-1 text-[10px] text-[#1677ff]"
                                      title="鼠标悬停查看评分细则"
                                    />
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          );
                          if (!metricDef) {
                            return card;
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
                              {card}
                            </Popover>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>

                  {stagePains.length ? (
                    <div className="border-t border-slate-200 pt-6">
                      <div className="flex items-center gap-1.5">
                        <FlagOutlined className="text-rose-500" />
                        <h4 className="text-base font-semibold text-slate-900">
                          痛点
                        </h4>
                        <HintIcon title="本阶段的主要问题及其涉及的具体 Issue 明细，点击卡片可展开查看关联 Issue 的低分原因与原文依据。" />
                      </div>

                      <div className="mt-4 flex flex-col gap-4">
                        {stagePains.map((pain) => (
                          <StagePainCard
                            key={pain.id}
                            pain={pain}
                            focused={pain.id === focusPainId}
                            metricNamesByCode={metricNamesByCode}
                            tracking={trackingByPain?.get(
                              `${pain.stage_id}#${pain.id}`
                            )}
                            onTrackingAction={onTrackingAction}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {stageScoreEntries.length ? (
                    <StageIssueScoreSection
                      key={`issue-scores-${activeStage.id}`}
                      stageId={activeStage.id}
                      entries={stageScoreEntries}
                    />
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
