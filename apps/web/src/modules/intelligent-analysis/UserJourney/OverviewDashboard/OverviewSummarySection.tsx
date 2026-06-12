import React from 'react';
import { Checkbox, Segmented, Typography } from 'antd';
import OverviewSummaryBlock from './OverviewSummaryBlock';
import ExperienceScoreRulePopoverTrigger from '../components/ExperienceScoreRulePopoverTrigger';
import { ScoreSparkline } from './CloseRateTrendChart';
import ScoreTrendModal from './ScoreTrendModal';
import type {
  CommonIssueGroup,
  DashboardIssue,
  IssueBucket,
  IssueSourceMode,
  MetricSummary,
  Severity,
  TrendWindow,
  WeeklyCloseRateTrendPoint,
} from './types';
import type { ScoreTrendPoint } from './scoreTrend';
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
  summaryScoreTrend: ScoreTrendPoint[];
  summarySuccessRateTrend: ScoreTrendPoint[];
  summaryAvgExecutionTime: number | null;
  repoCount: number;
  titleExtra?: React.ReactNode;
  issueSourceMode: IssueSourceMode;
  includeCommonIssues: boolean;
  commonIssues: CommonIssueGroup[];
  trendWindow: TrendWindow;
  onTrendWindowChange: (next: TrendWindow) => void;
  onIssueSourceModeChange: (mode: IssueSourceMode) => void;
  onIncludeCommonIssuesChange: (next: boolean) => void;
  onOpenIssues?: (
    card: 'primary' | 'secondary',
    bucket: 'total' | IssueBucket,
    severity?: Severity
  ) => void;
};

const OverviewSummarySection: React.FC<OverviewSummarySectionProps> = ({
  overviewSummary,
  overviewTrend,
  overviewIssues,
  summaryScore,
  summarySuccessRate,
  summaryScoreTrend,
  summarySuccessRateTrend,
  summaryAvgExecutionTime,
  repoCount,
  titleExtra,
  issueSourceMode,
  includeCommonIssues,
  commonIssues,
  trendWindow,
  onTrendWindowChange,
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
  const [trendModal, setTrendModal] = React.useState<{
    open: boolean;
    title: string;
    points: ScoreTrendPoint[];
    legendLabel: string;
    axisTitle: string;
    tooltipLabel: string;
    valueType: 'score' | 'percent';
  }>({
    open: false,
    title: '',
    points: [],
    legendLabel: '综合体验评分',
    axisTitle: '综合体验评分',
    tooltipLabel: '周度评分',
    valueType: 'score',
  });

  const getAlignedTrendPoints = React.useCallback(
    (points: ScoreTrendPoint[], currentValue: number | null) => {
      if (!points.length || currentValue == null) return points;
      const lastPoint = points[points.length - 1];
      const today = new Date();
      const todayText = `${today.getFullYear()}-${`${
        today.getMonth() + 1
      }`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`;
      const todayLabel = `${today.getMonth() + 1}/${today.getDate()}`;
      if (
        lastPoint?.score === currentValue &&
        lastPoint?.date === todayText &&
        lastPoint?.label === todayLabel
      ) {
        return points;
      }
      return [
        ...points.slice(0, -1),
        {
          ...lastPoint,
          score: currentValue,
          date: todayText,
          label: todayLabel,
          weekStart: todayText,
          weekEnd: todayText,
        },
      ];
    },
    []
  );

  const renderTrendTrigger = (
    title: string,
    points: ScoreTrendPoint[],
    currentValue: number | null,
    legendLabel: string,
    axisTitle: string,
    tooltipLabel: string,
    valueType: 'score' | 'percent'
  ) => {
    const alignedPoints = getAlignedTrendPoints(points, currentValue);
    return (
      <button
        type="button"
        className="bm-trend-sparkline"
        title={`查看${title}`}
        disabled={!alignedPoints.length}
        onClick={() =>
          setTrendModal({
            open: true,
            title,
            points: alignedPoints,
            legendLabel,
            axisTitle,
            tooltipLabel,
            valueType,
          })
        }
      >
        <ScoreSparkline
          values={alignedPoints.slice(-7).map((point) => point.score)}
        />
      </button>
    );
  };

  return (
    <>
      <div className="overview-summary-title-row">
        <Title level={4} className="oj-section-title">
          总览信息
        </Title>
        {titleExtra ? (
          <div className="overview-summary-actions">{titleExtra}</div>
        ) : null}
      </div>
      <div className="overview-summary-stack">
        <div className="overview-bottom-row">
          <div className="bottom-metric">
            <div className="bm-label inline-flex items-center justify-center gap-1">
              综合体验评分
              <ExperienceScoreRulePopoverTrigger />
            </div>
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
              {renderTrendTrigger(
                '总览 · 综合体验评分趋势',
                summaryScoreTrend,
                summaryScore,
                '综合体验评分',
                '综合体验评分',
                '周度评分',
                'score'
              )}
            </div>
          </div>
          <div className="bottom-metric">
            <div className="bm-label inline-flex items-center justify-center gap-1">
              端到端成功率
            </div>
            <div className="bm-value">
              <span className="bm-value-main">
                {formatPercent(summarySuccessRate)}
              </span>
              {renderTrendTrigger(
                '总览 · 端到端成功率趋势',
                summarySuccessRateTrend,
                summarySuccessRate,
                '端到端成功率',
                '端到端成功率',
                '周度成功率',
                'percent'
              )}
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
          trendWindow={trendWindow}
          onTrendWindowChange={onTrendWindowChange}
          issues={overviewIssues}
          commonIssues={commonIssues}
          mode={effectiveMode}
          tooltip={primaryTooltip}
          onBucketClick={(bucket) => onOpenIssues?.('primary', bucket)}
          onPriorityBucketClick={(severity, bucket) =>
            onOpenIssues?.('primary', bucket, severity)
          }
        />
      </div>
      <ScoreTrendModal
        open={trendModal.open}
        title={trendModal.title}
        points={trendModal.points}
        legendLabel={trendModal.legendLabel}
        axisTitle={trendModal.axisTitle}
        tooltipLabel={trendModal.tooltipLabel}
        valueType={trendModal.valueType}
        onClose={() =>
          setTrendModal({
            open: false,
            title: '',
            points: [],
            legendLabel: '综合体验评分',
            axisTitle: '综合体验评分',
            tooltipLabel: '周度评分',
            valueType: 'score',
          })
        }
      />
    </>
  );
};

export default OverviewSummarySection;
