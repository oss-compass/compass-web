import React from 'react';
import { useRouter } from 'next/router';
import DatePicker from '@common/components/DatePicker';
import {
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  type FormInstance,
} from 'antd';

import type { PainConfirmationRecord } from '../../rawData/apiClient';

import {
  CONFIRMED_BY_PATTERN,
  FALLBACK_LINK_TEXT,
  SEVERITY_OPTIONS,
  STATUS_LABELS,
} from './constants';
import type {
  CommonIssueOption,
  FormValues,
  PainConfirmationFormVisibilityArgs,
  StepSnapshot,
  VersionOption,
} from './types';
import { PainStatus } from './types';
import {
  formatCloseTime,
  formatSeverityLabel,
  formatStatusTime,
  getActionReasonText,
  getDatePickerValue,
  getPainLevelStyle,
  getRetestVersionOptions,
  getVersionLabelByFileKey,
  isNonProjectSeverity,
  isValidIssueLink,
  isValidPrLink,
} from './utils';

const { Text, Link } = Typography;

export const NonProjectIssueInfo: React.FC<{
  currentRecord?: PainConfirmationRecord | null;
}> = ({ currentRecord }) => {
  const reason = getActionReasonText(currentRecord) || FALLBACK_LINK_TEXT;
  const reviewStatus = String(
    currentRecord?.non_project_review_status || ''
  ).trim();
  const reviewStatusLabel =
    reviewStatus === 'pending'
      ? '待审核'
      : reviewStatus === 'approved'
      ? '已通过'
      : reviewStatus === 'rejected'
      ? '已拒绝'
      : '--';
  const reviewReason =
    String(currentRecord?.non_project_review_reason || '').trim() ||
    FALLBACK_LINK_TEXT;
  const hasNonProjectReviewInfo = Boolean(
    reviewStatus ||
      String(currentRecord?.non_project_review_reason || '').trim() ||
      String(currentRecord?.non_project_reviewed_by || '').trim() ||
      String(currentRecord?.non_project_reviewed_at || '').trim()
  );
  const title =
    reviewStatus === 'rejected' || hasNonProjectReviewInfo
      ? '非项目本身问题审核'
      : '非项目本身问题';

  return (
    <div className="space-y-3 rounded-md border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        <Text strong className="!text-emerald-700">
          {title}
        </Text>
      </div>
      <div className="space-y-1.5 text-sm text-slate-600">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400">判断原因</span>
          <div className="rounded-md bg-white/80 px-3 py-2 leading-6 text-slate-700">
            {reason}
          </div>
        </div>
        {reviewStatus ? (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">审核状态：</span>
            <span>
              {reviewStatus === 'rejected'
                ? '已拒绝并回退到待确认'
                : reviewStatusLabel}
            </span>
          </div>
        ) : null}
        {reviewStatus === 'rejected' ? (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">拒绝理由</span>
            <div className="rounded-md bg-white/80 px-3 py-2 leading-6 text-amber-700">
              {reviewReason}
            </div>
          </div>
        ) : null}
        {currentRecord?.non_project_reviewed_by ? (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">审核人：</span>
            <span>{currentRecord.non_project_reviewed_by}</span>
          </div>
        ) : null}
        {currentRecord?.non_project_reviewed_at ? (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">审核时间：</span>
            <span>
              {formatStatusTime(currentRecord.non_project_reviewed_at)}
            </span>
          </div>
        ) : null}
        {currentRecord?.confirmed_by && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">操作人：</span>
            <span>{currentRecord.confirmed_by}</span>
          </div>
        )}
        {currentRecord?.confirmed_at && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">操作时间：</span>
            <span>{formatStatusTime(currentRecord.confirmed_at)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const RetestPassedInfo: React.FC<{
  currentRecord?: PainConfirmationRecord | null;
  fileKey: string;
  focusTaskId: string;
  versionOptions?: VersionOption[];
  parentPainRemark?: string | null;
}> = ({ currentRecord, fileKey, focusTaskId, versionOptions }) => {
  const router = useRouter();
  const prLinkValue = String(currentRecord?.pr_link || '').trim();
  const showPrLinkAsAnchor =
    prLinkValue !== FALLBACK_LINK_TEXT &&
    prLinkValue !== '' &&
    isValidPrLink(prLinkValue);

  const retestReportId =
    String(
      currentRecord?.retest_passed_file_key ||
        currentRecord?.latest_file_key ||
        ''
    ).trim() || '';
  const latestVersionLabel = getVersionLabelByFileKey(
    versionOptions,
    retestReportId
  );
  const canCompare =
    !!retestReportId && !!fileKey && String(retestReportId) !== String(fileKey);
  const compareHref = canCompare
    ? `/intelligent-analysis/community-experience?project=${encodeURIComponent(
        retestReportId
      )}&project=${encodeURIComponent(
        fileKey
      )}&focusTaskId=${encodeURIComponent(focusTaskId)}`
    : '';
  const compareLeftLabel = latestVersionLabel || retestReportId;

  return (
    <div className="space-y-3 rounded-md bg-emerald-50 p-4">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        <Text type="success" strong>
          复测已通过
        </Text>
      </div>
      <div className="space-y-1.5 text-sm text-slate-600">
        {(currentRecord?.expected_close_time ||
          currentRecord?.actual_close_time) && (
          <div className="flex flex-col gap-1">
            {currentRecord?.expected_close_time && (
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-xs text-slate-400">
                  预计闭环：
                </span>
                <span>
                  {formatCloseTime(currentRecord.expected_close_time)}
                </span>
              </div>
            )}
            {currentRecord?.actual_close_time && (
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-xs text-slate-400">
                  实际闭环：
                </span>
                <span>{formatCloseTime(currentRecord.actual_close_time)}</span>
              </div>
            )}
          </div>
        )}
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
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="shrink-0 text-xs text-slate-400">复测报告ID：</span>
          {retestReportId ? (
            <>
              <span className="font-mono font-medium text-slate-700">
                {compareLeftLabel}
              </span>
              <span className="text-slate-300">·</span>
              {compareHref ? (
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                  aria-label="查看对比报告"
                  onClick={() => router.push(compareHref)}
                >
                  查看对比报告
                </button>
              ) : (
                <span className="cursor-not-allowed text-slate-300">
                  查看对比报告
                </span>
              )}
            </>
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
            <span>{formatStatusTime(currentRecord.confirmed_at)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const RetestFailedInfo: React.FC<{
  currentRecord?: PainConfirmationRecord | null;
  fileKey: string;
  focusTaskId: string;
  versionOptions?: VersionOption[];
}> = ({ currentRecord, fileKey, focusTaskId, versionOptions }) => {
  const router = useRouter();
  const actionReason = getActionReasonText(currentRecord) || FALLBACK_LINK_TEXT;
  const latestFileKey = String(currentRecord?.latest_file_key || '').trim();
  const latestVersionLabel = getVersionLabelByFileKey(
    versionOptions,
    latestFileKey
  );
  const canCompare =
    !!latestFileKey && !!fileKey && String(latestFileKey) !== String(fileKey);
  const compareHref = canCompare
    ? `/intelligent-analysis/community-experience?project=${encodeURIComponent(
        latestFileKey
      )}&project=${encodeURIComponent(
        fileKey
      )}&focusTaskId=${encodeURIComponent(focusTaskId)}`
    : '';
  const compareLeftLabel = latestVersionLabel || latestFileKey;

  return (
    <div className="space-y-3 rounded-md border border-rose-200 bg-rose-50 p-4">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
        <Text strong className="!text-rose-700">
          复测不通过
        </Text>
      </div>
      <div className="space-y-1.5 text-sm text-slate-600">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400">不通过原因</span>
          <div className="rounded-md bg-white/80 px-3 py-2 leading-6 text-slate-700">
            {actionReason}
          </div>
        </div>
        {latestFileKey ? (
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="shrink-0 text-xs text-slate-400">
              关联新报告：
            </span>
            <span className="font-mono font-medium text-slate-700">
              {compareLeftLabel}
            </span>
            <span className="text-slate-300">·</span>
            {compareHref ? (
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 hover:underline"
                aria-label="查看对比报告"
                onClick={() => router.push(compareHref)}
              >
                查看对比报告
              </button>
            ) : (
              <span className="cursor-not-allowed text-slate-300">
                查看对比报告
              </span>
            )}
          </div>
        ) : null}
        {currentRecord?.confirmed_by && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">操作人：</span>
            <span>{currentRecord.confirmed_by}</span>
          </div>
        )}
        {currentRecord?.confirmed_at && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-400">操作时间：</span>
            <span>{formatStatusTime(currentRecord.confirmed_at)}</span>
          </div>
        )}
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-6 text-amber-800">
          说明：该痛点已被归档，将不在总览看板中单独统计，仅在详细报告中记录，请关注新报告中的对应痛点。
        </div>
      </div>
    </div>
  );
};

export const HistoryTable: React.FC<{
  data?: { history: any[] };
  loading: boolean;
}> = ({ data, loading }) => {
  const columns = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number, record: any) => {
        const statusText = STATUS_LABELS[status] || '未知状态';
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
        const extraParts: string[] = [];
        const actionReason = getActionReasonText(record);
        if (record.expected_close_time) {
          extraParts.push(
            `预计闭环: ${formatCloseTime(record.expected_close_time)}`
          );
        }
        if (record.actual_close_time) {
          extraParts.push(
            `实际闭环: ${formatCloseTime(record.actual_close_time)}`
          );
        }
        if (record.is_common_issue || record.common_issue_type) {
          return [
            record.common_issue_type
              ? `共性问题类型: ${record.common_issue_type}`
              : '共性问题待处理',
            ...extraParts,
          ]
            .filter(Boolean)
            .join('，');
        }
        if (
          Number(record.status) === PainStatus.NO_FIX_NEEDED ||
          isNonProjectSeverity(record.severity)
        ) {
          return [
            '等级: 非项目本身问题',
            actionReason && `判断原因: ${actionReason}`,
          ]
            .filter(Boolean)
            .join('，');
        }
        if (record.status === 1) {
          return [
            `等级: ${formatSeverityLabel(record.severity)}`,
            ...extraParts,
          ]
            .filter(Boolean)
            .join('，');
        }
        if (record.status === 2) {
          return [`Issue: ${record.issue_link || '-'}`, ...extraParts]
            .filter(Boolean)
            .join('，');
        }
        if (record.status === 3) {
          const parts = [];
          if (record.issue_link) parts.push(`Issue: ${record.issue_link}`);
          if (record.pr_link) parts.push(`PR: ${record.pr_link}`);
          return [...parts, ...extraParts].length
            ? [...parts, ...extraParts].join(', ')
            : '--';
        }
        if (record.status === 5) {
          const parts = [];
          if (record.pr_link) parts.push(`PR: ${record.pr_link}`);
          if (record.retest_passed_file_key) {
            parts.push(`通过报告: ${record.retest_passed_file_key}`);
          }
          return [...parts, ...extraParts].length
            ? [...parts, ...extraParts].join(', ')
            : '--';
        }
        return extraParts.length ? extraParts.join(', ') : '-';
      },
    },
    {
      title: '操作人',
      dataIndex: 'confirmed_by',
      key: 'confirmed_by',
      render: (value: string) => value || '-',
    },
    {
      title: '操作时间',
      dataIndex: 'confirmed_at',
      key: 'confirmed_at',
      render: (value: string) => formatStatusTime(value),
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

export const ToBeConfirmedFormItems: React.FC<{
  isCommon: boolean;
  commonIssueLoading: boolean;
  knownCommonIssues: CommonIssueOption[];
  commonIssueTypeOptions: string[];
  form: FormInstance<FormValues>;
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
          共性问题说明
        </div>
        <div className="mb-3 text-xs leading-5 text-slate-700">
          共性问题不是由特定项目的文档、项目本身及相关工具导致的，而是在不同项目里高频出现的普遍缺陷。同时，那些必须依靠社区统筹协调资源，或通过标准化工具与协议来通用解决的问题，也属于共性问题。
        </div>
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
            {commonIssueTypeOptions.map((type) => (
              <Radio key={type} value={type} className="w-full">
                <span className="text-sm text-slate-700">{type}</span>
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
                <span className="flex items-start gap-2">
                  <span
                    className={`inline-flex flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-semibold ${style.bg} ${style.text} ${style.border}`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`}
                    />
                    {formatSeverityLabel(item.value)}
                  </span>
                  <span className="min-w-0 flex-1 whitespace-normal break-words text-xs text-slate-500">
                    {item.value === 'P4_TRIVIAL' ? '' : item.description}
                  </span>
                </span>
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </Form.Item>

    {isNonProjectSeverity(form.getFieldValue('severity')) && (
      <Form.Item
        name="non_project_reason"
        label={
          <span className="text-sm font-medium text-slate-700">判断原因</span>
        }
        rules={[
          {
            validator: async (_, value) => {
              if (!isNonProjectSeverity(form.getFieldValue('severity'))) return;
              if (!String(value || '').trim()) {
                throw new Error('请填写判断原因');
              }
            },
          },
        ]}
      >
        <Input.TextArea
          rows={3}
          maxLength={500}
          showCount
          placeholder="非项目本身问题提交后需要管理员审核，请补充判断原因。"
          allowClear
        />
      </Form.Item>
    )}

    {!isNonProjectSeverity(form.getFieldValue('severity')) && (
      <>
        <Form.Item
          name="issue_link"
          label={
            <span className="text-sm font-medium text-slate-700">
              ISSUE 链接（可选）
            </span>
          }
          rules={[
            {
              validator: async (_, value) => {
                const normalized = String(value || '').trim();
                if (!normalized) return;
                if (!isValidIssueLink(normalized)) {
                  throw new Error(
                    '请输入有效的 GitCode Issue 链接，格式应为 .../issues/数字'
                  );
                }
              },
            },
          ]}
        >
          <Input placeholder="https://gitcode.com/.../issues/1" allowClear />
        </Form.Item>

        <Form.Item
          name="expected_close_time"
          label={
            <span className="text-sm font-medium text-slate-700">
              预计闭环时间（可选）
            </span>
          }
          normalize={(value) => value ?? null}
          getValueProps={(value) => ({
            value: getDatePickerValue(value),
          })}
        >
          <DatePicker
            className="w-full"
            format="YYYY-MM-DD"
            placeholder="请选择预计闭环日期"
            inputReadOnly
          />
        </Form.Item>
      </>
    )}
  </>
);

export const RetestingFormItems: React.FC<{
  showRetestDecision: boolean;
  latestFileKey: string;
  focusTaskId: string;
  retestDecision?: string;
  versionOptions?: VersionOption[];
  fileKey: string;
}> = ({
  showRetestDecision,
  latestFileKey,
  focusTaskId,
  retestDecision,
  versionOptions,
  fileKey,
}) => {
  const router = useRouter();
  const latestVersionLabel = getVersionLabelByFileKey(
    versionOptions,
    latestFileKey
  );
  const canCompare =
    !!latestFileKey && !!fileKey && String(latestFileKey) !== String(fileKey);
  const compareHref = canCompare
    ? `/intelligent-analysis/community-experience?project=${encodeURIComponent(
        latestFileKey
      )}&project=${encodeURIComponent(
        fileKey
      )}&focusTaskId=${encodeURIComponent(focusTaskId)}`
    : '';
  const compareLeftLabel = latestVersionLabel || latestFileKey;
  const retestVersionOptions = getRetestVersionOptions({
    versionOptions,
    fileKey,
  });

  if (showRetestDecision) {
    return (
      <div className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="space-y-1">
          <Text type="warning" strong>
            检测到新报告已生成，该痛点是否复测通过？
          </Text>
          {latestFileKey ? (
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-500">
              <span>最新报告版本：</span>
              <span className="font-mono font-medium text-slate-700">
                {compareLeftLabel}
              </span>
              <span className="text-slate-300">·</span>
              {compareHref ? (
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                  aria-label="查看对比报告"
                  onClick={() => router.push(compareHref)}
                >
                  查看对比报告
                </button>
              ) : (
                <span className="cursor-not-allowed text-slate-300">
                  查看对比报告
                </span>
              )}
            </div>
          ) : null}
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
              <Radio value="failed">不通过</Radio>
              <Radio value="not_detected">未检测到</Radio>
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
                options={retestVersionOptions}
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
        等待复测中
      </Text>
      <div className="mt-1 text-xs text-slate-500">
        检测到最新报告后可直接提交复测结论
      </div>
    </div>
  );
};

export const ConfirmedPendingFixFormItems: React.FC = () => (
  <>
    <Form.Item
      name="expected_close_time"
      label={
        <span className="text-sm font-medium text-slate-700">预计闭环时间</span>
      }
      rules={[{ required: true, message: '请选择预计闭环时间' }]}
      normalize={(value) => value ?? null}
      getValueProps={(value) => ({
        value: getDatePickerValue(value),
      })}
    >
      <DatePicker
        className="w-full"
        format="YYYY-MM-DD"
        placeholder="请选择预计闭环日期"
        inputReadOnly
      />
    </Form.Item>
    <Form.Item
      name="issue_link"
      label={
        <span className="text-sm font-medium text-slate-700">ISSUE 链接</span>
      }
      rules={[
        { required: true, message: '请输入 ISSUE 链接' },
        {
          validator: async (_, value) => {
            if (!isValidIssueLink(value)) {
              throw new Error(
                '请输入有效的 GitCode Issue 链接，格式应为 .../issues/数字'
              );
            }
          },
        },
      ]}
    >
      <Input placeholder="https://gitcode.com/.../issues/1" allowClear />
    </Form.Item>
    <Form.Item
      name="pr_link"
      label={
        <span className="text-sm font-medium text-slate-700">PR 链接</span>
      }
      rules={[
        { required: true, message: '请输入 PR 链接' },
        {
          validator: async (_, value) => {
            if (!isValidPrLink(value)) {
              throw new Error(
                '请输入有效的 GitCode PR 链接，格式应为 .../pull/数字'
              );
            }
          },
        },
      ]}
    >
      <Input placeholder="https://gitcode.com/.../pull/1" allowClear />
    </Form.Item>
  </>
);

export const FixedPendingRetestInfo: React.FC = () => (
  <div className="rounded-md bg-amber-50 p-4 text-center">
    <Text type="warning" strong>
      等待复测中
    </Text>
    <div className="mt-1 text-xs text-slate-500">
      检测到最新报告后可直接提交复测结论
    </div>
  </div>
);

const shouldShowToBeConfirmedForm = ({
  isReviewingHistoryStep,
  currentStatus,
  activeDisplayStep,
}: PainConfirmationFormVisibilityArgs) =>
  isReviewingHistoryStep
    ? activeDisplayStep === PainStatus.TO_BE_CONFIRMED
    : currentStatus === PainStatus.TO_BE_CONFIRMED;

const shouldShowConfirmedPendingFixForm = ({
  isReviewingHistoryStep,
  isCurrentNonProjectIssue,
  currentStatus,
  activeDisplayStep,
}: PainConfirmationFormVisibilityArgs) =>
  isReviewingHistoryStep
    ? activeDisplayStep === PainStatus.CONFIRMED_PENDING_FIX
    : !isCurrentNonProjectIssue &&
      currentStatus === PainStatus.CONFIRMED_PENDING_FIX;

const shouldShowFixedPendingRetestInfo = ({
  isReviewingHistoryStep,
  currentStatus,
  activeDisplayStep,
}: PainConfirmationFormVisibilityArgs) =>
  isReviewingHistoryStep
    ? activeDisplayStep === PainStatus.FIXED_PENDING_RETEST
    : currentStatus === PainStatus.FIXED_PENDING_RETEST;

const shouldShowRetestingForm = ({
  isReviewingHistoryStep,
  currentStatus,
  activeDisplayStep,
}: PainConfirmationFormVisibilityArgs) =>
  isReviewingHistoryStep
    ? activeDisplayStep === PainStatus.RETESTING
    : currentStatus === PainStatus.RETESTING;

const shouldShowConfirmedByField = ({
  isReviewingHistoryStep,
  isCurrentNonProjectIssue,
  currentStatus,
  activeDisplayStep,
}: PainConfirmationFormVisibilityArgs) =>
  isReviewingHistoryStep
    ? activeDisplayStep <= PainStatus.CONFIRMED_PENDING_FIX
    : !isCurrentNonProjectIssue &&
      currentStatus <= PainStatus.CONFIRMED_PENDING_FIX;

export const PainConfirmationForm: React.FC<{
  form: FormInstance<FormValues>;
  isReviewingHistoryStep: boolean;
  isCurrentNonProjectIssue: boolean;
  currentStatus: number;
  activeDisplayStep: number;
  focusTaskId: string;
  isCommon: boolean;
  commonIssueLoading: boolean;
  knownCommonIssues: CommonIssueOption[];
  commonIssueTypeOptions: string[];
  showRetestDecision: boolean;
  latestFileKey: string;
  reviewLatestFileKey: string;
  retestDecision: string;
  versionOptions: VersionOption[];
  fileKey: string;
  currentRecord: PainConfirmationRecord | undefined;
  parentPainRemark?: string | null;
}> = ({
  form,
  isReviewingHistoryStep,
  isCurrentNonProjectIssue,
  currentStatus,
  activeDisplayStep,
  focusTaskId,
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
  const selectedSeverity = Form.useWatch('severity', form);
  const visibilityArgs = {
    isReviewingHistoryStep,
    isCurrentNonProjectIssue,
    currentStatus,
    activeDisplayStep,
  };
  const showToBeConfirmedForm = shouldShowToBeConfirmedForm(visibilityArgs);
  const showConfirmedPendingFixForm =
    shouldShowConfirmedPendingFixForm(visibilityArgs);
  const showFixedPendingRetestInfo =
    shouldShowFixedPendingRetestInfo(visibilityArgs);
  const showRetestingForm = isReviewingHistoryStep
    ? shouldShowRetestingForm(visibilityArgs)
    : showRetestDecision || shouldShowRetestingForm(visibilityArgs);
  const showConfirmedByField = shouldShowConfirmedByField(visibilityArgs);
  const hasNonProjectReviewInfo = Boolean(
    currentRecord?.non_project_review_status ||
      currentRecord?.non_project_review_reason ||
      currentRecord?.non_project_reviewed_by ||
      currentRecord?.non_project_reviewed_at
  );
  const hasReselectedNonProjectSeverity =
    isNonProjectSeverity(selectedSeverity) &&
    (form.isFieldTouched('severity') ||
      form.isFieldTouched('non_project_reason'));
  const showNonProjectIssueInfo =
    !isReviewingHistoryStep &&
    (isCurrentNonProjectIssue ||
      (hasNonProjectReviewInfo && hasReselectedNonProjectSeverity));
  const showRetestFailedInfo =
    !isReviewingHistoryStep && currentStatus === PainStatus.RETESTED_FAILED;
  const showRetestPassedInfo =
    !isReviewingHistoryStep && currentStatus === PainStatus.RETESTED_PASSED;
  const retestingFormShowRetestDecision =
    !isReviewingHistoryStep && showRetestDecision;
  const retestingFormLatestFileKey = isReviewingHistoryStep
    ? reviewLatestFileKey
    : latestFileKey;

  void parentPainRemark;

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      disabled={isReviewingHistoryStep || isCurrentNonProjectIssue}
      initialValues={{ status: currentStatus, expected_close_time: null }}
    >
      <Form.Item name="status" hidden>
        <Input type="hidden" />
      </Form.Item>

      {showToBeConfirmedForm && (
        <ToBeConfirmedFormItems
          isCommon={isCommon}
          commonIssueLoading={commonIssueLoading}
          knownCommonIssues={knownCommonIssues}
          commonIssueTypeOptions={commonIssueTypeOptions}
          form={form}
        />
      )}

      {showConfirmedPendingFixForm && <ConfirmedPendingFixFormItems />}

      {showFixedPendingRetestInfo && <FixedPendingRetestInfo />}

      {showRetestingForm && (
        <RetestingFormItems
          showRetestDecision={retestingFormShowRetestDecision}
          latestFileKey={retestingFormLatestFileKey}
          focusTaskId={focusTaskId}
          retestDecision={retestDecision}
          versionOptions={versionOptions}
          fileKey={fileKey}
        />
      )}

      {showNonProjectIssueInfo && (
        <NonProjectIssueInfo currentRecord={currentRecord} />
      )}

      {showRetestFailedInfo && (
        <RetestFailedInfo
          currentRecord={currentRecord}
          fileKey={fileKey}
          focusTaskId={focusTaskId}
          versionOptions={versionOptions}
        />
      )}

      {showRetestPassedInfo && (
        <RetestPassedInfo
          currentRecord={currentRecord}
          fileKey={fileKey}
          focusTaskId={focusTaskId}
          versionOptions={versionOptions}
          parentPainRemark={parentPainRemark}
        />
      )}

      {showConfirmedByField && (
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

export const ModalFooter: React.FC<{
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  isReviewingHistoryStep: boolean;
  onCancel: () => void;
  isCurrentNonProjectIssue: boolean;
  currentStatus: number;
  showRetestDecision: boolean;
  rollbackTargets: PainStatus[];
  onRollback: (target: PainStatus) => void;
}> = ({
  showHistory,
  setShowHistory,
  isReviewingHistoryStep,
  onCancel,
  isCurrentNonProjectIssue,
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

  if (isCurrentNonProjectIssue) {
    return (
      <div className="flex items-center justify-end gap-2">
        <Button danger onClick={() => onRollback(PainStatus.TO_BE_CONFIRMED)}>
          回退到待确认
        </Button>
        <Button key="close-non-project" onClick={onCancel}>
          关闭
        </Button>
      </div>
    );
  }

  if (currentStatus === PainStatus.RETESTED_FAILED) {
    return (
      <Button key="close-retest-failed" onClick={onCancel}>
        关闭
      </Button>
    );
  }

  if (
    currentStatus === PainStatus.FIXED_PENDING_RETEST ||
    (currentStatus >= PainStatus.RETESTING && !showRetestDecision)
  ) {
    return (
      <Button key="close" onClick={onCancel}>
        关闭
      </Button>
    );
  }

  return undefined;
};

export const ModalTitle: React.FC = () => (
  <div className="flex items-center justify-between pr-8">
    <span className="text-base font-semibold text-slate-800">痛点管理</span>
  </div>
);

export const RollbackConfirmModal: React.FC<{
  open: boolean;
  rollbackTarget: PainStatus | null;
  rollbackBy: string;
  rollbackReason: string;
  rollbackSubmitting: boolean;
  onChangeRollbackBy: (value: string) => void;
  onChangeRollbackReason: (value: string) => void;
  onCancel: () => void;
  onOk: () => void;
}> = ({
  open,
  rollbackTarget,
  rollbackBy,
  rollbackReason,
  rollbackSubmitting,
  onChangeRollbackBy,
  onChangeRollbackReason,
  onCancel,
  onOk,
}) => (
  <Modal
    open={open}
    onCancel={onCancel}
    onOk={onOk}
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
    destroyOnClose
  >
    <div className="space-y-3">
      <div>
        <div className="mb-1 text-xs font-medium text-slate-600">操作人</div>
        <Input
          value={rollbackBy}
          onChange={(event) => onChangeRollbackBy(event.target.value)}
          placeholder="请输入操作人"
          maxLength={20}
          allowClear
        />
      </div>
      <div className="mb-4">
        <div className="mb-1 text-xs font-medium text-slate-600">回退原因</div>
        <Input.TextArea
          className="mb-4"
          value={rollbackReason}
          onChange={(event) => onChangeRollbackReason(event.target.value)}
          placeholder="请输入回退原因"
          rows={2}
          maxLength={1000}
          showCount
          allowClear
        />
      </div>
    </div>
  </Modal>
);

void ({} as StepSnapshot);
