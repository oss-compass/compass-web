import React from 'react';
import { Tooltip } from 'antd';

export type OverviewPainState = {
  key: string;
  label: string;
  fill: string;
  color: string;
};
export type OverviewPainPriority = {
  key: string;
  label: string;
  color: string;
  total: number;
  rate: number;
  counts: Record<string, number>;
};
export type OverviewPainSummaryCard = {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
  onClick?: () => void;
  hint?: string;
};

/** 社区贡献与社区工程共用的痛点进展卡；状态含义和统计由调用方提供。 */
const OverviewPainProgress: React.FC<{
  cards: OverviewPainSummaryCard[];
  priorities: OverviewPainPriority[];
  states: readonly OverviewPainState[];
  priorityTitle?: string;
  rateLabel?: string;
  rateHint?: string;
  onOpen: (state?: string, priority?: string) => void;
  trendTitle: string;
  trendControls: React.ReactNode;
  trendContent: React.ReactNode;
  trendLegend: React.ReactNode;
  trendEmpty?: React.ReactNode;
}> = ({
  cards,
  priorities,
  states,
  priorityTitle = '各优先级问题闭环进展',
  rateLabel = '闭环率',
  rateHint,
  onOpen,
  trendTitle,
  trendControls,
  trendContent,
  trendLegend,
  trendEmpty = '所选时间范围暂无数据',
}) => (
  <div className="section-card pain-progress-reference">
    <div className="mb-3 text-[16px] font-extrabold leading-6 text-[var(--overview-text)]">
      痛点问题进展及趋势
    </div>
    <div className="ov-row">
      {cards.map((card) => (
        <div key={card.label} className="ov-item">
          <div className="ov-label">{card.label}</div>
          <Tooltip title={card.hint}>
            <div
              className={`ov-value ${card.valueClassName || ''} ${
                card.onClick ? 'ov-value-link' : ''
              }`.trim()}
              role={card.onClick ? 'button' : undefined}
              tabIndex={card.onClick ? 0 : undefined}
              onClick={card.onClick}
              onKeyDown={
                card.onClick
                  ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        card.onClick?.();
                      }
                    }
                  : undefined
              }
            >
              {card.value}
            </div>
          </Tooltip>
        </div>
      ))}
    </div>
    <div className="pain-duo">
      <section className="pain-panel pain-priorities">
        <h4 className="pain-mini">{priorityTitle}</h4>
        <div className="pain-priority-list">
          {priorities.map((priority) => (
            <div key={priority.key} className="pain-priority-row">
              <button
                type="button"
                className="pain-priority-label"
                style={{ color: priority.color }}
                title={`查看 ${priority.label} 痛点`}
                onClick={() => onOpen(undefined, priority.key)}
              >
                <i style={{ background: priority.color }} />
                {priority.label}
              </button>
              <div className="pain-status-bar">
                {priority.total === 0 && (
                  <span
                    className="pain-status-no-tracking"
                    title={`需跟踪问题为 0，${rateLabel}按 100% 展示`}
                    style={{
                      background: 'var(--overview-slateBorder)',
                      color: 'var(--overview-slate)',
                    }}
                  >
                    0
                  </span>
                )}
                {states.map((state) => {
                  const value = priority.counts[state.key] ?? 0;
                  return value > 0 ? (
                    <button
                      key={state.key}
                      type="button"
                      title={`${priority.label} · ${state.label}：${value} 个`}
                      style={{
                        width: `${(value / priority.total) * 100}%`,
                        background: state.fill,
                        color: state.color,
                      }}
                      onClick={() => onOpen(state.key, priority.key)}
                    >
                      {value}
                    </button>
                  ) : null;
                })}
              </div>
              <Tooltip title={rateHint}>
                <span
                  className="pain-priority-rate"
                  style={{
                    color:
                      priority.total === 0
                        ? 'var(--overview-slate)'
                        : priority.rate > 0
                        ? 'var(--overview-greenDark)'
                        : 'var(--overview-slateLight)',
                  }}
                >
                  {priority.rate.toFixed(1)}%
                </span>
              </Tooltip>
            </div>
          ))}
        </div>
        <div className="pain-legend">
          {states.map((state) => (
            <span key={state.key}>
              <i style={{ background: state.fill }} />
              {state.label}
            </span>
          ))}
        </div>
      </section>
      <section className="pain-panel pain-weekly">
        <div className="ov-panel-head">
          <div className="ov-panel-title">{trendTitle}</div>
          {trendControls}
        </div>
        {trendContent ? (
          <>
            <div className="pain-trend-chart">{trendContent}</div>
            <div className="oj-trend-legend">{trendLegend}</div>
          </>
        ) : (
          <div className="pain-trend-empty">{trendEmpty}</div>
        )}
      </section>
    </div>
    <style jsx>{`
      .pain-progress-reference {
        container-type: inline-size;
      }
      .ov-row {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }
      @container (max-width: 1000px) {
        .ov-row {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      @container (max-width: 540px) {
        .ov-row {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      .pain-duo {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 14px;
        margin-top: 24px;
        align-items: stretch;
      }
      .pain-panel {
        min-width: 0;
        padding: 18px 18px 16px;
        border: 1px solid rgba(var(--overview-slateBorder-rgb), 0.92);
        border-radius: 18px;
        background: rgba(var(--overview-white-rgb), 0.9);
        box-shadow: inset 0 1px 0 rgba(var(--overview-white-rgb), 0.7);
      }
      .pain-mini {
        font-size: 15px;
        line-height: 22px;
        font-weight: 700;
        margin: 0 0 12px;
        color: var(--overview-text);
      }
      .pain-priorities {
        /* 整体高度基准：约 330px，行高以此为锚点，右侧图表同步撑满 */
        min-height: 330px;
        display: flex;
        flex-direction: column;
      }
      .pain-priority-list {
        flex: 1 1 0;
        display: grid;
        gap: 8px;
      }
      .pain-priority-row {
        display: grid;
        grid-template-columns: 104px minmax(0, 1fr) 56px;
        align-items: center;
        gap: 18px;
        padding: 9px 0;
      }
      .pain-priority-label {
        display: flex;
        align-items: center;
        gap: 7px;
        color: var(--overview-slate);
        font-size: 12.5px;
        font-weight: 600;
        text-align: left;
        white-space: nowrap;
      }
      .pain-priority-label i,
      .pain-legend > span:not(.pain-legend-items) > i {
        width: 8px;
        height: 8px;
        border-radius: 2px;
        flex-shrink: 0;
      }
      .pain-status-bar {
        display: flex;
        height: 24px;
        /* 宽度略收窄并居中，与两侧留出呼吸空间 */
        width: 96%;
        justify-self: center;
        border: 1px solid var(--overview-slateBorder);
        border-radius: 9px;
        overflow: hidden;
        background: var(--overview-slateSoft);
      }
      .pain-status-bar button {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        overflow: hidden;
        border-right: 1px solid rgba(var(--overview-white-rgb), 0.6);
        font-size: 12px;
        font-weight: 800;
        line-height: 24px;
        white-space: nowrap;
      }
      .pain-status-bar button:last-child {
        border-right: 0;
      }
      .pain-status-bar button:hover {
        filter: brightness(0.95);
      }
      .pain-status-no-tracking {
        width: 100%;
        text-align: center;
        font-size: 12px;
        font-weight: 800;
        line-height: 24px;
      }
      .pain-priority-rate {
        text-align: right;
        font-size: 13.5px;
        line-height: 20px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .pain-legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
        margin-top: 10px;
        font-size: 12px;
        color: var(--overview-slate);
      }
      .pain-legend span {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .pain-weekly {
        /* 图表面板左右略紧于左侧，让趋势图占据更多宽度 */
        padding: 18px 14px 16px;
        display: flex;
        flex-direction: column;
      }
      .pain-trend-chart {
        display: flex;
        /* 基准高度归零，不参与面板自然高度，行高完全由左侧优先级列表决定 */
        flex: 1 1 0;
        min-height: 140px;
      }
      .pain-trend-chart :global(.oj-trend-chart) {
        flex: 1 1 auto;
        min-height: 0;
      }
      .pain-trend-empty {
        flex: 1 1 auto;
        min-height: 176px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--overview-slateLight);
        font-size: 13px;
      }
      @container (max-width: 800px) {
        .pain-duo {
          grid-template-columns: minmax(0, 1fr);
        }
        .pain-priorities {
          padding: 18px 18px 16px;
        }
        .pain-weekly {
          padding: 18px 18px 16px;
        }
      }
    `}</style>
  </div>
);
export default OverviewPainProgress;
