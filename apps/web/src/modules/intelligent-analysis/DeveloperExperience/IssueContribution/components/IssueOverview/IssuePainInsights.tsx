import OverviewPainProgress from '../../../../UserJourney/OverviewDashboard/OverviewPainProgress';
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
import type {
  IssueOverviewV2FrequentPain,
  IssueOverviewV2PainSummary,
} from '../../types';
import IssuePainDetailModal from './IssuePainDetailModal';
import IssuePriorityTag, { getIssuePriorityLabel } from './IssuePriorityTag';
import IssueTrendSparkline from './IssueTrendSparkline';
import { getWeeklyClosureData } from './weeklyClosure';
import { SEVERITY_CFG } from '../../../../UserJourney/OverviewDashboard/constants';
import {
  OVERVIEW_COLORS,
  OVERVIEW_STATUS_COLORS,
} from '../../../../UserJourney/OverviewDashboard/theme';

type ReportHref = (
  community: string,
  period?: string,
  stageId?: string,
  painId?: string
) => string;

type ProgressProps = {
  summary: IssueOverviewV2PainSummary;
  org?: string;
  reportHref: ReportHref;
};

const PRIORITIES = [
  {
    key: 'P0',
    color: SEVERITY_CFG.P0_BLOCKER.tagColor,
  },
  {
    key: 'P1',
    color: SEVERITY_CFG.P1_CRITICAL.tagColor,
  },
  {
    key: 'P2',
    color: SEVERITY_CFG.P2_MAJOR.tagColor,
  },
  {
    key: 'P3',
    color: SEVERITY_CFG.P3_MINOR.tagColor,
  },
] as const;

const PROGRESS_STATES = [
  {
    key: 'pending',
    label: '待处理',
    fill: OVERVIEW_STATUS_COLORS.pending.solidBg,
    color: OVERVIEW_COLORS.white,
  },
  {
    key: 'inProgress',
    label: '进行中',
    fill: OVERVIEW_STATUS_COLORS.inProgress.solidBg,
    color: OVERVIEW_COLORS.white,
  },
  {
    key: 'resolved',
    label: '已闭环',
    fill: OVERVIEW_STATUS_COLORS.resolved.solidBg,
    color: OVERVIEW_COLORS.white,
  },
] as const;

export const IssuePainProgressOverview: React.FC<ProgressProps> = ({
  summary,
  org,
  reportHref,
}) => {
  const [detail, setDetail] = React.useState<{
    title: string;
    state?: string;
    prio?: string;
  } | null>(null);
  const [trendWindow, setTrendWindow] = React.useState<TrendWindow>({
    kind: 'weeks',
    weeks: 7,
  });
  const counts = summary.counts;
  const total = summary.total;
  const closeRate = summary.closeRate;
  const allPeriods = React.useMemo(
    () => getWeeklyClosureData(summary).periods.map((point) => point.period),
    [summary]
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
  const trendPoints = React.useMemo<WeeklyCloseRateTrendPoint[]>(() => {
    const byPeriod = new Map(
      getWeeklyClosureData(summary).periods.map((point) => [
        point.period,
        point,
      ])
    );
    return periods.map((period) => {
      const point = byPeriod.get(period);
      const periodPriorities = point?.priorities ?? [];
      const priorityCount = (priority: string) =>
        periodPriorities.find((item) => item.priority === priority)?.total ?? 0;
      const [weekStart, weekEnd = weekStart] = period.split('_to_');
      return {
        weekStart,
        weekEnd,
        label: weekEnd?.slice(5) || period,
        total: point?.total ?? 0,
        p0: priorityCount('P0'),
        p1: priorityCount('P1'),
        p2: priorityCount('P2'),
        p3: priorityCount('P3'),
        closeRate: point?.closeRate ?? 0,
      };
    });
  }, [periods, summary]);
  const cards = [
    {
      label: '问题总数',
      value: total,
      state: undefined,
      valueClassName: '',
      clickable: true,
    },
    {
      label: '待处理',
      value: counts.pending ?? 0,
      state: 'pending' as const,
      valueClassName: 'ov-value-pending',
      clickable: true,
    },
    {
      label: '进行中',
      value: counts.inProgress ?? 0,
      state: 'inProgress' as const,
      valueClassName: 'ov-value-blue',
      clickable: true,
    },
    {
      label: '已闭环',
      value: counts.resolved ?? 0,
      state: 'resolved' as const,
      valueClassName: 'ov-value-green',
      clickable: true,
    },
    {
      label: '历史感知痛点（需关注）',
      value: counts.historical ?? 0,
      state: 'historical' as const,
      valueClassName: '',
      clickable: true,
    },
    {
      label: '闭环率',
      value: `${closeRate.toFixed(1)}%`,
      state: undefined,
      valueClassName: '',
      clickable: false,
    },
  ];

  return (
    <>
      <OverviewPainProgress
        cards={cards.map((card) => ({
          ...card,
          onClick: card.clickable
            ? () => setDetail({ title: card.label, state: card.state })
            : undefined,
        }))}
        priorities={PRIORITIES.map((priority) => {
          const summaryPriority = summary.priorities.find(
            (item) => item.priority === priority.key
          );
          const counts = summaryPriority?.counts ?? {};
          const total =
            (summaryPriority?.total ?? 0) - (counts.historical ?? 0);
          return {
            ...priority,
            label: getIssuePriorityLabel(priority.key),
            total,
            counts,
            rate: total ? ((counts.resolved ?? 0) / total) * 100 : 100,
          };
        })}
        states={PROGRESS_STATES}
        onOpen={(state, prio) =>
          setDetail({
            state,
            prio,
            title: [
              getIssuePriorityLabel(prio || ''),
              PROGRESS_STATES.find((item) => item.key === state)?.label,
            ]
              .filter(Boolean)
              .join(' · '),
          })
        }
        trendTitle="周度痛点趋势及闭环率"
        trendControls={
          <TrendWindowPicker value={trendWindow} onChange={setTrendWindow} />
        }
        trendContent={
          summary.periodsReady !== false && trendPoints.length > 0 ? (
            <TrendChart points={trendPoints} fitContainerHeight adaptiveAxes />
          ) : null
        }
        trendEmpty={
          summary.periodsReady === false
            ? '周度统计准备中，完成后将自动更新'
            : '所选时间范围暂无数据'
        }
        trendLegend={
          <>
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
          </>
        }
      />
      <IssuePainDetailModal
        open={!!detail}
        onClose={() => setDetail(null)}
        query={{ org, state: detail?.state, prio: detail?.prio }}
        stageOptions={summary.stageOptions}
        org={org}
        reportHref={reportHref}
        title={detail?.title ?? '痛点详情'}
      />
    </>
  );
};

type FrequentPain = IssueOverviewV2FrequentPain & {
  metrics: Array<{
    label: string;
    category: 'efficiency' | 'quality';
  }>;
};

type FrequentProps = {
  groups: IssueOverviewV2FrequentPain[];
  stageOptions: string[];
  org?: string;
  reportHref: ReportHref;
};

const mapFrequentPain = (group: IssueOverviewV2FrequentPain): FrequentPain => ({
  ...group,
  metrics: Array.from(
    new Map(
      (group.metricLabels ?? []).map((label, index) => {
        const category = getMetricCategory(group.metricCodes?.[index] ?? '');
        return [`${label}#${category}`, { label, category }] as const;
      })
    ).values()
  ),
});

export const IssueFrequentPainSection: React.FC<FrequentProps> = ({
  groups,
  stageOptions,
  org,
  reportHref,
}) => {
  const [view, setView] = React.useState<'all' | 'open' | 'done'>('all');
  const [detail, setDetail] = React.useState<{
    title: string;
    group: string;
    states?: string[];
  } | null>(null);
  const rows = groups
    .map(mapFrequentPain)
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
      width: '5%',
      align: 'center',
      render: (_value, _record, index) => (
        <span className="row-num">{index + 1}</span>
      ),
    },
    {
      title: '问题',
      dataIndex: 'title',
      width: '24%',
      align: 'center',
      ellipsis: true,
      render: (value: string) => (
        <Tooltip title={value} placement="topLeft">
          <span className="block truncate font-semibold text-[var(--overview-slateDark)]">
            {value}
          </span>
        </Tooltip>
      ),
    },
    { title: '阶段', dataIndex: 'stageName', width: '12%' },
    {
      title: '指标',
      dataIndex: 'metrics',
      width: '22%',
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
                  <span className="max-w-[132px] truncate text-[var(--overview-slateDark)]">
                    {metric.label}
                  </span>
                </Tooltip>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    metric.category === 'efficiency'
                      ? 'bg-[var(--overview-blueSoft)] text-[var(--overview-blue)]'
                      : 'bg-[var(--overview-greenSoft)] text-[var(--overview-green)]'
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
      width: '12%',
      render: (value: string) => <IssuePriorityTag priority={value} />,
    },
    {
      title: '覆盖仓数',
      dataIndex: 'repoCount',
      width: '10%',
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
      width: '15%',
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
                  title: record.title,
                  group: record.group,
                  states:
                    view === 'all'
                      ? undefined
                      : view === 'done'
                      ? ['resolved']
                      : ['pending', 'inProgress'],
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
                periods: record.trendPeriods,
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
          <div className="text-[16px] font-extrabold leading-6 text-[var(--overview-text)]">
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
          tableLayout="fixed"
          pagination={false}
          scroll={{ x: 970 }}
          locale={{ emptyText: '暂无匹配问题' }}
        />
      </div>
      <IssuePainDetailModal
        open={!!detail}
        onClose={() => setDetail(null)}
        query={{
          org,
          group: detail?.group,
          states: detail?.states,
        }}
        stageOptions={stageOptions}
        org={org}
        reportHref={reportHref}
        title={detail?.title ?? '问题详情'}
      />
    </>
  );
};
