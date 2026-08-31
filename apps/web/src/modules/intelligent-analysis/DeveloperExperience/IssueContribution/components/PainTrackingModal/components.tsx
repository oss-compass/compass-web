import React, { useState } from 'react';
import {
  CheckCircleFilled,
  HistoryOutlined,
  LinkOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Input, Modal, Popover, Progress, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type {
  IssuePainTracking,
  IssuePainTrackingActionType,
  IssuePainTrackingHistory,
  IssuePainTrackingIssue,
} from '../../types';
import { IssuePainTrackingStatus } from '../../types';
import {
  ACTION_LABELS,
  getTrackingStatusMeta,
  TRACKING_STATUS_SHORT_LABELS,
} from './constants';
import { useTrackingOperator } from './hooks';
import type { PainTrackingAction } from './types';
import { formatTrackingTime, validateOperator } from './utils';

export const TrackingStatusBadge: React.FC<{
  tracking: IssuePainTracking;
  onClick?: () => void;
}> = ({ tracking, onClick }) => {
  const meta = getTrackingStatusMeta(
    tracking.status,
    tracking.trackingType,
    tracking.statusLabel
  );
  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) onClick();
      }}
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
        meta.className
      } ${onClick ? 'cursor-pointer transition-opacity hover:opacity-80' : ''}`}
    >
      {meta.label}
      {meta.automatic ? (
        <span className="rounded bg-white/70 px-1 text-[9px]">系统</span>
      ) : null}
    </span>
  );
};

/**
 * 痛点卡片的显式操作入口。待确认态沿用社区入门的琥珀色虚线按钮与动态提示点，
 * 其余状态也保留“处理/查看”动词，避免用户把状态徽章误认为纯展示标签。
 */
export const TrackingActionButton: React.FC<{
  tracking: IssuePainTracking;
  onClick: () => void;
}> = ({ tracking, onClick }) => {
  const pending = tracking.status === IssuePainTrackingStatus.PENDING;
  const meta = getTrackingStatusMeta(
    tracking.status,
    tracking.trackingType,
    tracking.statusLabel
  );
  const actionLabel =
    tracking.status === IssuePainTrackingStatus.TRACKING &&
    tracking.trackingType === 'fix'
      ? null
      : '查看详情';

  return (
    <button
      type="button"
      onClick={onClick}
      title={pending ? '点击确认该痛点' : '查看痛点跟踪详情'}
      className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all hover:shadow-sm ${
        pending
          ? 'border-dashed border-amber-400 bg-amber-50 text-amber-700 hover:border-amber-500 hover:bg-amber-100'
          : `${meta.className} hover:brightness-95`
      }`}
    >
      {pending ? (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
        </span>
      ) : null}
      <span>{meta.label}</span>
      {!pending && actionLabel ? (
        <span className="opacity-70">· {actionLabel}</span>
      ) : null}
    </button>
  );
};

export const TrackingProgress: React.FC<{ tracking: IssuePainTracking }> = ({
  tracking,
}) => {
  if (
    tracking.trackingType !== 'fix' ||
    tracking.status !== IssuePainTrackingStatus.TRACKING ||
    !tracking.activeTotal
  )
    return null;
  const percent = Math.round(
    (tracking.fixedCount / tracking.activeTotal) * 100
  );
  return (
    <div className="w-full min-w-[220px] max-w-[320px]">
      <div className="mb-1 flex items-center justify-between gap-3 text-[11px] font-medium text-slate-500">
        <span>Issue 修复进度</span>
        <span className="whitespace-nowrap tabular-nums">
          已修复 {tracking.fixedCount}/{tracking.activeTotal}
        </span>
      </div>
      <Progress
        percent={percent}
        size="small"
        showInfo={false}
        strokeColor={percent === 100 ? '#8b5cf6' : '#0ea5e9'}
        trailColor="#e2e8f0"
        className="!mb-0 block w-full"
      />
    </div>
  );
};

export const IssueFixButton: React.FC<{
  tracking: IssuePainTracking;
  issue: IssuePainTrackingIssue;
  onAction: (payload: PainTrackingAction) => Promise<IssuePainTracking>;
  compact?: boolean;
  /** 外部共享的提交人（如表格右上角输入框）。传入后按钮不再弹操作人 Popover，仅校验该值。 */
  operator?: string;
  /** 受控模式下提交人校验失败时的回调，由外部展示提示。 */
  onOperatorInvalid?: (message: string) => void;
}> = ({
  tracking,
  issue,
  onAction,
  compact,
  operator: sharedOperator,
  onOperatorInvalid,
}) => {
  const { operator, setOperator, rememberOperator } = useTrackingOperator();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const shared = typeof sharedOperator === 'string';
  const actionType: IssuePainTrackingActionType = issue.fixed
    ? 'undo_issue_fixed'
    : 'mark_issue_fixed';
  const canChange =
    tracking.trackingType === 'fix' &&
    (tracking.status === IssuePainTrackingStatus.TRACKING ||
      (tracking.status === IssuePainTrackingStatus.FIXED_PENDING_RETEST &&
        issue.fixed));

  const performAction = async () => {
    setSubmitting(true);
    setError('');
    try {
      const normalized = rememberOperator(
        shared ? sharedOperator ?? '' : operator
      );
      await onAction({
        trackingKey: tracking.trackingKey,
        type: actionType,
        operator: normalized,
        issueNumber: issue.number,
      });
      setOpen(false);
      setConfirmOpen(false);
    } catch {
      // 页面级 action handler 已展示错误信息；这里保持弹窗打开便于重试。
    } finally {
      setSubmitting(false);
    }
  };

  const submit = async () => {
    if (shared) {
      const sharedValidation = validateOperator(sharedOperator ?? '');
      if (sharedValidation) {
        onOperatorInvalid?.(sharedValidation);
        return;
      }
      if (actionType === 'undo_issue_fixed') {
        setConfirmOpen(true);
        return;
      }
      await performAction();
      return;
    }
    const validation = validateOperator(operator);
    if (validation) {
      setError(validation);
      setOpen(true);
      return;
    }
    if (actionType === 'undo_issue_fixed') {
      setOpen(false);
      setConfirmOpen(true);
      return;
    }
    await performAction();
  };

  const trigger = issue.fixed ? (
    <button
      type="button"
      disabled={!canChange || submitting}
      onClick={() => (shared ? void submit() : setOpen(true))}
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
        canChange
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100'
          : 'cursor-default border-emerald-100 bg-emerald-50/60 text-emerald-600'
      }`}
    >
      <CheckCircleFilled />
      {compact
        ? canChange
          ? '已修复 · 可撤销'
          : '已修复'
        : `${issue.fixed_by || '已修复'} ${formatTrackingTime(issue.fixed_at)}`}
      {canChange ? <UndoOutlined className="ml-0.5 text-slate-400" /> : null}
    </button>
  ) : canChange ? (
    <button
      type="button"
      disabled={submitting}
      onClick={() => (shared ? void submit() : setOpen(true))}
      className="inline-flex shrink-0 items-center whitespace-nowrap rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-[11px] font-semibold text-sky-700 transition-colors hover:border-sky-300 hover:bg-sky-100 disabled:cursor-wait disabled:opacity-60"
    >
      {submitting ? '提交中…' : '完成修复'}
    </button>
  ) : null;

  const undoConfirmModal = (
    <Modal
      open={confirmOpen}
      title="确认撤销修复标记？"
      width={420}
      centered
      okText="确认撤销"
      cancelText="取消"
      okButtonProps={{ danger: true }}
      confirmLoading={submitting}
      onOk={() => {
        // 确认时二次校验：受控模式下共享输入框可能在弹窗打开期间被清空。
        const value = shared ? sharedOperator ?? '' : operator;
        const validation = validateOperator(value);
        if (validation) {
          setConfirmOpen(false);
          onOperatorInvalid?.(validation);
          return;
        }
        void performAction();
      }}
      onCancel={() => setConfirmOpen(false)}
    >
      <div className="text-sm leading-6 text-slate-600">
        撤销后，该 Issue
        将恢复为待修复状态；若痛点正在等待复测，也会重新进入修复流程。
      </div>
    </Modal>
  );

  if (!canChange || shared)
    return (
      <>
        {trigger}
        {undoConfirmModal}
      </>
    );
  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger="click"
        placement="topRight"
        content={
          <div className="w-56 space-y-2">
            <div className="text-xs font-semibold text-slate-700">
              填写操作人
            </div>
            <Input
              size="small"
              value={operator}
              maxLength={20}
              placeholder="姓名，后续自动记住"
              onChange={(event) => setOperator(event.target.value)}
              onPressEnter={() => void submit()}
            />
            {error ? (
              <div className="text-[11px] text-rose-500">{error}</div>
            ) : null}
            <Button
              size="small"
              type="primary"
              block
              loading={submitting}
              onClick={() => void submit()}
            >
              确认操作
            </Button>
          </div>
        }
      >
        {trigger}
      </Popover>
      {undoConfirmModal}
    </>
  );
};

export const ActiveIssueTable: React.FC<{
  tracking: IssuePainTracking;
  onAction: (payload: PainTrackingAction) => Promise<IssuePainTracking>;
}> = ({ tracking, onAction }) => {
  const columns: ColumnsType<IssuePainTrackingIssue> = [
    {
      title: 'Issue',
      dataIndex: 'number',
      width: 110,
      render: (_value, issue) =>
        issue.synthetic ? (
          <span className="font-medium text-slate-600">痛点整体</span>
        ) : issue.url ? (
          <a
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline"
          >
            <LinkOutlined /> #{issue.number}
          </a>
        ) : (
          `#${issue.number}`
        ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      render: (value: string) => (
        <Tooltip title={value} placement="topLeft">
          <span>{value}</span>
        </Tooltip>
      ),
    },
    {
      title: '修复状态',
      width: 190,
      render: (_value, issue) => (
        <IssueFixButton tracking={tracking} issue={issue} onAction={onAction} />
      ),
    },
  ];
  return (
    <Table
      size="small"
      rowKey="number"
      columns={columns}
      dataSource={tracking.activeIssues}
      pagination={false}
      scroll={{ x: 640 }}
    />
  );
};

export const ArchivedIssueList: React.FC<{
  issues: IssuePainTrackingIssue[];
}> = ({ issues }) => {
  if (!issues.length) return null;
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
      <div className="text-xs font-semibold text-slate-500">
        历史 Issue（不计入当前进度）
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {issues.map((issue) => (
          <span
            key={`${issue.number}-${issue.last_seen_period}`}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-400"
          >
            {issue.synthetic ? '痛点整体' : `#${issue.number}`}
            {issue.fixed ? '· 历史已修复' : '· 已退出当前范围'}
          </span>
        ))}
      </div>
    </div>
  );
};

export const TrackingHistoryTable: React.FC<{
  history: IssuePainTrackingHistory[];
}> = ({ history }) => {
  if (!history.length) return null;
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
        <HistoryOutlined /> 流转记录
      </div>
      <Table
        size="small"
        rowKey={(item, index) => `${item.at}-${index}`}
        dataSource={[...history].reverse()}
        pagination={history.length > 6 ? { pageSize: 6, size: 'small' } : false}
        columns={[
          {
            title: '时间',
            dataIndex: 'at',
            width: 130,
            render: formatTrackingTime,
          },
          { title: '操作人', dataIndex: 'by', width: 90 },
          {
            title: '动作',
            dataIndex: 'action',
            width: 140,
            render: (value: string) => ACTION_LABELS[value] || value,
          },
          {
            title: '状态变化',
            width: 180,
            render: (_value, item) =>
              `${TRACKING_STATUS_SHORT_LABELS[item.from] || item.from} → ${
                TRACKING_STATUS_SHORT_LABELS[item.to] || item.to
              }`,
          },
          { title: '原因', dataIndex: 'reason' },
        ]}
        scroll={{ x: 680 }}
      />
    </div>
  );
};
