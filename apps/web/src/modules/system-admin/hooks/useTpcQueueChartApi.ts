import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 定义TPC队列图表数据接口
export interface TpcQueueChartData {
  created_at: string;
  join_count: number;
  consume_count: number;
  total_count: number;
}

// 定义TPC队列图表请求参数接口
export interface TpcQueueChartParams {
  begin_date: string;
  end_date: string;
  queue_type: string;
  is_all: number;
}

/**
 * Custom hook to fetch TPC queue chart data.
 * @param params - The request parameters for TPC queue chart data
 * @returns useQueryResult containing TPC queue chart data, loading state, and error.
 */
export const useTpcQueueChartData = (params: TpcQueueChartParams) => {
  return useQuery<TpcQueueChartData[], Error>({
    queryKey: ['tpcQueueChartData', params],
    queryFn: async () => {
      const response = await axios.post('/api/v2/queue_server/tpc_queue_table', params);
      return response.data;
    },
    // Refetch every 30 seconds
    refetchInterval: 30000,
  });
};