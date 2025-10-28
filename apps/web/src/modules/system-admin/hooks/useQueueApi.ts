import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 队列数据类型定义
export interface QueueData {
  queue_type: string;
  queue: string;
  total: number;
  ready: number;
  unacknowledged: number;
  consumers: number;
  belong_to: string | null;
}

/**
 * 获取队列列表的API调用Hook
 */
export const useQueueList = () => {
  const fetchQueueList = async (): Promise<QueueData[]> => {
    const response = await axios.post('/api/v2/queue_server/queue_list');
    return response.data;
  };

  return useQuery<QueueData[], Error>({
    queryKey: ['queueList'],
    queryFn: fetchQueueList,
    staleTime: 30 * 10000, // 300秒内不重新获取
    refetchInterval: 30 * 10000, // 每300秒自动刷新
    refetchOnWindowFocus: false,
  });
};
