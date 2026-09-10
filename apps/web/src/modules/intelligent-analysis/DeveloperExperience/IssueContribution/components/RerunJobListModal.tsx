import React from 'react';
import { HistoryOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Empty, Modal, Select, Table, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import toast from 'react-hot-toast';
import { cancelIssuePainRerun, fetchIssuePainReruns } from '../data';
import type { IssuePainRerunJob, IssuePainRerunResult } from '../types';
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

/** 同一个任务结果的唯一粒度是痛点 + Issue，防御重复应用数据。 */
const uniqueRerunResults = (results: IssuePainRerunResult[]) =>
  Array.from(
    new Map(
      results.map((result) => [
        `${result.trackingKey}#${result.issueNumber}`,
        result,
      ])
    ).values()
  );

export const RerunResultTable: React.FC<{
  job: IssuePainRerunJob;
  trackingKey?: string;
  metricLabels?: string[];
}> = ({ job, trackingKey, metricLabels }) => {
  const results = uniqueRerunResults(job.results).filter(
    (result) => !trackingKey || result.trackingKey === trackingKey
  );
  const columns: TableProps<IssuePainRerunResult>['columns'] = [
    {
      title: 'Issue',
      dataIndex: 'issueNumber',
      width: 82,
      render: (value: string) => (
        <span className="font-semibold text-blue-600">#{value}</span>
      ),
    },
    {
      title: '对应痛点',
      key: 'pain',
      width: 270,
      render: (_value, result) => {
        const labels = result.metricLabels?.length
          ? result.metricLabels
          : trackingKey === result.trackingKey && metricLabels?.length
          ? metricLabels
          : result.metricCodes;
        return (
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1">
              {result.stageId ? (
                <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-600">
                  {result.stageId}
                </span>
              ) : null}
              {labels.map((label) => (
                <span
                  key={label}
                  className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600"
                >
                  {label}
                </span>
              ))}
            </div>
            {result.stageName ? (
              <Tooltip
                title={
                  result.metricCodes.length
                    ? result.metricCodes.join('、')
                    : undefined
                }
              >
                <div className="truncate text-[10px] text-slate-400">
                  {result.stageName}
                </div>
              </Tooltip>
            ) : null}
          </div>
        );
      },
    },
    {
      title: '得分变化',
      key: 'score',
      width: 105,
      render: (_value, result) => (
        <span className="whitespace-nowrap text-xs tabular-nums text-slate-600">
          {result.beforeFinalScore ?? '—'} → {result.afterFinalScore ?? '—'}
        </span>
      ),
    },
    {
      title: '处理结果',
      key: 'result',
      width: 130,
      render: (_value, result) => (
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            result.result === 'resolved'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-600'
          }`}
        >
          {getRerunResultLabel(result, job.mode)}
        </span>
      ),
    },
    {
      title: '指标变化',
      key: 'metrics',
      render: (_value, result) => {
        const changes = getMetricChangeSummary(result);
        return (
          <span className="text-xs leading-5 text-slate-500">
            {changes.length ? changes.join('；') : '—'}
          </span>
        );
      },
    },
  ];
  return (
    <>
      <Table<IssuePainRerunResult>
        className="issue-rerun-result-table"
        rowKey={(result) => `${result.trackingKey}-${result.issueNumber}`}
        columns={columns}
        dataSource={results}
        pagination={false}
        size="small"
        scroll={{ x: 760 }}
      />
      <style jsx global>{`
        .issue-rerun-result-table .ant-table-container {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
        }
        .issue-rerun-result-table .ant-table-thead > tr > th {
          background: #f8fafc;
          color: #64748b;
          font-size: 11px;
          font-weight: 600;
        }
        .issue-rerun-result-table .ant-table-tbody > tr > td {
          vertical-align: middle;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};

const RerunJobListModal: React.FC<RerunJobListModalProps> = ({
  open,
  onClose,
  scope,
}) => {
  const [status, setStatus] = React.useState<string | undefined>();
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState<{
    items: IssuePainRerunJob[];
    total: number;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [cancellingId, setCancellingId] = React.useState<string | null>(null);
  const scopeType = scope.type;
  const scopeOrg = scope.type === 'org' ? scope.org : undefined;
  const scopeReportKey = scope.type === 'report' ? scope.reportKey : undefined;
  const scopeIdentity = `${scopeType}:${scopeOrg ?? scopeReportKey ?? ''}`;

  React.useEffect(() => {
    if (open) {
      setStatus(undefined);
      setPage(1);
      setData(null);
    }
  }, [open, scopeIdentity]);

  const load = React.useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      try {
        const base =
          scopeType === 'org'
            ? { org: scopeOrg }
            : { reportKey: scopeReportKey };
        const response = await fetchIssuePainReruns(
          {
            ...base,
            status,
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
    [page, scopeOrg, scopeReportKey, scopeType, status]
  );

  React.useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, open]);

  // 任务记录弹窗拥有独立的 15 秒轮询，打开才启动，关闭即停止。
  const hasActiveJob = (data?.items ?? []).some(isRerunLocked);
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
    const timer = window.setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      controller.abort();
      window.clearInterval(timer);
    };
  }, [hasActiveJob, load, open]);

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
        const results = uniqueRerunResults(job.results);
        const resolved = results.filter(
          (item) => item.result === 'resolved'
        ).length;
        return (
          <span
            className={`text-xs font-semibold ${
              resolved === results.length
                ? 'text-emerald-600'
                : resolved
                ? 'text-amber-600'
                : 'text-rose-500'
            }`}
          >
            {resolved}/{results.length} 解决
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
              ? `存在进行中的任务，每 ${POLL_INTERVAL_MS / 1000} 秒自动刷新`
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
            expandedRowRender: (record) => <RerunResultTable job={record} />,
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
