import React from 'react';
import { Typography } from 'antd';
import OverviewSummaryBlock from './OverviewSummaryBlock';
import type { MetricSummary } from './types';
import { formatPercent, formatScore } from './utils';

const { Title } = Typography;

type OverviewSummarySectionProps = {
  overviewSummary: MetricSummary;
  blockingSummary: MetricSummary;
  summaryScore: number | null;
  summarySuccessRate: number | null;
  repoCount: number;
};

const OverviewSummarySection: React.FC<OverviewSummarySectionProps> = ({
  overviewSummary,
  blockingSummary,
  summaryScore,
  summarySuccessRate,
  repoCount,
}) => {
  return (
    <>
      <Title level={4} className="oj-section-title">
        总览信息
      </Title>
      <div className="overview-summary-stack">
        <div className="overview-grid">
          <OverviewSummaryBlock title="总体问题" summary={overviewSummary} />
          <OverviewSummaryBlock title="阻塞问题" summary={blockingSummary} />
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
