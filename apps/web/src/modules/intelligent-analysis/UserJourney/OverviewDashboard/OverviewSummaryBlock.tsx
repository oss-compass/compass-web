import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { MetricSummary } from './types';
import { formatPercent } from './utils';

type OverviewSummaryBlockProps = {
  title: string;
  summary: MetricSummary;
  tooltip?: string;
  onBucketClick?: (
    bucket: 'total' | 'pending' | 'inProgress' | 'resolved'
  ) => void;
};

const OverviewSummaryBlock: React.FC<OverviewSummaryBlockProps> = ({
  title,
  summary,
  tooltip,
  onBucketClick,
}) => {
  const renderValue = (
    bucket: 'total' | 'pending' | 'inProgress' | 'resolved',
    value: number,
    className = ''
  ) => {
    const clickableProps: React.HTMLAttributes<HTMLDivElement> | undefined =
      onBucketClick
        ? {
            role: 'button',
            tabIndex: 0,
            onClick: () => onBucketClick(bucket),
            onKeyDown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onBucketClick(bucket);
              }
            },
          }
        : undefined;

    return (
      <div
        className={`ov-value ${
          onBucketClick ? 'ov-value-link' : ''
        } ${className}`.trim()}
        {...clickableProps}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="overview-block">
      <div className="ov-title flex items-center gap-1.5">
        <span>{title}</span>
        {tooltip ? (
          <Tooltip title={tooltip}>
            <InfoCircleOutlined className="cursor-help text-[13px] text-slate-400 transition-colors hover:text-slate-600" />
          </Tooltip>
        ) : null}
      </div>
      <div className="ov-row">
        <div className="ov-item">
          <div className="ov-label">总问题数</div>
          {renderValue('total', summary.total)}
        </div>
        <div className="ov-item">
          <div className="ov-label">待处理</div>
          {renderValue('pending', summary.pending, 'ov-value-pending')}
        </div>
        <div className="ov-item">
          <div className="ov-label">进行中</div>
          {renderValue('inProgress', summary.inProgress, 'ov-value-blue')}
        </div>
        <div className="ov-item">
          <div className="ov-label">已闭环</div>
          {renderValue('resolved', summary.resolved, 'ov-value-green')}
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
