import React, { useMemo } from 'react';
import Link from 'next/link';
import { Alert, Button, Input, Modal, Table, Tag, Tooltip } from 'antd';
import {
  CheckOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  RightOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import type {
  CompassOperatorUser,
  DevxNodeStatus,
  RepoRerunJob,
} from '../rawData/apiClient';
import type { RepoProgressRow } from './types';
import { getReportDisplayText } from './utils';

export const NON_TERMINAL_RERUN_STATUSES = new Set([
  'queued',
  'pending',
  'running',
]);

const FINAL_REVIEW_STATUSES = new Set(['approved', 'published']);

export const isRerunReviewCompleted = (job?: RepoRerunJob | null) =>
  FINAL_REVIEW_STATUSES.has(
    String(job?.generated_report_review_status || '')
      .trim()
      .toLowerCase()
  );

export const isRerunReviewPending = (job?: RepoRerunJob | null) => {
  const status = String(job?.status || '')
    .trim()
    .toLowerCase();
  const reviewStatus = String(job?.generated_report_review_status || '')
    .trim()
    .toLowerCase();
  return (
    status === 'completed' &&
    reviewStatus !== 'rejected' &&
    !FINAL_REVIEW_STATUSES.has(reviewStatus)
  );
};

export const getRerunStatusMeta = (status?: string, reviewStatus?: string) => {
  const normalizedReviewStatus = String(reviewStatus || '')
    .trim()
    .toLowerCase();
  switch (status) {
    case 'queued':
    case 'pending':
      return {
        label: '排队中',
        color: 'processing' as const,
        icon: <ClockCircleOutlined />,
      };
    case 'running':
      return {
        label: '重跑中',
        color: 'processing' as const,
        icon: <LoadingOutlined />,
      };
    case 'completed':
      if (normalizedReviewStatus === 'rejected') {
        return {
          label: '审核驳回',
          color: 'error' as const,
          icon: <ExclamationCircleOutlined />,
        };
      }
      if (!FINAL_REVIEW_STATUSES.has(normalizedReviewStatus)) {
        return {
          label: '报告审核中',
          color: 'processing' as const,
          icon: <ClockCircleOutlined />,
        };
      }
      return {
        label: '已完成',
        color: 'success' as const,
        icon: <CheckCircleOutlined />,
      };
    case 'failed':
      return {
        label: '失败',
        color: 'error' as const,
        icon: <ExclamationCircleOutlined />,
      };
    case 'timeout':
      return {
        label: '已超时',
        color: 'warning' as const,
        icon: <ExclamationCircleOutlined />,
      };
    case 'cancelled':
      return {
        label: '已撤销',
        color: 'default' as const,
        icon: <ClockCircleOutlined />,
      };
    default:
      return {
        label: '重跑',
        color: 'default' as const,
        icon: <SyncOutlined />,
      };
  }
};

export const isActiveRerunJob = (job?: RepoRerunJob | null) =>
  !!job && NON_TERMINAL_RERUN_STATUSES.has(String(job.status || '').trim());

export const getDevxNodeDisplayName = (node: DevxNodeStatus, index: number) =>
  String(
    node.node_name || node.name || node.hostname || node.node_id || ''
  ).trim() || `节点 ${index + 1}`;

export const getDevxNodeKey = (node: DevxNodeStatus, index: number) =>
  String(node.node_id || getDevxNodeDisplayName(node, index)).trim() ||
  `node-${index + 1}`;

const formatRerunDateTime = (value: unknown) => {
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

const getRerunJobRowKey = (job: RepoRerunJob) =>
  String(
    job.job_id ||
      job.third_party_task_id ||
      `${job.project_key || 'repo'}-${
        job.created_at || job.updated_at || Math.random()
      }`
  );

const getRerunDetailReportHref = (job: RepoRerunJob) => {
  const fileKey = String(job.generated_file_key || '').trim();
  if (!fileKey || !isRerunReviewCompleted(job)) {
    return '';
  }
  return `/intelligent-analysis/community-experience?project=${encodeURIComponent(
    fileKey
  )}`;
};

const getRerunGeneratedReportId = (job: RepoRerunJob) =>
  String(job.generated_report_id || '').trim();

type RerunRecordsTableProps = {
  records: RepoRerunJob[];
  loading?: boolean;
  emptyText?: string;
  cancelingJobId?: string;
  canCancelRecord?: (record: RepoRerunJob) => boolean;
  onCancelRecord?: (record: RepoRerunJob) => void;
};

type RerunActionButtonProps = {
  job?: RepoRerunJob | null;
  loading?: boolean;
  onOpenRerun: () => void;
  onOpenRecords: () => void;
};

export const RerunActionButton: React.FC<RerunActionButtonProps> = ({
  job,
  loading = false,
  onOpenRerun,
  onOpenRecords,
}) => {
  const meta = getRerunStatusMeta(
    job?.status,
    job?.generated_report_review_status
  );
  const active = isActiveRerunJob(job);
  const reviewPending = isRerunReviewPending(job);
  const buttonText = active ? meta.label : reviewPending ? '审核中' : '重跑';
  const buttonIcon = active || reviewPending ? meta.icon : <SyncOutlined />;

  return (
    <Button
      type="link"
      size="small"
      className="!px-0"
      loading={loading}
      onClick={() => {
        if (active || reviewPending) {
          onOpenRecords();
          return;
        }
        onOpenRerun();
      }}
    >
      <span className="inline-flex items-center gap-1">
        {buttonIcon}
        <span>{buttonText}</span>
      </span>
    </Button>
  );
};

export const RerunRecordsTable: React.FC<RerunRecordsTableProps> = ({
  records,
  loading = false,
  emptyText = '暂无重跑记录',
  cancelingJobId,
  canCancelRecord,
  onCancelRecord,
}) => {
  const columns = useMemo<TableProps<RepoRerunJob>['columns']>(
    () => [
      {
        title: '操作人',
        dataIndex: 'requested_by',
        key: 'requested_by',
        width: 180,
        render: (value) => value || '--',
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 168,
        render: (value) => formatRerunDateTime(value),
      },
      {
        title: '完成时间',
        dataIndex: 'completed_at',
        key: 'completed_at',
        width: 168,
        render: (value) => formatRerunDateTime(value),
      },
      {
        title: '任务状态',
        dataIndex: 'status',
        key: 'status',
        width: 132,
        render: (value, record) => {
          const meta = getRerunStatusMeta(
            String(value || '').trim(),
            record.generated_report_review_status
          );
          return (
            <Tag color={meta.color as any}>
              <span className="inline-flex items-center gap-1">
                {meta.icon}
                <span>{meta.label}</span>
              </span>
            </Tag>
          );
        },
      },
      {
        title: '队列排名',
        dataIndex: 'queue_rank',
        key: 'queue_rank',
        width: 100,
        render: (value, record) => {
          const status = String(record.status || '')
            .trim()
            .toLowerCase();
          const rank = Number(value);
          if (
            (status === 'queued' || status === 'pending') &&
            Number.isFinite(rank) &&
            rank > 0
          ) {
            return `第${rank}位`;
          }
          return <span className="text-slate-400">--</span>;
        },
      },
      {
        title: '硬件环境',
        dataIndex: 'selected_node_hardware',
        key: 'selected_node_hardware',
        width: 150,
        render: (value) => String(value || '').trim() || '--',
      },
      {
        title: '报告ID',
        key: 'generated_report_id',
        width: 260,
        render: (_value: unknown, record: RepoRerunJob) => {
          const reportId = getRerunGeneratedReportId(record);
          const href = getRerunDetailReportHref(record);
          const displayText = getReportDisplayText(reportId);
          if (!reportId) {
            return <span className="text-slate-400">--</span>;
          }
          return href ? (
            <Link href={href} className="overview-table-link">
              {displayText || reportId}
            </Link>
          ) : (
            <span>{displayText || reportId}</span>
          );
        },
      },
      ...(onCancelRecord
        ? [
            {
              title: '操作',
              key: 'actions',
              width: 90,
              render: (_value: unknown, record: RepoRerunJob) =>
                canCancelRecord?.(record) ? (
                  <Button
                    type="link"
                    danger
                    size="small"
                    className="!px-0"
                    loading={cancelingJobId === record.job_id}
                    onClick={() => {
                      onCancelRecord(record);
                    }}
                  >
                    撤销
                  </Button>
                ) : (
                  <span className="text-slate-400">-</span>
                ),
            } as NonNullable<TableProps<RepoRerunJob>['columns']>[number],
          ]
        : []),
    ],
    [canCancelRecord, cancelingJobId, onCancelRecord]
  );

  return (
    <Table<RepoRerunJob>
      className="overview-ant-table"
      rowKey={getRerunJobRowKey}
      dataSource={records}
      columns={columns}
      loading={loading}
      pagination={{
        pageSize: 10,
        hideOnSinglePage: true,
        size: 'small',
      }}
      scroll={{ x: 1248 }}
      size="middle"
      tableLayout="fixed"
      locale={{ emptyText }}
    />
  );
};

type RepoRerunInfoCardProps = {
  repo: RepoProgressRow | null;
  hardware: string;
  operatorUser: CompassOperatorUser | null;
  canOperate: boolean;
  loginHint: string;
  onOpenChangePassword?: () => void;
  nodeSectionTitle?: string;
  nodeStatuses?: DevxNodeStatus[];
  nodeStatusesLoading?: boolean;
  nodeStatusesError?: string;
  selectedNodeKey?: string;
  nodeSelectable?: boolean;
  onSelectNode?: (nodeKey: string, node: DevxNodeStatus) => void;
};

const RepoRerunInfoCard: React.FC<RepoRerunInfoCardProps> = ({
  repo,
  hardware,
  operatorUser,
  canOperate,
  loginHint,
  onOpenChangePassword,
  nodeSectionTitle = '节点状态',
  nodeStatuses = [],
  nodeStatusesLoading = false,
  nodeStatusesError = '',
  selectedNodeKey = '',
  nodeSelectable = false,
  onSelectNode,
}) => {
  if (!repo) return null;
  const repoNames = Array.isArray(operatorUser?.repo_names)
    ? operatorUser.repo_names
    : [];
  const repoKeys = Array.isArray(operatorUser?.repo_keys)
    ? operatorUser.repo_keys
    : [];

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-3 text-sm font-medium text-slate-900">
            仓库信息
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-16 shrink-0 text-slate-500">仓库</div>
              <div className="min-w-0 flex-1 font-medium text-slate-900">
                {repo.name}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-16 shrink-0 text-slate-500">责任团队</div>
              <div className="min-w-0 flex-1 text-slate-700">
                {repo.team || '未分配团队'}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-16 shrink-0 text-slate-500">硬件环境</div>
              <div className="min-w-0 flex-1 text-slate-700">
                {hardware || '--'}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          {operatorUser ? (
            <div className="space-y-3">
              <div className="text-sm font-medium text-slate-900">账户信息</div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-16 shrink-0 text-slate-500">当前账号</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-medium text-slate-900">
                    <span>{operatorUser.username}</span>
                    <Tag color={operatorUser.role === 'admin' ? 'red' : 'blue'}>
                      {operatorUser.role === 'admin' ? '管理员' : '仓库负责人'}
                    </Tag>
                    {onOpenChangePassword ? (
                      <Button
                        size="small"
                        type="link"
                        className="!px-0"
                        onClick={onOpenChangePassword}
                      >
                        修改密码
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-16 shrink-0 text-slate-500">负责仓库</div>
                <div className="min-w-0 flex-1 text-slate-700">
                  {repoNames.length
                    ? repoNames.join('、')
                    : repoKeys.length
                    ? repoKeys.join('、')
                    : '全部'}
                </div>
              </div>
              <div
                className={`flex items-center rounded-md border px-3 py-1.5 text-xs leading-5 ${
                  canOperate
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-rose-200 bg-rose-50 text-rose-700'
                }`}
              >
                <span className="truncate">
                  {canOperate
                    ? '当前账号具备重跑与撤销权限'
                    : '当前账号无权操作该仓库！'}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm font-medium text-slate-900">账户信息</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-16 shrink-0 text-slate-500">当前账号</div>
                  <div className="min-w-0 flex-1 text-slate-400">未登录</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-16 shrink-0 text-slate-500">负责仓库</div>
                  <div className="min-w-0 flex-1 text-slate-400">
                    登录后可查看
                  </div>
                </div>
                <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700">
                  {loginHint || '请先登录操作账号'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {operatorUser ? (
        <div className="mt-3 border-t border-slate-200 pt-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-900">
              {nodeSectionTitle}
            </div>
            {!nodeStatusesLoading &&
            !nodeStatusesError &&
            nodeStatuses.length ? (
              <div className="text-xs text-slate-500">
                在线节点 {nodeStatuses.length} 个
              </div>
            ) : null}
          </div>
          {nodeStatusesLoading ? (
            <div className="text-sm text-slate-500">正在加载节点状态...</div>
          ) : nodeStatusesError ? (
            <div className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {nodeStatusesError}
            </div>
          ) : nodeStatuses.length ? (
            <div className="grid grid-cols-2 gap-3">
              {nodeStatuses.map((node, index) => {
                const name = getDevxNodeDisplayName(node, index);
                const nodeKey = getDevxNodeKey(node, index);
                const hardwareText =
                  String(node.hardware || '--').trim() || '--';
                const used = Number(node.used_slots ?? 0);
                const free = Number(node.free_slots ?? 0);
                const max = Number(node.max_slots ?? used + free);
                const total = max > 0 ? max : used + free;
                const usagePercent =
                  total > 0
                    ? Math.max(
                        0,
                        Math.min(100, Math.round((used / total) * 100))
                      )
                    : 0;
                const selected = nodeSelectable && selectedNodeKey === nodeKey;
                return (
                  <div
                    key={nodeKey}
                    className={`rounded-lg border bg-white px-3 py-3 text-sm text-slate-700 shadow-sm transition-all ${
                      selected
                        ? 'border-emerald-400 ring-2 ring-emerald-100'
                        : 'border-slate-200'
                    } ${
                      nodeSelectable
                        ? 'cursor-pointer hover:border-emerald-300 hover:shadow'
                        : ''
                    }`}
                    onClick={() => {
                      if (nodeSelectable) {
                        onSelectNode?.(nodeKey, node);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="truncate font-medium text-slate-900">
                            {name}
                          </div>
                          {selected ? (
                            <span className="inline-flex items-center text-emerald-600">
                              <CheckOutlined />
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span className="shrink-0 text-xs text-slate-500">
                            硬件环境:
                          </span>
                          <span className="truncate text-slate-700">
                            {hardwareText}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        使用率 {usagePercent}%
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <span className="shrink-0 text-xs text-slate-500">
                        资源占用:
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all"
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-slate-600">
                        {used} / {total || 0}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-slate-500">暂无在线节点信息</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

type RepoRerunModalProps = {
  open: boolean;
  repo: RepoProgressRow | null;
  hardware: string;
  operatorUser: CompassOperatorUser | null;
  canCurrentUserOperate: boolean;
  rerunRecords: RepoRerunJob[];
  rerunRecordsLoading: boolean;
  rerunRecordsError: string;
  cancelingJobId: string;
  shouldShowRerunRecordsTable: boolean;
  rerunning: boolean;
  onCancel: () => void;
  onSwitchAccount: () => void;
  onConfirmRerun: () => void;
  onCancelRecord: (record: RepoRerunJob) => void;
  canCancelRecord: (record: RepoRerunJob) => boolean;
  nodeStatuses?: DevxNodeStatus[];
  nodeStatusesLoading?: boolean;
  nodeStatusesError?: string;
  selectedNodeKey?: string;
  onSelectNode?: (nodeKey: string, node: DevxNodeStatus) => void;
  rerunRecordsExpanded: boolean;
  onToggleRerunRecords: () => void;
  onOpenChangePassword?: () => void;
};

export const RepoRerunModal: React.FC<RepoRerunModalProps> = ({
  open,
  repo,
  hardware,
  operatorUser,
  canCurrentUserOperate,
  rerunRecords,
  rerunRecordsLoading,
  rerunRecordsError,
  cancelingJobId,
  shouldShowRerunRecordsTable,
  rerunning,
  onCancel,
  onSwitchAccount,
  onConfirmRerun,
  onCancelRecord,
  canCancelRecord,
  nodeStatuses,
  nodeStatusesLoading,
  nodeStatusesError,
  selectedNodeKey,
  onSelectNode,
  rerunRecordsExpanded,
  onToggleRerunRecords,
  onOpenChangePassword,
}) => (
  <Modal
    open={open}
    title={repo ? `${repo.name} · 重跑` : '仓库重跑'}
    onCancel={onCancel}
    destroyOnHidden
    width="80vw"
    footer={[
      <Button key="switch" onClick={onSwitchAccount}>
        切换账号
      </Button>,
      <Button key="cancel" onClick={onCancel}>
        取消
      </Button>,
      <Tooltip
        key="submit"
        title={!canCurrentUserOperate ? '当前账号无权操作该仓库！' : ''}
      >
        <span className="inline-flex">
          <Button
            type="primary"
            loading={rerunning}
            disabled={!canCurrentUserOperate}
            onClick={onConfirmRerun}
          >
            确认重跑
          </Button>
        </span>
      </Tooltip>,
    ]}
  >
    <div className="flex flex-col gap-4">
      <RepoRerunInfoCard
        repo={repo}
        hardware={hardware}
        operatorUser={operatorUser}
        canOperate={canCurrentUserOperate}
        loginHint=""
        onOpenChangePassword={onOpenChangePassword}
        nodeSectionTitle="选择节点"
        nodeStatuses={nodeStatuses}
        nodeStatusesLoading={nodeStatusesLoading}
        nodeStatusesError={nodeStatusesError}
        selectedNodeKey={selectedNodeKey}
        nodeSelectable={!!operatorUser && canCurrentUserOperate}
        onSelectNode={onSelectNode}
      />

      {operatorUser && shouldShowRerunRecordsTable ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <button
            type="button"
            className="flex w-full items-center justify-between text-left"
            onClick={onToggleRerunRecords}
          >
            <span className="text-sm font-medium text-slate-900">重跑记录</span>
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              {rerunRecordsLoading ? '加载中' : `${rerunRecords.length} 条`}
              {rerunRecordsExpanded ? <DownOutlined /> : <RightOutlined />}
            </span>
          </button>
          {rerunRecordsExpanded ? (
            <div className="mt-3">
              {rerunRecordsError ? (
                <Alert
                  className="mb-3"
                  type="error"
                  showIcon
                  message={rerunRecordsError}
                />
              ) : null}
              <RerunRecordsTable
                records={rerunRecords}
                loading={rerunRecordsLoading}
                cancelingJobId={cancelingJobId}
                canCancelRecord={canCancelRecord}
                onCancelRecord={onCancelRecord}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  </Modal>
);

type RepoRerunRecordsModalProps = {
  open: boolean;
  repo: RepoProgressRow | null;
  hardware: string;
  operatorUser: CompassOperatorUser | null;
  canCurrentUserOperate: boolean;
  rerunRecords: RepoRerunJob[];
  rerunRecordsLoading: boolean;
  rerunRecordsError: string;
  cancelingJobId: string;
  nodeStatuses?: DevxNodeStatus[];
  nodeStatusesLoading?: boolean;
  nodeStatusesError?: string;
  rerunRecordsExpanded: boolean;
  onToggleRerunRecords: () => void;
  authSubmitting: boolean;
  authChecking: boolean;
  loginError: string;
  loginUsername: string;
  loginPassword: string;
  onLoginUsernameChange: (value: string) => void;
  onLoginPasswordChange: (value: string) => void;
  onClose: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onCancelRecord: (record: RepoRerunJob) => void;
  canCancelRecord: (record: RepoRerunJob) => boolean;
  onOpenChangePassword?: () => void;
};

export const RepoRerunRecordsModal: React.FC<RepoRerunRecordsModalProps> = ({
  open,
  repo,
  hardware,
  operatorUser,
  canCurrentUserOperate,
  rerunRecords,
  rerunRecordsLoading,
  rerunRecordsError,
  cancelingJobId,
  nodeStatuses,
  nodeStatusesLoading,
  nodeStatusesError,
  rerunRecordsExpanded,
  onToggleRerunRecords,
  authSubmitting,
  authChecking,
  loginError,
  loginUsername,
  loginPassword,
  onLoginUsernameChange,
  onLoginPasswordChange,
  onClose,
  onLogout,
  onLogin,
  onCancelRecord,
  canCancelRecord,
  onOpenChangePassword,
}) => (
  <Modal
    open={open}
    title={repo ? `${repo.name} · 重跑记录` : '重跑记录'}
    onCancel={onClose}
    destroyOnHidden
    footer={
      operatorUser
        ? [
            <Button key="logout" onClick={onLogout}>
              切换账号
            </Button>,
            <Button key="close" onClick={onClose}>
              关闭
            </Button>,
          ]
        : [
            <Button
              key="login"
              type="primary"
              loading={authSubmitting}
              onClick={onLogin}
            >
              登录并继续
            </Button>,
            <Button key="close" onClick={onClose}>
              关闭
            </Button>,
          ]
    }
    width="80vw"
  >
    <div className="flex max-h-[72vh] flex-col gap-4 overflow-y-auto pr-1">
      <RepoRerunInfoCard
        repo={repo}
        hardware={hardware}
        operatorUser={operatorUser}
        canOperate={canCurrentUserOperate}
        loginHint="如需撤销任务，请先登录操作账号"
        onOpenChangePassword={onOpenChangePassword}
        nodeSectionTitle="节点状态"
        nodeStatuses={nodeStatuses}
        nodeStatusesLoading={nodeStatusesLoading}
        nodeStatusesError={nodeStatusesError}
      />

      {!operatorUser ? (
        <>
          <Alert type="warning" showIcon message="请先登录操作账号" />
          <Input
            value={loginUsername}
            placeholder="请输入账号"
            onChange={(event) => {
              onLoginUsernameChange(event.target.value);
            }}
          />
          <Input.Password
            value={loginPassword}
            placeholder="请输入密码"
            onChange={(event) => {
              onLoginPasswordChange(event.target.value);
            }}
            onPressEnter={onLogin}
          />
        </>
      ) : null}

      {authChecking ? (
        <div className="text-sm text-slate-500">正在校验当前登录状态...</div>
      ) : null}

      {loginError ? <Alert type="error" showIcon message={loginError} /> : null}

      {rerunRecordsError ? (
        <Alert type="error" showIcon message={rerunRecordsError} />
      ) : null}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left"
          onClick={onToggleRerunRecords}
        >
          <span className="text-sm font-medium text-slate-900">重跑记录</span>
          <span className="inline-flex items-center gap-2 text-xs text-slate-500">
            {rerunRecordsLoading ? '加载中' : `${rerunRecords.length} 条`}
            {rerunRecordsExpanded ? <DownOutlined /> : <RightOutlined />}
          </span>
        </button>
        {rerunRecordsExpanded ? (
          <div className="mt-3">
            <RerunRecordsTable
              records={rerunRecords}
              loading={rerunRecordsLoading}
              cancelingJobId={cancelingJobId}
              canCancelRecord={canCancelRecord}
              onCancelRecord={onCancelRecord}
            />
          </div>
        ) : null}
      </div>
    </div>
  </Modal>
);
