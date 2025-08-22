// 项目数据类型
export interface ProjectData {
  name: string;
  developers: number;
  organizations: number;
  slug: string;
}

// 开发者数据类型（用于 Main 组件）
export interface DeveloperData {
  用户ID: string;
  总得分: number;
  国家: string;
  省: string;
  市: string;
  用户类型: string;
  排名: number;
}

// 开发者详情数据类型（用于 DetailPage）
export interface DeveloperDetail {
  用户ID: string;
  用户类型: string;
  国家: string;
  省: string;
  市: string;
  总得分: number;
  排名: number;
  全球排名: number;
  国内排名: number;
  生态得分: EcosystemScore[];
}

// 生态得分类型
export interface EcosystemScore {
  生态: string;
  生态年均分: number;
  '2024 年得分': number;
  '2025 年得分': number;
}

// 生态数据类型（用于图表）
export interface EcoData {
  name: string;
  score2024: number;
  score2025: number;
  roleScore2024: number;
  roleScore2025: number;
  roleBreakdown2024: Record<string, number>;
  roleBreakdown2025: Record<string, number>;
  contributionScore2024: number;
  contributionScore2025: number;
  contributionBreakdown2024: Record<string, number>;
  contributionBreakdown2025: Record<string, number>;
  influenceScore2024: number;
  influenceScore2025: number;
  influenceBreakdown2024: Record<string, number>;
  influenceBreakdown2025: Record<string, number>;
}

// 详情数据的原始结构（从 xx_detail.json 获取）
export interface UserDetailData {
  [userId: string]: {
    [key: string]: number | Record<string, number>;
  };
}

// 解析后的用户详情数据
export interface ParsedUserDetail {
  userId: string;
  基本信息: {
    总得分: number;
  };
  生态得分概览: {
    生态: string;
    总得分: number;
    年度得分2024: number;
    年度得分2025: number;
  }[];
  生态详细图表: {
    生态名称: string;
    年度得分: {
      2024: number;
      2025: number;
    };
    角色得分: {
      2024: {
        总分: number;
        拆解: Record<string, number>;
      };
      2025: {
        总分: number;
        拆解: Record<string, number>;
      };
    };
    代码Issue贡献得分: {
      2024: {
        总分: number;
        拆解: Record<string, number>;
      };
      2025: {
        总分: number;
        拆解: Record<string, number>;
      };
    };
    协作影响力得分: {
      2024: {
        总分: number;
        拆解: Record<string, number>;
      };
      2025: {
        总分: number;
        拆解: Record<string, number>;
      };
    };
  }[];
}
