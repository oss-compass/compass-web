import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Popconfirm, Switch, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  fetchFormalWeeklyReportRecords,
  fetchWeeklyReportPreviewConfig,
  sendFormalWeeklyReport,
  updateWeeklyReportPreviewConfig,
} from '../rawData/apiClient';
import type {
  CompassOperatorUser,
  WeeklyReportFormalRecord,
} from '../rawData/apiClient';

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

const parseRecipients = (text: string): string[] => {
  const seen = new Set<string>();
  return text.split(/[\s,;，；]+/).filter((email) => {
    const key = email.toLowerCase();
    if (!email || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const getRecipientText = (saved?: string[] | null, fallback?: string[]) =>
  (saved ?? fallback ?? []).join('\n');

const hasInvalidRecipients = (recipients: string[]) =>
  recipients.some(
    (email) => !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(email)
  );

const RecipientInput: React.FC<{
  id: string;
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}> = ({ id, label, value, disabled, onChange }) => (
  <div>
    <div className="mb-2 flex items-center justify-between gap-3">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <span className="text-xs text-slate-400">
        {parseRecipients(value).length} 个邮箱
      </span>
    </div>
    <Input.TextArea
      id={id}
      value={value}
      autoSize={{ minRows: 3, maxRows: 8 }}
      className="!rounded-2xl !border-slate-200 !bg-white !px-3 !py-2 !shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
      placeholder="每行一个邮箱，也可用逗号、分号分隔，输入后直接保存"
      disabled={disabled}
      spellCheck={false}
      autoCapitalize="none"
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

const WeeklyReportManagementContent: React.FC<{
  userKey: string;
  reportType?: 'community' | 'issue';
}> = ({ userKey, reportType = 'community' }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [savingPreview, setSavingPreview] = useState(false);
  const [savingFormalAuto, setSavingFormalAuto] = useState(false);
  const [savingFormalRecipients, setSavingFormalRecipients] = useState(false);
  const [formalRecipientsDraft, setFormalRecipients] = useState<string | null>(
    null
  );
  const [formalCcRecipientsDraft, setFormalCcRecipients] = useState<
    string | null
  >(null);
  const [sendingFormal, setSendingFormal] = useState(false);
  const [previewRecipientsDraft, setPreviewRecipients] = useState<
    string | null
  >(null);
  const [recordPage, setRecordPage] = useState(1);

  const {
    data: previewConfig,
    isLoading: previewConfigLoading,
    refetch: refetchPreviewConfig,
  } = useQuery({
    queryKey: ['weekly-report-preview-config', reportType, userKey],
    queryFn: () => fetchWeeklyReportPreviewConfig(undefined, reportType),
  });
  const {
    data: formalRecords,
    isLoading: formalRecordsLoading,
    refetch: refetchFormalRecords,
  } = useQuery({
    queryKey: ['weekly-report-formal-records', reportType, userKey, recordPage],
    queryFn: () =>
      fetchFormalWeeklyReportRecords(
        { page: recordPage, size: 10 },
        undefined,
        reportType
      ),
  });

  const savedPreviewRecipients = getRecipientText(
    previewConfig?.preview_recipients
  );
  const savedFormalRecipients = getRecipientText(
    previewConfig?.formal_recipients,
    previewConfig?.effective_formal_recipients
  );
  const savedFormalCcRecipients = getRecipientText(
    previewConfig?.formal_cc_recipients,
    previewConfig?.effective_formal_cc_recipients
  );
  const previewRecipients = previewRecipientsDraft ?? savedPreviewRecipients;
  const formalRecipients = formalRecipientsDraft ?? savedFormalRecipients;
  const formalCcRecipients = formalCcRecipientsDraft ?? savedFormalCcRecipients;
  const previewDirty = previewRecipients !== savedPreviewRecipients;
  const formalDirty =
    formalRecipients !== savedFormalRecipients ||
    formalCcRecipients !== savedFormalCcRecipients;

  const savePreviewConfig = useCallback(
    async (previewEnabled?: boolean) => {
      const recipients = parseRecipients(previewRecipients);
      if (previewEnabled === undefined && hasInvalidRecipients(recipients)) {
        messageApi.error('请输入正确的预览收件邮箱地址');
        return;
      }
      setSavingPreview(true);
      try {
        const result = await updateWeeklyReportPreviewConfig(
          {
            ...(previewEnabled === undefined
              ? { preview_recipients: recipients }
              : { preview_enabled: previewEnabled }),
          },
          undefined,
          reportType
        );
        messageApi.success(result.message);
        await refetchPreviewConfig();
        if (previewEnabled === undefined) setPreviewRecipients(null);
      } catch (error) {
        messageApi.error(
          error instanceof Error ? error.message : '更新预览周报配置失败'
        );
      } finally {
        setSavingPreview(false);
      }
    },
    [messageApi, previewRecipients, refetchPreviewConfig, reportType]
  );

  const saveFormalRecipients = useCallback(async () => {
    const to = parseRecipients(formalRecipients);
    const cc = parseRecipients(formalCcRecipients);
    if (!to.length) {
      messageApi.error('正式周报收件人不能为空');
      return;
    }
    if (hasInvalidRecipients([...to, ...cc])) {
      messageApi.error('请输入正确的邮箱地址');
      return;
    }
    setSavingFormalRecipients(true);
    try {
      const result = await updateWeeklyReportPreviewConfig(
        { formal_recipients: to, formal_cc_recipients: cc },
        undefined,
        reportType
      );
      messageApi.success(result.message);
      await refetchPreviewConfig();
      setFormalRecipients(null);
      setFormalCcRecipients(null);
    } catch (error) {
      messageApi.error(
        error instanceof Error ? error.message : '保存正式周报收件配置失败'
      );
    } finally {
      setSavingFormalRecipients(false);
    }
  }, [
    formalRecipients,
    formalCcRecipients,
    messageApi,
    refetchPreviewConfig,
    reportType,
  ]);

  const sendFormalReport = useCallback(async () => {
    setSendingFormal(true);
    try {
      const result = await sendFormalWeeklyReport(undefined, reportType);
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
  }, [messageApi, refetchFormalRecords, reportType]);

  const saveFormalAutoConfig = useCallback(
    async (formalAutoEnabled: boolean) => {
      setSavingFormalAuto(true);
      try {
        const result = await updateWeeklyReportPreviewConfig(
          {
            formal_auto_enabled: formalAutoEnabled,
          },
          undefined,
          reportType
        );
        messageApi.success(result.message);
        await refetchPreviewConfig();
      } catch (error) {
        messageApi.error(
          error instanceof Error ? error.message : '更新正式周报定时配置失败'
        );
      } finally {
        setSavingFormalAuto(false);
      }
    },
    [messageApi, refetchPreviewConfig, reportType]
  );

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
        title: '正式抄送人',
        dataIndex: 'cc_recipients',
        key: 'cc_recipients',
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
  const formalAutoEnabled = previewConfig?.formal_auto_enabled === true;
  const nextFormalText = previewConfig?.next_formal_at
    ? formatDateTime(previewConfig.next_formal_at)
    : formalAutoEnabled
    ? '--'
    : '任务已关闭';
  const lastFormalText = previewConfig?.last_formal_at
    ? `；最近自动发送：${formatDateTime(previewConfig.last_formal_at)}（${
        previewConfig.last_formal_status === 'sent' ? '发送成功' : '发送失败'
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
              预览周报每周二 15:00 自动发送，使用下方配置的预览收件人。
            </div>
            <div className="mt-2 text-xs text-slate-500">
              下次触发：{nextPreviewText}
              {lastPreviewText}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-700">
            <span>{previewEnabled ? '已开启' : '已关闭'}</span>
            <Switch
              aria-label="预览周报自动发送"
              checked={previewEnabled}
              loading={previewConfigLoading || savingPreview}
              onChange={(checked) => void savePreviewConfig(checked)}
            />
          </div>
        </div>
        <div className="mt-4">
          <RecipientInput
            id="preview-weekly-recipients"
            label="预览周报收件人"
            value={previewRecipients}
            disabled={previewConfigLoading || !previewConfig || savingPreview}
            onChange={setPreviewRecipients}
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {previewDirty ? '有未保存修改' : '输入完成后点击保存即可生效'}
            </span>
            <Button
              className="rounded-full"
              loading={savingPreview}
              disabled={previewConfigLoading || !previewConfig}
              onClick={() => void savePreviewConfig()}
            >
              保存预览配置
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-slate-800">每周二正式周报</div>
            <div className="mt-1 text-sm text-slate-500">
              开启后，正式周报将在预览周报发送两小时后的每周二 17:00
              自动发送。手动和定时发送均使用已保存的正式收件配置。
            </div>
            <div className="mt-2 text-xs text-slate-500">
              下次触发：{nextFormalText}
              {lastFormalText}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-700">
            <span>{formalAutoEnabled ? '已开启' : '已关闭'}</span>
            <Switch
              aria-label="正式周报自动发送"
              checked={formalAutoEnabled}
              loading={previewConfigLoading || savingFormalAuto}
              onChange={(checked) => void saveFormalAutoConfig(checked)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {previewConfig?.formal_recipients == null && (
            <div className="text-sm text-slate-500">
              已回填系统当前正式名单，保存后将使用下方配置。
            </div>
          )}
          <RecipientInput
            id="formal-weekly-recipients"
            label="正式周报收件人"
            value={formalRecipients}
            disabled={
              previewConfigLoading || !previewConfig || savingFormalRecipients
            }
            onChange={setFormalRecipients}
          />
          <RecipientInput
            id="formal-weekly-cc"
            label="正式周报抄送人（可留空）"
            value={formalCcRecipients}
            disabled={
              previewConfigLoading || !previewConfig || savingFormalRecipients
            }
            onChange={setFormalCcRecipients}
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {formalDirty ? '有未保存修改' : '输入完成后点击保存即可生效'}
            </span>
            <Button
              className="rounded-full"
              loading={savingFormalRecipients}
              disabled={previewConfigLoading || !previewConfig}
              onClick={() => void saveFormalRecipients()}
            >
              保存正式收件配置
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100 pt-4">
          <span className="text-sm text-slate-500">
            如需提前或补发，仍可手动立即发送并记录结果。
          </span>
          <Popconfirm
            title="确认发送正式周报？"
            description="将按照已保存的正式收件配置立即发送周报。"
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

const WeeklyReportManagementSection: React.FC<{
  user: Pick<CompassOperatorUser, 'username' | 'role'> | null;
  reportType?: 'community' | 'issue';
}> = ({ user, reportType = 'community' }) => {
  if (user?.role !== 'admin') return null;
  return (
    <WeeklyReportManagementContent
      key={`${reportType}:${user.username}`}
      userKey={user.username}
      reportType={reportType}
    />
  );
};

export default WeeklyReportManagementSection;
