import { useQuery } from '@tanstack/react-query';
import { UserJourneyProjectData, BackendReportData } from '../types';
import {
  USER_JOURNEY_FALLBACK_PROJECT,
  USER_JOURNEY_PROJECT_REPORT_MAP,
  UserJourneyProjectFileKey,
} from '../rawData/registry';
import { buildUserJourneyProjectData } from '../rawData/transform';
import { attachProjectRegistryMeta } from '../rawData/loader';
import { compassApiFetch } from '../rawData/apiClient';

const fetchUserJourneyReport = async (
  projectFileKey: UserJourneyProjectFileKey
): Promise<UserJourneyProjectData> => {
  // 优先调用后端 API
  try {
    const report = await compassApiFetch<BackendReportData>(
      `/reports/${projectFileKey}`
    );
    const projectData = buildUserJourneyProjectData(report);
    return attachProjectRegistryMeta(projectData, projectFileKey);
  } catch {
    // 后端不可用时回退到静态文件
    const staticUrl = USER_JOURNEY_PROJECT_REPORT_MAP[projectFileKey];
    if (!staticUrl) {
      throw new Error(`No report found for key: ${projectFileKey}`);
    }
    const res = await fetch(staticUrl);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch UserJourney report: ${projectFileKey} (${res.status})`
      );
    }
    const report = (await res.json()) as BackendReportData;
    const projectData = buildUserJourneyProjectData(report);
    return attachProjectRegistryMeta(projectData, projectFileKey);
  }
};

/**
 * 加载单个项目的报告数据。
 * 基于 react-query，相同 projectFileKey 只 fetch 一次，自动缓存与去重。
 * 若指定 key 加载失败，自动回退到 fallback 项目。
 */
export const useUserJourneyReport = (
  projectFileKey: UserJourneyProjectFileKey | undefined
) => {
  return useQuery({
    queryKey: ['userJourneyReport', projectFileKey],
    queryFn: async (): Promise<UserJourneyProjectData> => {
      try {
        return await fetchUserJourneyReport(projectFileKey!);
      } catch (error) {
        if (projectFileKey !== USER_JOURNEY_FALLBACK_PROJECT) {
          return fetchUserJourneyReport(USER_JOURNEY_FALLBACK_PROJECT);
        }
        throw error;
      }
    },
    enabled: !!projectFileKey,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
