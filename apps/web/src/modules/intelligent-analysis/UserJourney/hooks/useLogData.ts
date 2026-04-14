import { useQuery } from '@tanstack/react-query';
import { compassApiFetch } from '../rawData/apiClient';

/** log 文件中单条 command */
export type LogCommand = {
  id: string;
  name: string;
  status: string;
  args?: string;
  output?: string;
  output_summary?: string;
  thought?: string;
  created_at?: string;
  duration_time?: string;
};

/** log 文件中单个 task 节点 */
export type LogTask = {
  name: string;
  id: string;
  belong_to_phase?: string;
  status: string;
  evidence?: {
    observations?: string[];
    pain_points?: string[];
  };
  commands?: LogCommand[];
};

/** log 文件整体结构 */
export type LogData = {
  _meta?: Record<string, string>;
  [taskId: string]: LogTask | Record<string, string> | undefined;
};

/**
 * 从后端 API 获取 log 数据，失败时回退到静态文件。
 */
const fetchLogData = async (
  projectFileKey: string
): Promise<LogData | null> => {
  // 优先调用后端 API
  try {
    return await compassApiFetch<LogData>(`/logs/${projectFileKey}`);
  } catch {
    // 后端不可用时回退到静态文件
    const staticUrl = `/data/intelligent-analysis/user-journey/log/log_${projectFileKey}.json`;
    const res = await fetch(staticUrl);
    if (!res.ok) return null;
    return res.json() as Promise<LogData>;
  }
};

/**
 * 加载指定项目的 log 数据。
 * 基于 react-query，相同 projectFileKey 在整个页面生命周期内只 fetch 一次。
 */
const useLogData = (projectFileKey: string | undefined): LogData | null => {
  const { data } = useQuery({
    queryKey: ['userJourneyLog', projectFileKey],
    queryFn: () => fetchLogData(projectFileKey!),
    enabled: !!projectFileKey,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return data ?? null;
};

export default useLogData;
