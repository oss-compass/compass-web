import React from 'react';
import { Button, Modal } from 'antd';
import OverviewPainProgress from '../../../../UserJourney/OverviewDashboard/OverviewPainProgress';
import {
  TrendChart,
  TrendWindowPicker,
} from '../../../../UserJourney/OverviewDashboard/OverviewSummaryBlock';
import type { TrendWindow } from '../../../../UserJourney/OverviewDashboard/types';
import { ISSUE_PRIORITY_LEVELS } from '../../../IssueContribution/components/IssueOverview/IssuePriorityTag';
import { useCiPainTrendsQuery } from '../../queries';
import CiIssueTable, { type CiReportHref } from './CiIssueTable';
import type { CiPri } from '../../types';
import type { TrackingStatus } from '../PainTracking/model';
import { STATUS_META } from '../PainTracking/model';
import {
  countPainProgress,
  TRACKING_STATES,
  type CiTopIssue,
} from './communityMetrics';

export const REPAIR_RATE_NOTE =
  '已修复待复测 ÷ 有效问题（含待确认）；非有效问题不计入分母。无有效问题时为 100%。';
const COLORS: Record<TrackingStatus, string> = {
  pending: '#e7af4d',
  confirmed: '#65a2ef',
  fixed: '#a490d4',
  invalid: '#cbd5e1',
};

const CiPainProgress: React.FC<{
  issues: CiTopIssue[];
  reportHref: CiReportHref;
}> = ({ issues, reportHref }) => {
  const progress = countPainProgress(issues);
  const [detail, setDetail] = React.useState<{
    title: string;
    issues: CiTopIssue[];
  } | null>(null);
  const [trendWindow, setTrendWindow] = React.useState<TrendWindow>({
    kind: 'weeks',
    weeks: 7,
  });
  const query = useCiPainTrendsQuery();
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
          ? STATUS_META[state as TrackingStatus].label
          : '痛点问题',
      ]
        .filter(Boolean)
        .join(' · '),
      issues: rows,
    });
  };
  const states = TRACKING_STATES.map((key) => ({
    key,
    label: STATUS_META[key].label,
    fill: COLORS[key],
    color: '#fff',
  }));
  return (
    <>
      <OverviewPainProgress
        cards={[
          { label: '问题总数', value: progress.total, onClick: () => open() },
          ...TRACKING_STATES.map((state) => ({
            label: STATUS_META[state].label,
            value: progress[state],
            valueClassName:
              state === 'pending'
                ? 'ov-value-pending'
                : state === 'confirmed'
                ? 'ov-value-blue'
                : '',
            onClick: () => open(state),
          })),
          {
            label: '修复率',
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
        rateLabel="修复率"
        rateHint={REPAIR_RATE_NOTE}
        onOpen={open}
        trendTitle="周度痛点趋势及修复率"
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
              rateLabel="修复率"
              rateTrendLabel="周度修复率"
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
              周度修复率
            </span>
          </>
        }
      />
      <Modal
        open={!!detail}
        title={detail?.title}
        onCancel={() => setDetail(null)}
        footer={null}
        width={1080}
        destroyOnClose
      >
        {detail && (
          <CiIssueTable issues={detail.issues} reportHref={reportHref} />
        )}
      </Modal>
    </>
  );
};
export default CiPainProgress;
