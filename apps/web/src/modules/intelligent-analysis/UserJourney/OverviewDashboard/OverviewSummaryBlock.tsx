import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { MetricSummary } from './types';
import { formatPercent } from './utils';

type OverviewSummaryBlockProps = {
  title: string;
  summary: MetricSummary;
  tooltip?: string;
};

const OverviewSummaryBlock: React.FC<OverviewSummaryBlockProps> = ({
  title,
  summary,
  tooltip,
}) => {
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
