import { useQuery } from '@tanstack/react-query';
import { UserJourneyProjectData } from '../types';
import {
  USER_JOURNEY_FALLBACK_PROJECT,
  USER_JOURNEY_PROJECT_REPORT_MAP,
  UserJourneyProjectFileKey,
} from '../rawData/registry';
import { buildUserJourneyProjectData } from '../rawData/transform';
import { attachProjectRegistryMeta } from '../rawData/loader';

const fetchUserJourneyReport = async (
  projectFileKey: UserJourneyProjectFileKey
): Promise<UserJourneyProjectData> => {
  const url = USER_JOURNEY_PROJECT_REPORT_MAP[projectFileKey];
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch UserJourney report: ${projectFileKey} (${response.status})`
    );
  }

  const report = await response.json();
  const projectData = buildUserJourneyProjectData(report);
  return attachProjectRegistryMeta(projectData, projectFileKey);
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
