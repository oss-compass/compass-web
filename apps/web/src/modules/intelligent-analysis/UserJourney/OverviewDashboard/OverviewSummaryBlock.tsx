import React from 'react';
import type { MetricSummary } from './types';
import { formatPercent } from './utils';

type OverviewSummaryBlockProps = {
  title: string;
  summary: MetricSummary;
};

const OverviewSummaryBlock: React.FC<OverviewSummaryBlockProps> = ({
  title,
  summary,
}) => {
  return (
    <div className="overview-block">
      <div className="ov-title">{title}</div>
      <div className="ov-row">
        <div className="ov-item">
          <div className="ov-label">总问题数</div>
          <div className="ov-value">{summary.total}</div>
        </div>
        <div className="ov-item">
          <div className="ov-label">待处理</div>
          <div className="ov-value">{summary.pending}</div>
        </div>
        <div className="ov-item">
          <div className="ov-label">进行中</div>
          <div className="ov-value ov-value-blue">{summary.inProgress}</div>
        </div>
        <div className="ov-item">
          <div className="ov-label">已闭环</div>
          <div className="ov-value ov-value-green">{summary.resolved}</div>
        </div>
        <div className="ov-item">
          <div className="ov-label">闭环率</div>
          <div className="ov-value">{formatPercent(summary.closeRate)}</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSummaryBlock;
