import React from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Skeleton, Tooltip, Typography } from 'antd';
import type { CiJourney, CiPri, CiRepoData, CiRepoKey } from '../../types';
import type { CiPainOverview } from '../../overviewApi';
import type { TrackingStatus } from '../PainTracking/model';
import { STATUS_META } from '../PainTracking/model';
import { EmptyState } from '../shared';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import {
  computeCommunityOverview,
  painReportsMatch,
  TRACKING_STATES,
  type CiTrendItem,
} from './communityMetrics';
import CiTrendModal from './CiTrendModal';
import CiRepoProgressSection from './CiRepoProgressSection';
import CiScoreInsights from './CiScoreInsights';
import CiPainProgress, { REPAIR_RATE_NOTE } from './CiPainProgress';
import CiIssueTable from './CiIssueTable';
import CiOverviewFilter from './CiOverviewFilter';

type CiOverviewProps = {
  data: Record<CiRepoKey, CiRepoData>;
  journeys: Partial<Record<CiRepoKey, CiJourney>>;
  painData?: CiPainOverview;
  painLoading?: boolean;
  painError?: boolean;
  onRetryPain: () => void;
  headerAction?: React.ReactNode;
};

const CiOverview: React.FC<CiOverviewProps> = ({
  data,
  journeys,
  painData,
  painLoading,
  painError,
  onRetryPain,
  headerAction,
}) => {
  const router = useRouter();
  const m = React.useMemo(
    () =>
      computeCommunityOverview(
        data,
        journeys,
        painError ? undefined : painData
      ),
    [data, journeys, painData, painError]
  );
  const [trendModal, setTrendModal] = React.useState<CiTrendItem | null>(null);
  const [status, setStatus] = React.useState<TrackingStatus | 'all'>('all');
  const [priority, setPriority] = React.useState<CiPri | 'all'>('all');
  const trackingReady =
    !painError && !!painData && painReportsMatch(m.repos, painData);
  const orgSeg =
    typeof router.query.org === 'string'
      ? `/${encodeURIComponent(router.query.org)}`
      : '';
  const reportHref = (repo: string, day?: string) =>
    `/intelligent-analysis${orgSeg}/experience/ci-experience?${new URLSearchParams(
      { repo, ...(day ? { day } : {}) }
    )}`;
  const filteredIssues = m.topIssues.filter(
    (issue) =>
      (priority === 'all' || issue.pri === priority) &&
      (status === 'all' || issue.status === status)
  );
  return (
    <div className="ci-community-overview space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography.Title level={4} className="oj-section-title">
          总览信息
        </Typography.Title>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          {m.hasData && (
            <span>
              最新日报{' '}
              {m.earliestDay === m.latestDay
                ? m.latestDay
                : `${m.earliestDay} 至 ${m.latestDay}`}{' '}
              · {m.scoredRepoCount} / {m.repos.length} 仓库已评分
            </span>
          )}
          {headerAction}
        </div>
      </div>
      {!m.hasData ? (
        <div className="section-card">
          <EmptyState>暂无 CI 总览数据</EmptyState>
        </div>
      ) : (
        <>
          <div className="overview-bottom-row ci-score-cards">
            {m.kpis.map((kpi) => (
              <div key={kpi.label} className="bottom-metric">
                <div className="bm-label">
                  <Tooltip
                    title={
                      kpi.label === '问题闭环' ? REPAIR_RATE_NOTE : undefined
                    }
                  >
                    <span>{kpi.label}</span>
                  </Tooltip>
                </div>
                <div className="bm-value">
                  <span className="bm-value-main">{kpi.value}</span>
                  {kpi.unit && (
                    <span className="bm-value-suffix">{kpi.unit}</span>
                  )}
                  {kpi.trend && (
                    <button
                      type="button"
                      className="bm-trend-sparkline"
                      aria-label={`查看${kpi.label}趋势`}
                      onClick={() => setTrendModal(kpi.trend ?? null)}
                    >
                      <CloseRateSparkline
                        values={kpi.trend.values}
                        width={52}
                        height={26}
                        minValue={0}
                        maxValue={100}
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <CiScoreInsights
            repos={m.repos}
            overallScore={m.overallScore}
            reportHref={reportHref}
          />
          {trackingReady ? (
            <>
              <CiPainProgress issues={m.topIssues} reportHref={reportHref} />
              <section
                className="section-card scroll-mt-5"
                id="ci-overview-issues"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-[16px] font-extrabold leading-6 text-[var(--overview-text)]">
                    痛点问题{' '}
                    <span className="ml-1 text-sm font-normal text-slate-500">
                      {filteredIssues.length} 项
                    </span>
                  </h3>
                  <div className="overview-filter-group flex-wrap">
                    <CiOverviewFilter<CiPri | 'all'>
                      label="优先级"
                      aria-label="按优先级筛选痛点"
                      className="min-w-[110px]"
                      value={priority}
                      onChange={setPriority}
                      options={[
                        { value: 'all', label: '全部优先级' },
                        ...['P0', 'P1', 'P2'].map((value) => ({
                          value,
                          label: value,
                        })),
                      ]}
                    />
                    <CiOverviewFilter<TrackingStatus | 'all'>
                      label="处理状态"
                      aria-label="按处理状态筛选痛点"
                      className="min-w-[150px]"
                      value={status}
                      onChange={setStatus}
                      options={[
                        { value: 'all', label: '全部状态' },
                        ...TRACKING_STATES.map((value) => ({
                          value,
                          label: STATUS_META[value].label,
                        })),
                      ]}
                    />
                    {(status !== 'all' || priority !== 'all') && (
                      <Button
                        type="link"
                        className="!h-8 !px-2 !text-sm"
                        onClick={() => {
                          setStatus('all');
                          setPriority('all');
                        }}
                      >
                        重置筛选
                      </Button>
                    )}
                  </div>
                </div>
                <CiIssueTable
                  key={`${status}:${priority}`}
                  issues={filteredIssues}
                  reportHref={reportHref}
                />
              </section>
            </>
          ) : painLoading ? (
            <section className="section-card">
              <Skeleton
                active
                paragraph={{ rows: 3 }}
                title={{ width: '20%' }}
              />
            </section>
          ) : (
            <Alert
              type="warning"
              showIcon
              message="痛点处理状态暂不可用"
              description={
                painData && !painError
                  ? '报告日期已变化，请刷新以保持评分与痛点同源。'
                  : undefined
              }
              action={
                <Button size="small" onClick={onRetryPain}>
                  重试
                </Button>
              }
            />
          )}
          <CiRepoProgressSection
            repos={m.repos}
            issues={trackingReady ? m.topIssues : []}
            trackingReady={trackingReady}
            reportHref={reportHref}
          />
          <CiTrendModal
            open={!!trendModal}
            trend={trendModal}
            days={m.days}
            onClose={() => setTrendModal(null)}
          />
        </>
      )}
      <style jsx global>{`
        .ci-community-overview .ci-score-cards {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        @media (max-width: 767px) {
          .ci-community-overview .ci-score-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  );
};
export default CiOverview;
