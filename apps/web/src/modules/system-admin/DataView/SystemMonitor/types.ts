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
  role: 'compute' | 'storage' | 'network' | 'database' | 'cache';
  config: {
    cpu: string;
    memory: string;
    disk: string;
    network: string;
    os: string;
    architecture: string;
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

export type DateRangeType = '7d' | '30d' | '90d' | '1y';
