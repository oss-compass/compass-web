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
export const useUserRegionData = (enabled: boolean = true) => {
  return useAdminApi<Array<{ country: string; value: number; desc: string }>>(
    '/api/v2/admin/user_region_table',
    'userRegionData',
    { enabled }
  );
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
