import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import toast from 'react-hot-toast';
import type {
  IssuePainTracking,
  IssuePainTrackingActionPayload,
} from '../types';
import { useTrackingOperator } from './PainTrackingModal/hooks';
import { validateOperator } from './PainTrackingModal/utils';

type Props = {
  tracking: IssuePainTracking;
  issueNumbers: string[];
  valid: boolean;
  onAction: (
    payload: Omit<IssuePainTrackingActionPayload, 'community'>
  ) => Promise<IssuePainTracking>;
  operator?: string;
  disabled?: boolean;
  batch?: boolean;
  onDone?: () => void;
};

const IssueValidityButton: React.FC<Props> = ({
  tracking,
  issueNumbers,
  valid,
  onAction,
  operator: initialOperator,
  disabled,
  batch,
  onDone,
}) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [targetNumbers, setTargetNumbers] = useState<string[]>([]);
  const { operator, setOperator, rememberOperator } = useTrackingOperator();
  const label = valid ? '恢复为有效问题' : '判定为非有效问题';
  const submit = async () => {
    const error = validateOperator(operator);
    if (error) return void toast.error(error);
    if (!reason.trim()) return void toast.error('请填写判断原因');
    setSubmitting(true);
    try {
      await onAction({
        trackingKey: tracking.trackingKey,
        type: 'revise_issue_validity',
        issueNumbers: targetNumbers,
        valid,
        reason: reason.trim(),
        operator: rememberOperator(operator),
      });
      setOpen(false);
      onDone?.();
      toast.success(
        valid ? '已恢复为有效问题，需重新修复' : '已判定为非有效问题'
      );
    } catch {
      // 页面 action handler 展示服务端错误；保留表单便于重试。
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <button
        type="button"
        disabled={disabled || !issueNumbers.length}
        className="rounded-lg px-2 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => {
          if (initialOperator !== undefined) setOperator(initialOperator);
          setTargetNumbers([...issueNumbers]);
          setReason('');
          setOpen(true);
        }}
      >
        {batch ? '批量' : ''}
        {label}
      </button>
      <Modal
        className="issue-pain-validity-modal"
        open={open}
        title={label}
        centered
        width={480}
        onCancel={() => {
          if (!submitting) setOpen(false);
        }}
        closable={!submitting}
        maskClosable={!submitting}
        styles={{ content: { borderRadius: 16 } }}
        footer={[
          <Button
            key="cancel"
            disabled={submitting}
            style={{ borderRadius: 10 }}
            onClick={() => setOpen(false)}
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={submitting}
            style={{ borderRadius: 10 }}
            onClick={() => void submit()}
          >
            确认修改
          </Button>,
        ]}
      >
        <div className="space-y-4 pb-4">
          <p className="max-h-24 overflow-y-auto text-xs leading-5 text-slate-500">
            {targetNumbers.map((number) => '#' + number).join('、')}
          </p>
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">
            {valid
              ? '恢复后按未修复处理，需重新完成修复和复测。v4 报告会重新纳入对应指标评分并更新各级得分。'
              : '判定后将不再计入修复进度和复测范围。v4 报告会排除对应指标评分并更新各级得分，其他指标继续参与。后续可恢复为有效问题。'}
          </p>
          <label className="block text-sm text-slate-600">
            提交人 <span className="text-rose-500">*</span>
            <Input
              value={operator}
              disabled={submitting}
              maxLength={20}
              placeholder="请输入提交人"
              style={{ borderRadius: 10, marginTop: 6 }}
              onChange={(event) => setOperator(event.target.value)}
            />
          </label>
          <label className="block text-sm text-slate-600">
            判断原因 <span className="text-rose-500">*</span>
            <Input.TextArea
              value={reason}
              disabled={submitting}
              rows={3}
              maxLength={200}
              placeholder="请说明修改判定的原因"
              style={{ borderRadius: 10, marginTop: 6 }}
              onChange={(event) => setReason(event.target.value)}
            />
            <span className="mt-1 block text-right text-xs text-slate-400">
              {reason.length}/200
            </span>
          </label>
        </div>
      </Modal>
      <style jsx global>{`
        .issue-pain-validity-modal .ant-modal-content {
          border-radius: 16px !important;
        }
        .issue-pain-validity-modal .ant-input,
        .issue-pain-validity-modal .ant-input-affix-wrapper,
        .issue-pain-validity-modal .ant-modal-footer .ant-btn {
          border-radius: 10px !important;
        }
      `}</style>
    </>
  );
};

export default IssueValidityButton;
