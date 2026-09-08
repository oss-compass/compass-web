import React from 'react';
import { Segmented, Table, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import {
  TrendChart,
  TrendWindowPicker,
} from '../../../../UserJourney/OverviewDashboard/OverviewSummaryBlock';
import type {
  TrendWindow,
  WeeklyCloseRateTrendPoint,
} from '../../../../UserJourney/OverviewDashboard/types';
import { getMetricCategory } from '../../metricDefinitions';
import type { IssueOverviewRepo, IssueOverviewTopPain } from '../../types';
import IssuePainDetailModal from './IssuePainDetailModal';
import IssuePriorityTag, { getIssuePriorityLabel } from './IssuePriorityTag';
import IssueTrendSparkline from './IssueTrendSparkline';

type ProgressBucket = 'pending' | 'inProgress' | 'resolved';

type Props = {
  pains: IssueOverviewTopPain[];
  repos: IssueOverviewRepo[];
  reportHref: (
    community: string,
    period?: string,
    stageId?: string,
    painId?: string
  ) => string;
};

const PRIORITIES = [
  {
    key: 'P0',
    color: '#d14343',
  },
  {
    key: 'P1',
    color: '#f4840c',
  },
  {
    key: 'P2',
    color: '#4791ff',
  },
  {
    key: 'P3',
    color: '#94a3b8',
  },
] as const;

const PROGRESS_STATES = [
  { key: 'pending', label: '待处理', fill: '#f4840c', color: '#ffffff' },
  { key: 'inProgress', label: '进行中', fill: '#4791ff', color: '#ffffff' },
  { key: 'resolved', label: '已闭环', fill: '#2eb78a', color: '#ffffff' },
] as const;

const progressBucket = (pain: IssueOverviewTopPain): ProgressBucket => {
  if (pain.trackingStatus === 5) return 'resolved';
  if ([2, 3, 7].includes(Number(pain.trackingStatus))) return 'inProgress';
  const state = String(pain.state || '').toLowerCase();
  if (/已闭环|已完成|已解决|closed|resolved/.test(state)) return 'resolved';
  if (/进行中|处理中|修复中|in progress/.test(state)) return 'inProgress';
  return 'pending';
};

const progressCounts = (pains: IssueOverviewTopPain[]) => ({
  pending: pains.filter((pain) => progressBucket(pain) === 'pending').length,
  inProgress: pains.filter((pain) => progressBucket(pain) === 'inProgress')
    .length,
  resolved: pains.filter((pain) => progressBucket(pain) === 'resolved').length,
});

export const IssuePainProgressOverview: React.FC<Props> = ({
  pains,
  repos,
  reportHref,
}) => {
  const [detail, setDetail] = React.useState<{
    title: string;
    pains: IssueOverviewTopPain[];
  } | null>(null);
  const [trendWindow, setTrendWindow] = React.useState<TrendWindow>({
    kind: 'weeks',
    weeks: 7,
  });
  const counts = progressCounts(pains);
  const total = pains.length;
  const closeRate = total ? (counts.resolved / total) * 100 : 0;
  const allPeriods = React.useMemo(
    () => Array.from(new Set(pains.map((pain) => pain.period))).sort(),
    [pains]
  );
  const periods = React.useMemo(() => {
    if (trendWindow.kind === 'weeks') {
      return allPeriods.slice(-trendWindow.weeks);
    }
    return allPeriods.filter((period) => {
      const [start, end = start] = period.split('_to_');
      return start <= trendWindow.end && end >= trendWindow.start;
    });
  }, [allPeriods, trendWindow]);
  const trendPoints = React.useMemo<WeeklyCloseRateTrendPoint[]>(
    () =>
      periods.map((period) => {
        const periodPains = pains.filter((pain) => pain.period === period);
        const priorityCount = (priority: string) =>
          periodPains.filter((pain) => pain.prio === priority).length;
        const resolved = periodPains.filter(
          (pain) => progressBucket(pain) === 'resolved'
        ).length;
        const [weekStart, weekEnd = weekStart] = period.split('_to_');
        return {
          weekStart,
          weekEnd,
          label: weekEnd?.slice(5) || period,
          total: periodPains.length,
          p0: priorityCount('P0'),
          p1: priorityCount('P1'),
          p2: priorityCount('P2'),
          p3: priorityCount('P3'),
          closeRate: periodPains.length
            ? (resolved / periodPains.length) * 100
            : 0,
        };
      }),
    [pains, periods]
  );
  const cards = [
    {
      label: '问题总数',
      value: total,
      bucket: undefined,
      valueClassName: '',
      clickable: true,
    },
    {
      label: '待处理',
      value: counts.pending,
      bucket: 'pending' as const,
      valueClassName: 'ov-value-pending',
      clickable: true,
    },
    {
      label: '进行中',
      value: counts.inProgress,
      bucket: 'inProgress' as const,
      valueClassName: 'ov-value-blue',
      clickable: true,
    },
    {
      label: '已闭环',
      value: counts.resolved,
      bucket: 'resolved' as const,
      valueClassName: 'ov-value-green',
      clickable: true,
    },
    {
      label: '闭环率',
      value: `${closeRate.toFixed(1)}%`,
      bucket: 'resolved' as const,
      valueClassName: '',
      clickable: false,
    },
  ];

  return (
    <div className="section-card pain-progress-reference">
      <div className="mb-3 text-[16px] font-extrabold leading-6 text-slate-900">
        痛点问题进展及趋势
      </div>
      <div className="ov-row">
        {cards.map((card) => {
          const selected = card.bucket
            ? pains.filter((pain) => progressBucket(pain) === card.bucket)
            : pains;
          const openDetail = () =>
            setDetail({ title: card.label, pains: selected });
          return (
            <div key={card.label} className="ov-item">
              <div className="ov-label">{card.label}</div>
              <div
                className={`ov-value ${card.valueClassName} ${
                  card.clickable ? 'ov-value-link' : ''
                }`.trim()}
                role={card.clickable ? 'button' : undefined}
                tabIndex={card.clickable ? 0 : undefined}
                onClick={card.clickable ? openDetail : undefined}
                onKeyDown={
                  card.clickable
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          openDetail();
                        }
                      }
                    : undefined
                }
              >
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pain-duo">
        <section className="pain-panel pain-priorities">
          <h4 className="pain-mini">各优先级问题闭环进展</h4>
          <div className="pain-priority-list">
            {PRIORITIES.map((priority) => {
              const priorityPains = pains.filter(
                (pain) => pain.prio === priority.key
              );
              const priorityCounts = progressCounts(priorityPains);
              const priorityRate = priorityPains.length
                ? (priorityCounts.resolved / priorityPains.length) * 100
                : 0;
              return (
                <div key={priority.key} className="pain-priority-row">
                  <button
                    type="button"
                    className="pain-priority-label"
                    title={`查看 ${getIssuePriorityLabel(priority.key)} 痛点`}
                    onClick={() =>
                      setDetail({
                        title: getIssuePriorityLabel(priority.key),
                        pains: priorityPains,
                      })
                    }
                  >
                    <i style={{ background: priority.color }} />
                    {getIssuePriorityLabel(priority.key)}
                  </button>
                  <div className="pain-status-bar">
                    {PROGRESS_STATES.map((state) => {
                      const value = priorityCounts[state.key];
                      return value > 0 ? (
                        <button
                          key={state.key}
                          type="button"
                          title={`${getIssuePriorityLabel(priority.key)} · ${
                            state.label
                          }：${value} 个`}
                          style={{
                            width: `${(value / priorityPains.length) * 100}%`,
                            background: state.fill,
                            color: state.color,
                          }}
                          onClick={() =>
                            setDetail({
                              title: `${getIssuePriorityLabel(
                                priority.key
                              )} · ${state.label}`,
                              pains: priorityPains.filter(
                                (pain) => progressBucket(pain) === state.key
                              ),
                            })
                          }
                        >
                          {value}
                        </button>
                      ) : null;
                    })}
                  </div>
                  <span
                    className="pain-priority-rate"
                    style={{
                      color: priorityCounts.resolved ? '#12a57b' : '#98a2b3',
                    }}
                  >
                    {priorityRate.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
          <div className="pain-legend">
            {PROGRESS_STATES.map((state) => (
              <span key={state.key}>
                <i style={{ background: state.fill }} />
                {state.label}
              </span>
            ))}
          </div>
        </section>

        <section className="pain-panel pain-weekly">
          <div className="ov-panel-head">
            <div className="ov-panel-title">周问题新增趋势及闭环率</div>
            <TrendWindowPicker value={trendWindow} onChange={setTrendWindow} />
          </div>
          {trendPoints.length ? (
            <>
              <div className="pain-trend-chart">
                <TrendChart points={trendPoints} fitContainerHeight />
              </div>
              <div className="oj-trend-legend">
                {PRIORITIES.map((priority) => (
                  <span className="oj-trend-legend-item" key={priority.key}>
                    <i
                      className="oj-trend-dot"
                      style={{ background: priority.color }}
                    />
                    {getIssuePriorityLabel(priority.key)}
                  </span>
                ))}
                <span className="oj-trend-legend-item">
                  <span className="oj-trend-line" />
                  周度闭环率
                </span>
              </div>
            </>
          ) : (
            <div className="pain-trend-empty">所选时间范围暂无数据</div>
          )}
        </section>
      </div>

      <IssuePainDetailModal
        open={!!detail}
        onClose={() => setDetail(null)}
        loading={false}
        items={detail?.pains ?? []}
        repoTeams={Object.fromEntries(
          repos.map((repo) => [repo.repoShort, repo.teamName])
        )}
        reportHref={reportHref}
        title={detail?.title ?? '痛点详情'}
      />
      <style jsx>{`
        .pain-progress-reference {
          container-type: inline-size;
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
          border: 1px solid rgba(226, 232, 240, 0.92);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }
        .pain-mini {
          font-size: 15px;
          line-height: 22px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #0f172a;
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
          color: #64748b;
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
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          overflow: hidden;
          background: #f8fafc;
        }
        .pain-status-bar button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          overflow: hidden;
          border-right: 1px solid rgba(255, 255, 255, 0.6);
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
          color: #64748b;
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
          color: #94a3b8;
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
};

type FrequentPain = {
  key: string;
  title: string;
  stageName: string;
  metrics: Array<{
    label: string;
    category: 'efficiency' | 'quality';
  }>;
  prio: string;
  repoCount: number;
  total: number;
  open: number;
  done: number;
  trend: number[];
  openTrend: number[];
  doneTrend: number[];
  trendPeriods: string[];
  items: IssueOverviewTopPain[];
};

const priorityRank = (priority: string) => {
  const rank = Number(String(priority).match(/P([0-3])/)?.[1]);
  return Number.isFinite(rank) ? rank : 4;
};

const buildFrequentPains = (pains: IssueOverviewTopPain[]): FrequentPain[] => {
  const periods = Array.from(new Set(pains.map((pain) => pain.period))).sort();
  const groups = new Map<string, IssueOverviewTopPain[]>();
  pains.forEach((pain) => {
    const metricKey = [...(pain.metricCodes ?? [])].sort().join('+');
    // 高频问题按“阶段 + 指标”归并，避免不同仓库的描述措辞差异拆散同类问题。
    const key = `${pain.stageId || pain.stageName}#${metricKey}`;
    groups.set(key, [...(groups.get(key) ?? []), pain]);
  });
  return Array.from(groups.entries()).map(([key, items]) => {
    const issueCount = (item: IssueOverviewTopPain) =>
      Math.max(item.lowScoreIssues?.length ?? 0, 1);
    const done = items
      .filter((item) => progressBucket(item) === 'resolved')
      .reduce((sum, item) => sum + issueCount(item), 0);
    const open = items
      .filter((item) => progressBucket(item) !== 'resolved')
      .reduce((sum, item) => sum + issueCount(item), 0);
    return {
      key,
      title: items[0]?.title || '-',
      stageName: items[0]?.stageName || '-',
      metrics: Array.from(
        new Map(
          items.flatMap((item) =>
            (item.metricLabels ?? []).map((label, index) => {
              const category = getMetricCategory(
                item.metricCodes?.[index] ?? ''
              );
              return [`${label}#${category}`, { label, category }] as const;
            })
          )
        ).values()
      ),
      prio: [...items].sort(
        (a, b) => priorityRank(a.prio) - priorityRank(b.prio)
      )[0]?.prio,
      repoCount: new Set(items.map((item) => item.community)).size,
      total: items.reduce(
        (sum, item) => sum + Math.max(item.lowScoreIssues?.length ?? 0, 1),
        0
      ),
      open,
      done,
      trend: periods.map((period) =>
        items
          .filter((item) => item.period === period)
          .reduce((sum, item) => sum + issueCount(item), 0)
      ),
      openTrend: periods.map((period) =>
        items
          .filter(
            (item) =>
              item.period === period && progressBucket(item) !== 'resolved'
          )
          .reduce((sum, item) => sum + issueCount(item), 0)
      ),
      doneTrend: periods.map((period) =>
        items
          .filter(
            (item) =>
              item.period === period && progressBucket(item) === 'resolved'
          )
          .reduce((sum, item) => sum + issueCount(item), 0)
      ),
      trendPeriods: periods,
      items,
    };
  });
};

export const IssueFrequentPainSection: React.FC<
  Pick<Props, 'pains' | 'repos' | 'reportHref'>
> = ({ pains, repos, reportHref }) => {
  const [view, setView] = React.useState<'all' | 'open' | 'done'>('all');
  const [detail, setDetail] = React.useState<FrequentPain | null>(null);
  const groups = React.useMemo(() => buildFrequentPains(pains), [pains]);
  const rows = [...groups]
    .filter(
      (item) => view === 'all' || (view === 'open' ? item.open : item.done) > 0
    )
    .sort((left, right) => {
      const leftValue =
        view === 'open'
          ? left.open
          : view === 'done'
          ? left.done
          : left.repoCount;
      const rightValue =
        view === 'open'
          ? right.open
          : view === 'done'
          ? right.done
          : right.repoCount;
      return rightValue - leftValue;
    })
    .slice(0, 5);
  const columns: TableProps<FrequentPain>['columns'] = [
    {
      title: '序号',
      width: 64,
      align: 'center',
      render: (_value, _record, index) => (
        <span className="row-num">{index + 1}</span>
      ),
    },
    {
      title: '问题',
      dataIndex: 'title',
      ellipsis: true,
      render: (value: string) => (
        <Tooltip title={value} placement="topLeft">
          <span className="font-semibold text-slate-700">{value}</span>
        </Tooltip>
      ),
    },
    { title: '阶段', dataIndex: 'stageName', width: 130 },
    {
      title: '指标',
      dataIndex: 'metrics',
      width: 230,
      align: 'center',
      render: (value: FrequentPain['metrics']) =>
        value.length ? (
          <div className="flex flex-wrap justify-center gap-1.5">
            {value.map((metric) => (
              <span
                key={`${metric.label}-${metric.category}`}
                className="inline-flex min-w-0 items-center gap-1.5"
              >
                <Tooltip title={metric.label}>
                  <span className="max-w-[132px] truncate text-slate-700">
                    {metric.label}
                  </span>
                </Tooltip>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    metric.category === 'efficiency'
                      ? 'bg-sky-50 text-sky-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {metric.category === 'efficiency' ? '效率' : '质量'}
                </span>
              </span>
            ))}
          </div>
        ) : (
          '-'
        ),
    },
    {
      title: '优先级',
      dataIndex: 'prio',
      width: 92,
      render: (value: string) => <IssuePriorityTag priority={value} />,
    },
    {
      title: '覆盖仓数',
      dataIndex: 'repoCount',
      width: 100,
      align: 'right',
      sorter: (left, right) => left.repoCount - right.repoCount,
    },
    {
      title:
        view === 'open'
          ? '未闭环涉及 Issue 数'
          : view === 'done'
          ? '已闭环涉及 Issue 数'
          : '涉及 Issue 数',
      width: 156,
      align: 'center',
      sorter: (left, right) => {
        const countOf = (record: FrequentPain) =>
          view === 'open'
            ? record.open
            : view === 'done'
            ? record.done
            : record.total;
        return countOf(left) - countOf(right);
      },
      render: (_value, record) => {
        const count =
          view === 'open'
            ? record.open
            : view === 'done'
            ? record.done
            : record.total;
        const issueTrend =
          view === 'open'
            ? record.openTrend
            : view === 'done'
            ? record.doneTrend
            : record.trend;
        const trendLabel =
          view === 'open' ? '未闭环' : view === 'done' ? '已闭环' : '全部';
        return (
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              className="overview-table-link overview-table-link-strong min-w-[24px] text-right"
              onClick={() =>
                setDetail({
                  ...record,
                  items:
                    view === 'all'
                      ? record.items
                      : record.items.filter((item) =>
                          view === 'done'
                            ? progressBucket(item) === 'resolved'
                            : progressBucket(item) !== 'resolved'
                        ),
                })
              }
            >
              {count}
            </button>
            <IssueTrendSparkline
              trend={{
                title: `${record.title} · ${trendLabel}涉及 Issue 数量趋势`,
                subtitle: '各周期涉及 Issue 数 · 时间升序',
                values: issueTrend,
                labels: record.trendPeriods.map((period) =>
                  (period.split('_to_')[1] ?? period.split('_to_')[0]).slice(5)
                ),
              }}
              width={38}
              height={22}
              maxValue={Math.max(1, ...issueTrend)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="section-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[16px] font-extrabold leading-6 text-slate-900">
            高频问题 TOP5
          </div>
          <Segmented
            className="overview-segmented"
            value={view}
            options={[
              { label: '全部', value: 'all' },
              { label: '未闭环', value: 'open' },
              { label: '已闭环', value: 'done' },
            ]}
            onChange={(value) => setView(value as typeof view)}
          />
        </div>
        <Table
          className="overview-ant-table"
          rowKey="key"
          columns={columns}
          dataSource={rows}
          pagination={false}
          scroll={{ x: 970 }}
          locale={{ emptyText: '暂无匹配问题' }}
        />
      </div>
      <IssuePainDetailModal
        open={!!detail}
        onClose={() => setDetail(null)}
        loading={false}
        items={detail?.items ?? []}
        repoTeams={Object.fromEntries(
          repos.map((repo) => [repo.repoShort, repo.teamName])
        )}
        reportHref={reportHref}
        title={detail?.title ?? '问题详情'}
      />
    </>
  );
};
