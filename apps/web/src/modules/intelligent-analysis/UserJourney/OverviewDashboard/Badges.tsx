import React from 'react';
import { Tag } from 'antd';
import { SEVERITY_CFG, STATUS_CFG } from './constants';
import type { IssueBucket, Severity } from './types';
import { normalizeSeverity } from './utils';

export const SeverityBadge: React.FC<{ severity: Severity }> = ({
  severity,
}) => {
  const normalizedSeverity = normalizeSeverity(severity);
  if (!normalizedSeverity) {
    return <span className="text-slate-300">--</span>;
  }
  const cfg = SEVERITY_CFG[normalizedSeverity];
  return (
    <Tag
      className="overview-ant-tag"
      style={{
        background: cfg.tagBg,
        color: cfg.tagColor,
        borderColor: cfg.tagBorder,
      }}
    >
      {cfg.label}
    </Tag>
  );
};

export const StatusBadge: React.FC<{ status: IssueBucket }> = ({ status }) => {
  const cfg = STATUS_CFG[status];
  return (
    <Tag
      className="overview-ant-tag"
      style={{
        background: cfg.tagBg,
        color: cfg.tagColor,
        borderColor: cfg.tagBorder,
      }}
    >
      {cfg.label}
    </Tag>
  );
};
