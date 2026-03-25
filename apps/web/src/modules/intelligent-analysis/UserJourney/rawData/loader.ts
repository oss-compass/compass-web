import { BackendReportData, UserJourneyProjectData } from '../types';
import {
  USER_JOURNEY_FALLBACK_PROJECT,
  USER_JOURNEY_PROJECT_REPORT_MAP,
  UserJourneyProjectFileKey,
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

  return isValidUserJourneyProjectFileKey(normalizedProject)
    ? normalizedProject
    : USER_JOURNEY_FALLBACK_PROJECT;
};

export const loadUserJourneyProjectData = async (
  project: string | null | undefined
): Promise<UserJourneyProjectData> => {
  const resolvedProject = resolveUserJourneyProjectFileKey(project);

  try {
    const report = await fetchUserJourneyReport(resolvedProject);

    return buildUserJourneyProjectData(report);
  } catch (error) {
    if (resolvedProject !== USER_JOURNEY_FALLBACK_PROJECT) {
      const fallbackReport = await fetchUserJourneyReport(
        USER_JOURNEY_FALLBACK_PROJECT
      );

      return buildUserJourneyProjectData(fallbackReport);
    }

    throw error;
  }
};
