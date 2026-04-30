import { BackendReportData, UserJourneyProjectData } from '../types';
import {
  USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP,
  USER_JOURNEY_PROJECT_KEY_MAP,
  USER_JOURNEY_PROJECT_LABEL_MAP,
  USER_JOURNEY_PROJECT_REGISTRY,
  USER_JOURNEY_PROJECT_REPORT_MAP,
  USER_JOURNEY_PROJECT_VERSION_MAP,
  UserJourneyProjectFileKey,
  UserJourneyProjectKey,
} from './registry';
import { compassApiFetch } from './apiClient';

const GITHUB_REPORT_BASE =
  'https://github.com/oss-compass/Cogito/blob/main/developer_experience_agent/reports/';

/**
 * 从 hardware_access 字符串（如 "Ascend 910B"、"Ascend 910C "）提取目录名（如 "910b"、"910c"）
 * 规则：找到 "910" 后紧跟的字母，拼成小写；找不到则返回 null
 */
const extractHardwareDir = (
  hardwareAccess: string | undefined
): string | null => {
  if (!hardwareAccess) return null;
  const match = hardwareAccess.match(/910([A-Za-z])/i);
  if (!match) return null;
  return `910${match[1].toLowerCase()}`;
};
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
): Promise<BackendReportData> => {
  // 优先调用后端 API
  try {
    return await compassApiFetch<BackendReportData>(
      `/reports/${projectFileKey}`
    );
  } catch {
    // 后端不可用时回退到静态文件
    const staticUrl = USER_JOURNEY_PROJECT_REPORT_MAP[projectFileKey];
    if (!staticUrl) {
      throw new Error(`No report found for key: ${projectFileKey}`);
    }
    const response = await fetch(staticUrl, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch UserJourney report: ${projectFileKey} (${response.status})`
      );
    }
    return (await response.json()) as BackendReportData;
  }
};

export const attachProjectRegistryMeta = (
  projectData: UserJourneyProjectData,
  projectFileKey: UserJourneyProjectFileKey
): UserJourneyProjectData => {
  const registryEntry = USER_JOURNEY_PROJECT_REGISTRY[projectFileKey];
  const hardwareDir = extractHardwareDir(registryEntry?.hardware_access);
  const fallbackReportDetailUrl = hardwareDir
    ? `${GITHUB_REPORT_BASE}${hardwareDir}/Report_${projectFileKey}.md`
    : undefined;
  const reportDetailUrl =
    projectData.reportDetailUrl || fallbackReportDetailUrl;

  return {
    ...projectData,
    reportDetailUrl,
    projectInfo: {
      ...projectData.projectInfo,
      name:
        projectData.projectInfo.name ||
        USER_JOURNEY_PROJECT_LABEL_MAP[
          USER_JOURNEY_PROJECT_KEY_MAP[projectFileKey]
        ],
      version:
        USER_JOURNEY_PROJECT_VERSION_MAP[projectFileKey] ||
        projectData.projectInfo.version ||
        projectFileKey,
    },
  };
};

export const resolveUserJourneyProjectFileKey = (
  project: string | null | undefined
): UserJourneyProjectFileKey | null => {
  if (!project) {
    return null;
  }

  let resolvedProject = project.trim();

  try {
    resolvedProject = decodeURIComponent(resolvedProject);
  } catch {
    resolvedProject = project.trim();
  }

  const normalizedProject = resolvedProject.replace(/\.json$/i, '');

  if (!PROJECT_FILE_KEY_PATTERN.test(normalizedProject)) {
    return null;
  }

  if (isValidUserJourneyProjectFileKey(normalizedProject)) {
    return normalizedProject;
  }

  if (isValidUserJourneyProjectKey(normalizedProject)) {
    return USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP[normalizedProject];
  }

  return null;
};

export const loadUserJourneyProjectData = async (
  project: string | null | undefined
): Promise<UserJourneyProjectData> => {
  const resolvedProject = resolveUserJourneyProjectFileKey(project);

  if (!resolvedProject) {
    throw new Error(`Cannot resolve project: ${project}`);
  }

  const report = await fetchUserJourneyReport(resolvedProject);
  const projectData = buildUserJourneyProjectData(report);

  return attachProjectRegistryMeta(projectData, resolvedProject);
};
