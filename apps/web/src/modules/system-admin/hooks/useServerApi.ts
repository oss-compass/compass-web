import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 服务器相关类型定义
export interface ApiServerData {
  id: number;
  server_id: string;
  hostname: string;
  ip_address: string;
  location: string;
  status: string; // "1" 表示在线
  use_for: string;
  belong_to: string;
  cpu_info: string;
  memory_info: string;
  storage_info: string;
  net_info: string;
  system_info: string;
  architecture_info: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  metric?: {
    cpu_percent: number;
    memory_percent: number;
    disk_percent: number;
    disk_io_read: number;
    disk_io_write: number;
    net_io_recv: number;
    net_io_sent: number;
  };
}

export interface MetricTableRequest {
  server_id: string;
  begin_time: string;
  end_time: string;
}

export interface MetricTableResponse {
  id: number;
  server_id: string;
  cpu_percent: number;
  memory_percent: number;
  disk_percent: number;
  disk_io_read: number;
  disk_io_write: number;
  net_io_recv: number;
  net_io_sent: number;
  created_at: string;
  updated_at: string;
}

/**
 * 获取服务器列表的API调用Hook
 * @param belongTo 所属机构
 * @param enabled 是否启用查询
 */
export const useServerList = (belongTo: string, enabled: boolean = true) => {
  const fetchServerList = async (): Promise<ApiServerData[]> => {
    const response = await axios.post('/api/v2/server/list', {
      belong_to: belongTo,
    });
    return response.data;
  };

  return useQuery<ApiServerData[], Error>({
    queryKey: ['serverList', belongTo],
    queryFn: fetchServerList,
    enabled: enabled && !!belongTo,
  });
};

/**
 * 获取服务器监控数据的API调用Hook
 * @param params 监控数据请求参数
 * @param enabled 是否启用查询
 */
export const useServerMetricData = (
  params: MetricTableRequest,
  enabled: boolean = true
) => {
  const fetchMetricData = async (): Promise<MetricTableResponse[]> => {
    try {
      const response = await fetch('/api/v2/server/metric_table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch metric data:', error);
      throw error;
    }
  };

  return useQuery<MetricTableResponse[], Error>({
    queryKey: [
      'serverMetricData',
      params.server_id,
      params.begin_time,
      params.end_time,
    ],
    queryFn: fetchMetricData,
    enabled:
      enabled && !!params.server_id && !!params.begin_time && !!params.end_time,
    retry: 1,
    staleTime: 30000, // 30秒内不重新获取
  });
};
