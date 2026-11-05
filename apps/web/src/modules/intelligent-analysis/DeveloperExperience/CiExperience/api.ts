import { compassApiFetch } from '../../UserJourney/rawData/apiClient';
import type { CiJourney, CiRepoData, CiRepoKey } from './types';
import type { CiReportContext } from './reportContext';

export type CiCatalogEntry = {
  repo: CiRepoKey;
  org: string;
  slug: string;
  platform: string;
  repository_url: string;
  name: string;
  workflow: string;
  latest_day: string | null;
  latest_complete_day: string | null;
  days_count: number;
  complete_days_count: number;
  caliber: string | null;
  generated_at: string | null;
  uploaded_at: string | null;
};

export type CiDatasetResponse = {
  repo?: CiRepoKey;
  report_context?: { boards: Record<string, CiReportContext> };
  dataset: CiRepoData | null;
  journey: CiJourney | null;
  caliber?: string | null;
  uploaded_at?: string | null;
  generated_at?: string | null;
};

export type CiDatasetsResponse = {
  catalog: CiCatalogEntry[];
  datasets: Record<CiRepoKey, CiRepoData>;
  journeys: Record<CiRepoKey, CiJourney>;
};

const endpoint = '/ci-experience/ci-data';

const readCatalog = (items: CiCatalogEntry[]): CiCatalogEntry[] => {
  if (!Array.isArray(items)) throw new Error('CI 仓库目录格式异常');
  return items.map((item) => {
    if (typeof item.repo !== 'string' || !item.repo.trim())
      throw new Error('CI 仓库标识无效');
    return item;
  });
};

/** 两套数据必须属于同一仓库、流水线和日期，避免拼接出混合报告。 */
export const validateCiDataset = (
  response: CiDatasetResponse
): CiDatasetResponse => {
  const { dataset, journey } = response;
  if (dataset == null) return { ...response, dataset: null, journey: null };
  if (
    !Array.isArray(dataset.days) ||
    !dataset.boards ||
    !journey?.boards ||
    !Array.isArray(journey.days) ||
    journey.workflow !== dataset.workflow ||
    journey.projectName !== dataset.name ||
    dataset.days.some(
      (day) =>
        !dataset.boards[day] ||
        !journey.boards[day] ||
        !journey.days.includes(day)
    )
  ) {
    throw new Error('CI 指标与旅程数据不完整或不一致，请重试');
  }
  if (
    response.report_context &&
    dataset.days.some((day) => {
      const context = response.report_context!.boards[day];
      return (
        !context ||
        context.day !== day ||
        context.repo !== response.repo ||
        context.workflow !== dataset.workflow
      );
    })
  )
    throw new Error('CI 分析与报告的仓库或日期不一致，请重试');
  return response;
};

export const fetchCiCatalog = async (
  signal?: AbortSignal
): Promise<CiCatalogEntry[]> => {
  const response = await compassApiFetch<{ catalog: CiCatalogEntry[] }>(
    endpoint,
    { signal }
  );
  return readCatalog(response.catalog);
};

export const fetchCiDataset = async (
  repo: CiRepoKey,
  signal?: AbortSignal
): Promise<CiDatasetResponse> => {
  const response = await compassApiFetch<CiDatasetResponse>(
    `${endpoint}?${new URLSearchParams({ repo })}`,
    { signal }
  );
  if (response.repo && response.repo !== repo)
    throw new Error('CI 仓库数据不匹配');
  return validateCiDataset(response);
};

export const fetchCiDatasets = async (
  signal?: AbortSignal
): Promise<CiDatasetsResponse> => {
  const response = await compassApiFetch<CiDatasetsResponse>(
    `${endpoint}/overview`,
    { signal }
  );
  response.catalog = readCatalog(response.catalog);
  if (!response.datasets || !response.journeys)
    throw new Error('CI 总览数据格式异常');
  for (const { repo } of response.catalog) {
    validateCiDataset({
      dataset: response.datasets[repo],
      journey: response.journeys[repo],
    });
    if (!response.datasets[repo]?.weekly)
      throw new Error(`CI 仓库 ${repo} 缺少汇总数据`);
  }
  return response;
};
