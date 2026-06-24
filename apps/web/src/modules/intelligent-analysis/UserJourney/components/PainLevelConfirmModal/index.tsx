import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Form, Modal, Steps } from 'antd';

import {
  fetchOverviewCommonIssues,
  type PainConfirmationRecord,
} from '../../rawData/apiClient';
import type { PainLevel } from '../../types';

import {
  HistoryTable,
  ModalFooter,
  ModalTitle,
  PainConfirmationForm,
  RollbackConfirmModal,
} from './components';
import { STATUS_LABELS } from './constants';
import {
  DISPLAY_STEP_SEQUENCE,
  LEGACY_RETESTING_STEP_SEQUENCE,
  RETEST_FAILED_STEP_SEQUENCE,
  useModalSessionState,
  usePainConfirmationForm,
  useStepsItems,
} from './hooks';
import type {
  CommonIssueOption,
  FormValues,
  Props,
  VersionOption,
} from './types';
import { PainStatus } from './types';
import {
  buildReadonlyFormValues,
  buildRollbackPayload,
  buildSessionRecordAfterRollback,
  getActionReasonText,
  getCloseDateValue,
  getDisplayedStepStatus,
  getModalStatusState,
  getSafeCommonIssueType,
  getSafeLinkValue,
  isNonProjectSeverity,
  formatStatusTime,
  resolveStepSnapshot,
  shouldRenderCustomFooter,
} from './utils';

dayjs.locale('zh-cn');

const PainLevelConfirmModal: React.FC<Props> = ({
  open,
  fileKey,
  stepId,
  painIndex,
  painText,
  currentRecord,
  parentPainRemark,
  versionOptions,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [showHistory, setShowHistory] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [rollbackModalOpen, setRollbackModalOpen] = useState(false);
  const [rollbackTarget, setRollbackTarget] = useState<PainStatus | null>(null);
  const [rollbackBy, setRollbackBy] = useState('');
  const [rollbackReason, setRollbackReason] = useState('');
  const [rollbackSubmitting, setRollbackSubmitting] = useState(false);
  const { sessionRecord, setSessionRecord, sessionParentPainRemark } =
    useModalSessionState({
      open,
      currentRecord,
      parentPainRemark,
    });

  const modalRecord = open ? sessionRecord : currentRecord ?? undefined;
  const modalParentPainRemark = open
    ? sessionParentPainRemark
    : parentPainRemark;

  const {
    currentStatus,
    isCurrentNonProjectIssue,
    latestFileKey,
    showRetestDecision,
  } = getModalStatusState(modalRecord, fileKey);
  const isCurrentRetestFailed = currentStatus === PainStatus.RETESTED_FAILED;

  const { handleOk, submitting } = usePainConfirmationForm({
    stepId,
    painIndex,
    painText,
    currentStatus,
    showRetestDecision,
    onSubmit,
    onCancel,
    form,
  });

  const { data: commonIssueResp, isFetching: commonIssueLoading } = useQuery({
    queryKey: ['overviewKnownCommonIssuesForConfirmModal'],
    queryFn: () => fetchOverviewCommonIssues({}),
    enabled:
      open &&
      (currentStatus === PainStatus.TO_BE_CONFIRMED ||
        selectedStep === PainStatus.TO_BE_CONFIRMED),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const historyData = useMemo(
    () => ({ history: modalRecord?.history || [] }),
    [modalRecord?.history]
  );
  const historyLoading = false;

  const { knownCommonIssues, commonIssueTypeOptions } = useMemo(() => {
    const items = commonIssueResp?.items ?? [];
    const issues: CommonIssueOption[] = items.map((item) => ({
      issueType: String(item.issueType || '').trim(),
      description: String(item.description || '').trim(),
    }));
    const optionsFromApi = Array.from(
      new Set(issues.map((item) => item.issueType).filter(Boolean))
    );
    const currentType = String(modalRecord?.common_issue_type || '').trim();
    const options = currentType
      ? Array.from(new Set([currentType, ...optionsFromApi]))
      : optionsFromApi;
    return { knownCommonIssues: issues, commonIssueTypeOptions: options };
  }, [commonIssueResp?.items, modalRecord?.common_issue_type]);

  const nextStatus =
    currentStatus === PainStatus.RETESTED_FAILED
      ? PainStatus.FIXED_PENDING_RETEST
      : (Math.min(currentStatus + 1, 5) as PainStatus);

  const displayedStepStatus = isCurrentNonProjectIssue
    ? PainStatus.NO_FIX_NEEDED
    : isCurrentRetestFailed
    ? PainStatus.RETESTED_FAILED
    : getDisplayedStepStatus(currentStatus);

  const reviewStepSnapshotMap = useMemo(() => {
    const historyItems = modalRecord?.history || [];
    const steps = [
      PainStatus.TO_BE_CONFIRMED,
      PainStatus.CONFIRMED_PENDING_FIX,
      PainStatus.FIXED_PENDING_RETEST,
      PainStatus.RETESTED_PASSED,
    ];

    return new Map(
      steps.map((step) => [
        step,
        resolveStepSnapshot({
          displayStep: step,
          currentRecord: modalRecord,
          historyItems,
        }),
      ])
    );
  }, [modalRecord]);

  const activeDisplayStep = selectedStep ?? displayedStepStatus;
  const isReviewingHistoryStep =
    selectedStep !== null && selectedStep < displayedStepStatus;
  const rollbackTargets = useMemo(() => {
    const candidate = activeDisplayStep as PainStatus;
    const allowed: PainStatus[] = [
      PainStatus.TO_BE_CONFIRMED,
      PainStatus.CONFIRMED_PENDING_FIX,
      PainStatus.FIXED_PENDING_RETEST,
    ];
    const current = currentStatus as PainStatus;
    if (!allowed.includes(candidate)) return [];
    if (candidate >= current) return [];
    return [candidate];
  }, [activeDisplayStep, currentStatus]);
  const activeReviewSnapshot = isReviewingHistoryStep
    ? reviewStepSnapshotMap.get(activeDisplayStep)
    : undefined;

  const reviewLatestFileKey = useMemo(() => {
    return String(
      activeReviewSnapshot?.latest_file_key ||
        activeReviewSnapshot?.retest_passed_file_key ||
        latestFileKey ||
        ''
    ).trim();
  }, [activeReviewSnapshot, latestFileKey]);

  const stepSequence = isCurrentRetestFailed
    ? RETEST_FAILED_STEP_SEQUENCE
    : currentStatus === PainStatus.RETESTING
    ? LEGACY_RETESTING_STEP_SEQUENCE
    : DISPLAY_STEP_SEQUENCE;

  const normalStepsItems = useStepsItems({
    displayedStepStatus,
    isReviewingHistoryStep,
    activeDisplayStep,
    currentRecord: modalRecord,
    reviewStepSnapshotMap,
    setSelectedStep,
    stepSequence,
  });

  const stepsItems = isCurrentNonProjectIssue
    ? [
        {
          title: (
            <div className="inline-flex min-h-6 items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0 align-middle leading-none text-emerald-700 shadow-sm">
              <span className="whitespace-nowrap leading-5">
                非项目本身问题
              </span>
            </div>
          ),
          description: modalRecord?.confirmed_at ? (
            <div className="text-xs leading-5 text-slate-500">
              {formatStatusTime(modalRecord.confirmed_at)}
            </div>
          ) : null,
        },
      ]
    : normalStepsItems;
  const currentStepIndex = isCurrentNonProjectIssue
    ? 0
    : Math.max(stepSequence.indexOf(displayedStepStatus), 0);

  const openRollback = useCallback((target: PainStatus) => {
    setRollbackTarget(target);
    setRollbackBy('');
    setRollbackReason('');
    setRollbackModalOpen(true);
  }, []);

  const submitRollback = useCallback(async () => {
    if (!rollbackTarget) return;
    const by = rollbackBy.trim();
    const reason = rollbackReason.trim();
    if (!by || !reason) return;

    const base = modalRecord ?? ({} as PainConfirmationRecord);
    const payload = buildRollbackPayload({
      stepId,
      painIndex,
      painText,
      rollbackTarget,
      confirmedBy: by,
      actionReason: reason,
      base,
    });

    setRollbackSubmitting(true);
    try {
      await onSubmit(payload);
      setSessionRecord(
        buildSessionRecordAfterRollback({
          base,
          rollbackTarget,
          payload,
          confirmedBy: by,
        })
      );
      setRollbackModalOpen(false);
      setSelectedStep(null);
    } finally {
      setRollbackSubmitting(false);
    }
  }, [
    modalRecord,
    onSubmit,
    painIndex,
    painText,
    rollbackBy,
    rollbackReason,
    rollbackTarget,
    setSessionRecord,
    stepId,
  ]);

  useEffect(() => {
    if (!open) return;
    setShowHistory(false);
    setSelectedStep(null);
  }, [open]);

  const resetFormToSnapshot = useCallback(() => {
    form.setFieldsValue(
      buildReadonlyFormValues({
        displayStep: activeDisplayStep,
        snapshot: activeReviewSnapshot,
        currentStatus,
        commonIssueTypeOptions,
        versionOptions,
        fileKey,
        latestFileKey: reviewLatestFileKey,
      })
    );
  }, [
    activeDisplayStep,
    activeReviewSnapshot,
    commonIssueTypeOptions,
    currentStatus,
    fileKey,
    form,
    reviewLatestFileKey,
    versionOptions,
  ]);

  const resetFormToCurrent = useCallback(() => {
    const currentIsCommon =
      modalRecord?.is_common_issue === true ||
      !!String(modalRecord?.common_issue_type || '').trim();
    const safeCommonIssueType = currentIsCommon
      ? getSafeCommonIssueType(
          modalRecord?.common_issue_type,
          commonIssueTypeOptions
        )
      : undefined;

    if (modalRecord?.status === PainStatus.TO_BE_CONFIRMED) {
      form.setFieldsValue({
        status: PainStatus.TO_BE_CONFIRMED,
        severity: (modalRecord?.severity as PainLevel) || 'P1_CRITICAL',
        non_project_reason: getActionReasonText(modalRecord),
        is_common: currentIsCommon,
        common_issue_type: safeCommonIssueType,
        confirmed_by: '',
        issue_link: '',
        pr_link: '',
        expected_close_time: getCloseDateValue(
          modalRecord?.expected_close_time
        ),
        retest_decision: undefined,
        retest_passed_file_key: latestFileKey || undefined,
      });
      return;
    }

    form.setFieldsValue({
      status: currentStatus,
      severity: modalRecord?.severity
        ? (modalRecord?.severity as PainLevel) || 'P1_CRITICAL'
        : undefined,
      non_project_reason: getActionReasonText(modalRecord),
      is_common:
        currentStatus === PainStatus.TO_BE_CONFIRMED && !modalRecord
          ? false
          : currentIsCommon,
      common_issue_type: safeCommonIssueType,
      confirmed_by:
        currentStatus === PainStatus.CONFIRMED_PENDING_FIX ||
        currentStatus === PainStatus.RETESTED_FAILED ||
        currentStatus === PainStatus.TO_BE_CONFIRMED
          ? ''
          : modalRecord?.confirmed_by || '',
      issue_link:
        currentStatus === PainStatus.CONFIRMED_PENDING_FIX ||
        currentStatus === PainStatus.RETESTED_FAILED
          ? getSafeLinkValue(modalRecord?.issue_link, '', false)
          : '',
      pr_link: '',
      expected_close_time:
        currentStatus === PainStatus.CONFIRMED_PENDING_FIX ||
        currentStatus === PainStatus.RETESTED_FAILED ||
        currentStatus === PainStatus.TO_BE_CONFIRMED
          ? getCloseDateValue(modalRecord?.expected_close_time)
          : null,
      retest_decision: undefined,
      retest_passed_file_key: latestFileKey || undefined,
    });
  }, [commonIssueTypeOptions, currentStatus, form, latestFileKey, modalRecord]);

  useEffect(() => {
    if (!open) return;
    if (isReviewingHistoryStep) {
      resetFormToSnapshot();
    } else {
      resetFormToCurrent();
    }
  }, [open, isReviewingHistoryStep, resetFormToCurrent, resetFormToSnapshot]);

  const isCommon = Form.useWatch('is_common', form);
  const selectedSeverity = Form.useWatch('severity', form);
  const retestDecision = Form.useWatch('retest_decision', form);
  const useCustomFooter = shouldRenderCustomFooter({
    showHistory,
    isReviewingHistoryStep,
    isCurrentNonProjectIssue,
    currentStatus,
    showRetestDecision,
  });

  useEffect(() => {
    if (isCommon !== true) {
      form.setFieldsValue({ common_issue_type: undefined });
    }
  }, [form, isCommon]);

  useEffect(() => {
    if (isNonProjectSeverity(selectedSeverity)) {
      form.setFieldsValue({
        issue_link: undefined,
        expected_close_time: null,
      });
      return;
    }
    form.setFieldsValue({ non_project_reason: undefined });
  }, [form, selectedSeverity]);

  return (
    <Modal
      title={<ModalTitle />}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText={
        showRetestDecision
          ? '提交复测结论'
          : nextStatus === currentStatus
          ? '更新当前状态'
          : '提交'
      }
      cancelText="取消"
      confirmLoading={submitting}
      width="70%"
      styles={{
        body: {
          height: '70vh',
          overflowY: 'auto',
          paddingRight: '8px',
        },
      }}
      destroyOnClose
      footer={
        useCustomFooter ? (
          <ModalFooter
            showHistory={showHistory}
            setShowHistory={setShowHistory}
            isReviewingHistoryStep={isReviewingHistoryStep}
            onCancel={onCancel}
            isCurrentNonProjectIssue={isCurrentNonProjectIssue}
            currentStatus={currentStatus}
            showRetestDecision={showRetestDecision}
            rollbackTargets={rollbackTargets}
            onRollback={openRollback}
          />
        ) : undefined
      }
    >
      <div className="space-y-6">
        <div className="rounded-lg bg-slate-50 p-4">
          <Steps
            current={currentStepIndex}
            items={stepsItems}
            size="small"
            className="pain-steps"
          />
        </div>

        {showHistory ? (
          <HistoryTable data={historyData} loading={historyLoading} />
        ) : (
          <>
            <div className="rounded-lg border border-rose-100 bg-rose-50/80 px-3.5 py-2.5 text-sm leading-relaxed text-rose-800">
              <div className="mb-1 font-semibold">痛点描述：</div>
              {painText}
            </div>

            <PainConfirmationForm
              form={form}
              isReviewingHistoryStep={isReviewingHistoryStep}
              isCurrentNonProjectIssue={isCurrentNonProjectIssue}
              currentStatus={currentStatus}
              activeDisplayStep={activeDisplayStep}
              focusTaskId={stepId}
              isCommon={isCommon}
              commonIssueLoading={commonIssueLoading}
              knownCommonIssues={knownCommonIssues}
              commonIssueTypeOptions={commonIssueTypeOptions}
              showRetestDecision={showRetestDecision}
              latestFileKey={latestFileKey}
              reviewLatestFileKey={reviewLatestFileKey}
              retestDecision={retestDecision}
              versionOptions={(versionOptions || []) as VersionOption[]}
              fileKey={fileKey}
              currentRecord={modalRecord}
              parentPainRemark={modalParentPainRemark}
            />
          </>
        )}
      </div>

      <RollbackConfirmModal
        open={rollbackModalOpen}
        rollbackTarget={rollbackTarget}
        rollbackBy={rollbackBy}
        rollbackReason={rollbackReason}
        rollbackSubmitting={rollbackSubmitting}
        onChangeRollbackBy={setRollbackBy}
        onChangeRollbackReason={setRollbackReason}
        onCancel={() => setRollbackModalOpen(false)}
        onOk={submitRollback}
      />
    </Modal>
  );
};

export { STATUS_LABELS, PainStatus };
export { getPainLevelLabel, getPainLevelStyle } from './utils';

export default PainLevelConfirmModal;
