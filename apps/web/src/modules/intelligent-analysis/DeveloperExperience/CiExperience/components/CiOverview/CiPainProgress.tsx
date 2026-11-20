import React from 'react';
import { Button, Segmented, Tag } from 'antd';
import OverviewPainProgress from '../../../../UserJourney/OverviewDashboard/OverviewPainProgress';
import {
  TrendChart,
  TrendWindowPicker,
} from '../../../../UserJourney/OverviewDashboard/OverviewSummaryBlock';
import type { TrendWindow } from '../../../../UserJourney/OverviewDashboard/types';
import { ISSUE_PRIORITY_LEVELS } from '../../../IssueContribution/components/IssueOverview/IssuePriorityTag';
import { useCiPainTrendsQuery } from '../../queries';
import dynamic from 'next/dynamic';
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
    <div className="ov-ci-list max-h-[320px] overflow-y-auto">
      {Array.from(groups, ([key, group]) => (
        <div className="ov-ci-row gap-2" key={key}>
          <div className="flex flex-wrap items-center gap-2">
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
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--overview-slate)]">
            <span>
              {new Set(group.issues.map((issue) => issue.repo)).size} 仓
            </span>
            <span>
              {Array.from(
                new Set(group.issues.flatMap((issue) => issue.journeyStages))
              ).join('、')}
            </span>
            <span>
              {Array.from(new Set(group.issues.map((issue) => issue.pri)))
                .sort()
                .join('、')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const CiPainProgress: React.FC<{
  issues: CiTopIssue[];
  reportHref: CiReportHref;
}> = ({ issues, reportHref }) => {
  const [mode, setMode] = React.useState<'overall' | 'common'>('overall');
  const commonOnly = mode === 'common';
  const scopedIssues = commonOnly
    ? issues.filter((issue) => issue.is_common_issue === true)
    : issues;
  const progress = countPainProgress(scopedIssues);
  const [detail, setDetail] = React.useState<{
    title: string;
    issues: CiTopIssue[];
  } | null>(null);
  const [trendWindow, setTrendWindow] = React.useState<TrendWindow>({
    kind: 'weeks',
    weeks: 7,
  });
  const query = useCiPainTrendsQuery(commonOnly);
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
    const rows = scopedIssues.filter(
      (issue) =>
        (!state || issue.status === state) &&
        (!priority || issue.pri === priority)
    );
    setDetail({
      title: [
        priority,
        TRACKING_STATES.find((item) => item === state)
          ? CI_OVERVIEW_STATUS_META[state as TrackingStatus].label
          : commonOnly
          ? '共性问题'
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
      <OverviewPainProgress
        headerActions={
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
        }
        progressContent={
          commonOnly ? (
            <CommonIssueList
              issues={scopedIssues}
              onOpen={(title, rows) => setDetail({ title, issues: rows })}
            />
          ) : undefined
        }
        cards={[
          { label: '问题总数', value: progress.total, onClick: () => open() },
          ...TRACKING_STATES.map((state) => ({
            label: CI_OVERVIEW_STATUS_META[state].label,
            value: progress[state],
            valueClassName: CI_OVERVIEW_STATUS_META[state].valueClassName,
            onClick: () => open(state),
          })),
          {
            label: '闭环率',
            value:
              commonOnly && !progress.total
                ? '—'
                : `${progress.rate.toFixed(1)}%`,
            hint: REPAIR_RATE_NOTE,
          },
        ]}
        priorities={priorities.map((item) => {
          const counts = countPainProgress(
            scopedIssues.filter((issue) => issue.pri === item.priority)
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
        priorityTitle={commonOnly ? '共性问题清单' : '各优先级问题处理进展'}
        rateLabel="闭环率"
        rateHint={REPAIR_RATE_NOTE}
        onOpen={open}
        trendTitle={
          commonOnly ? '周度共性问题趋势及闭环率' : '周度痛点趋势及闭环率'
        }
        trendControls={
          <TrendWindowPicker value={trendWindow} onChange={setTrendWindow} />
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
          ) : commonOnly ? (
            '所选时间范围暂无共性问题数据'
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
      <CiIssueListModal
        title={detail?.title}
        issues={detail?.issues}
        reportHref={reportHref}
        onClose={() => setDetail(null)}
      />
    </>
  );
};
export default CiPainProgress;
