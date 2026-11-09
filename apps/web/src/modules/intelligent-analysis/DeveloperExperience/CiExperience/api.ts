import { compassApiFetch } from '../../UserJourney/rawData/apiClient';
import type { CiBoard, CiJourney, CiRepoData, CiRepoKey } from './types';
import type { CiReportContext } from './reportContext';
import { validateCiPainOverview, type CiPainOverview } from './overviewApi';

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

export type CiReportDataset = Omit<CiRepoData, 'weekly'>;

export type CiReportPageResponse = Omit<CiDatasetResponse, 'dataset'> & {
  dataset: CiReportDataset | null;
  catalog: CiCatalogEntry[];
  available_days: string[];
  selected_day: string | null;
};

export type CiOverviewDataset = Pick<
  CiRepoData,
  'name' | 'workflow' | 'days'
> & {
  boards: Record<
    string,
    { dims: Array<Pick<CiBoard['dims'][number], 'key' | 'name'>> }
  >;
};
export type CiOverviewJourney = Pick<
  CiJourney,
  'days' | 'projectName' | 'workflow'
> & {
  boards: Record<
    string,
    {
      scores: {
        total: number | null;
        dims?: CiJourney['boards'][string]['scores']['dims'];
      } | null;
    }
  >;
};

export type CiDatasetsResponse = {
  pain_overview?: CiPainOverview | null;
  catalog: CiCatalogEntry[];
  datasets: Record<CiRepoKey, CiOverviewDataset>;
  journeys: Record<CiRepoKey, CiOverviewJourney>;
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
export const validateCiDataset = <
  T extends Omit<CiDatasetResponse, 'dataset'> & {
    dataset: CiReportDataset | null;
  }
>(
  response: T
): T => {
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
    `${endpoint}/overview?include_pains=true`,
    { signal }
  );
  response.catalog = readCatalog(response.catalog);
  if (!response.datasets || !response.journeys)
    throw new Error('CI 总览数据格式异常');
  for (const { repo } of response.catalog) {
    const dataset = response.datasets[repo];
    const journey = response.journeys[repo];
    if (
      !Array.isArray(dataset?.days) ||
      !journey?.boards ||
      journey.workflow !== dataset.workflow ||
      journey.projectName !== dataset.name ||
      dataset.days.some((day) => !journey.boards[day]) ||
      (dataset.days.length > 0 &&
        !dataset.boards?.[dataset.days[dataset.days.length - 1]])
    )
      throw new Error(`CI 仓库 ${repo} 缺少总览评分数据`);
  }
  if (response.pain_overview) validateCiPainOverview(response.pain_overview);
  return response;
};

export const fetchCiReportPage = async (
  repo?: string,
  day?: string,
  signal?: AbortSignal
): Promise<CiReportPageResponse> => {
  const params = new URLSearchParams({
    ...(repo !== undefined ? { repo } : {}),
    ...(day && /^\d{4}-\d{2}-\d{2}$/.test(day) ? { day } : {}),
  });
  const response = await compassApiFetch<CiReportPageResponse>(
    `${endpoint}/report?${params}`,
    { signal }
  );
  response.catalog = readCatalog(response.catalog);
  validateCiDataset(response);
  if (
    !Array.isArray(response.available_days) ||
    (response.dataset &&
      (!response.selected_day ||
        !response.available_days.includes(response.selected_day) ||
        response.dataset.days.length !== 1 ||
        response.dataset.days[0] !== response.selected_day ||
        !response.catalog.some((entry) => entry.repo === response.repo)))
  )
    throw new Error('CI 报告日期或仓库数据不一致，请重试');
  return response;
};
