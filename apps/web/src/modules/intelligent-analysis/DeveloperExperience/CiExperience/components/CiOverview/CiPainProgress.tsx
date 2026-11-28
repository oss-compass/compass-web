import React from 'react';
import { Button, Segmented, Tag } from 'antd';
import OverviewPainProgress from '../../../../UserJourney/OverviewDashboard/OverviewPainProgress';
import {
  TrendChart,
  TrendWindowPicker,
} from '../../../../UserJourney/OverviewDashboard/OverviewSummaryBlock';
import type { TrendWindow } from '../../../../UserJourney/OverviewDashboard/types';
import {
  getIssuePriorityLabel,
  ISSUE_PRIORITY_LEVELS,
} from '../../../IssueContribution/components/IssueOverview/IssuePriorityTag';
import { useCiCommonIssuesQuery, useCiPainTrendsQuery } from '../../queries';
import dynamic from 'next/dynamic';
import CiCommonIssueProgress from './CiCommonIssueProgress';
import CiCommonIssueList from './CiCommonIssueList';
import type { CiReportHref } from './CiIssueTable';
import type { TrackingStatus } from '../PainTracking/model';
import {
  CI_OVERVIEW_STATUS_META,
  REPAIR_RATE_NOTE,
} from './statusPresentation';
import {
  countPainProgress,
  TRACKING_STATES,
  type CiTopIssue,
} from './communityMetrics';

export { REPAIR_RATE_NOTE } from './statusPresentation';

const CiIssueListModal = dynamic(() =>
  import('./CiIssueTable').then((module) => module.CiIssueListModal)
);

const CommonIssueList: React.FC<{
  issues: CiTopIssue[];
  onOpen: (title: string, issues: CiTopIssue[]) => void;
}> = ({ issues, onOpen }) => {
  const groups = new Map<
    string,
    { type: string; title: string; issues: CiTopIssue[] }
  >();
  for (const issue of issues) {
    const type = issue.common_issue_type?.trim() || '共性问题';
    const title = issue.title || issue.kb;
    const key = JSON.stringify([type, title]);
    const group = groups.get(key);
    if (group) group.issues.push(issue);
    else groups.set(key, { type, title, issues: [issue] });
  }
  if (groups.size === 0) {
    return (
      <p className="flex flex-1 items-center justify-center text-sm text-[var(--overview-slateLight)]">
        暂无共性问题
      </p>
    );
  }
  return (
    <CiCommonIssueList
      items={Array.from(groups)}
      renderItem={([key, group]) => (
        <li
          className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,28rem)] content-center items-center gap-x-5 gap-y-1.5 rounded-lg border border-slate-200 bg-slate-50/40 px-4 py-2.5 md:px-3 lg:grid-cols-1"
          key={key}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <Tag
              className="max-w-full whitespace-normal break-words"
              color="blue"
            >
              {group.type}
            </Tag>
            <button
              type="button"
              className="max-w-full break-words rounded-lg text-left text-sm font-semibold text-[var(--overview-blue)] hover:underline"
              onClick={() => onOpen(group.title, group.issues)}
            >
              {group.title}
            </button>
          </div>
          <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 break-words text-xs text-[var(--overview-slate)]">
            <span>
              {new Set(group.issues.map((issue) => issue.repo)).size} 仓
            </span>
            <span>
              {Array.from(
                new Set(group.issues.flatMap((issue) => issue.journeyStages))
              ).join('、')}
            </span>
            <span>
              {getIssuePriorityLabel(
                group.issues.map((issue) => issue.pri).sort()[0]
              )}
            </span>
          </div>
        </li>
      )}
    />
  );
};

const CiPainProgress: React.FC<{
  issues: CiTopIssue[];
  reportHref: CiReportHref;
}> = ({ issues, reportHref }) => {
  const [mode, setMode] = React.useState<'overall' | 'common'>('overall');
  const commonOnly = mode === 'common';
  const commonQuery = useCiCommonIssuesQuery(commonOnly);
  const commonSnapshots = commonQuery.data?.snapshots ?? [];
  const [detail, setDetail] = React.useState<{
    title: string;
    issues: CiTopIssue[];
  } | null>(null);
  const [trendWindow, setTrendWindow] = React.useState<TrendWindow>({
    kind: 'weeks',
    weeks: 7,
  });
  const query = useCiPainTrendsQuery(false, !commonOnly);
  const headerActions = (
    <Segmented<'overall' | 'common'>
      aria-label="痛点问题类型"
      className="oj-summary-mode-toggle"
      value={mode}
      options={[
        { label: '总体问题', value: 'overall' },
        { label: '共性问题', value: 'common' },
      ]}
      onChange={setMode}
    />
  );
  const issueListModal = (
    <CiIssueListModal
      title={detail?.title}
      issues={detail?.issues}
      reportHref={reportHref}
      onClose={() => setDetail(null)}
    />
  );
  const progress = countPainProgress(issues);
  const points = (query.data?.points ?? []).filter(
    (point) =>
      trendWindow.kind === 'weeks' ||
      (point.weekStart <= trendWindow.end && point.weekEnd >= trendWindow.start)
  );
  const selected =
    trendWindow.kind === 'weeks' ? points.slice(-trendWindow.weeks) : points;
  const priorities = ISSUE_PRIORITY_LEVELS.filter((item) =>
    ['P0', 'P1', 'P2'].includes(item.priority)
  );
  const open = (state?: string, priority?: string) => {
    const rows = issues.filter(
      (issue) =>
        (!state || issue.status === state) &&
        (!priority || issue.pri === priority)
    );
    setDetail({
      title: [
        priority,
        TRACKING_STATES.find((item) => item === state)
          ? CI_OVERVIEW_STATUS_META[state as TrackingStatus].label
          : '痛点问题',
      ]
        .filter(Boolean)
        .join(' · '),
      issues: rows,
    });
  };
  const states = TRACKING_STATES.map((key) => ({
    key,
    label: CI_OVERVIEW_STATUS_META[key].label,
    fill: CI_OVERVIEW_STATUS_META[key].fill,
    color: '#fff',
  }));
  return (
    <>
      <div className="section-card">
        <div className="mb-3">{headerActions}</div>
        <div className="relative">
          {/* 总体问题保留布局高度，供共性问题视图使用。 */}
          <section
            aria-label="总体问题"
            aria-hidden={commonOnly || undefined}
            className={commonOnly ? 'invisible' : undefined}
          >
            <OverviewPainProgress
              embedded
              cards={[
                {
                  label: '问题总数',
                  value: progress.total,
                  onClick: () => open(),
                },
                ...TRACKING_STATES.map((state) => ({
                  label: CI_OVERVIEW_STATUS_META[state].label,
                  value: progress[state],
                  valueClassName: CI_OVERVIEW_STATUS_META[state].valueClassName,
                  onClick: () => open(state),
                })),
                {
                  label: '闭环率',
                  value: `${progress.rate.toFixed(1)}%`,
                  hint: REPAIR_RATE_NOTE,
                },
              ]}
              priorities={priorities.map((item) => {
                const counts = countPainProgress(
                  issues.filter((issue) => issue.pri === item.priority)
                );
                return {
                  key: item.priority,
                  label: item.label,
                  color: item.tagColor,
                  counts,
                  total: counts.total,
                  rate: counts.rate,
                };
              })}
              states={states}
              priorityTitle="各优先级问题处理进展"
              rateLabel="闭环率"
              rateHint={REPAIR_RATE_NOTE}
              onOpen={open}
              trendTitle="周度痛点趋势及闭环率"
              trendControls={
                <TrendWindowPicker
                  value={trendWindow}
                  onChange={setTrendWindow}
                />
              }
              trendContent={
                !query.isError && selected.length > 0 ? (
                  <TrendChart
                    points={selected.map((point) => ({
                      ...point,
                      label: point.weekEnd.slice(5),
                      p3: 0,
                      closeRate: point.repairRate,
                    }))}
                    fitContainerHeight
                    adaptiveAxes
                    rateLabel="闭环率"
                    rateTrendLabel="周度闭环率"
                  />
                ) : null
              }
              trendEmpty={
                query.isLoading ? (
                  '周度趋势加载中'
                ) : query.isError ? (
                  <span>
                    周度趋势加载失败{' '}
                    <Button type="link" onClick={() => void query.refetch()}>
                      重试
                    </Button>
                  </span>
                ) : (
                  '所选时间范围暂无数据'
                )
              }
              trendLegend={
                <>
                  {priorities.map((item) => (
                    <span key={item.priority} className="oj-trend-legend-item">
                      <i
                        className="oj-trend-dot"
                        style={{ background: item.tagColor }}
                      />
                      {item.label}
                    </span>
                  ))}
                  <span className="oj-trend-legend-item">
                    <span className="oj-trend-line" />
                    周度闭环率
                  </span>
                </>
              }
            />
          </section>
          {commonOnly && (
            <CiCommonIssueProgress
              snapshots={commonSnapshots}
              reportHref={reportHref}
              loading={commonQuery.isLoading}
              error={commonQuery.isError}
              onRetry={() => void commonQuery.refetch()}
              legacyContent={
                commonSnapshots.length === 0 ? (
                  <CommonIssueList
                    issues={issues.filter(
                      (issue) => issue.is_common_issue === true
                    )}
                    onOpen={(title, rows) => setDetail({ title, issues: rows })}
                  />
                ) : undefined
              }
            />
          )}
        </div>
      </div>
      {issueListModal}
    </>
  );
};
export default CiPainProgress;
