import React from 'react';
import Link from 'next/link';
import { Select } from 'antd';
import type {
  CiRepoCompare,
  CiRepoCompareMetric,
  CiRepoCompareSeries,
} from './communityMetrics';

/** 每张折线图最多同时对比的仓库数（当前共 4 仓，后续新增后由 Select 控制） */
const MAX_REPOS = 4;

/** Select 高度与样式对齐社区入门（RepoProgressSection）的筛选器 */
const FILTER_SELECT_H = 32;
const FILTER_SELECT_CLS =
  '[&_.ant-select-arrow]:text-slate-500 [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!text-slate-900 [&_.ant-select-selector]:!rounded-r-2xl [&_.ant-select-selector]:!rounded-l-none [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-l-0 [&_.ant-select-selector]:!border-slate-200/80 [&_.ant-select-selector]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center';

/** 仓库折线配色（按 repoCompare.repos 顺序固定分配，选择增删不影响既有仓颜色） */
const REPO_COLORS = [
  '#1677ff',
  '#19a796',
  '#e0962b',
  '#7c4dd6',
  '#d03b3b',
  '#0f9e9e',
];

const W = 860;
const H = 190;
const PAD_L = 40;
const PAD_R = 16;
const PAD_T = 12;
const PAD_B = 26;

/** 'YYYY-MM-DD' / 'MM-DD' → 'MM-DD' */
const shortDay = (d: string) => (d.length > 5 ? d.slice(5) : d);

const fmtV = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

const lastValid = (values: (number | null)[]): number | null => {
  for (let i = values.length - 1; i >= 0; i--) {
    const v = values[i];
    if (v != null && Number.isFinite(v)) return v;
  }
  return null;
};

type CompareLineChartProps = {
  days: string[];
  series: Array<CiRepoCompareSeries & { color: string }>;
  unit: string;
};

/**
 * 单指标多仓折线图（纯 SVG，观感照搬社区入门 oj-trend 趋势图：
 * 浅灰绘图区 + 虚线网格 + 细折线，悬浮出竖向引导线与 tooltip）。
 * viewBox 宽高按实际渲染尺寸设定，避免缩放后字体/线条发胖；
 * 每仓一条折线，缺测日直接跨日相连保持连续，末点常驻小圆点呼应图例最新值。
 */
const CompareLineChart: React.FC<CompareLineChartProps> = ({
  days,
  series,
  unit,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ left: 0, top: 0 });

  const n = days.length;
  // Y 轴固定 0-100（得分满分 100），避免动态刻度导致折线超出绘图区
  const lower = 0;
  const upper = 100;
  const stepV = 25;
  const range = upper - lower;

  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const step = n > 1 ? innerW / (n - 1) : 0;
  const xOf = (i: number) => PAD_L + step * i;
  const yOf = (v: number) =>
    PAD_T +
    innerH -
    ((Math.max(lower, Math.min(upper, v)) - lower) / range) * innerH;

  // Y 轴刻度（5 档整数，虚线网格）
  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const v = lower + stepV * i;
    return { v, y: yOf(v) };
  });

  // X 轴标签（最多 8 个，均匀取样，末位补齐）
  const xStep = Math.max(1, Math.ceil(n / 8));
  const xTicks: Array<{ i: number; label: string }> = [];
  for (let i = 0; i < n; i += xStep) {
    xTicks.push({ i, label: shortDay(days[i] ?? '') });
  }
  if (n > 1 && (n - 1) % xStep !== 0) {
    xTicks.push({ i: n - 1, label: shortDay(days[n - 1] ?? '') });
  }

  // 每仓折线：只取有值日相连，缺测日跨日连续（避免断线）
  const pointsOf = (values: (number | null)[]) => {
    const pts: Array<{ x: number; y: number }> = [];
    values.forEach((v, i) => {
      if (v == null || !Number.isFinite(v)) return;
      pts.push({ x: xOf(i), y: yOf(v) });
    });
    return pts;
  };
  const linePath = (pts: Array<{ x: number; y: number }>) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // 悬浮日：竖向引导线 + tooltip（对齐社区入门趋势图交互）
  const handleActivate = (idx: number) => {
    setActiveIndex(idx);
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ys = series
      .map((s) => s.values[idx])
      .filter((v): v is number => v != null && Number.isFinite(v))
      .map((v) => yOf(v));
    const topY = ys.length ? Math.min(...ys) : PAD_T;
    const half = 80;
    setTooltipPos({
      left: Math.min(
        Math.max((xOf(idx) / W) * rect.width, half),
        rect.width - half
      ),
      top: Math.max((topY / H) * rect.height - 8, 12),
    });
  };

  const activeX = activeIndex == null ? null : xOf(activeIndex);

  return (
    <div
      ref={wrapperRef}
      className="oj-trend-chart"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* 绘图区背景 */}
        <rect
          x={PAD_L}
          y={PAD_T}
          width={innerW}
          height={innerH}
          className="oj-trend-plot-bg"
        />

        {/* 虚线网格 + Y 轴刻度 */}
        {yTicks.map((t, i) => (
          <g key={`y-${i}`}>
            {i > 0 ? (
              <line
                x1={PAD_L}
                y1={t.y}
                x2={W - PAD_R}
                y2={t.y}
                className="oj-trend-grid"
              />
            ) : null}
            <text
              x={PAD_L - 8}
              y={t.y + 4}
              textAnchor="end"
              className="oj-trend-axis oj-trend-axis-y"
            >
              {fmtV(t.v)}
            </text>
          </g>
        ))}

        {/* 坐标轴（左 + 底） */}
        <line
          x1={PAD_L}
          y1={PAD_T}
          x2={PAD_L}
          y2={PAD_T + innerH}
          className="oj-trend-axis-line"
        />
        <line
          x1={PAD_L}
          y1={PAD_T + innerH}
          x2={W - PAD_R}
          y2={PAD_T + innerH}
          className="oj-trend-axis-line"
        />

        {/* X 轴标签 */}
        {xTicks.map((t, i) => (
          <text
            key={`x-${i}`}
            x={xOf(t.i)}
            y={H - PAD_B + 18}
            textAnchor="middle"
            className="oj-trend-axis"
          >
            {t.label}
          </text>
        ))}

        {/* 悬浮日竖向引导线 */}
        {activeX != null ? (
          <line
            x1={activeX}
            y1={PAD_T}
            x2={activeX}
            y2={PAD_T + innerH}
            stroke="rgba(100, 116, 139, 0.36)"
            strokeWidth={1}
            strokeDasharray="4 4"
            pointerEvents="none"
          />
        ) : null}

        {/* 多仓细折线（连续相连）+ 末点常驻小圆点 */}
        {series.map((s) => {
          const pts = pointsOf(s.values);
          if (!pts.length) return null;
          const end = pts[pts.length - 1];
          return (
            <g key={s.repo}>
              <path
                d={linePath(pts)}
                fill="none"
                stroke={s.color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={end.x}
                cy={end.y}
                r={2.5}
                fill="#fff"
                stroke={s.color}
                strokeWidth={1.5}
                pointerEvents="none"
              />
            </g>
          );
        })}

        {/* 悬浮日数据点（白芯 + 彩描边，平时隐藏保持画面干净） */}
        {activeIndex != null
          ? series.map((s) => {
              const v = s.values[activeIndex];
              return v == null || !Number.isFinite(v) ? null : (
                <circle
                  key={`pt-${s.repo}`}
                  cx={xOf(activeIndex)}
                  cy={yOf(v)}
                  r={3}
                  fill="#fff"
                  stroke={s.color}
                  strokeWidth={1.5}
                  pointerEvents="none"
                />
              );
            })
          : null}

        {/* 逐日悬浮热区 */}
        {days.map((d, idx) => (
          <rect
            key={`zone-${d}-${idx}`}
            x={n > 1 ? PAD_L + step * (idx - 0.5) : PAD_L}
            y={PAD_T}
            width={n > 1 ? step : innerW}
            height={innerH}
            className="oj-trend-hover-zone"
            onMouseEnter={() => handleActivate(idx)}
            onMouseMove={() => handleActivate(idx)}
          />
        ))}
      </svg>

      {activeIndex != null ? (
        <div
          className="oj-trend-tooltip"
          style={{ left: tooltipPos.left, top: tooltipPos.top }}
        >
          <div className="oj-trend-tooltip-header">
            <span>{days[activeIndex]}</span>
          </div>
          <div className="oj-trend-tooltip-list">
            {series.map((s) => {
              const v = s.values[activeIndex];
              return (
                <div className="oj-trend-tooltip-item" key={s.repo}>
                  <span className="oj-trend-tooltip-key">
                    <i
                      className="oj-trend-tooltip-marker"
                      style={{ background: s.color }}
                    />
                    {s.slug}
                  </span>
                  <span className="oj-trend-tooltip-value">
                    {v != null && Number.isFinite(v)
                      ? `${fmtV(v)}${unit}`
                      : '—'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

type RepoCompareTrendsProps = {
  compare: CiRepoCompare;
  /** 仓库 slug → CI 报告页链接（与总览其余模块共用同一路由拼接） */
  reportHref: (slug: string) => string;
};

/**
 * 各仓库对比 · 四项评分趋势折线（综合体验评分 / 稳定性 / 效率 / 交互体验）。
 * 仓库通过 Select 多选（最多 4 个，默认前 4 仓），四张图共用同一份选择；
 * 每张图一条指标、每仓一条折线，配色按仓库固定分配。
 */
const RepoCompareTrends: React.FC<RepoCompareTrendsProps> = ({
  compare,
  reportHref,
}) => {
  const [selected, setSelected] = React.useState<string[]>(() =>
    compare.repos.slice(0, MAX_REPOS).map((r) => r.slug)
  );

  // 配色按 repos 全量顺序固定，避免选择增删导致同仓换色
  const colorOf = React.useMemo(() => {
    const map: Record<string, string> = {};
    compare.repos.forEach((r, i) => {
      map[r.slug] = REPO_COLORS[i % REPO_COLORS.length];
    });
    return map;
  }, [compare.repos]);

  const metricSeries = (metric: CiRepoCompareMetric) =>
    metric.series
      .filter((s) => selected.includes(s.slug))
      .map((s) => ({ ...s, color: colorOf[s.slug] }));

  return (
    <>
      {/* 仓库选择 + 图例（仓库名即报告入口），选择器样式对齐社区入门筛选器 */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center">
          <span
            style={{
              height: FILTER_SELECT_H,
              lineHeight: `${FILTER_SELECT_H}px`,
            }}
            className="inline-flex items-center whitespace-nowrap rounded-l-2xl border border-r-0 border-slate-200/80 bg-slate-50 px-2.5 text-xs font-medium text-slate-500 shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
          >
            对比仓库
          </span>
          <Select
            mode="multiple"
            maxCount={MAX_REPOS}
            allowClear={false}
            maxTagCount="responsive"
            style={{ height: FILTER_SELECT_H, minWidth: 300 }}
            className={`${FILTER_SELECT_CLS} min-w-[300px]`}
            popupMatchSelectWidth={false}
            popupClassName="overview-select-dropdown"
            getPopupContainer={(node) => node.parentElement ?? node}
            placeholder={`选择对比仓库（最多 ${MAX_REPOS} 个）`}
            value={selected}
            onChange={setSelected}
            options={compare.repos.map((r) => ({
              value: r.slug,
              label: r.slug,
            }))}
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {selected.map((slug) => (
            <span
              key={slug}
              className="inline-flex items-center gap-1.5 text-[12px]"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: colorOf[slug] }}
              />
              <Link
                href={reportHref(slug)}
                title="查看该仓库最新报告"
                className="font-medium text-slate-600 underline-offset-[3px] transition-colors hover:text-[#1677ff] hover:underline"
              >
                {slug}
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* 四项评分趋势：一指标一图，2×2 网格 */}
      <div className="capability-overview-grid">
        {compare.metrics.map((metric) => {
          const series = metricSeries(metric);
          return (
            <div key={metric.key} className="capability-card">
              <div className="capability-card-title">
                <span>{metric.label}</span>
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {series.map((s) => {
                    const latest = lastValid(s.values);
                    return (
                      <span
                        key={s.repo}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold"
                        style={{ color: s.color }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: s.color }}
                        />
                        {s.slug} {latest != null ? fmtV(latest) : '—'}
                      </span>
                    );
                  })}
                </span>
              </div>
              {series.length ? (
                <CompareLineChart
                  days={compare.days}
                  series={series}
                  unit="分"
                />
              ) : (
                <div className="py-10 text-center text-[12px] text-slate-400">
                  请选择至少 1 个仓库查看趋势
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RepoCompareTrends;
