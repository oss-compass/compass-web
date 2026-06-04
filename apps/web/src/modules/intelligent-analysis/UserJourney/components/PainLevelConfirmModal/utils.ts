import dayjs, { type Dayjs } from 'dayjs';

import { formatLocalDateTime } from '../../time';
import {
  type PainConfirmationRecord,
  type PainHistoryItem,
  type UpsertPainConfirmationPayload,
} from '../../rawData/apiClient';
import { USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO } from '../../rawData/constants';
import type { PainLevel } from '../../types';

import {
  FALLBACK_LINK_TEXT,
  GITCODE_ISSUE_LINK_RE,
  GITCODE_PR_LINK_RE,
  SEVERITY_OPTIONS,
} from './constants';
import type { FormValues, StepSnapshot, VersionOption } from './types';
import { PainStatus } from './types';

export const getPainLevelStyle = (
  level: string
): { bg: string; text: string; border: string; dot: string } => {
  const normalized = String(level || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, '');
  const mapped =
    normalized === 'P0'
      ? 'P0_BLOCKER'
      : normalized === 'P1'
      ? 'P1_CRITICAL'
      : normalized === 'P2'
      ? 'P2_MAJOR'
      : normalized === 'P3'
      ? 'P3_MINOR'
      : normalized === 'P4'
      ? 'P4_TRIVIAL'
      : normalized === 'P5'
      ? 'P5'
      : normalized;

  switch (mapped) {
    case 'P0_BLOCKER':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-600',
        border: 'border-rose-200',
        dot: 'bg-rose-500',
      };
    case 'P1_CRITICAL':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-600',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'P2_MAJOR':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-500',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
      };
    case 'P3_MINOR':
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-400',
        border: 'border-slate-200',
        dot: 'bg-slate-400',
      };
    case 'P4_TRIVIAL':
      return {
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-300',
        dot: 'bg-green-500',
      };
    case 'P5':
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-400',
        border: 'border-slate-200',
        dot: 'bg-slate-400',
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-400',
        border: 'border-slate-200',
        dot: 'bg-slate-400',
      };
  }
};

export const getPainLevelLabel = (level: string): string => {
  const normalized = String(level || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, '');
  const mapped =
    normalized === 'P0'
      ? 'P0_BLOCKER'
      : normalized === 'P1'
      ? 'P1_CRITICAL'
      : normalized === 'P2'
      ? 'P2_MAJOR'
      : normalized === 'P3'
      ? 'P3_MINOR'
      : normalized === 'P4'
      ? 'P4_TRIVIAL'
      : normalized === 'P5'
      ? 'P5'
      : normalized;
  const item = USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO.find(
    (guide) => guide.level === mapped
  );
  return item ? item.label : level;
};

export const formatSeverityLabel = (severity: string) => {
  const raw = String(severity || '').trim();
  if (!raw) return '--';
  const prefix = raw.startsWith('P') ? raw.slice(0, 2) : '';
  const label = getPainLevelLabel(raw);
  if (raw === 'P4_TRIVIAL' || label === '非项目本身问题') return label;
  if (!prefix) return label;
  if (String(label || '').startsWith(prefix)) return label;
  return `${prefix}${label}`;
};

export const formatStatusTime = (value?: string | null): string => {
  return formatLocalDateTime(value);
};

export const formatCloseTime = (value?: string | null): string => {
  return formatLocalDateTime(value);
};

export const getDisplayedStepStatus = (status: PainStatus): PainStatus => {
  if (status === PainStatus.NO_FIX_NEEDED) {
    return PainStatus.CONFIRMED_PENDING_FIX;
  }
  if (status === PainStatus.RETESTED_FAILED) {
    return PainStatus.CONFIRMED_PENDING_FIX;
  }
  return Math.min(status, PainStatus.RETESTED_PASSED) as PainStatus;
};

export const getDefaultVersionValue = (
  versionOptions: VersionOption[] | undefined,
  fileKey: string
): string | undefined =>
  versionOptions?.find((item) => item.value !== fileKey)?.value;

export const getVersionLabelByFileKey = (
  versionOptions: VersionOption[] | undefined,
  fileKey: string
): string => {
  const normalizedFileKey = String(fileKey || '').trim();
  if (!normalizedFileKey) return '';
  return (
    versionOptions?.find((item) => item.value === normalizedFileKey)?.label ||
    normalizedFileKey
  );
};

export const getRetestVersionOptions = ({
  versionOptions,
  fileKey,
}: {
  versionOptions: VersionOption[] | undefined;
  fileKey: string;
}) => {
  const filtered = (versionOptions || []).filter(
    (opt) => opt.value !== fileKey
  );
  return filtered.slice().sort((left, right) => {
    const leftDate = String(left.label || '').split('@')[0] ?? '';
    const rightDate = String(right.label || '').split('@')[0] ?? '';
    return rightDate.localeCompare(leftDate);
  });
};

export const getSafePainLevel = (value?: string | null): PainLevel => {
  const raw = String(value || '').trim();
  const normalized = raw.toUpperCase().replace(/[^A-Z0-9_]/g, '');
  const mapped =
    normalized === 'P0'
      ? 'P0_BLOCKER'
      : normalized === 'P1'
      ? 'P1_CRITICAL'
      : normalized === 'P2'
      ? 'P2_MAJOR'
      : normalized === 'P3'
      ? 'P3_MINOR'
      : normalized === 'P4'
      ? 'P4_TRIVIAL'
      : normalized === 'P5'
      ? 'P5'
      : raw;
  return SEVERITY_OPTIONS.some((item) => item.value === mapped)
    ? (mapped as PainLevel)
    : 'P1_CRITICAL';
};

export const getSafeCommonIssueType = (
  value: string | null | undefined,
  options: string[]
): string | undefined => {
  const normalized = String(value || '').trim();
  if (normalized) return normalized;
  return options[0];
};

export const isNonProjectSeverity = (value?: string | null): boolean => {
  const normalized = String(value || '').trim();
  if (!normalized) return false;
  return (
    normalized === 'P4_TRIVIAL' ||
    getPainLevelLabel(normalized) === '非项目本身问题'
  );
};

export const getActionReasonText = (
  value?: Pick<Partial<PainConfirmationRecord>, 'action_reason'> | null
): string => String(value?.action_reason || '').trim();

export const getRollbackSeverityForPending = (
  base: PainConfirmationRecord
): string => {
  const previousPendingSeverity = base.history?.find(
    (item) =>
      Number(item.status) === PainStatus.TO_BE_CONFIRMED &&
      !isNonProjectSeverity(item.severity)
  )?.severity;
  const normalizedPreviousPendingSeverity = String(
    previousPendingSeverity || ''
  ).trim();
  if (normalizedPreviousPendingSeverity) {
    return normalizedPreviousPendingSeverity;
  }

  const normalizedCurrentSeverity = String(base.severity || '').trim();
  if (
    normalizedCurrentSeverity &&
    !isNonProjectSeverity(normalizedCurrentSeverity)
  ) {
    return normalizedCurrentSeverity;
  }

  return 'P3_MINOR';
};

export const getSafeLinkValue = (
  value: string | null | undefined,
  fallback?: string | null,
  isReviewing?: boolean
): string => {
  const normalized = String(value || '').trim();
  if (normalized && normalized !== FALLBACK_LINK_TEXT) return normalized;
  if (!isReviewing) return '';
  const fallbackValue = String(fallback || '').trim();
  return fallbackValue || FALLBACK_LINK_TEXT;
};

export const isValidIssueLink = (value: string | null | undefined): boolean => {
  const normalized = String(value || '').trim();
  if (!normalized) return false;
  return GITCODE_ISSUE_LINK_RE.test(normalized);
};

export const isValidPrLink = (value: string | null | undefined): boolean => {
  const normalized = String(value || '').trim();
  if (!normalized) return false;
  if (normalized === FALLBACK_LINK_TEXT) return true;
  return GITCODE_PR_LINK_RE.test(normalized);
};

export const isValidCloseDate = (value: string | null | undefined): boolean => {
  const normalized = String(value || '').trim();
  if (!normalized) return false;
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  ) {
    return false;
  }
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const date = new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
};

export const getCloseDateValue = (
  value: string | null | undefined
): Dayjs | null => {
  const normalized = String(value || '').trim();
  if (!normalized) return null;
  if (!isValidCloseDate(normalized)) return null;
  const parsed = dayjs(normalized);
  if (!parsed.isValid()) return null;
  return parsed;
};

export const getDatePickerValue = (value: unknown): Dayjs | null => {
  if (!value) return null;
  if (
    typeof value === 'object' &&
    value !== null &&
    'isValid' in value &&
    typeof (value as { isValid?: () => boolean }).isValid === 'function'
  ) {
    return (value as Dayjs).isValid() ? (value as Dayjs) : null;
  }
  if (typeof value === 'string') return getCloseDateValue(value);
  return null;
};

export const getCloseDateString = (value: unknown): string | undefined => {
  if (!value) return undefined;
  if (typeof value === 'string') {
    const normalized = value.trim();
    return isValidCloseDate(normalized) ? normalized : undefined;
  }
  if (typeof value === 'object' && 'format' in value) {
    const dateValue = value as { format?: (fmt: string) => string };
    if (typeof dateValue.format === 'function') {
      const text = dateValue.format('YYYY-MM-DD');
      return isValidCloseDate(text) ? text : undefined;
    }
  }
  return undefined;
};

export const buildRollbackPayload = ({
  stepId,
  painIndex,
  painText,
  rollbackTarget,
  confirmedBy,
  actionReason,
  base,
}: {
  stepId: string;
  painIndex: number;
  painText: string;
  rollbackTarget: PainStatus;
  confirmedBy: string;
  actionReason: string;
  base: PainConfirmationRecord;
}): UpsertPainConfirmationPayload => {
  const payload: UpsertPainConfirmationPayload = {
    step_id: stepId,
    pain_index: painIndex,
    pain_text: painText,
    status: rollbackTarget,
    confirmed_by: confirmedBy,
    action: 'rollback',
    action_reason: actionReason,
  };

  if (rollbackTarget === PainStatus.TO_BE_CONFIRMED) {
    payload.severity = getRollbackSeverityForPending(base);
    const isCommon =
      base.is_common_issue === true ||
      !!String(base.common_issue_type || '').trim();
    if (isCommon) {
      payload.is_common_issue = true;
      payload.common_issue_type =
        String(base.common_issue_type || '').trim() || '其他';
    } else {
      payload.is_common_issue = false;
      payload.common_issue_type = null;
    }
    return payload;
  }

  if (rollbackTarget === PainStatus.CONFIRMED_PENDING_FIX) {
    const issueLink = String(base.issue_link || '').trim();
    const prLink = String(base.pr_link || '').trim();
    const expectedCloseTime = String(base.expected_close_time || '').trim();

    payload.issue_link = issueLink || undefined;
    payload.pr_link = prLink || undefined;
    payload.expected_close_time = expectedCloseTime || undefined;
    return payload;
  }

  if (rollbackTarget === PainStatus.FIXED_PENDING_RETEST) {
    const prLink = String(base.pr_link || '').trim();
    payload.pr_link = prLink || undefined;
    return payload;
  }

  return payload;
};

export const buildSessionRecordAfterRollback = ({
  base,
  rollbackTarget,
  payload,
  confirmedBy,
}: {
  base: PainConfirmationRecord;
  rollbackTarget: PainStatus;
  payload: UpsertPainConfirmationPayload;
  confirmedBy: string;
}): PainConfirmationRecord => {
  return {
    ...base,
    status: rollbackTarget,
    severity:
      rollbackTarget === PainStatus.TO_BE_CONFIRMED
        ? String(payload.severity || 'P1_CRITICAL')
        : base.severity,
    action_reason:
      rollbackTarget === PainStatus.TO_BE_CONFIRMED ? null : base.action_reason,
    reason: rollbackTarget === PainStatus.TO_BE_CONFIRMED ? null : base.reason,
    is_common_issue:
      rollbackTarget === PainStatus.TO_BE_CONFIRMED
        ? payload.is_common_issue
        : base.is_common_issue,
    common_issue_type:
      rollbackTarget === PainStatus.TO_BE_CONFIRMED
        ? payload.common_issue_type ?? null
        : base.common_issue_type,
    issue_link:
      rollbackTarget === PainStatus.CONFIRMED_PENDING_FIX
        ? payload.issue_link ?? base.issue_link
        : base.issue_link,
    pr_link:
      rollbackTarget === PainStatus.FIXED_PENDING_RETEST
        ? payload.pr_link ?? base.pr_link
        : base.pr_link,
    expected_close_time:
      rollbackTarget === PainStatus.CONFIRMED_PENDING_FIX
        ? payload.expected_close_time ?? base.expected_close_time
        : base.expected_close_time,
    confirmed_by: confirmedBy,
  };
};

export const getReadonlyLinkValue = (
  value: string | null | undefined,
  fallback?: string | null,
  kind: 'issue' | 'pr' = 'issue'
): string => {
  const isValidLink = kind === 'issue' ? isValidIssueLink : isValidPrLink;
  const normalized = String(value || '').trim();
  if (isValidLink(normalized)) return normalized;

  const fallbackValue = String(fallback || '').trim();
  if (isValidLink(fallbackValue)) return fallbackValue;

  return '';
};

export const resolveStepSnapshot = ({
  displayStep,
  currentRecord,
  historyItems,
}: {
  displayStep: number;
  currentRecord?: PainConfirmationRecord | null;
  historyItems?: PainHistoryItem[];
}): StepSnapshot | undefined => {
  const snapshots = [currentRecord, ...(historyItems ?? [])].filter(
    Boolean
  ) as StepSnapshot[];
  const findByStatuses = (statuses: number[]) =>
    snapshots.find((item) => statuses.includes(Number(item.status)));

  if (displayStep === 1) {
    return (
      findByStatuses([PainStatus.CONFIRMED_PENDING_FIX]) ||
      findByStatuses([
        PainStatus.FIXED_PENDING_RETEST,
        PainStatus.RETESTING,
        PainStatus.RETESTED_PASSED,
        PainStatus.NO_FIX_NEEDED,
        PainStatus.RETESTED_FAILED,
      ]) ||
      currentRecord ||
      snapshots[0]
    );
  }

  if (displayStep === 2) {
    return (
      findByStatuses([PainStatus.FIXED_PENDING_RETEST]) ||
      findByStatuses([
        PainStatus.RETESTING,
        PainStatus.RETESTED_PASSED,
        PainStatus.RETESTED_FAILED,
      ]) ||
      snapshots.find((item) => !!String(item.issue_link || '').trim()) ||
      currentRecord ||
      snapshots[0]
    );
  }

  if (displayStep === 3) {
    return (
      findByStatuses([PainStatus.FIXED_PENDING_RETEST]) ||
      findByStatuses([
        PainStatus.RETESTING,
        PainStatus.RETESTED_PASSED,
        PainStatus.RETESTED_FAILED,
      ]) ||
      snapshots.find((item) => !!String(item.pr_link || '').trim()) ||
      currentRecord ||
      snapshots[0]
    );
  }

  if (displayStep === 4) {
    return (
      snapshots.find(
        (item) =>
          item.retest_decision != null ||
          [PainStatus.RETESTED_PASSED, PainStatus.RETESTED_FAILED].includes(
            Number(item.status)
          )
      ) ||
      currentRecord ||
      snapshots[0]
    );
  }

  return currentRecord || snapshots[0];
};

export const buildReadonlyFormValues = ({
  displayStep,
  snapshot,
  currentStatus,
  commonIssueTypeOptions,
  versionOptions,
  fileKey,
  latestFileKey,
  fallbackIssueLink,
  fallbackPrLink,
}: {
  displayStep: number;
  snapshot?: StepSnapshot;
  currentStatus: PainStatus;
  commonIssueTypeOptions: string[];
  versionOptions?: VersionOption[];
  fileKey: string;
  latestFileKey: string;
  fallbackIssueLink?: string | null;
  fallbackPrLink?: string | null;
}): FormValues => {
  const isCommon =
    snapshot?.is_common_issue === true ||
    !!String(snapshot?.common_issue_type || '').trim();
  const defaultVersionValue = getDefaultVersionValue(versionOptions, fileKey);
  let retestDecision =
    displayStep === 4 ? snapshot?.retest_decision : undefined;

  if (displayStep === 4 && !retestDecision) {
    if (Number(snapshot?.status) === PainStatus.RETESTED_PASSED) {
      retestDecision = 'passed';
    } else if (Number(snapshot?.status) === PainStatus.RETESTED_FAILED) {
      retestDecision = 'failed';
    } else if (snapshot) {
      retestDecision = 'not_detected';
    }
  }

  const passedFileKey =
    retestDecision === 'passed'
      ? String(
          snapshot?.retest_passed_file_key ||
            snapshot?.latest_file_key ||
            latestFileKey ||
            defaultVersionValue ||
            ''
        ).trim() || undefined
      : undefined;

  return {
    status: currentStatus,
    severity: getSafePainLevel(snapshot?.severity),
    non_project_reason: getActionReasonText(snapshot),
    is_common: isCommon,
    common_issue_type: isCommon
      ? getSafeCommonIssueType(
          snapshot?.common_issue_type,
          commonIssueTypeOptions
        )
      : undefined,
    confirmed_by: String(snapshot?.confirmed_by || 'System').trim(),
    issue_link: getReadonlyLinkValue(
      snapshot?.issue_link,
      fallbackIssueLink,
      'issue'
    ),
    pr_link: getReadonlyLinkValue(snapshot?.pr_link, fallbackPrLink, 'pr'),
    expected_close_time: getCloseDateValue(snapshot?.expected_close_time),
    retest_decision: retestDecision,
    retest_passed_file_key: passedFileKey,
  };
};

export const enrichPayloadByStatus = (
  base: UpsertPainConfirmationPayload,
  status: PainStatus,
  vals: FormValues,
  shouldShowRetest: boolean
): UpsertPainConfirmationPayload => {
  if (status === PainStatus.TO_BE_CONFIRMED) {
    const isNonProjectIssue = isNonProjectSeverity(vals.severity);
    return {
      ...base,
      status: isNonProjectIssue ? PainStatus.NO_FIX_NEEDED : base.status,
      severity: vals.severity,
      action_reason: isNonProjectIssue
        ? String(vals.non_project_reason || '').trim()
        : undefined,
      is_common_issue: vals.is_common === true,
      common_issue_type:
        vals.is_common === true ? vals.common_issue_type || null : null,
      issue_link: isNonProjectIssue ? undefined : vals.issue_link || undefined,
      expected_close_time: isNonProjectIssue
        ? undefined
        : getCloseDateString(vals.expected_close_time),
    };
  }
  if (status === PainStatus.CONFIRMED_PENDING_FIX) {
    return {
      ...base,
      issue_link: vals.issue_link,
      pr_link: vals.pr_link,
      expected_close_time: getCloseDateString(vals.expected_close_time),
    };
  }
  if (status === PainStatus.RETESTED_FAILED) {
    return {
      ...base,
      issue_link: vals.issue_link,
      pr_link: vals.pr_link,
      expected_close_time: getCloseDateString(vals.expected_close_time),
    };
  }
  if (shouldShowRetest) {
    return {
      ...base,
      retest_decision: vals.retest_decision,
      retest_passed_file_key:
        vals.retest_decision === 'passed'
          ? vals.retest_passed_file_key
          : undefined,
    };
  }
  return base;
};

export const getModalStatusState = (
  modalRecord?: PainConfirmationRecord
): {
  currentStatus: PainStatus;
  isCurrentNonProjectIssue: boolean;
  latestFileKey: string;
  showRetestDecision: boolean;
} => {
  const currentStatus = modalRecord?.status || PainStatus.TO_BE_CONFIRMED;
  const isCurrentNonProjectIssue =
    currentStatus === PainStatus.NO_FIX_NEEDED ||
    (currentStatus === PainStatus.CONFIRMED_PENDING_FIX &&
      isNonProjectSeverity(modalRecord?.severity));
  const latestFileKey = String(modalRecord?.latest_file_key || '').trim();

  return {
    currentStatus,
    isCurrentNonProjectIssue,
    latestFileKey,
    showRetestDecision:
      !isCurrentNonProjectIssue &&
      currentStatus === PainStatus.RETESTING &&
      !!latestFileKey,
  };
};

export const shouldRenderCustomFooter = ({
  showHistory,
  isReviewingHistoryStep,
  isCurrentNonProjectIssue,
  currentStatus,
  showRetestDecision,
}: {
  showHistory: boolean;
  isReviewingHistoryStep: boolean;
  isCurrentNonProjectIssue: boolean;
  currentStatus: number;
  showRetestDecision: boolean;
}) =>
  showHistory ||
  isReviewingHistoryStep ||
  isCurrentNonProjectIssue ||
  currentStatus === PainStatus.FIXED_PENDING_RETEST ||
  (currentStatus >= PainStatus.RETESTING &&
    !showRetestDecision &&
    currentStatus !== PainStatus.RETESTED_FAILED);
