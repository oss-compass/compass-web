// 简化表格数据类型 - 与ParticipantDetails保持一致
export interface DetailedTableRowData {
  组织名称: string;
  项目生态: string;
  代码贡献总量: number;
  Issue贡献总量: number;
  网络影响力2024: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  网络影响力2025: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  GitHub账号: string;
  填写的组织信息: string;
  贡献的具体仓库: string[];
  角色2024: {
    代码贡献量: number;
    Issue贡献量: number;
    生态占比: number;
  };
  个人生态影响力2024: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  角色2025: {
    代码贡献量: number;
    Issue贡献量: number;
    生态占比: number;
  };
  个人生态影响力2025: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  projectRowSpan: number;
  key: string;
}

// 生态得分类型
export interface EcosystemScore {
  生态: string;
  生态年均分: number;
  '2024 年得分': number;
  '2025 年得分': number;
}
