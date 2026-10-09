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
  /** 缩略图与弹窗共用的纵轴范围。 */
  minScale?: number;
  maxScale?: number;
  /** 月度聚合序列；存在时弹窗默认展示月度，并允许切换周度。 */
  monthly?: {
    values: Array<number | null>;
    labels: string[];
    periods?: string[];
    minScale?: number;
    maxScale?: number;
  };
};

export type IssueTrendGranularity = 'month' | 'week';

type IssueTrendModalProps = {
  open: boolean;
  trend: IssueTrendModalData | null;
  onClose: () => void;
  granularity?: IssueTrendGranularity;
  onGranularityChange?: (value: IssueTrendGranularity) => void;
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
  granularity: controlledGranularity,
  onGranularityChange,
}) => {
  const [internalGranularity, setInternalGranularity] =
    React.useState<IssueTrendGranularity>('month');
  const granularity = controlledGranularity ?? internalGranularity;
  React.useEffect(() => {
    if (open && controlledGranularity == null) {
      setInternalGranularity(trend?.monthly ? 'month' : 'week');
    }
  }, [controlledGranularity, open, trend]);
  const changeGranularity = (value: IssueTrendGranularity) => {
    if (controlledGranularity == null) setInternalGranularity(value);
    onGranularityChange?.(value);
  };
  const activeSeries =
    granularity === 'month' && trend?.monthly ? trend.monthly : trend;
  const points = React.useMemo<ScoreTrendPoint[]>(
    () =>
      activeSeries?.values.map((score, index) => {
        const label = activeSeries.labels[index] ?? '';
        const { weekStart, weekEnd } = toWeekBounds(
          activeSeries.periods?.[index],
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
    [activeSeries]
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
          <div className="mb-3 flex items-center justify-between gap-4">
            <Title level={5} style={{ margin: 0 }}>
              {trend.title}
            </Title>
            {trend.monthly ? (
              <div
                className="inline-flex h-9 shrink-0 items-center rounded-xl border border-[rgba(var(--overview-slateBorder-rgb),0.9)] bg-[rgba(var(--overview-white-rgb),0.65)] p-0.5"
                role="group"
                aria-label="趋势统计周期"
              >
                {(
                  [
                    { label: '月度', value: 'month' },
                    { label: '周度', value: 'week' },
                  ] as const
                ).map((option) => {
                  const selected = granularity === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      className={`h-[30px] min-w-[56px] rounded-[9px] px-3 text-xs font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--overview-blue)] ${
                        selected
                          ? 'bg-[var(--overview-white)] text-[var(--overview-blue)] shadow-[0_1px_4px_rgba(var(--overview-text-rgb),0.12)]'
                          : 'text-[var(--overview-slateDark)] hover:text-[var(--overview-blue)]'
                      }`}
                      onClick={() => changeGranularity(option.value)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
          <ScoreTrendChart
            points={points}
            height={trend.height ?? 290}
            axisTitle={axisTitle}
            tooltipLabel={axisTitle}
            valueType={isPercent ? 'percent' : 'score'}
            integerScale
            fitContainerHeight
            minScale={activeSeries?.minScale}
            maxScale={activeSeries?.maxScale}
            renderTooltipHeader={(point) =>
              granularity === 'month' && trend.monthly ? (
                <span>{point.label}</span>
              ) : (
                <>
                  <span>{point.weekStart}</span>
                  <span>{point.weekEnd}</span>
                </>
              )
            }
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
