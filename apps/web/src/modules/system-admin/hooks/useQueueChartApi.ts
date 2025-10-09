import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 队列图表数据接口
export interface QueueChartData {
  created_at: string;
  join_count: number;
  consume_count: number;
  total_count: number;
}

// 队列图表请求参数
export interface QueueChartParams {
  begin_date: string;
  end_date: string;
  queue_type?: string; // repo, repo_high_priority, group, group_high_priority
  is_all: number; // 0否 1全部队列
}

// 获取队列图表数据
const fetchQueueChartData = async (
  params: QueueChartParams
): Promise<QueueChartData[]> => {
  const response = await axios.post('/api/v2/queue_server/queue_table', params);
  return response.data;
};

// 自定义Hook：获取队列图表数据
export const useQueueChartData = (params: QueueChartParams) => {
  return useQuery({
    queryKey: ['queue-chart-data', params],
    queryFn: () => fetchQueueChartData(params),
    refetchInterval: 30000, // 每30秒刷新一次
    staleTime: 25000, // 25秒内认为数据是新鲜的
    enabled: !!params.begin_date && !!params.end_date, // 只有当日期参数存在时才执行查询
  });
};
