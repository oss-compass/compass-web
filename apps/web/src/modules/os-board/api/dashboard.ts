import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { OsBoardDashboard, OsBoardMetric } from '../types';

// ========== 请求参数类型 ==========

export interface DashboardListRequest {
  page: number;
  per_page: number;
  keywords?: string;
  type?: 'community' | 'repo';
}

export interface DashboardByIdentifierRequest {
  identifier: string;
}

export interface DashboardModelAttribute {
  name: string;
  description: string;
  dashboard_model_info_id: number;
  dashboard_model_info_ident: string;
}

export interface DashboardMetricAttribute {
  name: string;
  dashboard_metric_info_ident: string;
  dashboard_model_info_ident: string;
  from_model: boolean;
  hidden: boolean;
  sort: number;
}

export interface DashboardCreateRequest {
  name: string;
  dashboard_type: 'repo' | 'community';
  repo_urls: string[];
  competitor_urls: string[];
  dashboard_models_attributes: DashboardModelAttribute[];
  dashboard_metrics_attributes: DashboardMetricAttribute[];
}

export interface DashboardUpdateRequest {
  id: string;
  name?: string;
  dashboard_type?: 'repo' | 'community';
  repo_urls?: string[];
  competitor_urls?: string[];
  dashboard_models_attributes?: DashboardModelAttribute[];
  dashboard_metrics_attributes?: DashboardMetricAttribute[];
  permissions?: Array<{
    userId: string;
    role: 'owner' | 'editor' | 'viewer';
  }>;
}

export interface DashboardDeleteRequest {
  id: string;
}

export interface ModelMetricListRequest {
  // 此接口暂无额外参数
}

// ========== 响应类型 ==========

export interface DashboardListResponse {
  items: OsBoardDashboard[];
  total_count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

// 指标信息
export interface DashboardMetricInfo {
  id: number;
  name: string;
  ident: string;
  category: string;
  from: string;
  default_weight: number;
  default_threshold: number;
  dashboard_model_info_id: number | null;
  created_at?: string;
  updated_at?: string;
}

// 模型信息
export interface DashboardModelInfo {
  id: number;
  name: string;
  description: string;
  ident: string;
  created_at: string;
  updated_at: string;
  dashboard_metric_infos: DashboardMetricInfo[];
}

// list_model_metric 接口响应
export interface ModelMetricListResponse {
  models: DashboardModelInfo[];
  independent_metrics: DashboardMetricInfo[];
}

export interface DashboardResponse {
  dashboard: OsBoardDashboard;
}

// ========== API 查询 hooks ==========

/**
 * 获取看板列表
 */
export const useDashboardList = (params: DashboardListRequest) => {
  return useQuery({
    queryKey: ['dashboardList', params],
    queryFn: async (): Promise<DashboardListResponse> => {
      const requestParams = { ...params };

      // 过滤掉空值参数
      if (!requestParams.keywords) {
        delete requestParams.keywords;
      }
      if (!requestParams.type) {
        delete requestParams.type;
      }

      const response = await axios.post(
        '/services/dashboard/list',
        requestParams
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 分钟
    refetchOnWindowFocus: false,
  });
};

/**
 * 根据 identifier 获取看板详情
 * 用于详情页加载看板基础数据
 */
export const useDashboardByIdentifier = (identifier: string | undefined) => {
  return useQuery({
    queryKey: ['dashboardByIdentifier', identifier],
    queryFn: async (): Promise<OsBoardDashboard> => {
      const response = await axios.post(
        '/services/dashboard/get_by_identifier',
        { identifier }
      );
      return response.data;
    },
    enabled: !!identifier, // 只有 identifier 存在时才发起请求
    staleTime: 2 * 60 * 1000, // 2 分钟
    refetchOnWindowFocus: false,
    retry: false, // 失败后不自动重试（可能是无权限）
  });
};

/**
 * 获取模型指标列表
 */
export const useModelMetricList = (params?: ModelMetricListRequest) => {
  return useQuery({
    queryKey: ['modelMetricList', params],
    queryFn: async (): Promise<ModelMetricListResponse> => {
      const response = await axios.post(
        '/services/dashboard/list_model_metric',
        params || {}
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 分钟
    refetchOnWindowFocus: false,
  });
};

// ========== API 修改 hooks ==========

/**
 * 创建看板
 */
export const useCreateDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      params: DashboardCreateRequest
    ): Promise<DashboardResponse> => {
      const response = await axios.post('/services/dashboard/create', params);
      return response.data;
    },
    onSuccess: () => {
      // 创建成功后，使看板列表缓存失效
      queryClient.invalidateQueries({ queryKey: ['dashboardList'] });
    },
  });
};

/**
 * 更新看板
 */
export const useUpdateDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      params: DashboardUpdateRequest
    ): Promise<DashboardResponse> => {
      const response = await axios.post('/services/dashboard/update', params);
      return response.data;
    },
    onSuccess: () => {
      // 更新成功后，使看板列表缓存失效
      queryClient.invalidateQueries({ queryKey: ['dashboardList'] });
    },
  });
};

/**
 * 删除看板
 */
export const useDeleteDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: DashboardDeleteRequest): Promise<void> => {
      const response = await axios.post('/services/dashboard/delete', params);
      return response.data;
    },
    onSuccess: () => {
      // 删除成功后，使看板列表缓存失效
      queryClient.invalidateQueries({ queryKey: ['dashboardList'] });
    },
  });
};

// ========== 直接调用的 API 函数（不使用 hooks） ==========

/**
 * 直接调用：获取看板列表
 */
export const fetchDashboardList = async (
  params: DashboardListRequest
): Promise<DashboardListResponse> => {
  const requestParams = { ...params };

  if (!requestParams.keywords) {
    delete requestParams.keywords;
  }
  if (!requestParams.type) {
    delete requestParams.type;
  }

  const response = await axios.post('/services/dashboard/list', requestParams);
  return response.data;
};

/**
 * 直接调用：获取模型指标列表
 */
export const fetchModelMetricList = async (
  params?: ModelMetricListRequest
): Promise<ModelMetricListResponse> => {
  const response = await axios.post(
    '/services/dashboard/list_model_metric',
    params || {}
  );
  return response.data;
};

/**
 * 直接调用：创建看板
 */
export const createDashboard = async (
  params: DashboardCreateRequest
): Promise<DashboardResponse> => {
  const response = await axios.post('/services/dashboard/create', params);
  return response.data;
};

/**
 * 直接调用：更新看板
 */
export const updateDashboard = async (
  params: DashboardUpdateRequest
): Promise<DashboardResponse> => {
  const response = await axios.post('/services/dashboard/update', params);
  return response.data;
};

/**
 * 直接调用：删除看板
 */
export const deleteDashboard = async (
  params: DashboardDeleteRequest
): Promise<void> => {
  const response = await axios.post('/services/dashboard/delete', params);
  return response.data;
};
