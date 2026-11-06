import { compassApiFetch } from '../../UserJourney/rawData/apiClient';
import type { CiPri, CiProblemImpact } from './types';
import type {
  TrackingScope,
  TrackingStatus,
} from './components/PainTracking/model';

export type CiPainIssue = {
  problemKey: string;
  pri: CiPri;
  status: TrackingStatus;
  title: string;
  kb: string;
  dim: string | null;
  journeyStages: string[];
  impact: Partial<CiProblemImpact>;
};

export type CiPainReport = TrackingScope & {
  slug: string;
  issues: CiPainIssue[];
};

export type CiPainOverview = { reports: CiPainReport[] };

export type CiPainTrendPoint = {
  weekStart: string;
  weekEnd: string;
  total: number;
  p0: number;
  p1: number;
  p2: number;
  repoCount: number;
  counts: Record<TrackingStatus, number>;
  repairRate: number;
};

export const fetchCiPainTrends = async (
  signal?: AbortSignal
): Promise<{ points: CiPainTrendPoint[] }> => {
  const response = await compassApiFetch<{ points: CiPainTrendPoint[] }>(
    '/ci-experience/ci-data/pain-trends',
    { signal }
  );
  if (
    !Array.isArray(response.points) ||
    response.points.some(
      (point) =>
        !point.weekStart ||
        !point.weekEnd ||
        ![
          point.total,
          point.p0,
          point.p1,
          point.p2,
          point.repoCount,
          point.repairRate,
        ].every(Number.isFinite)
    )
  )
    throw new Error('CI 周度痛点趋势数据格式异常');
  return response;
};

export const fetchCiPainOverview = async (
  signal?: AbortSignal
): Promise<CiPainOverview> => {
  const response = await compassApiFetch<CiPainOverview>(
    '/ci-experience/ci-data/pain-overview',
    { signal }
  );
  if (
    !Array.isArray(response.reports) ||
    response.reports.some(
      (report) =>
        !report.repo ||
        !report.workflow ||
        !report.day ||
        !Array.isArray(report.issues) ||
        report.issues.some(
          (issue) =>
            !issue.problemKey ||
            !['pending', 'confirmed', 'fixed', 'invalid'].includes(
              issue.status
            ) ||
            !['P0', 'P1', 'P2'].includes(issue.pri) ||
            !Array.isArray(issue.journeyStages)
        )
    )
  )
    throw new Error('CI 痛点状态数据不完整，请重试');
  return response;
};
