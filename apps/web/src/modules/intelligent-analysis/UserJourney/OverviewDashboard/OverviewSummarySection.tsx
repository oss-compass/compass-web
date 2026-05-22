import React from 'react';
import { Checkbox, Segmented, Typography } from 'antd';
import OverviewSummaryBlock from './OverviewSummaryBlock';
import type {
  CommonIssueGroup,
  DashboardIssue,
  IssueSourceMode,
  MetricSummary,
  WeeklyCloseRateTrendPoint,
} from './types';
import { formatPercent, formatScore } from './utils';

const { Title } = Typography;

const SUMMARY_TOGGLE_H = 34;

const formatExecutionTime = (seconds: number | null): string => {
  if (seconds == null) return '--';
  const minutes = seconds / 60;
  return `${minutes.toFixed(1)}`;
};

type OverviewSummarySectionProps = {
  overviewSummary: MetricSummary;
  overviewTrend: WeeklyCloseRateTrendPoint[];
  overviewIssues: DashboardIssue[];
  summaryScore: number | null;
  summarySuccessRate: number | null;
  summaryAvgExecutionTime: number | null;
  repoCount: number;
  issueSourceMode: IssueSourceMode;
  includeCommonIssues: boolean;
  commonIssues: CommonIssueGroup[];
  onIssueSourceModeChange: (mode: IssueSourceMode) => void;
  onIncludeCommonIssuesChange: (next: boolean) => void;
  onOpenIssues?: (
    card: 'primary' | 'secondary',
    bucket: 'total' | 'pending' | 'inProgress' | 'resolved'
  ) => void;
};

const OverviewSummarySection: React.FC<OverviewSummarySectionProps> = ({
  overviewSummary,
  overviewTrend,
  overviewIssues,
  summaryScore,
  summarySuccessRate,
  summaryAvgExecutionTime,
  repoCount,
  issueSourceMode,
  includeCommonIssues,
  commonIssues,
  onIssueSourceModeChange,
  onIncludeCommonIssuesChange,
  onOpenIssues,
}) => {
  const effectiveMode: IssueSourceMode =
    issueSourceMode === 'common' ? 'common' : 'overall';
  const primaryTooltip =
    effectiveMode === 'common'
      ? '仅展示已标记为共性问题且严重程度P0-P3的问题'
      : '含严重程度P0-P3的所有问题';
  return (
    <>
      <div className="overview-summary-title-row">
        <Title level={4} className="oj-section-title">
          总览信息
        </Title>
      </div>
      <div className="overview-summary-stack">
        <OverviewSummaryBlock
          title={
            <div className="flex items-center gap-2">
              <Segmented
                value={effectiveMode}
                onChange={(value) =>
                  onIssueSourceModeChange(value as IssueSourceMode)
                }
                options={[
                  { label: '总体问题', value: 'overall' },
                  { label: '共性问题', value: 'common' },
                ]}
                style={{ height: SUMMARY_TOGGLE_H }}
                className="oj-summary-mode-toggle"
              />
              {effectiveMode !== 'common' ? (
                <Checkbox
                  checked={includeCommonIssues}
                  onChange={(event) =>
                    onIncludeCommonIssuesChange(event.target.checked)
                  }
                  className="ml-1 text-xs font-medium text-slate-600"
                >
                  包含共性问题
                </Checkbox>
              ) : null}
            </div>
          }
          summary={overviewSummary}
          trend={overviewTrend}
          issues={overviewIssues}
          commonIssues={commonIssues}
          mode={effectiveMode}
          tooltip={primaryTooltip}
          onBucketClick={(bucket) => onOpenIssues?.('primary', bucket)}
        />
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
