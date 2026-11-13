import React from 'react';
import { Descriptions, Dropdown, Popover, Tooltip } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import type { CiRunRuleReview, CiRunReviewAction } from '../../ruleReviews';
import { ruleLinkLabels } from '../../ruleReviews';

export const RunRuleCell: React.FC<{
  review?: CiRunRuleReview;
  fallback?: string;
  loading?: boolean;
}> = ({ review, fallback, loading }) => {
  const rule = review?.rule;
  if (!rule)
    return (
      <Tooltip
        title={review?.rule_id || fallback || '当前执行记录未提供判据 ID'}
      >
        <span className="text-[11px] text-slate-400">
          {loading
            ? '读取中'
            : review
            ? ruleLinkLabels[review.rule_status]
            : '未关联'}
        </span>
      </Tooltip>
    );
  return (
    <Popover
      trigger="click"
      placement="leftTop"
      title="关联判据"
      content={
        <div className="max-h-[360px] w-[380px] max-w-[75vw] overflow-y-auto">
          <Descriptions
            size="small"
            column={1}
            items={[
              {
                key: 'id',
                label: '判据',
                children: (
                  <code className="break-all text-xs">{rule.rule_id}</code>
                ),
              },
              { key: 'version', label: '版本', children: rule.version },
              { key: 'description', label: '说明', children: rule.desc || '—' },
              {
                key: 'classification',
                label: '分类',
                children: `${rule.cat || '—'} / ${rule.sub_label || '—'}`,
              },
              {
                key: 'mechanism',
                label: '机理',
                children: `${rule.cls || '—'} / ${rule.mech || '—'}`,
              },
              {
                key: 'pattern',
                label: '匹配表达式',
                children: (
                  <code className="whitespace-pre-wrap break-all text-xs">
                    {rule.pattern || '—'}
                  </code>
                ),
              },
              {
                key: 'tier',
                label: '轮次 / 层级',
                children: `${rule.round || '—'} / ${rule.tier || '—'}`,
              },
            ]}
          />
        </div>
      }
    >
      <button
        type="button"
        aria-label={`查看判据 ${rule.rule_id}`}
        className="group block w-full min-w-0 rounded text-left focus-visible:outline-blue-500"
      >
        <span className="line-clamp-2 text-xs leading-5 text-slate-600 group-hover:text-blue-600">
          {rule.desc || rule.sub_label || '查看判据'}
        </span>
        <span className="mt-0.5 flex min-w-0 items-center gap-2 text-[11px] leading-4">
          <span className="truncate text-sky-600">{rule.rule_id}</span>
          <span className="shrink-0 text-slate-400">{rule.version}</span>
        </span>
      </button>
    </Popover>
  );
};

export const RunLogCell: React.FC<{ message: string }> = ({ message }) =>
  message ? (
    <Popover
      trigger="click"
      placement="leftTop"
      title="日志摘要"
      content={
        <pre className="max-h-[320px] w-[420px] max-w-[75vw] overflow-auto whitespace-pre-wrap break-all font-sans text-xs leading-5 text-slate-600">
          {message}
        </pre>
      }
    >
      <button
        type="button"
        aria-label="查看完整日志摘要"
        className="block w-full rounded text-left text-xs leading-5 text-slate-500 hover:text-blue-600 focus-visible:outline-blue-500"
      >
        <span className="line-clamp-2 break-all">{message}</span>
      </button>
    </Popover>
  ) : (
    <span className="text-slate-300">—</span>
  );

const segmentClass = (active: boolean, positive: boolean) =>
  `inline-flex h-6 min-w-12 items-center justify-center gap-1 rounded-md border px-2 py-0 text-[11px] font-medium leading-5 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
    active
      ? positive
        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
        : 'border-rose-200 bg-rose-50 text-rose-600'
      : 'border-transparent bg-transparent text-slate-500 hover:bg-white hover:text-slate-700'
  }`;

export const RunDecisionCell: React.FC<{
  review?: CiRunRuleReview;
  runNumber: number;
  disabled: boolean;
  loadingAction?: CiRunReviewAction;
  onDecision: (action: CiRunReviewAction) => void;
  onHistory: () => void;
}> = ({
  review,
  runNumber,
  disabled,
  loadingAction,
  onDecision,
  onHistory,
}) => (
  <div className="flex items-center gap-1">
    <div
      role="group"
      aria-label={`执行记录 #${runNumber} 是否有效`}
      className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-100/80 p-0.5"
    >
      <button
        type="button"
        aria-label={`执行记录 #${runNumber}：有效问题`}
        aria-pressed={review?.status === 'confirmed'}
        aria-busy={loadingAction === 'confirmed'}
        disabled={disabled}
        onClick={() => onDecision('confirmed')}
        className={segmentClass(review?.status === 'confirmed', true)}
      >
        {loadingAction === 'confirmed' ? (
          <LoadingOutlined className="text-[10px]" />
        ) : (
          <CheckOutlined className="text-[10px]" />
        )}
        是
      </button>
      <button
        type="button"
        aria-label={`执行记录 #${runNumber}：非有效问题`}
        aria-pressed={review?.status === 'incorrect'}
        aria-busy={loadingAction === 'incorrect'}
        disabled={disabled}
        onClick={() => onDecision('incorrect')}
        className={segmentClass(review?.status === 'incorrect', false)}
      >
        {loadingAction === 'incorrect' ? (
          <LoadingOutlined className="text-[10px]" />
        ) : (
          <CloseOutlined className="text-[10px]" />
        )}
        否
      </button>
    </div>
    <Dropdown
      trigger={['click']}
      menu={{
        items: [{ key: 'history', label: '查看判定记录', onClick: onHistory }],
      }}
    >
      <button
        type="button"
        disabled={disabled}
        aria-label={`执行记录 #${runNumber} 更多操作`}
        className="flex h-7 w-6 shrink-0 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
      >
        <MoreOutlined />
      </button>
    </Dropdown>
  </div>
);
