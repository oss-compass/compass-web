import React from 'react';
import { Checkbox, Typography } from 'antd';
import OverviewSummaryBlock from './OverviewSummaryBlock';
import type { MetricSummary } from './types';
import { formatPercent, formatScore } from './utils';

const { Title } = Typography;

const formatExecutionTime = (seconds: number | null): string => {
  if (seconds == null) return '--';
  const minutes = (seconds * 10) / 60;
  return `${minutes.toFixed(1)}`;
};

type OverviewSummarySectionProps = {
  overviewSummary: MetricSummary;
  keyIssueSummary: MetricSummary;
  summaryScore: number | null;
  summarySuccessRate: number | null;
  summaryAvgExecutionTime: number | null;
  repoCount: number;
  includeCommonIssues: boolean;
  onIncludeCommonIssuesChange: (next: boolean) => void;
};

const OverviewSummarySection: React.FC<OverviewSummarySectionProps> = ({
  overviewSummary,
  keyIssueSummary,
  summaryScore,
  summarySuccessRate,
  summaryAvgExecutionTime,
  repoCount,
  includeCommonIssues,
  onIncludeCommonIssuesChange,
}) => {
  return (
    <>
      <div className="overview-summary-title-row">
        <Title level={4} className="oj-section-title">
          总览信息
        </Title>
        <Checkbox
          checked={includeCommonIssues}
          onChange={(e) => onIncludeCommonIssuesChange(e.target.checked)}
          className="overview-common-checkbox"
        >
          包含共性问题
        </Checkbox>
      </div>
      <div className="overview-summary-stack">
        <div className="overview-grid">
          <OverviewSummaryBlock
            title="总体问题"
            summary={overviewSummary}
            tooltip="含严重程度P0-P4的所有问题"
          />
          <OverviewSummaryBlock
            title="关键问题"
            summary={keyIssueSummary}
            tooltip="含严重程度P0-P1的问题"
          />
        </div>
        <div className="overview-bottom-row">
          <div className="bottom-metric">
            <div className="bm-label">综合体验评分</div>
            <div className="bm-value">
              {summaryScore == null ? (
                <span className="bm-value-main">
                  {formatScore(summaryScore)}
                </span>
              ) : (
                <>
                  <span className="bm-value-main">
                    {formatScore(summaryScore)}
                  </span>
                  <span className="bm-value-suffix">/100</span>
                </>
              )}
            </div>
          </div>
          <div className="bottom-metric">
            <div className="bm-label">端到端成功率</div>
            <div className="bm-value">
              <span className="bm-value-main">
                {formatPercent(summarySuccessRate)}
              </span>
            </div>
          </div>
          <div className="bottom-metric">
            <div className="bm-label">开发者旅程耗时</div>
            <div className="bm-value">
              <span className="bm-value-main">
                {formatExecutionTime(summaryAvgExecutionTime)}
              </span>
              <span className="bm-value-suffix">分钟</span>
            </div>
          </div>
          <div className="bottom-metric">
            <div className="bm-label">扫描仓数</div>
            <div className="bm-value">
              <span className="bm-value-main">{repoCount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewSummarySection;
