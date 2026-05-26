export type RustRegionTab = 'developers' | 'projects';

export type RustLeaderboardType = 'developers' | 'organizations' | 'projects';

export interface RustRegionRow {
  key: string;
  排名: number;
  国家: string;
  数量: number;
  占比: string;
}

export interface RustOrganizationRow {
  key: string;
  排名: number;
  组织: string;
  所属国家: string;
  开发者数量: number;
  占比: string;
}

export interface RustOverviewResponse {
  metrics: {
    developersTotal: number;
    projectsTotal: number;
    organizationsTotal: number;
    countriesCount: number;
  };
  distributions: {
    developers: RustRegionRow[];
    projects: RustRegionRow[];
  };
}

export interface RustLeaderboardChartItem {
  key: string;
  name: string;
  value: number;
  share: number;
}

export interface RustLeaderboardResponse<
  T extends RustRegionRow | RustOrganizationRow
> {
  type: RustLeaderboardType;
  page: number;
  pageSize: number;
  total: number;
  items: T[];
  chartItems: RustLeaderboardChartItem[];
}
