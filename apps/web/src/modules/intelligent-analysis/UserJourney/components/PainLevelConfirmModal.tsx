import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Form,
  type FormInstance,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Steps,
  Button,
  Table,
  Empty,
  Tag,
  Typography,
  Spin,
} from 'antd';
import { toast } from 'react-hot-toast';
import { USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO } from '../rawData/constants';
import type { PainLevel } from '../types';
import {
  fetchOverviewCommonIssues,
  type PainConfirmationRecord,
  type PainHistoryItem,
  type UpsertPainConfirmationPayload,
} from '../rawData/apiClient';
import { usePainConfirmations } from '../hooks/usePainConfirmations';

const { Text, Link } = Typography;

// 状态定义
export enum PainStatus {
  TO_BE_CONFIRMED = 1,
  CONFIRMED_PENDING_FIX = 2,
  FIXED_PENDING_RETEST = 3,
  RETESTING = 4,
  RETESTED_PASSED = 5,
  NO_FIX_NEEDED = 6,
  RETESTED_FAILED = 7,
}

export const STATUS_LABELS: Record<number, string> = {
  [PainStatus.TO_BE_CONFIRMED]: '待确认',
  [PainStatus.CONFIRMED_PENDING_FIX]: '已确认待修复',
  [PainStatus.FIXED_PENDING_RETEST]: '已修复待复测',
  [PainStatus.RETESTING]: '复测中',
  [PainStatus.RETESTED_PASSED]: '已复测通过',
  [PainStatus.NO_FIX_NEEDED]: '不需要修复',
  [PainStatus.RETESTED_FAILED]: '复测不通过',
};

const SEVERITY_OPTIONS = USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO.filter(
  (item) => item.level !== 'P5'
).map((item) => ({
  label: item.label,
  value: item.level,
  description: item.description,
}));

/** 根据 severity 获取 badge 颜色配置 */
export const getPainLevelStyle = (
  level: string
): { bg: string; text: string; border: string; dot: string } => {
  switch (level) {
    case 'P0_BLOCKER':
      return {
        bg: 'bg-rose-100',
        text: 'text-rose-700',
        border: 'border-rose-300',
        dot: 'bg-rose-500',
      };
    case 'P1_CRITICAL':
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        dot: 'bg-red-500',
      };
    case 'P2_MAJOR':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-300',
        dot: 'bg-amber-500',
      };
    case 'P3_MINOR':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        border: 'border-emerald-300',
        dot: 'bg-emerald-500',
      };
    case 'P4_TRIVIAL':
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-300',
        dot: 'bg-slate-400',
      };
    case 'P5':
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-300',
        dot: 'bg-slate-400',
      };
    default:
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-300',
        dot: 'bg-slate-400',
      };
  }
};

export const getPainLevelLabel = (level: string): string => {
  const item = USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO.find(
    (g) => g.level === level
  );
  return item ? item.label : level;
};

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

type FormValues = {
  status: PainStatus;
  severity?: PainLevel;
  is_common?: boolean;
  common_issue_type?: string;
  confirmed_by: string;
  issue_link?: string;
  pr_link?: string;
  retest_decision?: 'passed' | 'failed' | 'not_detected';
  retest_passed_file_key?: string;
};

type Props = {
  open: boolean;
  fileKey: string;
  stepId: string;
  painIndex: number;
  painText: string;
  /** 当前痛点状态 */
  currentRecord?: PainConfirmationRecord | null;
  parentPainRemark?: string | null;
  /** 可选：版本选项（file_key → label），用于复测通过时选择通过报告 */
  versionOptions?: Array<{ value: string; label: string }>;
  onCancel: () => void;
  onSubmit: (payload: UpsertPainConfirmationPayload) => Promise<void>;
};

const CONFIRMED_BY_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9 \-_]{1,20}$/;
const FALLBACK_LINK_TEXT = '未记录';

const formatStatusTime = (value?: string | null): string => {
  const normalized = String(value || '').trim();
  if (!normalized) return '';
  return normalized.replace('T', ' ').replace('Z', '').slice(0, 16);
};

const getDisplayedStepStatus = (status: PainStatus): PainStatus => {
  if (status === PainStatus.NO_FIX_NEEDED) {
    return PainStatus.CONFIRMED_PENDING_FIX;
  }
  if (status === PainStatus.RETESTED_FAILED) {
    return PainStatus.FIXED_PENDING_RETEST;
  }
  return Math.min(status, PainStatus.RETESTED_PASSED) as PainStatus;
};

const getCurrentStatusTagMeta = (
  status: PainStatus
): { color: string; text: string } => {
  if (status === PainStatus.NO_FIX_NEEDED) {
    return { color: 'default', text: STATUS_LABELS[PainStatus.NO_FIX_NEEDED] };
  }
  if (status === PainStatus.RETESTED_FAILED) {
    return { color: 'error', text: STATUS_LABELS[PainStatus.RETESTED_FAILED] };
  }
  return { color: 'processing', text: '当前状态' };
};

type StepSnapshot = Partial<PainConfirmationRecord> & {
  status?: number;
  severity?: string | null;
  is_common_issue?: boolean;
  common_issue_type?: string | null;
  issue_link?: string | null;
  pr_link?: string | null;
  retest_decision?: 'passed' | 'failed' | 'not_detected' | null;
  retest_passed_file_key?: string | null;
  latest_file_key?: string | null;
  confirmed_by?: string | null;
  confirmed_at?: string | null;
};

const getDefaultVersionValue = (
  versionOptions: Array<{ value: string; label: string }> | undefined,
  fileKey: string
): string | undefined =>
  versionOptions?.find((item) => item.value !== fileKey)?.value;

const getSafePainLevel = (value?: string | null): PainLevel => {
  const normalized = String(value || '').trim();
  return SEVERITY_OPTIONS.some((item) => item.value === normalized)
    ? (normalized as PainLevel)
    : 'P1_CRITICAL';
};

const getSafeCommonIssueType = (
  value: string | null | undefined,
  options: string[]
): string | undefined => {
  const normalized = String(value || '').trim();
  if (normalized) return normalized;
  return options[0];
};

const getSafeLinkValue = (
  value: string | null | undefined,
  fallback?: string | null,
  isReviewing?: boolean
): string => {
  const normalized = String(value || '').trim();
  if (normalized && normalized !== '未记录') return normalized;
  if (!isReviewing) return '';
  const fallbackValue = String(fallback || '').trim();
  return fallbackValue || FALLBACK_LINK_TEXT;
};

const isValidUrlOrFallback = (value: string | null | undefined): boolean => {
  const normalized = String(value || '').trim();
  if (!normalized) return false;
  if (normalized === FALLBACK_LINK_TEXT) return true;
  try {
    new URL(normalized);
    return true;
  } catch {
    return false;
  }
};

const resolveStepSnapshot = ({
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
      findByStatuses([PainStatus.RETESTING]) ||
      findByStatuses([
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

const buildReadonlyFormValues = ({
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
  versionOptions?: Array<{ value: string; label: string }>;
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
    is_common: isCommon,
    common_issue_type: isCommon
      ? getSafeCommonIssueType(
          snapshot?.common_issue_type,
          commonIssueTypeOptions
        )
      : undefined,
    confirmed_by: String(snapshot?.confirmed_by || 'System').trim(),
    issue_link: getSafeLinkValue(snapshot?.issue_link, fallbackIssueLink, true),
    pr_link: getSafeLinkValue(snapshot?.pr_link, fallbackPrLink, true),
    retest_decision: retestDecision,
    retest_passed_file_key: passedFileKey,
  };
};

const enrichPayloadByStatus = (
  base: UpsertPainConfirmationPayload,
  status: PainStatus,
  vals: FormValues,
  shouldShowRetest: boolean
): UpsertPainConfirmationPayload => {
  if (status === PainStatus.TO_BE_CONFIRMED) {
    return {
      ...base,
      severity: vals.severity,
      is_common_issue: vals.is_common === true,
      common_issue_type:
        vals.is_common === true ? vals.common_issue_type || null : null,
    };
  }
  if (status === PainStatus.CONFIRMED_PENDING_FIX) {
    return { ...base, issue_link: vals.issue_link };
  }
  if (
    status === PainStatus.FIXED_PENDING_RETEST ||
    status === PainStatus.RETESTED_FAILED
  ) {
    return { ...base, pr_link: vals.pr_link };
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

const RetestPassedInfo: React.FC<{
  currentRecord?: PainConfirmationRecord | null;
  parentPainRemark?: string | null;
}> = ({ currentRecord, parentPainRemark }) => {
  const prLinkValue = String(currentRecord?.pr_link || '').trim();
  const showPrLinkAsAnchor =
    prLinkValue !== FALLBACK_LINK_TEXT &&
    prLinkValue !== '' &&
    isValidUrlOrFallback(prLinkValue);

  const retestReportId = String(parentPainRemark || '').trim() || '';

  return (
    <div className="space-y-3 rounded-md bg-emerald-50 p-4">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        <Text type="success" strong>
          复测已通过
        </Text>
      </div>
      <div className="space-y-1.5 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-slate-400">PR 链接：</span>
          {showPrLinkAsAnchor ? (
            <Link
              href={prLinkValue}
              target="_blank"
              className="text-blue-600 hover:text-blue-800"
            >
              {prLinkValue}
            </Link>
          ) : (
            <span>{FALLBACK_LINK_TEXT}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-slate-400">复测报告ID：</span>
          {retestReportId ? (
            <Link
              href={`/intelligent-analysis/community-experience?project=${encodeURIComponent(
                retestReportId
              )}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {retestReportId}
            </Link>
          ) : (
            <span>{FALLBACK_LINK_TEXT}</span>
          )}
        </div>
        {currentRecord?.confirmed_by && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">提交人：</span>
            <span>{currentRecord.confirmed_by}</span>
          </div>
        )}
        {currentRecord?.confirmed_at && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">提交时间：</span>
            <span>
              {currentRecord.confirmed_at.replace('T', ' ').replace('Z', '')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const HistoryTable: React.FC<{
  data?: { history: any[] };
  loading: boolean;
}> = ({ data, loading }) => {
  const columns = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (s: number, record: any) => {
        const statusText = STATUS_LABELS[s] || '未知状态';
        return (
          <Tag color="blue">
            {record.is_common_issue || record.common_issue_type
              ? `${statusText}（痛点问题）`
              : statusText}
          </Tag>
        );
      },
    },
    {
      title: '详情',
      key: 'details',
      render: (_: any, record: any) => {
        if (record.is_common_issue || record.common_issue_type)
          return record.common_issue_type
            ? `共性问题类型: ${record.common_issue_type}`
            : '共性问题待处理';
        if (record.status === 1)
          return `等级: ${formatSeverityLabel(record.severity)}`;
        if (record.status === 2) return `Issue: ${record.issue_link || '-'}`;
        if (record.status === 3) return `PR: ${record.pr_link || '-'}`;
        if (record.status === 5) {
          const parts = [];
          if (record.pr_link) parts.push(`PR: ${record.pr_link}`);
          if (record.retest_passed_file_key)
            parts.push(`通过报告: ${record.retest_passed_file_key}`);
          return parts.length ? parts.join(', ') : '--';
        }
        return '-';
      },
    },
    {
      title: '操作人',
      dataIndex: 'confirmed_by',
      key: 'confirmed_by',
      render: (v: string) => v || '-',
    },
    {
      title: '操作时间',
      dataIndex: 'confirmed_at',
      key: 'confirmed_at',
      render: (v: string) => v.replace('T', ' ').replace('Z', ''),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-slate-700">历史记录</div>
      <Table
        dataSource={data?.history || []}
        columns={columns}
        pagination={false}
        size="small"
        loading={loading}
        rowKey="confirmed_at"
        locale={{ emptyText: <Empty description="暂无历史记录" /> }}
      />
    </div>
  );
};

const ToBeConfirmedFormItems: React.FC<{
  isCommon: boolean;
  commonIssueLoading: boolean;
  knownCommonIssues: Array<{ issueType: string; description: string }>;
  commonIssueTypeOptions: string[];
  form: any;
}> = ({
  isCommon,
  commonIssueLoading,
  knownCommonIssues,
  commonIssueTypeOptions,
  form,
}) => (
  <>
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'minmax(120px, 150px) minmax(0, 1fr)',
      }}
    >
      <Form.Item
        name="is_common"
        label={
          <span className="text-sm font-medium text-slate-700">
            是否共性问题
          </span>
        }
        rules={[{ required: true, message: '请选择是否共性问题' }]}
      >
        <Radio.Group>
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </Form.Item>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="mb-2 text-sm font-medium text-slate-700">
          已知共性问题
        </div>
        {commonIssueLoading ? (
          <div className="flex items-center justify-center py-6">
            <Spin size="small" />
          </div>
        ) : knownCommonIssues.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无已知共性问题"
          />
        ) : (
          <ul className="max-h-48 list-disc space-y-1 overflow-auto pl-5 text-xs text-slate-700">
            {knownCommonIssues.map((item, idx) => (
              <li key={`${item.issueType}-${item.description}-${idx}`}>
                {(item.issueType || '--') +
                  '（' +
                  (item.description || '--') +
                  '）'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    {isCommon === true && (
      <Form.Item
        name="common_issue_type"
        label={
          <span className="text-sm font-medium text-slate-700">
            共性问题类型
          </span>
        }
        rules={[
          {
            validator: async (_, value) => {
              if (form.getFieldValue('is_common') !== true) return;
              if (!String(value || '').trim()) {
                throw new Error('请选择共性问题类型');
              }
            },
          },
        ]}
      >
        <Radio.Group className="w-full">
          <Space direction="vertical" className="w-full">
            {commonIssueTypeOptions.map((t) => (
              <Radio key={t} value={t} className="w-full">
                <span className="text-sm text-slate-700">{t}</span>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    )}

    <Form.Item
      name="severity"
      label={
        <span className="text-sm font-medium text-slate-700">确认严重程度</span>
      }
      rules={[{ required: true, message: '请选择严重程度' }]}
    >
      <Radio.Group className="w-full">
        <Space direction="vertical" className="w-full">
          {SEVERITY_OPTIONS.map((item) => {
            const style = getPainLevelStyle(item.value);
            return (
              <Radio key={item.value} value={item.value} className="w-full">
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${style.bg} ${style.text} ${style.border}`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`}
                    />
                    {formatSeverityLabel(item.value)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {item.value === 'P4_TRIVIAL' ? '' : item.description}
                  </span>
                </span>
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </Form.Item>
  </>
);

const RetestingFormItems: React.FC<{
  showRetestDecision: boolean;
  latestFileKey: string;
  retestDecision?: string;
  versionOptions?: Array<{ value: string; label: string }>;
  fileKey: string;
}> = ({
  showRetestDecision,
  latestFileKey,
  retestDecision,
  versionOptions,
  fileKey,
}) => {
  if (showRetestDecision) {
    return (
      <div className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="space-y-1">
          <Text type="warning" strong>
            检测到新报告已生成，该痛点是否复测通过？
          </Text>
          {latestFileKey ? (
            <div className="text-xs text-slate-500">
              最新报告标识：{latestFileKey}
            </div>
          ) : (
            ''
          )}
        </div>
        <Form.Item
          name="retest_decision"
          label={
            <span className="text-sm font-medium text-slate-700">复测结论</span>
          }
          rules={[{ required: true, message: '请选择复测结论' }]}
        >
          <Radio.Group className="w-full">
            <Space direction="vertical" className="w-full">
              <Radio value="passed">通过</Radio>
              {/* （通知负责人邮箱） */}
              <Radio value="failed">不通过</Radio>
              {/* （通知负责人邮箱，状态变为复测不通过） */}
              <Radio value="not_detected">未检测到</Radio>
              {/* （通知管理员团队邮箱） */}
            </Space>
          </Radio.Group>
        </Form.Item>
        {retestDecision === 'passed' &&
          versionOptions &&
          versionOptions.length > 0 && (
            <Form.Item
              name="retest_passed_file_key"
              label={
                <span className="text-sm font-medium text-slate-700">
                  通过报告
                </span>
              }
              rules={[{ required: true, message: '请选择通过报告' }]}
            >
              <Select
                placeholder="请选择复测通过的报告"
                options={versionOptions.filter((opt) => opt.value !== fileKey)}
                showSearch
                optionFilterProp="label"
                popupMatchSelectWidth={false}
              />
            </Form.Item>
          )}
      </div>
    );
  }
  return (
    <div className="rounded-md bg-amber-50 p-4 text-center">
      <Text type="warning" strong>
        请联系相关接口人启动复测
      </Text>
    </div>
  );
};

const ConfirmedPendingFixFormItems: React.FC = () => (
  <Form.Item
    name="issue_link"
    label={
      <span className="text-sm font-medium text-slate-700">ISSUE 链接</span>
    }
    rules={[
      { required: true, message: '请输入 ISSUE 链接' },
      { type: 'url', message: '请输入有效的 URL' },
    ]}
  >
    <Input placeholder="https://gitcode.com/.../issues/1" allowClear />
  </Form.Item>
);

const FixedPendingRetestFormItems: React.FC<{
  isReviewingHistoryStep: boolean;
  currentStatus: number;
}> = ({ isReviewingHistoryStep, currentStatus }) => (
  <>
    {!isReviewingHistoryStep &&
      currentStatus === PainStatus.RETESTED_FAILED && (
        <div className="mb-4 rounded-md bg-rose-50 p-3">
          <Text type="danger" strong className="text-xs">
            上轮复测不通过，请重新提交 PR
          </Text>
        </div>
      )}
    <Form.Item
      name="pr_link"
      label={
        <span className="text-sm font-medium text-slate-700">PR 链接</span>
      }
      rules={[
        { required: true, message: '请输入 PR 链接' },
        {
          validator: async (_, value) => {
            if (!isValidUrlOrFallback(value)) {
              throw new Error('请输入有效的 URL');
            }
          },
        },
      ]}
    >
      <Input placeholder="https://gitcode.com/.../pull/1" allowClear />
    </Form.Item>
  </>
);

const usePainConfirmationForm = ({
  stepId,
  painIndex,
  painText,
  currentStatus,
  showRetestDecision,
  currentConfirmedBy,
  onSubmit,
  onCancel,
  form,
}: {
  stepId: string;
  painIndex: number;
  painText: string;
  currentStatus: number;
  showRetestDecision: boolean;
  currentConfirmedBy?: string | null;
  onSubmit: (payload: UpsertPainConfirmationPayload) => Promise<void>;
  onCancel: () => void;
  form: FormInstance<FormValues>;
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const confirmedBy =
        String(values.confirmed_by || '').trim() ||
        String(currentConfirmedBy || '').trim() ||
        null;

      const basePayload: UpsertPainConfirmationPayload = {
        step_id: stepId,
        pain_index: painIndex,
        pain_text: painText,
        status: values.status,
        confirmed_by: confirmedBy,
      };

      const payload = enrichPayloadByStatus(
        basePayload,
        currentStatus,
        values,
        showRetestDecision
      );

      await onSubmit(payload);
      toast.success('痛点状态已更新', {
        position: 'top-center',
        style: { maxWidth: '600px', wordBreak: 'break-all' },
      });
      onCancel();
    } catch (err) {
      if (err && typeof err === 'object' && 'errorFields' in err) {
        return;
      }
      const errMsg = (err as Error).message || '提交失败，请重试';
      toast.error(errMsg, {
        position: 'top-center',
        style: { maxWidth: '600px', wordBreak: 'break-all' },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { handleOk, submitting };
};

const useStepsItems = ({
  currentStatus,
  displayedStepStatus,
  isReviewingHistoryStep,
  activeDisplayStep,
  currentRecord,
  reviewStepSnapshotMap,
  setSelectedStep,
}: {
  currentStatus: number;
  displayedStepStatus: number;
  isReviewingHistoryStep: boolean;
  activeDisplayStep: number;
  currentRecord: PainConfirmationRecord | undefined;
  reviewStepSnapshotMap: Map<number, StepSnapshot | undefined>;
  setSelectedStep: (step: number | null) => void;
}) => {
  return useMemo(() => {
    const currentTagMeta = getCurrentStatusTagMeta(currentStatus);

    return [1, 2, 3, 4, 5].map((s) => {
      const isCurrentStep = s === displayedStepStatus;
      const canReviewStep = s < displayedStepStatus;
      const canBackToCurrent = isCurrentStep && isReviewingHistoryStep;
      const isReviewingThisStep =
        isReviewingHistoryStep && activeDisplayStep === s;
      const isStepClickable = canReviewStep || canBackToCurrent;
      const stepSnapshot = isCurrentStep
        ? currentRecord
        : reviewStepSnapshotMap.get(s);
      const timeText =
        s > displayedStepStatus
          ? ''
          : formatStatusTime(
              stepSnapshot?.confirmed_at || currentRecord?.confirmed_at
            );

      const labelContent = (
        <div
          className={`inline-flex min-h-6 items-center rounded-md px-2 py-0 align-middle leading-none transition-all ${
            isReviewingThisStep
              ? 'border border-blue-200 bg-blue-50 text-blue-700 shadow-sm'
              : isStepClickable
              ? 'border border-transparent hover:border-blue-200 hover:bg-blue-50/70'
              : 'border border-transparent'
          }`}
        >
          <span className="whitespace-nowrap leading-5">
            {STATUS_LABELS[s]}
          </span>
        </div>
      );

      const titleContent = (
        <div className="inline-flex items-center gap-2">
          {isStepClickable ? (
            <button
              type="button"
              onClick={() => {
                if (canBackToCurrent) {
                  setSelectedStep(null);
                  return;
                }
                setSelectedStep(s);
              }}
              className="cursor-pointer rounded-sm text-left transition-colors hover:text-blue-600"
            >
              {labelContent}
            </button>
          ) : (
            labelContent
          )}
          {isCurrentStep ? (
            <Tag
              color={currentTagMeta.color}
              className="!mr-0 whitespace-nowrap"
            >
              {currentTagMeta.text}
            </Tag>
          ) : null}
        </div>
      );

      return {
        title: titleContent,
        description: timeText ? (
          <div className="text-xs leading-5 text-slate-500">{timeText}</div>
        ) : null,
      };
    });
  }, [
    activeDisplayStep,
    currentRecord,
    currentStatus,
    displayedStepStatus,
    isReviewingHistoryStep,
    reviewStepSnapshotMap,
    setSelectedStep,
  ]);
};

const ModalFooter: React.FC<{
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  isReviewingHistoryStep: boolean;
  setSelectedStep: (step: number | null) => void;
  onCancel: () => void;
  currentStatus: number;
  showRetestDecision: boolean;
  rollbackTargets: PainStatus[];
  onRollback: (target: PainStatus) => void;
}> = ({
  showHistory,
  setShowHistory,
  isReviewingHistoryStep,
  setSelectedStep,
  onCancel,
  currentStatus,
  showRetestDecision,
  rollbackTargets,
  onRollback,
}) => {
  if (showHistory) {
    return (
      <Button key="back" onClick={() => setShowHistory(false)}>
        返回
      </Button>
    );
  }

  if (isReviewingHistoryStep) {
    return (
      <div className="flex items-center justify-end gap-2">
        {currentStatus !== PainStatus.TO_BE_CONFIRMED
          ? rollbackTargets.map((target) => (
              <Button
                key={`rollback-${target}`}
                danger
                onClick={() => onRollback(target)}
              >
                回退到{STATUS_LABELS[target] || target}
              </Button>
            ))
          : null}
        <Button key="close-history" onClick={onCancel}>
          关闭
        </Button>
      </div>
    );
  }

  if (currentStatus >= PainStatus.RETESTING && !showRetestDecision) {
    return (
      <Button key="close" onClick={onCancel}>
        关闭
      </Button>
    );
  }

  return undefined;
};

const ModalTitle: React.FC = () => (
  <div className="flex items-center justify-between pr-8">
    <span className="text-base font-semibold text-slate-800">痛点管理</span>
  </div>
);

const PainConfirmationForm: React.FC<{
  form: FormInstance<FormValues>;
  isReviewingHistoryStep: boolean;
  currentStatus: number;
  activeDisplayStep: number;
  isCommon: boolean;
  commonIssueLoading: boolean;
  knownCommonIssues: Array<{ issueType: string; description: string }>;
  commonIssueTypeOptions: string[];
  showRetestDecision: boolean;
  latestFileKey: string;
  reviewLatestFileKey: string;
  retestDecision: string;
  versionOptions: any[];
  fileKey: string;
  currentRecord: PainConfirmationRecord | undefined;
  parentPainRemark?: string | null;
}> = ({
  form,
  isReviewingHistoryStep,
  currentStatus,
  activeDisplayStep,
  isCommon,
  commonIssueLoading,
  knownCommonIssues,
  commonIssueTypeOptions,
  showRetestDecision,
  latestFileKey,
  reviewLatestFileKey,
  retestDecision,
  versionOptions,
  fileKey,
  currentRecord,
  parentPainRemark,
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      disabled={isReviewingHistoryStep}
      initialValues={{ status: currentStatus }}
    >
      <Form.Item name="status" hidden>
        <Input type="hidden" />
      </Form.Item>

      {(isReviewingHistoryStep
        ? activeDisplayStep === PainStatus.TO_BE_CONFIRMED
        : currentStatus === PainStatus.TO_BE_CONFIRMED) && (
        <ToBeConfirmedFormItems
          isCommon={isCommon}
          commonIssueLoading={commonIssueLoading}
          knownCommonIssues={knownCommonIssues}
          commonIssueTypeOptions={commonIssueTypeOptions}
          form={form}
        />
      )}

      {(isReviewingHistoryStep
        ? activeDisplayStep === PainStatus.CONFIRMED_PENDING_FIX
        : currentStatus === PainStatus.CONFIRMED_PENDING_FIX) && (
        <ConfirmedPendingFixFormItems />
      )}

      {((isReviewingHistoryStep &&
        activeDisplayStep === PainStatus.FIXED_PENDING_RETEST) ||
        (!isReviewingHistoryStep &&
          (currentStatus === PainStatus.FIXED_PENDING_RETEST ||
            currentStatus === PainStatus.RETESTED_FAILED))) && (
        <FixedPendingRetestFormItems
          isReviewingHistoryStep={isReviewingHistoryStep}
          currentStatus={currentStatus}
        />
      )}

      {((isReviewingHistoryStep &&
        activeDisplayStep === PainStatus.RETESTING) ||
        (!isReviewingHistoryStep &&
          currentStatus === PainStatus.RETESTING)) && (
        <RetestingFormItems
          showRetestDecision={
            isReviewingHistoryStep ? true : showRetestDecision
          }
          latestFileKey={
            isReviewingHistoryStep ? reviewLatestFileKey : latestFileKey
          }
          retestDecision={retestDecision}
          versionOptions={versionOptions}
          fileKey={fileKey}
        />
      )}

      {!isReviewingHistoryStep &&
        currentStatus === PainStatus.RETESTED_PASSED && (
          <RetestPassedInfo
            currentRecord={currentRecord}
            parentPainRemark={parentPainRemark}
          />
        )}

      {((isReviewingHistoryStep && activeDisplayStep <= 3) ||
        (!isReviewingHistoryStep &&
          (currentStatus <= PainStatus.FIXED_PENDING_RETEST ||
            currentStatus === PainStatus.RETESTED_FAILED))) && (
        <Form.Item
          name="confirmed_by"
          label={
            <span className="text-sm font-medium text-slate-700">操作人</span>
          }
          rules={[
            { required: true, message: '请填写操作人' },
            {
              pattern: CONFIRMED_BY_PATTERN,
              message:
                '只允许中文、字母、数字、空格、连字符和下划线，不超过 20 个字符',
            },
          ]}
        >
          <Input
            placeholder="请输入您的姓名"
            maxLength={20}
            showCount
            allowClear
          />
        </Form.Item>
      )}
    </Form>
  );
};

const PainLevelConfirmModal: React.FC<Props> = ({
  open,
  fileKey,
  stepId,
  painIndex,
  painText,
  currentRecord,
  parentPainRemark,
  versionOptions,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [showHistory, setShowHistory] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [rollbackModalOpen, setRollbackModalOpen] = useState(false);
  const [rollbackTarget, setRollbackTarget] = useState<PainStatus | null>(null);
  const [rollbackBy, setRollbackBy] = useState('');
  const [rollbackReason, setRollbackReason] = useState('');
  const [rollbackSubmitting, setRollbackSubmitting] = useState(false);

  // 计算当前状态：如果没有记录，默认是 1 (待确认)
  const currentStatus = currentRecord?.status || PainStatus.TO_BE_CONFIRMED;
  const latestFileKey = String(currentRecord?.latest_file_key || '').trim();
  const showRetestDecision =
    currentStatus === PainStatus.RETESTING && !!latestFileKey;

  const { handleOk, submitting } = usePainConfirmationForm({
    stepId,
    painIndex,
    painText,
    currentStatus,
    currentConfirmedBy: currentRecord?.confirmed_by ?? null,
    showRetestDecision,
    onSubmit,
    onCancel,
    form,
  });

  const { data: commonIssueResp, isFetching: commonIssueLoading } = useQuery({
    queryKey: ['overviewKnownCommonIssuesForConfirmModal'],
    queryFn: () => fetchOverviewCommonIssues({}),
    enabled:
      open &&
      (currentStatus === PainStatus.TO_BE_CONFIRMED ||
        selectedStep === PainStatus.TO_BE_CONFIRMED),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const historyData = useMemo(
    () => ({ history: currentRecord?.history || [] }),
    [currentRecord?.history]
  );
  const historyLoading = false;

  const { knownCommonIssues, commonIssueTypeOptions } = useMemo(() => {
    const items = commonIssueResp?.items ?? [];
    const issues = items.map((item) => ({
      issueType: String(item.issueType || '').trim(),
      description: String(item.description || '').trim(),
    }));
    const optionsFromApi = Array.from(
      new Set(issues.map((item) => item.issueType).filter(Boolean))
    );
    const currentType = String(currentRecord?.common_issue_type || '').trim();
    const options = currentType
      ? Array.from(new Set([currentType, ...optionsFromApi]))
      : optionsFromApi;
    return { knownCommonIssues: issues, commonIssueTypeOptions: options };
  }, [commonIssueResp?.items, currentRecord?.common_issue_type]);

  // 计算下一步状态
  const nextStatus = useMemo(() => {
    if (currentStatus === PainStatus.RETESTED_FAILED)
      return PainStatus.FIXED_PENDING_RETEST;
    return Math.min(currentStatus + 1, 5) as PainStatus;
  }, [currentStatus]);

  const displayedStepStatus = getDisplayedStepStatus(currentStatus);

  const reviewStepSnapshotMap = useMemo(() => {
    const historyItems = currentRecord?.history || [];
    const steps = [
      PainStatus.TO_BE_CONFIRMED,
      PainStatus.CONFIRMED_PENDING_FIX,
      PainStatus.FIXED_PENDING_RETEST,
      PainStatus.RETESTING,
    ];

    return new Map(
      steps.map((step) => [
        step,
        resolveStepSnapshot({
          displayStep: step,
          currentRecord,
          historyItems,
        }),
      ])
    );
  }, [currentRecord]);

  const activeDisplayStep = selectedStep ?? displayedStepStatus;
  const isReviewingHistoryStep =
    selectedStep !== null && selectedStep < displayedStepStatus;
  const rollbackTargets = useMemo(() => {
    const candidate = activeDisplayStep as PainStatus;
    const allowed: PainStatus[] = [
      PainStatus.TO_BE_CONFIRMED,
      PainStatus.CONFIRMED_PENDING_FIX,
      PainStatus.FIXED_PENDING_RETEST,
    ];
    const cur = currentStatus as PainStatus;
    if (!allowed.includes(candidate)) return [];
    if (candidate >= cur) return [];
    return [candidate];
  }, [activeDisplayStep, currentStatus]);
  const activeReviewSnapshot = isReviewingHistoryStep
    ? reviewStepSnapshotMap.get(activeDisplayStep)
    : undefined;

  const reviewLatestFileKey = useMemo(() => {
    return String(
      activeReviewSnapshot?.latest_file_key ||
        activeReviewSnapshot?.retest_passed_file_key ||
        latestFileKey ||
        ''
    ).trim();
  }, [activeReviewSnapshot, latestFileKey]);

  const stepsItems = useStepsItems({
    currentStatus,
    displayedStepStatus,
    isReviewingHistoryStep,
    activeDisplayStep,
    currentRecord,
    reviewStepSnapshotMap,
    setSelectedStep,
  });

  const openRollback = useCallback((target: PainStatus) => {
    setRollbackTarget(target);
    setRollbackBy('');
    setRollbackReason('');
    setRollbackModalOpen(true);
  }, []);

  const submitRollback = useCallback(async () => {
    if (!rollbackTarget) return;
    const by = rollbackBy.trim();
    const reason = rollbackReason.trim();
    if (!by || !reason) return;

    const base = currentRecord ?? ({} as PainConfirmationRecord);
    const payload: UpsertPainConfirmationPayload = {
      step_id: stepId,
      pain_index: painIndex,
      pain_text: painText,
      status: rollbackTarget,
      confirmed_by: by,
      action: 'rollback',
      action_reason: reason,
    };

    if (rollbackTarget === PainStatus.TO_BE_CONFIRMED) {
      payload.severity = String(base.severity || 'P1_CRITICAL');
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
    } else if (rollbackTarget === PainStatus.CONFIRMED_PENDING_FIX) {
      payload.issue_link =
        String(base.issue_link || '').trim() || FALLBACK_LINK_TEXT;
    } else if (rollbackTarget === PainStatus.FIXED_PENDING_RETEST) {
      payload.pr_link = String(base.pr_link || '').trim() || FALLBACK_LINK_TEXT;
    }

    setRollbackSubmitting(true);
    try {
      await onSubmit(payload);
      setRollbackModalOpen(false);
      setSelectedStep(null);
    } finally {
      setRollbackSubmitting(false);
    }
  }, [
    currentRecord,
    onSubmit,
    painIndex,
    painText,
    rollbackBy,
    rollbackReason,
    rollbackTarget,
    stepId,
  ]);

  // 打开弹窗时重置查看态
  useEffect(() => {
    if (!open) return;
    setShowHistory(false);
    setSelectedStep(null);
  }, [open]);

  const resetFormToSnapshot = useCallback(() => {
    form.setFieldsValue(
      buildReadonlyFormValues({
        displayStep: activeDisplayStep,
        snapshot: activeReviewSnapshot,
        currentStatus,
        commonIssueTypeOptions,
        versionOptions,
        fileKey,
        latestFileKey: reviewLatestFileKey,
      })
    );
  }, [
    activeDisplayStep,
    activeReviewSnapshot,
    currentStatus,
    commonIssueTypeOptions,
    versionOptions,
    fileKey,
    reviewLatestFileKey,
    form,
  ]);

  const resetFormToCurrent = useCallback(() => {
    if (currentRecord?.status === PainStatus.TO_BE_CONFIRMED) {
      form.setFieldsValue({
        status: PainStatus.TO_BE_CONFIRMED,
        severity: (currentRecord?.severity as PainLevel) || 'P1_CRITICAL',
        is_common: undefined,
        common_issue_type: undefined,
        confirmed_by: '',
        issue_link: '',
        pr_link: '',
        retest_decision: undefined,
        retest_passed_file_key: latestFileKey || undefined,
      });
      return;
    }

    const currentIsCommon =
      currentRecord?.is_common_issue === true ||
      !!String(currentRecord?.common_issue_type || '').trim();
    const safeCommonIssueType = currentIsCommon
      ? getSafeCommonIssueType(
          currentRecord?.common_issue_type,
          commonIssueTypeOptions
        )
      : undefined;

    form.setFieldsValue({
      status: currentStatus,
      severity: currentRecord?.severity
        ? (currentRecord?.severity as PainLevel) || 'P1_CRITICAL'
        : undefined,
      is_common:
        currentStatus === PainStatus.TO_BE_CONFIRMED && !currentRecord
          ? undefined
          : currentIsCommon,
      common_issue_type: safeCommonIssueType,
      confirmed_by: currentRecord?.confirmed_by || '',
      issue_link: getSafeLinkValue(currentRecord?.issue_link, '', false),
      pr_link: getSafeLinkValue(currentRecord?.pr_link, '', false),
      retest_decision: undefined,
      retest_passed_file_key: latestFileKey || undefined,
    });
  }, [
    currentRecord,
    currentStatus,
    commonIssueTypeOptions,
    latestFileKey,
    form,
  ]);

  // 打开弹窗或切换查看步骤时填充表单
  useEffect(() => {
    if (!open) return;
    if (isReviewingHistoryStep) {
      resetFormToSnapshot();
    } else {
      resetFormToCurrent();
    }
  }, [open, isReviewingHistoryStep, resetFormToSnapshot, resetFormToCurrent]);

  const isCommon = Form.useWatch('is_common', form);
  const retestDecision = Form.useWatch('retest_decision', form);

  useEffect(() => {
    if (isCommon !== true) {
      form.setFieldsValue({ common_issue_type: undefined });
    }
  }, [isCommon, form]);

  return (
    <Modal
      title={<ModalTitle />}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText={
        showRetestDecision
          ? '提交复测结论'
          : nextStatus === currentStatus
          ? '更新当前状态'
          : '提交'
      }
      cancelText="取消"
      confirmLoading={submitting}
      width="70%"
      styles={{
        body: {
          height: '70vh',
          overflowY: 'auto',
          paddingRight: '8px', // 预留滚动条空间
        },
      }}
      destroyOnClose
      footer={
        showHistory ||
        isReviewingHistoryStep ||
        (currentStatus >= PainStatus.RETESTING &&
          !showRetestDecision &&
          currentStatus !== PainStatus.RETESTED_FAILED) ? (
          <ModalFooter
            showHistory={showHistory}
            setShowHistory={setShowHistory}
            isReviewingHistoryStep={isReviewingHistoryStep}
            setSelectedStep={setSelectedStep}
            onCancel={onCancel}
            currentStatus={currentStatus}
            showRetestDecision={showRetestDecision}
            rollbackTargets={rollbackTargets}
            onRollback={openRollback}
          />
        ) : undefined
      }
    >
      <div className="space-y-6">
        {/* 流程进度 */}
        <div className="rounded-lg bg-slate-50 p-4">
          <Steps
            current={displayedStepStatus - 1}
            items={stepsItems}
            size="small"
            className="pain-steps"
          />
        </div>

        {showHistory ? (
          <HistoryTable data={historyData} loading={historyLoading} />
        ) : (
          <>
            {/* 痛点内容预览 */}
            <div className="rounded-lg border border-rose-100 bg-rose-50/80 px-3.5 py-2.5 text-sm leading-relaxed text-rose-800">
              <div className="mb-1 font-semibold">痛点描述：</div>
              {painText}
            </div>

            <PainConfirmationForm
              form={form}
              isReviewingHistoryStep={isReviewingHistoryStep}
              currentStatus={currentStatus}
              activeDisplayStep={activeDisplayStep}
              isCommon={isCommon}
              commonIssueLoading={commonIssueLoading}
              knownCommonIssues={knownCommonIssues}
              commonIssueTypeOptions={commonIssueTypeOptions}
              showRetestDecision={showRetestDecision}
              latestFileKey={latestFileKey}
              reviewLatestFileKey={reviewLatestFileKey}
              retestDecision={retestDecision}
              versionOptions={versionOptions}
              fileKey={fileKey}
              currentRecord={currentRecord}
              parentPainRemark={parentPainRemark}
            />
          </>
        )}
      </div>

      <Modal
        open={rollbackModalOpen}
        onCancel={() => setRollbackModalOpen(false)}
        onOk={submitRollback}
        okText="确认回退"
        cancelText="取消"
        okButtonProps={{
          disabled:
            rollbackSubmitting ||
            !rollbackTarget ||
            !rollbackBy.trim() ||
            !rollbackReason.trim(),
          loading: rollbackSubmitting,
          danger: !!rollbackTarget,
        }}
        title={
          rollbackTarget
            ? `回退到${STATUS_LABELS[rollbackTarget] || rollbackTarget}`
            : '回退'
        }
        destroyOnHidden
      >
        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs font-medium text-slate-600">
              操作人
            </div>
            <Input
              value={rollbackBy}
              onChange={(e) => setRollbackBy(e.target.value)}
              placeholder="请输入操作人"
              maxLength={20}
              allowClear
            />
          </div>
          <div className="mb-4">
            <div className="mb-1 text-xs font-medium text-slate-600">
              回退原因
            </div>
            <Input.TextArea
              className="mb-4"
              value={rollbackReason}
              onChange={(e) => setRollbackReason(e.target.value)}
              placeholder="请输入回退原因"
              rows={2}
              maxLength={1000}
              showCount
              allowClear
            />
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default PainLevelConfirmModal;
