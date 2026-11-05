import { useQuery } from '@tanstack/react-query';
import { fetchCiCatalog, fetchCiDataset, fetchCiDatasets } from './api';
import type { CiRepoKey } from './types';

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

export const useCiDatasetsQuery = (enabled = true) =>
  useQuery({
    ...queryOptions,
    queryKey: ['ci-data', 'overview'],
    queryFn: ({ signal }) => fetchCiDatasets(signal),
    enabled,
  });
