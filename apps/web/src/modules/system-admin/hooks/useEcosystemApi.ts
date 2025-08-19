import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 更新时间分布接口响应类型
export interface UpdateOverviewResponse {
  within_1m: number;
  over_1m: number;
  over_3m: number;
  over_6m: number;
  over_12m: number;
}

// 平台分布接口响应类型
export interface PlatformOverviewResponse {
  gitcode_count: number;
  github_count: number;
  gitee_count: number;
}

// 项目类型枚举
export enum ProjectType {
  REPOSITORY = 0,
  COMMUNITY = 1,
}

// 仓库列表请求参数类型
export interface RepositoryListRequest {
  page: number;
  per_page: number;
  keywords?: string;
  time_type?: number;
  platform?: string;
}

// 仓库列表项类型
export interface RepositoryListItem {
  label: string;
  user_name: string | null;
  status: 'complete' | 'progress' | string;
  platform: string;
  updated_at: string;
  updated_status:
    | 'within_1m'
    | 'over_1m'
    | 'over_3m'
    | 'over_6m'
    | 'over_12m'
    | string;
}

// 仓库列表响应类型
export interface RepositoryListResponse {
  items: RepositoryListItem[];
  total_count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

// 时间类型枚举 (仓库专用)
export enum RepositoryTimeType {
  ONE_MONTH = 1,
  THREE_MONTHS = 3,
  SIX_MONTHS = 6,
  TWELVE_MONTHS = 12,
}

// 平台类型枚举 (仓库专用)
export enum RepositoryPlatformType {
  GITHUB = 'github',
  GITEE = 'gitee',
  GITLAB = 'gitlab',
  GITCODE = 'gitcode',
}

// 获取项目更新时间分布数据
export const useProjectUpdateCountData = (level: 'repo' | 'community') => {
  return useQuery({
    queryKey: ['projectUpdateCount', level],
    queryFn: async (): Promise<UpdateOverviewResponse> => {
      const response = await axios.post(
        '/api/v2/project_server/project_platform_update_count',
        {
          level,
        }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5分钟
    refetchOnWindowFocus: false,
  });
};

// 获取项目平台分布数据
export const useProjectPlatformCountData = (level: 'repo' | 'community') => {
  return useQuery({
    queryKey: ['projectPlatformCount', level],
    queryFn: async (): Promise<PlatformOverviewResponse> => {
      const response = await axios.post(
        '/api/v2/project_server/project_platform_count',
        {
          level,
        }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5分钟
    refetchOnWindowFocus: false,
  });
};

// 仓库项目更新时间分布
export const useRepositoryUpdateOverview = () => {
  return useProjectUpdateCountData('repo');
};

// 仓库项目平台分布
export const useRepositoryPlatformOverview = () => {
  return useProjectPlatformCountData('repo');
};

// 社区项目更新时间分布
export const useCommunityUpdateOverview = () => {
  return useProjectUpdateCountData('community');
};

// 社区项目平台分布
export const useCommunityPlatformOverview = () => {
  return useProjectPlatformCountData('community');
};

// 社区列表请求参数类型
export interface CommunityListRequest {
  page: number;
  per_page: number;
  keywords?: string;
  time_type?: number;
  platform?: string;
}

// 社区列表项类型
export interface CommunityListItem {
  label: string;
  user_name: string | null;
  status: 'complete' | 'progress' | string;
  platform: string;
  updated_at: string;
  updated_status:
    | 'within_1m'
    | 'over_1m'
    | 'over_3m'
    | 'over_6m'
    | 'over_12m'
    | string;
}

// 社区列表响应类型
export interface CommunityListResponse {
  items: CommunityListItem[];
  total_count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

// 时间类型枚举 (社区专用)
export enum CommunityTimeType {
  ONE_MONTH = 1,
  THREE_MONTHS = 3,
  SIX_MONTHS = 6,
  TWELVE_MONTHS = 12,
}

// 平台类型枚举 (社区专用)
export enum CommunityPlatformType {
  GITHUB = 'github',
  GITEE = 'gitee',
  GITLAB = 'gitlab',
  GITCODE = 'gitcode',
}

// 获取仓库列表
export const useRepositoryList = (params: RepositoryListRequest) => {
  return useQuery({
    queryKey: ['repositoryList', params],
    queryFn: async (): Promise<RepositoryListResponse> => {
      const requestParams = { ...params };

      // 过滤掉空值参数
      if (!requestParams.keywords) {
        delete requestParams.keywords;
      }
      if (!requestParams.time_type) {
        delete requestParams.time_type;
      }
      if (!requestParams.platform || requestParams.platform === 'all') {
        delete requestParams.platform;
      }

      const response = await axios.post(
        '/api/v2/project_server/repo_list',
        requestParams
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2分钟
    refetchOnWindowFocus: false,
  });
};

// 获取社区列表
export const useCommunityList = (params: CommunityListRequest) => {
  return useQuery({
    queryKey: ['communityList', params],
    queryFn: async (): Promise<CommunityListResponse> => {
      const requestParams = { ...params };

      // 过滤掉空值参数
      if (!requestParams.keywords) {
        delete requestParams.keywords;
      }
      if (!requestParams.time_type) {
        delete requestParams.time_type;
      }
      if (!requestParams.platform || requestParams.platform === 'all') {
        delete requestParams.platform;
      }

      const response = await axios.post(
        '/api/v2/project_server/community_list',
        requestParams
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2分钟
    refetchOnWindowFocus: false,
  });
};
