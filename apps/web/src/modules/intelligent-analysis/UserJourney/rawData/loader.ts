import { BackendReportData, UserJourneyProjectData } from '../types';
import {
  USER_JOURNEY_FALLBACK_PROJECT,
  USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP,
  USER_JOURNEY_PROJECT_KEY_MAP,
  USER_JOURNEY_PROJECT_LABEL_MAP,
  USER_JOURNEY_PROJECT_REPORT_MAP,
  USER_JOURNEY_PROJECT_VERSION_MAP,
  UserJourneyProjectFileKey,
  UserJourneyProjectKey,
} from './registry';
import { buildUserJourneyProjectData } from './transform';

const PROJECT_FILE_KEY_PATTERN = /^[A-Za-z0-9_-]+$/;
const isValidUserJourneyProjectFileKey = (
  project: string
): project is UserJourneyProjectFileKey =>
  Object.prototype.hasOwnProperty.call(
    USER_JOURNEY_PROJECT_REPORT_MAP,
    project
  );

const isValidUserJourneyProjectKey = (
  project: string
): project is UserJourneyProjectKey =>
  Object.prototype.hasOwnProperty.call(
    USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP,
    project
  );

const fetchUserJourneyReport = async (
  projectFileKey: UserJourneyProjectFileKey
) => {
  const response = await fetch(
    USER_JOURNEY_PROJECT_REPORT_MAP[projectFileKey],
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch UserJourney report: ${projectFileKey} (${response.status})`
    );
  }

  return (await response.json()) as BackendReportData;
};

const attachProjectRegistryMeta = (
  projectData: UserJourneyProjectData,
  projectFileKey: UserJourneyProjectFileKey
): UserJourneyProjectData => ({
  ...projectData,
  projectInfo: {
    ...projectData.projectInfo,
    name:
      projectData.projectInfo.name ||
      USER_JOURNEY_PROJECT_LABEL_MAP[
        USER_JOURNEY_PROJECT_KEY_MAP[projectFileKey]
      ],
    version: USER_JOURNEY_PROJECT_VERSION_MAP[projectFileKey],
  },
});

export const resolveUserJourneyProjectFileKey = (
  project: string | null | undefined
): UserJourneyProjectFileKey => {
  if (!project) {
    return USER_JOURNEY_FALLBACK_PROJECT;
  }

  let resolvedProject = project.trim();

  try {
    resolvedProject = decodeURIComponent(resolvedProject);
  } catch {
    resolvedProject = project.trim();
  }

  const normalizedProject = resolvedProject.replace(/\.json$/i, '');

  if (!PROJECT_FILE_KEY_PATTERN.test(normalizedProject)) {
    return USER_JOURNEY_FALLBACK_PROJECT;
  }

  if (isValidUserJourneyProjectFileKey(normalizedProject)) {
    return normalizedProject;
  }

  if (isValidUserJourneyProjectKey(normalizedProject)) {
    return USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP[normalizedProject];
  }

  return USER_JOURNEY_FALLBACK_PROJECT;
};

export const loadUserJourneyProjectData = async (
  project: string | null | undefined
): Promise<UserJourneyProjectData> => {
  const resolvedProject = resolveUserJourneyProjectFileKey(project);

  try {
    const report = await fetchUserJourneyReport(resolvedProject);
    const projectData = buildUserJourneyProjectData(report);

    return attachProjectRegistryMeta(projectData, resolvedProject);
  } catch (error) {
    if (resolvedProject !== USER_JOURNEY_FALLBACK_PROJECT) {
      const fallbackReport = await fetchUserJourneyReport(
        USER_JOURNEY_FALLBACK_PROJECT
      );
      const projectData = buildUserJourneyProjectData(fallbackReport);

      return attachProjectRegistryMeta(
        projectData,
        USER_JOURNEY_FALLBACK_PROJECT
      );
    }

    throw error;
  }
};
