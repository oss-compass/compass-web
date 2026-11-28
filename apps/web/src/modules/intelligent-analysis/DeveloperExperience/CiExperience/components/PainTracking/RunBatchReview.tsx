import React, { useRef, useState } from 'react';
import { Alert, Button, Input, Modal } from 'antd';
import toast from 'react-hot-toast';
import type { TrackingScope } from './model';
import {
  savePainRunReviews,
  runReviewLabels,
  type CiRunRuleReview,
  type CiRunReviewAction,
} from '../../ruleReviews';
import { validateOperator } from '../../../IssueContribution/components/PainTrackingModal/utils';

type Props = {
  scope: TrackingScope;
  problemKey: string;
  selected: CiRunRuleReview[];
  pending: CiRunRuleReview[];
  busy: boolean;
  operator: string;
  onOperatorInvalid: (message: string) => void;
  rememberOperator: (value: string) => void;
  onSelectPending: () => void;
  onClear: () => void;
  onSaved: (ids: string[]) => void;
  onBusy: (value: boolean) => void;
  onRefresh: () => Promise<unknown>;
};

const RunBatchReview: React.FC<Props> = (props) => {
  const [target, setTarget] = useState<{
    action: CiRunReviewAction;
    rows: CiRunRuleReview[];
  } | null>(null);
  const [reason, setReason] = useState('');
  const [failure, setFailure] = useState<{
    message: string;
    errors: string[];
  } | null>(null);
  const submitting = useRef(false);
  const [loadingAction, setLoadingAction] = useState<CiRunReviewAction | null>(
    null
  );
  const open = (action: CiRunReviewAction) => {
    const validation = validateOperator(props.operator);
    if (validation) {
      props.onOperatorInvalid(validation);
      return;
    }
    props.onOperatorInvalid('');
    setReason('');
    setTarget({ action, rows: [...props.selected] });
  };
  const submit = async () => {
    if (!target || submitting.current || props.busy) return;
    const validation = validateOperator(props.operator);
    if (validation) {
      props.onOperatorInvalid(validation);
      return;
    }
    if (target.action !== 'confirmed' && !reason.trim()) return;
    submitting.current = true;
    setLoadingAction(target.action);
    props.onBusy(true);
    let uncertain = false;
    const succeeded: string[] = [],
      errors: string[] = [];
    try {
      // 超过100条按当前选中快照分批，绝不扩大范围或自动更换版本重试。
      for (let start = 0; start < target.rows.length; start += 100) {
        const chunk = target.rows.slice(start, start + 100);
        try {
          const result = await savePainRunReviews({
            ...props.scope,
            problemKey: props.problemKey,
            action: target.action,
            operator: props.operator.trim(),
            reason: reason.trim(),
            items: chunk.map((row) => ({
              instance_id: row.instance_id,
              revision: row.revision,
              evidence_revision: row.evidence_revision,
            })),
          });
          const results = new Map(
            result.items.map((item) => [item.instance_id, item])
          );
          chunk.forEach((row) => {
            const item = results.get(row.instance_id);
            if (item?.ok) succeeded.push(row.instance_id);
            else
              errors.push(
                `#${row.run.n}：${item?.error || '未返回保存结果，请刷新确认'}`
              );
          });
          if (result.tracking_error) errors.push(result.tracking_error);
        } catch (e) {
          uncertain = true;
          errors.push(
            e instanceof Error ? e.message : '请求失败，请刷新后确认保存结果'
          );
          if (start + 100 < target.rows.length)
            errors.push(`其余 ${target.rows.length - start - 100} 条尚未提交`);
          break;
        }
      }
      if (succeeded.length) props.rememberOperator(props.operator);
      props.onSaved(succeeded);
      const message = `${uncertain ? '已确认保存' : '已保存'} ${
        succeeded.length
      }/${target.rows.length} 条${errors.length ? '，请查看失败明细' : ''}`;
      setFailure(errors.length ? { message, errors } : null);
      setTarget(null);
      if (errors.length) toast.error(message);
      else toast.success(message);
      await props.onRefresh();
    } finally {
      submitting.current = false;
      setLoadingAction(null);
      props.onBusy(false);
    }
  };
  const disabled = props.busy || !props.selected.length;
  return (
    <>
      <div className="flex flex-wrap items-center justify-end gap-3 border-b border-slate-200 bg-slate-50/70 px-3 py-2">
        <span
          className="mr-auto text-xs text-slate-500"
          role="status"
          aria-label="批量选择"
          aria-live="polite"
        >
          已选 {props.selected.length} 条
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="link"
            size="small"
            disabled={props.busy || !props.pending.length}
            onClick={props.onSelectPending}
          >
            选择全部待审核（{props.pending.length}）
          </Button>
          {props.selected.length > 0 && (
            <Button
              type="text"
              size="small"
              disabled={props.busy}
              onClick={props.onClear}
            >
              清空选择
            </Button>
          )}
          <Button
            size="small"
            className="ci-run-bulk-button !h-7 !border-emerald-200 !bg-emerald-50 !px-3 !font-medium !text-emerald-700 !shadow-none hover:!border-emerald-300 hover:!bg-emerald-100"
            disabled={disabled}
            loading={loadingAction === 'confirmed'}
            onClick={() => open('confirmed')}
          >
            批量标记正确
          </Button>
          <Button
            size="small"
            className="ci-run-bulk-button !h-7 !border-rose-200 !bg-rose-50 !px-3 !font-medium !text-rose-600 !shadow-none hover:!border-rose-300 hover:!bg-rose-100"
            disabled={disabled}
            loading={loadingAction === 'incorrect'}
            onClick={() => open('incorrect')}
          >
            批量标记有误
          </Button>
        </div>
      </div>
      {failure && (
        <Alert
          type="warning"
          showIcon
          message={failure.message}
          description={
            <details>
              <summary className="cursor-pointer">查看失败明细</summary>
              <ul className="mt-2 space-y-1">
                {failure.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <div className="mt-2">
                未成功的记录保留勾选，请核对最新状态后重新选择并提交。
              </div>
            </details>
          }
        />
      )}
      <Modal
        open={Boolean(target)}
        title={`批量审核：${target ? runReviewLabels[target.action] : ''}`}
        className="ci-pain-invalid-modal"
        width={520}
        centered
        destroyOnHidden
        footer={null}
        closable={!props.busy}
        maskClosable={!props.busy}
        keyboard={!props.busy}
        onCancel={() => {
          if (!props.busy) setTarget(null);
        }}
      >
        <div className="space-y-4">
          <p className="text-sm leading-6 text-slate-600">
            本次提交当前痛点中已勾选的 <strong>{target?.rows.length} 条</strong>
            执行记录，包括其他分页中的勾选项。
          </p>
          <p className="text-sm text-slate-600">提交人：{props.operator}</p>
          {target?.action !== 'confirmed' ? (
            <label className="block text-sm font-medium text-slate-700">
              原因
              <span className="ml-1 text-rose-600" aria-hidden="true">
                *
              </span>
              <Input.TextArea
                aria-label="批量审核原因"
                placeholder="请说明判据有误的原因及建议修正内容"
                value={reason}
                disabled={props.busy}
                onChange={(event) => setReason(event.target.value)}
                maxLength={500}
                rows={4}
                required
                className="mt-2"
              />
              <span className="mt-2 block text-right text-xs font-normal leading-5 text-slate-400">
                {reason.length} / 500
              </span>
            </label>
          ) : null}
          <div className="flex justify-end gap-2">
            <Button disabled={props.busy} onClick={() => setTarget(null)}>
              取消
            </Button>
            <Button
              type="primary"
              danger={target?.action === 'incorrect'}
              disabled={target?.action !== 'confirmed' && !reason.trim()}
              loading={props.busy}
              onClick={() => void submit()}
            >
              确认提交 {target?.rows.length} 条
            </Button>
          </div>
        </div>
      </Modal>
      <style jsx global>{`
        .ci-run-bulk-button.ant-btn:disabled {
          border-color: #e2e8f0 !important;
          background: #f8fafc !important;
          color: #94a3b8 !important;
          box-shadow: none !important;
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
};
export default RunBatchReview;
