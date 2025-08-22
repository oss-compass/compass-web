import { useState, useEffect } from 'react';
import { UserDetailData, ParsedUserDetail, EcoData } from '../../types';

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

  // 解析生态详细图表数据
  const parseEcoChartsData = (
    rawData: Record<string, number | Record<string, number>>
  ): EcoData[] => {
    const ecosystems = new Set<string>();

    // 提取所有生态名称 - 修改正则表达式以匹配用户数据格式
    Object.keys(rawData).forEach((key) => {
      // 匹配类似 "Flutter主仓得分"、"Flutter Candies生态得分"、"Pub.dev生态得分" 的模式
      const match = key.match(/^(.+?)(?:得分)$/);
      if (match && !key.includes('2024年') && !key.includes('2025年') && !key.includes('角色') && !key.includes('代码Issue') && !key.includes('协作影响力')) {
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

        // 角色得分数据
        const roleScore2024 = getScoreValue('2024年角色得分');
        const roleScore2025 = getScoreValue('2025年角色得分');
        const roleBreakdown2024 = getDetailValue('2024年角色得分拆解');
        const roleBreakdown2025 = getDetailValue('2025年角色得分拆解');

        // 代码Issue贡献得分数据
        const contributionScore2024 = getScoreValue('2024年代码Issue贡献得分');
        const contributionScore2025 = getScoreValue('2025年代码Issue贡献得分');
        const contributionBreakdown2024 =
          getDetailValue('2024年代码Issue贡献得分拆解');
        const contributionBreakdown2025 =
          getDetailValue('2025年代码Issue贡献得分拆解');

        // 协作影响力得分数据
        const influenceScore2024 = getScoreValue('2024年协作影响力得分');
        const influenceScore2025 = getScoreValue('2025年协作影响力得分');
        const influenceBreakdown2024 =
          getDetailValue('2024年协作影响力得分拆解');
        const influenceBreakdown2025 =
          getDetailValue('2025年协作影响力得分拆解');

        return {
          name: ecoName,
          score2024: getScoreValue('2024年得分'),
          score2025: getScoreValue('2025年得分'),
          roleScore2024,
          roleScore2025,
          roleBreakdown2024,
          roleBreakdown2025,
          contributionScore2024,
          contributionScore2025,
          contributionBreakdown2024,
          contributionBreakdown2025,
          influenceScore2024,
          influenceScore2025,
          influenceBreakdown2024,
          influenceBreakdown2025,
        };
      })
      .filter((eco) => eco.name && eco.name.trim());
  };

  // 解析用户详情数据
  const parseUserDetail = (
    rawData: Record<string, number | Record<string, number>>
  ): ParsedUserDetail => {
    // 提取基本信息
    const 基本信息 = {
      总得分: 0, // 需要计算或从其他地方获取
    };

    // 提取生态得分概览
    const ecosystems = new Set<string>();
    Object.keys(rawData).forEach((key) => {
      const match = key.match(/^(.+?)(?:得分|2024年得分|2025年得分)$/);
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
        const score2024 = getScoreValue('2024年得分');
        const score2025 = getScoreValue('2025年得分');

        return {
          生态: ecoName,
          总得分: totalScore,
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
            2024: getScoreValue('2024年得分'),
            2025: getScoreValue('2025年得分'),
          },
          角色得分: {
            2024: {
              总分: getScoreValue('2024年角色得分'),
              拆解: getDetailValue('2024年角色得分拆解'),
            },
            2025: {
              总分: getScoreValue('2025年角色得分'),
              拆解: getDetailValue('2025年角色得分拆解'),
            },
          },
          代码Issue贡献得分: {
            2024: {
              总分: getScoreValue('2024年代码Issue贡献得分'),
              拆解: getDetailValue('2024年代码Issue贡献得分拆解'),
            },
            2025: {
              总分: getScoreValue('2025年代码Issue贡献得分'),
              拆解: getDetailValue('2025年代码Issue贡献得分拆解'),
            },
          },
          协作影响力得分: {
            2024: {
              总分: getScoreValue('2024年协作影响力得分'),
              拆解: getDetailValue('2024年协作影响力得分拆解'),
            },
            2025: {
              总分: getScoreValue('2025年协作影响力得分'),
              拆解: getDetailValue('2025年协作影响力得分拆解'),
            },
          },
        };
      })
      .filter((eco) => eco.生态名称 && eco.生态名称.trim());

    return {
      userId,
      基本信息,
      生态得分概览,
      生态详细图表,
    };
  };

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!projectType || !userId) return;

      setLoading(true);
      setError(null);

      try {
        // 参考 utils.ts 的项目名称映射，用于将 slug 转为实际文件名前缀
        const PROJECT_NAME_MAP: Record<string, string> = {
          flutter: 'Flutter',
          ionic: 'Ionic',
          'react-native': 'RN',
          cef: 'CEF',
          electron: 'Electron',
          chromium: 'Chromium',
          'kmp-oh': 'KMP_OH',
        };
        const fileName = `${(PROJECT_NAME_MAP[projectType] || projectType)}_detail.json`;
        const response = await fetch(
          `/test/intelligent-analysis-new/${fileName}`
        );

        if (!response.ok) {
          throw new Error(`无法加载数据文件: ${fileName}`);
        }

        const rawData: UserDetailData = await response.json();

        // 检查用户是否存在
        if (!rawData[userId]) {
          throw new Error(`用户 ${userId} 的详情数据不存在`);
        }

        // 解析数据
        const parsedDetail = parseUserDetail(rawData[userId]);
        const ecoCharts = parseEcoChartsData(rawData[userId]);

        setDetailData(parsedDetail);
        setEcoChartsData(ecoCharts);
      } catch (err) {
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
