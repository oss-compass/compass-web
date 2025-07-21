import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import useDateParams from './useDateParams';

/**
 * 通用的系统管理员API请求Hook
 * @template TData 响应数据类型
 */
export function useAdminApi<TData>(
  url: string,
  queryKey: string,
  options?: Omit<
    UseQueryOptions<TData, Error, TData, (string | number)[]>,
    'queryKey' | 'queryFn'
  >
) {
  const { dateRange } = useDateParams();

  // 获取日期参数
  const begin_date = dateRange?.[0]?.format('YYYY-MM-DD') || '';
  const end_date = dateRange?.[1]?.format('YYYY-MM-DD') || '';

  const params = {
    begin_date,
    end_date,
    type: 0,
  };

  const fetchData = async () => {
    const response = await axios.post(url, params);
    return response.data as TData;
  };

  return useQuery<TData, Error>(
    [queryKey, begin_date, end_date].filter(Boolean),
    fetchData,
    {
      enabled: !!begin_date && !!end_date, // 只有当日期参数存在时才启用查询
      ...options,
    }
  );
}

// 类型定义
interface ChangeData {
  value: number;
  trend: 'up' | 'down' | 'flat';
}
interface UserOverviewData {
  monthly_visit_count: number;
  total_visit_count: number;
  sign_user: number;
  total_sign_user: number;
  new_users_count: number;
  total_users_count: number;
  average_monthly_user_duration: string;
  total_average_user_duration: string;
  monthly_visit_count_change: ChangeData;
  sign_user_change: ChangeData;
  new_users_count_change: ChangeData;
  average_monthly_user_duration_change: ChangeData;
}
// 具体的API调用hooks
export const useStatsData = (enabled: boolean = true) => {
  return useAdminApi<UserOverviewData>(
    '/api/v2/admin/user_overview',
    'user_overview',
    { enabled }
  );
};

// 具体的API调用hooks
export const useVisitData = (enabled: boolean = true) => {
  return useAdminApi<Array<{ date: string; value: number }>>(
    '/api/v2/admin/visit_count_table',
    'visitData',
    { enabled }
  );
};

export const useUserData = (enabled: boolean = true) => {
  return useAdminApi<{
    sign_users: Array<{ date: string; value: number }>;
    new_users: Array<{ date: string; value: number }>;
    stay_users: Array<{ date: string; value: number }>;
    active_users: Array<{ date: string; value: number }>;
    stay_rate: Array<{ date: string; value: number }>;
    transfer_rate: Array<{ date: string; value: number }>;
  }>('/api/v2/admin/user_count_table', 'userData', { enabled });
};

export const useDurationData = (enabled: boolean = true) => {
  return useAdminApi<Array<{ date: string; value: number }>>(
    '/api/v2/admin/user_duration_table',
    'durationData',
    { enabled }
  );
};

export const useServiceVisitData = (enabled: boolean = true) => {
  return useAdminApi<Array<{ name: string; value: number }>>(
    '/api/v2/admin/service_visit_table',
    'serviceVisitData',
    { enabled }
  );
};

export const useUserReferrerData = (enabled: boolean = true) => {
  return useAdminApi<Array<{ name: string; value: number }>>(
    '/api/v2/admin/user_referrer_table',
    'userReferrerData',
    { enabled }
  );
};

export const useOssSelectionClickData = (enabled: boolean = true) => {
  return useAdminApi<Array<{ name: string; value: number }>>(
    '/api/v2/admin/oss_selection_click_table',
    'ossSelectionClickData',
    { enabled }
  );
};

/**
 * 热门搜索排名数据Hook
 * @param type 搜索类型：'collection' 表示仓库/社区，'developer' 表示开发者
 * @param enabled 是否启用查询
 */
export const useCollectionSearchRankData = (
  type: 'collection' | 'developer',
  enabled: boolean = true
) => {
  const { dateRange } = useDateParams();

  // 获取日期参数
  const begin_date = dateRange?.[0]?.format('YYYY-MM-DD') || '';
  const end_date = dateRange?.[1]?.format('YYYY-MM-DD') || '';

  const params = {
    begin_date,
    end_date,
    type,
  };

  const fetchData = async () => {
    const response = await axios.post(
      '/api/v2/admin/collection_search_rank',
      params
    );
    return response.data as Array<{ name: string; value: number }>;
  };

  return useQuery<Array<{ name: string; value: number }>, Error>(
    ['collectionSearchRank', type, begin_date, end_date].filter(Boolean),
    fetchData,
    {
      enabled: enabled && !!begin_date && !!end_date,
    }
  );
};

/**
 * 数据中枢API排名数据Hook
 */
export const useDatahubApiRankData = (enabled: boolean = true) => {
  return useAdminApi<Array<{ name: string; desc: string; value: number }>>(
    '/api/v2/admin/datahub_api_rank',
    'datahubApiRankData',
    { enabled }
  );
};

/**
 * 数据中枢归档数据排名Hook
 */
export const useDatahubArchiveRankData = (enabled: boolean = true) => {
  return useAdminApi<Array<{ name: string; value: number }>>(
    '/api/v2/admin/datahub_archive_rank',
    'datahubArchiveRankData',
    { enabled }
  );
};

/**
 * 获取用户地区分布数据Hook
 */
export const useUserRegionData = (
  type: '0' | '1' = '0',
  enabled: boolean = true
) => {
  const { dateRange } = useDateParams();

  // 获取日期参数
  const begin_date = dateRange?.[0]?.format('YYYY-MM-DD') || '';
  const end_date = dateRange?.[1]?.format('YYYY-MM-DD') || '';

  const params = {
    begin_date,
    end_date,
    user_type: Number(type), // 添加type参数
    type: 0,
  };

  const fetchData = async () => {
    const response = await axios.post(
      '/api/v2/admin/user_region_table',
      params
    );
    return response.data as Array<{
      country: string;
      value: number;
      desc: string;
    }>;
  };

  return useQuery<
    Array<{ country: string; value: number; desc: string }>,
    Error
  >(['userRegionData', type, begin_date, end_date].filter(Boolean), fetchData, {
    enabled: enabled && !!begin_date && !!end_date,
  });
};

/**
 * 获取服务访问趋势数据Hook
 */
export const useServiceVisitTrendData = (enabled: boolean = true) => {
  return useAdminApi<
    Array<{
      date: string;
      modules: Array<{ name: string; value: number }>;
    }>
  >('/api/v2/admin/service_visit_trend_table', 'serviceVisitTrendData', {
    enabled,
  });
};
/**
 * 获取开源态势洞察访问数据Hook
 */
export const useOsSituationVisitData = (enabled: boolean = true) => {
  return useAdminApi<
    Array<{
      name: string[];
      value: number;
    }>
  >('/api/v2/admin/os_situation_visit_table', 'osSituationVisitData', {
    enabled,
  });
};

/**
 * 获取开源选型评估服务搜索明细数据Hook
 */
export interface OssSelectionSearchItem {
  module_type: string;
  content: {
    inputUrl?: string;
    description?: string;
    package_name?: string;
    src_ecosystem?: string;
    target_ecosystems?: string[];
    selectedLanguages?: string[];
  };
  user_id: number;
  user_name: string;
  searched_at: string;
}

export interface OssSelectionSearchResponse {
  data: OssSelectionSearchItem[];
  page: number;
  per_page: number;
  total: number;
}

export const useOssSelectionSearchData = (
  page: number = 1,
  perPage: number = 20,
  enabled: boolean = true
) => {
  const { dateRange } = useDateParams();

  // 获取日期参数
  const begin_date = dateRange?.[0]?.format('YYYY-MM-DD') || '';
  const end_date = dateRange?.[1]?.format('YYYY-MM-DD') || '';

  const params = {
    begin_date,
    end_date,
    page,
    per_page: perPage,
  };

  const fetchData = async () => {
    const response = await axios.post(
      '/api/v2/admin/oss_selection_search_table',
      params
    );
    return response.data as OssSelectionSearchResponse;
  };

  return useQuery<OssSelectionSearchResponse, Error>(
    ['ossSelectionSearchData', begin_date, end_date, page, perPage].filter(
      Boolean
    ),
    fetchData,
    {
      enabled: enabled && !!begin_date && !!end_date,
      keepPreviousData: true, // 保留之前的数据，提升用户体验
    }
  );
};

/**
 * 用户列表API响应数据类型
 */
export interface UserListApiResponse {
  total: number;
  page: number;
  per_page: number;
  data: Array<{
    id: number;
    name: string;
    email: string;
    last_sign_in_at: string;
    role_level: number;
    role_level_desc: string;
    created_at: string;
    ip?: string;
    country?: string;
    country_desc?: string;
    avg_stay_per_day?: number;
    click_stats?: Record<string, any>;
    report_count?: number;
  }>;
}

/**
 * 获取用户列表数据Hook
 */
export const useUserListData = (
  keywords: string = '',
  page: number = 1,
  perPage: number = 20,
  enabled: boolean = true
) => {
  const { dateRange } = useDateParams();

  // 获取日期参数
  const begin_date = dateRange?.[0]?.format('YYYY-MM-DD') || '';
  const end_date = dateRange?.[1]?.format('YYYY-MM-DD') || '';

  const params = {
    begin_date,
    end_date,
    keywords,
    page,
    per_page: perPage,
  };

  const fetchData = async () => {
    const response = await axios.post('/api/v2/admin/user_list', params);
    return response.data as UserListApiResponse;
  };

  return useQuery<UserListApiResponse, Error>(
    ['userList', begin_date, end_date, keywords, page, perPage].filter(Boolean),
    fetchData,
    {
      enabled: enabled && !!begin_date && !!end_date,
      keepPreviousData: true, // 保持之前的数据，避免分页时闪烁
    }
  );
};

/**
 * 中枢服务用户使用详情数据类型
 */
export interface DataHubUserUsageItem {
  user_id: number;
  user_name: string;
  user_email: string;
  api_name: string;
  api_desc: string;
  usage_count: number;
  last_used_at: string;
  country?: string;
  country_desc?: string;
}

export interface DataHubUserUsageResponse {
  total: number;
  page: number;
  per_page: number;
  data: DataHubUserUsageItem[];
}

/**
 * DataHub REST API列表项类型
 */
export interface DataHubRestApiItem {
  api_path: string;
  description: string;
}

/**
 * DataHub REST API表格数据项类型
 */
export interface DataHubRestApiTableItem {
  user_id: number;
  login_binds: {
    account: string;
    provider: string;
    nickname: string;
    avatar_url: string;
  };
  api_path: string;
  call_count: number;
  last_called_at: string;
}

/**
 * DataHub REST API表格响应类型
 */
export interface DataHubRestApiTableResponse {
  items: DataHubRestApiTableItem[];
  total_count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

/**
 * 获取DataHub REST API列表Hook
 */
export const useDataHubRestApiList = (enabled: boolean = true) => {
  const fetchData = async () => {
    const response = await axios.get('/api/v2/admin/datahub_restapi_list');
    return response.data as DataHubRestApiItem[];
  };

  return useQuery<DataHubRestApiItem[], Error>(
    ['dataHubRestApiList'],
    fetchData,
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5分钟内不重新获取
    }
  );
};

/**
 * 获取DataHub REST API表格数据Hook
 */
export const useDataHubRestApiTable = (
  page: number = 1,
  perPage: number = 20,
  apiPath: string = '',
  keywords: string = '',
  enabled: boolean = true
) => {
  const { dateRange } = useDateParams();

  // 获取日期参数
  const begin_date = dateRange?.[0]?.format('YYYY-MM-DD') || '2010-02-22';
  const end_date = dateRange?.[1]?.format('YYYY-MM-DD') || '2026-03-22';

  const params = {
    begin_date,
    end_date,
    keywords,
    api_path: apiPath,
    page,
    per_page: perPage,
  };

  const fetchData = async () => {
    const response = await axios.post(
      '/api/v2/admin/datahub_restapi_table',
      params
    );
    return response.data as DataHubRestApiTableResponse;
  };

  return useQuery<DataHubRestApiTableResponse, Error>(
    [
      'dataHubRestApiTable',
      begin_date,
      end_date,
      page,
      perPage,
      apiPath,
      keywords,
    ].filter(Boolean),
    fetchData,
    {
      enabled: enabled && !!begin_date && !!end_date,
      keepPreviousData: true,
    }
  );
};

/**
 * DataHub 归档数据下载量表格数据项类型
 */
export interface DataHubArchiveDownloadTableItem {
  user_id: number;
  login_binds: {
    account: string;
    provider: string;
    nickname: string;
    avatar_url: string;
  };
  call_count: number;
  last_called_at: string;
  dataset_name: string;
}

/**
 * DataHub 归档数据下载量表格响应类型
 */
export interface DataHubArchiveDownloadTableResponse {
  items: DataHubArchiveDownloadTableItem[];
  total_count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

/**
 * 获取DataHub 归档数据下载量表格数据Hook
 */
export const useDataHubArchiveDownloadTable = (
  page: number = 1,
  perPage: number = 20,
  datasetName: string = '',
  keywords: string = '',
  enabled: boolean = true
) => {
  const { dateRange } = useDateParams();

  // 获取日期参数
  const begin_date = dateRange?.[0]?.format('YYYY-MM-DD') || '2010-02-22';
  const end_date = dateRange?.[1]?.format('YYYY-MM-DD') || '2024-03-22';

  const params = {
    begin_date,
    end_date,
    keywords,
    dataset_name: datasetName,
    page,
    per_page: perPage,
  };

  const fetchData = async () => {
    const response = await axios.post(
      '/api/v2/admin/datahub_archive_download_table',
      params
    );
    return response.data as DataHubArchiveDownloadTableResponse;
  };

  return useQuery<DataHubArchiveDownloadTableResponse, Error>(
    [
      'dataHubArchiveDownloadTable',
      begin_date,
      end_date,
      page,
      perPage,
      datasetName,
      keywords,
    ].filter(Boolean),
    fetchData,
    {
      enabled: enabled && !!begin_date && !!end_date,
      keepPreviousData: true,
    }
  );
};

/**
 * 数据集列表项类型
 */
export interface DatasetItem {
  name: string;
  value: number;
}

/**
 * 获取数据集列表Hook（用于下拉选择器）
 * 如果没有专门的数据集列表接口，可以使用归档排名数据作为备选
 */
export const useDatasetList = (enabled: boolean = true) => {
  const fetchData = async () => {
    // 这里可以调用专门的数据集列表接口，或者从归档排名数据中获取
    const response = await axios.get('/api/v2/admin/dataset_list');
    return response.data as DatasetItem[];
  };

  return useQuery<DatasetItem[], Error>(['datasetList'], fetchData, {
    enabled,
    staleTime: 5 * 60 * 1000, // 5分钟内不重新获取
    retry: false, // 如果没有专门的数据集列表接口，不重试
  });
};
