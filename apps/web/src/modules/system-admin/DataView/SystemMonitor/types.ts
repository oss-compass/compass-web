// API返回的服务器数据结构
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

// 组件内部使用的服务器数据结构
export interface ServerData {
  key: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  cpu: number;
  memory: number;
  disk: number;
  diskIO: number;
  bandwidth: number;
  location: string;
  ip_address: string; // 新增公网IP字段
  use_for: string; // 新增服务器作用字段
  updated_at: string; // 新增更新时间字段
  role: 'compute' | 'storage' | 'network' | 'database' | 'cache';
  config: {
    cpu: string;
    memory: string;
    disk: string;
    network: string;
    os: string;
    architecture: string;
    system_info: string; // 新增操作系统信息字段
  };
  cpuTrend: number[];
  memoryTrend: number[];
  diskIOTrend: number[];
  bandwidthTrend: number[];
}

export interface MirrorSourceData {
  name: string;
  key: string;
  totalServers: number;
  onlineServers: number;
  servers: ServerData[];
}

// 监控详情API请求参数
export interface MetricTableRequest {
  server_id: string;
  begin_time: string;
  end_time: string;
}

// 监控详情API响应数据
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
