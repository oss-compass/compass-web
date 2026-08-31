import React from 'react';
import { CheckOutlined, CloseOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Pagination, Popconfirm, Tooltip } from 'antd';
import { getScoreTone } from '../presentation';
import type {
  IssuePainTracking,
  IssuePainTrackingActionPayload,
  IssueReportPainIssue,
} from '../types';
import { IssuePainTrackingStatus } from '../types';
import { IssueFixButton } from './PainTrackingModal/components';
import { useTrackingOperator } from './PainTrackingModal/hooks';
import {
  formatTrackingTime,
  validateOperator,
} from './PainTrackingModal/utils';

const EVIDENCE_TYPE_META: Record<string, { label: string; cls: string }> = {
  open: { label: '创建', cls: 'bg-sky-50 text-sky-600' },
  comment: { label: '评论', cls: 'bg-slate-100 text-slate-600' },
  assign: { label: '指派', cls: 'bg-violet-50 text-violet-600' },
  label: { label: '打标', cls: 'bg-amber-50 text-amber-600' },
  close: { label: '关闭', cls: 'bg-rose-50 text-rose-600' },
  reopen: { label: '重开', cls: 'bg-emerald-50 text-emerald-600' },
  pr: { label: '关联 PR', cls: 'bg-indigo-50 text-indigo-600' },
};

const getEvidenceMeta = (type: string) =>
  EVIDENCE_TYPE_META[type] ?? {
    label: type || '动作',
    cls: 'bg-slate-100 text-slate-500',
  };

const PAIN_ISSUE_TABLE_LAYOUTS = {
  default: {
    table: 'min-w-[1090px]',
    issue: 'w-[210px]',
    score: 'w-[68px]',
    reason: 'w-[230px]',
    decision: 'w-[150px]',
    status: 'w-[150px]',
    action: 'w-[140px]',
    selection: 'w-[44px]',
  },
  responsive: {
    table: 'issue-pain-table-responsive min-w-0',
    issue: 'w-[18%]',
    score: 'w-[6%]',
    reason: 'w-[18%]',
    decision: 'w-[16%]',
    status: 'w-[11%]',
    action: 'w-[14%]',
    selection: 'w-[4%]',
  },
} as const;

const getPainIssueTableLayout = (responsive: boolean) =>
  responsive
    ? PAIN_ISSUE_TABLE_LAYOUTS.responsive
    : PAIN_ISSUE_TABLE_LAYOUTS.default;

export type PainIssueDecisionDraft = {
  valid?: boolean;
  reason?: string;
};

type PainIssueTableProps = {
  issues: IssueReportPainIssue[];
  tracking?: IssuePainTracking;
  pagination?: boolean;
  responsive?: boolean;
  decisions?: Record<string, PainIssueDecisionDraft>;
  onDecisionsChange?: (
    decisions: Record<string, PainIssueDecisionDraft>
  ) => void;
  onTrackingAction?: (
    payload: Omit<IssuePainTrackingActionPayload, 'community'>
  ) => Promise<IssuePainTracking>;
};

/**
 * 待确认阶段的行内即时判定控件：点"是/否"直接提交，无需二次确认；
 * 判定为"否"后展示判断原因输入框（选填），可随时补充，回车或失焦自动保存。
 * 每次提交前统一校验表格右上角的共享提交人输入框。
 */
const IssueDecisionControl: React.FC<{
  decided: {
    valid: boolean | null;
    reason?: string | null;
    decidedBy?: string | null;
    decidedAt?: string | null;
  };
  operator: string;
  onOperatorInvalid: (message: string) => void;
  onSubmit: (valid: boolean, reason?: string) => Promise<unknown>;
}> = ({ decided, operator, onOperatorInvalid, onSubmit }) => {
  const [reasonDraft, setReasonDraft] = React.useState(decided.reason ?? '');
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    setReasonDraft(decided.reason ?? '');
  }, [decided.reason]);

  const decide = async (valid: boolean, reason?: string) => {
    const validation = validateOperator(operator);
    if (validation) {
      onOperatorInvalid(validation);
      return false;
    }
    setSubmitting(true);
    try {
      await onSubmit(valid, reason?.trim() || undefined);
      return true;
    } catch {
      return false; // 页面级 action handler 已展示错误信息
    } finally {
      setSubmitting(false);
    }
  };

  // 判定为"否"后补充/修改判断原因：值发生变化时才提交。
  const saveReason = async () => {
    const next = reasonDraft.trim();
    if (next === (decided.reason ?? '').trim()) return;
    await decide(false, next);
  };

  const segmentClass = (active: boolean, tone: 'emerald' | 'rose') =>
    `inline-flex h-6 min-w-12 cursor-pointer items-center justify-center gap-1 rounded-md border px-2 py-0 text-[11px] font-medium leading-5 transition-colors disabled:cursor-not-allowed ${
      active
        ? tone === 'emerald'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-rose-200 bg-rose-50 text-rose-600'
        : 'border-transparent bg-transparent text-slate-500 hover:bg-white hover:text-slate-700'
    }`;

  const decidedTooltip =
    decided.valid === null ? null : (
      <div className="space-y-1 text-[12px] leading-5 text-slate-600">
        <div>
          判定人：
          <span className="font-medium">{decided.decidedBy || '—'}</span>
        </div>
        <div>
          判定时间：
          <span className="font-medium">
            {formatTrackingTime(decided.decidedAt) || '—'}
          </span>
        </div>
        {decided.valid === false && decided.reason ? (
          <div>
            判断原因：<span className="font-medium">{decided.reason}</span>
          </div>
        ) : null}
      </div>
    );

  const segments = (
    <div className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-100/80 p-0.5">
      <button
        type="button"
        disabled={submitting}
        className={segmentClass(decided.valid === true, 'emerald')}
        onClick={() => void decide(true)}
      >
        <CheckOutlined className="text-[10px]" />是
      </button>
      <button
        type="button"
        disabled={submitting}
        className={segmentClass(decided.valid === false, 'rose')}
        onClick={() => void decide(false)}
      >
        <CloseOutlined className="text-[10px]" />否
      </button>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-start gap-1">
      {decidedTooltip ? (
        <Tooltip
          title={decidedTooltip}
          placement="topLeft"
          color="#ffffff"
          overlayInnerStyle={{ padding: 10 }}
        >
          {segments}
        </Tooltip>
      ) : (
        segments
      )}
      {decided.valid === false ? (
        <Input
          size="small"
          className="issue-pain-decision-reason !h-6 !w-full !border-slate-200 !bg-white !px-2 !text-[11px] focus:!border-sky-300 focus:!shadow-none"
          value={reasonDraft}
          maxLength={200}
          placeholder="判断原因（选填）"
          disabled={submitting}
          onChange={(event) => setReasonDraft(event.target.value)}
          onPressEnter={() => void saveReason()}
          onBlur={() => void saveReason()}
        />
      ) : null}
    </div>
  );
};

/**
 * 状态流转后的判断原因补充输入：放在状态列"非有效问题"标签下方，
 * 回车或失焦保存（值变化才提交），提交前校验共享提交人。
 */
const PostDecisionReasonInput: React.FC<{
  reason?: string | null;
  operator: string;
  onOperatorInvalid: (message: string) => void;
  onSubmit: (reason?: string) => Promise<unknown>;
}> = ({ reason, operator, onOperatorInvalid, onSubmit }) => {
  const [draft, setDraft] = React.useState(reason ?? '');
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    setDraft(reason ?? '');
  }, [reason]);

  const save = async () => {
    const validation = validateOperator(operator);
    if (validation) {
      onOperatorInvalid(validation);
      setError(validation);
      return;
    }
    const next = draft.trim();
    if (next === (reason ?? '').trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await onSubmit(next || undefined);
    } catch {
      // 页面级 action handler 已展示错误信息
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Input
        size="small"
        className="issue-pain-decision-reason !h-6 !w-full !border-slate-200 !bg-white !px-2 !text-[11px] focus:!border-sky-300 focus:!shadow-none"
        value={draft}
        maxLength={200}
        placeholder="判断原因（选填）"
        disabled={submitting}
        onChange={(event) => {
          setDraft(event.target.value);
          if (error) setError('');
        }}
        onPressEnter={() => void save()}
        onBlur={() => void save()}
      />
      {error ? (
        <div className="mt-1 text-[10px] text-rose-500">{error}</div>
      ) : null}
    </div>
  );
};

type ActiveTrackingIssue = IssuePainTracking['activeIssues'][number];
type TrackingActionHandler = NonNullable<
  PainIssueTableProps['onTrackingAction']
>;

const IssueSummaryCells: React.FC<{ issue: IssueReportPainIssue }> = ({
  issue,
}) => {
  const rawIssueScore: unknown = issue.score;
  const hasIssueScore =
    rawIssueScore !== null &&
    rawIssueScore !== undefined &&
    rawIssueScore !== '' &&
    Number.isFinite(Number(rawIssueScore));
  const issueTone = hasIssueScore ? getScoreTone(Number(rawIssueScore)) : null;
  return (
    <>
      <td className="border-b border-slate-100 px-3 py-2.5">
        <a
          href={issue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
        >
          <LinkOutlined className="text-[11px]" />#{issue.number}
        </a>
        <Tooltip title={issue.title} placement="topLeft">
          <div className="mt-1 line-clamp-2 break-words leading-5 text-slate-600">
            {issue.title}
          </div>
        </Tooltip>
      </td>
      <td className="border-b border-slate-100 px-3 py-2.5 text-center">
        {issueTone ? (
          <span
            className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold ${issueTone.badge}`}
          >
            {Number(rawIssueScore)}
          </span>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </td>
      <td className="border-b border-slate-100 px-3 py-2.5 align-top leading-5 text-slate-600">
        <Tooltip
          title={
            <div className="flex w-[420px] max-w-[72vw] items-start gap-2">
              <span className="mt-0.5 shrink-0 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                原因
              </span>
              <div className="min-w-0 break-words text-[12px] leading-5 text-slate-700">
                {issue.reason || '—'}
              </div>
            </div>
          }
          placement="topLeft"
          color="#ffffff"
          overlayStyle={{ maxWidth: 480 }}
          overlayInnerStyle={{ padding: 12 }}
        >
          <div className="line-clamp-2 break-words">{issue.reason || '—'}</div>
        </Tooltip>
      </td>
      <td className="border-b border-slate-100 px-3 py-2.5 align-top">
        {issue.evidence.length ? (
          <Tooltip
            title={
              <div className="w-[500px] max-w-[76vw] space-y-2">
                {issue.evidence.map((ev, index) => {
                  const meta = getEvidenceMeta(ev.type);
                  return (
                    <div
                      key={`${ev.type}-tooltip-${index}`}
                      className="flex items-start gap-2"
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${meta.cls}`}
                      >
                        {meta.label}
                      </span>
                      <div className="min-w-0 break-words text-[12px] leading-5 text-slate-700">
                        {ev.actor ? (
                          <span className="mr-1 font-semibold text-slate-500">
                            {ev.actor}：
                          </span>
                        ) : null}
                        <span>{ev.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            }
            placement="topLeft"
            color="#ffffff"
            overlayStyle={{ maxWidth: 560 }}
            overlayInnerStyle={{ padding: 12 }}
          >
            <div className="h-11 overflow-hidden">
              <ul className="space-y-1">
                {issue.evidence.slice(0, 2).map((ev, index) => {
                  const meta = getEvidenceMeta(ev.type);
                  return (
                    <li
                      key={`${ev.type}-${index}`}
                      className="flex h-5 min-w-0 items-start gap-1.5 overflow-hidden"
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${meta.cls}`}
                      >
                        {meta.label}
                      </span>
                      <span className="min-w-0 flex-1 truncate leading-5 text-slate-600">
                        {ev.actor ? (
                          <span className="font-medium text-slate-500">
                            {ev.actor}：
                          </span>
                        ) : null}
                        {ev.url ? (
                          <a
                            href={ev.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {ev.text}
                          </a>
                        ) : (
                          ev.text
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Tooltip>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </td>
    </>
  );
};

const DecisionTooltipContent: React.FC<{ issue: ActiveTrackingIssue }> = ({
  issue,
}) => (
  <div className="space-y-1 text-[12px] leading-5 text-slate-600">
    <div>
      操作人：<span className="font-medium">{issue.decided_by || '—'}</span>
    </div>
    <div>
      操作时间：
      <span className="font-medium">
        {formatTrackingTime(issue.decided_at)}
      </span>
    </div>
  </div>
);

type DecisionCellProps = {
  issue: IssueReportPainIssue;
  activeIssue?: ActiveTrackingIssue;
  show: boolean;
  draftMode: boolean;
  decisions?: Record<string, PainIssueDecisionDraft>;
  onDecisionsChange?: PainIssueTableProps['onDecisionsChange'];
  updateDecisions: (numbers: string[], update: PainIssueDecisionDraft) => void;
  tracking?: IssuePainTracking;
  onTrackingAction?: TrackingActionHandler;
  operator: string;
  onOperatorInvalid: (message: string) => void;
};

const IssueDecisionCell: React.FC<DecisionCellProps> = ({
  issue,
  activeIssue,
  show,
  draftMode,
  decisions,
  onDecisionsChange,
  updateDecisions,
  tracking,
  onTrackingAction,
  operator,
  onOperatorInvalid,
}) => {
  if (!show) return null;
  if (!draftMode && tracking && onTrackingAction) {
    return (
      <td className="border-b border-slate-100 px-3 py-2.5">
        {activeIssue ? (
          <IssueDecisionControl
            decided={{
              valid: activeIssue.valid ?? null,
              reason: activeIssue.decision_reason,
              decidedBy: activeIssue.decided_by,
              decidedAt: activeIssue.decided_at,
            }}
            operator={operator}
            onOperatorInvalid={onOperatorInvalid}
            onSubmit={(valid, reason) =>
              onTrackingAction({
                trackingKey: tracking.trackingKey,
                type: 'decide_issue',
                operator: operator.trim(),
                issueNumber: issue.number,
                valid,
                reason,
              })
            }
          />
        ) : (
          <span className="text-[11px] text-slate-300">—</span>
        )}
      </td>
    );
  }
  if (!decisions || !onDecisionsChange) return null;
  const decision = decisions[issue.number];
  return (
    <td className="border-b border-slate-100 px-3 py-2.5">
      <div className="space-y-2">
        <div className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-100/80 p-0.5">
          <button
            type="button"
            className={`inline-flex h-6 min-w-12 items-center justify-center gap-1 rounded-md border px-2 py-0 text-[11px] font-medium leading-5 transition-colors ${
              decision?.valid === true
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-transparent bg-transparent text-slate-500 hover:bg-white hover:text-slate-700'
            }`}
            onClick={() => updateDecisions([issue.number], { valid: true })}
          >
            <CheckOutlined className="text-[10px]" />是
          </button>
          <button
            type="button"
            className={`inline-flex h-6 min-w-12 items-center justify-center gap-1 rounded-md border px-2 py-0 text-[11px] font-medium leading-5 transition-colors ${
              decision?.valid === false
                ? 'border-rose-200 bg-rose-50 text-rose-600'
                : 'border-transparent bg-transparent text-slate-500 hover:bg-white hover:text-slate-700'
            }`}
            onClick={() => updateDecisions([issue.number], { valid: false })}
          >
            <CloseOutlined className="text-[10px]" />否
          </button>
        </div>
        {decision?.valid === false ? (
          <Input
            size="small"
            className="issue-pain-decision-reason !h-7 !w-full !border-slate-200 !bg-slate-50/60 !px-2.5 focus:!border-sky-300 focus:!shadow-none"
            maxLength={200}
            value={decision.reason ?? ''}
            placeholder="判断原因（选填）"
            onChange={(event) =>
              updateDecisions([issue.number], {
                valid: false,
                reason: event.target.value,
              })
            }
          />
        ) : null}
      </div>
    </td>
  );
};

const IssueStatusCell: React.FC<{
  show: boolean;
  activeIssue?: ActiveTrackingIssue;
  tracking?: IssuePainTracking;
  onTrackingAction?: TrackingActionHandler;
  operator: string;
  issueNumber: string;
  onOperatorInvalid: (message: string) => void;
}> = ({
  show,
  activeIssue,
  tracking,
  onTrackingAction,
  operator,
  issueNumber,
  onOperatorInvalid,
}) => {
  if (!show) return null;
  if (!activeIssue) {
    return (
      <td className="border-b border-slate-100 px-3 py-2.5">
        <span className="text-[11px] text-slate-400">历史 Issue</span>
      </td>
    );
  }
  if (activeIssue.valid === false) {
    return (
      <td className="border-b border-slate-100 px-3 py-2.5">
        <div className="space-y-1 text-[11px]">
          <Tooltip
            title={<DecisionTooltipContent issue={activeIssue} />}
            placement="topLeft"
            color="#ffffff"
            overlayInnerStyle={{ padding: 10 }}
          >
            <span className="inline-flex cursor-help rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 font-semibold text-rose-600">
              非有效问题
            </span>
          </Tooltip>
          {tracking && onTrackingAction ? (
            <PostDecisionReasonInput
              reason={activeIssue.decision_reason}
              operator={operator}
              onOperatorInvalid={onOperatorInvalid}
              onSubmit={(reason) =>
                onTrackingAction({
                  trackingKey: tracking.trackingKey,
                  type: 'decide_issue',
                  operator: operator.trim(),
                  issueNumber,
                  valid: false,
                  reason,
                })
              }
            />
          ) : activeIssue.decision_reason ? (
            <Tooltip title={activeIssue.decision_reason}>
              <div className="line-clamp-2 text-slate-500">
                {activeIssue.decision_reason}
              </div>
            </Tooltip>
          ) : null}
        </div>
      </td>
    );
  }
  return (
    <td className="border-b border-slate-100 px-3 py-2.5">
      {activeIssue.valid === true ? (
        <Tooltip
          title={<DecisionTooltipContent issue={activeIssue} />}
          placement="topLeft"
          color="#ffffff"
          overlayInnerStyle={{ padding: 10 }}
        >
          <span className="inline-flex cursor-help rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
            有效问题
          </span>
        </Tooltip>
      ) : (
        <span className="text-[11px] text-slate-400">未判定</span>
      )}
    </td>
  );
};

const IssueActionCell: React.FC<{
  show: boolean;
  activeIssue?: ActiveTrackingIssue;
  tracking?: IssuePainTracking;
  onTrackingAction?: TrackingActionHandler;
  operator: string;
  onOperatorInvalid: (message: string) => void;
}> = ({
  show,
  activeIssue,
  tracking,
  onTrackingAction,
  operator,
  onOperatorInvalid,
}) => {
  if (!show) return null;
  const actionable =
    activeIssue?.valid !== false && activeIssue && tracking && onTrackingAction;
  return (
    <td className="border-b border-slate-100 px-3 py-2.5">
      {actionable ? (
        <IssueFixButton
          tracking={tracking}
          issue={activeIssue}
          onAction={onTrackingAction}
          compact
          operator={operator}
          onOperatorInvalid={onOperatorInvalid}
        />
      ) : (
        <span className="text-[11px] text-slate-300">—</span>
      )}
    </td>
  );
};

const IssueSelectionCell: React.FC<{
  show: boolean;
  disabled: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ show, disabled, checked, onChange }) => {
  if (!show) return null;
  return (
    <td className="border-b border-slate-100 px-3 py-2.5 text-center">
      <Checkbox
        disabled={disabled}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </td>
  );
};

type PainIssueTableRowProps = {
  issue: IssueReportPainIssue;
  activeIssue?: ActiveTrackingIssue;
  showDecisionColumn: boolean;
  draftMode: boolean;
  showStatus: boolean;
  showAction: boolean;
  showSelection: boolean;
  pendingDecisionMode: boolean;
  decisions?: Record<string, PainIssueDecisionDraft>;
  onDecisionsChange?: PainIssueTableProps['onDecisionsChange'];
  updateDecisions: DecisionCellProps['updateDecisions'];
  tracking?: IssuePainTracking;
  onTrackingAction?: TrackingActionHandler;
  operator: string;
  selected: boolean;
  onOperatorInvalid: (message: string) => void;
  onSelectionChange: (number: string, checked: boolean) => void;
};

const PainIssueTableRow: React.FC<PainIssueTableRowProps> = (props) => {
  const { issue, activeIssue } = props;
  return (
    <tr className="align-top">
      <IssueSummaryCells issue={issue} />
      <IssueDecisionCell
        issue={issue}
        activeIssue={activeIssue}
        show={props.showDecisionColumn}
        draftMode={props.draftMode}
        decisions={props.decisions}
        onDecisionsChange={props.onDecisionsChange}
        updateDecisions={props.updateDecisions}
        tracking={props.tracking}
        onTrackingAction={props.onTrackingAction}
        operator={props.operator}
        onOperatorInvalid={props.onOperatorInvalid}
      />
      <IssueStatusCell
        show={props.showStatus}
        activeIssue={activeIssue}
        tracking={props.tracking}
        onTrackingAction={props.onTrackingAction}
        operator={props.operator}
        issueNumber={issue.number}
        onOperatorInvalid={props.onOperatorInvalid}
      />
      <IssueActionCell
        show={props.showAction}
        activeIssue={activeIssue}
        tracking={props.tracking}
        onTrackingAction={props.onTrackingAction}
        operator={props.operator}
        onOperatorInvalid={props.onOperatorInvalid}
      />
      <IssueSelectionCell
        show={props.showSelection}
        disabled={
          !props.draftMode &&
          !props.pendingDecisionMode &&
          activeIssue?.valid !== true
        }
        checked={props.selected}
        onChange={(checked) => props.onSelectionChange(issue.number, checked)}
      />
    </tr>
  );
};

type PainIssueTableToolbarProps = {
  decisionMode: boolean;
  operationMode: boolean;
  pendingDecisionMode: boolean;
  decisions?: Record<string, PainIssueDecisionDraft>;
  issueCount: number;
  activeIssueCount: number;
  decidedCount: number;
  selectedNumbers: string[];
  operatorInputId: string;
  operator: string;
  operatorError: string;
  submitting: boolean;
  canBatchFix: boolean;
  canBatchUndo: boolean;
  onOperatorChange: (value: string) => void;
  onUpdateDecisions: (
    numbers: string[],
    update: PainIssueDecisionDraft
  ) => void;
  onBatchAction: (type: 'mark_issues_fixed' | 'undo_issues_fixed') => void;
  onBatchDecision: (valid: boolean) => void;
};

const PainIssueTableToolbar: React.FC<PainIssueTableToolbarProps> = (props) => {
  const selectedCount = props.selectedNumbers.length;
  if (props.decisionMode) {
    const draftDecidedCount = Object.values(props.decisions ?? {}).filter(
      (item) => item.valid !== undefined
    ).length;
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-3 py-2.5">
        <span className="text-xs text-slate-500">
          已判定 {draftDecidedCount}/{props.issueCount}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            已选 {selectedCount} 项
          </span>
          <Button
            size="small"
            className="issue-pain-bulk-button !border-emerald-200 !bg-emerald-50 !px-3 !font-medium !text-emerald-700 !shadow-none hover:!border-emerald-300 hover:!bg-emerald-100"
            disabled={!selectedCount}
            onClick={() =>
              props.onUpdateDecisions(props.selectedNumbers, { valid: true })
            }
          >
            批量设为是
          </Button>
          <Button
            size="small"
            className="issue-pain-bulk-button !border-rose-200 !bg-rose-50 !px-3 !font-medium !text-rose-600 !shadow-none hover:!border-rose-300 hover:!bg-rose-100"
            disabled={!selectedCount}
            onClick={() =>
              props.onUpdateDecisions(props.selectedNumbers, { valid: false })
            }
          >
            批量设为否
          </Button>
        </div>
      </div>
    );
  }

  const operatorField = (
    <div className="flex items-start gap-2">
      <label
        htmlFor={props.operatorInputId}
        className="pt-1.5 text-xs font-medium text-slate-600"
      >
        提交人 <span className="text-rose-500">*</span>
      </label>
      <div>
        <Input
          id={props.operatorInputId}
          size="small"
          className={`issue-pain-batch-operator !h-7 !w-32 !bg-white !px-2.5 ${
            props.operatorError ? '!border-rose-400' : '!border-slate-200'
          }`}
          value={props.operator}
          placeholder="请输入提交人"
          maxLength={20}
          autoComplete="off"
          aria-label="提交人"
          onChange={(event) => props.onOperatorChange(event.target.value)}
        />
        {props.operatorError ? (
          <div className="mt-1 max-w-52 text-[10px] text-rose-500">
            {props.operatorError}
          </div>
        ) : null}
      </div>
    </div>
  );

  if (props.operationMode) {
    return (
      <div className="flex flex-wrap items-start justify-end gap-3 border-b border-slate-200 bg-slate-50/70 px-3 py-2.5">
        <span className="mr-auto text-xs text-slate-500">
          已选 {selectedCount} 项
        </span>
        {operatorField}
        <div className="flex h-7 items-center gap-2">
          <Button
            size="small"
            className="issue-pain-bulk-button !border-sky-200 !bg-sky-50 !text-sky-700"
            disabled={!props.canBatchFix || props.submitting}
            loading={props.submitting}
            onClick={() => props.onBatchAction('mark_issues_fixed')}
          >
            批量完成修复
          </Button>
          <Button
            size="small"
            className="issue-pain-bulk-button !border-slate-200 !bg-white !text-slate-600"
            disabled={!props.canBatchUndo || props.submitting}
            onClick={() => props.onBatchAction('undo_issues_fixed')}
          >
            批量撤销
          </Button>
        </div>
      </div>
    );
  }
  if (!props.pendingDecisionMode) return null;
  return (
    <div className="flex flex-wrap items-start justify-end gap-3 border-b border-slate-200 bg-slate-50/70 px-3 py-2.5">
      <span className="mr-auto text-xs text-slate-500">
        已判定 {props.decidedCount}/{props.activeIssueCount} 项 · 已选{' '}
        {selectedCount} 项
      </span>
      {operatorField}
      <div className="flex h-7 items-center gap-2">
        <Popconfirm
          title="批量判定确认"
          description={`将把已选的 ${selectedCount} 个 Issue 判定为“是”（有效问题），确认提交吗？`}
          okText="确认"
          cancelText="取消"
          onConfirm={() => props.onBatchDecision(true)}
        >
          <Button
            size="small"
            className="issue-pain-bulk-button !border-emerald-200 !bg-emerald-50 !px-3 !font-medium !text-emerald-700 !shadow-none hover:!border-emerald-300 hover:!bg-emerald-100"
            disabled={!selectedCount || props.submitting}
            loading={props.submitting}
          >
            批量判为是
          </Button>
        </Popconfirm>
        <Popconfirm
          title="批量判定确认"
          description={`将把已选的 ${selectedCount} 个 Issue 判定为“否”（非有效问题），确认提交吗？`}
          okText="确认"
          cancelText="取消"
          onConfirm={() => props.onBatchDecision(false)}
        >
          <Button
            size="small"
            className="issue-pain-bulk-button !border-rose-200 !bg-rose-50 !px-3 !font-medium !text-rose-600 !shadow-none hover:!border-rose-300 hover:!bg-rose-100"
            disabled={!selectedCount || props.submitting}
            loading={props.submitting}
          >
            批量判为否
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

const PainIssueTableHead: React.FC<{
  layout: ReturnType<typeof getPainIssueTableLayout>;
  showDecisionColumn: boolean;
  pendingDecisionMode: boolean;
  showStatus: boolean;
  showAction: boolean;
  showSelection: boolean;
  allNumbers: string[];
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: (checked: boolean) => void;
}> = ({
  layout,
  showDecisionColumn,
  pendingDecisionMode,
  showStatus,
  showAction,
  showSelection,
  allNumbers,
  allSelected,
  someSelected,
  onToggleAll,
}) => (
  <thead className="bg-slate-50/80">
    <tr>
      <th
        className={`border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500 ${layout.issue}`}
      >
        Issue
      </th>
      <th
        className={`border-b border-slate-200 px-2 py-2 text-center text-[11px] font-semibold text-slate-500 ${layout.score}`}
      >
        得分
      </th>
      <th
        className={`border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500 ${layout.reason}`}
      >
        低分原因
      </th>
      <th className="border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500">
        原文依据
      </th>
      {showDecisionColumn ? (
        <th
          className={`border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500 ${layout.decision}`}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600">是否为有效问题</span>
            {pendingDecisionMode ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-amber-600">
                必填
              </span>
            ) : null}
          </div>
        </th>
      ) : null}
      {showStatus ? (
        <th
          className={`border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500 ${layout.status}`}
        >
          确认状态
        </th>
      ) : null}
      {showAction ? (
        <th
          className={`border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold text-slate-500 ${layout.action}`}
        >
          操作
        </th>
      ) : null}
      {showSelection ? (
        <th
          className={`border-b border-slate-200 px-2 py-2 text-center ${layout.selection}`}
        >
          <Tooltip
            title={`全选所有页，共 ${allNumbers.length} 项`}
            placement="top"
          >
            <Checkbox
              checked={allSelected}
              indeterminate={!allSelected && someSelected}
              onChange={(event) => onToggleAll(event.target.checked)}
            />
          </Tooltip>
        </th>
      ) : null}
    </tr>
  </thead>
);

const PainIssueTable: React.FC<PainIssueTableProps> = ({
  issues,
  tracking,
  pagination = true,
  responsive = false,
  decisions,
  onDecisionsChange,
  onTrackingAction,
}) => {
  const pageSize = 10;
  const batchOperatorInputId = React.useId();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedNumbers, setSelectedNumbers] = React.useState<string[]>([]);
  const [batchSubmitting, setBatchSubmitting] = React.useState(false);
  const [batchOperatorError, setBatchOperatorError] = React.useState('');
  const { operator, setOperator, rememberOperator } = useTrackingOperator();
  const issueListKey = issues.map((issue) => issue.number).join(',');
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedNumbers([]);
  }, [issueListKey]);
  const maxPage = Math.max(1, Math.ceil(issues.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, maxPage);
  const activeIssueMap = new Map(
    (tracking?.activeIssues ?? []).map((issue) => [issue.number, issue])
  );
  const decisionMode = Boolean(decisions && onDecisionsChange);
  const operationMode = Boolean(
    !decisionMode &&
      tracking?.trackingType === 'fix' &&
      onTrackingAction &&
      (tracking.status === IssuePainTrackingStatus.TRACKING ||
        tracking.status === IssuePainTrackingStatus.FIXED_PENDING_RETEST)
  );
  // 待确认阶段的即时判定模式：与修复阶段一致，逐条提交并校验共享提交人。
  const pendingDecisionMode = Boolean(
    !decisionMode &&
      tracking &&
      tracking.status === IssuePainTrackingStatus.PENDING &&
      onTrackingAction
  );
  // 流转后（如已确认待修复）把非有效问题排到最后，其余保持原有顺序；
  // 待确认阶段不排序，避免判定后行位置跳动。排序需在分页前完成。
  const sortedIssues =
    decisionMode || pendingDecisionMode
      ? issues
      : [...issues].sort((a, b) => {
          const aInvalid = activeIssueMap.get(a.number)?.valid === false;
          const bInvalid = activeIssueMap.get(b.number)?.valid === false;
          if (aInvalid !== bInvalid) return aInvalid ? 1 : -1;
          return 0;
        });
  const pagedIssues = pagination
    ? sortedIssues.slice(
        (safeCurrentPage - 1) * pageSize,
        safeCurrentPage * pageSize
      )
    : sortedIssues;
  const showDecisionColumn = decisionMode || pendingDecisionMode;
  const decidedCount = (tracking?.activeIssues ?? []).filter(
    (item) => item.valid === true || item.valid === false
  ).length;
  const showSelection = decisionMode || operationMode || pendingDecisionMode;
  const showStatus = Boolean(tracking) && !decisionMode && !pendingDecisionMode;
  const showAction =
    Boolean(tracking && onTrackingAction) &&
    !decisionMode &&
    !pendingDecisionMode;
  const tableLayout = getPainIssueTableLayout(responsive);
  const selectedSet = new Set(selectedNumbers);
  const selectedTrackingIssues = selectedNumbers.flatMap((number) => {
    const issue = activeIssueMap.get(number);
    return issue ? [issue] : [];
  });
  const canBatchFix = selectedTrackingIssues.some((issue) => !issue.fixed);
  const canBatchUndo = selectedTrackingIssues.some((issue) => issue.fixed);
  // 全选跨页生效：基于全部可选 Issue（而非当前页）计算选中状态。
  const allNumbers = sortedIssues
    .filter(
      (issue) =>
        decisionMode ||
        pendingDecisionMode ||
        activeIssueMap.get(issue.number)?.valid === true
    )
    .map((issue) => issue.number);
  const allSelected =
    allNumbers.length > 0 &&
    allNumbers.every((number) => selectedSet.has(number));
  const someSelected = allNumbers.some((number) => selectedSet.has(number));
  const updateDecisions = (
    numbers: string[],
    update: PainIssueDecisionDraft
  ) => {
    if (!decisions || !onDecisionsChange) return;
    const next = { ...decisions };
    numbers.forEach((number) => {
      next[number] = { ...next[number], ...update };
      if (update.valid) next[number].reason = '';
    });
    onDecisionsChange(next);
  };
  const applyBatchAction = async (
    type: 'mark_issues_fixed' | 'undo_issues_fixed'
  ) => {
    if (!tracking || !onTrackingAction || !selectedNumbers.length) return;
    const validation = validateOperator(operator);
    if (validation) {
      setBatchOperatorError(validation);
      return;
    }
    setBatchSubmitting(true);
    setBatchOperatorError('');
    try {
      const normalizedOperator = rememberOperator(operator);
      await onTrackingAction({
        trackingKey: tracking.trackingKey,
        type,
        operator: normalizedOperator,
        issueNumbers: selectedNumbers,
      });
      setSelectedNumbers([]);
    } catch {
      // 页面级 action handler 已展示错误信息，保留选择便于重试。
    } finally {
      setBatchSubmitting(false);
    }
  };
  const applyBatchDecision = async (valid: boolean) => {
    if (!tracking || !onTrackingAction || !selectedNumbers.length) return;
    const validation = validateOperator(operator);
    if (validation) {
      setBatchOperatorError(validation);
      document.getElementById(batchOperatorInputId)?.focus();
      return;
    }
    setBatchSubmitting(true);
    setBatchOperatorError('');
    try {
      const normalizedOperator = rememberOperator(operator);
      await onTrackingAction({
        trackingKey: tracking.trackingKey,
        type: 'decide_issues',
        operator: normalizedOperator,
        issueNumbers: selectedNumbers,
        valid,
      });
      setSelectedNumbers([]);
    } catch {
      // 页面级 action handler 已展示错误信息，保留选择便于重试。
    } finally {
      setBatchSubmitting(false);
    }
  };

  if (!issues.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
        当前痛点没有关联到具体 Issue，将按痛点整体进行跟踪。
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <PainIssueTableToolbar
        decisionMode={decisionMode}
        operationMode={operationMode}
        pendingDecisionMode={pendingDecisionMode}
        decisions={decisions}
        issueCount={issues.length}
        activeIssueCount={tracking?.activeIssues.length ?? 0}
        decidedCount={decidedCount}
        selectedNumbers={selectedNumbers}
        operatorInputId={batchOperatorInputId}
        operator={operator}
        operatorError={batchOperatorError}
        submitting={batchSubmitting}
        canBatchFix={canBatchFix}
        canBatchUndo={canBatchUndo}
        onOperatorChange={(value) => {
          setOperator(value);
          if (batchOperatorError) setBatchOperatorError('');
        }}
        onUpdateDecisions={updateDecisions}
        onBatchAction={(type) => void applyBatchAction(type)}
        onBatchDecision={(valid) => void applyBatchDecision(valid)}
      />
      <div className="overflow-x-auto">
        <table
          className={`w-full table-fixed border-collapse text-[12px] ${tableLayout.table}`}
        >
          <PainIssueTableHead
            layout={tableLayout}
            showDecisionColumn={showDecisionColumn}
            pendingDecisionMode={pendingDecisionMode}
            showStatus={showStatus}
            showAction={showAction}
            showSelection={showSelection}
            allNumbers={allNumbers}
            allSelected={allSelected}
            someSelected={someSelected}
            onToggleAll={(checked) => {
              setSelectedNumbers((current) => {
                const next = new Set(current);
                allNumbers.forEach((number) =>
                  checked ? next.add(number) : next.delete(number)
                );
                return Array.from(next);
              });
            }}
          />
          <tbody>
            {pagedIssues.map((issue) => (
              <PainIssueTableRow
                key={issue.number}
                issue={issue}
                activeIssue={activeIssueMap.get(issue.number)}
                showDecisionColumn={showDecisionColumn}
                draftMode={decisionMode}
                showStatus={showStatus}
                showAction={showAction}
                showSelection={showSelection}
                pendingDecisionMode={pendingDecisionMode}
                decisions={decisions}
                onDecisionsChange={onDecisionsChange}
                updateDecisions={updateDecisions}
                tracking={tracking}
                onTrackingAction={onTrackingAction}
                operator={operator}
                selected={selectedSet.has(issue.number)}
                onOperatorInvalid={(message) => {
                  setBatchOperatorError(message);
                  document.getElementById(batchOperatorInputId)?.focus();
                }}
                onSelectionChange={(number, checked) =>
                  setSelectedNumbers((current) =>
                    checked
                      ? Array.from(new Set([...current, number]))
                      : current.filter((item) => item !== number)
                  )
                }
              />
            ))}
          </tbody>
        </table>
      </div>
      {pagination && issues.length > pageSize ? (
        <div className="flex justify-end border-t border-slate-100 bg-white px-3 py-3">
          <Pagination
            size="small"
            current={safeCurrentPage}
            pageSize={pageSize}
            total={issues.length}
            showSizeChanger={false}
            hideOnSinglePage
            onChange={setCurrentPage}
          />
        </div>
      ) : null}
      <style jsx global>{`
        .issue-pain-bulk-button.ant-btn {
          border-radius: 10px !important;
        }
        .issue-pain-bulk-button.ant-btn:disabled {
          border-color: #e2e8f0 !important;
          background: #f8fafc !important;
          color: #94a3b8 !important;
          box-shadow: none !important;
          opacity: 1 !important;
        }
        .issue-pain-decision-reason.ant-input {
          border-radius: 8px !important;
        }
        .issue-pain-batch-operator.ant-input {
          border-radius: 8px !important;
        }
        .issue-pain-table-responsive th,
        .issue-pain-table-responsive td {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
      `}</style>
    </div>
  );
};

export default PainIssueTable;
