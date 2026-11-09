import React from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Skeleton, Tooltip, Typography } from 'antd';
import type { CiRepoKey } from '../../types';
import type { CiOverviewDataset, CiOverviewJourney } from '../../api';
import type { CiPainOverview } from '../../overviewApi';
import { EmptyState } from '../shared';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import {
  computeCommunityOverview,
  painReportsMatch,
  type CiTrendItem,
} from './communityMetrics';
import CiTrendModal from './CiTrendModal';
import CiRepoProgressSection from './CiRepoProgressSection';
import CiScoreInsights from './CiScoreInsights';
import CiPainProgress, { REPAIR_RATE_NOTE } from './CiPainProgress';
import CiFrequentPainSection from './CiFrequentPainSection';

type CiOverviewProps = {
  data: Record<CiRepoKey, CiOverviewDataset>;
  journeys: Partial<Record<CiRepoKey, CiOverviewJourney>>;
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
  return (
    <div className="ci-community-overview space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography.Title level={4} className="oj-section-title">
          总览信息
        </Typography.Title>
        {headerAction && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            {headerAction}
          </div>
        )}
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
                      kpi.label === '闭环率' ? REPAIR_RATE_NOTE : undefined
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
              <CiFrequentPainSection
                issues={m.topIssues}
                reportHref={reportHref}
              />
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
