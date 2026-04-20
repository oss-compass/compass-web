import React, { useEffect, useState, useMemo } from 'react';
import {
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Steps,
  Button,
  Table,
  Empty,
  Tag,
  Typography,
} from 'antd';
import { toast } from 'react-hot-toast';
import { USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO } from '../rawData/constants';
import type { PainLevel } from '../types';
import type {
  PainConfirmationRecord,
  UpsertPainConfirmationPayload,
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
}

export const STATUS_LABELS: Record<number, string> = {
  [PainStatus.TO_BE_CONFIRMED]: '待确认',
  [PainStatus.CONFIRMED_PENDING_FIX]: '已确认待修复',
  [PainStatus.FIXED_PENDING_RETEST]: '已修复待复测',
  [PainStatus.RETESTING]: '复测中',
  [PainStatus.RETESTED_PASSED]: '已复测通过',
};

const SEVERITY_OPTIONS = USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO.map((item) => ({
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
  confirmed_by: string;
  issue_link?: string;
  pr_link?: string;
};

type Props = {
  open: boolean;
  fileKey: string;
  stepId: string;
  painIndex: number;
  painText: string;
  /** 当前痛点状态 */
  currentRecord?: PainConfirmationRecord | null;
  onCancel: () => void;
  onSubmit: (payload: UpsertPainConfirmationPayload) => Promise<void>;
};

const CONFIRMED_BY_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9 \-_]{1,20}$/;

const PainLevelConfirmModal: React.FC<Props> = ({
  open,
  fileKey,
  stepId,
  painIndex,
  painText,
  currentRecord,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // 计算当前状态：如果没有记录，默认是 1 (待确认)
  const currentStatus = currentRecord?.status || PainStatus.TO_BE_CONFIRMED;
  // 计算下一步状态
  // 如果当前是 1 (待确认)，下一步是 2 (已确认待修复)
  // 如果当前已经是 5 (已复测通过)，则保持在 5
  const nextStatus = Math.min(currentStatus + 1, 5) as PainStatus;

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
      form.setFieldsValue({
        status: currentStatus,
        severity: (currentRecord?.severity as PainLevel) || 'P1_CRITICAL',
        confirmed_by: currentRecord?.confirmed_by || '',
        issue_link: currentRecord?.issue_link || '',
        pr_link: currentRecord?.pr_link || '',
      });
    }
  }, [open, currentRecord, currentStatus, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      // 根据 currentStatus 提交不同的负载
      const payload: UpsertPainConfirmationPayload = {
        step_id: stepId,
        pain_index: painIndex,
        pain_text: painText,
        status: values.status,
        confirmed_by: values.confirmed_by || null,
      };

      // 如果当前在 待确认(1) 阶段，点击提交后目标状态是 已确认待修复(2)，此时需要提交严重程度
      if (currentStatus === PainStatus.TO_BE_CONFIRMED) {
        payload.severity = values.severity;
      }
      // 如果当前在 已确认待修复(2) 阶段，点击提交后目标状态是 已修复待复测(3)，此时需要提交 issue_link
      else if (currentStatus === PainStatus.CONFIRMED_PENDING_FIX) {
        payload.issue_link = values.issue_link;
      }
      // 如果当前在 已修复待复测(3) 阶段，点击提交后目标状态是 复测中(4)，此时需要提交 pr_link
      else if (currentStatus === PainStatus.FIXED_PENDING_RETEST) {
        payload.pr_link = values.pr_link;
      }

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
      description: s === currentStatus ? '当前状态' : '',
    }));
  }, [currentStatus]);

  const historyColumns = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (s: number) => <Tag color="blue">{STATUS_LABELS[s]}</Tag>,
    },
    {
      title: '详情',
      key: 'details',
      render: (_: any, record: any) => {
        if (record.status === 1)
          return `等级: ${getPainLevelLabel(record.severity)}`;
        if (record.status === 2) return `Issue: ${record.issue_link}`;
        if (record.status === 3) return `PR: ${record.pr_link}`;
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
      okText={nextStatus === currentStatus ? '更新当前状态' : `提交`}
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
        ) : currentStatus >= PainStatus.RETESTING ? (
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
            current={currentStatus - 1}
            items={stepsItems}
            size="small"
            className="pain-steps"
          />
        </div>

        {showHistory ? (
          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-700">历史记录</div>
            <Table
              dataSource={historyData?.history || []}
              columns={historyColumns}
              pagination={false}
              size="small"
              loading={historyLoading}
              rowKey="confirmed_at"
              locale={{ emptyText: <Empty description="暂无历史记录" /> }}
            />
          </div>
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
                <Form.Item
                  name="severity"
                  label={
                    <span className="text-sm font-medium text-slate-700">
                      确认严重程度
                    </span>
                  }
                  rules={[{ required: true, message: '请选择严重程度' }]}
                >
                  <Radio.Group className="w-full">
                    <Space direction="vertical" className="w-full">
                      {SEVERITY_OPTIONS.map((item) => {
                        const style = getPainLevelStyle(item.value);
                        return (
                          <Radio
                            key={item.value}
                            value={item.value}
                            className="w-full"
                          >
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
                                {item.value === 'P4_TRIVIAL'
                                  ? ''
                                  : item.description}
                              </span>
                            </span>
                          </Radio>
                        );
                      })}
                    </Space>
                  </Radio.Group>
                </Form.Item>
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

              {currentStatus === PainStatus.FIXED_PENDING_RETEST && (
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
              )}

              {currentStatus === PainStatus.RETESTING && (
                <div className="rounded-md bg-amber-50 p-4 text-center">
                  <Text type="warning" strong>
                    请联系相关接口人启动复测
                  </Text>
                  <div className="mt-2 text-xs text-slate-500">
                    复测启动后，系统将自动跟踪后续进展
                  </div>
                </div>
              )}

              {currentStatus === PainStatus.RETESTED_PASSED && (
                <div className="rounded-md bg-emerald-50 p-4 text-center">
                  <Text type="success" strong>
                    复测已通过
                  </Text>
                  {currentRecord?.issue_link && (
                    <div className="mt-2 text-xs text-slate-500">
                      最新报告已生成，点击查看：
                      <Link href={currentRecord.issue_link} target="_blank">
                        查看最新报告
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {currentStatus <= PainStatus.FIXED_PENDING_RETEST && (
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
