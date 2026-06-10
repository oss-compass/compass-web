import { useState, useEffect } from 'react';
import { UserDetailData, ParsedUserDetail, EcoData } from '../../types';
import { PROJECT_NAME_MAP } from '../../utils';

const USER_DETAIL_API_URL =
  'https://compute.lishengbao.com.cn/developer_discovery/detail';
const DEFAULT_PREVIOUS_YEAR = 2024;
const DEFAULT_CURRENT_YEAR = 2025;

/**
 * 用于获取和解析用户详情数据的 Hook
 * @param projectType 项目类型，用于确定加载哪个详情文件
 * @param userId 用户ID
 */
export const useUserDetail = (projectType: string, userId: string) => {
  const [detailData, setDetailData] = useState<ParsedUserDetail | null>(null);
  const [ecoChartsData, setEcoChartsData] = useState<EcoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDisplayYears = (
    rawData: Record<string, number | Record<string, number>>
  ) => {
    const years = Array.from(
      new Set(
        Object.keys(rawData)
          .flatMap((key) =>
            Array.from(key.matchAll(/\b(20\d{2})年/g)).map((match) =>
              Number(match[1])
            )
          )
          .filter((year) => Number.isFinite(year))
      )
    ).sort((a, b) => a - b);

    if (years.length >= 2) {
      return {
        previousYear: years[years.length - 2],
        currentYear: years[years.length - 1],
      };
    }

    if (years.length === 1) {
      return {
        previousYear: years[0] - 1,
        currentYear: years[0],
      };
    }

    return {
      previousYear: DEFAULT_PREVIOUS_YEAR,
      currentYear: DEFAULT_CURRENT_YEAR,
    };
  };

  // 解析生态详细图表数据
  const parseEcoChartsData = (
    rawData: Record<string, number | Record<string, number>>
  ): EcoData[] => {
    const ecosystems = new Set<string>();
    const { previousYear, currentYear } = getDisplayYears(rawData);

    // 提取所有生态名称 - 修改正则表达式以匹配用户数据格式
    Object.keys(rawData).forEach((key) => {
      // 匹配类似 "Flutter主仓得分"、"Flutter Candies生态得分"、"Pub.dev生态得分" 的模式
      const match = key.match(/^(.+?)(?:得分)$/);
      if (
        match &&
        !/\b20\d{2}年/.test(key) &&
        !key.includes('角色') &&
        !key.includes('代码Issue') &&
        !key.includes('协作影响力')
      ) {
        ecosystems.add(match[1]);
      }
    });

    return Array.from(ecosystems)
      .map((ecoName) => {
        const getScoreValue = (suffix: string): number => {
          const value = rawData[`${ecoName}${suffix}`];
          return typeof value === 'number' ? value : 0;
        };

        const getDetailValue = (suffix: string): Record<string, number> => {
          const value = rawData[`${ecoName}${suffix}`];
          return typeof value === 'object' && value !== null ? value : {};
        };

        return {
          name: ecoName,
          previousYear,
          currentYear,
          score2024: getScoreValue(`${previousYear}年得分`),
          score2025: getScoreValue(`${currentYear}年得分`),
          roleScore2024: getScoreValue(`${previousYear}年角色得分`),
          roleScore2025: getScoreValue(`${currentYear}年角色得分`),
          roleBreakdown2024: getDetailValue(`${previousYear}年角色得分拆解`),
          roleBreakdown2025: getDetailValue(`${currentYear}年角色得分拆解`),
          contributionScore2024: getScoreValue(
            `${previousYear}年代码Issue贡献得分`
          ),
          contributionScore2025: getScoreValue(
            `${currentYear}年代码Issue贡献得分`
          ),
          contributionBreakdown2024: getDetailValue(
            `${previousYear}年代码Issue贡献得分拆解`
          ),
          contributionBreakdown2025: getDetailValue(
            `${currentYear}年代码Issue贡献得分拆解`
          ),
          influenceScore2024: getScoreValue(`${previousYear}年协作影响力得分`),
          influenceScore2025: getScoreValue(`${currentYear}年协作影响力得分`),
          influenceBreakdown2024: getDetailValue(
            `${previousYear}年协作影响力得分拆解`
          ),
          influenceBreakdown2025: getDetailValue(
            `${currentYear}年协作影响力得分拆解`
          ),
        };
      })
      .filter((eco) => eco.name && eco.name.trim());
  };

  // 解析用户详情数据
  const parseUserDetail = (
    rawData: Record<string, number | Record<string, number>>
  ): ParsedUserDetail => {
    const { previousYear, currentYear } = getDisplayYears(rawData);
    // 提取基本信息
    const 基本信息 = {
      总得分: 0, // 需要计算或从其他地方获取
    };

    // 提取生态得分概览
    const ecosystems = new Set<string>();
    Object.keys(rawData).forEach((key) => {
      const match = key.match(/^(.+?)(?:得分|\d{4}年得分)$/);
      if (
        match &&
        !key.includes('角色') &&
        !key.includes('代码Issue') &&
        !key.includes('协作影响力')
      ) {
        ecosystems.add(match[1]);
      }
    });

    const 生态得分概览 = Array.from(ecosystems)
      .map((ecoName) => {
        const getScoreValue = (suffix: string): number => {
          const value = rawData[`${ecoName}${suffix}`];
          return typeof value === 'number' ? value : 0;
        };

        const totalScore = getScoreValue('得分');
        const score2024 = getScoreValue(`${previousYear}年得分`);
        const score2025 = getScoreValue(`${currentYear}年得分`);

        return {
          生态: ecoName,
          总得分: totalScore,
          上一年: previousYear,
          当前年: currentYear,
          年度得分2024: score2024,
          年度得分2025: score2025,
        };
      })
      .filter((eco) => eco.生态 && eco.生态.trim());

    // 计算总得分
    基本信息.总得分 =
      生态得分概览.reduce((sum, eco) => sum + eco.总得分, 0) /
      Math.max(生态得分概览.length, 1);

    // 提取生态详细图表数据
    const 生态详细图表 = Array.from(ecosystems)
      .map((ecoName) => {
        const getScoreValue = (suffix: string): number => {
          const value = rawData[`${ecoName}${suffix}`];
          return typeof value === 'number' ? value : 0;
        };

        const getDetailValue = (suffix: string): Record<string, number> => {
          const value = rawData[`${ecoName}${suffix}`];
          return typeof value === 'object' && value !== null ? value : {};
        };

        return {
          生态名称: ecoName,
          年度得分: {
            2024: getScoreValue(`${previousYear}年得分`),
            2025: getScoreValue(`${currentYear}年得分`),
          },
          角色得分: {
            2024: {
              总分: getScoreValue(`${previousYear}年角色得分`),
              拆解: getDetailValue(`${previousYear}年角色得分拆解`),
            },
            2025: {
              总分: getScoreValue(`${currentYear}年角色得分`),
              拆解: getDetailValue(`${currentYear}年角色得分拆解`),
            },
          },
          代码Issue贡献得分: {
            2024: {
              总分: getScoreValue(`${previousYear}年代码Issue贡献得分`),
              拆解: getDetailValue(`${previousYear}年代码Issue贡献得分拆解`),
            },
            2025: {
              总分: getScoreValue(`${currentYear}年代码Issue贡献得分`),
              拆解: getDetailValue(`${currentYear}年代码Issue贡献得分拆解`),
            },
          },
          协作影响力得分: {
            2024: {
              总分: getScoreValue(`${previousYear}年协作影响力得分`),
              拆解: getDetailValue(`${previousYear}年协作影响力得分拆解`),
            },
            2025: {
              总分: getScoreValue(`${currentYear}年协作影响力得分`),
              拆解: getDetailValue(`${currentYear}年协作影响力得分拆解`),
            },
          },
        };
      })
      .filter((eco) => eco.生态名称 && eco.生态名称.trim());

    return {
      userId,
      年份: {
        上一年: previousYear,
        当前年: currentYear,
      },
      基本信息,
      生态得分概览,
      生态详细图表,
    };
  };

  const parseJsonFromResponse = async (
    response: Response,
    emptyMessage: string,
    invalidMessage: string
  ) => {
    const responseText = await response.text();
    if (!responseText.trim()) {
      throw new Error(emptyMessage);
    }

    try {
      return JSON.parse(responseText);
    } catch {
      throw new Error(invalidMessage);
    }
  };

  const isUserDetailRecord = (
    value: unknown
  ): value is Record<string, number | Record<string, number> | string> => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return false;
    }

    const keys = Object.keys(value);
    return keys.some(
      (key) =>
        key === '用户ID' ||
        key === '用户类型' ||
        key === '总得分' ||
        key.includes('得分')
    );
  };

  const extractUserDetailFromApiResponse = (
    rawData: unknown,
    currentUserId: string
  ) => {
    if (!rawData || typeof rawData !== 'object' || Array.isArray(rawData)) {
      return null;
    }

    const root = rawData as Record<string, any>;
    const data =
      root.data && typeof root.data === 'object' && !Array.isArray(root.data)
        ? root.data
        : null;

    const candidates = [root[currentUserId], data?.[currentUserId], data, root];

    return candidates.find((candidate) => {
      if (!isUserDetailRecord(candidate)) {
        return false;
      }

      const candidateUserId =
        typeof candidate['用户ID'] === 'string' ? candidate['用户ID'] : null;

      return candidateUserId ? candidateUserId === currentUserId : true;
    });
  };

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!projectType || !userId) return;

      setLoading(true);
      setError(null);

      try {
        const fileName = `${PROJECT_NAME_MAP[projectType] || projectType}`;
        const requestUrl = `/test/intelligent-analysis-new/${fileName}/${userId
          .replace(':', '_')
          .replaceAll(' ', '_')}_main.json`;

        let userData: Record<
          string,
          number | Record<string, number> | string
        > | null = null;

        try {
          const apiResponse = await fetch(USER_DETAIL_API_URL, {
            method: 'POST',
            headers: {
              'X-API-Key': 'opensearch',
              'Content-Type': 'application/json',
              Accept: '*/*',
            },
            body: JSON.stringify({
              ecosystem: fileName,
              developer: userId,
            }),
          });

          if (apiResponse.ok) {
            const apiRawData = await parseJsonFromResponse(
              apiResponse,
              'API 用户详情数据为空',
              'API 用户详情数据解析失败'
            );
            userData = extractUserDetailFromApiResponse(apiRawData, userId);
          }
        } catch {}

        if (!userData) {
          const response = await fetch(requestUrl);
          if (!response.ok) {
            throw new Error(`当前仅提供前200个组织和开发者详情数据`);
          }

          const rawData = (await parseJsonFromResponse(
            response,
            '用户详情数据为空',
            `用户详情数据解析失败: ${requestUrl}`
          )) as UserDetailData;

          if (!rawData[userId]) {
            throw new Error(`用户 ${userId} 的详情数据不存在`);
          }

          userData = rawData[userId];
        }

        const normalizedUserData = { ...userData };
        delete normalizedUserData['用户ID'];
        delete normalizedUserData['总得分'];
        delete normalizedUserData['国家'];
        delete normalizedUserData['省'];
        delete normalizedUserData['市'];
        delete normalizedUserData['用户类型'];

        // 解析数据
        const parsedDetail = parseUserDetail(
          normalizedUserData as Record<string, number | Record<string, number>>
        );
        const ecoCharts = parseEcoChartsData(
          normalizedUserData as Record<string, number | Record<string, number>>
        );

        setDetailData(parsedDetail);
        setEcoChartsData(ecoCharts);
      } catch (err) {
        setDetailData(null);
        setEcoChartsData([]);
        const errorMessage =
          err instanceof Error ? err.message : '获取用户详情数据失败';
        setError(errorMessage);
        console.error('获取用户详情数据失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [projectType, userId]);

  return {
    detailData,
    ecoChartsData,
    loading,
    error,
  };
};
