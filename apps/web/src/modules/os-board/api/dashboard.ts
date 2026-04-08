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

export interface MetricsByIdentifierRequest {
  identifier: string;
  repo: string;
  level?: 'repo' | 'community';
  period: string;
  beginDate: string;
  endDate: string;
}

export interface MetricDataPoint {
  date: string;
  value: number;
  extra?: Record<string, any>;
}

export interface MetricData {
  id: number;
  name: string;
  ident: string;
  data: MetricDataPoint[];
}

export interface ModelScoreData {
  id: number | null;
  ident: string;
  data: MetricDataPoint[];
}

export interface MetricsByIdentifierResponse {
  metrics: MetricData[];
  model_scores: ModelScoreData[];
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

// ========== 用户管理 API ==========

export interface SearchUserRequest {
  keyword: string;
}

// 看板已授权用户列表请求
export interface AuthorizedUsersRequest {
  identifier: string;
  page?: number;
  per_page?: number;
  role?: 'viewer' | 'editor' | 'admin';
  keyword?: string;
}

// 看板已授权用户
export interface AuthorizedUserItem {
  id: number;
  member_id?: number;
  name: string;
  email?: string;
  avatar_url?: string;
  role: 'viewer' | 'editor' | 'admin';
  status?: string;
  joined_at?: string;
  invited_by?: string | null;
  is_owner?: boolean;
  remark?: string | null;
}

export interface AuthorizedUsersResponse {
  total: number;
  page: number;
  per_page: number;
  data: AuthorizedUserItem[];
}

/**
 * 获取看板已授权用户列表
 */
export const fetchAuthorizedUsers = async (
  params: AuthorizedUsersRequest
): Promise<AuthorizedUsersResponse> => {
  const response = await axios.post<AuthorizedUsersResponse>(
    '/services/dashboard/authorized_users',
    params
  );
  return response.data;
};

/**
 * Hook: 获取看板已授权用户列表
 */
export const useAuthorizedUsers = (
  params: AuthorizedUsersRequest,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['authorizedUsers', params],
    queryFn: () => fetchAuthorizedUsers(params),
    enabled: options?.enabled !== false && !!params.identifier,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
};

export interface SearchUserItem {
  id: number;
  name: string;
  email?: string;
}

export interface SearchUserResponse {
  total: number;
  page: number;
  per_page: number;
  data: SearchUserItem[];
}

export interface AssignMembersRequest {
  identifier: string;
  members: Array<{
    user_id: number;
    role: 'viewer' | 'editor';
  }>;
}

// role 字符串 → 后端数字映射
const roleToNumber = (role: 'viewer' | 'editor' | 'admin'): 0 | 1 | 2 => {
  if (role === 'editor') return 1;
  if (role === 'admin') return 2;
  return 0;
};

/**
 * 模糊查询用户
 */
export const searchUser = async (
  params: SearchUserRequest
): Promise<SearchUserItem[]> => {
  const response = await axios.post<SearchUserResponse>(
    '/services/dashboard/search_user',
    params
  );
  return response.data?.data ?? [];
};

/**
 * 分配用户权限（邀请用户）
 */
export const assignMembers = async (
  params: AssignMembersRequest
): Promise<void> => {
  const response = await axios.post(
    '/services/dashboard/assign_members',
    {
      ...params,
      members: params.members.map((m) => ({
        ...m,
        role: roleToNumber(m.role),
      })),
    }
  );
  return response.data;
};

/**
 * Hook: 模糊查询用户
 */
export const useSearchUser = () => {
  return useMutation({
    mutationFn: async (params: SearchUserRequest): Promise<SearchUserItem[]> => {
      return searchUser(params);
    },
  });
};

/**
 * Hook: 分配用户权限
 */
export const useAssignMembers = () => {
  return useMutation({
    mutationFn: async (params: AssignMembersRequest): Promise<void> => {
      return assignMembers(params);
    },
  });
};

// 修改成员权限
export interface UpdateMemberRolesRequest {
  identifier: string;
  members: Array<{
    member_id: number;
    role: 'viewer' | 'editor' | 'admin';
  }>;
}

/**
 * 修改成员权限
 */
export const updateMemberRoles = async (
  params: UpdateMemberRolesRequest
): Promise<void> => {
  const response = await axios.post(
    '/services/dashboard/update_member_roles',
    {
      ...params,
      members: params.members.map((m) => ({
        ...m,
        role: roleToNumber(m.role),
      })),
    }
  );
  return response.data;
};

/**
 * Hook: 修改成员权限
 */
export const useUpdateMemberRoles = () => {
  return useMutation({
    mutationFn: async (params: UpdateMemberRolesRequest): Promise<void> => {
      return updateMemberRoles(params);
    },
  });
};

// 删除成员
export interface RemoveMembersRequest {
  identifier: string;
  member_ids: number[];
}

/**
 * 删除成员
 */
export const removeMembers = async (
  params: RemoveMembersRequest
): Promise<void> => {
  const response = await axios.post(
    '/services/dashboard/remove_members',
    params
  );
  return response.data;
};

/**
 * Hook: 删除成员
 */
export const useRemoveMembers = () => {
  return useMutation({
    mutationFn: async (params: RemoveMembersRequest): Promise<void> => {
      return removeMembers(params);
    },
  });
};

/**
 * 直接调用：获取指标数据
 */
export const fetchMetricsByIdentifier = async (
  params: MetricsByIdentifierRequest
): Promise<MetricsByIdentifierResponse> => {
  const response = await axios.post(
    '/services/dashboard/get_metrics_by_identifier',
    params
  );
  return response.data;
};
