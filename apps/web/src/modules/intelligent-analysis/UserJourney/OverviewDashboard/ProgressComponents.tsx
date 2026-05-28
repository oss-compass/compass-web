import React from 'react';
import type { IssueBucket } from './types';

const PENDING_COLOR = '#f4840c';
const IN_PROGRESS_COLOR = '#4791ff';
const RESOLVED_COLOR = '#2eb78a';

export const CircularProgress: React.FC<{ value: number | null }> = ({
  value,
}) => {
  const safeValue =
    value == null ? 0 : Math.max(0, Math.min(Number(value.toFixed(1)), 100));
  const ringColor =
    safeValue < 50 ? '#ef4444' : safeValue > 80 ? '#10b981' : '#f59e0b';
  const size = 24;
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - safeValue / 100);
  const label = value == null ? '--' : `${safeValue.toFixed(1)}%`;

  return (
    <div className="overview-ring-progress">
      <svg
        width={size}
        height={size}
        className="overview-ring-svg"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="overview-ring-label"
        style={{ color: value == null ? '#94a3b8' : ringColor }}
      >
        {label}
      </span>
    </div>
  );
};

export const ProgressBarOnly: React.FC<{
  pending: number;
  inProgress: number;
  resolved: number;
}> = ({ pending, inProgress, resolved }) => {
  const total = pending + inProgress + resolved || 1;
  const items = [
    { key: 'pending', value: pending, color: PENDING_COLOR },
    { key: 'inProgress', value: inProgress, color: IN_PROGRESS_COLOR },
    { key: 'resolved', value: resolved, color: RESOLVED_COLOR },
  ];

  return (
    <div className="overview-progress-bar">
      {items.map((item) =>
        item.value > 0 ? (
          <span
            key={item.key}
            className="overview-progress-segment"
            style={{
              width: `${(item.value / total) * 100}%`,
              background: item.color,
            }}
          />
        ) : null
      )}
    </div>
  );
};

export const ProgressMetaOnly: React.FC<{
  pending: number;
  inProgress: number;
  resolved: number;
  onBucketClick?: (bucket: IssueBucket) => void;
}> = ({ pending, inProgress, resolved, onBucketClick }) => {
  const items: Array<{
    key: IssueBucket;
    label: string;
    value: number;
    color: string;
  }> = [
    {
      key: 'pending',
      label: '待处理',
      value: pending,
      color: PENDING_COLOR,
    },
    {
      key: 'inProgress',
      label: '进行中',
      value: inProgress,
      color: IN_PROGRESS_COLOR,
    },
    {
      key: 'resolved',
      label: '已闭环',
      value: resolved,
      color: RESOLVED_COLOR,
    },
  ];

  return (
    <div className="overview-progress-meta">
      {items.map((item) =>
        onBucketClick ? (
          <button
            key={item.key}
            type="button"
            className="overview-progress-link"
            style={{ color: item.color }}
            onClick={() => onBucketClick(item.key)}
          >
            {item.label} {item.value}
          </button>
        ) : (
          <span
            key={item.key}
            className="overview-progress-text"
            style={{ color: item.color }}
          >
            {item.label} {item.value}
          </span>
        )
      )}
    </div>
  );
};

export const IssueProgressBar: React.FC<{
  pending: number;
  inProgress: number;
  resolved: number;
  onBucketClick?: (bucket: IssueBucket) => void;
}> = ({ pending, inProgress, resolved, onBucketClick }) => {
  return (
    <div className="overview-progress-cell">
      <ProgressBarOnly
        pending={pending}
        inProgress={inProgress}
        resolved={resolved}
      />
      <ProgressMetaOnly
        pending={pending}
        inProgress={inProgress}
        resolved={resolved}
        onBucketClick={onBucketClick}
      />
    </div>
  );
};
