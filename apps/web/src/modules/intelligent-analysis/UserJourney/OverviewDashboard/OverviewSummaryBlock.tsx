import React from 'react';
import { ConfigProvider, DatePicker, Popover, Tooltip } from 'antd';
import type { Locale } from 'antd/es/locale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import getLocale from '@common/utils/getLocale';
import {
  CalendarOutlined,
  CheckOutlined,
  DownOutlined,
} from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import {
  getIssueTypeMarkerColor,
  getIssueTypeTagStyle,
  ISSUE_TYPE_CFG,
  ISSUE_TYPE_PALETTE,
  OJ_TREND_COLORS,
  OJ_TREND_SEVERITY_SEGMENTS,
  SEVERITY_CFG,
  STATUS_CFG,
} from './constants';
import {
  CircularProgress,
  IssueProgressBar,
  ProgressBarOnly,
  ProgressMetaOnly,
} from './ProgressComponents';
import type {
  CommonIssueGroup,
  DashboardIssue,
  IssueBucket,
  MetricSummary,
  Severity,
  TrendWindow,
  WeeklyCloseRateTrendPoint,
} from './types';
import { formatPercent, normalizeSeverity } from './utils';
import { USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO } from '../rawData/constants';

type OverviewSummaryBlockProps = {
  title: React.ReactNode;
  summary: MetricSummary;
  trend?: WeeklyCloseRateTrendPoint[];
  trendWindow?: TrendWindow;
  issues?: DashboardIssue[];
  commonIssues?: CommonIssueGroup[];
  mode?: 'overall' | 'common';
  tooltip?: string;
  onTrendWindowChange?: (next: TrendWindow) => void;
  onBucketClick?: (bucket: 'total' | IssueBucket) => void;
  onPriorityBucketClick?: (
    severity: Severity,
    bucket: 'total' | IssueBucket
  ) => void;
};

const DATE_RANGE_FORMAT = 'YYYY-MM-DD';
const TREND_PRESET_WEEKS = [7, 13, 28] as const;
const { RangePicker } = DatePicker;

const getTrendPresetLabel = (weeks: number): string => {
  if (weeks === 13) return '最近三月';
  if (weeks === 28) return '最近六月';
  return `最近${weeks}周`;
};

const formatTrendWindowLabel = (value: TrendWindow): string => {
  if (value.kind === 'weeks') return getTrendPresetLabel(value.weeks);
  return `${value.start} ~ ${value.end}`;
};

const TrendWindowPicker: React.FC<{
  value: TrendWindow;
  onChange: (next: TrendWindow) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [locale, setLocale] = React.useState<Locale>(enUS);
  const [showCustom, setShowCustom] = React.useState(value.kind === 'range');
  const [customRange, setCustomRange] = React.useState<
    [Dayjs | null, Dayjs | null]
  >(() => {
    if (value.kind === 'range') {
      return [dayjs(value.start), dayjs(value.end)];
    }
    const end = dayjs().subtract(1, 'day');
    const start = end.subtract(value.weeks * 7 - 1, 'day');
    return [start, end];
  });

  React.useEffect(() => {
    const l = getLocale();
    if (l === 'zh') {
      setLocale(zhCN);
      dayjs.locale('zh-cn');
    } else {
      setLocale(enUS);
      dayjs.locale('en');
    }
  }, []);

  React.useEffect(() => {
    if (!open) return;
    setShowCustom(value.kind === 'range');
    if (value.kind === 'range') {
      setCustomRange([dayjs(value.start), dayjs(value.end)]);
      return;
    }
    const end = dayjs().subtract(1, 'day');
    const start = end.subtract(value.weeks * 7 - 1, 'day');
    setCustomRange([start, end]);
  }, [open, value]);

  const disabledDate = (current: Dayjs) => {
    if (!current) return false;
    const latest = dayjs().subtract(1, 'day');
    const minDate = dayjs('2000-01-01');
    return current.isAfter(latest, 'day') || current.isBefore(minDate, 'day');
  };

  const handlePreset = (weeks: number) => {
    onChange({ kind: 'weeks', weeks });
    setOpen(false);
  };

  const handleConfirm = () => {
    const [start, end] = customRange;
    if (!start || !end) return;
    const normalizedStart = start.isBefore(end) ? start : end;
    const normalizedEnd = start.isBefore(end) ? end : start;
    const daysDiff = normalizedEnd.diff(normalizedStart, 'day');
    const finalEnd =
      daysDiff >= 6 ? normalizedEnd : normalizedStart.add(6, 'day');
    onChange({
      kind: 'range',
      start: normalizedStart.format(DATE_RANGE_FORMAT),
      end: finalEnd.format(DATE_RANGE_FORMAT),
    });
    setOpen(false);
  };

  const content = (
    <ConfigProvider locale={locale}>
      <div className="oj-trend-range-panel">
        <div className="oj-trend-range-presets">
          {TREND_PRESET_WEEKS.map((weeks) => {
            const active = value.kind === 'weeks' && value.weeks === weeks;
            return (
              <button
                key={weeks}
                type="button"
                className={`oj-trend-range-option ${
                  active ? 'is-active' : ''
                }`.trim()}
                onClick={() => handlePreset(weeks)}
              >
                <span>{getTrendPresetLabel(weeks)}</span>
                {active ? (
                  <CheckOutlined className="oj-trend-range-check" />
                ) : null}
              </button>
            );
          })}
          <button
            type="button"
            className={`oj-trend-range-option ${
              showCustom ? 'is-active' : ''
            }`.trim()}
            onClick={() => setShowCustom(true)}
          >
            <span>自定义</span>
            {showCustom ? (
              <CheckOutlined className="oj-trend-range-check" />
            ) : null}
          </button>
        </div>
        {showCustom ? (
          <div className="oj-trend-range-custom">
            <RangePicker
              format={DATE_RANGE_FORMAT}
              value={customRange}
              onChange={(dates) => {
                if (!dates) return;
                setCustomRange(dates);
              }}
              onCalendarChange={(dates) => {
                if (!dates || !dates[0] || !dates[1]) return;
                const daysDiff = dates[1].diff(dates[0], 'day');
                if (daysDiff >= 6) return;
                setCustomRange([dates[0], dates[0].add(6, 'day')]);
              }}
              disabledDate={disabledDate}
              size="small"
              separator="~"
              inputReadOnly
              className="oj-trend-range-picker"
            />
            <button
              type="button"
              className="oj-trend-range-confirm"
              onClick={handleConfirm}
            >
              确认
            </button>
          </div>
        ) : null}
      </div>
    </ConfigProvider>
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      trigger="click"
      overlayClassName="oj-trend-range-popover"
      content={content}
    >
      <button
        type="button"
        className="oj-trend-range-trigger"
        title="选择时间窗"
      >
        <CalendarOutlined className="oj-trend-range-icon" />
        <span className="oj-trend-range-label">
          {formatTrendWindowLabel(value)}
        </span>
        <DownOutlined className="oj-trend-range-caret" />
      </button>
    </Popover>
  );
};

const TREND_VIEWBOX_W = 600;
const TREND_VIEWBOX_H = 196;
const TREND_PLOT_LEFT = 52;
const TREND_PLOT_RIGHT = 548;
const TREND_PLOT_TOP = 32;
const TREND_PLOT_BOTTOM = 156;
const TREND_LABEL_SAFE_TOP = 18;
const TREND_LEFT_AXIS_X = TREND_PLOT_LEFT - 8;
const TREND_RIGHT_AXIS_X = TREND_PLOT_RIGHT + 8;
const TREND_TOOLTIP_HALF_WIDTH = 92;

const PRIORITY_LEVELS: Array<{
  key: Severity;
  shortLabel: string;
  label: string;
  description: string;
}> = (['P0_BLOCKER', 'P1_CRITICAL', 'P2_MAJOR', 'P3_MINOR'] as const).map(
  (level) => {
    const guide = USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO.find(
      (item) => item.level === level
    );

    return {
      key: level as Severity,
      shortLabel: level.split('_')[0],
      label: guide?.label ?? level,
      description: guide?.description ?? '',
    };
  }
);

const getNiceMax = (value: number): number => {
  if (!Number.isFinite(value) || value <= 0) return 10;
  if (value <= 5) return 6;

  const paddedValue = value * 1.15;
  const magnitude = 10 ** Math.floor(Math.log10(paddedValue));
  const normalized = paddedValue / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 3) return 3 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
};

const formatTrendRange = (point: WeeklyCloseRateTrendPoint): string => {
  if (point.weekStart && point.weekEnd) {
    return `${point.weekStart} - ${point.weekEnd}`;
  }
  return point.label;
};

const getTrendSeverityValue = (
  point: WeeklyCloseRateTrendPoint,
  key: (typeof OJ_TREND_SEVERITY_SEGMENTS)[number]['key']
): number => Number(point[key] ?? 0);

const buildPriorityProgress = (issues: DashboardIssue[]) =>
  PRIORITY_LEVELS.map((level) => {
    const levelIssues = issues.filter((issue) => issue.severity === level.key);
    const total = levelIssues.length;
    const pending = levelIssues.filter(
      (issue) => issue.normalizedStatus === 'pending'
    ).length;
    const inProgress = levelIssues.filter(
      (issue) => issue.normalizedStatus === 'inProgress'
    ).length;
    const resolved = levelIssues.filter(
      (issue) =>
        issue.normalizedStatus === 'resolved' || issue.normalizedStatus === 'na'
    ).length;
    const closeRate =
      total > 0 ? Number(((resolved / total) * 100).toFixed(1)) : 0;

    return {
      ...level,
      tagColor: SEVERITY_CFG[level.key].tagColor,
      tagBg: SEVERITY_CFG[level.key].tagBg,
      tagBorder: SEVERITY_CFG[level.key].tagBorder,
      total,
      pending,
      inProgress,
      resolved,
      closeRate,
    };
  });

const TrendChart: React.FC<{
  points: WeeklyCloseRateTrendPoint[];
  mode?: 'overall' | 'common';
}> = ({ points, mode = 'overall' }) => {
  const chartId = React.useId();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ left: 0, top: 0 });
  const n = points.length;
  if (n === 0) return null;
  const maxTotal = Math.max(0, ...points.map((p) => p.total));
  const yMax = getNiceMax(maxTotal);
  const plotH = TREND_PLOT_BOTTOM - TREND_PLOT_TOP;
  const plotW = TREND_PLOT_RIGHT - TREND_PLOT_LEFT;
  const step = n > 0 ? plotW / n : plotW;
  const barW = Math.min(36, step * 0.48);

  const xCenter = (index: number) => TREND_PLOT_LEFT + step * (index + 0.5);
  const yForCount = (value: number) =>
    TREND_PLOT_BOTTOM - (Math.max(0, value) / yMax) * plotH;
  const yForRate = (value: number) =>
    TREND_PLOT_BOTTOM - (Math.max(0, Math.min(100, value)) / 100) * plotH;

  const yTextMin = TREND_LABEL_SAFE_TOP;
  const ratePointYs = points.map((p) => yForRate(p.closeRate));
  const rateLabelYs = ratePointYs.map((y) => Math.max(yTextMin, y - 16));
  const totalTopYs = points.map((p) => yForCount(p.total));
  const totalLabelYs = totalTopYs.map((y) => Math.max(yTextMin, y - 8));
  const showRateLabel = points.map((p) => p.closeRate > 0);
  const showTotalLabel = points.map((p, index) => {
    if (p.total < 0) return false;
    if (!showRateLabel[index]) return true;
    return Math.abs(totalLabelYs[index] - rateLabelYs[index]) >= 18;
  });

  const ticks = [
    yMax,
    Math.round((yMax * 3) / 4),
    Math.round(yMax / 2),
    Math.round(yMax / 4),
    0,
  ];
  const gridYs = ticks.map((t) => yForCount(t));

  const polylinePoints = points
    .map((p, index) => `${xCenter(index)},${yForRate(p.closeRate)}`)
    .join(' ');
  const areaPoints = `${TREND_PLOT_LEFT},${TREND_PLOT_BOTTOM} ${polylinePoints} ${xCenter(
    n - 1
  )},${TREND_PLOT_BOTTOM}`;
  const activePoint = activeIndex == null ? null : points[activeIndex];
  const activeX = activeIndex == null ? null : xCenter(activeIndex);

  const updateTooltip = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const leftPx = (xCenter(index) / TREND_VIEWBOX_W) * rect.width;
    const topPx =
      (Math.min(ratePointYs[index], totalTopYs[index]) / TREND_VIEWBOX_H) *
      rect.height;
    setTooltipPos({
      left: Math.min(
        Math.max(leftPx, TREND_TOOLTIP_HALF_WIDTH),
        rect.width - TREND_TOOLTIP_HALF_WIDTH
      ),
      top: Math.max(topPx, 18),
    });
  };

  const handleActivate = (index: number) => {
    setActiveIndex(index);
    updateTooltip(index);
  };

  return (
    <div
      ref={wrapperRef}
      className="oj-trend-chart"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <svg
        className="oj-trend-svg"
        viewBox={`0 0 ${TREND_VIEWBOX_W} ${TREND_VIEWBOX_H}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`${chartId}-line-gradient`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={OJ_TREND_COLORS.lineGradientStart} />
            <stop offset="100%" stopColor={OJ_TREND_COLORS.line} />
          </linearGradient>
          <linearGradient
            id={`${chartId}-area-gradient`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(25, 167, 150, 0.22)" />
            <stop offset="100%" stopColor="rgba(25, 167, 150, 0.02)" />
          </linearGradient>
        </defs>
        <rect
          x={TREND_PLOT_LEFT}
          y={TREND_PLOT_TOP}
          width={plotW}
          height={plotH}
          rx={0}
          className="oj-trend-plot-bg"
        />
        {ticks.slice(0, 4).map((t, i) => {
          const y = yForCount(t);
          const nextY =
            i < ticks.length - 1 ? yForCount(ticks[i + 1]) : TREND_PLOT_BOTTOM;
          return (
            <rect
              key={`band-${i}`}
              x={TREND_PLOT_LEFT}
              y={y}
              width={plotW}
              height={nextY - y}
              className={
                i % 2 === 0
                  ? 'oj-trend-band oj-trend-band-strong'
                  : 'oj-trend-band'
              }
            />
          );
        })}
        {gridYs.slice(0, 4).map((y, i) => (
          <line
            key={`g-${i}`}
            x1={TREND_PLOT_LEFT}
            y1={y}
            x2={TREND_PLOT_RIGHT}
            y2={y}
            className="oj-trend-grid"
          />
        ))}
        <line
          x1={TREND_PLOT_LEFT}
          y1={TREND_PLOT_BOTTOM}
          x2={TREND_PLOT_RIGHT}
          y2={TREND_PLOT_BOTTOM}
          className="oj-trend-axis-line"
        />
        <line
          x1={TREND_PLOT_LEFT}
          y1={TREND_PLOT_TOP}
          x2={TREND_PLOT_LEFT}
          y2={TREND_PLOT_BOTTOM}
          className="oj-trend-axis-line"
        />
        <line
          x1={TREND_PLOT_RIGHT}
          y1={TREND_PLOT_TOP}
          x2={TREND_PLOT_RIGHT}
          y2={TREND_PLOT_BOTTOM}
          className="oj-trend-axis-line"
        />

        {ticks.map((t, i) => (
          <text
            key={`yl-${i}`}
            className="oj-trend-axis oj-trend-axis-y"
            x={TREND_LEFT_AXIS_X}
            y={yForCount(t) + 4}
            textAnchor="end"
          >
            {t}
          </text>
        ))}
        <text
          className="oj-trend-axis-title oj-trend-axis-title-y"
          x={TREND_LEFT_AXIS_X}
          y={16}
          textAnchor="end"
        >
          问题数
        </text>

        {[100, 75, 50, 25, 0].map((t, i) => (
          <text
            key={`yr-${i}`}
            className="oj-trend-axis oj-trend-axis-y"
            x={TREND_RIGHT_AXIS_X}
            y={yForRate(t) + 4}
          >
            {t}%
          </text>
        ))}
        <text
          className="oj-trend-axis-title oj-trend-axis-title-y"
          x={TREND_RIGHT_AXIS_X}
          y={16}
          textAnchor="start"
        >
          闭环率
        </text>

        <polygon
          points={areaPoints}
          fill={`url(#${chartId}-area-gradient)`}
          className="oj-trend-rate-area"
        />

        {activeX != null ? (
          <line
            x1={activeX}
            y1={TREND_PLOT_TOP}
            x2={activeX}
            y2={TREND_PLOT_BOTTOM}
            className="oj-trend-active-guide"
          />
        ) : null}

        {points.map((p, index) => {
          const x = xCenter(index);
          const x0 = x - barW / 2;
          let currentY = TREND_PLOT_BOTTOM;
          const rects =
            mode === 'common'
              ? (p.issueTypeCounts || []).map((item) => {
                  const h = (Math.max(0, item.count) / yMax) * plotH;
                  if (h <= 0) return null;
                  currentY -= h;
                  return (
                    <rect
                      key={`${item.issueType}-${index}`}
                      x={x0}
                      y={currentY}
                      width={barW}
                      height={h}
                      fill={getIssueTypeMarkerColor(item.issueType)}
                      rx={0}
                      className={`oj-trend-bar ${
                        activeIndex != null && activeIndex !== index
                          ? 'oj-trend-bar-muted'
                          : ''
                      }`.trim()}
                    />
                  );
                })
              : OJ_TREND_SEVERITY_SEGMENTS.map(({ key, markerColor }) => {
                  const value = getTrendSeverityValue(p, key);
                  const h = (Math.max(0, value) / yMax) * plotH;
                  if (h <= 0) return null;
                  currentY -= h;
                  return (
                    <rect
                      key={`${key}-${index}`}
                      x={x0}
                      y={currentY}
                      width={barW}
                      height={h}
                      fill={markerColor}
                      rx={0}
                      className={`oj-trend-bar ${
                        activeIndex != null && activeIndex !== index
                          ? 'oj-trend-bar-muted'
                          : ''
                      }`.trim()}
                    />
                  );
                });

          return (
            <g key={`b-${index}`}>
              {rects}
              {showTotalLabel[index] ? (
                <text
                  className="oj-trend-val"
                  x={x}
                  y={totalLabelYs[index]}
                  textAnchor="middle"
                >
                  {p.total}
                </text>
              ) : null}
            </g>
          );
        })}

        <polyline
          points={polylinePoints}
          fill="none"
          stroke={`url(#${chartId}-line-gradient)`}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="oj-trend-line-path"
        />

        {points.map((p, index) => {
          const x = xCenter(index);
          const y = ratePointYs[index];
          const shouldLabel = showRateLabel[index];
          const isActive = activeIndex === index;
          return (
            <g key={`p-${index}`}>
              {isActive ? (
                <circle
                  cx={x}
                  cy={y}
                  r={8}
                  className="oj-trend-point-active-halo"
                />
              ) : null}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 4.5 : 2.5}
                className="oj-trend-point-core"
              />
              {shouldLabel ? (
                <text
                  className="oj-trend-val oj-trend-val-green"
                  x={x}
                  y={rateLabelYs[index]}
                  textAnchor="middle"
                >
                  {formatPercent(p.closeRate)}
                </text>
              ) : null}
            </g>
          );
        })}

        {points.map((p, index) => (
          <text
            key={`x-${index}`}
            className="oj-trend-axis"
            x={xCenter(index)}
            y={182}
            textAnchor="middle"
          >
            {p.label}
          </text>
        ))}

        {points.map((_, index) => (
          <rect
            key={`hover-${index}`}
            x={TREND_PLOT_LEFT + step * index}
            y={TREND_PLOT_TOP}
            width={step}
            height={plotH}
            className="oj-trend-hover-zone"
            onMouseEnter={() => handleActivate(index)}
            onMouseMove={() => handleActivate(index)}
          />
        ))}
      </svg>
      {activePoint ? (
        <div
          className="oj-trend-tooltip"
          style={{
            left: tooltipPos.left,
            top: tooltipPos.top,
          }}
        >
          <div className="oj-trend-tooltip-header">
            <span>{activePoint.label}</span>
            <span>{formatTrendRange(activePoint)}</span>
          </div>
          <div className="oj-trend-tooltip-list">
            {mode === 'common'
              ? (activePoint.issueTypeCounts || [])
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div className="oj-trend-tooltip-item" key={item.issueType}>
                      <span className="oj-trend-tooltip-key">
                        <i
                          className="oj-trend-tooltip-marker"
                          style={{
                            background: getIssueTypeMarkerColor(item.issueType),
                          }}
                        />
                        {item.issueType}
                      </span>
                      <span className="oj-trend-tooltip-value">
                        {item.count}
                      </span>
                    </div>
                  ))
              : OJ_TREND_SEVERITY_SEGMENTS.slice()
                  .reverse()
                  .map(({ key, label, markerColor }) => (
                    <div className="oj-trend-tooltip-item" key={key}>
                      <span className="oj-trend-tooltip-key">
                        <i
                          className="oj-trend-tooltip-marker"
                          style={{ background: markerColor }}
                        />
                        {label}
                      </span>
                      <span className="oj-trend-tooltip-value">
                        {getTrendSeverityValue(activePoint, key)}
                      </span>
                    </div>
                  ))}
            <div className="oj-trend-tooltip-item">
              <span className="oj-trend-tooltip-key">
                <i className="oj-trend-tooltip-line-marker" />
                周度闭环率
              </span>
              <span className="oj-trend-tooltip-value">
                {formatPercent(activePoint.closeRate)}
              </span>
            </div>
            <div className="oj-trend-tooltip-item oj-trend-tooltip-item-total">
              <span className="oj-trend-tooltip-key">总问题数</span>
              <span className="oj-trend-tooltip-value">
                {activePoint.total}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const COMMON_ISSUE_LIST_MAX = 4;

const getSeverityShort = (severity: string): string => {
  const match = /^P\d/.exec(severity);
  return match ? match[0] : severity;
};

const stripSeverityPrefix = (label: string, prefix: string) => {
  if (!label) return '';
  if (!prefix) return label;
  return label.startsWith(prefix) ? label.slice(prefix.length) : label;
};

const getSeverityDisplay = (severity: string): string => {
  const raw = String(severity || '').trim();
  if (!raw) return '--';

  const normalizedKey = normalizeSeverity(raw) || raw;

  const matchedPriority = PRIORITY_LEVELS.find(
    (item) => item.key === normalizedKey
  );
  if (matchedPriority) {
    const zhPart = stripSeverityPrefix(
      String(matchedPriority.label || '').trim(),
      matchedPriority.shortLabel
    ).trim();
    return [matchedPriority.shortLabel, zhPart].filter(Boolean).join(' ');
  }

  const cfgLabel = String(
    (SEVERITY_CFG as Record<string, any>)[normalizedKey]?.label || ''
  ).trim();
  const short = getSeverityShort(normalizedKey);
  const zhPart = stripSeverityPrefix(cfgLabel, short).trim();
  return [short, zhPart].filter(Boolean).join(' ') || raw;
};

const getSeverityTagStyle = (severity: string) => {
  const normalizedKey = normalizeSeverity(severity) || severity;
  const cfg = (SEVERITY_CFG as Record<string, any>)[normalizedKey];
  if (cfg) {
    return {
      color: cfg.tagColor as string,
      background: cfg.tagBg as string,
      borderColor: cfg.tagBorder as string,
    };
  }
  return {
    color: '#475569',
    background: '#f8fafc',
    borderColor: '#e2e8f0',
  };
};

const OverviewSummaryBlock: React.FC<OverviewSummaryBlockProps> = ({
  title,
  summary,
  trend,
  trendWindow,
  issues = [],
  commonIssues = [],
  mode = 'overall',
  tooltip,
  onTrendWindowChange,
  onBucketClick,
  onPriorityBucketClick,
}) => {
  const priorityProgress = React.useMemo(
    () => buildPriorityProgress(issues),
    [issues]
  );
  const visiblePriorityProgress = priorityProgress;
  const shouldShowCommonList = mode === 'common' && commonIssues.length > 0;
  const commonIssueRows = React.useMemo(
    () => commonIssues.slice(0, COMMON_ISSUE_LIST_MAX),
    [commonIssues]
  );

  const renderValue = (
    bucket: 'total' | 'pending' | 'inProgress' | 'resolved',
    value: number,
    className = ''
  ) => {
    const clickableProps: React.HTMLAttributes<HTMLDivElement> | undefined =
      onBucketClick
        ? {
            role: 'button',
            tabIndex: 0,
            onClick: () => onBucketClick(bucket),
            onKeyDown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onBucketClick(bucket);
              }
            },
          }
        : undefined;

    return (
      <div
        className={`ov-value ${
          onBucketClick ? 'ov-value-link' : ''
        } ${className}`.trim()}
        {...clickableProps}
      >
        {value}
      </div>
    );
  };

  const renderMetric = (
    label: string,
    bucket: 'total' | 'pending' | 'inProgress' | 'resolved' | 'closeRate',
    value: React.ReactNode,
    className = ''
  ) => (
    <div className="ov-item">
      <div className="ov-label">{label}</div>
      {bucket === 'closeRate' ? (
        <div className={`ov-value ${className}`.trim()}>{value}</div>
      ) : (
        renderValue(bucket, value as number, className)
      )}
    </div>
  );

  return (
    <div className="overview-block">
      <div className="ov-title">
        {typeof title === 'string' ? <span>{title}</span> : title}
      </div>
      <div className="ov-row">
        {renderMetric(
          mode === 'common' ? '总问题数（去重后）' : '总问题数',
          'total',
          summary.total
        )}
        {renderMetric('待处理', 'pending', summary.pending, 'ov-value-pending')}
        {renderMetric(
          '进行中',
          'inProgress',
          summary.inProgress,
          'ov-value-blue'
        )}
        {renderMetric('已闭环', 'resolved', summary.resolved, 'ov-value-green')}
        {renderMetric('闭环率', 'closeRate', formatPercent(summary.closeRate))}
      </div>
      {visiblePriorityProgress.length || (trend && trend.length) ? (
        <div className="overview-insight-grid">
          <div className="ov-panel ov-priority-panel">
            <div className="ov-panel-head">
              <div className="ov-panel-title">
                {shouldShowCommonList ? '共性问题清单' : '各优先级闭环进展'}
              </div>
            </div>
            {shouldShowCommonList ? (
              <div
                className="ov-ci-list"
                style={{
                  gridTemplateRows: `repeat(${Math.max(
                    1,
                    commonIssueRows.length
                  )}, minmax(0, 1fr))`,
                }}
              >
                {commonIssueRows.map((group) => {
                  const statusCfg = (STATUS_CFG as Record<string, any>)[
                    group.status
                  ];
                  return (
                    <div className="ov-ci-row" key={group.key}>
                      <div className="ov-ci-head">
                        <span
                          className="ov-ci-type"
                          style={getIssueTypeTagStyle(group.issueType)}
                          title={group.issueType}
                        >
                          {group.issueType}
                        </span>
                        <div className="ov-ci-desc">{group.description}</div>
                        <span className="ov-ci-repo">{group.repoCount} 仓</span>
                      </div>
                      {(group.journeyStages ?? []).length ? (
                        <div className="ov-ci-meta">
                          <span className="ov-ci-meta-key">涉及阶段</span>
                          <span className="ov-ci-stage-wrap">
                            {(group.journeyStages ?? []).map((stage) => (
                              <span className="ov-ci-stage-tag" key={stage}>
                                {stage}
                              </span>
                            ))}
                          </span>
                        </div>
                      ) : null}
                      <div className="ov-ci-meta">
                        <span className="ov-ci-meta-key">严重程度</span>
                        <span className="flex flex-wrap gap-1">
                          {(group.severities?.length
                            ? group.severities
                            : [group.severity]
                          )
                            .filter((sev) => String(sev || '').trim())
                            .map((sev) => (
                              <span
                                key={String(sev)}
                                className="ov-ci-sev"
                                style={getSeverityTagStyle(String(sev))}
                              >
                                {getSeverityDisplay(String(sev))}
                              </span>
                            ))}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="ov-priority-list">
                {visiblePriorityProgress.map((item) => (
                  <div className="ov-priority-row" key={item.key}>
                    <div className="ov-priority-main">
                      <div className="ov-priority-header">
                        <span
                          className="ov-priority-tag"
                          style={{
                            color: item.tagColor,
                            background: item.tagBg,
                            borderColor: item.tagBorder,
                          }}
                        >
                          {item.shortLabel} {item.label}
                        </span>
                        <Tooltip title={item.description}>
                          <span className="ov-priority-desc">
                            {item.description}
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="ov-priority-side">
                      <div className="ov-priority-bar-box">
                        <ProgressBarOnly
                          pending={item.pending}
                          inProgress={item.inProgress}
                          resolved={item.resolved}
                        />
                      </div>
                      <div className="ov-priority-meta-box">
                        <ProgressMetaOnly
                          pending={item.pending}
                          inProgress={item.inProgress}
                          resolved={item.resolved}
                          onBucketClick={(bucket) =>
                            onPriorityBucketClick?.(item.key, bucket)
                          }
                        />
                        <div className="ov-priority-stats">
                          <span
                            className={`ov-priority-total ${
                              onPriorityBucketClick
                                ? 'ov-priority-clickable'
                                : ''
                            }`}
                            onClick={() =>
                              onPriorityBucketClick?.(item.key, 'total')
                            }
                          >
                            总 {item.total}
                          </span>
                          <span className="ov-priority-rate">
                            闭环率 {item.closeRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {trend && trend.length ? (
            <div className="ov-panel ov-trend-panel">
              <div className="ov-panel-head">
                <div className="ov-panel-title">周度新增问题及闭环趋势</div>
                {trendWindow && onTrendWindowChange ? (
                  <TrendWindowPicker
                    value={trendWindow}
                    onChange={onTrendWindowChange}
                  />
                ) : null}
              </div>
              <TrendChart points={trend} mode={mode} />
              <div className="oj-trend-legend">
                {mode === 'common'
                  ? (() => {
                      const allIssueTypes = Array.from(
                        new Set(
                          trend.flatMap(
                            (p) =>
                              p.issueTypeCounts?.map(
                                (item) => item.issueType
                              ) || []
                          )
                        )
                      );
                      return allIssueTypes
                        .slice()
                        .reverse()
                        .map((issueType) => (
                          <span
                            className="oj-trend-legend-item"
                            key={issueType}
                          >
                            <i
                              className="oj-trend-dot"
                              style={{
                                background: getIssueTypeMarkerColor(issueType),
                              }}
                            />
                            {issueType}
                          </span>
                        ));
                    })()
                  : OJ_TREND_SEVERITY_SEGMENTS.slice()
                      .reverse()
                      .map(({ key, label, markerColor }) => (
                        <span className="oj-trend-legend-item" key={key}>
                          <i
                            className="oj-trend-dot"
                            style={{ background: markerColor }}
                          />
                          {label}
                        </span>
                      ))}
                <span className="oj-trend-legend-item">
                  <span className="oj-trend-line" />
                  周度闭环率
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default OverviewSummaryBlock;
