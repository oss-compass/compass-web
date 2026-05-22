import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Popover, Tooltip } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PainLevelConfirmModal, {
  getPainLevelLabel,
  getPainLevelStyle,
  STATUS_LABELS,
  PainStatus,
} from './PainLevelConfirmModal';
import { usePainConfirmations } from '../hooks/usePainConfirmations';
import {
  fetchOverviewCards,
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
    painId: string;
    autoOpen?: boolean;
  };
  onPainFocusHandled?: () => void;
  isLatestReport?: boolean;
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
  actionReason?: string;
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
  actionReason,
  commonIssueType,
  isCommonIssue = false,
  confirmedBy,
  confirmedAt,
  prLink,
  retestPassedFileKey,
  onClick,
}) => {
  const style = getPainLevelStyle(severity);
  const baseLabel =
    status === PainStatus.NO_FIX_NEEDED
      ? '非项目本身问题'
      : STATUS_LABELS[status] || '待确认';
  const label = `${baseLabel}${isCommonIssue ? '（共性问题）' : ''}`;
  const statusStyle = (() => {
    if (status === PainStatus.TO_BE_CONFIRMED) {
      return {
        pill: 'border-amber-300 bg-amber-100 text-amber-700',
        dot: 'bg-amber-500',
      };
    }
    if (status === PainStatus.CONFIRMED_PENDING_FIX) {
      return {
        pill: 'border-rose-300 bg-rose-100 text-rose-700',
        dot: 'bg-rose-500',
      };
    }
    if (status === PainStatus.FIXED_PENDING_RETEST) {
      return {
        pill: 'border-indigo-300 bg-indigo-100 text-indigo-700',
        dot: 'bg-indigo-500',
      };
    }
    if (status === PainStatus.RETESTING) {
      return {
        pill: 'border-violet-300 bg-violet-100 text-violet-700',
        dot: 'bg-violet-500',
      };
    }
    if (status === PainStatus.RETESTED_PASSED) {
      return {
        pill: 'border-emerald-300 bg-emerald-100 text-emerald-700',
        dot: 'bg-emerald-500',
      };
    }
    if (status === PainStatus.RETESTED_FAILED) {
      return {
        pill: 'border-rose-300 bg-rose-100 text-rose-700',
        dot: 'bg-rose-500',
      };
    }
    if (status === PainStatus.NO_FIX_NEEDED) {
      return {
        pill: 'border-slate-300 bg-slate-100 text-slate-700',
        dot: 'bg-slate-500',
      };
    }
    return {
      pill: `${style.bg} ${style.text} ${style.border}`,
      dot: style.dot,
    };
  })();

  const popoverContent = (
    <div className="max-w-xs space-y-2 text-sm">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium text-slate-600">严重程度：</span>
        <span className={`${style.text} font-semibold`}>
          {formatSeverityLabel(severity)}
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
      {status === PainStatus.NO_FIX_NEEDED && actionReason ? (
        <div className="space-y-1 text-xs text-slate-500">
          <span className="font-medium text-slate-600">判断原因：</span>
          <div className="rounded bg-emerald-50 px-2 py-1 leading-5 text-emerald-700">
            {actionReason}
          </div>
        </div>
      ) : null}
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
        className={`inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold transition-all hover:shadow-sm ${statusStyle.pill}`}
      >
        <span
          className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${statusStyle.dot}`}
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
  effectiveActionReason?: string;
  effectiveCommonIssueType?: string | null;
  effectiveIsCommonIssue: boolean;
  effectiveConfirmedBy: string;
  effectiveConfirmedAt: string;
  effectiveIssueLink?: string | null;
  effectivePrLink?: string | null;
  effectiveRetestPassedFileKey?: string | null;
  isNonProjectIssue: boolean;
};

const FALLBACK_LINK_TEXT = '未记录';

const normalizePainText = (value: string) => value.trim().replace(/\s+/g, ' ');

const isSamePainText = (left: string, right: string) =>
  normalizePainText(left) === normalizePainText(right);

const formatSeverityLabel = (severity: string) => {
  const raw = String(severity || '').trim();
  if (!raw) return '--';
  const prefix = raw.startsWith('P') ? raw.slice(0, 2) : '';
  const label = getPainLevelLabel(raw);
  if (raw === 'P4_TRIVIAL' || label === '非项目本身问题') return label;
  if (!prefix) return label;
  if (String(label || '').startsWith(prefix)) return label;
  return `${prefix}${label}`;
};

const isNonProjectSeverity = (severity?: string | null) => {
  const raw = String(severity || '').trim();
  return raw === 'P4_TRIVIAL' || getPainLevelLabel(raw) === '非项目本身问题';
};

const getActionReasonText = (
  value?: Pick<
    Partial<PainConfirmationRecord>,
    'action_reason' | 'reason'
  > | null
) => String(value?.action_reason || value?.reason || '').trim();

const getFallbackModalLinkValue = (value?: string | null): string =>
  String(value || '').trim() || FALLBACK_LINK_TEXT;

const getExistingPainConfirmation = ({
  canConfirm,
  confirmationMap,
  fileKey,
  stepId,
  legacyStepId,
  painIndex,
  text,
}: {
  canConfirm: boolean;
  confirmationMap: Map<string, PainConfirmationRecord>;
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  painIndex: number;
  text: string;
}): PainConfirmationRecord | undefined => {
  if (!canConfirm || !fileKey || !stepId) return undefined;

  const record =
    confirmationMap.get(`${fileKey}#${stepId}#${painIndex}`) ??
    (legacyStepId
      ? confirmationMap.get(`${fileKey}#${legacyStepId}#${painIndex}`)
      : undefined);

  return record;
};

const derivePainDisplayState = ({
  existing,
  parentPain,
  childSeverity,
  painIndex,
  text,
  isLatestReport,
}: {
  existing?: PainConfirmationRecord;
  parentPain?: OverviewPainPointRow;
  childSeverity?: string;
  painIndex: number;
  text: string;
  isLatestReport: boolean;
}): DerivedPainDisplayState => {
  const parentStatusValue = String(parentPain?.status ?? '').trim();
  const parentStatusNum = Number.parseInt(parentStatusValue, 10);
  const childMatched = !!(existing && existing.pain_index === painIndex);

  const getEffectiveStatus = () => {
    if (childMatched && typeof existing?.status === 'number') {
      return existing.status;
    }
    if (!Number.isNaN(parentStatusNum)) return parentStatusNum;
    return undefined;
  };

  const getEffectiveSeverity = () => {
    const parentSeverity = String(parentPain?.severity || '').trim();
    if (parentSeverity) return parentSeverity;
    const childDefaultSeverity = String(childSeverity || '').trim();
    if (childDefaultSeverity) return childDefaultSeverity;
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
  const effectiveActionReason = childMatched
    ? getActionReasonText(existing)
    : '';

  const effectiveStatusRaw = getEffectiveStatus();
  const normalizedEffectiveStatus =
    isLatestReport && effectiveStatusRaw === PainStatus.RETESTED_FAILED
      ? PainStatus.CONFIRMED_PENDING_FIX
      : effectiveStatusRaw;
  const effectiveSeverity = getEffectiveSeverity();
  const isNonProjectIssue =
    normalizedEffectiveStatus === PainStatus.NO_FIX_NEEDED ||
    isNonProjectSeverity(effectiveSeverity);
  const effectiveStatus = isNonProjectIssue
    ? PainStatus.NO_FIX_NEEDED
    : normalizedEffectiveStatus;

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

  return {
    childMatched,
    effectiveStatus,
    effectiveSeverity,
    effectiveActionReason,
    effectiveCommonIssueType: commonIssueType,
    effectiveIsCommonIssue: isCommonIssue,
    effectiveConfirmedBy,
    effectiveConfirmedAt,
    effectiveIssueLink: issueLink,
    effectivePrLink: prLink,
    effectiveRetestPassedFileKey,
    isNonProjectIssue,
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
      action_reason:
        displayState.effectiveActionReason || existing.action_reason,
      reason: displayState.effectiveActionReason || existing.reason,
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
    action_reason: displayState.effectiveActionReason || null,
    reason: displayState.effectiveActionReason || null,
    is_common_issue: displayState.effectiveIsCommonIssue,
    common_issue_type: displayState.effectiveCommonIssueType ?? null,
    issue_link: getFallbackModalLinkValue(displayState.effectiveIssueLink),
    pr_link: getFallbackModalLinkValue(displayState.effectivePrLink),
    confirmed_by:
      displayState.effectiveConfirmedBy === '--'
        ? ''
        : displayState.effectiveConfirmedBy,
    confirmed_at: displayState.effectiveConfirmedAt || '',
    latest_file_key: existing?.latest_file_key || fileKey || null,
  };
};

const PainPointBadge: React.FC<{
  canConfirm: boolean;
  displayState: DerivedPainDisplayState;
  onClick: () => void;
}> = ({ canConfirm, displayState, onClick }) => {
  if (!canConfirm || typeof displayState.effectiveStatus !== 'number') {
    return <UnconfirmedBadge onClick={onClick} />;
  }

  return (
    <StatusBadge
      status={displayState.effectiveStatus}
      severity={displayState.effectiveSeverity || 'P4_TRIVIAL'}
      actionReason={displayState.effectiveActionReason}
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

function deriveProjectKeyFromFileKey(value?: string): string {
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
}

/* ─── 单条痛点行（含确认交互） ─── */
const PainPointItem: React.FC<{
  text: string;
  index: number;
  childSeverity?: string;
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  parentPain?: OverviewPainPointRow;
  isLatestReport?: boolean;
  compact?: boolean;
  toolIds?: string[];
  onStepClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
  shouldAutoOpen?: boolean;
  onAutoOpenHandled?: () => void;
  versionOptions?: Array<{ value: string; label: string }>;
}> = ({
  text,
  index,
  childSeverity,
  fileKey,
  stepId,
  legacyStepId,
  parentPain,
  isLatestReport = false,
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
  const queryClient = useQueryClient();

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
    painIndex: index,
    text,
  });
  const parentPainId = String(
    parentPain?.parentId || parentPain?.id || ''
  ).trim();
  const parentStatusValue = String(parentPain?.status ?? '').trim();
  const displayState = derivePainDisplayState({
    existing,
    parentPain,
    childSeverity,
    painIndex: index,
    text,
    isLatestReport,
  });

  const handleSubmit = async (payload: UpsertPainConfirmationPayload) => {
    const result = await upsert(payload);
    const nextStatus = String(result.data?.status ?? payload.status ?? '');

    void parentPainId;
    void parentStatusValue;
    void nextStatus;
    const projectKey = deriveProjectKeyFromFileKey(fileKey);
    if (projectKey) {
      const latestOverview = await fetchOverviewCards({
        viewType: 'repo',
        repo: projectKey,
        includeCommonIssues: true,
        page: 1,
        size: 1,
      });
      queryClient.setQueryData(
        ['userJourneyParentPainsByProject', projectKey],
        latestOverview
      );
    }
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
          parentPainRemark={parentPain?.remark}
          versionOptions={versionOptions}
          onCancel={handleModalClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

const parseChildId = (
  raw: string
): {
  painId: string;
  fileKey: string;
  taskId: string;
  painIndex?: number;
} | null => {
  const text = String(raw || '').trim();
  if (!text) return null;

  const [fileKeyRaw, taskIdRaw, painIndexRaw] = text.split('#');
  const fileKey = String(fileKeyRaw || '').trim();
  if (!fileKey) return null;

  const taskId = String(taskIdRaw || '').trim();
  const painIndexNum = Number.parseInt(String(painIndexRaw || '').trim(), 10);

  return {
    painId: text,
    fileKey,
    taskId,
    painIndex: Number.isNaN(painIndexNum) ? undefined : painIndexNum,
  };
};

type DisplayPainPoint = {
  id?: string;
  text: string;
  index: number;
  severity?: string;
};

const HistoryPainTable: React.FC<{
  items: OverviewPainPointRow[];
  loading: boolean;
  compact?: boolean;
  currentFileKey?: string;
  isLatestReport?: boolean;
}> = ({
  items,
  loading,
  compact = false,
  currentFileKey,
  isLatestReport = false,
}) => {
  const normalizedCurrentFileKey = String(currentFileKey || '').trim();
  const hasRetestedPain = useMemo(
    () =>
      items.some((item) => {
        const rawStatus = Number(item.status);
        return (
          rawStatus === PainStatus.RETESTED_PASSED ||
          rawStatus === PainStatus.RETESTED_FAILED
        );
      }),
    [items]
  );
  const [open, setOpen] = useState(true);
  const getStatusPillStyle = (status: number) => {
    const cfg: Record<number, string> = {
      [PainStatus.TO_BE_CONFIRMED]:
        'border-amber-200 bg-amber-50 text-amber-700',
      [PainStatus.CONFIRMED_PENDING_FIX]:
        'border-rose-200 bg-rose-50 text-rose-700',
      [PainStatus.FIXED_PENDING_RETEST]:
        'border-indigo-200 bg-indigo-50 text-indigo-700',
      [PainStatus.RETESTING]: 'border-violet-200 bg-violet-50 text-violet-700',
      [PainStatus.RETESTED_PASSED]:
        'border-emerald-200 bg-emerald-50 text-emerald-700',
      [PainStatus.NO_FIX_NEEDED]: 'border-slate-200 bg-slate-50 text-slate-600',
      [PainStatus.RETESTED_FAILED]: 'border-rose-200 bg-rose-50 text-rose-700',
    };
    return cfg[status] || 'border-slate-200 bg-slate-50 text-slate-600';
  };

  useEffect(() => {
    if (loading) return;
    setOpen(!hasRetestedPain);
  }, [hasRetestedPain, loading]);

  return (
    <div className={compact ? 'mt-2' : 'mt-3'}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700"
      >
        历史痛点（{items.length}）
        {items.length > 0 && (
          <svg
            className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {loading ? (
        <div className="text-xs text-slate-500">历史痛点加载中…</div>
      ) : items.length === 0 ? (
        <div className="text-xs text-slate-500">当前任务暂无历史痛点</div>
      ) : !open ? (
        <div className="text-xs text-slate-400">已收起</div>
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
                  复测报告ID
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
                const rawStatus = Number(item.status);
                const normalizedStatus =
                  isLatestReport && rawStatus === PainStatus.RETESTED_FAILED
                    ? PainStatus.CONFIRMED_PENDING_FIX
                    : rawStatus;
                const statusLabel = STATUS_LABELS[normalizedStatus] || '--';
                const childIds = item.childIds ?? [];
                const entries: Array<{
                  painId?: string;
                  fileKey: string;
                  taskId?: string;
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
                        {formatSeverityLabel(severity)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${getStatusPillStyle(
                          normalizedStatus
                        )}`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <Tooltip title={item.remark || '--'}>
                        {item.remark ? (
                          <a
                            href={`/intelligent-analysis/community-experience?project=${encodeURIComponent(
                              item.remark
                            )}`}
                            className="overview-table-link block truncate text-blue-600"
                          >
                            {item.remark}
                          </a>
                        ) : (
                          <span className="block cursor-default truncate">
                            --
                          </span>
                        )}
                      </Tooltip>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {item.teamOwner || item.owner || '--'}
                    </td>
                    <td className="px-3 py-3">
                      {entries.length ? (
                        entries.map(({ painId, fileKey, taskId }) => {
                          const search = new URLSearchParams();
                          search.set('project', fileKey);
                          if (taskId) {
                            search.set('focusTaskId', taskId);
                          }
                          if (painId) {
                            search.set('painId', painId);
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
                              key={`${fileKey}-${taskId || ''}-${painId || ''}`}
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
  isLatestReport = false,
  versionOptions,
}) => {
  const [obsExpanded, setObsExpanded] = useState(false);
  const canConfirm = !!(fileKey && stepId);
  const { confirmationMap, upsert, overviewPains } = usePainConfirmations(
    canConfirm ? fileKey : undefined
  );

  const displayPainPoints = useMemo<DisplayPainPoint[]>(() => {
    if (fileKey && stepId && overviewPains && overviewPains.length > 0) {
      // 从 overviewPains 中过滤出属于当前任务的痛点，包含对 legacyStepId 的兼容
      return overviewPains
        .filter((p: any) => {
          const pid = p.task_id || p.step_id;
          if (!(pid === stepId || (legacyStepId && pid === legacyStepId)))
            return false;
          return !!String(p.id || '').trim();
        })
        .sort((a: any, b: any) => (a.pain_index ?? 0) - (b.pain_index ?? 0))
        .map((p: any) => ({
          id: p.id,
          text: p.pain_text,
          index: p.pain_index ?? 0,
          severity: p.severity,
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
    staleTime: 0,
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

  const autoOpenPainId = useMemo(() => {
    const target = String(painFocusTarget?.painId || '').trim();
    if (!target || !displayPainPoints.length) return null;
    return displayPainPoints.some((p) => p.id === target) ? target : null;
  }, [displayPainPoints, painFocusTarget?.painId]);

  const shouldAutoOpenForPainId = (painId?: string) => {
    return !!painId && painId === autoOpenPainId;
  };

  useEffect(() => {
    if (painFocusTarget && hasPain && autoOpenPainId === null) {
      onPainFocusHandled?.();
    }
  }, [autoOpenPainId, painFocusTarget, hasPain, onPainFocusHandled]);

  const findParentPainForPain = (
    pain: Pick<DisplayPainPoint, 'id' | 'index'>
  ): OverviewPainPointRow | undefined => {
    if (!fileKey || targetTaskIds.size === 0) return undefined;

    if (!pain.id) return undefined;
    return taskParentPains.find((row) =>
      (row.childIds ?? []).includes(pain.id!)
    );
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
              {displayPainPoints.map(({ id, text, index, severity }) => (
                <PainPointItem
                  key={id || index}
                  text={text}
                  index={index}
                  childSeverity={severity}
                  fileKey={fileKey}
                  stepId={stepId}
                  legacyStepId={legacyStepId}
                  parentPain={findParentPainForPain({ id, index })}
                  isLatestReport={isLatestReport}
                  toolIds={pain_points_tool_nums?.[index]}
                  onStepClick={onStepClick}
                  compact
                  shouldAutoOpen={shouldAutoOpenForPainId(id)}
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
              isLatestReport={isLatestReport}
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
            {displayPainPoints.map(({ id, text, index, severity }) => (
              <PainPointItem
                key={id || index}
                text={text}
                index={index}
                childSeverity={severity}
                fileKey={fileKey}
                stepId={stepId}
                legacyStepId={legacyStepId}
                parentPain={findParentPainForPain({ id, index })}
                isLatestReport={isLatestReport}
                toolIds={pain_points_tool_nums?.[index]}
                onStepClick={onStepClick}
                shouldAutoOpen={shouldAutoOpenForPainId(id)}
                onAutoOpenHandled={onPainFocusHandled}
                versionOptions={versionOptions}
              />
            ))}
          </ul>
          <HistoryPainTable
            items={historyParentPains}
            loading={parentPainsLoading}
            currentFileKey={fileKey}
            isLatestReport={isLatestReport}
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
