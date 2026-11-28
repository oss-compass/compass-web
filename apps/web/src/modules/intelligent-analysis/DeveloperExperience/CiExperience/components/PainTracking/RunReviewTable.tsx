import React, { useRef, useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Empty,
  Grid,
  Input,
  Modal,
  Progress,
  Table,
  Tooltip,
} from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import type { CiProblem, CiRun } from '../../types';
import type { TrackingScope } from './model';
import { trackingProblemKey } from './model';
import RunBatchReview from './RunBatchReview';
import { RunRuleCell, RunLogCell, RunDecisionCell } from './RunReviewCells';
import { prURL, runURL } from '../../helpers';
import { useCiRepositoryUrl } from '../../repository';
import { sameReviewProblem, useCiRuleReviews } from '../RuleReviews';
import {
  runReviewLabels,
  savePainRunReview,
  RunReviewError,
  type CiRunRuleReview,
  type CiRunDecision,
  type CiRunReviewAction,
} from '../../ruleReviews';
import {
  validateOperator,
  formatTrackingTime,
} from '../../../IssueContribution/components/PainTrackingModal/utils';

type RunRow = { key: string; run: CiRun; review?: CiRunRuleReview };
type Props = {
  problem: CiProblem;
  reviewState: ReturnType<typeof usePainRunReviews>;
  scope: TrackingScope;
  operator: string;
  busy: boolean;
  onBusy: (value: boolean) => void;
  onOperatorInvalid: (message: string) => void;
  rememberOperator: (value: string) => void;
};

export const usePainRunReviews = (problem?: CiProblem) => {
  const context = useCiRuleReviews();
  const reviews = problem
    ? context?.rows.filter((row) => sameReviewProblem(row, problem)) ?? []
    : [];
  const runKey = (run: CiRun) =>
    JSON.stringify([run.id || ['report-row', run.n], run.stage, run.job]);
  const reviewsByRun = new Map<string, CiRunRuleReview[]>();
  for (const review of reviews) {
    const key = runKey(review.run);
    const matches = reviewsByRun.get(key) ?? [];
    matches.push(review);
    reviewsByRun.set(key, matches);
  }
  const occurrences = new Map<string, number>();
  const rows: RunRow[] = (problem?.runs ?? []).map((run, index) => {
    const key = runKey(run);
    const occurrence = occurrences.get(key) ?? 0;
    occurrences.set(key, occurrence + 1);
    const review = reviewsByRun.get(key)?.[occurrence];
    return { key: review?.instance_id || `${key}:${index}`, run, review };
  });
  const matchedIds = new Set(rows.map(({ review }) => review?.instance_id));
  for (const review of reviews) {
    if (!matchedIds.has(review.instance_id)) {
      rows.push({ key: review.instance_id, run: review.run, review });
    }
  }
  const reviewableRows = rows.filter((row) => row.review);
  const completed = reviewableRows.filter(
    ({ review }) =>
      review?.status === 'confirmed' || review?.status === 'incorrect'
  ).length;
  const canReview = Boolean(context && !context.error && !context.loading);
  const missingRows = rows.filter(({ review }) => !review);
  const unavailable = missingRows.filter(({ run }) =>
    Boolean(run.id || run.rule_id || problem?.rule_id)
  ).length;
  const unreviewable = missingRows.length - unavailable;
  const complete =
    (reviewableRows.length === 0 && unavailable === 0) ||
    (canReview && unavailable === 0 && completed === reviewableRows.length);
  return {
    context,
    rows,
    reviewableRows,
    completed,
    unavailable,
    unreviewable,
    canReview,
    complete,
  };
};

const RunReviewProgress: React.FC<{
  completed: number;
  available: number;
  unavailable: number;
  onRetry: () => void;
}> = ({ completed, available, unavailable, onRetry }) => {
  const done = completed === available && unavailable === 0;
  const title = done ? '已完成全部判据审核' : '判据待审核';
  return (
    <div
      className={`rounded-lg border px-3.5 py-2.5 ${
        done
          ? 'border-emerald-100 bg-emerald-50/60'
          : 'border-amber-100 bg-amber-50/60'
      }`}
    >
      <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
        <div className="flex items-center gap-2">
          {done ? (
            <CheckCircleOutlined className="text-emerald-600" />
          ) : (
            <InfoCircleOutlined className="text-amber-600" />
          )}
          <span>{title}</span>
        </div>
        <span className="shrink-0 tabular-nums">
          {completed}/{available + unavailable}
        </span>
      </div>
      {!done && (
        <p className="mt-1 text-xs leading-5 text-slate-600">
          请核对日志后逐条审核，也可选中待审核记录批量提交。
        </p>
      )}
      {unavailable > 0 && (
        <p className="mt-1 text-xs leading-5 text-slate-600">
          {unavailable} 条执行记录的审核数据缺失。
          <Button type="link" size="small" onClick={onRetry}>
            重新加载判据
          </Button>
        </p>
      )}
      <Progress
        aria-label="判据审核完成进度"
        percent={Math.round((completed / (available + unavailable)) * 100)}
        showInfo={false}
        className="!mb-0 mt-2"
        strokeColor={done ? '#059669' : '#f59e0b'}
        size={['100%', 6]}
      />
    </div>
  );
};

const RunReviewTable: React.FC<Props> = ({
  problem,
  reviewState,
  scope,
  operator,
  busy,
  onBusy,
  onOperatorInvalid,
  rememberOperator,
}) => {
  const repositoryUrl = useCiRepositoryUrl();
  const { md } = Grid.useBreakpoint();
  const [editing, setEditing] = useState<{
    key: string;
    action: CiRunReviewAction;
    revision: number;
    evidence_revision: string;
    runNumber: number;
  } | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const submitting = useRef(false);
  const [activeSubmission, setActiveSubmission] = useState<{
    key: string;
    action: CiRunReviewAction;
  } | null>(null);
  const {
    context,
    rows,
    reviewableRows,
    completed,
    unavailable,
    unreviewable,
    canReview,
  } = reviewState;
  const hasExpectedReviews = rows.length > unreviewable;
  const reviewDisabled = busy || !canReview;
  const missingReviewLabel = canReview ? '暂无审核数据' : '—';
  const selectedReviews = rows
    .filter((row) => selectedIds.includes(row.key))
    .flatMap((row) => (row.review ? [row.review] : []));
  const pendingReviews = rows.flatMap((row) =>
    row.review &&
    ['pending', 'needs_review', 'insufficient'].includes(row.review.status)
      ? [row.review]
      : []
  );
  const submit = async (row: RunRow, action: CiRunReviewAction) => {
    if (!row.review || submitting.current || reviewDisabled) return;
    const validation = validateOperator(operator);
    if (validation) {
      onOperatorInvalid(validation);
      return;
    }
    if (action !== 'confirmed' && !reason.trim()) {
      setError('请填写原因');
      return;
    }
    submitting.current = true;
    setActiveSubmission({ key: row.key, action });
    onBusy(true);
    setError('');
    try {
      const expected =
        action !== 'confirmed' && editing?.key === row.key
          ? editing
          : row.review;
      await savePainRunReview({
        ...scope,
        problemKey: trackingProblemKey(problem),
        instance_id: row.review.instance_id,
        evidence_revision: expected.evidence_revision,
        revision: expected.revision,
        action,
        operator: operator.trim(),
        reason: action === 'confirmed' ? '' : reason.trim(),
      });
      rememberOperator(operator);
      setEditing(null);
      setReason('');
      await context?.retry();
      toast.success(
        `执行记录 #${row.run.n} 审核结果：${runReviewLabels[action]}`
      );
    } catch (e) {
      const message =
        e instanceof Error ? e.message : '判据审核保存失败，请重试';
      setError(message);
      toast.error(message);
      if (e instanceof RunReviewError && e.status === 409) {
        setEditing(null);
        setReason('');
      }
      await context?.retry();
    } finally {
      submitting.current = false;
      setActiveSubmission(null);
      onBusy(false);
    }
  };
  const startDecision = (row: RunRow, action: CiRunReviewAction) => {
    const validation = validateOperator(operator);
    if (validation) {
      onOperatorInvalid(validation);
      return;
    }
    onOperatorInvalid('');
    setError('');
    if (action === 'confirmed') {
      void submit(row, action);
      return;
    }
    if (!row.review) return;
    setEditing({
      key: row.key,
      action,
      revision: row.review.revision,
      evidence_revision: row.review.evidence_revision,
      runNumber: row.run.n,
    });
    setReason('');
  };
  return (
    <section aria-label="执行记录" className="space-y-3">
      {canReview && hasExpectedReviews && (
        <RunReviewProgress
          completed={completed}
          available={reviewableRows.length}
          unavailable={unavailable}
          onRetry={() => void context?.retry()}
        />
      )}
      {unreviewable > 0 && (
        <p className="text-xs text-slate-500">
          {unreviewable} 条执行记录缺少执行 ID 和判据，仅供查看。
        </p>
      )}
      {hasExpectedReviews && context?.loading && (
        <div role="status" className="text-sm text-slate-500">
          正在加载判据审核…
        </div>
      )}
      {hasExpectedReviews && (!context || context.error) && (
        <Alert
          type="error"
          showIcon
          message="判据审核状态读取失败"
          action={
            context && (
              <Button onClick={() => void context.retry()}>重试</Button>
            )
          }
        />
      )}
      {error ? <Alert type="error" showIcon message={error} /> : null}
      <p className=">md:hidden text-xs text-slate-500">
        横向滚动可查看判据和审核操作。
      </p>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <RunBatchReview
          scope={scope}
          problemKey={trackingProblemKey(problem)}
          selected={selectedReviews}
          pending={pendingReviews}
          busy={reviewDisabled}
          operator={operator}
          onOperatorInvalid={onOperatorInvalid}
          rememberOperator={rememberOperator}
          onSelectPending={() =>
            setSelectedIds(pendingReviews.map((row) => row.instance_id))
          }
          onClear={() => setSelectedIds([])}
          onSaved={(ids) =>
            setSelectedIds((current) =>
              current.filter((id) => !ids.includes(id))
            )
          }
          onBusy={onBusy}
          onRefresh={() => context?.retry() || Promise.resolve()}
        />
        <Table<RunRow>
          size="small"
          className="ci-run-review-table"
          rowKey="key"
          dataSource={rows}
          loading={context?.loading}
          tableLayout="fixed"
          scroll={{ x: 1150 }}
          rowSelection={{
            columnWidth: 44,
            fixed: 'right',
            columnTitle: (
              <Tooltip
                title={`全选各页可审核记录，共 ${reviewableRows.length} 条`}
              >
                <Checkbox
                  aria-label="选择全部执行记录"
                  disabled={reviewDisabled || reviewableRows.length === 0}
                  checked={
                    selectedReviews.length > 0 &&
                    selectedReviews.length === reviewableRows.length
                  }
                  indeterminate={
                    selectedReviews.length > 0 &&
                    selectedReviews.length < reviewableRows.length
                  }
                  onChange={(event) =>
                    setSelectedIds(
                      event.target.checked
                        ? reviewableRows.map((row) => row.key)
                        : []
                    )
                  }
                />
              </Tooltip>
            ),
            selectedRowKeys: selectedIds,
            preserveSelectedRowKeys: true,
            onChange: (keys) => setSelectedIds(keys.map(String)),
            getCheckboxProps: (row) => ({
              disabled: reviewDisabled || !row.review,
              'aria-label': `选择执行记录 #${row.run.n}`,
            }),
          }}
          pagination={{
            pageSize,
            hideOnSinglePage: rows.length <= 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
            showTotal: (total) => `共 ${total} 条`,
            onChange: (_, size) => {
              setPageSize(size);
              setExpanded([]);
              setEditing(null);
              setReason('');
            },
          }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="该问题未提供执行记录，请结合报告指标判断"
              />
            ),
          }}
          expandable={{
            expandedRowKeys: expanded,
            showExpandColumn: false,
            expandedRowRender: (row) => (
              <section
                aria-label={`执行记录 #${row.run.n} 审核记录`}
                className="rounded-xl border border-slate-200 bg-white"
              >
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs font-semibold text-slate-700">
                  <span>审核记录</span>
                  <span className="font-normal text-slate-400">
                    共 {row.review?.history.length || 0} 条
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpanded([])}
                    className="ml-auto rounded px-1 text-slate-500 hover:text-sky-600"
                    aria-label={`收起执行记录 #${row.run.n} 审核记录`}
                  >
                    收起
                  </button>
                </div>
                <Table<CiRunDecision>
                  size="small"
                  rowKey={(item, index) => `${item.reviewed_at}-${index}`}
                  dataSource={[...(row.review?.history || [])].reverse()}
                  pagination={
                    (row.review?.history.length || 0) > 6
                      ? { pageSize: 6, size: 'small' }
                      : false
                  }
                  locale={{ emptyText: '暂无审核记录' }}
                  columns={[
                    {
                      title: '时间',
                      dataIndex: 'reviewed_at',
                      width: 150,
                      render: formatTrackingTime,
                    },
                    { title: '审核人', dataIndex: 'reviewed_by', width: 90 },
                    {
                      title: '审核结果',
                      dataIndex: 'action',
                      width: 110,
                      render: (action: string) =>
                        runReviewLabels[action as CiRunRuleReview['status']] ||
                        action,
                    },
                    {
                      title: '原因',
                      dataIndex: 'reason',
                      render: (value: string) => (
                        <span className="whitespace-pre-wrap break-words">
                          {value || '—'}
                        </span>
                      ),
                    },
                    {
                      title: '审核时判据',
                      width: 240,
                      render: (_, item) => (
                        <span className="break-all">
                          {item.original_rule?.rule_id || '—'}
                        </span>
                      ),
                    },
                    {
                      title: '版本',
                      width: 70,
                      render: (_, item) => item.original_rule?.version || '—',
                    },
                  ]}
                  scroll={{ x: 850 }}
                />
              </section>
            ),
          }}
          columns={[
            {
              title: '执行记录',
              width: 90,
              render: (_, row) =>
                row.run.id ? (
                  <a
                    href={runURL(repositoryUrl, row.run.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-sky-600 hover:underline"
                  >
                    #{row.run.n}
                  </a>
                ) : (
                  <span>#{row.run.n}</span>
                ),
            },
            {
              title: 'PR',
              width: 72,
              render: (_, row) =>
                row.run.pr ? (
                  <a
                    href={prURL(repositoryUrl, row.run.pr)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-sky-600"
                  >
                    #{row.run.pr}
                  </a>
                ) : (
                  <span className="text-slate-300">—</span>
                ),
            },
            {
              title: '阶段 / 任务',
              width: 148,
              render: (_, row) => (
                <Tooltip title={`${row.run.stage} / ${row.run.job}`}>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-medium text-slate-600">
                      {row.run.stage || '—'}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-slate-400">
                      {row.run.job || '—'}
                    </div>
                  </div>
                </Tooltip>
              ),
            },
            {
              title: '日志摘要',
              width: 220,
              render: (_, row) => <RunLogCell message={row.run.msg} />,
            },
            {
              title: '判据',
              width: 270,
              render: (_, row) => (
                <RunRuleCell
                  review={row.review}
                  fallback={row.run.rule_id || problem.rule_id}
                  loading={context?.loading}
                />
              ),
            },
            {
              title: '审核状态',
              width: 100,
              render: (_, row) => (
                <span
                  className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] leading-4 ${
                    !row.review
                      ? 'border-slate-200 bg-slate-50 text-slate-500'
                      : row.review.status === 'confirmed'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : row.review.status === 'incorrect'
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-amber-200 bg-amber-50 text-amber-600'
                  }`}
                >
                  {row.review
                    ? runReviewLabels[row.review.status]
                    : missingReviewLabel}
                </span>
              ),
            },
            {
              title: (
                <span>
                  判据审核
                  <span className="ml-1 text-rose-600" aria-hidden="true">
                    *
                  </span>
                </span>
              ),
              width: 174,
              fixed: md ? 'right' : undefined,
              render: (_, row) => (
                <RunDecisionCell
                  review={row.review}
                  runNumber={row.run.n}
                  loadingAction={
                    activeSubmission?.key === row.key
                      ? activeSubmission.action
                      : undefined
                  }
                  disabled={reviewDisabled || !row.review}
                  onDecision={(action) => startDecision(row, action)}
                  onHistory={() => {
                    setExpanded(expanded.includes(row.key) ? [] : [row.key]);
                    setEditing(null);
                  }}
                />
              ),
            },
            Table.SELECTION_COLUMN,
          ]}
        />
      </div>
      <Modal
        open={Boolean(editing)}
        title={editing?.action === 'incorrect' ? '判据有误' : '证据不足说明'}
        className="ci-pain-invalid-modal"
        width={480}
        centered
        destroyOnHidden
        footer={null}
        maskClosable={!busy}
        closable={!busy}
        keyboard={!busy}
        onCancel={() => {
          if (!busy) {
            setEditing(null);
            setReason('');
          }
        }}
      >
        <div className="space-y-4">
          <p className="text-sm leading-6 text-slate-600">
            执行记录 #{editing?.runNumber}
            {editing?.action === 'insufficient'
              ? ' · 请说明还需要补充哪些证据。'
              : ' · 请说明判据有误的原因，可附上修正建议。'}
          </p>
          <label className="block text-sm font-medium text-slate-700">
            原因
            <span className="ml-1 text-rose-600" aria-hidden="true">
              *
            </span>
            <Input.TextArea
              aria-label={`执行记录 #${editing?.runNumber} 原因`}
              placeholder={
                editing?.action === 'insufficient'
                  ? '请填写缺失的证据'
                  : '请填写原因及修正建议'
              }
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={4}
              maxLength={500}
              disabled={busy}
              required
              className="mt-2"
            />
            <span className="mt-2 block text-right text-xs font-normal leading-5 text-slate-400">
              {reason.length} / 500
            </span>
          </label>
          <div className="flex justify-end gap-2">
            <Button
              disabled={busy}
              onClick={() => {
                setEditing(null);
                setReason('');
              }}
            >
              取消
            </Button>
            <Button
              type="primary"
              danger={editing?.action === 'incorrect'}
              disabled={!reason.trim()}
              loading={busy}
              onClick={() => {
                const row = rows.find((item) => item.key === editing?.key);
                if (row && editing) void submit(row, editing.action);
              }}
            >
              提交审核
            </Button>
          </div>
        </div>
      </Modal>
      <style jsx global>{`
        .ci-run-review-table .ant-table-thead > tr > th {
          background: #f8fafc;
          padding: 8px 12px;
          color: #64748b;
          font-size: 11px;
          font-weight: 600;
          border-bottom: 1px solid #e2e8f0;
        }
        .ci-run-review-table .ant-table-thead > tr > th::before {
          display: none !important;
        }
        .ci-run-review-table .ant-table-tbody > tr > td {
          padding: 10px 12px;
          vertical-align: top;
          color: #475569;
          font-size: 12px;
          border-bottom: 1px solid #f1f5f9;
        }
        .ci-run-review-table .ant-table-tbody > tr.ant-table-row:hover > td {
          background: #f8fafc;
        }
        .ci-run-review-table .ant-table-tbody > tr.ant-table-row-selected > td,
        .ci-run-review-table
          .ant-table-tbody
          > tr.ant-table-row-selected:hover
          > td {
          background: #f0f9ff !important;
        }
        .ci-run-review-table .ant-table-selection-column {
          text-align: center;
        }
        .ci-run-review-table .ant-pagination {
          margin: 12px !important;
        }
      `}</style>
    </section>
  );
};
export default RunReviewTable;
