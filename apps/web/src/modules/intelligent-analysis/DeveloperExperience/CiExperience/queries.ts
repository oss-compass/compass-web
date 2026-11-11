import { useQuery } from '@tanstack/react-query';
import {
  fetchCiCatalog,
  fetchCiDataset,
  fetchCiDatasets,
  fetchCiReportPage,
} from './api';
import type { CiRepoKey } from './types';
import { fetchCiPainOverview, fetchCiPainTrends } from './overviewApi';

const queryOptions = {
  staleTime: 5 * 60 * 1000,
  cacheTime: 15 * 60 * 1000,
  refetchOnWindowFocus: false,
  retry: 1,
};

export const useCiCatalogQuery = (enabled = true) =>
  useQuery({
    ...queryOptions,
    queryKey: ['ci-data', 'catalog'],
    queryFn: ({ signal }) => fetchCiCatalog(signal),
    enabled,
  });

export const useCiDatasetQuery = (repo: CiRepoKey | null, enabled = true) =>
  useQuery({
    ...queryOptions,
    queryKey: ['ci-data', 'repo', repo],
    queryFn: ({ signal }) => fetchCiDataset(repo!, signal),
    enabled: enabled && repo !== null,
  });

export const useCiDatasetsQuery = (
  enabled = true,
  { reuseFreshData = false }: { reuseFreshData?: boolean } = {}
) =>
  useQuery({
    ...queryOptions,
    queryKey: ['ci-data', 'overview', 'page-v2'],
    queryFn: ({ signal }) => fetchCiDatasets(signal),
    staleTime: reuseFreshData ? 15_000 : 0,
    refetchOnMount: reuseFreshData ? true : 'always',
    enabled,
  });

export const useCiPainOverviewQuery = (enabled = true) =>
  useQuery({
    ...queryOptions,
    queryKey: ['ci-data', 'pain-overview'],
    queryFn: ({ signal }) => fetchCiPainOverview(signal),
    staleTime: 0,
    refetchOnMount: 'always',
    enabled,
  });

export const useCiPainTrendsQuery = (enabled = true) =>
  useQuery({
    ...queryOptions,
    queryKey: ['ci-data', 'pain-trends'],
    queryFn: ({ signal }) => fetchCiPainTrends(signal),
    staleTime: 0,
    refetchOnMount: 'always',
    enabled,
  });

export const useCiReportPageQuery = (
  repo: string | undefined,
  day: string | undefined,
  enabled = true
) =>
  useQuery({
    ...queryOptions,
    queryKey: ['ci-data', 'report-page', repo, day],
    queryFn: ({ signal }) => fetchCiReportPage(repo, day, signal),
    enabled,
  });
