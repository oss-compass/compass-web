import { useQuery } from '@tanstack/react-query';
import { compassApiFetch } from '../rawData/apiClient';
import {
  USER_JOURNEY_PROJECT_REGISTRY,
  USER_JOURNEY_FALLBACK_PROJECT,
  USER_JOURNEY_PROJECT_OPTIONS,
  USER_JOURNEY_COMPARE_PROJECT_OPTIONS,
  USER_JOURNEY_PROJECT_VERSION_OPTIONS_MAP,
  USER_JOURNEY_PROJECT_KEY_MAP,
  USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP,
  USER_JOURNEY_PROJECT_LABEL_MAP,
  USER_JOURNEY_PROJECT_VERSION_MAP,
  UserJourneyProjectFileKey,
  UserJourneyProjectKey,
} from '../rawData/registry';

// ---- 与后端 /registry 接口一致的返回类型 ----

type RegistryEntry = {
  projectKey: string;
  label: string;
  version: string;
  org: string;
  sig: string;
  projectName: string;
  hardware_access: string;
};

type BackendRegistryResponse = {
  entries: Record<string, RegistryEntry>;
  default_file_map: Record<string, string>;
  fallback_project: string;
  project_options: Array<{ value: string; label: string }>;
  compare_project_options: Array<{ value: string; label: string }>;
  version_options_map: Record<string, Array<{ value: string; label: string }>>;
};

// ---- 前端统一使用的 RegistryData 类型 ----

export type RegistryData = {
  /** fileKey → entry，与 USER_JOURNEY_PROJECT_REGISTRY 完全一致 */
  entries: Record<string, RegistryEntry>;
  /** projectKey → 默认 fileKey */
  defaultFileMap: Record<string, string>;
  /** fallback fileKey */
  fallbackProject: string;
  /** 项目选择下拉选项 */
  projectOptions: Array<{ value: string; label: string }>;
  /** 对比项目下拉选项（fileKey → label） */
  compareProjectOptions: Array<{ value: string; label: string }>;
  /** projectKey → 版本选项列表 */
  versionOptionsMap: Record<string, Array<{ value: string; label: string }>>;
  /** fileKey → projectKey */
  fileKeyToProjectKey: Record<string, string>;
  /** fileKey → version */
  versionMap: Record<string, string>;
  /** projectKey → label */
  labelMap: Record<string, string>;
};

/** 把静态 registry 转成统一格式（作为 fallback） */
const buildStaticRegistryData = (): RegistryData => {
  return {
    entries: USER_JOURNEY_PROJECT_REGISTRY as unknown as Record<
      string,
      RegistryEntry
    >,
    defaultFileMap: USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP as unknown as Record<
      string,
      string
    >,
    fallbackProject: USER_JOURNEY_FALLBACK_PROJECT,
    projectOptions: USER_JOURNEY_PROJECT_OPTIONS,
    compareProjectOptions: USER_JOURNEY_COMPARE_PROJECT_OPTIONS,
    versionOptionsMap:
      USER_JOURNEY_PROJECT_VERSION_OPTIONS_MAP as unknown as Record<
        string,
        Array<{ value: string; label: string }>
      >,
    fileKeyToProjectKey: USER_JOURNEY_PROJECT_KEY_MAP as unknown as Record<
      string,
      string
    >,
    versionMap: USER_JOURNEY_PROJECT_VERSION_MAP as unknown as Record<
      string,
      string
    >,
    labelMap: USER_JOURNEY_PROJECT_LABEL_MAP as unknown as Record<
      string,
      string
    >,
  };
};

/** 把后端响应转成统一格式 */
const transformBackendRegistry = (
  data: BackendRegistryResponse
): RegistryData => {
  const fileKeyToProjectKey: Record<string, string> = {};
  const versionMap: Record<string, string> = {};
  const labelMap: Record<string, string> = {};

  for (const [fk, entry] of Object.entries(data.entries)) {
    fileKeyToProjectKey[fk] = entry.projectKey;
    versionMap[fk] = entry.version;
    if (!labelMap[entry.projectKey]) {
      labelMap[entry.projectKey] = entry.label;
    }
  }

  return {
    entries: data.entries,
    defaultFileMap: data.default_file_map,
    fallbackProject: data.fallback_project,
    projectOptions: data.project_options,
    compareProjectOptions: data.compare_project_options,
    versionOptionsMap: data.version_options_map,
    fileKeyToProjectKey,
    versionMap,
    labelMap,
  };
};

const staticRegistryData = buildStaticRegistryData();

/**
 * 从后端 /registry 接口获取动态 registry 数据。
 * 后端不可用时自动使用静态 registry 作为 fallback。
 */
export const useRegistryData = (): RegistryData => {
  const { data } = useQuery({
    queryKey: ['userJourneyRegistry'],
    queryFn: async (): Promise<RegistryData> => {
      const res = await compassApiFetch<BackendRegistryResponse>('/registry');
      return transformBackendRegistry(res);
    },
    staleTime: 5 * 60 * 1000, // 5 分钟缓存
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return data ?? staticRegistryData;
};

// ---- 工具函数（接收 RegistryData，替代原静态函数）----

export const resolveFileKeyFromRegistry = (
  project: string | null | undefined,
  registry: RegistryData
): string => {
  if (!project) return registry.fallbackProject;

  let resolved = project.trim();
  try {
    resolved = decodeURIComponent(resolved);
  } catch {
    resolved = project.trim();
  }
  const normalized = resolved.replace(/\.json$/i, '');
  if (!/^[A-Za-z0-9_-]+$/.test(normalized)) return registry.fallbackProject;

  if (normalized in registry.entries) return normalized;

  const defaultKey = registry.defaultFileMap[normalized];
  if (defaultKey) return defaultKey;

  return registry.fallbackProject;
};

export const filterRegistryEntriesFromRegistry = (
  registry: RegistryData,
  filters: {
    org?: string;
    sig?: string;
    projectKey?: string;
    hardware_access?: string;
  }
): Array<[string, RegistryEntry]> => {
  return Object.entries(registry.entries).filter(([, entry]) => {
    if (filters.org && entry.org !== filters.org) return false;
    if (filters.sig && entry.sig !== filters.sig) return false;
    if (filters.projectKey && entry.projectKey !== filters.projectKey)
      return false;
    if (
      filters.hardware_access &&
      entry.hardware_access !== filters.hardware_access
    )
      return false;
    return true;
  });
};

// 兼容类型导出
export type { RegistryEntry };
export type { UserJourneyProjectFileKey, UserJourneyProjectKey };
