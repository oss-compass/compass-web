import React from 'react';
import { Tag } from 'antd';
import { SEVERITY_CFG } from '../../../../UserJourney/OverviewDashboard/constants';

export type IssuePriority = 'P0' | 'P1' | 'P2' | 'P3';

const ISSUE_PRIORITY_META = {
  P0: SEVERITY_CFG.P0_BLOCKER,
  P1: SEVERITY_CFG.P1_CRITICAL,
  P2: SEVERITY_CFG.P2_MAJOR,
  P3: SEVERITY_CFG.P3_MINOR,
} as const;

export const ISSUE_PRIORITY_LEVELS = (
  Object.keys(ISSUE_PRIORITY_META) as IssuePriority[]
).map((priority) => ({
  priority,
  ...ISSUE_PRIORITY_META[priority],
}));

export const normalizeIssuePriority = (
  value: unknown
): IssuePriority | undefined => {
  const matched = /^P[0-3]/i.exec(String(value ?? '').trim());
  return matched?.[0].toUpperCase() as IssuePriority | undefined;
};

export const getIssuePriorityLabel = (value: unknown): string => {
  const priority = normalizeIssuePriority(value);
  return priority ? ISSUE_PRIORITY_META[priority].label : String(value || '--');
};

const IssuePriorityTag: React.FC<{ priority: unknown }> = ({ priority }) => {
  const normalized = normalizeIssuePriority(priority);
  if (!normalized) return <span className="text-slate-300">--</span>;

  const meta = ISSUE_PRIORITY_META[normalized];
  return (
    <Tag
      className="overview-ant-tag"
      style={{
        background: meta.tagBg,
        color: meta.tagColor,
        borderColor: meta.tagBorder,
      }}
    >
      {meta.label}
    </Tag>
  );
};

export default IssuePriorityTag;
