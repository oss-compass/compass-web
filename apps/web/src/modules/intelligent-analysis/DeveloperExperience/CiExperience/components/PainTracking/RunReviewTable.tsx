import React, { useRef, useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Empty,
  Input,
  Modal,
  Progress,
  Table,
  Tooltip,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import type { CiProblem, CiRun } from '../../types';
import type { TrackingRecord, TrackingScope } from './model';
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
  scope: TrackingScope;
  operator: string;
  operatorField: React.ReactNode;
  busy: boolean;
  onBusy: (value: boolean) => void;
  onOperatorInvalid: (message: string) => void;
  rememberOperator: (value: string) => string;
  onTracking: (record: TrackingRecord) => void;
};

const RunReviewTable: React.FC<Props> = ({
  problem,
  scope,
  operator,
  operatorField,
  busy,
  onBusy,
  onOperatorInvalid,
  rememberOperator,
  onTracking,
}) => {
  const repositoryUrl = useCiRepositoryUrl();
  const context = useCiRuleReviews();
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
  const reviews =
    context?.rows.filter((row) => sameReviewProblem(row, problem)) || [];
  const occurrences = new Map<string, number>();
  const rows: RunRow[] = problem.runs.map((run, index) => {
    const key = JSON.stringify([run.id, run.stage, run.job]);
    const occurrence = occurrences.get(key) || 0;
    occurrences.set(key, occurrence + 1);
    const review = reviews.filter(
      (item) =>
        item.run.id === run.id &&
        item.run.stage === run.stage &&
        item.run.job === run.job
    )[occurrence];
    return { key: review?.instance_id || `${key}:${index}`, run, review };
  });
  const completed = reviews.filter(
    (row) => row.status === 'confirmed' || row.status === 'incorrect'
  ).length;
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
    if (!row.review || submitting.current || busy) return;
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
      const result = await savePainRunReview({
        ...scope,
        problemKey: trackingProblemKey(problem),
        instance_id: row.review.instance_id,
        evidence_revision: expected.evidence_revision,
        revision: expected.revision,
        action,
        operator: rememberOperator(operator),
        reason: action === 'confirmed' ? '' : reason.trim(),
      });
      if (result.tracking) onTracking(result.tracking);
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
    <section className="space-y-4" aria-label="逐条判据审核">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <span>涉及执行记录</span>
        <span className="font-normal text-slate-400">共 {rows.length} 条</span>
      </div>
      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Tooltip title="判据由 AI 生成，请核对判据内容；如有误，请填写原因及建议修正内容。">
              <InfoCircleOutlined className="text-amber-500" />
            </Tooltip>
            {rows.length > 0 && completed === rows.length
              ? '已完成全部判据审核'
              : '待确认：请逐条审核判据'}
          </div>
          <span className="shrink-0 text-sm font-semibold text-amber-600">
            {completed}/{rows.length}
          </span>
        </div>
        <Progress
          aria-label="判据审核完成进度"
          percent={
            rows.length ? Math.round((completed / rows.length) * 100) : 0
          }
          showInfo={false}
          className="!mb-0 mt-2"
          strokeColor="#f59e0b"
          size={['100%', 6]}
        />
      </div>
      {context?.error || !context ? (
        <Alert
          type="error"
          showIcon
          message="执行记录判据与审核状态读取失败"
          action={<Button onClick={() => void context?.retry()}>重试</Button>}
        />
      ) : null}
      {error ? <Alert type="error" showIcon message={error} /> : null}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <RunBatchReview
          scope={scope}
          operatorField={operatorField}
          completed={completed}
          total={rows.length}
          problemKey={trackingProblemKey(problem)}
          selected={selectedReviews}
          pending={pendingReviews}
          busy={busy}
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
          onTracking={onTracking}
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
                title={`全选所有页，共 ${
                  rows.filter((row) => row.review).length
                } 条`}
              >
                <Checkbox
                  aria-label="选择全部执行记录"
                  disabled={busy || Boolean(context?.error)}
                  checked={
                    selectedReviews.length > 0 &&
                    selectedReviews.length ===
                      rows.filter((row) => row.review).length
                  }
                  indeterminate={
                    selectedReviews.length > 0 &&
                    selectedReviews.length <
                      rows.filter((row) => row.review).length
                  }
                  onChange={(event) =>
                    setSelectedIds(
                      event.target.checked
                        ? rows.filter((row) => row.review).map((row) => row.key)
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
              disabled: busy || !row.review || Boolean(context?.error),
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
              render: (_, row) => (
                <a
                  href={runURL(repositoryUrl, row.run.id)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-sky-600 hover:underline"
                >
                  #{row.run.n}
                </a>
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
                    row.review?.status === 'confirmed'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : row.review?.status === 'incorrect'
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-amber-200 bg-amber-50 text-amber-600'
                  }`}
                >
                  {row.review ? runReviewLabels[row.review.status] : '待确认'}
                </span>
              ),
            },
            {
              title: (
                <span className="flex items-center gap-1.5">
                  <span>判据审核</span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-amber-600">
                    必填
                  </span>
                </span>
              ),
              width: 174,
              render: (_, row) => (
                <RunDecisionCell
                  review={row.review}
                  runNumber={row.run.n}
                  loadingAction={
                    activeSubmission?.key === row.key
                      ? activeSubmission.action
                      : undefined
                  }
                  disabled={busy || !row.review || Boolean(context?.error)}
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
        destroyOnClose
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
            执行记录 #{editing?.runNumber} ·
            请说明判据有误的原因及建议修正内容，提交后保留在审核记录中。
          </p>
          <label className="block text-sm font-medium text-slate-700">
            原因<span className="ml-1 text-rose-500">*</span>
            <Input.TextArea
              aria-label={`执行记录 #${editing?.runNumber} 原因`}
              placeholder="请说明判据有误的原因及建议修正内容"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={4}
              maxLength={500}
              disabled={busy}
              className="mt-2 !rounded-[10px]"
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
