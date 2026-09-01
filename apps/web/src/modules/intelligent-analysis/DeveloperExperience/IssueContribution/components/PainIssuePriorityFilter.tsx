import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import {
  PAIN_ISSUE_PRIORITY_LEVELS,
  resolvePainIssuePriority,
} from '../issuePriority';
import type { PainIssuePriority } from '../issuePriority';
import type { IssueReportPainIssue } from '../types';

type PainIssuePriorityFilterProps = {
  issues: IssueReportPainIssue[];
  value?: PainIssuePriority;
  onChange: (priority: PainIssuePriority | undefined) => void;
};

/** 痛点 Issue 优先级筛选器：仅展示数量大于 0 的等级。 */
const PainIssuePriorityFilter: React.FC<PainIssuePriorityFilterProps> = ({
  issues,
  value,
  onChange,
}) => {
  const levels = PAIN_ISSUE_PRIORITY_LEVELS.flatMap((meta) => {
    const count = issues.filter(
      (issue) =>
        resolvePainIssuePriority(issue.priority, issue.score) === meta.priority
    ).length;
    return count ? [{ ...meta, count }] : [];
  });

  if (!levels.length) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      aria-label="按 Issue 优先级筛选"
    >
      {levels.map((meta) => {
        const active = value === meta.priority;
        return (
          <button
            key={meta.priority}
            type="button"
            aria-pressed={active}
            aria-label={`${meta.label} ${meta.count} 个${
              active ? '，已选中，再次点击取消筛选' : '，点击筛选'
            }`}
            title={`${meta.description}；点击${
              active ? '取消筛选' : `只看 ${meta.priority}`
            }`}
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-all ${
              active
                ? `${meta.activeClass} ring-1`
                : `${meta.badgeClass} hover:brightness-95`
            }`}
            onClick={() => onChange(active ? undefined : meta.priority)}
          >
            <span>{meta.label}</span>
            <span className="font-bold tabular-nums">{meta.count}</span>
            {active ? (
              <CloseOutlined
                className="ml-0.5 rounded-full bg-white/70 p-0.5 text-[9px]"
                aria-hidden="true"
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
};

export default PainIssuePriorityFilter;
