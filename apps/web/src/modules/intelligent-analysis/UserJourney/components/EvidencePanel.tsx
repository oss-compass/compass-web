import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Popover, Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import PainLevelConfirmModal, {
  getPainLevelLabel,
  getPainLevelStyle,
  STATUS_LABELS,
  PainStatus,
} from './PainLevelConfirmModal';
import { usePainConfirmations } from '../hooks/usePainConfirmations';
import {
  fetchOverviewCards,
  updateOverviewParentPain,
  type OverviewPainPointRow,
  type PainConfirmationRecord,
  type UpsertPainConfirmationPayload,
} from '../rawData/apiClient';
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
  painFocusTarget?: {
    painIndex: number;
    autoOpen?: boolean;
  };
  onPainFocusHandled?: () => void;
  /** 可选：版本选项（file_key → label），用于复测通过时选择通过报告 */
  versionOptions?: Array<{ value: string; label: string }>;
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
  commonIssueType?: string | null;
  isCommonIssue?: boolean;
  confirmedBy: string;
  confirmedAt: string;
  prLink?: string | null;
  retestPassedFileKey?: string | null;
  onClick: () => void;
}> = ({
  status,
  severity,
  commonIssueType,
  isCommonIssue = false,
  confirmedBy,
  confirmedAt,
  prLink,
  retestPassedFileKey,
  onClick,
}) => {
  const style = getPainLevelStyle(severity);
  const label = `${STATUS_LABELS[status] || '待确认'}${
    isCommonIssue ? '（共性问题）' : ''
  }`;

  const popoverContent = (
    <div className="max-w-xs space-y-2 text-sm">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium text-slate-600">严重程度：</span>
        <span className={`${style.text} font-semibold`}>
          {getPainLevelLabel(severity)}
        </span>
      </div>
      {commonIssueType ? (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="font-medium text-slate-600">共性问题类型：</span>
          <span className="font-semibold text-slate-700">
            {commonIssueType}
          </span>
        </div>
      ) : null}
      {status === PainStatus.RETESTED_PASSED && prLink && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="font-medium text-slate-600">PR 链接：</span>
          <a
            href={prLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
            onClick={(e) => e.stopPropagation()}
          >
            {prLink}
          </a>
        </div>
      )}
      {status === PainStatus.RETESTED_PASSED && retestPassedFileKey && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="font-medium text-slate-600">通过报告：</span>
          <a
            href={`/intelligent-analysis/community-experience?project=${encodeURIComponent(
              retestPassedFileKey
            )}`}
            className="text-blue-600 underline"
            onClick={(e) => e.stopPropagation()}
          >
            {retestPassedFileKey}
          </a>
        </div>
      )}
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
            : status === PainStatus.RETESTED_FAILED
            ? 'border-rose-300 bg-rose-100 text-rose-700'
            : `${style.bg} ${style.text} ${style.border}`
        }`}
      >
        <span
          className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
            status === PainStatus.RETESTED_PASSED
              ? 'bg-emerald-500'
              : status === PainStatus.RETESTING
              ? 'bg-amber-500'
              : status === PainStatus.RETESTED_FAILED
              ? 'bg-rose-500'
              : style.dot
          }`}
        />
        {label}
      </button>
    </Popover>
  );
};

type DerivedPainDisplayState = {
  childMatched: boolean;
  effectiveStatus?: number;
  effectiveSeverity: string;
  effectiveCommonIssueType?: string | null;
  effectiveIsCommonIssue: boolean;
  effectiveConfirmedBy: string;
  effectiveConfirmedAt: string;
  effectiveIssueLink?: string | null;
  effectivePrLink?: string | null;
  effectiveRetestPassedFileKey?: string | null;
  isCompleted: boolean;
};

const FALLBACK_LINK_TEXT = '未记录';

const normalizePainText = (value: string) => value.trim().replace(/\s+/g, ' ');

const isSamePainText = (left: string, right: string) =>
  normalizePainText(left) === normalizePainText(right);

const getFallbackModalLinkValue = (value?: string | null): string =>
  String(value || '').trim() || FALLBACK_LINK_TEXT;

const getExistingPainConfirmation = ({
  canConfirm,
  confirmationMap,
  fileKey,
  stepId,
  legacyStepId,
  text,
}: {
  canConfirm: boolean;
  confirmationMap: Map<string, PainConfirmationRecord>;
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  text: string;
}): PainConfirmationRecord | undefined => {
  if (!canConfirm || !fileKey || !stepId) return undefined;

  const normalizedText = normalizePainText(text);

  return (
    confirmationMap.get(`${fileKey}#${stepId}#${normalizedText}`) ??
    (legacyStepId
      ? confirmationMap.get(`${fileKey}#${legacyStepId}#${normalizedText}`)
      : undefined)
  );
};

const derivePainDisplayState = ({
  existing,
  parentPain,
  text,
}: {
  existing?: PainConfirmationRecord;
  parentPain?: OverviewPainPointRow;
  text: string;
}): DerivedPainDisplayState => {
  const parentStatusValue = String(parentPain?.status ?? '').trim();
  const parentStatusNum = Number.parseInt(parentStatusValue, 10);
  const childMatched = !!(existing && isSamePainText(existing.pain_text, text));

  const getEffectiveStatus = () => {
    if (!Number.isNaN(parentStatusNum)) return parentStatusNum;
    return childMatched ? existing?.status : undefined;
  };

  const getEffectiveSeverity = () => {
    const parentSeverity = String(parentPain?.severity || '').trim();
    if (parentSeverity) return parentSeverity;
    return childMatched ? String(existing?.severity || '').trim() : '';
  };

  const getEffectiveCommonIssue = () => {
    const commonIssueType =
      parentPain?.commonIssueType ||
      (childMatched ? existing?.common_issue_type : undefined);

    const isCommonIssue =
      parentPain?.isCommonIssue === true ||
      !!String(commonIssueType || '').trim() ||
      (childMatched && existing?.is_common_issue === true);

    return { commonIssueType, isCommonIssue };
  };

  const getEffectiveLinks = () => {
    const issueLink =
      existing?.issue_link ||
      parentPain?.issueLink ||
      parentPain?.issueOrPrLink ||
      undefined;

    const prLink =
      existing?.pr_link ||
      parentPain?.prLink ||
      parentPain?.issueOrPrLink ||
      undefined;

    return { issueLink, prLink };
  };

  const { commonIssueType, isCommonIssue } = getEffectiveCommonIssue();
  const { issueLink, prLink } = getEffectiveLinks();

  const effectiveStatus = getEffectiveStatus();
  const effectiveSeverity = getEffectiveSeverity();

  const effectiveConfirmedBy =
    (childMatched ? existing?.confirmed_by : '') ||
    String(parentPain?.owner || '').trim() ||
    '--';

  const parentCreatedAt = String(
    parentPain?.created_at || parentPain?.createdAt || ''
  ).trim();

  const effectiveConfirmedAt =
    (childMatched ? existing?.confirmed_at || '' : '') || parentCreatedAt;

  const effectiveRetestPassedFileKey = childMatched
    ? existing?.retest_passed_file_key || existing?.latest_file_key
    : undefined;

  const isCompleted =
    effectiveStatus === PainStatus.CONFIRMED_PENDING_FIX &&
    effectiveSeverity === 'P4_TRIVIAL';

  return {
    childMatched,
    effectiveStatus,
    effectiveSeverity,
    effectiveCommonIssueType: commonIssueType,
    effectiveIsCommonIssue: isCommonIssue,
    effectiveConfirmedBy,
    effectiveConfirmedAt,
    effectiveIssueLink: issueLink,
    effectivePrLink: prLink,
    effectiveRetestPassedFileKey,
    isCompleted,
  };
};

const buildModalCurrentRecord = ({
  canConfirm,
  fileKey,
  stepId,
  index,
  text,
  existing,
  displayState,
}: {
  canConfirm: boolean;
  fileKey?: string;
  stepId?: string;
  index: number;
  text: string;
  existing?: PainConfirmationRecord;
  displayState: DerivedPainDisplayState;
}): PainConfirmationRecord | undefined => {
  if (!canConfirm || !fileKey || !stepId) {
    return existing;
  }

  const effectiveStatus =
    typeof displayState.effectiveStatus === 'number'
      ? displayState.effectiveStatus
      : existing?.status ?? PainStatus.TO_BE_CONFIRMED;

  if (existing && displayState.childMatched) {
    return {
      ...existing,
      status: effectiveStatus,
      severity: displayState.effectiveSeverity || existing.severity,
      is_common_issue: displayState.effectiveIsCommonIssue,
      common_issue_type:
        displayState.effectiveCommonIssueType ??
        existing.common_issue_type ??
        null,
      issue_link: getFallbackModalLinkValue(
        existing.issue_link || displayState.effectiveIssueLink
      ),
      pr_link: getFallbackModalLinkValue(
        existing.pr_link || displayState.effectivePrLink
      ),
      confirmed_by:
        displayState.effectiveConfirmedBy === '--'
          ? existing.confirmed_by
          : displayState.effectiveConfirmedBy,
      confirmed_at: displayState.effectiveConfirmedAt || existing.confirmed_at,
    };
  }

  return {
    file_key: fileKey,
    step_id: stepId,
    pain_index: index,
    pain_text: text,
    status: effectiveStatus,
    severity: displayState.effectiveSeverity || 'P1_CRITICAL',
    is_common_issue: displayState.effectiveIsCommonIssue,
    common_issue_type: displayState.effectiveCommonIssueType ?? null,
    issue_link: getFallbackModalLinkValue(displayState.effectiveIssueLink),
    pr_link: getFallbackModalLinkValue(displayState.effectivePrLink),
    confirmed_by:
      displayState.effectiveConfirmedBy === '--'
        ? ''
        : displayState.effectiveConfirmedBy,
    confirmed_at: displayState.effectiveConfirmedAt || '',
  };
};

const syncParentPainStatus = async ({
  parentPainId,
  parentStatusValue,
  nextStatus,
}: {
  parentPainId: string;
  parentStatusValue: string;
  nextStatus: string;
}) => {
  if (!parentPainId || !nextStatus || nextStatus === parentStatusValue) {
    return;
  }

  try {
    await updateOverviewParentPain({
      parent_id: parentPainId,
      status: nextStatus,
    });
  } catch (error) {
    console.error('[EvidencePanel] 同步父级痛点状态失败', error);
  }
};

const CompletedPainBadge: React.FC<{
  confirmedBy: string;
  confirmedAt: string;
}> = ({ confirmedBy, confirmedAt }) => (
  <Popover
    content={
      <div className="max-w-xs space-y-2 text-sm">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="font-medium text-slate-600">严重程度：</span>
          <span className="font-semibold text-emerald-700">非项目本身问题</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="font-medium text-slate-600">操作人：</span>
          {confirmedBy}
        </div>
        {confirmedAt ? (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-medium text-slate-600">操作时间：</span>
            {confirmedAt.replace('T', ' ').replace('Z', '')}
          </div>
        ) : null}
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
);

const PainPointBadge: React.FC<{
  canConfirm: boolean;
  displayState: DerivedPainDisplayState;
  onClick: () => void;
}> = ({ canConfirm, displayState, onClick }) => {
  if (!canConfirm || typeof displayState.effectiveStatus !== 'number') {
    return <UnconfirmedBadge onClick={onClick} />;
  }

  if (displayState.isCompleted) {
    return (
      <CompletedPainBadge
        confirmedBy={displayState.effectiveConfirmedBy}
        confirmedAt={displayState.effectiveConfirmedAt}
      />
    );
  }

  return (
    <StatusBadge
      status={displayState.effectiveStatus}
      severity={displayState.effectiveSeverity || 'P4_TRIVIAL'}
      commonIssueType={displayState.effectiveCommonIssueType}
      isCommonIssue={displayState.effectiveIsCommonIssue}
      confirmedBy={displayState.effectiveConfirmedBy}
      confirmedAt={displayState.effectiveConfirmedAt || ''}
      prLink={displayState.effectivePrLink}
      retestPassedFileKey={displayState.effectiveRetestPassedFileKey}
      onClick={onClick}
    />
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
  parentPain?: OverviewPainPointRow;
  compact?: boolean;
  toolIds?: string[];
  onStepClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
  shouldAutoOpen?: boolean;
  onAutoOpenHandled?: () => void;
  versionOptions?: Array<{ value: string; label: string }>;
}> = ({
  text,
  index,
  fileKey,
  stepId,
  legacyStepId,
  parentPain,
  compact = false,
  toolIds,
  onStepClick,
  shouldAutoOpen = false,
  onAutoOpenHandled,
  versionOptions,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const shouldHandleAutoOpenRef = useRef(false);

  useEffect(() => {
    if (!shouldAutoOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      shouldHandleAutoOpenRef.current = true;
      setModalOpen(true);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [shouldAutoOpen]);

  const handleModalClose = () => {
    setModalOpen(false);
    if (shouldHandleAutoOpenRef.current) {
      shouldHandleAutoOpenRef.current = false;
      onAutoOpenHandled?.();
    }
  };

  const canConfirm = !!(fileKey && stepId);
  const { confirmationMap, upsert } = usePainConfirmations(
    canConfirm ? fileKey : undefined
  );
  const existing = getExistingPainConfirmation({
    canConfirm,
    confirmationMap,
    fileKey,
    stepId,
    legacyStepId,
    text,
  });
  const parentPainId = String(
    parentPain?.parentId || parentPain?.id || ''
  ).trim();
  const parentStatusValue = String(parentPain?.status ?? '').trim();
  const displayState = derivePainDisplayState({
    existing,
    parentPain,
    text,
  });

  const handleSubmit = async (payload: UpsertPainConfirmationPayload) => {
    const result = await upsert(payload);
    const nextStatus = String(result.data?.status ?? payload.status ?? '');

    await syncParentPainStatus({
      parentPainId,
      parentStatusValue,
      nextStatus,
    });
  };

  const modalCurrentRecord = buildModalCurrentRecord({
    canConfirm,
    fileKey,
    stepId,
    index,
    text,
    existing,
    displayState,
  });

  return (
    <>
      <li
        ref={itemRef}
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
            <PainPointBadge
              canConfirm={canConfirm}
              displayState={displayState}
              onClick={() => setModalOpen(true)}
            />
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
          currentRecord={modalCurrentRecord}
          versionOptions={versionOptions}
          onCancel={handleModalClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

const deriveProjectKeyFromFileKey = (value?: string): string => {
  const fileKey = String(value || '').trim();
  if (!fileKey) return '';

  const parts = fileKey.split('_');
  if (parts.length >= 3) {
    const datePart = parts[parts.length - 2];
    const timePart = parts[parts.length - 1];
    if (/^\d{8}$/.test(datePart) && /^\d{3,6}$/.test(timePart)) {
      return parts.slice(0, -2).join('_');
    }
  }

  return fileKey;
};

const parseChildId = (
  raw: string
): { fileKey: string; taskId: string; painIndex?: number } | null => {
  const text = String(raw || '').trim();
  if (!text) return null;

  const [fileKeyRaw, taskIdRaw, painIndexRaw] = text.split('#');
  const fileKey = String(fileKeyRaw || '').trim();
  if (!fileKey) return null;

  const taskId = String(taskIdRaw || '').trim();
  const painIndexNum = Number.parseInt(String(painIndexRaw || '').trim(), 10);

  return {
    fileKey,
    taskId,
    painIndex: Number.isNaN(painIndexNum) ? undefined : painIndexNum,
  };
};

const HistoryPainTable: React.FC<{
  items: OverviewPainPointRow[];
  loading: boolean;
  compact?: boolean;
  currentFileKey?: string;
}> = ({ items, loading, compact = false, currentFileKey }) => {
  const normalizedCurrentFileKey = String(currentFileKey || '').trim();

  return (
    <div className={compact ? 'mt-2' : 'mt-3'}>
      <div className="mb-2 text-xs font-semibold text-slate-700">
        历史痛点（{items.length}）
      </div>

      {loading ? (
        <div className="text-xs text-slate-500">历史痛点加载中…</div>
      ) : items.length === 0 ? (
        <div className="text-xs text-slate-500">当前任务暂无历史痛点</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1160px] table-fixed border-collapse text-[13px] text-slate-700">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="w-[120px] px-3 py-3 text-left font-semibold">
                  仓库
                </th>
                <th className="w-[120px] px-3 py-3 text-left font-semibold">
                  责任团队
                </th>
                <th className="w-[110px] px-3 py-3 text-left font-semibold">
                  阶段
                </th>
                <th className="w-[110px] px-3 py-3 text-left font-semibold">
                  问题类型
                </th>
                <th className="w-[280px] px-3 py-3 text-left font-semibold">
                  问题描述
                </th>
                <th className="w-[110px] px-3 py-3 text-left font-semibold">
                  严重程度
                </th>
                <th className="w-[90px] px-3 py-3 text-left font-semibold">
                  状态
                </th>
                <th className="w-[110px] px-3 py-3 text-left font-semibold">
                  结论
                </th>
                <th className="w-[90px] px-3 py-3 text-left font-semibold">
                  责任人
                </th>
                <th className="w-[120px] px-3 py-3 text-left font-semibold">
                  相关报告
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const severity = item.severity || 'P4_TRIVIAL';
                const severityStyle = getPainLevelStyle(severity);
                const statusLabel = STATUS_LABELS[Number(item.status)] || '--';
                const childIds = item.childIds ?? [];
                const entries: Array<{
                  fileKey: string;
                  taskId?: string;
                  painIndex?: number;
                }> = [];
                const seen = new Set<string>();

                for (let i = childIds.length - 1; i >= 0; i -= 1) {
                  const parsed = parseChildId(childIds[i]);
                  if (!parsed || seen.has(parsed.fileKey)) continue;
                  if (
                    normalizedCurrentFileKey &&
                    parsed.fileKey === normalizedCurrentFileKey
                  ) {
                    continue;
                  }
                  seen.add(parsed.fileKey);
                  entries.push(parsed);
                  if (entries.length >= 3) break;
                }

                if (
                  !entries.length &&
                  item.fileKey &&
                  item.fileKey !== normalizedCurrentFileKey
                ) {
                  entries.push({ fileKey: item.fileKey });
                }

                return (
                  <tr
                    key={`${
                      item.id || item.parentId || item.description
                    }-${index}`}
                    className={`border-t border-rose-100/70 align-top transition-colors hover:bg-rose-100/40 ${
                      index % 2 === 0 ? 'bg-white/80' : 'bg-rose-50/40'
                    }`}
                  >
                    <td className="px-3 py-3 font-medium text-slate-900">
                      {item.projectName || item.projectKey || '--'}
                    </td>
                    <td className="px-3 py-3">{item.team || '--'}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {item.journeyStage || '--'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {item.issueType || '--'}
                    </td>
                    <td className="max-w-[360px] px-3 py-3">
                      <Tooltip title={item.description || '--'}>
                        <span className="line-clamp-2 cursor-default">
                          {item.description || '--'}
                        </span>
                      </Tooltip>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${severityStyle.bg} ${severityStyle.text} ${severityStyle.border}`}
                      >
                        {getPainLevelLabel(severity)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {statusLabel}
                    </td>
                    <td className="px-3 py-3">
                      <Tooltip title={item.remark || '--'}>
                        <span className="block cursor-default truncate">
                          {item.remark || '--'}
                        </span>
                      </Tooltip>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {item.teamOwner || item.owner || '--'}
                    </td>
                    <td className="px-3 py-3">
                      {entries.length ? (
                        entries.map(({ fileKey, taskId, painIndex }) => {
                          const search = new URLSearchParams();
                          search.set('project', fileKey);
                          if (taskId) {
                            search.set('focusTaskId', taskId);
                          }
                          if (typeof painIndex === 'number') {
                            search.set('focusPainIndex', String(painIndex));
                            search.set('autoOpenPain', '1');
                          }
                          const href = `/intelligent-analysis/community-experience?${search.toString()}`;
                          const displayText = (() => {
                            const last = fileKey.lastIndexOf('_');
                            if (last <= 0) return fileKey;
                            const prev = fileKey.lastIndexOf('_', last - 1);
                            if (prev < 0 || prev + 1 >= fileKey.length)
                              return fileKey;
                            return fileKey.slice(prev + 1);
                          })();

                          return (
                            <div
                              key={`${fileKey}-${taskId || ''}-${
                                painIndex ?? ''
                              }`}
                              className="leading-5"
                            >
                              <a
                                href={href}
                                className="overview-table-link text-blue-600"
                              >
                                {displayText}
                              </a>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-slate-300">--</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
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
  painFocusTarget,
  onPainFocusHandled,
  versionOptions,
}) => {
  const [obsExpanded, setObsExpanded] = useState(false);
  const canConfirm = !!(fileKey && stepId);
  const { confirmationMap, upsert, overviewPains } = usePainConfirmations(
    canConfirm ? fileKey : undefined
  );

  const displayPainPoints = useMemo(() => {
    if (fileKey && stepId && overviewPains && overviewPains.length > 0) {
      // 从 overviewPains 中过滤出属于当前任务的痛点，包含对 legacyStepId 的兼容
      return overviewPains
        .filter((p: any) => {
          const pid = p.task_id || p.step_id;
          return pid === stepId || (legacyStepId && pid === legacyStepId);
        })
        .sort((a: any, b: any) => (a.pain_index ?? 0) - (b.pain_index ?? 0))
        .map((p: any) => ({
          text: p.pain_text,
          index: p.pain_index ?? 0,
        }));
    }
    // 不再自动降级为原来的 pain_points prop
    return [];
  }, [fileKey, stepId, legacyStepId, overviewPains]);

  const hasPain = displayPainPoints.length > 0;
  const hasObs = !!observations && observations.length > 0;
  const projectKey = useMemo(
    () => deriveProjectKeyFromFileKey(fileKey),
    [fileKey]
  );
  const targetTaskIds = useMemo(() => {
    const ids = new Set<string>();
    if (stepId?.trim()) ids.add(stepId.trim());
    if (legacyStepId?.trim()) ids.add(legacyStepId.trim());
    return ids;
  }, [legacyStepId, stepId]);

  const { data: overviewCardResp, isFetching: parentPainsLoading } = useQuery({
    queryKey: ['userJourneyParentPainsByProject', projectKey],
    queryFn: () =>
      fetchOverviewCards({
        viewType: 'repo',
        repo: projectKey,
        includeCommonIssues: true,
        page: 1,
        size: 1,
      }),
    enabled: !!projectKey && targetTaskIds.size > 0,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const taskParentPains = useMemo(() => {
    if (!fileKey || targetTaskIds.size === 0)
      return [] as OverviewPainPointRow[];

    const card = overviewCardResp?.items?.[0];
    const rows = card?.painPoints ?? [];
    if (!rows.length) return [] as OverviewPainPointRow[];

    return rows.filter((row) => {
      const childIds = row.childIds ?? [];
      if (!childIds.length) return false;

      return childIds.some((rawId) => {
        const parsed = parseChildId(rawId);
        if (!parsed) return false;
        if (parsed.fileKey !== fileKey) return false;
        return targetTaskIds.has(parsed.taskId);
      });
    });
  }, [fileKey, overviewCardResp?.items, targetTaskIds]);

  const historyParentPains = useMemo(() => {
    if (targetTaskIds.size === 0) return [] as OverviewPainPointRow[];

    const card = overviewCardResp?.items?.[0];
    const rows = card?.painPoints ?? [];
    if (!rows.length) return [] as OverviewPainPointRow[];

    return rows.filter((row) => {
      const childIds = row.childIds ?? [];
      if (!childIds.length) return false;

      let hasTaskMatch = false;
      let hasHistoricalEntry = false;

      for (const rawId of childIds) {
        const parsed = parseChildId(rawId);
        if (!parsed || !targetTaskIds.has(parsed.taskId)) continue;

        hasTaskMatch = true;
        if (!fileKey || parsed.fileKey !== fileKey) {
          hasHistoricalEntry = true;
          break;
        }
      }

      return hasTaskMatch && hasHistoricalEntry;
    });
  }, [fileKey, overviewCardResp?.items, targetTaskIds]);

  const autoOpenIndex = useMemo(() => {
    if (!painFocusTarget || !displayPainPoints.length) return null;
    const target = painFocusTarget.painIndex;

    // 检查 displayPainPoints 中是否存在 index 为 target 的项
    const match = displayPainPoints.find((p) => p.index === target);
    if (match) return target;

    // 兼容性逻辑：如果是 1-based index，尝试匹配 target - 1
    if (typeof target === 'number' && target > 0) {
      const matchMinusOne = displayPainPoints.find(
        (p) => p.index === target - 1
      );
      if (matchMinusOne) return target - 1;
    }

    return null;
  }, [painFocusTarget, displayPainPoints]);

  const shouldAutoOpenForIndex = (index: number) => {
    return index === autoOpenIndex;
  };

  useEffect(() => {
    if (painFocusTarget && hasPain && autoOpenIndex === null) {
      onPainFocusHandled?.();
    }
  }, [autoOpenIndex, painFocusTarget, hasPain, onPainFocusHandled]);

  const findParentPainByIndex = (
    index: number
  ): OverviewPainPointRow | undefined => {
    if (!fileKey || targetTaskIds.size === 0) return undefined;

    return taskParentPains.find((row) => {
      const childIds = row.childIds ?? [];
      return childIds.some((rawId) => {
        const parsed = parseChildId(rawId);
        if (!parsed) return false;
        if (parsed.fileKey !== fileKey) return false;
        if (!targetTaskIds.has(parsed.taskId)) return false;
        if (typeof parsed.painIndex !== 'number') return false;
        return parsed.painIndex === index || parsed.painIndex === index + 1;
      });
    });
  };

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
              {displayPainPoints.map(({ text, index }) => (
                <PainPointItem
                  key={index}
                  text={text}
                  index={index}
                  fileKey={fileKey}
                  stepId={stepId}
                  legacyStepId={legacyStepId}
                  parentPain={findParentPainByIndex(index)}
                  toolIds={pain_points_tool_nums?.[index]}
                  onStepClick={onStepClick}
                  compact
                  shouldAutoOpen={shouldAutoOpenForIndex(index)}
                  onAutoOpenHandled={onPainFocusHandled}
                  versionOptions={versionOptions}
                />
              ))}
            </ul>
            <HistoryPainTable
              items={historyParentPains}
              loading={parentPainsLoading}
              compact
              currentFileKey={fileKey}
            />
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
              {displayPainPoints.length}
            </span>
          </div>
          <ul className="space-y-1.5">
            {displayPainPoints.map(({ text, index }) => (
              <PainPointItem
                key={index}
                text={text}
                index={index}
                fileKey={fileKey}
                stepId={stepId}
                legacyStepId={legacyStepId}
                parentPain={findParentPainByIndex(index)}
                toolIds={pain_points_tool_nums?.[index]}
                onStepClick={onStepClick}
                shouldAutoOpen={shouldAutoOpenForIndex(index)}
                onAutoOpenHandled={onPainFocusHandled}
                versionOptions={versionOptions}
              />
            ))}
          </ul>
          <HistoryPainTable
            items={historyParentPains}
            loading={parentPainsLoading}
            currentFileKey={fileKey}
          />
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
