import React, { useEffect, useMemo, useState } from 'react';
import { toast as hotToast } from 'react-hot-toast';

import type {
  PainConfirmationRecord,
  UpsertPainConfirmationPayload,
} from '../../rawData/apiClient';

import { STATUS_LABELS } from './constants';
import type { StepSnapshot } from './types';
import { PainStatus } from './types';
import { enrichPayloadByStatus, formatStatusTime } from './utils';

export const usePainConfirmationForm = ({
  stepId,
  painIndex,
  painText,
  currentStatus,
  showRetestDecision,
  onSubmit,
  onCancel,
  form,
}: {
  stepId: string;
  painIndex: number;
  painText: string;
  currentStatus: number;
  showRetestDecision: boolean;
  onSubmit: (payload: UpsertPainConfirmationPayload) => Promise<void>;
  onCancel: () => void;
  form: any;
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const basePayload: UpsertPainConfirmationPayload = {
        step_id: stepId,
        pain_index: painIndex,
        pain_text: painText,
        status: values.status,
        confirmed_by: String(values.confirmed_by || '').trim() || null,
      };

      const payload = enrichPayloadByStatus(
        basePayload,
        currentStatus as PainStatus,
        values,
        showRetestDecision
      );

      await onSubmit(payload);
      hotToast.success('痛点状态已更新', {
        position: 'top-center',
        style: { maxWidth: '600px', wordBreak: 'break-all' },
      });
      onCancel();
    } catch (error) {
      if (error && typeof error === 'object' && 'errorFields' in error) {
        return;
      }
      const errMsg = (error as Error).message || '提交失败，请重试';
      hotToast.error(errMsg, {
        position: 'top-center',
        style: { maxWidth: '600px', wordBreak: 'break-all' },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { handleOk, submitting };
};

export const useStepsItems = ({
  displayedStepStatus,
  isReviewingHistoryStep,
  activeDisplayStep,
  currentRecord,
  reviewStepSnapshotMap,
  setSelectedStep,
}: {
  displayedStepStatus: number;
  isReviewingHistoryStep: boolean;
  activeDisplayStep: number;
  currentRecord: PainConfirmationRecord | undefined;
  reviewStepSnapshotMap: Map<number, StepSnapshot | undefined>;
  setSelectedStep: (step: number | null) => void;
}) => {
  return useMemo(() => {
    return [1, 2, 3, 4, 5].map((step) => {
      const isCurrentStep = step === displayedStepStatus;
      const canReviewStep = step < displayedStepStatus;
      const canBackToCurrent = isCurrentStep && isReviewingHistoryStep;
      const isReviewingThisStep =
        isReviewingHistoryStep && activeDisplayStep === step;
      const isStepClickable = canReviewStep || canBackToCurrent;
      const stepSnapshot = isCurrentStep
        ? currentRecord
        : reviewStepSnapshotMap.get(step);
      const timeText =
        step > displayedStepStatus
          ? ''
          : formatStatusTime(
              stepSnapshot?.confirmed_at || currentRecord?.confirmed_at
            );

      const labelContent = (
        <div
          className={`inline-flex min-h-6 items-center rounded-md px-2 py-0 align-middle leading-none transition-all ${
            isReviewingThisStep
              ? 'border border-blue-200 bg-blue-50 text-blue-700 shadow-sm'
              : isStepClickable
              ? 'border border-transparent hover:border-blue-200 hover:bg-blue-50/70'
              : 'border border-transparent'
          }`}
        >
          <span className="whitespace-nowrap leading-5">
            {STATUS_LABELS[step]}
          </span>
        </div>
      );

      const titleContent = (
        <div className="inline-flex items-center gap-2">
          {isStepClickable ? (
            <button
              type="button"
              onClick={() => {
                if (canBackToCurrent) {
                  setSelectedStep(null);
                  return;
                }
                setSelectedStep(step);
              }}
              className="cursor-pointer rounded-sm text-left transition-colors hover:text-blue-600"
            >
              {labelContent}
            </button>
          ) : (
            labelContent
          )}
        </div>
      );

      return {
        title: titleContent,
        description: timeText ? (
          <div className="text-xs leading-5 text-slate-500">{timeText}</div>
        ) : null,
      };
    });
  }, [
    activeDisplayStep,
    currentRecord,
    displayedStepStatus,
    isReviewingHistoryStep,
    reviewStepSnapshotMap,
    setSelectedStep,
  ]);
};

export const useModalSessionState = ({
  open,
  currentRecord,
  parentPainRemark,
}: {
  open: boolean;
  currentRecord?: PainConfirmationRecord | null;
  parentPainRemark?: string | null;
}) => {
  const [sessionRecord, setSessionRecord] = useState<
    PainConfirmationRecord | undefined
  >(currentRecord ?? undefined);
  const [sessionParentPainRemark, setSessionParentPainRemark] = useState<
    string | null | undefined
  >(parentPainRemark);

  useEffect(() => {
    if (!open) {
      setSessionRecord(currentRecord ?? undefined);
      setSessionParentPainRemark(parentPainRemark);
    }
  }, [open, currentRecord, parentPainRemark]);

  useEffect(() => {
    if (open) {
      setSessionRecord(currentRecord ?? undefined);
      setSessionParentPainRemark(parentPainRemark);
    }
  }, [open, currentRecord, parentPainRemark]);

  return {
    sessionRecord,
    setSessionRecord,
    sessionParentPainRemark,
  };
};
