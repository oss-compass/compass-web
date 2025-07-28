import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Progress,
  Statistic,
  Tabs,
  Tag,
  Table,
  Modal,
  Button,
} from 'antd';
import {
  DatabaseOutlined,
  CloudServerOutlined,
  HddOutlined,
  WifiOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';

interface ServerData {
  key: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  cpu: number;
  memory: number;
  disk: number;
  diskIO: number;
  bandwidth: number;
  location: string;
  // 新增字段
  role: 'compute' | 'storage' | 'network' | 'database' | 'cache';
  config: {
    cpu: string;
    memory: string;
    disk: string;
    network: string;
    os: string;
    architecture: string;
  };
  // 添加趋势数据
  cpuTrend: number[];
  memoryTrend: number[];
  diskIOTrend: number[];
  bandwidthTrend: number[];
}

interface MirrorSourceData {
  name: string;
  key: string;
  totalServers: number;
  onlineServers: number;
  servers: ServerData[];
}

// 生成30天的趋势数据
const generateMonthlyTrendData = (
  baseValue: number,
  variance: number = 10
): number[] => {
  const data: number[] = [];
  for (let i = 0; i < 30; i++) {
    // 生成基于基础值的随机波动数据
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, Math.min(100, baseValue + randomVariance));
    data.push(Math.round(value * 10) / 10);
  }
  return data;
};

// 生成30天的带宽趋势数据
const generateBandwidthTrendData = (
  baseValue: number,
  variance: number = 20
): number[] => {
  const data: number[] = [];
  for (let i = 0; i < 30; i++) {
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariance);
    data.push(Math.round(value * 10) / 10);
  }
  return data;
};

// 生成30天的磁盘IO趋势数据
const generateDiskIOTrendData = (
  baseValue: number,
  variance: number = 30
): number[] => {
  const data: number[] = [];
  for (let i = 0; i < 30; i++) {
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariance);
    data.push(Math.round(value * 10) / 10);
  }
  return data;
};

const SystemMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gitee');
  const [modalVisible, setModalVisible] = useState(false);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);

  // 模拟镜像源数据
  const mirrorSources: MirrorSourceData[] = [
    {
      name: '开源中国',
      key: 'gitee',
      totalServers: 8,
      onlineServers: 7,
      servers: [
        {
          key: '1',
          name: 'gitee-node-01',
          status: 'online',
          cpu: 45.2,
          memory: 67.8,
          disk: 78.5,
          diskIO: 125.6,
          bandwidth: 89.3,
          location: '北京',
          role: 'compute',
          config: {
            cpu: 'Intel Xeon E5-2680 v4 (14核28线程)',
            memory: '64GB DDR4 ECC',
            disk: '2TB SSD + 4TB HDD',
            network: '10Gbps 以太网',
            os: 'CentOS 7.9',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(45.2, 8),
          memoryTrend: generateMonthlyTrendData(67.8, 6),
          diskIOTrend: generateDiskIOTrendData(125.6, 25),
          bandwidthTrend: generateBandwidthTrendData(89.3, 15),
        },
        {
          key: '2',
          name: 'gitee-node-02',
          status: 'online',
          cpu: 52.1,
          memory: 71.3,
          disk: 65.2,
          diskIO: 98.4,
          bandwidth: 76.8,
          location: '上海',
          role: 'storage',
          config: {
            cpu: 'Intel Xeon Silver 4214 (12核24线程)',
            memory: '128GB DDR4 ECC',
            disk: '8TB SSD RAID 10',
            network: '25Gbps 以太网',
            os: 'Ubuntu 20.04 LTS',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(52.1, 7),
          memoryTrend: generateMonthlyTrendData(71.3, 5),
          diskIOTrend: generateDiskIOTrendData(98.4, 20),
          bandwidthTrend: generateBandwidthTrendData(76.8, 12),
        },
        {
          key: '3',
          name: 'gitee-node-03',
          status: 'warning',
          cpu: 78.9,
          memory: 85.6,
          disk: 92.1,
          diskIO: 156.7,
          bandwidth: 45.2,
          location: '深圳',
          role: 'compute',
          config: {
            cpu: 'AMD EPYC 7542 (32核64线程)',
            memory: '256GB DDR4 ECC',
            disk: '4TB NVMe SSD',
            network: '40Gbps 以太网',
            os: 'Rocky Linux 8.5',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(78.9, 10),
          memoryTrend: generateMonthlyTrendData(85.6, 8),
          diskIOTrend: generateDiskIOTrendData(156.7, 35),
          bandwidthTrend: generateBandwidthTrendData(45.2, 10),
        },
        {
          key: '4',
          name: 'gitee-node-04',
          status: 'online',
          cpu: 38.7,
          memory: 54.2,
          disk: 43.8,
          diskIO: 87.3,
          bandwidth: 112.5,
          location: '广州',
          role: 'network',
          config: {
            cpu: 'Intel Xeon Gold 6248 (20核40线程)',
            memory: '96GB DDR4 ECC',
            disk: '1TB SSD + 2TB HDD',
            network: '100Gbps 以太网',
            os: 'CentOS 8.4',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(38.7, 6),
          memoryTrend: generateMonthlyTrendData(54.2, 5),
          diskIOTrend: generateDiskIOTrendData(87.3, 18),
          bandwidthTrend: generateBandwidthTrendData(112.5, 20),
        },
        {
          key: '5',
          name: 'gitee-node-05',
          status: 'online',
          cpu: 61.4,
          memory: 73.9,
          disk: 56.7,
          diskIO: 134.2,
          bandwidth: 98.1,
          location: '杭州',
          role: 'database',
          config: {
            cpu: 'Intel Xeon Platinum 8280 (28核56线程)',
            memory: '512GB DDR4 ECC',
            disk: '16TB SSD RAID 1',
            network: '50Gbps 以太网',
            os: 'Red Hat Enterprise Linux 8',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(61.4, 8),
          memoryTrend: generateMonthlyTrendData(73.9, 6),
          diskIOTrend: generateDiskIOTrendData(134.2, 28),
          bandwidthTrend: generateBandwidthTrendData(98.1, 15),
        },
        {
          key: '6',
          name: 'gitee-node-06',
          status: 'online',
          cpu: 29.8,
          memory: 41.5,
          disk: 67.3,
          diskIO: 76.9,
          bandwidth: 134.7,
          location: '成都',
          role: 'cache',
          config: {
            cpu: 'Intel Xeon E5-2650 v4 (12核24线程)',
            memory: '128GB DDR4 ECC',
            disk: '2TB NVMe SSD',
            network: '25Gbps 以太网',
            os: 'Ubuntu 22.04 LTS',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(29.8, 5),
          memoryTrend: generateMonthlyTrendData(41.5, 4),
          diskIOTrend: generateDiskIOTrendData(76.9, 15),
          bandwidthTrend: generateBandwidthTrendData(134.7, 25),
        },
        {
          key: '7',
          name: 'gitee-node-07',
          status: 'online',
          cpu: 55.3,
          memory: 68.7,
          disk: 81.4,
          diskIO: 145.8,
          bandwidth: 67.2,
          location: '西安',
          role: 'storage',
          config: {
            cpu: 'AMD EPYC 7443P (24核48线程)',
            memory: '192GB DDR4 ECC',
            disk: '12TB SSD RAID 5',
            network: '40Gbps 以太网',
            os: 'SUSE Linux Enterprise 15',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(55.3, 7),
          memoryTrend: generateMonthlyTrendData(68.7, 6),
          diskIOTrend: generateDiskIOTrendData(145.8, 30),
          bandwidthTrend: generateBandwidthTrendData(67.2, 12),
        },
        {
          key: '8',
          name: 'gitee-node-08',
          status: 'offline',
          cpu: 0,
          memory: 0,
          disk: 0,
          diskIO: 0,
          bandwidth: 0,
          location: '武汉',
          role: 'compute',
          config: {
            cpu: 'Intel Xeon Gold 6226R (16核32线程)',
            memory: '128GB DDR4 ECC',
            disk: '2TB SSD + 4TB HDD',
            network: '25Gbps 以太网',
            os: 'CentOS 7.9',
            architecture: 'x86_64',
          },
          cpuTrend: Array(30).fill(0),
          memoryTrend: Array(30).fill(0),
          diskIOTrend: Array(30).fill(0),
          bandwidthTrend: Array(30).fill(0),
        },
      ],
    },
    {
      name: '中科院',
      key: 'cas',
      totalServers: 8,
      onlineServers: 8,
      servers: [
        {
          key: '1',
          name: 'cas-node-01',
          status: 'online',
          cpu: 68.5,
          memory: 65.2,
          disk: 48.7,
          diskIO: 75.3,
          bandwidth: 152.1,
          location: '北京',
          role: 'compute',
          config: {
            cpu: 'Intel Xeon Platinum 8358 (32核64线程)',
            memory: '256GB DDR4 ECC',
            disk: '4TB NVMe SSD',
            network: '100Gbps InfiniBand',
            os: 'CentOS 8.5',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(68.5, 8),
          memoryTrend: generateMonthlyTrendData(65.2, 6),
          diskIOTrend: generateDiskIOTrendData(75.3, 18),
          bandwidthTrend: generateBandwidthTrendData(152.1, 25),
        },
        {
          key: '2',
          name: 'cas-node-02',
          status: 'online',
          cpu: 76.1,
          memory: 72.8,
          disk: 55.5,
          diskIO: 81.9,
          bandwidth: 161.5,
          location: '北京',
          role: 'storage',
          config: {
            cpu: 'AMD EPYC 7763 (64核128线程)',
            memory: '512GB DDR4 ECC',
            disk: '32TB SSD RAID 6',
            network: '200Gbps InfiniBand',
            os: 'Ubuntu 20.04 LTS',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(76.1, 9),
          memoryTrend: generateMonthlyTrendData(72.8, 7),
          diskIOTrend: generateDiskIOTrendData(81.9, 20),
          bandwidthTrend: generateBandwidthTrendData(161.5, 30),
        },
      ],
    },
    {
      name: '南大',
      key: 'nju',
      totalServers: 6,
      onlineServers: 5,
      servers: [
        {
          key: '1',
          name: 'nju-node-01',
          status: 'online',
          cpu: 55.3,
          memory: 58.9,
          disk: 35.2,
          diskIO: 62.1,
          bandwidth: 94.7,
          location: '南京',
          role: 'compute',
          config: {
            cpu: 'Intel Xeon Gold 6240 (18核36线程)',
            memory: '128GB DDR4 ECC',
            disk: '2TB SSD + 4TB HDD',
            network: '25Gbps 以太网',
            os: 'CentOS 7.9',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(55.3, 7),
          memoryTrend: generateMonthlyTrendData(58.9, 6),
          diskIOTrend: generateDiskIOTrendData(62.1, 15),
          bandwidthTrend: generateBandwidthTrendData(94.7, 18),
        },
        {
          key: '2',
          name: 'nju-node-02',
          status: 'online',
          cpu: 62.1,
          memory: 65.9,
          disk: 42.6,
          diskIO: 68.3,
          bandwidth: 101.9,
          location: '南京',
          role: 'database',
          config: {
            cpu: 'Intel Xeon Silver 4216 (16核32线程)',
            memory: '192GB DDR4 ECC',
            disk: '8TB SSD RAID 1',
            network: '40Gbps 以太网',
            os: 'Ubuntu 18.04 LTS',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(62.1, 8),
          memoryTrend: generateMonthlyTrendData(65.9, 6),
          diskIOTrend: generateDiskIOTrendData(68.3, 16),
          bandwidthTrend: generateBandwidthTrendData(101.9, 20),
        },
        {
          key: '3',
          name: 'nju-node-03',
          status: 'offline',
          cpu: 0,
          memory: 0,
          disk: 0,
          diskIO: 0,
          bandwidth: 0,
          location: '南京',
          role: 'network',
          config: {
            cpu: 'Intel Xeon E5-2690 v4 (14核28线程)',
            memory: '64GB DDR4 ECC',
            disk: '1TB SSD',
            network: '10Gbps 以太网',
            os: 'CentOS 7.8',
            architecture: 'x86_64',
          },
          cpuTrend: Array(30).fill(0),
          memoryTrend: Array(30).fill(0),
          diskIOTrend: Array(30).fill(0),
          bandwidthTrend: Array(30).fill(0),
        },
      ],
    },
    {
      name: '北大',
      key: 'pku',
      totalServers: 10,
      onlineServers: 9,
      servers: [
        {
          key: '1',
          name: 'pku-node-01',
          status: 'online',
          cpu: 61.8,
          memory: 68.5,
          disk: 38.2,
          diskIO: 69.7,
          bandwidth: 112.3,
          location: '北京',
          role: 'compute',
          config: {
            cpu: 'Intel Xeon Gold 6248R (24核48线程)',
            memory: '192GB DDR4 ECC',
            disk: '4TB NVMe SSD',
            network: '50Gbps 以太网',
            os: 'Red Hat Enterprise Linux 8',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(61.8, 8),
          memoryTrend: generateMonthlyTrendData(68.5, 7),
          diskIOTrend: generateDiskIOTrendData(69.7, 17),
          bandwidthTrend: generateBandwidthTrendData(112.3, 22),
        },
        {
          key: '2',
          name: 'pku-node-02',
          status: 'online',
          cpu: 66.6,
          memory: 75.1,
          disk: 44.8,
          diskIO: 76.1,
          bandwidth: 118.9,
          location: '北京',
          role: 'storage',
          config: {
            cpu: 'AMD EPYC 7502P (32核64线程)',
            memory: '256GB DDR4 ECC',
            disk: '16TB SSD RAID 5',
            network: '100Gbps 以太网',
            os: 'SUSE Linux Enterprise 15',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(66.6, 9),
          memoryTrend: generateMonthlyTrendData(75.1, 8),
          diskIOTrend: generateDiskIOTrendData(76.1, 19),
          bandwidthTrend: generateBandwidthTrendData(118.9, 24),
        },
        {
          key: '3',
          name: 'pku-node-03',
          status: 'warning',
          cpu: 78.9,
          memory: 85.2,
          disk: 48.7,
          diskIO: 89.3,
          bandwidth: 135.2,
          location: '北京',
          role: 'database',
          config: {
            cpu: 'Intel Xeon Platinum 8280L (28核56线程)',
            memory: '384GB DDR4 ECC',
            disk: '20TB SSD RAID 1',
            network: '100Gbps InfiniBand',
            os: 'Red Hat Enterprise Linux 8',
            architecture: 'x86_64',
          },
          cpuTrend: generateMonthlyTrendData(78.9, 10),
          memoryTrend: generateMonthlyTrendData(85.2, 8),
          diskIOTrend: generateDiskIOTrendData(89.3, 22),
          bandwidthTrend: generateBandwidthTrendData(135.2, 28),
        },
        {
          key: '4',
          name: 'pku-node-04',
          status: 'offline',
          cpu: 0,
          memory: 0,
          disk: 0,
          diskIO: 0,
          bandwidth: 0,
          location: '北京',
          role: 'cache',
          config: {
            cpu: 'Intel Xeon Gold 6230 (20核40线程)',
            memory: '128GB DDR4 ECC',
            disk: '4TB NVMe SSD',
            network: '25Gbps 以太网',
            os: 'CentOS 8.3',
            architecture: 'x86_64',
          },
          cpuTrend: Array(30).fill(0),
          memoryTrend: Array(30).fill(0),
          diskIOTrend: Array(30).fill(0),
          bandwidthTrend: Array(30).fill(0),
        },
      ],
    },
  ];

  const currentSource =
    mirrorSources.find((source) => source.key === activeTab) ||
    mirrorSources[0];

  // 弹窗处理函数
  const handleShowModal = (server: ServerData) => {
    setSelectedServer(server);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedServer(null);
  };

  // 配置信息弹窗处理函数
  const handleShowConfigModal = (server: ServerData) => {
    setSelectedServer(server);
    setConfigModalVisible(true);
  };

  const handleCloseConfigModal = () => {
    setConfigModalVisible(false);
    setSelectedServer(null);
  };

  // 获取角色配置
  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'compute':
        return { color: 'blue', icon: <ThunderboltOutlined />, text: '计算' };
      case 'storage':
        return { color: 'green', icon: <HddOutlined />, text: '存储' };
      case 'network':
        return { color: 'orange', icon: <WifiOutlined />, text: '网络' };
      case 'database':
        return { color: 'purple', icon: <DatabaseOutlined />, text: '数据库' };
      case 'cache':
        return { color: 'cyan', icon: <CloudServerOutlined />, text: '缓存' };
      default:
        return { color: 'default', icon: null, text: '未知' };
    }
  };

  // 获取状态颜色和图标
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return { color: 'green', icon: <CheckCircleOutlined />, text: '在线' };
      case 'warning':
        return {
          color: 'orange',
          icon: <ExclamationCircleOutlined />,
          text: '警告',
        };
      case 'offline':
        return {
          color: 'red',
          icon: <ExclamationCircleOutlined />,
          text: '离线',
        };
      default:
        return { color: 'default', icon: null, text: '未知' };
    }
  };

  // 获取带宽使用率颜色
  const getBandwidthColor = (value: number) => {
    if (value >= 120) return '#f5222d'; // 红色
    if (value >= 100) return '#faad14'; // 橙色
    if (value >= 80) return '#52c41a'; // 绿色
    return '#1890ff'; // 蓝色
  };

  // 服务器列表表格列配置
  const serverColumns = [
    {
      title: '服务器名称',
      dataIndex: 'name',
      key: 'name',
      width: '12%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '6%',
      render: (status: string) => {
        const config = getStatusConfig(status);
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: '6%',
    },
    {
      title: '服务器作用',
      dataIndex: 'role',
      key: 'role',
      width: '8%',
      render: (role: string) => {
        const config = getRoleConfig(role);
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'CPU使用率',
      dataIndex: 'cpu',
      key: 'cpu',
      width: '10%',
      render: (value: number) => (
        <div>
          <Progress percent={value} size="small" />
        </div>
      ),
    },
    {
      title: '内存使用率',
      dataIndex: 'memory',
      key: 'memory',
      width: '10%',
      render: (value: number) => (
        <div>
          <Progress percent={value} size="small" strokeColor="#52c41a" />
        </div>
      ),
    },
    {
      title: '磁盘使用率',
      dataIndex: 'disk',
      key: 'disk',
      width: '10%',
      render: (value: number) => (
        <div>
          <Progress percent={value} size="small" strokeColor="#faad14" />
        </div>
      ),
    },
    {
      title: '磁盘IO',
      dataIndex: 'diskIO',
      key: 'diskIO',
      width: '8%',
      render: (value: number) => `${value.toFixed(1)} MB/s`,
    },
    {
      title: '网络带宽',
      dataIndex: 'bandwidth',
      key: 'bandwidth',
      width: '8%',
      render: (value: number) => (
        <span style={{ color: getBandwidthColor(value) }}>
          {value.toFixed(1)} Mbps
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: '12%',
      render: (_: any, record: ServerData) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleShowModal(record)}
            disabled={record.status === 'offline'}
            size="small"
          >
            监控详情
          </Button>
          <Button
            type="link"
            icon={<CloudServerOutlined />}
            onClick={() => handleShowConfigModal(record)}
            size="small"
          >
            配置详情
          </Button>
        </div>
      ),
    },
  ];

  // 初始化单个服务器趋势图表
  const initServerTrendChart = (
    containerId: string,
    data: number[],
    title: string,
    color: string,
    unit: string
  ) => {
    const container = document.getElementById(containerId);
    if (container) {
      const chart = echarts.init(container);
      const option = {
        title: {
          text: title,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter: `{b}: {c}${unit}`,
        },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }),
          axisLabel: {
            fontSize: 10,
            rotate: 45,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 10,
            formatter: `{value}${unit}`,
          },
        },
        series: [
          {
            data: data,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: color,
            },
            itemStyle: {
              color: color,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: color + '40' },
                  { offset: 1, color: color + '10' },
                ],
              },
            },
          },
        ],
        grid: {
          left: '10%',
          right: '5%',
          bottom: '15%',
          top: '20%',
        },
      };
      chart.setOption(option);
      return () => chart.dispose();
    }
  };

  // 初始化弹窗中的所有趋势图表
  useEffect(() => {
    if (modalVisible && selectedServer) {
      const cleanupFunctions: (() => void)[] = [];

      setTimeout(() => {
        const cpuCleanup = initServerTrendChart(
          'modal-cpu-chart',
          selectedServer.cpuTrend,
          'CPU使用率趋势',
          '#1890ff',
          '%'
        );
        const memoryCleanup = initServerTrendChart(
          'modal-memory-chart',
          selectedServer.memoryTrend,
          '内存使用率趋势',
          '#52c41a',
          '%'
        );
        const diskIOCleanup = initServerTrendChart(
          'modal-diskio-chart',
          selectedServer.diskIOTrend,
          '磁盘IO趋势',
          '#faad14',
          'MB/s'
        );
        const bandwidthCleanup = initServerTrendChart(
          'modal-bandwidth-chart',
          selectedServer.bandwidthTrend,
          '网络带宽趋势',
          '#722ed1',
          'Mbps'
        );

        if (cpuCleanup) cleanupFunctions.push(cpuCleanup);
        if (memoryCleanup) cleanupFunctions.push(memoryCleanup);
        if (diskIOCleanup) cleanupFunctions.push(diskIOCleanup);
        if (bandwidthCleanup) cleanupFunctions.push(bandwidthCleanup);
      }, 100);

      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    }
  }, [modalVisible, selectedServer]);

  const tabItems = mirrorSources.map((source) => ({
    key: source.key,
    label: (
      <div className="flex items-center gap-2">
        <span>{source.name}</span>
        <Tag
          color={
            source.onlineServers === source.totalServers ? 'green' : 'orange'
          }
        >
          {source.onlineServers}/{source.totalServers}
        </Tag>
      </div>
    ),
    children: (
      <div>
        {/* 服务器详细信息 */}
        <Card title={`${source.name} 计算节点详情`}>
          <Table
            columns={serverColumns}
            dataSource={source.servers}
            pagination={false}
            size="small"
          />
        </Card>
      </div>
    ),
  }));

  return (
    <div className="p-6">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
      />

      {/* 服务器详情弹窗 */}
      <Modal
        title={selectedServer ? `${selectedServer.name} 详细监控` : ''}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {selectedServer && (
          <div>
            {/* 服务器基本信息 */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="CPU使用率"
                    value={selectedServer.cpu}
                    precision={1}
                    suffix="%"
                    valueStyle={{
                      color: selectedServer.cpu > 80 ? '#f5222d' : '#3f8600',
                    }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="内存使用率"
                    value={selectedServer.memory}
                    precision={1}
                    suffix="%"
                    valueStyle={{
                      color: selectedServer.memory > 80 ? '#f5222d' : '#3f8600',
                    }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="磁盘使用率"
                    value={selectedServer.disk}
                    precision={1}
                    suffix="%"
                    valueStyle={{
                      color: selectedServer.disk > 80 ? '#f5222d' : '#3f8600',
                    }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="网络带宽"
                    value={selectedServer.bandwidth}
                    precision={1}
                    suffix="Mbps"
                    valueStyle={{
                      color: getBandwidthColor(selectedServer.bandwidth),
                    }}
                  />
                </Card>
              </Col>
            </Row>

            {/* 趋势图表 */}
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card>
                  <div
                    id="modal-cpu-chart"
                    style={{ width: '100%', height: '200px' }}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card>
                  <div
                    id="modal-memory-chart"
                    style={{ width: '100%', height: '200px' }}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col xs={24} lg={12}>
                <Card>
                  <div
                    id="modal-diskio-chart"
                    style={{ width: '100%', height: '200px' }}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card>
                  <div
                    id="modal-bandwidth-chart"
                    style={{ width: '100%', height: '200px' }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* 服务器配置信息弹窗 */}
      <Modal
        title={selectedServer ? `${selectedServer.name} 配置信息` : ''}
        open={configModalVisible}
        onCancel={handleCloseConfigModal}
        footer={null}
        width={800}
        destroyOnClose
      >
        {selectedServer && (
          <div>
            {/* 服务器基本信息 */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
              <Col span={8}>
                <Card size="small" title="基本信息">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">服务器名称:</span>
                      <span className="font-medium">{selectedServer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">服务器作用:</span>
                      <span>
                        {(() => {
                          const config = getRoleConfig(selectedServer.role);
                          return (
                            <Tag color={config.color} icon={config.icon}>
                              {config.text}
                            </Tag>
                          );
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">部署位置:</span>
                      <span className="font-medium">
                        {selectedServer.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">运行状态:</span>
                      <span>
                        {(() => {
                          const config = getStatusConfig(selectedServer.status);
                          return (
                            <Tag color={config.color} icon={config.icon}>
                              {config.text}
                            </Tag>
                          );
                        })()}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="硬件配置">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPU:</span>
                      <span className="ml-2 flex-1 text-right font-medium">
                        {selectedServer.config.cpu}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">内存:</span>
                      <span className="font-medium">
                        {selectedServer.config.memory}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">存储:</span>
                      <span className="ml-2 flex-1 text-right font-medium">
                        {selectedServer.config.disk}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">网络:</span>
                      <span className="ml-2 flex-1 text-right font-medium">
                        {selectedServer.config.network}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="系统信息">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">操作系统:</span>
                      <span className="ml-2 flex-1 text-right font-medium">
                        {selectedServer.config.os}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">架构:</span>
                      <span className="font-medium">
                        {selectedServer.config.architecture}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* 当前资源使用情况 */}
            <Card title="当前资源使用情况" size="small">
              <Row gutter={16}>
                <Col span={6}>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {selectedServer.cpu.toFixed(1)}%
                    </div>
                    <div className="text-gray-600">CPU使用率</div>
                    <Progress
                      percent={selectedServer.cpu}
                      size="small"
                      strokeColor={
                        selectedServer.cpu > 80 ? '#f5222d' : '#1890ff'
                      }
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      {selectedServer.memory.toFixed(1)}%
                    </div>
                    <div className="text-gray-600">内存使用率</div>
                    <Progress
                      percent={selectedServer.memory}
                      size="small"
                      strokeColor={
                        selectedServer.memory > 80 ? '#f5222d' : '#52c41a'
                      }
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">
                      {selectedServer.disk.toFixed(1)}%
                    </div>
                    <div className="text-gray-600">磁盘使用率</div>
                    <Progress
                      percent={selectedServer.disk}
                      size="small"
                      strokeColor={
                        selectedServer.disk > 80 ? '#f5222d' : '#faad14'
                      }
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center">
                    <div
                      className="text-lg font-semibold"
                      style={{
                        color: getBandwidthColor(selectedServer.bandwidth),
                      }}
                    >
                      {selectedServer.bandwidth.toFixed(1)} Mbps
                    </div>
                    <div className="text-gray-600">网络带宽</div>
                    <div className="mt-1 text-xs text-gray-500">
                      磁盘IO: {selectedServer.diskIO.toFixed(1)} MB/s
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SystemMonitor;
