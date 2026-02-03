import { DetailedTableRowData } from '../types';
import {
  translateByLocale,
  ecosystemMapping,
} from '../../utils/countryMapping';

// 生成生态得分概览表格数据
export const generateEcosystemTableData = (
  detailData: any,
  locale?: string
) => {
  if (!detailData) return [];

  return detailData.生态得分概览.map((eco: any) => ({
    生态: locale
      ? translateByLocale(eco.生态, ecosystemMapping, locale)
      : eco.生态,
    生态年均分: eco.总得分,
    '2024 年得分': eco.年度得分2024,
    '2025 年得分': eco.年度得分2025,
  }));
};

// 生成统一的参与详情表格数据
export const generateParticipantTableData = (
  detailData: any,
  userId: string
): DetailedTableRowData[] => {
  const allParticipants: DetailedTableRowData[] = [];

  // 基于生态得分数据生成详细的参与者数据
  const ecosystems = detailData?.生态得分概览 || [];

  ecosystems.forEach((ecosystem: any, ecoIndex: number) => {
    // 为每个生态生成多个参与者记录
    const participantCount = Math.floor(Math.random() * 3) + 2; // 2-4 个参与者

    for (let i = 0; i < participantCount; i++) {
      const isOrganization = Math.random() > 0.6; // 60% 概率是组织
      const orgName = isOrganization ? `fluttercandies` : 'fluttercandies';

      allParticipants.push({
        组织名称: orgName,
        项目生态: ecosystem.生态,
        代码贡献总量: Math.floor(Math.random() * 10000) + 1000,
        Issue贡献总量: Math.floor(Math.random() * 1000) + 100,
        网络影响力2024: {
          社区核心度: Math.random(),
          协作影响力: Math.random(),
          联通控制力: Math.random(),
          PageRank: Math.random() * 0.1,
        },
        网络影响力2025: {
          社区核心度: Math.random(),
          协作影响力: Math.random(),
          联通控制力: Math.random(),
          PageRank: Math.random() * 0.1,
        },
        GitHub账号: `${userId}_${ecoIndex}_${i}`,
        填写的组织信息: isOrganization
          ? `${orgName} - 专注于${ecosystem.生态}开发`
          : '个人开发者',
        贡献的具体仓库: [
          `${ecosystem.生态.replace(/\s+/g, '_')}_repo_${i + 1}`,
          `${ecosystem.生态.replace(/\s+/g, '_')}_repo_${i + 2}`,
        ],
        角色2024: {
          代码贡献量: Math.floor(Math.random() * 5000) + 500,
          Issue贡献量: Math.floor(Math.random() * 500) + 50,
          生态占比: Math.random() * 0.8 + 0.2,
        },
        个人生态影响力2024: {
          社区核心度: Math.random(),
          协作影响力: Math.random(),
          联通控制力: Math.random(),
          PageRank: Math.random() * 0.05,
        },
        角色2025: {
          代码贡献量: Math.floor(Math.random() * 3000) + 300,
          Issue贡献量: Math.floor(Math.random() * 300) + 30,
          生态占比: Math.random() * 0.8 + 0.2,
        },
        个人生态影响力2025: {
          社区核心度: Math.random(),
          协作影响力: Math.random(),
          联通控制力: Math.random(),
          PageRank: Math.random() * 0.05,
        },
        projectRowSpan: 1,
        key: `${ecosystem.生态}-${i}-${ecoIndex}`,
      });
    }
  });

  // 按项目/生态排序
  allParticipants.sort((a, b) => a.项目生态.localeCompare(b.项目生态));

  // 计算需要合并的行
  const mergedData = allParticipants.map((item, idx) => {
    const prevItem = allParticipants[idx - 1];
    const shouldMergeWithPrev = prevItem && prevItem.项目生态 === item.项目生态;

    let rowSpan = 1;
    if (!shouldMergeWithPrev) {
      for (let i = idx + 1; i < allParticipants.length; i++) {
        if (allParticipants[i].项目生态 === item.项目生态) {
          rowSpan++;
        } else {
          break;
        }
      }
    }

    return {
      ...item,
      projectRowSpan: shouldMergeWithPrev ? 0 : rowSpan,
      key: `${item.项目生态}-${item.GitHub账号}-${idx}`,
    };
  });

  return mergedData;
};
