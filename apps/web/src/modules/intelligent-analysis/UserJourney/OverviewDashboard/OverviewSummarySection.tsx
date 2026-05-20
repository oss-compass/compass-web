import React from 'react';
import { Checkbox, Select, Typography } from 'antd';
import OverviewSummaryBlock from './OverviewSummaryBlock';
import type {
  IssueSourceMode,
  MetricSummary,
  WeeklyCloseRateTrendPoint,
} from './types';
import { formatPercent, formatScore } from './utils';

const { Title } = Typography;

const SUMMARY_SELECT_H = 32;

const summarySelectCls =
  '[&_.ant-select-arrow]:text-slate-500 [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!text-slate-900 [&_.ant-select-selector]:!rounded-r-2xl [&_.ant-select-selector]:!rounded-l-none [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-l-0 [&_.ant-select-selector]:!border-slate-200/80 [&_.ant-select-selector]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center';

const SummaryLabelTag: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{ height: SUMMARY_SELECT_H, lineHeight: `${SUMMARY_SELECT_H}px` }}
    className="inline-flex items-center whitespace-nowrap rounded-l-2xl border border-r-0 border-slate-200/80 bg-slate-50 px-2.5 text-xs font-medium text-slate-500 shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
  >
    {text}
  </span>
);

const formatExecutionTime = (seconds: number | null): string => {
  if (seconds == null) return '--';
  const minutes = seconds / 60;
  return `${minutes.toFixed(1)}`;
};

type OverviewSummarySectionProps = {
  overviewSummary: MetricSummary;
  keyIssueSummary: MetricSummary;
  overviewTrend: WeeklyCloseRateTrendPoint[];
  keyIssueTrend: WeeklyCloseRateTrendPoint[];
  summaryScore: number | null;
  summarySuccessRate: number | null;
  summaryAvgExecutionTime: number | null;
  repoCount: number;
  issueSourceMode: IssueSourceMode;
  includeCommonIssues: boolean;
  onIssueSourceModeChange: (mode: IssueSourceMode) => void;
  onIncludeCommonIssuesChange: (next: boolean) => void;
  onOpenIssues?: (
    card: 'primary' | 'secondary',
    bucket: 'total' | 'pending' | 'inProgress' | 'resolved'
  ) => void;
};

const OverviewSummarySection: React.FC<OverviewSummarySectionProps> = ({
  overviewSummary,
  keyIssueSummary,
  overviewTrend,
  keyIssueTrend,
  summaryScore,
  summarySuccessRate,
  summaryAvgExecutionTime,
  repoCount,
  issueSourceMode,
  includeCommonIssues,
  onIssueSourceModeChange,
  onIncludeCommonIssuesChange,
  onOpenIssues,
}) => {
  const effectiveMode: IssueSourceMode =
    issueSourceMode === 'common' ? 'common' : 'overall';
  const primaryTitle = effectiveMode === 'common' ? '共性问题' : '总体问题';
  const primaryTooltip =
    effectiveMode === 'common'
      ? '仅展示已标记为共性问题且严重程度P0-P3的问题'
      : '含严重程度P0-P3的所有问题';
  const secondaryTitle =
    effectiveMode === 'common' ? '关键共性问题' : '关键问题';
  const secondaryTooltip =
    effectiveMode === 'common'
      ? '仅展示已标记为共性问题且严重程度P0-P1的问题'
      : '含严重程度P0-P1的问题';

  return (
    <>
      <div className="overview-summary-title-row">
        <Title level={4} className="oj-section-title">
          总览信息
        </Title>
        <div className="overview-summary-actions">
          <div className="flex items-center">
            <SummaryLabelTag text="问题类型" />
            <Select
              value={issueSourceMode}
              onChange={(value) =>
                onIssueSourceModeChange(value as IssueSourceMode)
              }
              style={{ height: SUMMARY_SELECT_H }}
              className={`${summarySelectCls} min-w-[118px]`}
              styles={{ popup: { root: { minWidth: 140 } } }}
              getPopupContainer={(node) => node.parentElement ?? node}
              options={[
                { label: '总体问题', value: 'overall' },
                { label: '共性问题', value: 'common' },
              ]}
            />
            {issueSourceMode !== 'common' ? (
              <Checkbox
                checked={includeCommonIssues}
                onChange={(event) =>
                  onIncludeCommonIssuesChange(event.target.checked)
                }
                className="ml-3 text-xs font-medium text-slate-600"
              >
                包含共性问题
              </Checkbox>
            ) : null}
          </div>
        </div>
      </div>
      <div className="overview-summary-stack">
        <div className="overview-grid">
          <OverviewSummaryBlock
            title={primaryTitle}
            summary={overviewSummary}
            trend={overviewTrend}
            tooltip={primaryTooltip}
            onBucketClick={(bucket) => onOpenIssues?.('primary', bucket)}
          />
          <OverviewSummaryBlock
            title={secondaryTitle}
            summary={keyIssueSummary}
            trend={keyIssueTrend}
            tooltip={secondaryTooltip}
            onBucketClick={(bucket) => onOpenIssues?.('secondary', bucket)}
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
