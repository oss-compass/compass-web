import {
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DownOutlined,
  ExclamationCircleFilled,
  HistoryOutlined,
  ReloadOutlined,
  StopOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import PainTrackingStatusButton from '../../../components/PainTrackingStatusButton';
import { getTrackingStatusMeta } from '../../../IssueContribution/components/PainTrackingModal/constants';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import {
  Alert,
  Button,
  Empty,
  Input,
  Modal,
  Select,
  Space,
  Steps,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { CiProblem, CiRepoKey } from '../../types';
import { prURL, runURL } from '../../helpers';
import { useTrackingOperator } from '../../../IssueContribution/components/PainTrackingModal/hooks';
import {
  formatTrackingTime,
  validateOperator,
} from '../../../IssueContribution/components/PainTrackingModal/utils';
import { fetchTrackings, saveTracking, TrackingApiError } from './api';
import { ACTION_LABELS, STATUS_META, trackingProblemKey } from './model';
import type {
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
};
const TrackingContext = createContext<TrackingContextValue | null>(null);

const CI_PAIN_MODAL_BUTTON_STYLE: React.CSSProperties = {
  height: 36,
  paddingInline: 20,
  borderRadius: 10,
  boxShadow: 'none',
};

const ACTION_SUCCESS_MESSAGES: Record<TrackingAction, string> = {
  confirm: '已确认有效问题，进入「已确认待修复」',
  mark_invalid: '已判定为非有效问题',
  restore_valid: '已恢复为有效问题，进入「已确认待修复」',
  mark_fixed: '已记录完成修复，进入「已修复待复测」',
  undo_fixed: '已撤销修复，回到「已确认待修复」',
  reset: '已回退到「待确认」',
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
    { pending: 1, confirmed: 2, fixed: 3, invalid: 6 }[status],
    'fix'
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
          : '请在 CI 痛点管理中重试加载'
      }
      onClick={() => context.open(problem)}
    />
  );
};

export const findStepTime = (
  record: TrackingRecord | undefined,
  state: TrackingStatus | 'retest'
) => {
  if (!record || record.status === 'pending' || state === 'retest') {
    return undefined;
  }
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
  if (state === 'fixed' && record.status !== 'fixed') return undefined;
  if (state === 'invalid' && record.status !== 'invalid') return undefined;
  return history.find((entry) => entry.to === state)?.at;
};

const CiTrackingSteps: React.FC<{
  status: TrackingStatus;
  record?: TrackingRecord;
}> = ({ status, record }) => (
  <div className="rounded-lg bg-slate-50 p-4">
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
            { title: '已确认待修复', state: 'confirmed' },
            { title: '已修复待复测', state: 'fixed' },
            {
              title: '已复测通过',
              state: 'retest',
              disabled: true,
            },
          ]
      ).map(({ state, ...item }) => {
        const at = findStepTime(record, state as TrackingStatus | 'retest');
        return {
          ...item,
          description: at ? (
            <span
              aria-label={`${item.title}时间`}
              className="text-xs text-slate-500"
            >
              {formatTrackingTime(at)}
            </span>
          ) : null,
        };
      })}
    />
  </div>
);

const WORKFLOW_PANEL_META: Record<
  TrackingStatus,
  {
    eyebrow: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    shellClass: string;
    iconClass: string;
    badgeClass: string;
  }
> = {
  pending: {
    eyebrow: '第一步 · 人工确认',
    title: '这个痛点是真实存在的问题吗？',
    description:
      '请核对上方执行记录和日志。确认有效后进入修复阶段；无效时需说明判断依据。',
    icon: <ClockCircleOutlined />,
    shellClass: 'border-amber-200 bg-amber-50/50',
    iconClass: 'bg-amber-100 text-amber-700',
    badgeClass: 'border-amber-200 bg-white text-amber-700',
  },
  confirmed: {
    eyebrow: '第二步 · 处理问题',
    title: '问题已确认，请在修复后更新状态',
    description:
      '完成代码、配置或流水线修复后，在这里记录结果，随后进入待复测阶段。',
    icon: <ToolOutlined />,
    shellClass: 'border-sky-200 bg-sky-50/50',
    iconClass: 'bg-sky-100 text-sky-700',
    badgeClass: 'border-sky-200 bg-white text-sky-700',
  },
  fixed: {
    eyebrow: '第三步 · 等待验证',
    title: '修复已完成，等待重跑复测',
    description:
      '重跑功能正在接入。当前可查看修复记录，发现误操作时可撤销修复。',
    icon: <CheckCircleOutlined />,
    shellClass: 'border-violet-200 bg-violet-50/50',
    iconClass: 'bg-violet-100 text-violet-700',
    badgeClass: 'border-violet-200 bg-white text-violet-700',
  },
  invalid: {
    eyebrow: '人工判定结果',
    title: '该痛点已判定为非有效问题',
    description:
      '该问题已停止修复跟踪。如判断有误，可恢复为有效问题并重新进入修复阶段。',
    icon: <StopOutlined />,
    shellClass: 'border-slate-200 bg-slate-50/80',
    iconClass: 'bg-slate-200 text-slate-600',
    badgeClass: 'border-slate-200 bg-white text-slate-600',
  },
};

const OperatorField: React.FC<{
  operator: string;
  operatorError: string;
  saving: boolean;
  onOperatorChange: (value: string) => void;
}> = ({ operator, operatorError, saving, onOperatorChange }) => (
  <div>
    <label
      htmlFor="ci-pain-tracking-operator"
      className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600"
    >
      <UserOutlined
        className={operatorError ? 'text-rose-500' : 'text-slate-400'}
      />
      提交人<span className="text-rose-500">*</span>
    </label>
    <Input
      id="ci-pain-tracking-operator"
      aria-label="提交人"
      status={operatorError ? 'error' : undefined}
      className="!h-10 !rounded-[10px] !border-slate-200 !bg-white !px-3"
      value={operator}
      placeholder="请输入姓名"
      maxLength={20}
      autoComplete="off"
      disabled={saving}
      onChange={(event) => onOperatorChange(event.target.value)}
    />
    {operatorError ? (
      <div
        role="alert"
        className="mt-1.5 flex items-center gap-1 text-xs text-rose-500"
      >
        <ExclamationCircleFilled />
        <span>{operatorError}</span>
      </div>
    ) : null}
  </div>
);

const StatusWorkflowPanel: React.FC<{
  status: TrackingStatus;
  operator: string;
  operatorError: string;
  reason: string;
  saving: boolean;
  ready: boolean;
  onOperatorChange: (value: string) => void;
  onReasonChange: (value: string) => void;
  onAction: (action: TrackingAction, reason?: string) => void;
  onInvalid: () => void;
}> = ({
  status,
  operator,
  operatorError,
  reason,
  saving,
  ready,
  onOperatorChange,
  onReasonChange,
  onAction,
  onInvalid,
}) => {
  const meta = WORKFLOW_PANEL_META[status];
  const disabled = !ready || saving;
  return (
    <section
      className={`overflow-hidden rounded-2xl border ${meta.shellClass}`}
    >
      <div className="flex items-start gap-3 border-b border-black/5 px-5 py-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${meta.iconClass}`}
        >
          {meta.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {meta.eyebrow}
          </div>
          <div className="mt-0.5 text-base font-semibold text-slate-900">
            {meta.title}
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {meta.description}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${meta.badgeClass}`}
        >
          {STATUS_META[status].label}
        </span>
      </div>

      <div className="grid gap-4 bg-white/70 p-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <OperatorField
          operator={operator}
          operatorError={operatorError}
          saving={saving}
          onOperatorChange={onOperatorChange}
        />

        {status === 'pending' ? (
          <div>
            <div className="mb-1.5 text-xs font-semibold text-slate-600">
              是否为有效问题
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onAction('confirm')}
                className="group flex min-h-[78px] cursor-pointer items-center gap-3 rounded-[10px] border border-emerald-200 bg-emerald-50/70 px-4 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckOutlined />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    是，有效问题
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    确认并进入待修复
                  </span>
                </span>
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={onInvalid}
                className="group flex min-h-[78px] cursor-pointer items-center gap-3 rounded-[10px] border border-slate-200 bg-white px-4 text-left transition-all hover:border-rose-200 hover:bg-rose-50/60 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-hover:bg-rose-100 group-hover:text-rose-600">
                  <CloseOutlined />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    否，非有效问题
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    填写依据后结束跟踪
                  </span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-semibold text-slate-600">
                {status === 'confirmed'
                  ? '修复说明（选填）'
                  : '操作说明（选填）'}
              </span>
              <Input.TextArea
                aria-label="判断依据或修复说明"
                value={reason}
                maxLength={500}
                rows={2}
                disabled={saving}
                onChange={(event) => onReasonChange(event.target.value)}
                className="mt-1.5 !rounded-[10px] !border-slate-200 !bg-white"
                placeholder={
                  status === 'confirmed'
                    ? '可填写修复内容、PR 或工单链接'
                    : '可填写本次状态调整的原因'
                }
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {status === 'confirmed' ? (
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  aria-label="完成修复"
                  loading={saving}
                  disabled={!ready}
                  className="!h-9 !rounded-[10px] !px-5"
                  onClick={() => onAction('mark_fixed', reason)}
                >
                  完成修复
                </Button>
              ) : null}
              {status === 'fixed' ? (
                <Tooltip title="重跑能力正在接入">
                  <span>
                    <Button
                      icon={<ReloadOutlined />}
                      aria-label="重跑（暂未开放）"
                      disabled
                      className="!h-9 !rounded-[10px]"
                    >
                      重跑（暂未开放）
                    </Button>
                  </span>
                </Tooltip>
              ) : null}
              {status === 'fixed' ? (
                <Button
                  aria-label="撤销修复"
                  disabled={disabled}
                  className="!h-9 !rounded-[10px]"
                  onClick={() => onAction('undo_fixed', reason)}
                >
                  撤销修复
                </Button>
              ) : null}
              {status === 'invalid' ? (
                <Button
                  type="primary"
                  aria-label="恢复为有效问题"
                  disabled={disabled}
                  className="!h-9 !rounded-[10px] !px-5"
                  onClick={() => onAction('restore_valid', reason)}
                >
                  恢复为有效问题
                </Button>
              ) : null}
              {status !== 'invalid' ? (
                <Button
                  danger
                  disabled={disabled}
                  className="!h-9 !rounded-[10px]"
                  onClick={onInvalid}
                >
                  判为非有效问题
                </Button>
              ) : null}
              <Button
                type="text"
                disabled={disabled}
                className="!h-9 !rounded-[10px] !text-slate-500"
                onClick={() => onAction('reset', reason)}
              >
                回退待确认
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ActionErrorAlert: React.FC<{ message: string; hidden?: boolean }> = ({
  message,
  hidden = false,
}) =>
  hidden || !message ? null : <Alert type="error" showIcon message={message} />;

export const CiPainTrackingProvider: React.FC<{
  scope: TrackingScope;
  repo: CiRepoKey;
  problems: CiProblem[];
  children: React.ReactNode;
}> = ({ scope, repo, problems, children }) => {
  const [records, setRecords] = useState<Record<string, TrackingRecord>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState<CiProblem | null>(null);
  const [filter, setFilter] = useState<TrackingStatus | 'all'>('all');
  const [retry, setRetry] = useState(0);
  const [reason, setReason] = useState('');
  const [actionError, setActionError] = useState('');
  const [operatorError, setOperatorError] = useState('');
  const [invalidReasonOpen, setInvalidReasonOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const mounted = useRef(true);
  const { operator, setOperator, rememberOperator } = useTrackingOperator();
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
  const open = useCallback((problem: CiProblem) => {
    setSelected(problem);
    setHistoryOpen(false);
    setReason('');
    setActionError('');
    setOperatorError('');
    setInvalidReasonOpen(false);
  }, []);
  const record = selected ? records[trackingProblemKey(selected)] : undefined;
  const status = record?.status ?? 'pending';
  const performAction = async (
    nextAction: TrackingAction,
    nextReason = ''
  ): Promise<boolean> => {
    if (!selected || !ready || savingRef.current) return false;
    const invalidOperator = validateOperator(operator);
    if (invalidOperator) {
      setOperatorError(
        invalidOperator === '请填写提交人'
          ? '请先填写提交人，再进行痛点判定'
          : invalidOperator
      );
      return false;
    }
    if (nextAction === 'mark_invalid' && !nextReason.trim()) {
      setActionError('判为非有效问题时请填写判断依据');
      return false;
    }
    savingRef.current = true;
    setSaving(true);
    setActionError('');
    try {
      const { data } = await saveTracking({
        ...scope,
        problemKey: trackingProblemKey(selected),
        type: nextAction,
        operator: rememberOperator(operator),
        reason: nextReason.trim(),
        revision: record?.revision ?? 0,
      });
      if (!mounted.current) return;
      setRecords((current) => ({ ...current, [data.problemKey]: data }));
      setReason('');
      setInvalidReasonOpen(false);
      toast.success(ACTION_SUCCESS_MESSAGES[nextAction]);
      return true;
    } catch (error) {
      if (!mounted.current) return;
      const errorMessage =
        error instanceof Error ? error.message : '保存失败，请重试';
      setActionError(errorMessage);
      toast.error(errorMessage);
      if (error instanceof TrackingApiError && error.status === 409) {
        setInvalidReasonOpen(false);
        setReason('');
        setRetry((value) => value + 1);
      }
      return false;
    } finally {
      savingRef.current = false;
      if (mounted.current) setSaving(false);
    }
  };
  const requestInvalidDecision = () => {
    const invalidOperator = validateOperator(operator);
    if (invalidOperator) {
      setOperatorError(
        invalidOperator === '请填写提交人'
          ? '请先填写提交人，再进行痛点判定'
          : invalidOperator
      );
      return;
    }
    setOperatorError('');
    setActionError('');
    setReason('');
    setInvalidReasonOpen(true);
  };
  const count = (value: TrackingStatus) =>
    problems.filter(
      (problem) =>
        (records[trackingProblemKey(problem)]?.status ?? 'pending') === value
    ).length;

  return (
    <TrackingContext.Provider
      value={{ records, ready: Boolean(ready), loading, open }}
    >
      {children}
      <section className="ci-pain-management rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              CI 痛点管理
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {scope.day} · 逐项确认是否为有效问题，修复后手动标记完成。
            </p>
          </div>
          <Space wrap>
            <Select
              aria-label="筛选痛点处理状态"
              value={filter}
              onChange={setFilter}
              className="min-w-[200px]"
              options={[
                { value: 'all', label: `全部（${problems.length}）` },
                ...Object.entries(STATUS_META).map(([value, meta]) => ({
                  value,
                  label: `${meta.label}${
                    ready ? `（${count(value as TrackingStatus)}）` : ''
                  }`,
                })),
              ]}
            />
            <Button
              className="!rounded-[10px]"
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
          rowKey={trackingProblemKey}
          loading={loading}
          size="middle"
          scroll={{ x: 900 }}
          pagination={{
            pageSize: 10,
            hideOnSinglePage: true,
            showSizeChanger: false,
          }}
          dataSource={problems.filter(
            (problem) =>
              filter === 'all' ||
              (ready &&
                (records[trackingProblemKey(problem)]?.status ?? 'pending') ===
                  filter)
          )}
          columns={[
            {
              title: '优先级',
              dataIndex: 'pri',
              width: 90,
              render: (value: string) => (
                <Tag color={value === 'P0' ? 'red' : 'orange'}>{value}</Tag>
              ),
            },
            {
              title: '痛点问题',
              dataIndex: 'title',
              render: (value: string, problem) => (
                <div>
                  <div className="font-medium text-slate-800">{problem.kb}</div>
                  <div className="mt-1 text-sm text-slate-500">{value}</div>
                </div>
              ),
            },
            {
              title: '步骤',
              width: 140,
              render: (_, problem) =>
                problem.seg_cross?.join('、') || problem.seg || '未定位步骤',
            },
            {
              title: '影响范围',
              width: 150,
              render: (_, problem) =>
                `${problem.impact.runs} 次执行 / ${problem.impact.prs} 个 PR`,
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
        destroyOnClose
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
          <div className="space-y-6">
            <CiTrackingSteps status={status} record={record} />
            <div className="rounded-lg border border-rose-100 bg-rose-50/80 px-3.5 py-3">
              <div className="text-sm font-semibold leading-6 text-slate-900">
                {selected.kb}
              </div>
              <div className="mt-0.5 text-xs leading-5 text-slate-500">
                {selected.title}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {scope.org} / {scope.repo} · {scope.day} · {scope.workflow}
              </div>
            </div>
            <StatusWorkflowPanel
              status={status}
              operator={operator}
              operatorError={operatorError}
              reason={reason}
              saving={saving}
              ready={ready}
              onOperatorChange={(value) => {
                setOperator(value);
                if (value.trim()) setOperatorError('');
              }}
              onReasonChange={setReason}
              onAction={(nextAction, nextReason) =>
                void performAction(nextAction, nextReason)
              }
              onInvalid={requestInvalidDecision}
            />
            {loadError ? <Alert type="error" message={loadError} /> : null}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="font-medium">判断依据</div>
              <p className="mt-2">
                影响 {selected.impact.runs} 次执行、{selected.impact.prs} 个
                PR；原报告归因：{selected.owner || '待确认'}。
              </p>
              <p className="mt-2 whitespace-pre-wrap">
                {selected.root.cause || '原因待确认'}
              </p>
              {selected.root.evidence?.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {selected.root.evidence.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {selected.root.guess ? (
                <p className="mt-2">未确认推测：{selected.root.guess}</p>
              ) : null}
              {selected.root.action ? (
                <p className="mt-2">建议：{selected.root.action}</p>
              ) : null}
            </div>
            <Table
              size="small"
              rowKey={(run) => `${run.id}:${run.stage}:${run.job}`}
              dataSource={selected.runs}
              pagination={{
                pageSize: 5,
                hideOnSinglePage: true,
                showSizeChanger: false,
              }}
              scroll={{ x: 650 }}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="该问题未提供执行记录，请结合报告指标判断"
                  />
                ),
              }}
              columns={[
                {
                  title: '执行记录',
                  dataIndex: 'id',
                  render: (id: string, run) =>
                    id ? (
                      <a
                        href={runURL(repo, id)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        #{run.n}
                      </a>
                    ) : (
                      '—'
                    ),
                },
                {
                  title: 'PR',
                  dataIndex: 'pr',
                  render: (pr: string) =>
                    pr ? (
                      <a
                        href={prURL(repo, pr)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        #{pr}
                      </a>
                    ) : (
                      '—'
                    ),
                },
                {
                  title: '阶段 / 任务',
                  render: (_, run) => `${run.stage} / ${run.job}`,
                },
                { title: '日志摘要', dataIndex: 'msg' },
              ]}
            />
            <ActionErrorAlert
              message={actionError}
              hidden={invalidReasonOpen}
            />
            {record?.history.length ? (
              <div className="mt-6">
                <button
                  type="button"
                  aria-expanded={historyOpen}
                  onClick={() => setHistoryOpen((value) => !value)}
                  className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
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
                          render: (value: TrackingAction) =>
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
                        { title: '依据 / 说明', dataIndex: 'reason' },
                      ]}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
      <Modal
        open={invalidReasonOpen}
        className="ci-pain-invalid-modal"
        title="判定为非有效问题"
        width={480}
        centered
        destroyOnClose
        okText="确认判定"
        cancelText="取消"
        confirmLoading={saving}
        styles={{ content: { borderRadius: 16, overflow: 'hidden' } }}
        okButtonProps={{
          danger: true,
          disabled: !reason.trim(),
          style: CI_PAIN_MODAL_BUTTON_STYLE,
        }}
        cancelButtonProps={{ style: CI_PAIN_MODAL_BUTTON_STYLE }}
        maskClosable={!saving}
        closable={!saving}
        onCancel={() => {
          if (!savingRef.current) {
            setInvalidReasonOpen(false);
            setReason('');
            setActionError('');
          }
        }}
        onOk={() => void performAction('mark_invalid', reason)}
      >
        <div className="space-y-3">
          <p className="text-sm leading-6 text-slate-600">
            请填写判定依据。该记录会保留在操作历史中，后续仍可改判为有效问题。
          </p>
          <label className="block text-sm font-medium text-slate-700">
            判断依据<span className="ml-1 text-rose-500">*</span>
            <Input.TextArea
              aria-label="无效问题判断依据"
              className="mt-1 !rounded-[10px] !border-slate-300"
              value={reason}
              maxLength={500}
              showCount
              rows={4}
              disabled={saving}
              placeholder="请说明为什么该痛点不是有效问题"
              onChange={(event) => {
                setReason(event.target.value);
                if (event.target.value.trim()) setActionError('');
              }}
            />
          </label>
          {actionError ? (
            <Alert type="error" showIcon message={actionError} />
          ) : null}
        </div>
      </Modal>
      <style jsx global>{`
        .ci-pain-management .ant-select-selector,
        .ci-pain-management-modal .ant-btn,
        .ci-pain-management-modal .ant-input,
        .ci-pain-invalid-modal .ant-btn,
        .ci-pain-invalid-modal .ant-input {
          border-radius: 10px !important;
          box-shadow: none !important;
        }
      `}</style>
    </TrackingContext.Provider>
  );
};
