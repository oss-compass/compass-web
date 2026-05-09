import React, { useState } from 'react';
import { Popover, message } from 'antd';
import PainLevelConfirmModal, {
  getPainLevelLabel,
  getPainLevelStyle,
  STATUS_LABELS,
  PainStatus,
} from './PainLevelConfirmModal';
import { usePainConfirmations } from '../hooks/usePainConfirmations';
import type { UpsertPainConfirmationPayload } from '../rawData/apiClient';

/* ─── 图标 ─── */
export const EvidenceIcon: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8 5v3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="11" r="0.75" fill="currentColor" />
  </svg>
);

export const PainIcon: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2L14 13H2L8 2Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M8 6v3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="8" cy="10.5" r="0.75" fill="currentColor" />
  </svg>
);

/* ─── 类型 ─── */
export type EvidencePanelProps = {
  observations?: string[];
  pain_points?: string[];
  observations_tool_nums?: string[][];
  pain_points_tool_nums?: string[][];
  /**
   * 无数据时的兜底展示，默认 true。
   * 设为 false 时若无数据则返回 null（由调用方自行处理）。
   */
  showEmpty?: boolean;
  /**
   * 渲染变体：
   * - `card`（默认）：带边框背景的大卡片样式，两列并排
   * - `compact`：紧凑列表样式，每条 item 带圆角背景色
   */
  variant?: 'card' | 'compact';
  /**
   * 以下三个 props 开启"痛点等级确认"功能：
   * - fileKey：报告文件 key
   * - stepId：对应步骤 ID
   */
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  /**
   * 点击关联步骤 ID 时的回调
   */
  onStepClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
};

/* ─── 关联步骤按钮 ─── */
const LinkStepsButton: React.FC<{
  toolIds?: string[];
  taskId?: string;
  onClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
}> = ({ toolIds, taskId, onClick }) => {
  if (!toolIds || toolIds.length === 0) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(toolIds, { taskId });
    } else {
      // 如果没有传入 onClick，则发送全局事件供 KeyActionsSection 监听
      window.dispatchEvent(
        new CustomEvent('user-journey:highlight-steps', {
          detail: { toolIds, taskId },
        })
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="点击查看关联执行步骤"
      className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-dashed border-indigo-400 bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600 transition-all hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 hover:shadow-sm"
    >
      <svg
        className="h-2.5 w-2.5"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 8h4M4 10.5h8M4 5.5h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      关联步骤
    </button>
  );
};

/* ─── 未确认标识按钮 ─── */
const UnconfirmedBadge: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    title="点击确认痛点等级"
    className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-dashed border-amber-400 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600 transition-all hover:border-amber-500 hover:bg-amber-100 hover:text-amber-700 hover:shadow-sm"
  >
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
    </span>
    待确认
  </button>
);

/* ─── 状态 Badge（可再次点击修改） ─── */
const StatusBadge: React.FC<{
  status: number;
  severity: string;
  confirmedBy: string;
  confirmedAt: string;
  onClick: () => void;
}> = ({ status, severity, confirmedBy, confirmedAt, onClick }) => {
  const style = getPainLevelStyle(severity);
  const label = STATUS_LABELS[status] || '未知状态';

  const popoverContent = (
    <div className="max-w-xs space-y-2 text-sm">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium text-slate-600">严重程度：</span>
        <span className={`${style.text} font-semibold`}>
          {getPainLevelLabel(severity)}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium text-slate-600">操作人：</span>
        {confirmedBy}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium text-slate-600">操作时间：</span>
        {confirmedAt.replace('T', ' ').replace('Z', '')}
      </div>
      <div className="rounded bg-slate-50 px-2 py-1 text-xs text-slate-500">
        点击进入痛点管理
      </div>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      title={null}
      trigger="hover"
      placement="top"
      styles={{ root: { maxWidth: 320 } }}
    >
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold transition-all hover:shadow-sm ${
          status === PainStatus.RETESTED_PASSED
            ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
            : status === PainStatus.RETESTING
            ? 'border-amber-300 bg-amber-100 text-amber-700'
            : `${style.bg} ${style.text} ${style.border}`
        }`}
      >
        <span
          className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
            status === PainStatus.RETESTED_PASSED
              ? 'bg-emerald-500'
              : status === PainStatus.RETESTING
              ? 'bg-amber-500'
              : style.dot
          }`}
        />
        {label}
      </button>
    </Popover>
  );
};

/* ─── 单条总结行 ─── */
const ObservationItem: React.FC<{
  text: string;
  toolIds?: string[];
  taskId?: string;
  onStepClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
  compact?: boolean;
}> = ({ text, toolIds, taskId, onStepClick, compact = false }) => {
  return (
    <li
      className={`flex items-start gap-2 rounded-md ${
        compact
          ? 'bg-sky-50 px-2.5 py-1.5 text-sm text-sky-800'
          : 'text-sm leading-5 text-sky-900'
      }`}
    >
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
      <div className="flex flex-1 items-start justify-between gap-3">
        <span className="flex-1 py-0.5">{text}</span>
        <div className="flex shrink-0 items-center">
          <LinkStepsButton
            toolIds={toolIds}
            taskId={taskId}
            onClick={onStepClick}
          />
        </div>
      </div>
    </li>
  );
};

/* ─── 单条痛点行（含确认交互） ─── */
const PainPointItem: React.FC<{
  text: string;
  index: number;
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  compact?: boolean;
  toolIds?: string[];
  onStepClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
}> = ({
  text,
  index,
  fileKey,
  stepId,
  legacyStepId,
  compact = false,
  toolIds,
  onStepClick,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const canConfirm = !!(fileKey && stepId);
  const { confirmationMap, upsert } = usePainConfirmations(
    canConfirm ? fileKey : undefined
  );

  // 辅助函数：标准化文本对比，忽略前后空格、换行及多余空格
  const normalizeText = (t: string) => t.trim().replace(/\s+/g, ' ');
  const isSamePainText = (t1: string, t2: string) =>
    normalizeText(t1) === normalizeText(t2);

  // 使用标准化后的文本构建查找 key
  const confirmKey = `${fileKey}#${stepId}#${normalizeText(text)}`;
  const existingPrimary = canConfirm
    ? confirmationMap.get(confirmKey)
    : undefined;
  const existingFallback =
    canConfirm && legacyStepId
      ? confirmationMap.get(`${fileKey}#${legacyStepId}#${normalizeText(text)}`)
      : undefined;
  const existing = existingPrimary ?? existingFallback;

  // 判断是否已完成：status = 2 且 severity = "P4_TRIVIAL"
  const isCompleted =
    existing &&
    existing.status === PainStatus.CONFIRMED_PENDING_FIX &&
    existing.severity === 'P4_TRIVIAL';

  // 判断是否为共性问题
  const isCommonIssue = existing && existing.severity === 'P5';

  const handleSubmit = async (payload: UpsertPainConfirmationPayload) => {
    await upsert(payload);
  };
  // console.log(existing?.pain_text)
  // console.log(text)

  const badgeElement =
    canConfirm &&
    (existing && isSamePainText(existing.pain_text, text) ? (
      isCommonIssue ? (
        <Popover
          content={
            <div className="max-w-xs space-y-2 text-sm">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium text-slate-600">严重程度：</span>
                <span className="font-semibold text-slate-700">共性问题</span>
              </div>
              {existing.confirmed_by && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-medium text-slate-600">操作人：</span>
                  {existing.confirmed_by}
                </div>
              )}
              {existing.confirmed_at && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-medium text-slate-600">操作时间：</span>
                  {existing.confirmed_at.replace('T', ' ').replace('Z', '')}
                </div>
              )}
              <div className="rounded bg-slate-50 px-2 py-1 text-xs text-slate-600">
                共性问题待处理
              </div>
            </div>
          }
          title={null}
          trigger="hover"
          placement="top"
          styles={{ root: { maxWidth: 320 } }}
        >
          <button
            type="button"
            disabled
            className="inline-flex shrink-0 cursor-not-allowed items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
          >
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
            共性问题
          </button>
        </Popover>
      ) : isCompleted ? (
        <Popover
          content={
            <div className="max-w-xs space-y-2 text-sm">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium text-slate-600">严重程度：</span>
                <span className="font-semibold text-emerald-700">
                  非项目本身问题
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium text-slate-600">操作人：</span>
                {existing.confirmed_by}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium text-slate-600">操作时间：</span>
                {existing.confirmed_at.replace('T', ' ').replace('Z', '')}
              </div>
              <div className="rounded bg-emerald-50 px-2 py-1 text-xs text-emerald-600">
                已完成，无需进一步处理
              </div>
            </div>
          }
          title={null}
          trigger="hover"
          placement="top"
          styles={{ root: { maxWidth: 320 } }}
        >
          <button
            type="button"
            disabled
            className="inline-flex shrink-0 cursor-not-allowed items-center gap-1 rounded-full border border-emerald-300 bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
          >
            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            已完成（非项目本身问题）
          </button>
        </Popover>
      ) : (
        <StatusBadge
          status={existing.status}
          severity={existing.severity}
          confirmedBy={existing.confirmed_by}
          confirmedAt={existing.confirmed_at}
          onClick={() => setModalOpen(true)}
        />
      )
    ) : (
      <UnconfirmedBadge onClick={() => setModalOpen(true)} />
    ));

  return (
    <>
      <li
        className={`flex items-start gap-2 rounded-md ${
          compact
            ? 'bg-rose-50 px-2.5 py-1.5 text-sm text-rose-800'
            : 'text-sm leading-5 text-rose-900'
        }`}
      >
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
        <div className="flex flex-1 items-start justify-between gap-3">
          <span className="flex-1 py-0.5">{text}</span>
          <div className="flex shrink-0 items-center gap-1.5">
            <LinkStepsButton
              toolIds={toolIds}
              taskId={stepId}
              onClick={onStepClick}
            />
            {badgeElement}
          </div>
        </div>
      </li>
      {canConfirm && (
        <PainLevelConfirmModal
          open={modalOpen}
          fileKey={fileKey!}
          stepId={stepId!}
          painIndex={index}
          painText={text}
          currentRecord={existing}
          onCancel={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

/**
 * EvidencePanel
 *
 * 统一渲染「总结」列和「痛点」列，供以下场景复用：
 * - JourneyPanoramaSection > TaskEvidenceCard（variant="card"）
 * - KeyActionsSection > EvidenceInline（variant="card"，showEmpty=false）
 * - KeyActionsSection > EvidenceBlock 展开内容（variant="compact"，showEmpty=false）
 *
 * 当 fileKey + stepId 都传入时，自动启用痛点等级确认功能。
 */
const EvidencePanel: React.FC<EvidencePanelProps> = ({
  observations,
  pain_points,
  observations_tool_nums,
  pain_points_tool_nums,
  showEmpty = true,
  variant = 'card',
  fileKey,
  stepId,
  legacyStepId,
  onStepClick,
}) => {
  const [obsExpanded, setObsExpanded] = useState(false);
  const hasObs = !!observations && observations.length > 0;
  const hasPain = !!pain_points && pain_points.length > 0;

  if (!hasObs && !hasPain) {
    if (!showEmpty) return null;
    return (
      <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-200 px-3 py-2">
        <EvidenceIcon className="h-3.5 w-3.5 shrink-0 text-slate-300" />
        <span className="text-xs text-slate-400">暂无总结与痛点记录</span>
      </div>
    );
  }

  /* ── compact 变体：每条 item 带圆角底色，用于折叠块展开内容 ── */
  if (variant === 'compact') {
    return (
      <div className="space-y-3">
        {hasObs && (
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <EvidenceIcon className="h-3 w-3" />
              总结
            </div>
            <ul className="space-y-1">
              {observations!.map((obs, i) => (
                <ObservationItem
                  key={i}
                  text={obs}
                  toolIds={observations_tool_nums?.[i]}
                  taskId={stepId}
                  onStepClick={onStepClick}
                  compact
                />
              ))}
            </ul>
          </div>
        )}
        {hasPain && (
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <PainIcon className="h-3 w-3" />
              痛点
            </div>
            <ul className="space-y-1">
              {pain_points!.map((p, i) => (
                <PainPointItem
                  key={i}
                  text={p}
                  index={i}
                  fileKey={fileKey}
                  stepId={stepId}
                  legacyStepId={legacyStepId}
                  toolIds={pain_points_tool_nums?.[i]}
                  onStepClick={onStepClick}
                  compact
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  /* ── card 变体（默认）：上下布局，痛点在上，总结在下默认折叠 ── */
  return (
    <div className="flex flex-col gap-3">
      {hasPain && (
        <div className="rounded-xl border border-rose-100 bg-rose-50/70 px-4 py-3">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-600">
            <PainIcon className="h-3 w-3" />
            痛点
            <span className="ml-0.5 rounded-full bg-rose-100 px-1.5 text-[10px] font-bold text-rose-700">
              {pain_points!.length}
            </span>
          </div>
          <ul className="space-y-1.5">
            {pain_points!.map((p, i) => (
              <PainPointItem
                key={i}
                text={p}
                index={i}
                fileKey={fileKey}
                stepId={stepId}
                legacyStepId={legacyStepId}
                toolIds={pain_points_tool_nums?.[i]}
                onStepClick={onStepClick}
              />
            ))}
          </ul>
        </div>
      )}
      {hasObs && (
        <div className="rounded-xl border border-sky-100 bg-sky-50/70 px-4 py-3">
          <button
            type="button"
            className="mb-1 flex w-full items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-600"
            onClick={() => setObsExpanded((v) => !v)}
          >
            <EvidenceIcon className="h-3 w-3" />
            总结
            <span className="ml-0.5 rounded-full bg-sky-100 px-1.5 text-[10px] font-bold text-sky-700">
              {observations!.length}
            </span>
            <svg
              className={`ml-auto h-3.5 w-3.5 transition-transform ${
                obsExpanded ? 'rotate-180' : ''
              }`}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4,6 8,10 12,6" />
            </svg>
          </button>
          {obsExpanded && (
            <ul className="mt-2 space-y-1.5">
              {observations!.map((obs, i) => (
                <ObservationItem
                  key={i}
                  text={obs}
                  toolIds={observations_tool_nums?.[i]}
                  taskId={stepId}
                  onStepClick={onStepClick}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default EvidencePanel;
