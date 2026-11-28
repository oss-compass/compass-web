import {
  DownOutlined,
  HistoryOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import PainTrackingStatusButton from '../../../components/PainTrackingStatusButton';
import { getTrackingStatusMeta } from '../../../IssueContribution/components/PainTrackingModal/constants';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import {
  Alert,
  Button,
  Modal,
  Select,
  Space,
  Steps,
  Table,
  Tag,
  type InputRef,
} from 'antd';
import type { CiDimKey, CiPri, CiProblem, CiRepoKey } from '../../types';
import { DIM_NAME, formatProblemEvidence } from '../../helpers';
import PainHandlingPanel, { OperatorField } from './PainHandlingPanel';
import RunReviewTable, { usePainRunReviews } from './RunReviewTable';
import ResponsiblePartyField from './ResponsiblePartyField';
import { useTrackingOperator } from '../../../IssueContribution/components/PainTrackingModal/hooks';
import {
  formatTrackingTime,
  validateOperator,
} from '../../../IssueContribution/components/PainTrackingModal/utils';
import { fetchTrackings, saveTracking, TrackingApiError } from './api';
import { ACTION_LABELS, STATUS_META, trackingProblemKey } from './model';
import type {
  ResponsibleParty,
  TrackingAction,
  TrackingRecord,
  TrackingScope,
  TrackingStatus,
} from './model';

type TrackingContextValue = {
  records: Record<string, TrackingRecord>;
  ready: boolean;
  loading: boolean;
  open: (problem: CiProblem) => void;
  showAllProblems: () => void;
};
const TrackingContext = createContext<TrackingContextValue | null>(null);
export const useCiPainListNavigation = () =>
  useContext(TrackingContext)?.showAllProblems;

const getResponsibleParty = (problem: CiProblem, record?: TrackingRecord) =>
  record?.responsibleParty || problem.responsible_party?.trim() || '—';

export const useCiResponsibleParty = () => {
  const context = useContext(TrackingContext);
  return (problem: CiProblem) =>
    getResponsibleParty(problem, context?.records[trackingProblemKey(problem)]);
};

const ACTION_SUCCESS_MESSAGES: Record<TrackingAction, string> = {
  confirm: '已确认有效问题',
  mark_invalid: '已判定为非有效问题',
  restore_valid: '已恢复为有效问题',
  reset: '已回退到「待确认」',
  change_responsible_party: '责任方已更新',
};

/** 放在可折叠按钮外，防止嵌套 button。所有入口共用报告级状态。 */
export const CiPainTrackingButton: React.FC<{ problem: CiProblem }> = ({
  problem,
}) => {
  const context = useContext(TrackingContext);
  if (!context) return null;
  const status =
    context.records[trackingProblemKey(problem)]?.status ?? 'pending';
  const meta = getTrackingStatusMeta(
    { pending: 1, confirmed: 2, fixed: 5, invalid: 6 }[status],
    'fix',
    STATUS_META[status].label
  );
  return (
    <PainTrackingStatusButton
      label={
        context.ready
          ? meta.label
          : context.loading
          ? '状态加载中'
          : '状态加载失败'
      }
      className={
        context.ready
          ? meta.className
          : 'border-dashed border-slate-300 bg-slate-50 text-slate-400'
      }
      pending={context.ready && status === 'pending'}
      disabled={!context.ready}
      actionLabel={null}
      title={
        context.ready
          ? '点击状态管理该痛点'
          : context.loading
          ? '正在加载痛点状态'
          : '请在痛点问题列表中重试加载'
      }
      onClick={() => context.open(problem)}
    />
  );
};

export const findStepTime = (
  record: TrackingRecord | undefined,
  state: TrackingStatus
) => {
  if (!record || record.status === 'pending') {
    return undefined;
  }
  if (state === 'fixed') return record.observation?.fixedOn ?? undefined;
  const lastResetIndex = record.history
    .map((entry) => entry.action === 'reset' && entry.to === 'pending')
    .lastIndexOf(true);
  const history = record.history.slice(lastResetIndex + 1).reverse();
  if (state === 'pending') {
    return history.find(
      (entry) => entry.from === 'pending' && entry.to !== 'pending'
    )?.at;
  }
  if (state === 'confirmed' && record.status === 'invalid') return undefined;
  if (state === 'invalid' && record.status !== 'invalid') return undefined;
  return history.find(
    (entry) =>
      entry.to === state &&
      entry.from !== entry.to &&
      entry.action !== 'undo_fixed'
  )?.at;
};

const CiTrackingSteps: React.FC<{
  status: TrackingStatus;
  record?: TrackingRecord;
}> = ({ status, record }) => (
  <div className="rounded-lg bg-slate-50 p-4 sm:p-3">
    <Steps
      size="small"
      className="pain-steps"
      current={status === 'pending' ? 0 : status === 'fixed' ? 2 : 1}
      items={(status === 'invalid'
        ? [
            { title: '待确认', state: 'pending' },
            { title: '非有效问题', state: 'invalid' },
          ]
        : [
            { title: '待确认', state: 'pending' },
            { title: STATUS_META.confirmed.label, state: 'confirmed' },
            { title: STATUS_META.fixed.label, state: 'fixed' },
          ]
      ).map(({ state, ...item }) => {
        const at = findStepTime(record, state as TrackingStatus);
        return {
          ...item,
          description: at ? (
            <span
              aria-label={`${item.title}时间`}
              className="text-xs text-slate-500"
            >
              {state === 'fixed' ? at : formatTrackingTime(at)}
            </span>
          ) : null,
        };
      })}
    />
  </div>
);

const PainInformation: React.FC<{
  problem: CiProblem;
  scope: TrackingScope;
  responsiblePartyField: React.ReactNode;
}> = ({ problem, scope, responsiblePartyField }) => {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 rounded-lg border border-rose-100 bg-rose-50/80 px-4 py-3"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id={headingId} className="text-sm font-semibold text-rose-900">
          痛点信息
        </h2>
        <span className="min-w-0 break-words text-xs text-rose-700">
          {[scope.org, scope.repo].filter(Boolean).join(' / ')} · {scope.day} ·{' '}
          {scope.workflow}
        </span>
      </header>
      <div className="mt-2 break-words text-sm leading-relaxed text-rose-800">
        <p className="font-semibold">{problem.kb}</p>
        <p>{problem.title}</p>
      </div>
      {responsiblePartyField}
      <details
        open={problem.runs.length === 0}
        className="mt-2.5 rounded-lg border border-rose-100 bg-white/70 px-3 py-1.5 text-sm leading-6"
      >
        <summary className="cursor-pointer rounded font-medium text-slate-700">
          报告判断依据
        </summary>
        <div className="mt-2 space-y-2 break-words border-t border-rose-100 pt-2 text-slate-600">
          <p>原报告归因：{problem.owner || '待确认'}</p>
          <p className="whitespace-pre-wrap">
            {problem.root.cause || '原因待确认'}
          </p>
          {problem.root.evidence?.length ? (
            <ul className="list-disc space-y-1 pl-5">
              {problem.root.evidence.map((item, index) => (
                <li key={index}>{formatProblemEvidence(item)}</li>
              ))}
            </ul>
          ) : null}
          {problem.root.guess ? <p>未确认推测：{problem.root.guess}</p> : null}
          {problem.root.action ? <p>建议：{problem.root.action}</p> : null}
        </div>
      </details>
    </section>
  );
};

export const CiPainTrackingProvider: React.FC<{
  scope: TrackingScope;
  repo: CiRepoKey;
  problems: CiProblem[];
  activeDimension?: CiDimKey | null;
  activePriority?: CiPri | null;
  onResetFilters?: () => void;
  onProblemJump?: (problem: CiProblem) => void;
  children: React.ReactNode;
}> = ({
  scope,
  repo,
  problems,
  activeDimension = null,
  activePriority = null,
  onResetFilters,
  onProblemJump,
  children,
}) => {
  const [records, setRecords] = useState<Record<string, TrackingRecord>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState<CiProblem | null>(null);
  const [filter, setFilter] = useState<TrackingStatus | 'all'>('all');
  const listRef = useRef<HTMLElement>(null);
  const [listJump, setListJump] = useState(0);
  const showAllProblems = () => {
    onResetFilters?.();
    setFilter('all');
    setListJump((value) => value + 1);
  };
  useEffect(() => {
    if (listJump === 0) return;
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [listJump]);
  const [retry, setRetry] = useState(0);
  const [reason, setReason] = useState('');
  const [actionError, setActionError] = useState('');
  const [partyError, setPartyError] = useState('');
  const [operatorError, setOperatorError] = useState('');
  const operatorInput = useRef<InputRef>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const mounted = useRef(true);
  const { operator, setOperator, rememberOperator, restoreOperator } =
    useTrackingOperator();
  // 父级按完整 scope 设 key；仓库/日期变化立即销毁弹窗与在途读取。
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const scopeString = JSON.stringify(scope);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadError('');
    fetchTrackings(JSON.parse(scopeString) as TrackingScope, controller.signal)
      .then(({ items }) => {
        if (!controller.signal.aborted)
          setRecords(
            Object.fromEntries(items.map((item) => [item.problemKey, item]))
          );
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setLoadError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [scopeString, retry]);

  const ready = !loading && !loadError;
  const open = useCallback(
    (problem: CiProblem) => {
      restoreOperator();
      setSelected(problem);
      setHistoryOpen(false);
      setReason('');
      setActionError('');
      setPartyError('');
      setOperatorError('');
    },
    [restoreOperator]
  );
  const record = selected ? records[trackingProblemKey(selected)] : undefined;
  const status = record?.status ?? 'pending';
  const reviewState = usePainRunReviews(selected ?? undefined);
  const {
    complete: reviewComplete,
    context: reviewContext,
    rows: reviewRows,
  } = reviewState;
  const operatorIssue = validateOperator(operator);
  const showOperatorError = (message: string) => {
    setOperatorError(message);
    if (message) operatorInput.current?.focus();
  };
  const performAction = async (
    nextAction: TrackingAction,
    nextReason = '',
    nextParty?: ResponsibleParty
  ): Promise<boolean> => {
    if (!selected || !ready || savingRef.current) return false;
    const changingParty = nextAction === 'change_responsible_party';
    const updateError = changingParty ? setPartyError : setActionError;
    const invalidOperator = validateOperator(operator);
    if (invalidOperator) {
      showOperatorError(
        invalidOperator === '请填写提交人'
          ? changingParty
            ? '请先填写提交人，再更改责任方'
            : '请先填写提交人，再进行痛点判定'
          : invalidOperator
      );
      return false;
    }
    if (!reviewComplete && nextAction !== 'reset' && !changingParty) {
      setActionError('请先完成全部判据审核');
      return false;
    }
    if (nextAction === 'mark_invalid' && !nextReason.trim()) {
      setActionError('判为非有效问题时请填写判断依据');
      return false;
    }
    savingRef.current = true;
    setSaving(true);
    updateError('');
    try {
      const { data } = await saveTracking({
        ...scope,
        problemKey: trackingProblemKey(selected),
        type: nextAction,
        operator: operator.trim(),
        reason: nextReason.trim(),
        revision: record?.revision ?? 0,
        ...(nextParty && { responsibleParty: nextParty }),
      });
      rememberOperator(operator);
      if (!mounted.current) return;
      setRecords((current) => ({ ...current, [data.problemKey]: data }));
      if (!changingParty) setReason('');
      const message = ACTION_SUCCESS_MESSAGES[nextAction];
      toast.success(
        nextAction === 'confirm' || nextAction === 'restore_valid'
          ? `${message}，当前状态为「${STATUS_META[data.status].label}」`
          : message
      );
      return true;
    } catch (error) {
      if (!mounted.current) return;
      const errorMessage =
        error instanceof Error ? error.message : '保存失败，请重试';
      updateError(errorMessage);
      toast.error(errorMessage);
      if (error instanceof TrackingApiError && error.status === 409) {
        setRetry((value) => value + 1);
        if (!changingParty) {
          setReason('');
          void reviewContext?.retry();
        }
      }
      return false;
    } finally {
      savingRef.current = false;
      if (mounted.current) setSaving(false);
    }
  };
  const scopedProblems = problems.filter(
    (problem) =>
      (!activeDimension || problem.dimkey === activeDimension) &&
      (!activePriority || problem.pri === activePriority)
  );
  const visibleProblems = scopedProblems.filter(
    (problem) =>
      filter === 'all' ||
      (ready &&
        (records[trackingProblemKey(problem)]?.status ?? 'pending') === filter)
  );
  const count = (value: TrackingStatus) =>
    scopedProblems.filter(
      (problem) =>
        (records[trackingProblemKey(problem)]?.status ?? 'pending') === value
    ).length;

  return (
    <TrackingContext.Provider
      value={{ records, ready: Boolean(ready), loading, open, showAllProblems }}
    >
      {children}
      <section
        ref={listRef}
        id="ci-report-problems"
        aria-label="痛点问题"
        className="ci-pain-management scroll-mt-24 rounded-xl border border-slate-200 bg-white p-6 md:p-4"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">痛点问题</h2>
            <span aria-live="polite" className="text-sm text-slate-500">
              {visibleProblems.length} 项
            </span>
            {activeDimension ? <Tag>{DIM_NAME[activeDimension]}</Tag> : null}
            {activePriority ? <Tag>{activePriority}</Tag> : null}
            {activeDimension || activePriority || filter !== 'all' ? (
              <button
                type="button"
                onClick={() => {
                  onResetFilters?.();
                  setFilter('all');
                }}
                className="rounded text-sm text-blue-600 hover:underline focus-visible:outline-blue-600"
              >
                重置筛选
              </button>
            ) : null}
          </div>
          <Space wrap>
            <Select
              aria-label="筛选痛点处理状态"
              value={filter}
              onChange={setFilter}
              className="min-w-[200px]"
              options={[
                { value: 'all', label: `全部（${scopedProblems.length}）` },
                ...Object.entries(STATUS_META).map(([value, meta]) => ({
                  value,
                  label: `${meta.label}${
                    ready ? `（${count(value as TrackingStatus)}）` : ''
                  }`,
                })),
              ]}
            />
            <Button
              className="ci-pain-refresh !rounded-[10px]"
              loading={loading}
              disabled={saving}
              onClick={() => setRetry((value) => value + 1)}
            >
              刷新状态
            </Button>
          </Space>
        </div>
        {loadError ? (
          <Alert
            type="error"
            showIcon
            message="痛点状态加载失败"
            description={loadError}
            action={
              <Button
                className="!rounded-[10px]"
                onClick={() => setRetry((value) => value + 1)}
              >
                重试
              </Button>
            }
          />
        ) : null}
        <Table<CiProblem>
          key={`${activeDimension}:${activePriority}:${filter}:${listJump}`}
          rowKey={trackingProblemKey}
          loading={loading}
          size="middle"
          tableLayout="fixed"
          scroll={{ x: 960 }}
          pagination={{
            pageSize: 10,
            hideOnSinglePage: true,
            showSizeChanger: false,
          }}
          dataSource={visibleProblems}
          locale={{
            emptyText: problems.length
              ? '没有符合筛选条件的问题'
              : '当日暂无问题',
          }}
          columns={[
            {
              title: '优先级',
              dataIndex: 'pri',
              width: 100,
              sorter: (a, b) => a.pri.localeCompare(b.pri),
              render: (value: string) => (
                <Tag color={value === 'P0' ? 'red' : 'orange'}>{value}</Tag>
              ),
            },
            {
              title: '问题',
              dataIndex: 'title',
              render: (value: string, problem) => (
                <button
                  type="button"
                  onClick={() => open(problem)}
                  className="block w-full rounded text-left text-sm leading-6 text-slate-800 hover:text-blue-600 focus-visible:outline-blue-600"
                >
                  <span className="block font-medium">{problem.kb}</span>
                  <span className="mt-1 line-clamp-2 text-slate-500">
                    {value}
                  </span>
                </button>
              ),
            },
            {
              title: '步骤',
              width: 150,
              render: (_, problem) => {
                const label =
                  problem.seg_cross?.join('、') || problem.seg || '跨段/未映射';
                return onProblemJump ? (
                  <button
                    type="button"
                    onClick={() => onProblemJump(problem)}
                    aria-label={`定位步骤：${label}`}
                    className="rounded text-left text-sm text-blue-600 hover:underline focus-visible:outline-blue-600"
                  >
                    {label}
                  </button>
                ) : (
                  label
                );
              },
            },
            {
              title: '责任方',
              width: 120,
              render: (_, problem) =>
                getResponsibleParty(
                  problem,
                  records[trackingProblemKey(problem)]
                ),
            },
            {
              title: '责任人',
              width: 120,
              render: (_, problem) => problem.responsible_person?.trim() || '—',
            },
            {
              title: '处理状态',
              width: 210,
              render: (_, problem) => (
                <CiPainTrackingButton problem={problem} />
              ),
            },
          ]}
        />
      </section>

      <Modal
        open={Boolean(selected)}
        className="ci-pain-management-modal"
        title={
          <span className="text-base font-semibold text-slate-800">
            痛点管理
          </span>
        }
        width="calc(100vw - 32px)"
        style={{ maxWidth: 1280 }}
        destroyOnHidden
        styles={{
          body: { height: '70vh', overflowY: 'auto', paddingRight: '8px' },
        }}
        footer={null}
        maskClosable={!saving}
        closable={!saving}
        keyboard={!saving}
        onCancel={() => {
          if (!savingRef.current) setSelected(null);
        }}
      >
        {selected ? (
          <div className="space-y-4">
            {ready ? <CiTrackingSteps status={status} record={record} /> : null}
            <PainInformation
              problem={selected}
              scope={scope}
              responsiblePartyField={
                <ResponsiblePartyField
                  key={trackingProblemKey(selected)}
                  current={getResponsibleParty(selected, record)}
                  disabled={saving || !ready}
                  operatorReady={!operatorIssue}
                  error={partyError}
                  clearError={() => setPartyError('')}
                  onSave={(party) =>
                    performAction('change_responsible_party', '', party)
                  }
                />
              }
            />
            {ready && record?.observation && (
              <div className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700">
                <p className="font-medium">
                  {record.status === 'fixed'
                    ? '已达到修复条件'
                    : `观测进度 ${record.observation.cleanDays}/${record.observation.daysRequired} 天`}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  最近出现于 {record.observation.lastSeenDay}。连续{' '}
                  {record.observation.daysRequired}{' '}
                  天的完整日报未检出后自动标记为已修复，再次检出后恢复进行中。
                </p>
              </div>
            )}
            {!ready && (
              <Alert
                type={loading ? 'info' : 'error'}
                showIcon
                message={loading ? '处理状态加载中' : '处理状态暂不可用'}
                description={loadError || undefined}
                action={
                  <Button
                    loading={loading}
                    onClick={() => setRetry((value) => value + 1)}
                  >
                    重新加载状态
                  </Button>
                }
              />
            )}
            <PainHandlingPanel
              key={`handling:${trackingProblemKey(selected)}`}
              reviewComplete={reviewComplete}
              operatorReady={!operatorIssue}
              ready={ready}
              status={status}
              reason={reason}
              saving={saving}
              error={actionError}
              operatorField={
                <OperatorField
                  inputRef={operatorInput}
                  value={operator}
                  error={operatorError}
                  disabled={saving || !ready}
                  onChange={(value) => {
                    setOperator(value);
                    if (operatorError)
                      setOperatorError(validateOperator(value) || '');
                  }}
                  onBlur={() => {
                    if (operator.trim()) setOperatorError(operatorIssue || '');
                  }}
                />
              }
              onReasonChange={(value) => {
                setReason(value);
                if (actionError) setActionError('');
              }}
              onAction={performAction}
              runReview={
                reviewRows.length ? (
                  <RunReviewTable
                    key={trackingProblemKey(selected)}
                    problem={selected}
                    reviewState={reviewState}
                    scope={scope}
                    operator={operator}
                    busy={saving || !ready || Boolean(operatorIssue)}
                    onBusy={(value) => {
                      savingRef.current = value;
                      if (mounted.current) setSaving(value);
                    }}
                    onOperatorInvalid={showOperatorError}
                    rememberOperator={rememberOperator}
                  />
                ) : null
              }
            />
            {record?.history.length ? (
              <div>
                <button
                  type="button"
                  aria-expanded={historyOpen}
                  onClick={() => setHistoryOpen((value) => !value)}
                  className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-left text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100"
                >
                  <HistoryOutlined className="text-slate-500" />
                  <span>操作记录</span>
                  <span className="font-normal text-slate-400">
                    共 {record.history.length} 条
                  </span>
                  <DownOutlined
                    className={`ml-auto text-[11px] text-slate-400 transition-transform ${
                      historyOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {historyOpen ? (
                  <div className="mt-2 overflow-hidden rounded-xl border border-slate-200">
                    <Table
                      size="small"
                      rowKey={(_, index) => String(index)}
                      dataSource={[...(record?.history ?? [])].reverse()}
                      pagination={{
                        pageSize: 5,
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                      }}
                      scroll={{ x: 650 }}
                      columns={[
                        {
                          title: '时间',
                          dataIndex: 'at',
                          render: formatTrackingTime,
                          width: 150,
                        },
                        { title: '提交人', dataIndex: 'operator', width: 110 },
                        {
                          title: '操作',
                          dataIndex: 'action',
                          render: (value: keyof typeof ACTION_LABELS) =>
                            ACTION_LABELS[value],
                          width: 140,
                        },
                        {
                          title: '变更后状态',
                          dataIndex: 'to',
                          render: (value: TrackingStatus) =>
                            STATUS_META[value].label,
                          width: 170,
                        },
                        {
                          title: '依据 / 说明',
                          dataIndex: 'reason',
                          render: (
                            value: string,
                            entry: TrackingRecord['history'][number]
                          ) =>
                            entry.toParty
                              ? `${entry.fromParty || '未指定'} → ${
                                  entry.toParty
                                }`
                              : value,
                        },
                      ]}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
      <style jsx global>{`
        .ci-pain-management .ci-pain-refresh.ant-btn,
        .ci-pain-management .ant-select-selector,
        :is(.ci-pain-management-modal, .ci-pain-invalid-modal)
          :is(
            .ant-btn,
            .ant-input,
            .ant-input-affix-wrapper,
            .ant-select-selector
          ),
        .ci-pain-management-modal .ant-pagination-options-quick-jumper input {
          border-radius: 8px !important;
          box-shadow: none !important;
        }
        .ci-pain-management-modal .ant-input:focus-visible,
        .ci-pain-invalid-modal .ant-input:focus-visible {
          outline: 2px solid #60a5fa;
          outline-offset: 2px;
        }
        .ci-pain-management-modal
          .pain-steps.ant-steps.ant-steps-vertical
          .ant-steps-item-content {
          min-height: 36px;
        }
        .ci-pain-management-modal
          .pain-steps.ant-steps.ant-steps-vertical.ant-steps-small
          .ant-steps-item-tail {
          padding-block: 26px 2px;
        }
      `}</style>
    </TrackingContext.Provider>
  );
};
