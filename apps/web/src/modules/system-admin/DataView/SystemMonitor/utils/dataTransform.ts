import { ApiServerData, ServerData, MirrorSourceData } from '../types';
import {
  generateTrendData,
  generateBandwidthTrendData,
  generateDiskIOTrendData,
} from './dataUtils';

/**
 * 将API返回的服务器数据转换为组件内部使用的格式
 * @param apiData API返回的服务器数据
 * @returns 转换后的服务器数据
 */
export const transformApiServerData = (apiData: ApiServerData): ServerData => {
  // 解析内存信息，提取数字部分
  const parseMemory = (memoryInfo: string): number => {
    const match = memoryInfo.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // 解析存储信息，提取数字部分
  const parseStorage = (storageInfo: string): number => {
    const match = storageInfo.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // 解析网络信息，提取数字部分
  const parseNetwork = (netInfo: string): number => {
    const match = netInfo.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // 根据use_for字段确定角色
  const determineRole = (useFor: string): ServerData['role'] => {
    const lowerUseFor = useFor.toLowerCase();
    if (lowerUseFor.includes('计算')) return 'compute';
    if (lowerUseFor.includes('存储')) return 'storage';
    if (lowerUseFor.includes('网络')) return 'network';
    if (lowerUseFor.includes('数据库')) return 'database';
    if (lowerUseFor.includes('缓存')) return 'cache';
    return 'compute'; // 默认为计算节点
  };

  // 根据状态字符串确定状态
  const determineStatus = (status: string): ServerData['status'] => {
    return status === '1' ? 'online' : 'offline';
  };

  // 从API数据中获取实际的使用率数据，如果没有metric数据则返回0
  const getUsageData = () => {
    if (apiData.metric) {
      return {
        cpu: apiData.metric.cpu_percent || 0,
        memory: apiData.metric.memory_percent || 0,
        disk: apiData.metric.disk_percent || 0,
        diskIO:
          (apiData.metric.disk_io_read || 0) +
          (apiData.metric.disk_io_write || 0),
        bandwidth:
          (apiData.metric.net_io_recv || 0) + (apiData.metric.net_io_sent || 0),
      };
    }
    // 如果没有metric数据，返回0值
    return {
      cpu: 0,
      memory: 0,
      disk: 0,
      diskIO: 0,
      bandwidth: 0,
    };
  };

  const usageData = getUsageData();

  return {
    key: apiData.id.toString(),
    name: apiData.server_id,
    status: determineStatus(apiData.status),
    cpu: usageData.cpu,
    memory: usageData.memory,
    disk: usageData.disk,
    diskIO: usageData.diskIO,
    bandwidth: usageData.bandwidth,
    location: apiData.location,
    ip_address: apiData.ip_address, // 新增公网IP字段
    use_for: apiData.use_for, // 新增服务器作用字段
    updated_at: apiData.updated_at, // 新增更新时间字段
    role: determineRole(apiData.use_for),
    config: {
      cpu: apiData.cpu_info,
      memory: apiData.memory_info,
      disk: apiData.storage_info,
      network: apiData.net_info,
      os: apiData.system_info,
      architecture: apiData.architecture_info,
      system_info: apiData.system_info, // 新增操作系统信息字段
    },
    cpuTrend: generateTrendData(usageData.cpu, 8, 365),
    memoryTrend: generateTrendData(usageData.memory, 6, 365),
    diskIOTrend: generateDiskIOTrendData(usageData.diskIO, 25, 365),
    bandwidthTrend: generateBandwidthTrendData(usageData.bandwidth, 15, 365),
  };
};

/**
 * 根据belong_to字段对服务器进行分组，生成镜像源数据
 * @param apiDataList API返回的服务器数据列表
 * @returns 分组后的镜像源数据
 */
export const groupServersByBelongTo = (
  apiDataList: ApiServerData[]
): MirrorSourceData[] => {
  const groupedData: { [key: string]: ApiServerData[] } = {};

  // 按belong_to分组
  apiDataList.forEach((server) => {
    const belongTo = server.belong_to;
    if (!groupedData[belongTo]) {
      groupedData[belongTo] = [];
    }
    groupedData[belongTo].push(server);
  });

  // 转换为MirrorSourceData格式
  return Object.entries(groupedData).map(([belongTo, servers]) => {
    const transformedServers = servers.map(transformApiServerData);
    const onlineServers = transformedServers.filter(
      (server) => server.status === 'online'
    ).length;

    return {
      name: belongTo,
      key: belongTo.toLowerCase().replace(/\s+/g, '_'), // 生成key
      totalServers: servers.length,
      onlineServers,
      servers: transformedServers,
    };
  });
};
