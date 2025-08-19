import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 更新时间分布接口响应类型
export interface SelectionUpdateOverviewResponse {
  total: number;
  updated_within_one_month: number;
  updated_within_three_months: number;
  updated_within_six_months: number;
  updated_within_twelve_months: number;
  updated_over_twelve_months: number;
}

// 平台分布接口响应类型
export interface SelectionPlatformOverviewResponse {
  gitcode_count: number;
  github_count: number;
  gitee_count: number;
}

// 项目类型枚举 (0: 孵化项目, 1: 毕业项目)
export enum SelectionProjectType {
  INCUBATION = 0,
  GRADUATION = 1,
}

// 时间类型枚举
export enum TimeType {
  ONE_MONTH = '0',
  THREE_MONTHS = '1',
  SIX_MONTHS = '3',
  TWELVE_MONTHS = '6',
  ALL_TIME = '12',
}

// 平台类型枚举
export enum PlatformType {
  ALL = 'all',
  GITHUB = 'github',
  GITEE = 'gitee',
  GITLAB = 'gitlab',
}

// 项目状态映射
export const PROJECT_STATE_MAP = {
  0: '待澄清',
  1: '待确认',
  2: '待审批',
  3: '已通过',
  4: '待QA确认',
  '-1': '已拒绝',
} as const;

// 基础请求参数类型
export interface BaseRequestParams {
  time_type?: string;
  platform?: string;
}

// 项目列表API请求参数类型
export interface ProjectListRequest extends BaseRequestParams {
  page: number;
  per_page: number;
  keywords?: string;
}

// 概览API请求参数类型
export interface OverviewRequestParams extends BaseRequestParams {
  type: SelectionProjectType;
}

// 登录绑定信息类型
export interface LoginBind {
  account: string;
  provider: string;
  nickname: string;
  avatar_url: string;
}

// 项目列表项类型
export interface ProjectListItem {
  report_id: number;
  user_name: string;
  state: number;
  name: string;
  platform: string;
  code_url: string;
  created_at: string;
  updated_at: string;
  login_binds: LoginBind;
}

// 项目列表API响应类型
export interface ProjectListResponse {
  items: ProjectListItem[];
  total_count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

// 获取选择评估更新时间分布数据
export const useSelectionUpdateOverviewData = (
  type: SelectionProjectType,
  timeType?: string,
  platform?: string
) => {
  return useQuery({
    queryKey: ['selectionUpdateOverview', type, timeType, platform],
    queryFn: async (): Promise<SelectionUpdateOverviewResponse> => {
      const requestParams: OverviewRequestParams = { type };

      if (timeType && timeType !== TimeType.ALL_TIME) {
        requestParams.time_type = timeType;
      }

      if (platform && platform !== PlatformType.ALL) {
        requestParams.platform = platform;
      }

      const response = await axios.post(
        '/api/v2/project_server/update_overview',
        requestParams
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5分钟
    refetchOnWindowFocus: false,
  });
};

// 获取选择评估平台分布数据
export const useSelectionPlatformOverviewData = (
  type: SelectionProjectType,
  timeType?: string,
  platform?: string
) => {
  return useQuery({
    queryKey: ['selectionPlatformOverview', type, timeType, platform],
    queryFn: async (): Promise<SelectionPlatformOverviewResponse> => {
      const requestParams: OverviewRequestParams = { type };

      if (timeType && timeType !== TimeType.ALL_TIME) {
        requestParams.time_type = timeType;
      }

      if (platform && platform !== PlatformType.ALL) {
        requestParams.platform = platform;
      }

      const response = await axios.post(
        '/api/v2/project_server/overview',
        requestParams
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5分钟
    refetchOnWindowFocus: false,
  });
};

// 孵化项目更新时间分布
export const useIncubationUpdateOverview = (
  timeType?: string,
  platform?: string
) => {
  return useSelectionUpdateOverviewData(
    SelectionProjectType.INCUBATION,
    timeType,
    platform
  );
};

// 孵化项目平台分布
export const useIncubationPlatformOverview = (
  timeType?: string,
  platform?: string
) => {
  return useSelectionPlatformOverviewData(
    SelectionProjectType.INCUBATION,
    timeType,
    platform
  );
};

// 毕业项目更新时间分布
export const useGraduationUpdateOverview = (
  timeType?: string,
  platform?: string
) => {
  return useSelectionUpdateOverviewData(
    SelectionProjectType.GRADUATION,
    timeType,
    platform
  );
};

// 毕业项目平台分布
export const useGraduationPlatformOverview = (
  timeType?: string,
  platform?: string
) => {
  return useSelectionPlatformOverviewData(
    SelectionProjectType.GRADUATION,
    timeType,
    platform
  );
};

// 获取孵化项目列表
export const useIncubationProjectList = (params: ProjectListRequest) => {
  return useQuery({
    queryKey: ['incubationProjectList', params],
    queryFn: async (): Promise<ProjectListResponse> => {
      const requestParams = { ...params };

      // 只有非默认值时才添加到请求参数中
      if (
        !requestParams.time_type ||
        requestParams.time_type === TimeType.ALL_TIME
      ) {
        delete requestParams.time_type;
      }

      if (
        !requestParams.platform ||
        requestParams.platform === PlatformType.ALL
      ) {
        delete requestParams.platform;
      }

      const response = await axios.post(
        '/api/v2/project_server/incubation_list',
        requestParams
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2分钟
    refetchOnWindowFocus: false,
  });
};

// 获取毕业项目列表
export const useGraduationProjectList = (params: ProjectListRequest) => {
  return useQuery({
    queryKey: ['graduationProjectList', params],
    queryFn: async (): Promise<ProjectListResponse> => {
      const requestParams = { ...params };

      // 只有非默认值时才添加到请求参数中
      if (
        !requestParams.time_type ||
        requestParams.time_type === TimeType.ALL_TIME
      ) {
        delete requestParams.time_type;
      }

      if (
        !requestParams.platform ||
        requestParams.platform === PlatformType.ALL
      ) {
        delete requestParams.platform;
      }

      const response = await axios.post(
        '/api/v2/project_server/graduation_list',
        requestParams
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2分钟
    refetchOnWindowFocus: false,
  });
};
