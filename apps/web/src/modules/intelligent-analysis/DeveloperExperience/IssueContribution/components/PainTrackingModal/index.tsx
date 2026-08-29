import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, Modal, Progress, Radio, Steps } from 'antd';
import type { IssuePainTracking } from '../../types';
import { IssuePainTrackingStatus } from '../../types';
import { getPriorityLabel, getPriorityTone } from '../../presentation';
import { ArchivedIssueList, TrackingHistoryTable } from './components';
import PainIssueTable from '../PainIssueTable';
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
  if (status === IssuePainTrackingStatus.PASSED) return isObserve ? 2 : 3;
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

const getFixProgressPercent = (tracking: IssuePainTracking) =>
  tracking.activeTotal
    ? Math.round((tracking.fixedCount / tracking.activeTotal) * 100)
    : 0;

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

const PainTrackingModal: React.FC<PainTrackingModalProps> = ({
  open,
  pain,
  tracking,
  metricLabels,
  onClose,
  onAction,
}) => {
  const { operator, setOperator, rememberOperator } = useTrackingOperator();
  const [submitting, setSubmitting] = useState(false);
  const [operatorError, setOperatorError] = useState('');
  const [decision, setDecision] = useState<
    'confirm' | 'mark_invalid' | undefined
  >('confirm');
  const [invalidReason, setInvalidReason] = useState('');
  const [invalidReasonError, setInvalidReasonError] = useState('');
  const [rollbackModalOpen, setRollbackModalOpen] = useState(false);
  const [rollbackReason, setRollbackReason] = useState('');
  const [rollbackOperatorError, setRollbackOperatorError] = useState('');
  const [rollbackReasonError, setRollbackReasonError] = useState('');
  const [rollbackSubmitting, setRollbackSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setOperatorError('');
      setDecision('confirm');
      setInvalidReason('');
      setInvalidReasonError('');
      setRollbackModalOpen(false);
      setRollbackReason('');
      setRollbackOperatorError('');
      setRollbackReasonError('');
    }
  }, [open]);

  const isObserve = tracking.trackingType === 'observe';
  const priorityTone = getPriorityTone(pain.prio);
  const currentStep = getCurrentFlowStep(tracking.status, isObserve);
  const flowItems = getFlowItems(tracking, isObserve).map((item, index) =>
    index >= currentStep ? { ...item, description: null } : item
  );

  const submitDecision = async (type: 'confirm' | 'mark_invalid') => {
    const validation = validateOperator(operator);
    if (validation) {
      setOperatorError(validation);
      return;
    }
    const normalizedReason = invalidReason.trim();
    if (type === 'mark_invalid' && !normalizedReason) {
      setInvalidReasonError('请填写判断原因');
      return;
    }
    setSubmitting(true);
    try {
      await onAction({
        trackingKey: tracking.trackingKey,
        type,
        operator: rememberOperator(operator),
        reason: type === 'mark_invalid' ? normalizedReason : undefined,
      });
    } catch {
      // 页面级 action handler 已展示错误信息，弹窗保留当前输入。
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="70%"
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
        </div>
      }
    >
      <div className="space-y-6">
        <div className="rounded-lg bg-slate-50 p-4">
          <Steps
            current={currentStep}
            size="small"
            items={flowItems}
            className="pain-steps"
          />
        </div>

        <div className="rounded-lg border border-rose-100 bg-rose-50/80 px-3.5 py-3 text-sm leading-relaxed text-rose-800">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${priorityTone.badge}`}
            >
              {getPriorityLabel(pain.prio)}
            </span>
            {metricLabels.map((label) => (
              <span
                key={label}
                className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="mt-2 font-semibold text-slate-800">{pain.title}</div>
        </div>

        {tracking.status === IssuePainTrackingStatus.PENDING ? (
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-sm font-semibold text-slate-700">
                涉及 Issue
                <span className="ml-1.5 font-normal text-slate-400">
                  共 {pain.low_score_issues?.length ?? 0} 条
                </span>
              </div>
              <PainIssueTable issues={pain.low_score_issues ?? []} />
            </div>
            {isObserve ? (
              <div className="rounded-lg border border-sky-100 bg-sky-50/70 px-3.5 py-2.5">
                <div className="text-sm font-semibold text-sky-800">
                  创建、首响与分配阶段无需逐项修复
                </div>
                <div className="mt-1 text-xs leading-5 text-sky-700/80">
                  这两个阶段关注 Issue 是否被顺利接收和响应，不要求逐个标记
                  Issue 修复。确认后，系统会检查后续每期报告；连续{' '}
                  {tracking.passMissPeriods}
                  期未再出现该痛点时，自动标记为已闭环。
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-sky-100 bg-sky-50/70 px-3.5 py-2.5">
                <div className="text-sm font-semibold text-sky-800">
                  确认后可逐个完成 Issue 修复
                </div>
                <div className="mt-1 text-xs leading-5 text-sky-700/80">
                  所有关联 Issue 完成修复后，痛点将自动进入待复测状态。
                </div>
              </div>
            )}
            <div className="space-y-5 border-t border-slate-200 pt-5">
              <div>
                <div className="text-sm font-medium text-slate-700">
                  是否确认该痛点
                  <span className="ml-1 text-rose-500">*</span>
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-500">
                  请根据涉及 Issue 判断该痛点是否真实存在。
                </div>
                <Radio.Group
                  className="mt-3"
                  value={decision}
                  onChange={(event) => {
                    setDecision(event.target.value);
                    setInvalidReasonError('');
                  }}
                >
                  <Radio value="confirm">
                    <span className="text-sm text-slate-700">是</span>
                  </Radio>
                  <Radio value="mark_invalid">
                    <span className="text-sm text-slate-700">
                      否（非有效问题）
                    </span>
                  </Radio>
                </Radio.Group>
                {decision === 'mark_invalid' ||
                (decision === 'confirm' && !isObserve) ? (
                  <div className="mt-2 text-xs leading-5 text-slate-500">
                    {decision === 'confirm'
                      ? '确认后进入修复流程，逐个处理当前关联 Issue。'
                      : '选择“否”后，该痛点将结束管理流程。'}
                  </div>
                ) : null}
              </div>

              {decision === 'mark_invalid' ? (
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    判断原因
                    <span className="ml-1 text-rose-500">*</span>
                  </div>
                  <Input.TextArea
                    className="mt-2 !rounded-lg !border-slate-300 !px-3 !py-2"
                    value={invalidReason}
                    maxLength={200}
                    rows={3}
                    showCount
                    placeholder="请说明该现象不属于有效问题的判断依据"
                    onChange={(event) => {
                      setInvalidReason(event.target.value);
                      if (event.target.value.trim()) setInvalidReasonError('');
                    }}
                  />
                  {invalidReasonError ? (
                    <div className="mt-1 text-xs text-rose-500">
                      {invalidReasonError}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div>
                <div className="text-sm font-medium text-slate-700">
                  提交人
                  <span className="ml-1 text-rose-500">*</span>
                </div>
                <Input
                  className="mt-2 !rounded-lg !border-slate-300 !px-3 !py-2"
                  value={operator}
                  maxLength={20}
                  placeholder="请输入提交人姓名"
                  onChange={(event) => setOperator(event.target.value)}
                />
                {operatorError ? (
                  <div className="mt-1 text-xs text-rose-500">
                    {operatorError}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-end border-t border-slate-200 pt-4">
                <Button
                  className="!h-9 !rounded-lg !border-sky-600 !bg-sky-600 !px-5 !font-semibold !shadow-none"
                  type="primary"
                  loading={submitting}
                  disabled={
                    !decision ||
                    (decision === 'mark_invalid' && !invalidReason.trim())
                  }
                  onClick={() => decision && void submitDecision(decision)}
                >
                  {decision === 'mark_invalid'
                    ? '提交为非有效问题'
                    : '确认痛点'}
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {tracking.status === IssuePainTrackingStatus.TRACKING && isObserve ? (
          <div className="space-y-4">
            <Alert
              type="info"
              showIcon
              message="系统正在检查后续报告，无需逐项修复 Issue"
              description={`连续 ${tracking.passMissPeriods} 期未再出现该痛点时，系统会自动标记为已闭环。`}
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
            <PainIssueTable
              issues={pain.low_score_issues ?? []}
              tracking={tracking}
              onTrackingAction={onAction}
            />
            <ArchivedIssueList issues={tracking.archivedIssues} />
          </div>
        ) : null}

        {tracking.status === IssuePainTrackingStatus.FIXED_PENDING_RETEST ? (
          <div className="space-y-4">
            <Alert
              type="warning"
              showIcon
              message="已修复，等待下一期报告自动复测"
              description="下一期报告未复现，系统将自动判定复测通过；若再次出现，会自动重置复现 Issue 的修复标记。"
            />
            <PainIssueTable
              issues={pain.low_score_issues ?? []}
              tracking={tracking}
              onTrackingAction={onAction}
            />
            <ArchivedIssueList issues={tracking.archivedIssues} />
          </div>
        ) : null}

        {tracking.status === IssuePainTrackingStatus.PASSED ? (
          <Alert
            type="success"
            showIcon
            message={passedPresentation.message}
            description={passedPresentation.description}
          />
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
      </div>
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
        }}
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
