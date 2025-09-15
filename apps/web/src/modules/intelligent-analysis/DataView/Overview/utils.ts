import { DeveloperData } from './types';

// 项目名称映射表
export const PROJECT_NAME_MAP: Record<string, string> = {
  flutter: 'Flutter',
  ionic: 'Ionic',
  'react-native': 'RN',
  cef: 'CEF',
  electron: 'Electron',
  chromium: 'Chromium',
  'kmp-oh': 'KMP_OH',
};

// 项目显示名称映射
export const PROJECT_DISPLAY_NAME_MAP: Record<string, string> = {
  flutter: 'Flutter',
  ionic: 'Ionic',
  'react-native': 'React Native',
  cef: 'CEF',
  electron: 'Electron',
  chromium: 'Chromium',
  'kmp-oh': 'KMP OH',
};

/**
 * 获取项目数据
 * @param projectSlug - 项目 slug（如 'flutter', 'ionic'等）
 * @param useDetail - 是否使用详细数据，默认 false 使用 backup 数据
 * @returns Promise<any[]> - 项目数据数组
 */
export async function fetchProjectData(
  projectSlug: string,
  useDetail: boolean = false
): Promise<any[]> {
  try {
    const fileName = PROJECT_NAME_MAP[projectSlug];
    if (!fileName) {
      throw new Error(`Unknown project: ${projectSlug}`);
    }

    const suffix = useDetail ? '_detail.json' : '_backup.json';
    const url = `/test/intelligent-analysis-new/${fileName}${suffix}`;

    console.log(`Fetching data from: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${fileName} data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching project data for ${projectSlug}:`, error);
    return [];
  }
}

/**
 * 获取项目显示名称
 * @param projectSlug - 项目 slug
 * @returns 项目显示名称
 */
export function getProjectDisplayName(projectSlug: string): string {
  return PROJECT_DISPLAY_NAME_MAP[projectSlug] || projectSlug;
}

/**
 * 处理原始数据转换为 DeveloperData 格式
 * @param rawData - 原始数据数组
 * @param projectDisplayName - 项目显示名称
 * @returns DeveloperData[] - 处理后的数据
 */
export function processRawData(
  rawData: any[],
  projectDisplayName: string
): DeveloperData[] {
  if (!Array.isArray(rawData)) {
    return [];
  }

  return rawData.map((item, index) => {
    const userId = item.用户ID;
    const totalScore = parseFloat(item.总得分);

    // 判断是否为组织
    const isOrg = userId.startsWith('org:');

    return {
      用户ID: userId,
      总得分: totalScore,
      国家: item.国家,
      省: item.省,
      市: item.市,
      用户类型: isOrg ? '组织' : '开发者',
      排名: index + 1,
    };
  });
}
