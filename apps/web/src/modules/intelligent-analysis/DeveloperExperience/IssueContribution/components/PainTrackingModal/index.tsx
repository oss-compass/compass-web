import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
  HistoryOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Input, Modal, Progress, Steps, Tooltip } from 'antd';
import toast from 'react-hot-toast';
import type { IssuePainRerunJob, IssuePainTracking } from '../../types';
import { IssuePainTrackingStatus } from '../../types';
import {
  cancelIssuePainRerun,
  createIssuePainRerun,
  fetchIssuePainRerun,
  fetchIssuePainReruns,
} from '../../data';
import { resolvePainIssuePriority } from '../../issuePriority';
import type { PainIssuePriority } from '../../issuePriority';
import RerunJobListModal from '../RerunJobListModal';
import {
  RERUN_STATUS_META,
  formatRerunEtaTime,
  getLockedRerunIssueNumbers,
  getMetricChangeSummary,
  getRerunEtaRangeText,
  getRerunModeLabel,
  getRerunResultLabel,
  getRerunStatusKey,
  isRerunLocked,
} from '../rerunJobPresentation';
import { IssueFixButton, TrackingHistoryTable } from './components';
import PainIssueTable, {
  InvalidDecisionReasonModal,
  useFinalIssueDecisionConfirm,
} from '../PainIssueTable';
import PainIssuePriorityFilter from '../PainIssuePriorityFilter';
import { useTrackingOperator } from './hooks';
import type { PainTrackingModalProps } from './types';
import {
  formatTrackingTime,
  shortTrackingPeriod,
  validateOperator,
} from './utils';

const getCurrentFlowStep = (
  status: IssuePainTrackingStatus,
  isObserve: boolean
) => {
  if (status === IssuePainTrackingStatus.PENDING) return 0;
  if (status === IssuePainTrackingStatus.TRACKING) return 1;
  if (status === IssuePainTrackingStatus.FIXED_PENDING_RETEST) return 2;
  if (status === IssuePainTrackingStatus.PASSED) return 3;
  if (status === IssuePainTrackingStatus.RETEST_FAILED) return 3;
  return 1;
};

const findStatusTime = (
  tracking: IssuePainTracking,
  status: IssuePainTrackingStatus
) =>
  [...tracking.history].reverse().find((item) => item.to === status)?.at ??
  null;

const createFlowItem = (title: string, time?: string | null) => ({
  title,
  description: time ? (
    <span className="text-xs text-slate-500">{formatTrackingTime(time)}</span>
  ) : null,
});

const createPendingFlowItem = (tracking: IssuePainTracking) => {
  return createFlowItem('待确认', tracking.confirmedAt);
};

const getFlowItems = (tracking: IssuePainTracking, isObserve: boolean) => {
  if (tracking.status === IssuePainTrackingStatus.INVALID) {
    const invalidAt = findStatusTime(tracking, IssuePainTrackingStatus.INVALID);
    return [
      createPendingFlowItem(tracking),
      createFlowItem('非有效问题', invalidAt),
    ];
  }
  if (isObserve) {
    return [
      createPendingFlowItem(tracking),
      createFlowItem('已确认待修复', tracking.confirmedAt),
      createFlowItem(
        '已修复待复测',
        findStatusTime(tracking, IssuePainTrackingStatus.FIXED_PENDING_RETEST)
      ),
      createFlowItem('已闭环', tracking.retest?.at),
    ];
  }
  const retestFailed =
    tracking.status === IssuePainTrackingStatus.RETEST_FAILED;
  return [
    createPendingFlowItem(tracking),
    createFlowItem('已确认待修复', tracking.confirmedAt),
    createFlowItem(
      '已修复待复测',
      findStatusTime(tracking, IssuePainTrackingStatus.FIXED_PENDING_RETEST)
    ),
    createFlowItem(
      retestFailed ? '复测不通过' : '已复测通过',
      retestFailed
        ? findStatusTime(tracking, IssuePainTrackingStatus.RETEST_FAILED)
        : tracking.retest?.at
    ),
  ];
};

/** 弹窗底部按钮统一风格：与其他痛点操作弹窗保持一致（36 高、圆角 10、无阴影）。 */
const PAIN_MODAL_BUTTON_STYLE: React.CSSProperties = {
  height: 36,
  paddingInline: 20,
  borderRadius: 10,
  boxShadow: 'none',
};

type RerunConfirmDetails = {
  count: number;
  period: string;
  retest: boolean;
};

const useRerunConfirm = () => {
  const [details, setDetails] = useState<RerunConfirmDetails | null>(null);
  const resolverRef = useRef<((confirmed: boolean) => void) | null>(null);
  const settle = useCallback((confirmed: boolean) => {
    resolverRef.current?.(confirmed);
    resolverRef.current = null;
    setDetails(null);
  }, []);
  useEffect(
    () => () => {
      resolverRef.current?.(false);
      resolverRef.current = null;
    },
    []
  );
  const confirm = useCallback(
    (next: RerunConfirmDetails) =>
      new Promise<boolean>((resolve) => {
        resolverRef.current?.(false);
        resolverRef.current = resolve;
        setDetails(next);
      }),
    []
  );
  const minMinutes = 4;
  const maxMinutes = 15;
  const modal = (
    <Modal
      open={Boolean(details)}
      className="issue-pain-confirm-modal"
      title={details?.retest ? '确认发起复测？' : '确认发起重跑检查？'}
      centered
      width={520}
      okText="确认发起"
      cancelText="取消"
      destroyOnHidden
      onOk={() => settle(true)}
      onCancel={() => settle(false)}
      okButtonProps={{ style: PAIN_MODAL_BUTTON_STYLE }}
      cancelButtonProps={{ style: PAIN_MODAL_BUTTON_STYLE }}
    >
      {details ? (
        <div className="space-y-2 py-2 text-sm leading-6 text-slate-600">
          <div>
            本次将重跑{' '}
            <strong className="text-slate-800">{details.count}</strong> 个
            Issue，报告周期为{' '}
            <strong className="text-slate-800">{details.period}</strong>。
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            预计耗时 {minMinutes}–{maxMinutes} 分钟，预计完成时间{' '}
            {formatRerunEtaTime(minMinutes)}–{formatRerunEtaTime(maxMinutes)}。
          </div>
        </div>
      ) : null}
      <style jsx global>{`
        .issue-pain-confirm-modal .ant-modal-content {
          overflow: hidden;
          border-radius: 16px !important;
        }
        .issue-pain-confirm-modal .ant-modal-footer .ant-btn {
          border-radius: 10px !important;
          box-shadow: none !important;
        }
      `}</style>
    </Modal>
  );
  return { confirm, modal };
};

const PAIN_MODAL_RERUN_STATUS_LABELS: Record<string, string> = {
  pending: 'Issue 重跑排队中',
  running: 'Issue 重跑中',
  waiting_report: 'Issue 重跑等待报告更新',
  applying: 'Issue 重跑结果应用中',
  applied: 'Issue 重跑已完成',
  failed: 'Issue 重跑失败',
  cancelled: 'Issue 重跑已取消',
  apply_failed: 'Issue 重跑结果应用失败',
};

const getPainModalRerunStatusLabel = (job: IssuePainRerunJob) => {
  const statusKey = getRerunStatusKey(job);
  return (
    PAIN_MODAL_RERUN_STATUS_LABELS[statusKey] ??
    `Issue 重跑${RERUN_STATUS_META[statusKey]?.label ?? '状态未知'}`
  );
};

const RerunJobPanel: React.FC<{
  job: IssuePainRerunJob;
  trackingKey: string;
  cancelling: boolean;
  onCancel: () => void;
}> = ({ job, trackingKey, cancelling, onCancel }) => {
  const meta =
    RERUN_STATUS_META[getRerunStatusKey(job)] ?? RERUN_STATUS_META.pending;
  const ownResults = job.results.filter(
    (item) => item.trackingKey === trackingKey
  );
  return (
    <div className="rounded-xl border border-sky-100 bg-sky-50/50 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className={`text-sm font-semibold ${meta.color}`}>
            {getPainModalRerunStatusLabel(job)}
          </div>
          <div className="mt-0.5 text-xs text-slate-500">
            {job.issueNumbers.length} 个 Issue · 预计 {job.eta.minMinutes}–
            {job.eta.maxMinutes} 分钟
            {job.queuedPosition && job.queuedPosition > 1
              ? ` · 前方还有 ${job.queuedPosition - 1} 个任务，实际时间可能顺延`
              : ''}
          </div>
          {isRerunLocked(job) ? (
            <div className="mt-0.5 text-[11px] text-slate-400">
              预计完成：{getRerunEtaRangeText(job)}
            </div>
          ) : null}
        </div>
        {job.taskStatus === 'pending' || job.taskStatus === 'running' ? (
          <button
            type="button"
            disabled={cancelling}
            className="inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 shadow-none transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-wait disabled:opacity-60"
            onClick={onCancel}
          >
            {cancelling ? '取消中…' : '取消任务'}
          </button>
        ) : null}
      </div>
      {job.error ? (
        <div className="mt-2 text-xs text-rose-600">{job.error}</div>
      ) : null}
      {job.applyStatus === 'applied' && ownResults.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {ownResults.map((item) => (
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
                {getRerunResultLabel(item, job.mode)}
              </div>
              {getMetricChangeSummary(item).length ? (
                <div className="mt-0.5 text-[10px] opacity-80">
                  指标变化：{getMetricChangeSummary(item).join('；')}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const getFixProgressPercent = (tracking: IssuePainTracking) =>
  tracking.activeTotal
    ? Math.round((tracking.fixedCount / tracking.activeTotal) * 100)
    : 0;

/** 痛点弹窗中的任务详情统一每 30 秒轮询一次。 */
const RERUN_POLL_INTERVAL_MS = 30000;

const getPassedPresentation = (
  tracking: IssuePainTracking,
  isObserve: boolean
) => {
  const passedPeriods = tracking.retest?.based_periods ?? [];
  return {
    message: isObserve ? '痛点已自动闭环' : '痛点已自动复测通过',
    description: passedPeriods.length
      ? `判定依据：${passedPeriods
          .map(shortTrackingPeriod)
          .join('、')} 未复现。`
      : `系统判定时间：${formatTrackingTime(tracking.retest?.at)}`,
  };
};

const RepairIssueOperationSection: React.FC<{
  pain: PainTrackingModalProps['pain'];
  tracking: PainTrackingModalProps['tracking'];
  onAction: PainTrackingModalProps['onAction'];
  pendingRetest?: boolean;
  onRerun?: (issueNumbers: string[], operator: string) => Promise<void>;
  rerunDisabledReason?: string | null;
  lockedIssueNumbers?: string[];
  onOpenRerunRecords?: () => void;
}> = ({
  pain,
  tracking,
  onAction,
  pendingRetest = false,
  onRerun,
  rerunDisabledReason,
  lockedIssueNumbers,
  onOpenRerunRecords,
}) => {
  const painLevelIssue = tracking.painLevelOnly
    ? tracking.activeIssues[0]
    : undefined;
  if (!painLevelIssue) {
    return (
      <PainIssueTable
        issues={pain.low_score_issues ?? []}
        tracking={tracking}
        onTrackingAction={onAction}
        responsive
        onRerun={onRerun}
        rerunDisabledReason={rerunDisabledReason}
        lockedIssueNumbers={lockedIssueNumbers}
        onOpenRerunRecords={onOpenRerunRecords}
      />
    );
  }
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3">
      <span className="text-xs text-slate-500">
        {pendingRetest
          ? '痛点整体已修复，可在自动复测前撤销修复标记。'
          : '当前痛点没有关联具体 Issue，可直接完成痛点整体修复。'}
      </span>
      <IssueFixButton
        tracking={tracking}
        issue={painLevelIssue}
        onAction={onAction}
        compact
      />
    </div>
  );
};

/**
 * 无具体 Issue 的痛点整体即时判定：提交人 + 判断原因 + 是/否即时提交，
 * 每次提交前校验提交人，全部判定完成后由后端自动流转状态。
 */
const PainOverallDecision: React.FC<{
  tracking: IssuePainTracking;
  onAction: PainTrackingModalProps['onAction'];
}> = ({ tracking, onAction }) => {
  const { operator, setOperator, rememberOperator } = useTrackingOperator();
  const [reason, setReason] = useState('');
  const [operatorError, setOperatorError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [invalidReasonOpen, setInvalidReasonOpen] = useState(false);
  const operatorInputId = React.useId();
  const finalDecisionConfirm = useFinalIssueDecisionConfirm();
  const overall = tracking.activeIssues[0];
  const decided = overall?.valid ?? null;

  const notifyOperatorInvalid = (message: string) => {
    const prompt =
      message === '请填写提交人' ? '请先填写提交人，再进行痛点判定' : message;
    setOperatorError(prompt);
    document.getElementById(operatorInputId)?.focus();
    toast.error(prompt, { id: `issue-pain-operator-${operatorInputId}` });
  };

  const submitDecision = async (valid: boolean, decisionReason?: string) => {
    const validation = validateOperator(operator);
    if (validation) {
      notifyOperatorInvalid(validation);
      return false;
    }
    if (!(await finalDecisionConfirm.confirm())) return false;
    setSubmitting(true);
    try {
      await onAction({
        trackingKey: tracking.trackingKey,
        type: 'decide_issue',
        operator: rememberOperator(operator),
        issueNumber: overall?.number ?? '__pain__',
        valid,
        reason: valid ? undefined : decisionReason,
      });
      return true;
    } catch {
      // 页面级 action handler 已展示错误信息，保留输入便于重试。
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const requestInvalidDecision = () => {
    const validation = validateOperator(operator);
    if (validation) {
      notifyOperatorInvalid(validation);
      return;
    }
    setInvalidReasonOpen(true);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="text-sm font-medium text-slate-700">
        当前痛点没有关联具体 Issue，请判断该痛点整体是否有效。
      </div>
      <div className="mt-3 flex flex-wrap items-start gap-4">
        <div className="shrink-0">
          <div className="flex h-7 items-center gap-2">
            <UserOutlined
              className={operatorError ? 'text-rose-500' : 'text-slate-400'}
            />
            <label
              htmlFor={operatorInputId}
              className="shrink-0 text-xs font-medium text-slate-600"
            >
              提交人<span className="ml-0.5 text-rose-500">*</span>
            </label>
            <Input
              id={operatorInputId}
              size="small"
              status={operatorError ? 'error' : undefined}
              className={`issue-pain-batch-operator !h-7 !w-36 !bg-white !px-2.5 ${
                operatorError ? '!border-rose-400' : '!border-slate-200'
              }`}
              value={operator}
              placeholder="请输入提交人"
              maxLength={20}
              autoComplete="off"
              onChange={(event) => {
                setOperator(event.target.value);
                if (event.target.value.trim()) setOperatorError('');
              }}
            />
          </div>
          {operatorError ? (
            <div
              role="alert"
              className="mt-1 flex items-center justify-end gap-1 text-[11px] leading-4 text-rose-500"
            >
              <ExclamationCircleFilled className="shrink-0" />
              <span>{operatorError}</span>
            </div>
          ) : null}
        </div>
        <div>
          <div className="mb-1 text-xs font-medium text-slate-600">
            判断原因
          </div>
          <Input
            size="small"
            className="issue-pain-batch-operator !h-7 !w-56 !border-slate-200 !bg-white !px-2.5"
            value={reason}
            placeholder="判断原因"
            maxLength={200}
            onChange={(event) => setReason(event.target.value)}
          />
        </div>
        <div>
          <div className="mb-1 text-xs font-medium text-slate-600">
            是否为有效问题
          </div>
          <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1">
            <button
              type="button"
              disabled={submitting}
              className={`inline-flex min-w-16 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-4 py-1 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
                decided === true
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:bg-white hover:text-slate-700'
              }`}
              onClick={() => void submitDecision(true)}
            >
              <CheckOutlined className="text-xs" />是
            </button>
            <button
              type="button"
              disabled={submitting}
              className={`inline-flex min-w-16 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-4 py-1 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
                decided === false
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-transparent text-slate-500 hover:bg-white hover:text-slate-700'
              }`}
              onClick={requestInvalidDecision}
            >
              <CloseOutlined className="text-xs" />否
            </button>
          </div>
        </div>
        <InvalidDecisionReasonModal
          open={invalidReasonOpen}
          subject="当前痛点整体"
          initialReason={reason}
          completesDecision
          submitting={submitting}
          onCancel={() => setInvalidReasonOpen(false)}
          onConfirm={async (decisionReason) => {
            const success = await submitDecision(false, decisionReason);
            if (success) {
              setReason(decisionReason);
              setInvalidReasonOpen(false);
            }
            return success;
          }}
        />
        {finalDecisionConfirm.modal}
      </div>
      {decided !== null ? (
        <div className="mt-2 text-xs text-slate-400">
          当前判定：{decided ? '有效问题' : '非有效问题'}
          {decided === false && overall?.decision_reason
            ? `（原因：${overall.decision_reason}）`
            : ''}
          ，重新点击可改判。
        </div>
      ) : null}
    </div>
  );
};

const PainTrackingModal: React.FC<PainTrackingModalProps> = ({
  open,
  pain,
  tracking,
  metricLabels,
  onClose,
  onAction,
  reportContext,
  onRerunApplied,
}) => {
  const { operator, setOperator, rememberOperator } = useTrackingOperator();
  const [rollbackModalOpen, setRollbackModalOpen] = useState(false);
  const [rollbackReason, setRollbackReason] = useState('');
  const [rollbackOperatorError, setRollbackOperatorError] = useState('');
  const [rollbackReasonError, setRollbackReasonError] = useState('');
  const [rollbackSubmitting, setRollbackSubmitting] = useState(false);
  const [issuePriorityFilter, setIssuePriorityFilter] =
    useState<PainIssuePriority>();
  const [rerunJob, setRerunJob] = useState<IssuePainRerunJob | null>(null);
  const [rerunSubmitting, setRerunSubmitting] = useState(false);
  const [rerunCancelling, setRerunCancelling] = useState(false);
  const [rerunListOpen, setRerunListOpen] = useState(false);
  const observedRerunRef = useRef<{
    jobId: string;
    applyStatus: IssuePainRerunJob['applyStatus'];
  } | null>(null);
  const rerunConfirm = useRerunConfirm();

  const acceptRerunJob = useCallback(
    (next: IssuePainRerunJob) => {
      const previous = observedRerunRef.current;
      const newlyApplied =
        next.applyStatus === 'applied' &&
        previous?.jobId === next.jobId &&
        previous.applyStatus !== 'applied';
      observedRerunRef.current = {
        jobId: next.jobId,
        applyStatus: next.applyStatus,
      };
      setRerunJob(next);
      if (newlyApplied) {
        toast.success('重跑报告已应用，痛点状态已自动更新');
        onRerunApplied?.();
      }
    },
    [onRerunApplied]
  );

  useEffect(() => {
    if (open) {
      setRollbackModalOpen(false);
      setRollbackReason('');
      setRollbackOperatorError('');
      setRollbackReasonError('');
      setIssuePriorityFilter(undefined);
      const controller = new AbortController();
      void fetchIssuePainReruns(
        {
          community: reportContext.community,
          period: reportContext.period,
        },
        controller.signal
      )
        .then((response) => {
          const active = response.items.find(isRerunLocked);
          const ownLatest = response.items.find(
            (item) =>
              item.trackingKey === tracking.trackingKey ||
              item.affectedTrackingKeys.includes(tracking.trackingKey)
          );
          const next = active ?? ownLatest ?? null;
          if (next) {
            // 初次恢复仅建立观察基线；历史已完成任务不能触发页面刷新。
            observedRerunRef.current = {
              jobId: next.jobId,
              applyStatus: next.applyStatus,
            };
            setRerunJob(next);
          } else {
            observedRerunRef.current = null;
            setRerunJob(null);
          }
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === 'AbortError')
            return;
          toast.error(
            error instanceof Error ? error.message : '重跑任务状态加载失败'
          );
        });
      return () => controller.abort();
    }
  }, [
    open,
    reportContext.community,
    reportContext.period,
    tracking.status,
    tracking.trackingKey,
  ]);

  useEffect(() => {
    // 重跑记录弹窗使用独立的列表轮询；打开时暂停痛点管理详情轮询，
    // 关闭后再从完整的 30 秒周期重新开始，避免两个计时器并行或共用节奏。
    if (!open || rerunListOpen || !rerunJob || !isRerunLocked(rerunJob)) return;
    const controller = new AbortController();
    const poll = () => {
      // 页面切后台时暂停轮询，切回时立即拉一次避免最长 60 秒感知延迟。
      if (document.hidden) return;
      void fetchIssuePainRerun(rerunJob.jobId, controller.signal)
        .then(acceptRerunJob)
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === 'AbortError')
            return;
          toast.error(
            error instanceof Error ? error.message : '重跑任务状态更新失败'
          );
        });
    };
    const onVisibilityChange = () => {
      if (!document.hidden) poll();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    const timer = window.setInterval(poll, RERUN_POLL_INTERVAL_MS);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      controller.abort();
      window.clearInterval(timer);
    };
  }, [acceptRerunJob, open, rerunJob, rerunListOpen]);

  const requestRerun = useCallback(
    async (issueNumbers: string[], operatorValue: string) => {
      const count = issueNumbers.length;
      const confirmed = await rerunConfirm.confirm({
        count,
        period: reportContext.period,
        retest:
          tracking.status === IssuePainTrackingStatus.FIXED_PENDING_RETEST,
      });
      if (!confirmed) return;
      setRerunSubmitting(true);
      try {
        const next = await createIssuePainRerun({
          community: reportContext.community,
          trackingKey: tracking.trackingKey,
          reportKey: reportContext.reportKey,
          issueNumbers,
          operator: operatorValue,
        });
        acceptRerunJob(next);
        toast.success('重跑任务已提交');
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : '重跑任务提交失败'
        );
        throw error;
      } finally {
        setRerunSubmitting(false);
      }
    },
    [
      acceptRerunJob,
      reportContext,
      rerunConfirm,
      tracking.status,
      tracking.trackingKey,
    ]
  );

  const cancelRerun = async () => {
    if (!rerunJob) return;
    setRerunCancelling(true);
    try {
      acceptRerunJob(await cancelIssuePainRerun(rerunJob.jobId));
      toast.success('重跑任务已取消');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '取消重跑失败');
    } finally {
      setRerunCancelling(false);
    }
  };

  const isObserve = tracking.trackingType === 'observe';
  const currentStep = getCurrentFlowStep(tracking.status, isObserve);
  const flowItems = getFlowItems(tracking, isObserve).map((item, index) =>
    index >= currentStep ? { ...item, description: null } : item
  );

  // 重跑入口置灰时给出具体原因：提交中 / 当前痛点任务 / 同周期其他痛点的任务。
  const rerunDisabledReason = React.useMemo(() => {
    if (rerunSubmitting) return '重跑任务提交中，请稍候…';
    if (!isRerunLocked(rerunJob)) return null;
    if (!rerunJob) return null;
    const own =
      rerunJob.trackingKey === tracking.trackingKey ||
      rerunJob.affectedTrackingKeys.includes(tracking.trackingKey);
    return [
      own
        ? '当前痛点存在进行中的重跑任务'
        : '同仓库当前周期存在其他痛点发起的重跑任务',
      `状态：${getPainModalRerunStatusLabel(rerunJob)}`,
      `${getRerunModeLabel(rerunJob.mode)} ${
        rerunJob.issueNumbers.length
      } 个 Issue`,
      `预计完成 ${getRerunEtaRangeText(rerunJob)}`,
      '报告应用完成前不能再次发起',
    ].join('，');
  }, [rerunJob, rerunSubmitting, tracking.trackingKey]);

  const submitRollback = async () => {
    const validation = validateOperator(operator);
    if (validation) {
      setRollbackOperatorError(validation);
      return;
    }
    const normalizedReason = rollbackReason.trim();
    if (!normalizedReason) {
      setRollbackReasonError('请填写回退原因');
      return;
    }
    setRollbackSubmitting(true);
    try {
      await onAction({
        trackingKey: tracking.trackingKey,
        type: 'rollback_to_pending',
        operator: rememberOperator(operator),
        reason: normalizedReason,
      });
      setRollbackModalOpen(false);
      setRollbackReason('');
    } catch {
      // 页面级 action handler 已展示错误信息，保留输入便于重试。
    } finally {
      setRollbackSubmitting(false);
    }
  };

  const trend = tracking.issueCountTrend.slice(-4);
  const percent = getFixProgressPercent(tracking);
  const passedPresentation = getPassedPresentation(tracking, isObserve);
  const pendingPainIssues = pain.low_score_issues ?? [];
  const filteredPendingPainIssues = issuePriorityFilter
    ? pendingPainIssues.filter(
        (issue) =>
          resolvePainIssuePriority(issue.priority, issue.score) ===
          issuePriorityFilter
      )
    : pendingPainIssues;
  const pendingTotalCount = tracking.activeIssues.length;
  const pendingDecidedCount = tracking.activeIssues.filter(
    (item) => item.valid === true || item.valid === false
  ).length;
  const lockedIssueNumbers = getLockedRerunIssueNumbers(rerunJob);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="calc(100vw - 32px)"
      style={{ maxWidth: 1280 }}
      destroyOnClose
      styles={{
        body: {
          height: '70vh',
          overflowY: 'auto',
          paddingRight: '8px',
        },
      }}
      title={
        <div className="flex items-center justify-between pr-8">
          <span className="text-base font-semibold text-slate-800">
            痛点管理
          </span>
          <Tooltip title="查看当前报告的 Issue 重跑任务记录">
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-sky-200 bg-sky-50 px-3 text-xs font-semibold text-sky-700 shadow-none transition-colors hover:border-sky-300 hover:bg-sky-100"
              onClick={() => setRerunListOpen(true)}
            >
              <HistoryOutlined />
              重跑记录
            </button>
          </Tooltip>
        </div>
      }
    >
      <div className="space-y-6">
        {rerunJob ? (
          <RerunJobPanel
            job={rerunJob}
            trackingKey={tracking.trackingKey}
            cancelling={rerunCancelling}
            onCancel={() => void cancelRerun()}
          />
        ) : null}
        <div className="rounded-lg bg-slate-50 p-4">
          <Steps
            current={currentStep}
            size="small"
            items={flowItems}
            className="pain-steps"
          />
        </div>

        <div className="rounded-lg border border-rose-100 bg-rose-50/80 px-3.5 py-3">
          <div className="text-sm font-semibold leading-6 text-slate-900">
            {metricLabels.length ? metricLabels.join(' · ') : pain.title}
          </div>
          {metricLabels.length ? (
            <div className="mt-0.5 text-xs leading-5 text-slate-500">
              {pain.title}
            </div>
          ) : null}
        </div>

        {tracking.status === IssuePainTrackingStatus.PENDING ? (
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700">
                <span>涉及 Issue</span>
                <span className="font-normal text-slate-400">
                  共 {pendingPainIssues.length} 条
                </span>
                <div>
                  <PainIssuePriorityFilter
                    issues={pendingPainIssues}
                    value={issuePriorityFilter}
                    onChange={setIssuePriorityFilter}
                  />
                </div>
                <Tooltip
                  title={
                    isObserve
                      ? `创建、首响与分配阶段关注 Issue 是否被顺利接收和响应，不要求逐个标记修复。确认后系统会检查后续报告；连续 ${tracking.passMissPeriods} 期未再出现时自动标记为已闭环。`
                      : '确认后可逐个完成 Issue 修复；所有有效 Issue 完成修复后，痛点将自动进入待复测状态。'
                  }
                >
                  <span className="ml-2 inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-slate-100 text-[13px] font-normal leading-none text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-600">
                    <InfoCircleOutlined />
                  </span>
                </Tooltip>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <InfoCircleOutlined className="text-amber-500" />
                    待确认：请逐条判断“是否为有效问题”
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-amber-600">
                    {pendingDecidedCount}/{pendingTotalCount}
                  </span>
                </div>
                <Progress
                  percent={
                    pendingTotalCount
                      ? Math.round(
                          (pendingDecidedCount / pendingTotalCount) * 100
                        )
                      : 0
                  }
                  showInfo={false}
                  className="!mb-0 mt-2"
                  strokeColor="#f59e0b"
                  size={['100%', 6]}
                />
              </div>
              {pendingPainIssues.length ? (
                <div className="mt-4">
                  <PainIssueTable
                    issues={filteredPendingPainIssues}
                    tracking={tracking}
                    onTrackingAction={onAction}
                    responsive
                  />
                </div>
              ) : null}
              {!pain.low_score_issues?.length ? (
                <div className="mt-4">
                  <PainOverallDecision
                    tracking={tracking}
                    onAction={onAction}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {tracking.status === IssuePainTrackingStatus.TRACKING && isObserve ? (
          <div className="space-y-4">
            <Alert
              type="info"
              showIcon
              message="系统正在检查后续报告"
              description={`也可发起重跑检查；未主动重跑时，连续 ${tracking.passMissPeriods} 期未再出现会自动闭环。`}
            />
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm font-semibold text-slate-700">
                最近 {trend.length} 期涉及 Issue 数
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                {trend.map((item, index) => (
                  <React.Fragment key={item.period}>
                    {index ? <span className="text-slate-300">→</span> : null}
                    <span className="rounded-lg bg-sky-50 px-3 py-2 text-sky-700">
                      <span className="block text-[10px] text-slate-400">
                        {shortTrackingPeriod(item.period)}
                      </span>
                      <strong>{item.count}</strong>
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <PainIssueTable
              issues={pain.low_score_issues ?? []}
              tracking={tracking}
              onTrackingAction={onAction}
              responsive
              onRerun={requestRerun}
              rerunDisabledReason={rerunDisabledReason}
              lockedIssueNumbers={lockedIssueNumbers}
              onOpenRerunRecords={() => setRerunListOpen(true)}
            />
          </div>
        ) : null}

        {tracking.status === IssuePainTrackingStatus.TRACKING && !isObserve ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4">
              <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
                <span>Issue 修复进度</span>
                <span>
                  {tracking.fixedCount}/{tracking.activeTotal}
                </span>
              </div>
              <Progress
                percent={percent}
                showInfo={false}
                className="!mb-0 mt-2"
              />
              <div className="mt-1 text-xs text-slate-500">
                全部 Issue 修复后自动进入“已修复待复测”。
              </div>
            </div>
            <RepairIssueOperationSection
              pain={pain}
              tracking={tracking}
              onAction={onAction}
              onRerun={requestRerun}
              rerunDisabledReason={rerunDisabledReason}
              lockedIssueNumbers={lockedIssueNumbers}
              onOpenRerunRecords={() => setRerunListOpen(true)}
            />
          </div>
        ) : null}

        {tracking.status === IssuePainTrackingStatus.FIXED_PENDING_RETEST ? (
          <div className="space-y-4">
            <Alert
              type="warning"
              showIcon
              message="已修复，可立即复测或等待自动复测"
              description="可在下方对单个 Issue 发起重跑复测，无需等待下一期报告；若选择等待，下一期未复现将自动判定通过，再次出现则重置对应 Issue 的修复标记。"
            />
            <RepairIssueOperationSection
              pain={pain}
              tracking={tracking}
              onAction={onAction}
              pendingRetest
              onRerun={requestRerun}
              rerunDisabledReason={rerunDisabledReason}
              lockedIssueNumbers={lockedIssueNumbers}
              onOpenRerunRecords={() => setRerunListOpen(true)}
            />
          </div>
        ) : null}

        {tracking.status === IssuePainTrackingStatus.PASSED ? (
          <div className="space-y-4">
            <Alert
              type="success"
              showIcon
              message={passedPresentation.message}
              description={passedPresentation.description}
            />
            <PainIssueTable
              issues={pain.low_score_issues ?? []}
              tracking={tracking}
              onTrackingAction={onAction}
              responsive
            />
          </div>
        ) : null}

        {tracking.status === IssuePainTrackingStatus.INVALID ? (
          <div className="space-y-3">
            <Alert
              type="info"
              showIcon
              message="非有效问题"
              description={
                <div className="space-y-1">
                  <div>
                    操作人：
                    {tracking.history[tracking.history.length - 1]?.by || '—'}
                    ；时间：
                    {formatTrackingTime(
                      tracking.history[tracking.history.length - 1]?.at
                    )}
                  </div>
                  <div>判断原因：{tracking.invalidReason || '—'}</div>
                </div>
              }
            />
            <PainIssueTable
              issues={pain.low_score_issues ?? []}
              tracking={tracking}
              onTrackingAction={onAction}
              responsive
            />
            <div className="flex justify-end">
              <Button
                danger
                className="!rounded-lg"
                onClick={() => setRollbackModalOpen(true)}
              >
                回退到待确认
              </Button>
            </div>
          </div>
        ) : null}

        <TrackingHistoryTable history={tracking.history} />
        <style jsx global>{`
          .issue-pain-form-input.ant-input {
            border-radius: 12px !important;
          }
          .issue-pain-submit-button.ant-btn {
            border-radius: 12px !important;
          }
          .issue-pain-submit-button.ant-btn:disabled {
            border-color: #cbd5e1 !important;
            background: #e2e8f0 !important;
            color: #94a3b8 !important;
          }
          .issue-pain-confirm-modal .ant-modal-content {
            overflow: hidden;
            border-radius: 16px !important;
          }
          .issue-pain-confirm-modal .ant-modal-confirm-btns .ant-btn,
          .issue-pain-confirm-modal .ant-modal-footer .ant-btn {
            border-radius: 10px !important;
            box-shadow: none !important;
          }
        `}</style>
      </div>
      {rerunConfirm.modal}
      {open ? (
        <RerunJobListModal
          open={rerunListOpen}
          onClose={() => setRerunListOpen(false)}
          scope={{
            type: 'report',
            reportKey: reportContext.reportKey,
            community: reportContext.community,
            period: reportContext.period,
          }}
        />
      ) : null}
      <Modal
        open={rollbackModalOpen}
        onCancel={() => setRollbackModalOpen(false)}
        onOk={() => void submitRollback()}
        okText="确认回退"
        cancelText="取消"
        confirmLoading={rollbackSubmitting}
        okButtonProps={{
          danger: true,
          disabled: !operator.trim() || !rollbackReason.trim(),
          style: PAIN_MODAL_BUTTON_STYLE,
        }}
        cancelButtonProps={{ style: PAIN_MODAL_BUTTON_STYLE }}
        title="回退到待确认"
        destroyOnHidden
      >
        <div className="space-y-4">
          <div>
            <div className="mb-1.5 text-sm font-medium text-slate-700">
              操作人<span className="ml-1 text-rose-500">*</span>
            </div>
            <Input
              className="!rounded-lg !border-slate-300"
              value={operator}
              maxLength={20}
              placeholder="请输入操作人"
              allowClear
              onChange={(event) => {
                setOperator(event.target.value);
                if (event.target.value.trim()) setRollbackOperatorError('');
              }}
            />
            {rollbackOperatorError ? (
              <div className="mt-1 text-xs text-rose-500">
                {rollbackOperatorError}
              </div>
            ) : null}
          </div>
          <div>
            <div className="mb-1.5 text-sm font-medium text-slate-700">
              回退原因<span className="ml-1 text-rose-500">*</span>
            </div>
            <div className="pb-5">
              <Input.TextArea
                className="!rounded-lg !border-slate-300"
                value={rollbackReason}
                rows={3}
                maxLength={200}
                showCount
                allowClear
                placeholder="请说明回退原因，该内容会记录在流转历史中"
                onChange={(event) => {
                  setRollbackReason(event.target.value);
                  if (event.target.value.trim()) setRollbackReasonError('');
                }}
              />
            </div>
            {rollbackReasonError ? (
              <div className="mt-1 text-xs text-rose-500">
                {rollbackReasonError}
              </div>
            ) : null}
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default PainTrackingModal;
export {
  TrackingStatusBadge,
  TrackingProgress,
  TrackingActionButton,
  IssueFixButton,
} from './components';
