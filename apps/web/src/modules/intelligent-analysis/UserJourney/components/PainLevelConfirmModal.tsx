import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Form,
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
  type UpsertPainConfirmationPayload,
} from '../rawData/apiClient';
import { usePainHistory } from '../hooks/usePainConfirmations';

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

type FormValues = {
  status: PainStatus;
  severity: PainLevel;
  is_common: boolean;
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
  /** 可选：版本选项（file_key → label），用于复测通过时选择通过报告 */
  versionOptions?: Array<{ value: string; label: string }>;
  onCancel: () => void;
  onSubmit: (payload: UpsertPainConfirmationPayload) => Promise<void>;
};

const CONFIRMED_BY_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9 \-_]{1,20}$/;

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
}> = ({ currentRecord }) => (
  <div className="space-y-3 rounded-md bg-emerald-50 p-4">
    <div className="flex items-center gap-2">
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
      <Text type="success" strong>
        复测已通过
      </Text>
    </div>
    <div className="space-y-1.5 text-sm text-slate-600">
      {currentRecord?.pr_link && (
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-slate-400">PR 链接：</span>
          <Link
            href={currentRecord.pr_link}
            target="_blank"
            className="text-blue-600 hover:text-blue-800"
          >
            {currentRecord.pr_link}
          </Link>
        </div>
      )}
      {(currentRecord?.retest_passed_file_key ||
        currentRecord?.latest_file_key) && (
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-slate-400">通过报告：</span>
          <Link
            href={`/intelligent-analysis/community-experience?project=${encodeURIComponent(
              currentRecord.retest_passed_file_key ||
                currentRecord.latest_file_key ||
                ''
            )}`}
            className="text-blue-600 hover:text-blue-800"
          >
            {currentRecord.retest_passed_file_key ||
              currentRecord.latest_file_key}
          </Link>
        </div>
      )}
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
          return `等级: ${getPainLevelLabel(record.severity)}`;
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
                    {item.value === 'P4_TRIVIAL'
                      ? '非项目本身问题'
                      : item.label}
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
          <div className="text-xs text-slate-500">
            最新报告标识：{latestFileKey}
          </div>
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
              <Radio value="passed">通过（通知负责人邮箱）</Radio>
              <Radio value="failed">
                不通过（通知负责人邮箱，状态变为复测不通过）
              </Radio>
              <Radio value="not_detected">未检测到（通知管理员团队邮箱）</Radio>
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

const PainLevelConfirmModal: React.FC<Props> = ({
  open,
  fileKey,
  stepId,
  painIndex,
  painText,
  currentRecord,
  versionOptions,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // 计算当前状态：如果没有记录，默认是 1 (待确认)
  const currentStatus = currentRecord?.status || PainStatus.TO_BE_CONFIRMED;
  const latestFileKey = String(currentRecord?.latest_file_key || '').trim();
  const showRetestDecision =
    currentStatus === PainStatus.RETESTING && !!latestFileKey;

  const { data: commonIssueResp, isFetching: commonIssueLoading } = useQuery({
    queryKey: ['overviewKnownCommonIssuesForConfirmModal'],
    queryFn: () => fetchOverviewCommonIssues({}),
    enabled: open && currentStatus === PainStatus.TO_BE_CONFIRMED,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const knownCommonIssues = useMemo(
    () =>
      (commonIssueResp?.items ?? []).map((item) => ({
        issueType: String(item.issueType || '').trim(),
        description: String(item.description || '').trim(),
      })),
    [commonIssueResp?.items]
  );

  const commonIssueTypeOptions = useMemo(() => {
    return Array.from(
      new Set(
        knownCommonIssues.map((item) => item.issueType).filter((item) => !!item)
      )
    );
  }, [knownCommonIssues]);
  // 计算下一步状态
  // 如果当前是 1 (待确认)，下一步是 2 (已确认待修复)
  // 如果当前已经是 5 (已复测通过)，则保持在 5
  // 如果当前是 7 (复测不通过)，下一步是 3 (已修复待复测)
  const nextStatus = useMemo(() => {
    if (currentStatus === PainStatus.RETESTED_FAILED)
      return PainStatus.FIXED_PENDING_RETEST;
    return Math.min(currentStatus + 1, 5) as PainStatus;
  }, [currentStatus]);

  const { data: historyData, isLoading: historyLoading } = usePainHistory(
    open && showHistory ? fileKey : undefined,
    stepId,
    painIndex
  );

  // 打开弹窗时重置/填充表单
  useEffect(() => {
    if (open) {
      setShowHistory(false);
      // 默认设置为当前的状态
      const currentCommonIssueType = currentRecord?.common_issue_type || '';
      const safeCommonIssueType = commonIssueTypeOptions.includes(
        currentCommonIssueType
      )
        ? currentCommonIssueType
        : undefined;
      const currentIsCommon =
        currentRecord?.is_common_issue === true ||
        !!String(currentRecord?.common_issue_type || '').trim();

      form.setFieldsValue({
        status: currentStatus,
        severity: (currentRecord?.severity as PainLevel) || 'P1_CRITICAL',
        is_common:
          currentStatus === PainStatus.TO_BE_CONFIRMED && !currentRecord
            ? undefined
            : currentIsCommon,
        common_issue_type: safeCommonIssueType,
        confirmed_by: currentRecord?.confirmed_by || '',
        issue_link: currentRecord?.issue_link || '',
        pr_link: currentRecord?.pr_link || '',
        retest_decision: undefined,
        retest_passed_file_key: latestFileKey || undefined,
      });
    }
  }, [
    open,
    currentRecord,
    currentStatus,
    form,
    commonIssueTypeOptions,
    latestFileKey,
  ]);

  const isCommon = Form.useWatch('is_common', form);
  const retestDecision = Form.useWatch('retest_decision', form);

  useEffect(() => {
    if (isCommon !== true) {
      form.setFieldsValue({ common_issue_type: undefined });
    }
  }, [isCommon, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const basePayload: UpsertPainConfirmationPayload = {
        step_id: stepId,
        pain_index: painIndex,
        pain_text: painText,
        status: values.status,
        confirmed_by: values.confirmed_by || null,
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

  const stepsItems = useMemo(() => {
    return [1, 2, 3, 4, 5].map((s) => ({
      title: STATUS_LABELS[s],
      description:
        s === currentStatus ||
        (s === 3 && currentStatus === PainStatus.RETESTED_FAILED)
          ? '当前状态'
          : '',
    }));
  }, [currentStatus]);

  return (
    <Modal
      title={
        <div className="flex items-center justify-between pr-8">
          <span className="text-base font-semibold text-slate-800">
            痛点管理
          </span>
          {/* <Button
            type="link"
            size="small"
            icon={<HistoryOutlined />}
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? '收起历史' : '查看历史'}
          </Button> */}
        </div>
      }
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
        showHistory ? (
          <Button key="back" onClick={() => setShowHistory(false)}>
            返回
          </Button>
        ) : currentStatus >= PainStatus.RETESTING && !showRetestDecision ? (
          <Button key="close" onClick={onCancel}>
            关闭
          </Button>
        ) : undefined
      }
    >
      <div className="space-y-6">
        {/* 流程进度 */}
        <div className="rounded-lg bg-slate-50 p-4">
          <Steps
            current={
              currentStatus === PainStatus.RETESTED_FAILED
                ? 2
                : currentStatus - 1
            }
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

            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              initialValues={{ status: currentStatus }}
            >
              <Form.Item name="status" hidden>
                <Input type="hidden" />
              </Form.Item>

              {currentStatus === PainStatus.TO_BE_CONFIRMED && (
                <ToBeConfirmedFormItems
                  isCommon={isCommon}
                  commonIssueLoading={commonIssueLoading}
                  knownCommonIssues={knownCommonIssues}
                  commonIssueTypeOptions={commonIssueTypeOptions}
                  form={form}
                />
              )}

              {currentStatus === PainStatus.CONFIRMED_PENDING_FIX && (
                <Form.Item
                  name="issue_link"
                  label={
                    <span className="text-sm font-medium text-slate-700">
                      ISSUE 链接
                    </span>
                  }
                  rules={[
                    { required: true, message: '请输入 ISSUE 链接' },
                    { type: 'url', message: '请输入有效的 URL' },
                  ]}
                >
                  <Input
                    placeholder="https://gitcode.com/.../issues/1"
                    allowClear
                  />
                </Form.Item>
              )}

              {(currentStatus === PainStatus.FIXED_PENDING_RETEST ||
                currentStatus === PainStatus.RETESTED_FAILED) && (
                <>
                  {currentStatus === PainStatus.RETESTED_FAILED && (
                    <div className="mb-4 rounded-md bg-rose-50 p-3">
                      <Text type="danger" strong className="text-xs">
                        上轮复测不通过，请重新提交 PR
                      </Text>
                    </div>
                  )}
                  <Form.Item
                    name="pr_link"
                    label={
                      <span className="text-sm font-medium text-slate-700">
                        PR 链接
                      </span>
                    }
                    rules={[
                      { required: true, message: '请输入 PR 链接' },
                      { type: 'url', message: '请输入有效的 URL' },
                    ]}
                  >
                    <Input
                      placeholder="https://gitcode.com/.../pull/1"
                      allowClear
                    />
                  </Form.Item>
                </>
              )}

              {currentStatus === PainStatus.RETESTING && (
                <RetestingFormItems
                  showRetestDecision={showRetestDecision}
                  latestFileKey={latestFileKey}
                  retestDecision={retestDecision}
                  versionOptions={versionOptions}
                  fileKey={fileKey}
                />
              )}

              {currentStatus === PainStatus.RETESTED_PASSED && (
                <RetestPassedInfo currentRecord={currentRecord} />
              )}

              {(currentStatus <= PainStatus.FIXED_PENDING_RETEST ||
                currentStatus === PainStatus.RETESTED_FAILED) && (
                <Form.Item
                  name="confirmed_by"
                  label={
                    <span className="text-sm font-medium text-slate-700">
                      操作人
                    </span>
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
          </>
        )}
      </div>
    </Modal>
  );
};

export default PainLevelConfirmModal;
