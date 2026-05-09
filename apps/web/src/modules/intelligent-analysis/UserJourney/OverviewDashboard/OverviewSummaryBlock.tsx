import React from 'react';
import type { MetricSummary } from './types';
import { formatPercent } from './utils';

type OverviewSummaryBlockProps = {
  title: string;
  summary: MetricSummary;
  onOpenTotal: () => void;
  onOpenPending: () => void;
  onOpenInProgress: () => void;
  onOpenResolved: () => void;
};

const OverviewSummaryBlock: React.FC<OverviewSummaryBlockProps> = ({
  title,
  summary,
  onOpenTotal,
  onOpenPending,
  onOpenInProgress,
  onOpenResolved,
}) => {
  return (
    <div className="overview-block">
      <div className="ov-title">{title}</div>
      <div className="ov-row">
        <button type="button" className="ov-item" onClick={onOpenTotal}>
          <div className="ov-label">总问题数</div>
          <div className="ov-value">{summary.total}</div>
        </button>
        <button type="button" className="ov-item" onClick={onOpenPending}>
          <div className="ov-label">待处理</div>
          <div className="ov-value pending-color">{summary.pending}</div>
        </button>
        <button type="button" className="ov-item" onClick={onOpenInProgress}>
          <div className="ov-label">进行中</div>
          <div className="ov-value in-progress-color">{summary.inProgress}</div>
        </button>
        <button type="button" className="ov-item" onClick={onOpenResolved}>
          <div className="ov-label">已闭环</div>
          <div className="ov-value resolved-color">{summary.resolved}</div>
        </button>
        <div className="ov-item ov-no-click">
          <div className="ov-label">闭环率</div>
          <div className="ov-value rate-color">
            {formatPercent(summary.closeRate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSummaryBlock;
