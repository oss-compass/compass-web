import React from 'react';
import OverviewSummaryBlock from './OverviewSummaryBlock';
import type { MetricSummary, ProgressTab } from './types';
import { formatPercent, formatScore } from './utils';

type OverviewSummarySectionProps = {
  overviewSummary: MetricSummary;
  blockingSummary: MetricSummary;
  summaryScore: number | null;
  summarySuccessRate: number | null;
  repoCount: number;
  onOpenSummaryIssues: (
    tab: ProgressTab,
    bucket: 'pending' | 'inProgress' | 'resolved' | 'total'
  ) => void;
};

const OverviewSummarySection: React.FC<OverviewSummarySectionProps> = ({
  overviewSummary,
  blockingSummary,
  summaryScore,
  summarySuccessRate,
  repoCount,
  onOpenSummaryIssues,
}) => {
  const scoreClass =
    summaryScore == null
      ? ''
      : summaryScore >= 4.5
      ? 'score-high'
      : summaryScore >= 4.0
      ? 'score-mid'
      : '';

  const rateClass =
    summarySuccessRate == null
      ? ''
      : summarySuccessRate >= 97
      ? 'rate-high'
      : summarySuccessRate >= 95
      ? 'rate-mid'
      : '';

  return (
    <>
      <div className="section-title">📋 总览信息</div>
      <div className="section-card">
        <div className="overview-grid">
          <OverviewSummaryBlock
            title="📊 总体问题"
            summary={overviewSummary}
            onOpenTotal={() => onOpenSummaryIssues('overall', 'total')}
            onOpenPending={() => onOpenSummaryIssues('overall', 'pending')}
            onOpenInProgress={() =>
              onOpenSummaryIssues('overall', 'inProgress')
            }
            onOpenResolved={() => onOpenSummaryIssues('overall', 'resolved')}
          />
          <OverviewSummaryBlock
            title="🚫 阻塞问题"
            summary={blockingSummary}
            onOpenTotal={() => onOpenSummaryIssues('blocking', 'total')}
            onOpenPending={() => onOpenSummaryIssues('blocking', 'pending')}
            onOpenInProgress={() =>
              onOpenSummaryIssues('blocking', 'inProgress')
            }
            onOpenResolved={() => onOpenSummaryIssues('blocking', 'resolved')}
          />
        </div>
        <div className="overview-bottom-row">
          <div className="bottom-metric">
            <div className="bm-label">综合体验评分</div>
            <div className={`bm-value ${scoreClass}`}>
              {formatScore(summaryScore)}
            </div>
          </div>
          <div className="bottom-metric">
            <div className="bm-label">端到端成功率</div>
            <div className={`bm-value ${rateClass}`}>
              {formatPercent(summarySuccessRate)}
            </div>
          </div>
          <div className="bottom-metric">
            <div className="bm-label">扫描仓数</div>
            <div className="bm-value">{repoCount}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewSummarySection;
