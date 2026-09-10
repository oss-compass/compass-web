import React from 'react';
import { HistoryOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Select, Table, Tooltip } from 'antd';
import toast from 'react-hot-toast';
import { cancelIssuePainRerun, fetchIssuePainReruns } from '../data';
import type { IssuePainRerunJob } from '../types';
import { shortTrackingPeriod } from './PainTrackingModal/utils';
import {
  RERUN_STATUS_META,
  RERUN_STATUS_OPTIONS,
  formatRerunDateTime,
  getLockedRerunIssueNumbers,
  getMetricChangeSummary,
  getRerunEtaRangeText,
  getRerunModeLabel,
  getRerunResultLabel,
  getRerunStatusKey,
  isRerunLocked,
} from './rerunJobPresentation';

/** 列表入口维度：总览页按组织查看全部任务，报告弹窗只看当前报告的任务。 */
export type RerunJobListScope =
  | { type: 'org'; org?: string }
  | { type: 'report'; reportKey: string; community: string; period: string };

type RerunJobListModalProps = {
  open: boolean;
  onClose: () => void;
  scope: RerunJobListScope;
};

const PAGE_SIZE = 10;
const POLL_INTERVAL_MS = 15_000;
/** 仅剩等待报告上传等长等待任务时的降频轮询间隔。 */
const SLOW_POLL_INTERVAL_MS = 60_000;

const MODE_OPTIONS = [
  { value: 'repair_check', label: '重跑检查' },
  { value: 'retest', label: '发起复测' },
] as const;

const RerunJobListModal: React.FC<RerunJobListModalProps> = ({
  open,
  onClose,
  scope,
}) => {
  const [status, setStatus] = React.useState<string | undefined>();
  const [mode, setMode] = React.useState<string | undefined>();
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState<{
    items: IssuePainRerunJob[];
    total: number;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [cancellingId, setCancellingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setStatus(undefined);
      setMode(undefined);
      setPage(1);
      setData(null);
    }
  }, [open, scope]);

  const load = React.useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      try {
        const base =
          scope.type === 'org'
            ? { org: scope.org }
            : { reportKey: scope.reportKey };
        const response = await fetchIssuePainReruns(
          {
            ...base,
            status,
            mode:
              mode === 'repair_check' || mode === 'retest' ? mode : undefined,
            page,
            pageSize: PAGE_SIZE,
          },
          signal
        );
        setData({ items: response.items, total: response.total });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        toast.error(
          error instanceof Error ? error.message : '重跑任务列表加载失败'
        );
      } finally {
        setLoading(false);
      }
    },
    [mode, page, scope, status]
  );

  React.useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, open]);

  // 存在进行中的任务时轮询刷新，关闭弹窗即停止。
  // 第三方执行中（pending/running）保持快节奏；仅剩等待报告上传等
  // 长等待任务时降频，避免弹窗开着就持续高频打接口。
  const hasActiveJob = (data?.items ?? []).some(isRerunLocked);
  const hasRunningJob = (data?.items ?? []).some(
    (job) => job.taskStatus === 'pending' || job.taskStatus === 'running'
  );
  const pollIntervalMs = hasRunningJob
    ? POLL_INTERVAL_MS
    : SLOW_POLL_INTERVAL_MS;
  React.useEffect(() => {
    if (!open || !hasActiveJob) return;
    const controller = new AbortController();
    const poll = () => {
      // 页面切后台时暂停轮询，切回时立即拉一次。
      if (document.hidden) return;
      void load(controller.signal);
    };
    const onVisibilityChange = () => {
      if (!document.hidden) poll();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    const timer = window.setInterval(poll, pollIntervalMs);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      controller.abort();
      window.clearInterval(timer);
    };
  }, [hasActiveJob, load, open, pollIntervalMs]);

  const cancelJob = async (job: IssuePainRerunJob) => {
    setCancellingId(job.jobId);
    try {
      await cancelIssuePainRerun(job.jobId);
      toast.success('重跑任务已取消');
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '取消重跑失败');
    } finally {
      setCancellingId(null);
    }
  };

  const showCommunity = scope.type === 'org';
  const items = data?.items ?? [];

  const columns = [
    {
      title: '状态',
      key: 'status',
      width: 110,
      render: (_value: unknown, job: IssuePainRerunJob) => {
        const meta =
          RERUN_STATUS_META[getRerunStatusKey(job)] ??
          RERUN_STATUS_META.pending;
        return (
          <div className="min-w-0">
            <span className={`text-xs font-semibold ${meta.color}`}>
              {meta.label}
            </span>
            {job.queuedPosition && job.queuedPosition > 1 ? (
              <div className="text-[10px] leading-4 text-amber-600">
                前方还有 {job.queuedPosition - 1} 个任务
              </div>
            ) : null}
            {job.error ? (
              <Tooltip title={job.error}>
                <div className="line-clamp-2 text-[10px] leading-4 text-rose-500">
                  {job.error}
                </div>
              </Tooltip>
            ) : null}
          </div>
        );
      },
    },
    ...(showCommunity
      ? [
          {
            title: '仓库',
            dataIndex: 'community',
            key: 'community',
            width: 150,
            render: (value: string) => (
              <span
                className="block truncate text-xs font-medium text-slate-700"
                title={value}
              >
                {value}
              </span>
            ),
          },
        ]
      : []),
    {
      title: '周期',
      dataIndex: 'period',
      key: 'period',
      width: showCommunity ? 150 : 190,
      render: (value: string) => (
        <span className="text-xs text-slate-600">
          {shortTrackingPeriod(value)}
        </span>
      ),
    },
    {
      title: '类型',
      dataIndex: 'mode',
      key: 'mode',
      width: 90,
      render: (value: string) => (
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {getRerunModeLabel(value)}
        </span>
      ),
    },
    {
      title: 'Issue',
      key: 'issues',
      width: 110,
      render: (_value: unknown, job: IssuePainRerunJob) => {
        const numbers = job.issueNumbers;
        return (
          <Tooltip title={numbers.map((number) => `#${number}`).join('、')}>
            <span className="cursor-help text-xs text-slate-700">
              {numbers.length} 个
              {numbers.length <= 3
                ? `（${numbers.map((number) => `#${number}`).join('、')}）`
                : ''}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      width: 90,
      render: (value: string) => (
        <span className="text-xs text-slate-600">{value || '—'}</span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 110,
      render: (value: string) => (
        <span className="whitespace-nowrap text-xs text-slate-500">
          {formatRerunDateTime(value)}
        </span>
      ),
    },
    {
      title: '完成时间',
      key: 'finishedAt',
      width: 110,
      render: (_value: unknown, job: IssuePainRerunJob) => (
        <span className="whitespace-nowrap text-xs text-slate-500">
          {formatRerunDateTime(job.appliedAt ?? job.finishedAt)}
        </span>
      ),
    },
    {
      title: '结果',
      key: 'results',
      width: 110,
      render: (_value: unknown, job: IssuePainRerunJob) => {
        if (job.applyStatus !== 'applied' || !job.results.length) {
          return isRerunLocked(job) ? (
            <Tooltip title={`预计完成 ${getRerunEtaRangeText(job)}`}>
              <span className="cursor-help text-xs text-slate-400">
                预计 {job.eta.minMinutes}–{job.eta.maxMinutes} 分钟
              </span>
            </Tooltip>
          ) : (
            <span className="text-xs text-slate-300">—</span>
          );
        }
        const resolved = job.results.filter(
          (item) => item.result === 'resolved'
        ).length;
        return (
          <span
            className={`text-xs font-semibold ${
              resolved === job.results.length
                ? 'text-emerald-600'
                : resolved
                ? 'text-amber-600'
                : 'text-rose-500'
            }`}
          >
            {resolved}/{job.results.length} 解决
          </span>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 90,
      render: (_value: unknown, job: IssuePainRerunJob) =>
        job.taskStatus === 'pending' || job.taskStatus === 'running' ? (
          <Button
            size="small"
            className="issue-rerun-list-action-button"
            loading={cancellingId === job.jobId}
            onClick={() => void cancelJob(job)}
          >
            取消任务
          </Button>
        ) : (
          <span className="text-xs text-slate-300">—</span>
        ),
    },
  ];

  return (
    <Modal
      open={open}
      className="issue-rerun-list-modal"
      onCancel={onClose}
      footer={null}
      width="calc(100vw - 32px)"
      style={{ maxWidth: 1180 }}
      styles={{ body: { maxHeight: '68vh', overflowY: 'auto' } }}
      title={
        <div className="flex items-center gap-2">
          <HistoryOutlined className="text-slate-400" />
          <span>重跑任务记录</span>
          <span className="text-xs font-normal text-slate-400">
            {scope.type === 'org'
              ? '当前组织全部仓库的重跑任务'
              : `当前报告（${shortTrackingPeriod(scope.period)}）的重跑任务`}
          </span>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            allowClear
            placeholder="任务状态"
            className="issue-rerun-list-filter !w-32"
            size="small"
            options={[...RERUN_STATUS_OPTIONS]}
            value={status}
            onChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          />
          <Select
            allowClear
            placeholder="任务类型"
            className="issue-rerun-list-filter !w-32"
            size="small"
            options={[...MODE_OPTIONS]}
            value={mode}
            onChange={(value) => {
              setMode(value);
              setPage(1);
            }}
          />
          <Button
            size="small"
            className="issue-rerun-list-action-button"
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={() => void load()}
          >
            刷新
          </Button>
          <span className="ml-auto text-xs text-slate-400">
            {hasActiveJob
              ? `存在进行中的任务，每 ${
                  hasRunningJob
                    ? POLL_INTERVAL_MS / 1000
                    : SLOW_POLL_INTERVAL_MS / 1000
                } 秒自动刷新`
              : `共 ${data?.total ?? 0} 条记录`}
          </span>
        </div>
        <Table
          size="small"
          rowKey="jobId"
          loading={loading && !items.length}
          columns={columns}
          dataSource={items}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-sm text-slate-400">
                    {loading ? '加载中…' : '暂无重跑任务记录'}
                  </span>
                }
              />
            ),
          }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: data?.total ?? 0,
            showSizeChanger: false,
            onChange: setPage,
            hideOnSinglePage: true,
          }}
          expandable={{
            rowExpandable: (record) =>
              record.applyStatus === 'applied' && record.results.length > 0,
            expandedRowRender: (record) => (
              <div className="flex flex-wrap gap-2 py-1">
                {record.results.map((item) => (
                  <div
                    key={`${item.trackingKey}-${item.issueNumber}`}
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] ${
                      item.result === 'resolved'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-rose-200 bg-rose-50 text-rose-600'
                    }`}
                  >
                    <div>
                      #{item.issueNumber} · {item.beforeFinalScore ?? '—'} →{' '}
                      {item.afterFinalScore ?? '—'} ·{' '}
                      {getRerunResultLabel(item, record.mode)}
                    </div>
                    {getMetricChangeSummary(item).length ? (
                      <div className="mt-0.5 text-[10px] opacity-80">
                        指标变化：{getMetricChangeSummary(item).join('；')}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ),
          }}
        />
        <div className="text-xs text-slate-400">
          同仓库同周期同时只允许触发一个重跑任务；任务完成后会更新报告并自动更新痛点状态。
          {items.some((job) => getLockedRerunIssueNumbers(job).length)
            ? ' 锁定中的 Issue 暂不能人工修改修复状态。'
            : ''}
        </div>
      </div>
      <style jsx global>{`
        .issue-rerun-list-modal .ant-modal-content {
          overflow: hidden;
          border-radius: 16px !important;
        }
        .issue-rerun-list-modal .issue-rerun-list-action-button.ant-btn,
        .issue-rerun-list-modal .ant-pagination-item,
        .issue-rerun-list-modal .ant-pagination-prev .ant-pagination-item-link,
        .issue-rerun-list-modal .ant-pagination-next .ant-pagination-item-link {
          border-radius: 8px !important;
          box-shadow: none !important;
        }
        .issue-rerun-list-filter .ant-select-selector {
          border-radius: 8px !important;
        }
        .issue-rerun-list-filter .ant-select-selection-item {
          font-size: 12px;
        }
      `}</style>
    </Modal>
  );
};

export default RerunJobListModal;
