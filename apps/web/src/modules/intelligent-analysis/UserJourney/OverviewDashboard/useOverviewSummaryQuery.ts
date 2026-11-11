import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetchOverviewSummary } from '../rawData/apiClient';
import type { IssueSourceMode } from './types';

export const useOverviewSummaryQuery = ({
  org,
  issueSourceMode = 'overall',
  includeCommonIssues = true,
  enabled = true,
}: {
  org?: string;
  issueSourceMode?: IssueSourceMode;
  includeCommonIssues?: boolean;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ['overview-summary', org, issueSourceMode, includeCommonIssues],
    queryFn: () =>
      fetchOverviewSummary({
        org,
        includeCommonIssues: true,
        commonOnly:
          issueSourceMode === 'common'
            ? true
            : issueSourceMode === 'non-common' || !includeCommonIssues
            ? false
            : undefined,
      }),
    // The entry shell and dashboard share one request, including when it finishes
    // before the dashboard chunk mounts.
    staleTime: 15_000,
    enabled,
  });

export const useDefaultOverviewSummary = (org?: string) => {
  const router = useRouter();
  const rawModule = router.query.module;
  const activeModule = Array.isArray(rawModule) ? rawModule[0] : rawModule;
  useOverviewSummaryQuery({
    org,
    enabled:
      router.isReady &&
      activeModule !== 'ci' &&
      activeModule !== 'issue' &&
      !router.query.captureMode,
  });
};
