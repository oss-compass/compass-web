import React, { useId } from 'react';
import { Alert, Button, Input, Tooltip, type InputRef } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { CiProblem } from '../../types';
import CommonIssueJudgment from './CommonIssueJudgment';
import PainModalSection from './PainModalSection';
import {
  trackingProblemKey,
  type TrackingAction,
  type TrackingStatus,
} from './model';

export const OperatorField: React.FC<{
  inputRef: React.RefObject<InputRef>;
  value: string;
  error: string;
  disabled: boolean;
  onChange: (value: string) => void;
}> = ({ inputRef, value, error, disabled, onChange }) => {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="min-w-0 max-w-xs">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        提交人
        <span className="ml-1 text-rose-600" aria-hidden="true">
          *
        </span>
      </label>
      <Input
        ref={inputRef}
        id={id}
        aria-label="提交人"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required
        status={error ? 'error' : undefined}
        value={value}
        placeholder="请输入姓名"
        maxLength={20}
        autoComplete="off"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && (
        <div id={errorId} role="alert" className="mt-1.5 text-xs text-rose-600">
          {error}
        </div>
      )}
    </div>
  );
};

type WorkflowActionsProps = {
  status: TrackingStatus;
  reason: string;
  saving: boolean;
  hasRuns: boolean;
  onReasonChange: (value: string) => void;
  onAction: (action: TrackingAction, reason?: string) => void;
  onInvalid: () => void;
};

const WorkflowActions: React.FC<WorkflowActionsProps> = ({
  status,
  reason,
  saving,
  hasRuns,
  onReasonChange,
  onAction,
  onInvalid,
}) => {
  if (status === 'pending') {
    return (
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-700">
          是否为有效问题
          <span className="ml-1 text-rose-600" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            disabled={saving}
            onClick={() => onAction('confirm')}
          >
            是，有效问题
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            disabled={saving}
            onClick={onInvalid}
          >
            否，非有效问题
          </Button>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          判为非有效问题时需填写依据。
        </p>
      </fieldset>
    );
  }

  if (status === 'invalid' && hasRuns) {
    return (
      <p className="text-sm text-slate-600">可在执行记录中重新审核判据。</p>
    );
  }

  const repairing = status === 'confirmed';
  return (
    <div className="space-y-3">
      {status === 'fixed' && (
        <p className="text-sm font-medium text-slate-700">
          修复已完成，等待重跑复测
        </p>
      )}
      <label className="block max-w-2xl">
        <span className="text-sm font-medium text-slate-700">
          {repairing ? '修复说明' : '操作说明'}
        </span>
        <span className="ml-1 text-xs text-slate-500">（选填）</span>
        <Input.TextArea
          value={reason}
          maxLength={500}
          rows={2}
          disabled={saving}
          onChange={(event) => onReasonChange(event.target.value)}
          className="mt-2"
          placeholder={
            repairing
              ? '可填写修复内容、PR 或工单链接'
              : '可填写本次状态调整的原因'
          }
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {repairing && (
          <Button
            type="primary"
            icon={<CheckOutlined />}
            aria-label="完成修复"
            loading={saving}
            onClick={() => onAction('mark_fixed', reason)}
          >
            完成修复
          </Button>
        )}
        {status === 'fixed' && (
          <>
            <Tooltip title="重跑能力正在接入">
              <span>
                <Button
                  icon={<ReloadOutlined />}
                  aria-label="重跑（暂未开放）"
                  disabled
                >
                  重跑（暂未开放）
                </Button>
              </span>
            </Tooltip>
            <Button
              disabled={saving}
              onClick={() => onAction('undo_fixed', reason)}
            >
              撤销修复
            </Button>
          </>
        )}
        {!hasRuns && (
          <>
            {status === 'invalid' ? (
              <Button
                type="primary"
                disabled={saving}
                onClick={() => onAction('restore_valid', reason)}
              >
                恢复为有效问题
              </Button>
            ) : (
              <Button danger disabled={saving} onClick={onInvalid}>
                判为非有效问题
              </Button>
            )}
            <Button
              type="text"
              disabled={saving}
              className="!text-slate-500"
              onClick={() => onAction('reset', reason)}
            >
              回退待确认
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const PainHandlingPanel: React.FC<
  Omit<WorkflowActionsProps, 'hasRuns'> & {
    problem: CiProblem;
    problems: CiProblem[];
    ready: boolean;
    operatorField: React.ReactNode;
    error: string;
  }
> = ({ problem, problems, ready, operatorField, error, ...actions }) => {
  const hasRuns = problem.runs.length > 0;
  if (!ready && !hasRuns) return null;
  const showCommonIssue = ready && actions.status === 'pending';
  const showActions = ready && (!hasRuns || actions.status !== 'pending');
  return (
    <PainModalSection title="处理信息">
      {showCommonIssue && (
        <CommonIssueJudgment
          key={trackingProblemKey(problem)}
          problem={problem}
          problems={problems}
          disabled={actions.saving}
        />
      )}
      <div
        className={
          showCommonIssue ? 'border-t border-slate-200 pt-3' : undefined
        }
      >
        {operatorField}
      </div>
      {showActions && (
        <div className="border-t border-slate-200 pt-4">
          <WorkflowActions {...actions} hasRuns={hasRuns} />
        </div>
      )}
      {error && <Alert type="error" showIcon message={error} />}
    </PainModalSection>
  );
};

export default PainHandlingPanel;
