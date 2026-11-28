import React, { useId, useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  type InputRef,
} from 'antd';
import PainModalSection from './PainModalSection';
import { type TrackingAction, type TrackingStatus } from './model';

const RequiredFieldLabel: React.FC<{
  children: string;
  htmlFor?: string;
  id?: string;
}> = ({ children, htmlFor, id }) => {
  const Tag = htmlFor ? 'label' : 'span';
  return (
    <Tag
      id={id}
      htmlFor={htmlFor}
      className="block shrink-0 text-sm font-medium text-slate-700"
    >
      {children}
      <span className="ml-1 text-rose-600" aria-hidden="true">
        *
      </span>
    </Tag>
  );
};

export const OperatorField: React.FC<{
  inputRef: React.RefObject<InputRef>;
  value: string;
  error: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}> = ({ inputRef, value, error, disabled, onChange, onBlur }) => {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="min-w-0 max-w-xs space-y-2">
      <RequiredFieldLabel htmlFor={id}>提交人</RequiredFieldLabel>
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
        onBlur={onBlur}
      />
      {error && (
        <div id={errorId} role="alert" className="mt-1.5 text-xs text-rose-600">
          {error}
        </div>
      )}
    </div>
  );
};

type ValidityFormValues = {
  valid: boolean;
  reason?: string;
};

const ValidityDecision: React.FC<{
  valid?: boolean;
  disabled: boolean;
  labelId: string;
  hintId?: string;
}> = ({ valid, disabled, labelId, hintId }) => (
  <div className="max-w-2xl">
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      aria-describedby={hintId}
      aria-required="true"
    >
      <Form.Item
        name="valid"
        noStyle
        preserve={false}
        rules={[{ required: true }]}
      >
        <Radio.Group name={labelId} disabled={disabled}>
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
    {valid === false && (
      <Form.Item
        className="!mb-0 mt-3"
        name="reason"
        label="判断依据"
        rules={[
          { required: true, whitespace: true, message: '请填写判断依据' },
        ]}
        preserve={false}
      >
        <Input.TextArea
          aria-label="无效问题判断依据"
          rows={3}
          maxLength={500}
          showCount
          disabled={disabled}
          placeholder="请填写判为非有效问题的依据"
        />
      </Form.Item>
    )}
  </div>
);

type DecisionActions = {
  status: TrackingStatus;
  reason: string;
  saving: boolean;
  onReasonChange: (value: string) => void;
  onAction: (action: TrackingAction, reason?: string) => void;
};

const SavedValidityDecision: React.FC<
  DecisionActions & {
    labelId: string;
    hintId?: string;
    operatorReady: boolean;
    reviewComplete: boolean;
  }
> = ({
  status,
  reason,
  saving,
  labelId,
  hintId,
  operatorReady,
  reviewComplete,
  onReasonChange,
  onAction,
}) => {
  const currentValid = status !== 'invalid';
  const [draft, setDraft] = useState<boolean | null>(null);
  const editing = draft !== null;
  const selected = draft ?? currentValid;
  const reasonRequired = currentValid && draft === false;
  const actionsDisabled = saving || !operatorReady;
  return (
    <div className="space-y-2">
      <div
        role="group"
        aria-labelledby={labelId}
        aria-describedby={hintId}
        className="flex flex-wrap gap-x-4"
      >
        <Checkbox
          checked={selected}
          disabled={!editing || saving}
          onChange={() => setDraft(true)}
        >
          是
        </Checkbox>
        <Checkbox
          checked={!selected}
          disabled={!editing || saving}
          onChange={() => setDraft(false)}
        >
          否
        </Checkbox>
      </div>
      {editing ? (
        <div className="max-w-2xl space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            {reasonRequired ? '判为非有效问题的依据' : '操作说明（选填）'}
            <Input.TextArea
              aria-label={reasonRequired ? '无效问题判断依据' : '操作说明'}
              value={reason}
              required={reasonRequired}
              showCount={reasonRequired}
              maxLength={500}
              rows={2}
              disabled={saving}
              onChange={(event) => onReasonChange(event.target.value)}
              className="mt-2"
              placeholder={
                reasonRequired ? '请填写改判依据' : '可填写调整判定的原因'
              }
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button
              type="primary"
              loading={saving}
              disabled={
                actionsDisabled ||
                !reviewComplete ||
                selected === currentValid ||
                (reasonRequired && !reason.trim())
              }
              onClick={() =>
                onAction(selected ? 'restore_valid' : 'mark_invalid', reason)
              }
            >
              保存判定
            </Button>
            <Button
              disabled={saving}
              onClick={() => {
                setDraft(null);
                onReasonChange('');
              }}
            >
              取消调整
            </Button>
            <Button
              type="text"
              disabled={actionsDisabled}
              className="!text-slate-500"
              onClick={() => onAction('reset', reason)}
            >
              回退待确认
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="link"
          className="!px-0"
          disabled={saving}
          onClick={() => {
            onReasonChange('');
            setDraft(currentValid);
          }}
        >
          调整问题判定
        </Button>
      )}
    </div>
  );
};

const PainHandlingPanel: React.FC<
  DecisionActions & {
    ready: boolean;
    reviewComplete: boolean;
    operatorReady: boolean;
    operatorField: React.ReactNode;
    runReview: React.ReactNode;
    error: string;
  }
> = ({
  ready,
  reviewComplete,
  operatorReady,
  operatorField,
  runReview,
  error,
  ...actions
}) => {
  const [form] = Form.useForm<ValidityFormValues>();
  const valid = Form.useWatch('valid', form);
  const runReviewLabelId = useId();
  const validityLabelId = useId();
  const reviewHintId = useId();
  if (!ready && !runReview) return null;
  const awaitingDecision = actions.status === 'pending';
  const canDecide = ready && operatorReady && reviewComplete && !actions.saving;
  return (
    <PainModalSection
      title="问题审核"
      completed={ready && actions.status === 'confirmed'}
    >
      <Form
        form={form}
        layout="vertical"
        aria-label="问题审核表单"
        noValidate
        className="space-y-4"
        onFinish={({ valid, reason }: ValidityFormValues) => {
          if (!awaitingDecision || !canDecide) return;
          if (valid === true) actions.onAction('confirm');
          if (valid === false) actions.onAction('mark_invalid', reason);
        }}
      >
        <div className="space-y-2">
          {operatorField}
          {!operatorReady && ready && (
            <p className="text-xs text-slate-500">请先填写提交人。</p>
          )}
        </div>
        <section
          aria-labelledby={runReviewLabelId}
          className="space-y-2 border-t border-slate-200 pt-4"
        >
          <RequiredFieldLabel id={runReviewLabelId}>
            判据审核
          </RequiredFieldLabel>
          {runReview || (
            <p className="text-sm text-slate-500">暂无可审核的判据</p>
          )}
        </section>
        {(ready || error) && (
          <div className="space-y-2 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <RequiredFieldLabel id={validityLabelId}>
                是否为有效问题
              </RequiredFieldLabel>
              {!reviewComplete && (
                <p
                  id={reviewHintId}
                  role="status"
                  className="text-xs text-slate-600"
                >
                  请先完成全部判据审核，再提交问题结论或更新处理状态。
                </p>
              )}
            </div>
            {ready && awaitingDecision && (
              <ValidityDecision
                valid={valid}
                disabled={!canDecide}
                labelId={validityLabelId}
                hintId={reviewComplete ? undefined : reviewHintId}
              />
            )}
            {ready && !awaitingDecision && (
              <SavedValidityDecision
                key={actions.status === 'invalid' ? 'invalid' : 'valid'}
                {...actions}
                labelId={validityLabelId}
                hintId={reviewComplete ? undefined : reviewHintId}
                operatorReady={operatorReady}
                reviewComplete={reviewComplete}
              />
            )}
            {error && <Alert type="error" showIcon message={error} />}
            {ready && awaitingDecision && (
              <Button
                type="primary"
                htmlType="submit"
                autoInsertSpace={false}
                disabled={!canDecide || valid === undefined}
                loading={actions.saving}
              >
                提交
              </Button>
            )}
          </div>
        )}
      </Form>
    </PainModalSection>
  );
};

export default PainHandlingPanel;
