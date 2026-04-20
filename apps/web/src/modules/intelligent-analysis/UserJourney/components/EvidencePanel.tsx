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
};

/* ─── 未确认标识按钮 ─── */
const UnconfirmedBadge: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    title="点击确认痛点等级"
    className="ml-1.5 inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-dashed border-amber-400 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600 transition-all hover:border-amber-500 hover:bg-amber-100 hover:text-amber-700 hover:shadow-sm"
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
        className={`ml-1.5 inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold transition-all hover:shadow-sm ${
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

/* ─── 单条痛点行（含确认交互） ─── */
const PainPointItem: React.FC<{
  text: string;
  index: number;
  fileKey?: string;
  stepId?: string;
  compact?: boolean;
}> = ({ text, index, fileKey, stepId, compact = false }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const canConfirm = !!(fileKey && stepId);
  const { confirmationMap, upsert } = usePainConfirmations(
    canConfirm ? fileKey : undefined
  );
  const confirmKey = `${stepId}#${index}`;
  const existing = canConfirm ? confirmationMap.get(confirmKey) : undefined;

  const handleSubmit = async (payload: UpsertPainConfirmationPayload) => {
    await upsert(payload);
  };
  // console.log(existing?.pain_text)
  // console.log(text)

  const badgeElement =
    canConfirm &&
    (existing && existing.pain_text === text ? (
      <StatusBadge
        status={existing.status}
        severity={existing.severity}
        confirmedBy={existing.confirmed_by}
        confirmedAt={existing.confirmed_at}
        onClick={() => setModalOpen(true)}
      />
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
        <span className="flex-1">{text}</span>
        {badgeElement}
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
  showEmpty = true,
  variant = 'card',
  fileKey,
  stepId,
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
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-md bg-sky-50 px-2.5 py-1.5 text-sm text-sky-800"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  {obs}
                </li>
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
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-5 text-sky-900"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  {obs}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default EvidencePanel;
