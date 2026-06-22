import React, { useMemo } from 'react';
import type { CapabilityBenchmarkScoreItem } from './types';

const CHART_BARS_HEIGHT_PX = 236;

type CapabilityBenchmarkChartCardProps = {
  title?: React.ReactNode;
  rows: CapabilityBenchmarkScoreItem[];
  primaryLegend: string;
  secondaryLegend: string;
  emptyText?: string;
  className?: string;
};

const formatChartValue = (value: number | null | undefined) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return '--';
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
};

const CapabilityBenchmarkChartCard: React.FC<
  CapabilityBenchmarkChartCardProps
> = ({
  title,
  rows,
  primaryLegend,
  secondaryLegend,
  emptyText = '暂无能力对比数据',
  className,
}) => {
  const hasData = useMemo(
    () =>
      rows.some(
        (item) =>
          (typeof item.cannScore === 'number' && item.cannScore > 0) ||
          (typeof item.benchmarkScore === 'number' && item.benchmarkScore > 0)
      ),
    [rows]
  );

  const maxScore = useMemo(() => {
    const values = rows.flatMap((item) => [
      item.cannScore ?? 0,
      item.benchmarkScore ?? 0,
    ]);
    return Math.max(100, ...values);
  }, [rows]);

  const cardClassName = `benchmark-chart-card${
    className ? ` ${className}` : ''
  }`;

  return (
    <div className={cardClassName}>
      <div className="benchmark-chart-header">
        <div className="benchmark-chart-title">{title ?? null}</div>
      </div>
      {hasData ? (
        <>
          <div className="benchmark-chart">
            <div className="benchmark-chart-y">
              {[100, 80, 60, 40, 20, 0].map((value) => (
                <div
                  key={value}
                  className="benchmark-chart-y-row"
                  style={{
                    top: `${((100 - value) / 100) * CHART_BARS_HEIGHT_PX}px`,
                  }}
                >
                  <span className="benchmark-chart-y-label">{value}</span>
                </div>
              ))}
            </div>
            <div className="benchmark-chart-plot">
              <div className="benchmark-chart-grid">
                {[100, 80, 60, 40, 20, 0].map((value) => (
                  <span
                    key={value}
                    className="benchmark-chart-grid-line"
                    style={{
                      top: `${((100 - value) / 100) * CHART_BARS_HEIGHT_PX}px`,
                    }}
                  />
                ))}
              </div>
              <div className="benchmark-chart-groups">
                {rows.map((item) => {
                  const showCannBar =
                    typeof item.cannScore === 'number' && item.cannScore > 0;
                  const showBenchmarkBar =
                    typeof item.benchmarkScore === 'number' &&
                    item.benchmarkScore > 0;
                  const cannHeight = !showCannBar
                    ? 0
                    : Math.max(
                        14,
                        Math.min(
                          100,
                          Number(
                            (((item.cannScore ?? 0) / maxScore) * 100).toFixed(
                              2
                            )
                          )
                        )
                      );
                  const benchmarkHeight = !showBenchmarkBar
                    ? 0
                    : Math.max(
                        14,
                        Math.min(
                          100,
                          Number(
                            (
                              ((item.benchmarkScore ?? 0) / maxScore) *
                              100
                            ).toFixed(2)
                          )
                        )
                      );
                  return (
                    <div key={item.key} className="benchmark-chart-group">
                      <div className="benchmark-chart-slot">
                        <div className="benchmark-chart-bars">
                          {showCannBar ? (
                            <div
                              className="benchmark-chart-bar benchmark-chart-bar-cann"
                              style={{ height: `${cannHeight}%` }}
                            >
                              <span className="benchmark-chart-bar-value">
                                {formatChartValue(item.cannScore)}
                              </span>
                            </div>
                          ) : (
                            <span className="benchmark-chart-bar-placeholder" />
                          )}
                          {showBenchmarkBar ? (
                            <div
                              className="benchmark-chart-bar benchmark-chart-bar-benchmark"
                              style={{ height: `${benchmarkHeight}%` }}
                            >
                              <span className="benchmark-chart-bar-value">
                                {formatChartValue(item.benchmarkScore)}
                              </span>
                            </div>
                          ) : (
                            <span className="benchmark-chart-bar-placeholder" />
                          )}
                        </div>
                      </div>
                      <div className="benchmark-chart-label">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="benchmark-chart-legend">
            <span className="benchmark-chart-legend-item">
              <span className="benchmark-chart-dot benchmark-chart-dot-cann" />
              {primaryLegend}
            </span>
            <span className="benchmark-chart-legend-item">
              <span className="benchmark-chart-dot benchmark-chart-dot-benchmark" />
              {secondaryLegend}
            </span>
          </div>
        </>
      ) : (
        <div className="benchmark-chart-empty">{emptyText}</div>
      )}
    </div>
  );
};

export default CapabilityBenchmarkChartCard;
