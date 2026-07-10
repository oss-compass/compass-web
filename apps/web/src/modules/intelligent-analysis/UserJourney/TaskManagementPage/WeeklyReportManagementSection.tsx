import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Input,
  Popconfirm,
  Select,
  Switch,
  Table,
  Tag,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  fetchFormalWeeklyReportRecords,
  fetchWeeklyReportPreviewConfig,
  sendFormalWeeklyReport,
  updateWeeklyReportPreviewConfig,
} from '../rawData/apiClient';
import type { WeeklyReportFormalRecord } from '../rawData/apiClient';

const formatDateTime = (value: unknown) => {
  const text = String(value || '').trim();
  if (!text) return '--';
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return text;
  return parsed.toLocaleString('zh-CN', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const normalizeRecipients = (recipients: string[]) =>
  Array.from(new Set(recipients.map((item) => item.trim()).filter(Boolean)));

const WeeklyReportManagementSection: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [savingPreview, setSavingPreview] = useState(false);
  const [sendingFormal, setSendingFormal] = useState(false);
  const [previewRecipients, setPreviewRecipients] = useState<string[]>([]);
  const [recordPage, setRecordPage] = useState(1);

  const {
    data: previewConfig,
    isLoading: previewConfigLoading,
    refetch: refetchPreviewConfig,
  } = useQuery({
    queryKey: ['weekly-report-preview-config'],
    queryFn: () => fetchWeeklyReportPreviewConfig(),
  });
  const {
    data: formalRecords,
    isLoading: formalRecordsLoading,
    refetch: refetchFormalRecords,
  } = useQuery({
    queryKey: ['weekly-report-formal-records', recordPage],
    queryFn: () =>
      fetchFormalWeeklyReportRecords({ page: recordPage, size: 10 }),
  });

  useEffect(() => {
    if (previewConfig) setPreviewRecipients(previewConfig.preview_recipients);
  }, [previewConfig]);

  const savePreviewConfig = useCallback(
    async (previewEnabled?: boolean) => {
      setSavingPreview(true);
      try {
        const result = await updateWeeklyReportPreviewConfig({
          preview_enabled: previewEnabled,
          preview_recipients: normalizeRecipients(previewRecipients),
        });
        messageApi.success(result.message);
        await refetchPreviewConfig();
      } catch (error) {
        messageApi.error(
          error instanceof Error ? error.message : '更新预览周报配置失败'
        );
      } finally {
        setSavingPreview(false);
      }
    },
    [messageApi, previewRecipients, refetchPreviewConfig]
  );

  const sendFormalReport = useCallback(async () => {
    setSendingFormal(true);
    try {
      const result = await sendFormalWeeklyReport();
      const content =
        result.data.message || result.message || '正式周报发送失败';
      result.data.status === 'sent'
        ? messageApi.success(content)
        : messageApi.error(content);
      await refetchFormalRecords();
    } catch (error) {
      messageApi.error(
        error instanceof Error ? error.message : '发送正式周报失败'
      );
    } finally {
      setSendingFormal(false);
    }
  }, [messageApi, refetchFormalRecords]);

  const columns = useMemo<ColumnsType<WeeklyReportFormalRecord>>(
    () => [
      {
        title: '发送时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 180,
        render: (value) => formatDateTime(value),
      },
      {
        title: '操作人',
        dataIndex: 'requested_by',
        key: 'requested_by',
        width: 160,
        render: (value) => value || '--',
      },
      {
        title: '发送状态',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (value) => (
          <Tag color={value === 'sent' ? 'green' : 'red'}>
            {value === 'sent' ? '发送成功' : '发送失败'}
          </Tag>
        ),
      },
      {
        title: '正式收件人',
        dataIndex: 'recipients',
        key: 'recipients',
        render: (value: string[]) => (value || []).join('、') || '--',
      },
      {
        title: '结果信息',
        dataIndex: 'message',
        key: 'message',
        width: 220,
        render: (value) => value || '--',
      },
    ],
    []
  );
  const previewEnabled = previewConfig?.preview_enabled !== false;
  const nextPreviewText = previewConfig?.next_preview_at
    ? formatDateTime(previewConfig.next_preview_at)
    : previewEnabled
    ? '--'
    : '任务已关闭';
  const lastPreviewText = previewConfig?.last_preview_at
    ? `；最近预览：${formatDateTime(previewConfig.last_preview_at)}（${
        previewConfig.last_preview_status === 'sent' ? '发送成功' : '发送失败'
      }）`
    : '';

  return (
    <div className="flex flex-col gap-5">
      {contextHolder}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-slate-800">每周二预览周报</div>
            <div className="mt-1 text-sm text-slate-500">
              预览周报每周二 14:00
              自动发送，仅使用下方配置的收件人；正式周报仍使用现有脚本的正式
              To/CC 收件人。
            </div>
            <div className="mt-2 text-xs text-slate-500">
              下次触发：{nextPreviewText}
              {lastPreviewText}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-700">
            <span>{previewEnabled ? '已开启' : '已关闭'}</span>
            <Switch
              checked={previewEnabled}
              loading={previewConfigLoading || savingPreview}
              onChange={(checked) => void savePreviewConfig(checked)}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-700">
              预览周报收件人
            </span>
            <span className="text-xs text-slate-400">
              输入邮箱后按回车即可新增
            </span>
          </div>
          <Select
            mode="tags"
            value={previewRecipients}
            className="w-full [&_.ant-select-selection-item]:!rounded-full [&_.ant-select-selection-item]:!border-0 [&_.ant-select-selection-item]:!bg-blue-50 [&_.ant-select-selection-item]:!text-blue-700 [&_.ant-select-selector]:!min-h-[96px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!border-slate-200 [&_.ant-select-selector]:!bg-white [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!py-2 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
            placeholder="输入邮箱后按回车添加，可粘贴多个邮箱"
            tokenSeparators={[',', ';', '，', '；']}
            disabled={previewConfigLoading || savingPreview}
            onChange={(values) =>
              setPreviewRecipients(
                values.map((value) => String(value).trim()).filter(Boolean)
              )
            }
          />
          <div className="mt-3 flex justify-end">
            <Button
              className="rounded-full"
              loading={savingPreview}
              onClick={() => void savePreviewConfig()}
            >
              保存预览配置
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-800">正式周报</div>
          <div className="mt-1 text-sm text-slate-500">
            点击后立即发送周报至各仓库负责人和抄送人，并记录发送结果。
          </div>
        </div>
        <Popconfirm
          title="确认发送正式周报？"
          description="将立即发送周报至各仓库负责人和抄送人。"
          okText="确认发送"
          cancelText="取消"
          onConfirm={() => sendFormalReport()}
        >
          <Button
            type="primary"
            className="rounded-full"
            loading={sendingFormal}
          >
            发送正式周报
          </Button>
        </Popconfirm>
      </div>

      <Table<WeeklyReportFormalRecord>
        className="overview-ant-table"
        rowKey={(record) => record.send_id || record.created_at}
        loading={formalRecordsLoading}
        columns={columns}
        dataSource={formalRecords?.items || []}
        scroll={{ x: 1000 }}
        pagination={{
          current: recordPage,
          pageSize: 10,
          total: formalRecords?.total || 0,
          onChange: setRecordPage,
        }}
        locale={{ emptyText: '暂无正式周报发送记录' }}
      />
    </div>
  );
};

export default WeeklyReportManagementSection;
