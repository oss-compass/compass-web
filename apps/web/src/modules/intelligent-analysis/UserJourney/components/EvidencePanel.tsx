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
  fetchPainConfirmations,
  fetchOverviewParentChildren,
  type OverviewPainPointRow,
  type OverviewParentChildPain,
  type PainConfirmationRecord,
  type UpsertPainConfirmationPayload,
} from '../rawData/apiClient';
import { formatLocalDateTime } from '../time';
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
  legacyStepIds?: string[];
  highlightTaskId?: string;
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
  previewMode?: boolean;
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

const getStatusBadgeBaseLabel = (
  status: number,
  normalizedReviewStatus: string
) => {
  if (status !== PainStatus.NO_FIX_NEEDED) {
    return STATUS_LABELS[status] || '待确认';
  }
  if (normalizedReviewStatus === 'pending') {
    return '非项目本身问题（待审核）';
  }
  if (normalizedReviewStatus === 'rejected') {
    return '非项目本身问题已拒绝';
  }
  return '非项目本身问题';
};

const getStatusBadgeLabel = ({
  status,
  normalizedReviewStatus,
  mergedStatusInheritedHint,
  isCommonIssue,
}: {
  status: number;
  normalizedReviewStatus: string;
  mergedStatusInheritedHint?: string;
  isCommonIssue: boolean;
}) =>
  `${getStatusBadgeBaseLabel(status, normalizedReviewStatus)}${
    mergedStatusInheritedHint ? '（已合并）' : ''
  }${isCommonIssue ? '（共性问题）' : ''}`;

const getStatusBadgeStyle = (status: number, severity: string) => {
  const style = getPainLevelStyle(severity);
  const styleMap: Record<number, { pill: string; dot: string }> = {
    [PainStatus.TO_BE_CONFIRMED]: {
      pill: 'border-amber-300 bg-amber-100 text-amber-700',
      dot: 'bg-amber-500',
    },
    [PainStatus.CONFIRMED_PENDING_FIX]: {
      pill: 'border-rose-300 bg-rose-100 text-rose-700',
      dot: 'bg-rose-500',
    },
    [PainStatus.FIXED_PENDING_RETEST]: {
      pill: 'border-indigo-300 bg-indigo-100 text-indigo-700',
      dot: 'bg-indigo-500',
    },
    [PainStatus.RETESTING]: {
      pill: 'border-violet-300 bg-violet-100 text-violet-700',
      dot: 'bg-violet-500',
    },
    [PainStatus.RETESTED_PASSED]: {
      pill: 'border-emerald-300 bg-emerald-100 text-emerald-700',
      dot: 'bg-emerald-500',
    },
    [PainStatus.RETESTED_FAILED]: {
      pill: 'border-rose-300 bg-rose-100 text-rose-700',
      dot: 'bg-rose-500',
    },
    [PainStatus.NO_FIX_NEEDED]: {
      pill: 'border-slate-300 bg-slate-100 text-slate-700',
      dot: 'bg-slate-500',
    },
  };
  return (
    styleMap[status] || {
      pill: `${style.bg} ${style.text} ${style.border}`,
      dot: style.dot,
    }
  );
};

const hasNonProjectReviewMetadata = ({
  normalizedReviewStatus,
  nonProjectReviewReason,
  nonProjectReviewedBy,
  nonProjectReviewedAt,
}: {
  normalizedReviewStatus: string;
  nonProjectReviewReason?: string | null;
  nonProjectReviewedBy?: string | null;
  nonProjectReviewedAt?: string | null;
}) =>
  Boolean(
    normalizedReviewStatus ||
      String(nonProjectReviewReason || '').trim() ||
      String(nonProjectReviewedBy || '').trim() ||
      String(nonProjectReviewedAt || '').trim()
  );

const StatusBadgePopoverContent: React.FC<{
  status: number;
  severity: string;
  actionReason?: string;
  normalizedReviewStatus: string;
  hasNonProjectReviewInfo: boolean;
  nonProjectReviewReason?: string | null;
  nonProjectReviewedBy?: string | null;
  nonProjectReviewedAt?: string | null;
  mergedStatusInheritedHint?: string;
  commonIssueType?: string | null;
  confirmedBy: string;
  confirmedAt: string;
  prLink?: string | null;
  retestPassedFileKey?: string | null;
}> = ({
  status,
  severity,
  actionReason,
  normalizedReviewStatus,
  hasNonProjectReviewInfo,
  nonProjectReviewReason,
  nonProjectReviewedBy,
  nonProjectReviewedAt,
  mergedStatusInheritedHint,
  commonIssueType,
  confirmedBy,
  confirmedAt,
  prLink,
  retestPassedFileKey,
}) => {
  const style = getPainLevelStyle(severity);
  return (
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
      {status === PainStatus.RETESTED_PASSED && prLink ? (
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
      ) : null}
      {status === PainStatus.RETESTED_PASSED && retestPassedFileKey ? (
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
      ) : null}
      {(status === PainStatus.NO_FIX_NEEDED ||
        status === PainStatus.RETESTED_FAILED) &&
      actionReason ? (
        <div className="space-y-1 text-xs text-slate-500">
          <span className="font-medium text-slate-600">
            {status === PainStatus.RETESTED_FAILED
              ? '不通过原因：'
              : '判断原因：'}
          </span>
          <div
            className={`rounded px-2 py-1 leading-5 ${
              status === PainStatus.RETESTED_FAILED
                ? 'bg-rose-50 text-rose-700'
                : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            {actionReason}
          </div>
        </div>
      ) : null}
      {hasNonProjectReviewInfo ? (
        <div className="space-y-2 rounded border border-slate-200 bg-slate-50 p-2">
          <div className="text-xs font-medium text-slate-600">
            非项目本身问题审核
          </div>
          {normalizedReviewStatus ? (
            <div className="space-y-1 text-xs text-slate-500">
              <span className="font-medium text-slate-600">审核状态：</span>
              <div className="rounded bg-white px-2 py-1 leading-5 text-slate-600">
                {normalizedReviewStatus === 'pending'
                  ? '待审核'
                  : normalizedReviewStatus === 'approved'
                  ? '已通过'
                  : '已拒绝并回退到待确认'}
              </div>
            </div>
          ) : null}
          {actionReason && normalizedReviewStatus === 'rejected' ? (
            <div className="space-y-1 text-xs text-slate-500">
              <span className="font-medium text-slate-600">判断原因：</span>
              <div className="rounded bg-emerald-50 px-2 py-1 leading-5 text-emerald-700">
                {actionReason}
              </div>
            </div>
          ) : null}
          {nonProjectReviewReason ? (
            <div className="space-y-1 text-xs text-slate-500">
              <span className="font-medium text-slate-600">
                {normalizedReviewStatus === 'rejected'
                  ? '拒绝理由：'
                  : '审核说明：'}
              </span>
              <div className="rounded bg-amber-50 px-2 py-1 leading-5 text-amber-700">
                {nonProjectReviewReason}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium text-slate-600">操作人：</span>
        {confirmedBy}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="font-medium text-slate-600">操作时间：</span>
        {formatLocalDateTime(confirmedAt)}
      </div>
      {hasNonProjectReviewInfo && nonProjectReviewedBy ? (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="font-medium text-slate-600">审核人：</span>
          {nonProjectReviewedBy}
        </div>
      ) : null}
      {hasNonProjectReviewInfo && nonProjectReviewedAt ? (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="font-medium text-slate-600">审核时间：</span>
          {formatLocalDateTime(nonProjectReviewedAt)}
        </div>
      ) : null}
      {mergedStatusInheritedHint ? (
        <div className="space-y-1 text-xs text-slate-500">
          <span className="font-medium text-slate-600">状态说明：</span>
          <div className="rounded bg-slate-50 px-2 py-1 leading-5 text-slate-600">
            {mergedStatusInheritedHint}
          </div>
        </div>
      ) : null}
      <div className="rounded bg-slate-50 px-2 py-1 text-xs text-slate-500">
        点击进入痛点管理
      </div>
    </div>
  );
};

/* ─── 状态 Badge（可再次点击修改） ─── */
const StatusBadge: React.FC<{
  status: number;
  severity: string;
  actionReason?: string;
  nonProjectReviewStatus?: string | null;
  nonProjectReviewReason?: string | null;
  nonProjectReviewedBy?: string | null;
  nonProjectReviewedAt?: string | null;
  mergedStatusInheritedHint?: string;
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
  nonProjectReviewStatus,
  nonProjectReviewReason,
  nonProjectReviewedBy,
  nonProjectReviewedAt,
  mergedStatusInheritedHint,
  commonIssueType,
  isCommonIssue = false,
  confirmedBy,
  confirmedAt,
  prLink,
  retestPassedFileKey,
  onClick,
}) => {
  const normalizedReviewStatus = String(nonProjectReviewStatus || '').trim();
  const hasNonProjectReviewInfo = hasNonProjectReviewMetadata({
    normalizedReviewStatus,
    nonProjectReviewReason,
    nonProjectReviewedBy,
    nonProjectReviewedAt,
  });
  const label = getStatusBadgeLabel({
    status,
    normalizedReviewStatus,
    mergedStatusInheritedHint,
    isCommonIssue,
  });
  const statusStyle = getStatusBadgeStyle(status, severity);

  return (
    <Popover
      content={
        <StatusBadgePopoverContent
          status={status}
          severity={severity}
          actionReason={actionReason}
          normalizedReviewStatus={normalizedReviewStatus}
          hasNonProjectReviewInfo={hasNonProjectReviewInfo}
          nonProjectReviewReason={nonProjectReviewReason}
          nonProjectReviewedBy={nonProjectReviewedBy}
          nonProjectReviewedAt={nonProjectReviewedAt}
          mergedStatusInheritedHint={mergedStatusInheritedHint}
          commonIssueType={commonIssueType}
          confirmedBy={confirmedBy}
          confirmedAt={confirmedAt}
          prLink={prLink}
          retestPassedFileKey={retestPassedFileKey}
        />
      }
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
  effectiveNonProjectReviewStatus?: 'pending' | 'approved' | 'rejected' | null;
  effectiveNonProjectReviewReason?: string | null;
  effectiveNonProjectReviewedBy?: string | null;
  effectiveNonProjectReviewedAt?: string | null;
  isNonProjectIssue: boolean;
  mergedStatusInheritedHint?: string;
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

const getLatestParentStatusHistory = (parentPain?: OverviewPainPointRow) => {
  const history = parentPain?.statusHistory ?? [];
  for (let i = history.length - 1; i >= 0; i -= 1) {
    const item = history[i];
    if (
      String(item?.reason || '').trim() ||
      String(item?.by || '').trim() ||
      String(item?.at || '').trim()
    ) {
      return item;
    }
  }
  return undefined;
};

const getFallbackModalLinkValue = (value?: string | null): string =>
  String(value || '').trim() || FALLBACK_LINK_TEXT;

const getExistingPainConfirmation = ({
  canConfirm,
  confirmationMap,
  fileKey,
  stepId,
  legacyStepId,
  legacyStepIds,
  painIndex,
  text,
}: {
  canConfirm: boolean;
  confirmationMap: Map<string, PainConfirmationRecord>;
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  legacyStepIds?: string[];
  painIndex: number;
  text: string;
}): PainConfirmationRecord | undefined => {
  if (!canConfirm || !fileKey || !stepId) return undefined;

  const candidateStepIds = Array.from(
    new Set(
      [stepId, legacyStepId, ...(legacyStepIds ?? [])]
        .map((value) => String(value || '').trim())
        .filter(Boolean)
    )
  );

  const record =
    confirmationMap.get(`${fileKey}#${stepId}#${painIndex}`) ??
    candidateStepIds
      .filter((candidateStepId) => candidateStepId !== stepId)
      .map((candidateStepId) =>
        confirmationMap.get(`${fileKey}#${candidateStepId}#${painIndex}`)
      )
      .find(Boolean);

  if (record) {
    return record;
  }

  return Array.from(confirmationMap.values()).find((item) => {
    if (String(item.file_key || '').trim() !== fileKey) return false;
    if (!candidateStepIds.includes(String(item.step_id || '').trim()))
      return false;
    return isSamePainText(String(item.pain_text || ''), text);
  });
};

const getParentPainStatus = (parentPain?: OverviewPainPointRow) => {
  const parentStatusValue = String(parentPain?.status ?? '').trim();
  const parentStatusNum = Number.parseInt(parentStatusValue, 10);
  return Number.isNaN(parentStatusNum) ? undefined : parentStatusNum;
};

const getNormalizedChildStatus = (childStatus?: number) =>
  typeof childStatus === 'number' && Number.isFinite(childStatus)
    ? childStatus
    : undefined;

const getEffectivePainStatus = ({
  existingStatus,
  normalizedChildStatus,
  parentStatus,
  isLatestReport,
  shouldUseHistoricalTerminalStatus,
}: {
  existingStatus?: number;
  normalizedChildStatus?: number;
  parentStatus?: number;
  isLatestReport: boolean;
  shouldUseHistoricalTerminalStatus: boolean;
}) => {
  if (shouldUseHistoricalTerminalStatus) {
    return existingStatus;
  }
  if (isLatestReport && typeof normalizedChildStatus === 'number') {
    return normalizedChildStatus;
  }
  if (typeof parentStatus === 'number') {
    return parentStatus;
  }
  if (typeof normalizedChildStatus === 'number') {
    return normalizedChildStatus;
  }
  if (typeof existingStatus === 'number') {
    return existingStatus;
  }
  return undefined;
};

const getEffectivePainSeverity = ({
  parentPain,
  childSeverity,
  existing,
  childMatched,
}: {
  parentPain?: OverviewPainPointRow;
  childSeverity?: string;
  existing?: PainConfirmationRecord;
  childMatched: boolean;
}) => {
  const parentSeverity = String(parentPain?.severity || '').trim();
  if (parentSeverity) return parentSeverity;

  const childDefaultSeverity = String(childSeverity || '').trim();
  if (childDefaultSeverity) return childDefaultSeverity;

  return childMatched ? String(existing?.severity || '').trim() : '';
};

const getEffectiveCommonIssueState = ({
  parentPain,
  existing,
  childMatched,
}: {
  parentPain?: OverviewPainPointRow;
  existing?: PainConfirmationRecord;
  childMatched: boolean;
}) => {
  const commonIssueType =
    parentPain?.commonIssueType ||
    (childMatched ? existing?.common_issue_type : undefined);

  const isCommonIssue =
    parentPain?.isCommonIssue === true ||
    !!String(commonIssueType || '').trim() ||
    (childMatched && existing?.is_common_issue === true);

  return { commonIssueType, isCommonIssue };
};

const getEffectiveLinks = ({
  parentPain,
  existing,
}: {
  parentPain?: OverviewPainPointRow;
  existing?: PainConfirmationRecord;
}) => ({
  issueLink:
    existing?.issue_link ||
    parentPain?.issueLink ||
    parentPain?.issueOrPrLink ||
    undefined,
  prLink:
    existing?.pr_link ||
    parentPain?.prLink ||
    parentPain?.issueOrPrLink ||
    undefined,
});

const getEffectiveNonProjectReviewState = ({
  existing,
  historicalParentConfirmation,
}: {
  existing?: PainConfirmationRecord;
  historicalParentConfirmation?: PainConfirmationRecord;
}) => {
  const rawStatus =
    existing?.non_project_review_status ||
    historicalParentConfirmation?.non_project_review_status ||
    undefined;
  const reviewStatus =
    rawStatus === 'pending' ||
    rawStatus === 'approved' ||
    rawStatus === 'rejected'
      ? rawStatus
      : undefined;
  return {
    reviewStatus,
    reviewReason:
      existing?.non_project_review_reason ||
      historicalParentConfirmation?.non_project_review_reason ||
      undefined,
    reviewedBy:
      existing?.non_project_reviewed_by ||
      historicalParentConfirmation?.non_project_reviewed_by ||
      undefined,
    reviewedAt:
      existing?.non_project_reviewed_at ||
      historicalParentConfirmation?.non_project_reviewed_at ||
      undefined,
  };
};

const getEffectiveActionReason = ({
  existing,
  historicalParentConfirmation,
  parentPain,
  parentStatus,
  latestParentStatusHistory,
  shouldUseHistoricalTerminalStatus,
}: {
  existing?: PainConfirmationRecord;
  historicalParentConfirmation?: PainConfirmationRecord;
  parentPain?: OverviewPainPointRow;
  parentStatus?: number;
  latestParentStatusHistory?: ReturnType<typeof getLatestParentStatusHistory>;
  shouldUseHistoricalTerminalStatus: boolean;
}) =>
  (shouldUseHistoricalTerminalStatus ? getActionReasonText(existing) : '') ||
  getActionReasonText(existing) ||
  getActionReasonText(historicalParentConfirmation) ||
  String(parentPain?.actionReason || '').trim() ||
  (parentStatus === PainStatus.RETESTED_FAILED
    ? String(
        latestParentStatusHistory?.reason || parentPain?.remark || ''
      ).trim()
    : '');

const getEffectiveConfirmedBy = ({
  existing,
  historicalParentConfirmation,
  parentPain,
  latestParentStatusHistory,
  childMatched,
  shouldUseHistoricalTerminalStatus,
}: {
  existing?: PainConfirmationRecord;
  historicalParentConfirmation?: PainConfirmationRecord;
  parentPain?: OverviewPainPointRow;
  latestParentStatusHistory?: ReturnType<typeof getLatestParentStatusHistory>;
  childMatched: boolean;
  shouldUseHistoricalTerminalStatus: boolean;
}) =>
  (shouldUseHistoricalTerminalStatus
    ? String(existing?.confirmed_by || '').trim()
    : '') ||
  String(latestParentStatusHistory?.by || '').trim() ||
  (childMatched ? existing?.confirmed_by : '') ||
  String(historicalParentConfirmation?.confirmed_by || '').trim() ||
  String(parentPain?.confirmedBy || '').trim() ||
  String(parentPain?.owner || '').trim() ||
  '--';

const getEffectiveConfirmedAt = ({
  existing,
  historicalParentConfirmation,
  parentPain,
  latestParentStatusHistory,
  childMatched,
  shouldUseHistoricalTerminalStatus,
}: {
  existing?: PainConfirmationRecord;
  historicalParentConfirmation?: PainConfirmationRecord;
  parentPain?: OverviewPainPointRow;
  latestParentStatusHistory?: ReturnType<typeof getLatestParentStatusHistory>;
  childMatched: boolean;
  shouldUseHistoricalTerminalStatus: boolean;
}) => {
  const parentCreatedAt = String(
    parentPain?.created_at || parentPain?.createdAt || ''
  ).trim();

  return (
    (shouldUseHistoricalTerminalStatus
      ? String(existing?.confirmed_at || '').trim()
      : '') ||
    String(latestParentStatusHistory?.at || '').trim() ||
    (childMatched ? existing?.confirmed_at || '' : '') ||
    String(historicalParentConfirmation?.confirmed_at || '').trim() ||
    String(parentPain?.confirmedAt || '').trim() ||
    parentCreatedAt
  );
};

const getEffectiveRetestPassedFileKey = ({
  existing,
  historicalParentConfirmation,
  parentPain,
  shouldUseHistoricalTerminalStatus,
}: {
  existing?: PainConfirmationRecord;
  historicalParentConfirmation?: PainConfirmationRecord;
  parentPain?: OverviewPainPointRow;
  shouldUseHistoricalTerminalStatus: boolean;
}) =>
  (shouldUseHistoricalTerminalStatus
    ? existing?.retest_passed_file_key || existing?.latest_file_key
    : undefined) ||
  existing?.retest_passed_file_key ||
  existing?.latest_file_key ||
  historicalParentConfirmation?.retest_passed_file_key ||
  historicalParentConfirmation?.latest_file_key ||
  String(parentPain?.retestReportId || '').trim() ||
  undefined;

const hasHistoricalSiblingPain = ({
  parentPain,
  fileKey,
  childPainId,
}: {
  parentPain?: OverviewPainPointRow;
  fileKey?: string;
  childPainId?: string;
}) => {
  const currentFileKey = String(fileKey || '').trim();
  const currentChildPainId = String(childPainId || '').trim();

  return (parentPain?.childIds ?? []).some((rawId) => {
    const parsed = parseChildId(rawId);
    if (!parsed) return false;
    if (currentChildPainId && parsed.painId === currentChildPainId)
      return false;
    return parsed.fileKey !== currentFileKey;
  });
};

const getMergedStatusInheritedHint = ({
  isLatestReport,
  effectiveStatus,
  parentPain,
  fileKey,
  childPainId,
  latestParentStatusHistory,
}: {
  isLatestReport: boolean;
  effectiveStatus?: number;
  parentPain?: OverviewPainPointRow;
  fileKey?: string;
  childPainId?: string;
  latestParentStatusHistory?: ReturnType<typeof getLatestParentStatusHistory>;
}) => {
  if (effectiveStatus !== PainStatus.CONFIRMED_PENDING_FIX || !isLatestReport) {
    return undefined;
  }

  if (
    !hasHistoricalSiblingPain({
      parentPain,
      fileKey,
      childPainId,
    })
  ) {
    return undefined;
  }

  const latestStatusReason = String(
    latestParentStatusHistory?.reason || ''
  ).trim();
  const isReopenedAfterRetestFailed =
    latestStatusReason.includes('类似痛点') ||
    latestStatusReason.includes('回到已确认待修复') ||
    latestStatusReason.includes('复测不通过');

  return isReopenedAfterRetestFailed
    ? '因旧痛点复测不通过，合并后回到已确认待修复'
    : '合并到已确认待修复的已有痛点';
};

const derivePainDisplayState = ({
  existing,
  historicalParentConfirmation,
  parentPain,
  fileKey,
  childPainId,
  childStatus,
  childSeverity,
  painIndex,
  isLatestReport,
}: {
  existing?: PainConfirmationRecord;
  historicalParentConfirmation?: PainConfirmationRecord;
  parentPain?: OverviewPainPointRow;
  fileKey?: string;
  childPainId?: string;
  childStatus?: number;
  childSeverity?: string;
  painIndex: number;
  isLatestReport: boolean;
}): DerivedPainDisplayState => {
  const parentStatus = getParentPainStatus(parentPain);
  const latestParentStatusHistory = getLatestParentStatusHistory(parentPain);
  const childMatched = !!(existing && existing.pain_index === painIndex);
  const existingStatus =
    childMatched && typeof existing?.status === 'number'
      ? existing.status
      : undefined;
  const normalizedChildStatus = getNormalizedChildStatus(childStatus);
  const shouldUseHistoricalTerminalStatus =
    !isLatestReport &&
    (existingStatus === PainStatus.RETESTED_PASSED ||
      existingStatus === PainStatus.RETESTED_FAILED ||
      existingStatus === PainStatus.NO_FIX_NEEDED);
  const { commonIssueType, isCommonIssue } = getEffectiveCommonIssueState({
    parentPain,
    existing,
    childMatched,
  });
  const { issueLink, prLink } = getEffectiveLinks({
    parentPain,
    existing,
  });
  const nonProjectReviewState = getEffectiveNonProjectReviewState({
    existing,
    historicalParentConfirmation,
  });
  const effectiveActionReason = getEffectiveActionReason({
    existing,
    historicalParentConfirmation,
    parentPain,
    parentStatus,
    latestParentStatusHistory,
    shouldUseHistoricalTerminalStatus,
  });

  const effectiveStatusRaw = getEffectivePainStatus({
    existingStatus,
    normalizedChildStatus,
    parentStatus,
    isLatestReport,
    shouldUseHistoricalTerminalStatus,
  });
  const normalizedEffectiveStatus =
    isLatestReport && effectiveStatusRaw === PainStatus.RETESTED_FAILED
      ? PainStatus.CONFIRMED_PENDING_FIX
      : effectiveStatusRaw;
  const effectiveSeverity = getEffectivePainSeverity({
    parentPain,
    childSeverity,
    existing,
    childMatched,
  });
  const isNonProjectIssue =
    normalizedEffectiveStatus === PainStatus.NO_FIX_NEEDED ||
    isNonProjectSeverity(effectiveSeverity);
  const effectiveStatus = isNonProjectIssue
    ? PainStatus.NO_FIX_NEEDED
    : normalizedEffectiveStatus;
  const effectiveConfirmedBy = getEffectiveConfirmedBy({
    existing,
    historicalParentConfirmation,
    parentPain,
    latestParentStatusHistory,
    childMatched,
    shouldUseHistoricalTerminalStatus,
  });
  const effectiveConfirmedAt = getEffectiveConfirmedAt({
    existing,
    historicalParentConfirmation,
    parentPain,
    latestParentStatusHistory,
    childMatched,
    shouldUseHistoricalTerminalStatus,
  });
  const effectiveRetestPassedFileKey = getEffectiveRetestPassedFileKey({
    existing,
    historicalParentConfirmation,
    parentPain,
    shouldUseHistoricalTerminalStatus,
  });

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
    effectiveNonProjectReviewStatus: nonProjectReviewState.reviewStatus,
    effectiveNonProjectReviewReason: nonProjectReviewState.reviewReason,
    effectiveNonProjectReviewedBy: nonProjectReviewState.reviewedBy,
    effectiveNonProjectReviewedAt: nonProjectReviewState.reviewedAt,
    isNonProjectIssue,
    mergedStatusInheritedHint: getMergedStatusInheritedHint({
      isLatestReport,
      effectiveStatus,
      parentPain,
      fileKey,
      childPainId,
      latestParentStatusHistory,
    }),
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
    return mergeExistingModalCurrentRecord({
      existing,
      effectiveStatus,
      displayState,
    });
  }

  return createModalCurrentRecord({
    fileKey,
    stepId,
    index,
    text,
    existing,
    effectiveStatus,
    displayState,
  });
};

const mergeExistingModalCurrentRecord = ({
  existing,
  effectiveStatus,
  displayState,
}: {
  existing: PainConfirmationRecord;
  effectiveStatus: number;
  displayState: DerivedPainDisplayState;
}): PainConfirmationRecord => ({
  ...existing,
  status: effectiveStatus,
  severity: displayState.effectiveSeverity || existing.severity,
  action_reason: displayState.effectiveActionReason || existing.action_reason,
  reason: displayState.effectiveActionReason || existing.reason,
  is_common_issue: displayState.effectiveIsCommonIssue,
  common_issue_type:
    displayState.effectiveCommonIssueType ?? existing.common_issue_type ?? null,
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
  non_project_review_status:
    displayState.effectiveNonProjectReviewStatus ??
    existing.non_project_review_status ??
    null,
  non_project_review_reason:
    displayState.effectiveNonProjectReviewReason ??
    existing.non_project_review_reason ??
    null,
  non_project_reviewed_by:
    displayState.effectiveNonProjectReviewedBy ??
    existing.non_project_reviewed_by ??
    null,
  non_project_reviewed_at:
    displayState.effectiveNonProjectReviewedAt ??
    existing.non_project_reviewed_at ??
    null,
});

const createModalCurrentRecord = ({
  fileKey,
  stepId,
  index,
  text,
  existing,
  effectiveStatus,
  displayState,
}: {
  fileKey: string;
  stepId: string;
  index: number;
  text: string;
  existing?: PainConfirmationRecord;
  effectiveStatus: number;
  displayState: DerivedPainDisplayState;
}): PainConfirmationRecord => ({
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
  non_project_review_status:
    displayState.effectiveNonProjectReviewStatus ?? null,
  non_project_review_reason:
    displayState.effectiveNonProjectReviewReason ?? null,
  non_project_reviewed_by: displayState.effectiveNonProjectReviewedBy ?? null,
  non_project_reviewed_at: displayState.effectiveNonProjectReviewedAt ?? null,
  latest_file_key: existing?.latest_file_key || fileKey || null,
});

const PainPointBadge: React.FC<{
  canConfirm: boolean;
  displayState: DerivedPainDisplayState;
  onClick: () => void;
}> = ({ canConfirm, displayState, onClick }) => {
  if (!canConfirm || typeof displayState.effectiveStatus !== 'number') {
    return <UnconfirmedBadge onClick={onClick} />;
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      <StatusBadge
        status={displayState.effectiveStatus}
        severity={displayState.effectiveSeverity || 'P4_TRIVIAL'}
        actionReason={displayState.effectiveActionReason}
        nonProjectReviewStatus={displayState.effectiveNonProjectReviewStatus}
        nonProjectReviewReason={displayState.effectiveNonProjectReviewReason}
        nonProjectReviewedBy={displayState.effectiveNonProjectReviewedBy}
        nonProjectReviewedAt={displayState.effectiveNonProjectReviewedAt}
        mergedStatusInheritedHint={displayState.mergedStatusInheritedHint}
        commonIssueType={displayState.effectiveCommonIssueType}
        isCommonIssue={displayState.effectiveIsCommonIssue}
        confirmedBy={displayState.effectiveConfirmedBy}
        confirmedAt={displayState.effectiveConfirmedAt || ''}
        prLink={displayState.effectivePrLink}
        retestPassedFileKey={displayState.effectiveRetestPassedFileKey}
        onClick={onClick}
      />
    </div>
  );
};

/* ─── 单条总结行 ─── */
const ObservationItem: React.FC<{
  order: number;
  text: string;
  toolIds?: string[];
  taskId?: string;
  onStepClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
  compact?: boolean;
}> = ({ order, text, toolIds, taskId, onStepClick, compact = false }) => {
  return (
    <li
      className={`flex items-start gap-2 rounded-md ${
        compact
          ? 'bg-sky-50 px-2.5 py-1.5 text-sm text-sky-800'
          : 'text-sm leading-5 text-sky-900'
      }`}
    >
      <span
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
          compact
            ? 'border-sky-200 bg-white text-sky-700'
            : 'border-sky-200 bg-white text-sky-700'
        }`}
      >
        {order}
      </span>
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

const pickLatestHistoricalConfirmation = ({
  parentPain,
  currentFileKey,
  currentPainId,
  confirmationMapByFileKey,
}: {
  parentPain?: OverviewPainPointRow;
  currentFileKey?: string;
  currentPainId?: string;
  confirmationMapByFileKey?: Map<string, Map<string, PainConfirmationRecord>>;
}): PainConfirmationRecord | undefined => {
  if (
    !parentPain ||
    !confirmationMapByFileKey ||
    confirmationMapByFileKey.size === 0
  ) {
    return undefined;
  }

  const currentFileKeyValue = String(currentFileKey || '').trim();
  const currentPainIdValue = String(currentPainId || '').trim();
  const candidates: PainConfirmationRecord[] = [];

  (parentPain.childIds ?? []).forEach((rawId) => {
    const parsed = parseChildId(rawId);
    if (!parsed) return;
    if (currentPainIdValue && parsed.painId === currentPainIdValue) return;
    if (currentFileKeyValue && parsed.fileKey === currentFileKeyValue) return;

    const fileMap = confirmationMapByFileKey.get(parsed.fileKey);
    const record = fileMap?.get(parsed.painId);
    if (record) {
      candidates.push(record);
    }
  });

  candidates.sort((left, right) =>
    String(right.confirmed_at || '').localeCompare(
      String(left.confirmed_at || '')
    )
  );
  return candidates[0];
};

/* ─── 单条痛点行（含确认交互） ─── */
const PainPointItem: React.FC<{
  painId?: string;
  order: number;
  text: string;
  index: number;
  childStatus?: number;
  childSeverity?: string;
  fileKey?: string;
  stepId?: string;
  legacyStepId?: string;
  legacyStepIds?: string[];
  parentPain?: OverviewPainPointRow;
  historicalParentConfirmationMapByFileKey?: Map<
    string,
    Map<string, PainConfirmationRecord>
  >;
  isLatestReport?: boolean;
  compact?: boolean;
  toolIds?: string[];
  onStepClick?: (toolIds: string[], ctx?: { taskId?: string }) => void;
  highlightTaskId?: string;
  shouldAutoOpen?: boolean;
  onAutoOpenHandled?: () => void;
  versionOptions?: Array<{ value: string; label: string }>;
  previewMode?: boolean;
}> = ({
  painId,
  order,
  text,
  index,
  childStatus,
  childSeverity,
  fileKey,
  stepId,
  legacyStepId,
  legacyStepIds,
  parentPain,
  historicalParentConfirmationMapByFileKey,
  isLatestReport = false,
  compact = false,
  toolIds,
  onStepClick,
  highlightTaskId,
  shouldAutoOpen = false,
  onAutoOpenHandled,
  versionOptions,
  previewMode = false,
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

  const canConfirm = !!(fileKey && stepId) && !previewMode;
  const { confirmationMap, upsert } = usePainConfirmations(
    canConfirm ? fileKey : undefined,
    { enabled: canConfirm }
  );
  const existing = getExistingPainConfirmation({
    canConfirm,
    confirmationMap,
    fileKey,
    stepId,
    legacyStepId,
    legacyStepIds,
    painIndex: index,
    text,
  });
  const parentPainId = String(
    parentPain?.parentId || parentPain?.id || ''
  ).trim();
  const parentStatusValue = String(parentPain?.status ?? '').trim();
  const historicalParentConfirmation = useMemo(
    () =>
      pickLatestHistoricalConfirmation({
        parentPain,
        currentFileKey: fileKey,
        currentPainId: painId,
        confirmationMapByFileKey: historicalParentConfirmationMapByFileKey,
      }),
    [fileKey, historicalParentConfirmationMapByFileKey, painId, parentPain]
  );
  const displayState = derivePainDisplayState({
    existing,
    historicalParentConfirmation,
    parentPain,
    fileKey,
    childPainId: painId,
    childStatus,
    childSeverity,
    painIndex: index,
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
        <span
          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
            compact
              ? 'border-rose-200 bg-white text-rose-700'
              : 'border-rose-200 bg-white text-rose-700'
          }`}
        >
          {order}
        </span>
        <div className="flex flex-1 items-start justify-between gap-3">
          <div className="flex-1 py-0.5">{text}</div>
          <div className="flex shrink-0 items-center gap-1.5">
            <LinkStepsButton
              toolIds={toolIds}
              taskId={highlightTaskId || stepId}
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
  status?: number;
  severity?: string;
};

const getHistoryTaskIdsForEvidencePanel = (
  stepId?: string,
  candidateTaskIds: string[] = []
) => {
  const currentTaskId = String(stepId || '').trim();
  if (
    currentTaskId === 'discovery_doc_google' ||
    currentTaskId === 'discovery_repo_google'
  ) {
    return new Set<string>();
  }
  if (currentTaskId === 'discovery_doc_baidu') {
    return new Set<string>(['discovery_doc_baidu', 'discovery_doc']);
  }
  if (currentTaskId === 'discovery_repo_baidu') {
    return new Set<string>(['discovery_repo_baidu', 'discovery_repo']);
  }
  return new Set(candidateTaskIds);
};

const HistoryPainTable: React.FC<{
  items: OverviewPainPointRow[];
  loading: boolean;
  currentFileKey?: string;
}> = ({ items, loading, currentFileKey }) => {
  const normalizedCurrentFileKey = String(currentFileKey || '').trim();
  const historyParentIds = useMemo(
    () =>
      items
        .map((item) => String(item.parentId || item.id || '').trim())
        .filter(Boolean),
    [items]
  );
  const historicalFileKeys = useMemo(() => {
    const result = new Set<string>();
    items.forEach((item) => {
      (item.childIds ?? []).forEach((rawId) => {
        const parsed = parseChildId(rawId);
        if (!parsed) return;
        if (
          normalizedCurrentFileKey &&
          parsed.fileKey === normalizedCurrentFileKey
        ) {
          return;
        }
        result.add(parsed.fileKey);
      });
    });
    return Array.from(result);
  }, [items, normalizedCurrentFileKey]);
  const hasOnlyPassed = useMemo(() => {
    if (!items.length) return false;
    return items.every(
      (item) => Number(item.status) === PainStatus.RETESTED_PASSED
    );
  }, [items]);
  const { data: parentChildrenMap } = useQuery({
    queryKey: ['historyParentChildren', historyParentIds],
    enabled: historyParentIds.length > 0,
    queryFn: async () => {
      const results = await Promise.all(
        historyParentIds.map(async (parentId) => {
          const resp = await fetchOverviewParentChildren(parentId, {
            size: 200,
          });
          return [parentId, resp.items || []] as const;
        })
      );
      return new Map<string, OverviewParentChildPain[]>(results);
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const { data: historyConfirmationMapByFileKey } = useQuery({
    queryKey: ['historyPainConfirmations', historicalFileKeys],
    enabled: historicalFileKeys.length > 0,
    queryFn: async () => {
      const results = await Promise.all(
        historicalFileKeys.map(async (fileKey) => {
          const resp = await fetchPainConfirmations(fileKey);
          const map = new Map<string, PainConfirmationRecord>();
          (resp.confirmations || []).forEach((record) => {
            map.set(
              `${record.file_key}#${record.step_id}#${record.pain_index}`,
              record
            );
          });
          return [fileKey, map] as const;
        })
      );
      return new Map<string, Map<string, PainConfirmationRecord>>(results);
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
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
    setOpen(!hasOnlyPassed);
  }, [hasOnlyPassed, loading]);

  const resolveHistoryDescription = (
    item: OverviewPainPointRow,
    entries: Array<{ painId?: string; fileKey: string; taskId?: string }>
  ) => {
    const parentId = String(item.parentId || item.id || '').trim();
    const children = parentChildrenMap?.get(parentId) || [];
    if (!children.length) {
      return item.description || '--';
    }

    const preferredFileKeys = entries.map((entry) => entry.fileKey);
    const preferredChild = preferredFileKeys
      .map((fileKey) =>
        children.find(
          (child) =>
            String(child.file_key || '').trim() === String(fileKey).trim()
        )
      )
      .find(Boolean);
    if (preferredChild?.pain_text) {
      return preferredChild.pain_text;
    }

    const fallbackChild = children.find(
      (child) =>
        String(child.file_key || '').trim() !== normalizedCurrentFileKey &&
        String(child.pain_text || '').trim()
    );
    return fallbackChild?.pain_text || item.description || '--';
  };

  const resolveHistoryStatus = (
    item: OverviewPainPointRow,
    entries: Array<{
      painId?: string;
      fileKey: string;
      taskId?: string;
      painIndex?: number;
    }>
  ) => {
    const parentId = String(item.parentId || item.id || '').trim();
    const children = parentChildrenMap?.get(parentId) || [];
    const resolveConfirmationStatus = (child?: OverviewParentChildPain) => {
      if (!child) return undefined;
      const fileKey = String(child.file_key || '').trim();
      const taskId = String(child.task_id || '').trim();
      const painIndex = Number(child.pain_index);
      if (!fileKey || !taskId || Number.isNaN(painIndex)) {
        return undefined;
      }
      const fileMap = historyConfirmationMapByFileKey?.get(fileKey);
      const record = fileMap?.get(`${fileKey}#${taskId}#${painIndex}`);
      return typeof record?.status === 'number' ? record.status : undefined;
    };

    const preferredEntry = entries[0];
    const preferredChild =
      children.find((child) => {
        if (!preferredEntry) return false;
        if (
          String(child.file_key || '').trim() !==
          String(preferredEntry.fileKey).trim()
        ) {
          return false;
        }
        if (
          preferredEntry.painIndex !== undefined &&
          Number(child.pain_index) !== Number(preferredEntry.painIndex)
        ) {
          return false;
        }
        return true;
      }) ||
      children.find(
        (child) =>
          preferredEntry &&
          String(child.file_key || '').trim() ===
            String(preferredEntry.fileKey).trim()
      );
    const preferredConfirmationStatus =
      resolveConfirmationStatus(preferredChild);
    if (preferredConfirmationStatus !== undefined) {
      return preferredConfirmationStatus;
    }
    if (preferredChild?.status !== undefined) {
      return Number(preferredChild.status);
    }

    const fallbackChild = children.find(
      (child) =>
        String(child.file_key || '').trim() !== normalizedCurrentFileKey &&
        (resolveConfirmationStatus(child) !== undefined ||
          child.status !== undefined)
    );
    const fallbackConfirmationStatus = resolveConfirmationStatus(fallbackChild);
    if (fallbackConfirmationStatus !== undefined) {
      return fallbackConfirmationStatus;
    }
    return fallbackChild?.status !== undefined
      ? Number(fallbackChild.status)
      : Number(item.status);
  };

  const resolveHistoryRetestReportId = (
    item: OverviewPainPointRow,
    entries: Array<{
      painId?: string;
      fileKey: string;
      taskId?: string;
      painIndex?: number;
    }>
  ) => {
    const parentId = String(item.parentId || item.id || '').trim();
    const children = parentChildrenMap?.get(parentId) || [];
    const resolveConfirmationRecord = (child?: OverviewParentChildPain) => {
      if (!child) return undefined;
      const fileKey = String(child.file_key || '').trim();
      const taskId = String(child.task_id || '').trim();
      const painIndex = Number(child.pain_index);
      if (!fileKey || !taskId || Number.isNaN(painIndex)) {
        return undefined;
      }
      const fileMap = historyConfirmationMapByFileKey?.get(fileKey);
      return fileMap?.get(`${fileKey}#${taskId}#${painIndex}`);
    };
    const resolveFromRecord = (record?: PainConfirmationRecord) =>
      String(
        record?.retest_passed_file_key || record?.latest_file_key || ''
      ).trim();

    const preferredEntry = entries[0];
    const preferredChild =
      children.find((child) => {
        if (!preferredEntry) return false;
        if (
          String(child.file_key || '').trim() !==
          String(preferredEntry.fileKey).trim()
        ) {
          return false;
        }
        if (
          preferredEntry.painIndex !== undefined &&
          Number(child.pain_index) !== Number(preferredEntry.painIndex)
        ) {
          return false;
        }
        return true;
      }) ||
      children.find(
        (child) =>
          preferredEntry &&
          String(child.file_key || '').trim() ===
            String(preferredEntry.fileKey).trim()
      );
    const preferredRetestReportId = resolveFromRecord(
      resolveConfirmationRecord(preferredChild)
    );
    if (preferredRetestReportId) {
      return preferredRetestReportId;
    }

    const fallbackChild = children.find((child) => {
      if (String(child.file_key || '').trim() === normalizedCurrentFileKey) {
        return false;
      }
      return !!resolveFromRecord(resolveConfirmationRecord(child));
    });
    const fallbackRetestReportId = resolveFromRecord(
      resolveConfirmationRecord(fallbackChild)
    );
    if (fallbackRetestReportId) {
      return fallbackRetestReportId;
    }

    return (
      String(item.retestReportId || '').trim() ||
      String(item.remark || '').trim()
    );
  };

  const renderTable = (rows: OverviewPainPointRow[]) => {
    return (
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
            {rows.map((item, index) => {
              const severity = item.severity || 'P4_TRIVIAL';
              const severityStyle = getPainLevelStyle(severity);
              const childIds = item.childIds ?? [];
              const entries: Array<{
                painId?: string;
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

              const historyDescription = resolveHistoryDescription(
                item,
                entries
              );
              const rawStatus = resolveHistoryStatus(item, entries);
              const retestReportId = resolveHistoryRetestReportId(
                item,
                entries
              );
              const normalizedStatus = rawStatus;
              const statusLabel = STATUS_LABELS[normalizedStatus] || '--';

              return (
                <tr
                  key={`${
                    item.id || item.parentId || item.description
                  }-${index}`}
                  className="border-t border-slate-200/70 bg-white align-top transition-colors hover:bg-slate-50/70"
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
                    <Tooltip title={historyDescription}>
                      <span className="line-clamp-2 cursor-default">
                        {historyDescription}
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
                    <Tooltip title={retestReportId || '--'}>
                      {retestReportId ? (
                        <a
                          href={`/intelligent-analysis/community-experience?project=${encodeURIComponent(
                            retestReportId
                          )}`}
                          className="overview-table-link block truncate text-blue-600"
                        >
                          {retestReportId}
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
    );
  };

  return (
    <div>
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
        <div className="space-y-3">{renderTable(items)}</div>
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
  legacyStepIds,
  highlightTaskId,
  onStepClick,
  painFocusTarget,
  onPainFocusHandled,
  isLatestReport = false,
  versionOptions,
  previewMode = false,
}) => {
  const [obsExpanded, setObsExpanded] = useState(false);
  const canConfirm = !!(fileKey && stepId) && !previewMode;
  const candidateTaskIds = useMemo(
    () =>
      Array.from(
        new Set(
          [stepId, legacyStepId, ...(legacyStepIds ?? [])]
            .map((value) => String(value || '').trim())
            .filter(Boolean)
        )
      ),
    [legacyStepId, legacyStepIds, stepId]
  );
  const linkTaskId = highlightTaskId || stepId;
  const { overviewPains } = usePainConfirmations(
    canConfirm ? fileKey : undefined,
    { enabled: canConfirm }
  );

  const displayPainPoints = useMemo<DisplayPainPoint[]>(() => {
    if (previewMode) {
      return (pain_points ?? []).map((text, index) => ({
        text,
        index,
      }));
    }
    if (fileKey && stepId && overviewPains && overviewPains.length > 0) {
      // 从 overviewPains 中过滤出属于当前任务的痛点，包含对旧 step_id 的兼容
      return overviewPains
        .filter((p: any) => {
          const pid = p.task_id || p.step_id;
          if (!candidateTaskIds.includes(String(pid || '').trim()))
            return false;
          return !!String(p.id || '').trim();
        })
        .sort((a: any, b: any) => (a.pain_index ?? 0) - (b.pain_index ?? 0))
        .map((p: any) => ({
          id: p.id,
          text: p.pain_text,
          index: p.pain_index ?? 0,
          status:
            typeof p.status === 'number'
              ? p.status
              : Number.parseInt(String(p.status ?? ''), 10),
          severity: p.severity,
        }));
    }
    // 不再自动降级为原来的 pain_points prop
    return [];
  }, [
    candidateTaskIds,
    fileKey,
    overviewPains,
    pain_points,
    previewMode,
    stepId,
  ]);

  const hasPain = displayPainPoints.length > 0;
  const hasObs = !!observations && observations.length > 0;
  const projectKey = useMemo(
    () => deriveProjectKeyFromFileKey(fileKey),
    [fileKey]
  );
  const targetTaskIds = useMemo(
    () => new Set(candidateTaskIds),
    [candidateTaskIds]
  );
  const historyTaskIds = useMemo(
    () => getHistoryTaskIdsForEvidencePanel(stepId, candidateTaskIds),
    [candidateTaskIds, stepId]
  );

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
    enabled: !previewMode && !!projectKey && targetTaskIds.size > 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const taskParentPains = useMemo(() => {
    if (!fileKey || historyTaskIds.size === 0)
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
        return historyTaskIds.has(parsed.taskId);
      });
    });
  }, [fileKey, historyTaskIds, overviewCardResp?.items]);

  const historyParentPains = useMemo(() => {
    if (historyTaskIds.size === 0) return [] as OverviewPainPointRow[];

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
        if (!parsed || !historyTaskIds.has(parsed.taskId)) continue;

        hasTaskMatch = true;
        if (!fileKey || parsed.fileKey !== fileKey) {
          hasHistoricalEntry = true;
          break;
        }
      }

      return hasTaskMatch && hasHistoricalEntry;
    });
  }, [fileKey, historyTaskIds, overviewCardResp?.items]);

  const taskParentHistoricalFileKeys = useMemo(() => {
    const result = new Set<string>();
    taskParentPains.forEach((row) => {
      (row.childIds ?? []).forEach((rawId) => {
        const parsed = parseChildId(rawId);
        if (!parsed) return;
        if (fileKey && parsed.fileKey === fileKey) return;
        result.add(parsed.fileKey);
      });
    });
    return Array.from(result);
  }, [fileKey, taskParentPains]);
  const { data: taskParentConfirmationMapByFileKey } = useQuery({
    queryKey: ['taskParentPainConfirmations', taskParentHistoricalFileKeys],
    enabled: taskParentHistoricalFileKeys.length > 0,
    queryFn: async () => {
      const results = await Promise.all(
        taskParentHistoricalFileKeys.map(async (historicalFileKey) => {
          const resp = await fetchPainConfirmations(historicalFileKey);
          const map = new Map<string, PainConfirmationRecord>();
          (resp.confirmations || []).forEach((record) => {
            map.set(
              `${record.file_key}#${record.step_id}#${record.pain_index}`,
              record
            );
          });
          return [historicalFileKey, map] as const;
        })
      );
      return new Map<string, Map<string, PainConfirmationRecord>>(results);
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const hasHistoryPain = historyParentPains.length > 0 || parentPainsLoading;

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
    if (!fileKey || historyTaskIds.size === 0) return undefined;

    return taskParentPains.find((row) =>
      (row.childIds ?? []).some((rawId) => {
        if (pain.id && rawId === pain.id) return true;
        const parsed = parseChildId(rawId);
        if (!parsed) return false;
        if (parsed.fileKey !== fileKey) return false;
        if (!historyTaskIds.has(parsed.taskId)) return false;
        return parsed.painIndex === pain.index;
      })
    );
  };

  if (!hasObs && !hasPain && !hasHistoryPain) {
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
        {hasPain && (
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <PainIcon className="h-3 w-3" />
              痛点
            </div>
            <ul className="space-y-1">
              {displayPainPoints.map(
                ({ id, text, index, status, severity }, i) => (
                  <PainPointItem
                    painId={id}
                    key={id || index}
                    order={i + 1}
                    text={text}
                    index={index}
                    childStatus={
                      typeof status === 'number' && !Number.isNaN(status)
                        ? status
                        : undefined
                    }
                    childSeverity={severity}
                    fileKey={fileKey}
                    stepId={stepId}
                    legacyStepId={legacyStepId}
                    legacyStepIds={legacyStepIds}
                    parentPain={findParentPainForPain({ id, index })}
                    historicalParentConfirmationMapByFileKey={
                      taskParentConfirmationMapByFileKey
                    }
                    isLatestReport={isLatestReport}
                    toolIds={pain_points_tool_nums?.[index]}
                    onStepClick={onStepClick}
                    highlightTaskId={linkTaskId}
                    compact
                    shouldAutoOpen={shouldAutoOpenForPainId(id)}
                    onAutoOpenHandled={onPainFocusHandled}
                    versionOptions={versionOptions}
                    previewMode={previewMode}
                  />
                )
              )}
            </ul>
          </div>
        )}
        {hasHistoryPain && (
          <HistoryPainTable
            items={historyParentPains}
            loading={parentPainsLoading}
            currentFileKey={fileKey}
          />
        )}
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
                  order={i + 1}
                  text={obs}
                  toolIds={observations_tool_nums?.[i]}
                  taskId={linkTaskId}
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
              {displayPainPoints.length}
            </span>
          </div>
          <ul className="space-y-1.5">
            {displayPainPoints.map(
              ({ id, text, index, status, severity }, i) => (
                <PainPointItem
                  painId={id}
                  key={id || index}
                  order={i + 1}
                  text={text}
                  index={index}
                  childStatus={
                    typeof status === 'number' && !Number.isNaN(status)
                      ? status
                      : undefined
                  }
                  childSeverity={severity}
                  fileKey={fileKey}
                  stepId={stepId}
                  legacyStepId={legacyStepId}
                  legacyStepIds={legacyStepIds}
                  parentPain={findParentPainForPain({ id, index })}
                  historicalParentConfirmationMapByFileKey={
                    taskParentConfirmationMapByFileKey
                  }
                  isLatestReport={isLatestReport}
                  toolIds={pain_points_tool_nums?.[index]}
                  onStepClick={onStepClick}
                  highlightTaskId={linkTaskId}
                  shouldAutoOpen={shouldAutoOpenForPainId(id)}
                  onAutoOpenHandled={onPainFocusHandled}
                  versionOptions={versionOptions}
                  previewMode={previewMode}
                />
              )
            )}
          </ul>
        </div>
      )}
      {hasHistoryPain && (
        <HistoryPainTable
          items={historyParentPains}
          loading={parentPainsLoading}
          currentFileKey={fileKey}
        />
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
                  order={i + 1}
                  text={obs}
                  toolIds={observations_tool_nums?.[i]}
                  taskId={linkTaskId}
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
