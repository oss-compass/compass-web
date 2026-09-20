import React from 'react';
import { Modal, Typography } from 'antd';
import { ScoreTrendChart } from '../../../../UserJourney/OverviewDashboard/ScoreTrendChart';
import type { ScoreTrendPoint } from '../../../../UserJourney/OverviewDashboard/scoreTrend';
import { OJ_TREND_COLORS } from '../../../../UserJourney/OverviewDashboard/constants';

const { Title } = Typography;

export type IssueTrendModalData = {
  title: string;
  subtitle?: string;
  unit?: string;
  height?: number;
  values: Array<number | null>;
  /** 与 values 对齐的 X 轴标签（已格式化短标签） */
  labels: string[];
  /** 与 values 对齐的原始周期串（如 2026-08-25_to_2026-08-31），
   *  用于 tooltip 展示周起止日期 */
  periods?: string[];
};

type IssueTrendModalProps = {
  open: boolean;
  trend: IssueTrendModalData | null;
  onClose: () => void;
};

/** 从原始周期串解析周起止短日期（如 08-25 / 08-31），解析失败回退 label */
const toWeekBounds = (
  period: string | undefined,
  fallback: string
): { weekStart: string; weekEnd: string } => {
  if (period && period.includes('_to_')) {
    const [start, end] = period.split('_to_');
    const shorten = (value: string) =>
      value.length > 5 ? value.slice(5) : value;
    return { weekStart: shorten(start), weekEnd: shorten(end) };
  }
  return { weekStart: fallback, weekEnd: fallback };
};

/**
 * Issue 总览统一趋势弹窗：与社区入门的综合体验评分弹窗共用图表。
 */
const IssueTrendModal: React.FC<IssueTrendModalProps> = ({
  open,
  trend,
  onClose,
}) => {
  const points = React.useMemo<ScoreTrendPoint[]>(
    () =>
      trend?.values.map((score, index) => {
        const label = trend.labels[index] ?? '';
        const { weekStart, weekEnd } = toWeekBounds(
          trend.periods?.[index],
          label
        );
        return {
          key: `${index}-${label}`,
          date: `${weekStart} ~ ${weekEnd}`,
          label,
          score,
          weekStart,
          weekEnd,
        };
      }) ?? [],
    [trend]
  );
  const isPercent = trend?.unit === '%';
  const axisTitle = React.useMemo(() => {
    const title = trend?.title ?? '';
    if (title.includes('Issue')) return '涉及 Issue 数';
    if (title.includes('仓')) return '仓库数';
    if (isPercent) return '百分比';
    return '综合体验评分';
  }, [isPercent, trend?.title]);

  return (
    <Modal
      open={open}
      title={null}
      footer={null}
      onCancel={onClose}
      width={860}
      destroyOnHidden
      styles={{ body: { padding: '20px 24px 16px' } }}
    >
      {trend ? (
        <>
          <div className="mb-3">
            <Title level={5} style={{ margin: 0 }}>
              {trend.title}
            </Title>
          </div>
          <ScoreTrendChart
            points={points}
            height={trend.height ?? 290}
            axisTitle={axisTitle}
            tooltipLabel={axisTitle}
            valueType={isPercent ? 'percent' : 'score'}
            integerScale
            fitContainerHeight
            renderTooltipHeader={(point) => (
              <>
                <span>{point.weekStart}</span>
                <span>{point.weekEnd}</span>
              </>
            )}
          />
          <div className="oj-trend-legend">
            <span className="oj-trend-legend-item">
              <span
                className="oj-trend-line"
                style={{
                  background: `linear-gradient(90deg, ${OJ_TREND_COLORS.scoreGradientStart} 0%, ${OJ_TREND_COLORS.scoreLine} 100%)`,
                }}
              />
              {axisTitle}
            </span>
          </div>
        </>
      ) : null}
    </Modal>
  );
};

export default IssueTrendModal;
