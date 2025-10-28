import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// TPC队列数据接口
export interface TpcQueueData {
  queue_type: string;
  queue: string;
  total: number;
  ready: number;
  unacknowledged: number;
  consumers: number;
  belong_to: string | null;
}

// 获取TPC队列列表
const fetchTpcQueueList = async (): Promise<TpcQueueData[]> => {
  const response = await axios.post('/api/v2/queue_server/tpc_queue_list');
  return response.data;
};

// 自定义Hook：获取TPC队列列表
export const useTpcQueueList = () => {
  return useQuery({
    queryKey: ['tpc-queue-list'],
    queryFn: fetchTpcQueueList,
    refetchInterval: 300000, // 每30秒刷新一次
    staleTime: 250000, // 25秒内认为数据是新鲜的
  });
};
