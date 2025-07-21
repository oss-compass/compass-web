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

const SystemMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gitee');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);

  // 模拟镜像源数据
  const mirrorSources: MirrorSourceData[] = [
    {
      name: 'Gitee',
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
          cpuTrend: [42, 45, 48, 44, 46, 43, 47, 45, 49, 46, 44, 45],
          memoryTrend: [65, 67, 69, 66, 68, 65, 70, 67, 71, 68, 66, 67],
          diskIOTrend: [
            120, 125, 130, 122, 128, 123, 132, 125, 135, 128, 124, 125,
          ],
          bandwidthTrend: [85, 89, 92, 87, 91, 86, 94, 89, 96, 91, 88, 89],
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
          cpuTrend: [50, 52, 55, 51, 53, 50, 54, 52, 56, 53, 51, 52],
          memoryTrend: [69, 71, 74, 70, 72, 69, 75, 71, 76, 72, 70, 71],
          diskIOTrend: [95, 98, 102, 96, 100, 97, 105, 98, 108, 100, 96, 98],
          bandwidthTrend: [74, 76, 79, 75, 78, 74, 81, 76, 83, 78, 75, 76],
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
          cpuTrend: [76, 78, 82, 77, 80, 76, 83, 78, 85, 80, 77, 78],
          memoryTrend: [83, 85, 88, 84, 87, 83, 90, 85, 92, 87, 84, 85],
          diskIOTrend: [
            152, 156, 162, 154, 159, 153, 165, 156, 168, 159, 155, 156,
          ],
          bandwidthTrend: [43, 45, 48, 44, 47, 43, 50, 45, 52, 47, 44, 45],
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
          cpuTrend: [36, 38, 41, 37, 40, 36, 42, 38, 44, 40, 37, 38],
          memoryTrend: [52, 54, 57, 53, 56, 52, 58, 54, 60, 56, 53, 54],
          diskIOTrend: [84, 87, 91, 85, 89, 84, 93, 87, 96, 89, 85, 87],
          bandwidthTrend: [
            110, 112, 116, 111, 115, 110, 118, 112, 121, 115, 111, 112,
          ],
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
          cpuTrend: [59, 61, 64, 60, 63, 59, 65, 61, 67, 63, 60, 61],
          memoryTrend: [71, 73, 76, 72, 75, 71, 77, 73, 79, 75, 72, 73],
          diskIOTrend: [
            130, 134, 139, 132, 137, 131, 141, 134, 144, 137, 133, 134,
          ],
          bandwidthTrend: [96, 98, 102, 97, 101, 96, 104, 98, 106, 101, 97, 98],
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
          cpuTrend: [27, 29, 32, 28, 31, 27, 33, 29, 35, 31, 28, 29],
          memoryTrend: [39, 41, 44, 40, 43, 39, 45, 41, 47, 43, 40, 41],
          diskIOTrend: [74, 76, 80, 75, 79, 74, 82, 76, 84, 79, 75, 76],
          bandwidthTrend: [
            132, 134, 138, 133, 137, 132, 140, 134, 142, 137, 133, 134,
          ],
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
          cpuTrend: [53, 55, 58, 54, 57, 53, 59, 55, 61, 57, 54, 55],
          memoryTrend: [66, 68, 71, 67, 70, 66, 72, 68, 74, 70, 67, 68],
          diskIOTrend: [
            142, 145, 150, 144, 148, 143, 152, 145, 155, 148, 144, 145,
          ],
          bandwidthTrend: [65, 67, 70, 66, 69, 65, 72, 67, 74, 69, 66, 67],
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
          cpuTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          memoryTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          diskIOTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          bandwidthTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
          cpuTrend: [66, 68, 71, 67, 70, 68, 72, 68, 69, 70, 67, 68],
          memoryTrend: [63, 65, 68, 64, 67, 65, 69, 65, 66, 67, 64, 65],
          diskIOTrend: [72, 75, 78, 74, 77, 75, 79, 75, 76, 77, 74, 75],
          bandwidthTrend: [
            148, 152, 156, 150, 154, 152, 157, 152, 153, 154, 150, 152,
          ],
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
          cpuTrend: [74, 76, 79, 75, 78, 76, 80, 76, 77, 78, 75, 76],
          memoryTrend: [70, 72, 75, 71, 74, 72, 76, 72, 73, 74, 71, 72],
          diskIOTrend: [79, 81, 84, 80, 83, 81, 85, 81, 82, 83, 80, 81],
          bandwidthTrend: [
            158, 161, 165, 159, 163, 161, 166, 161, 162, 163, 159, 161,
          ],
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
          cpuTrend: [53, 55, 58, 54, 57, 55, 59, 55, 56, 57, 54, 55],
          memoryTrend: [56, 58, 61, 57, 60, 58, 62, 58, 59, 60, 57, 58],
          diskIOTrend: [59, 62, 65, 61, 64, 62, 66, 62, 63, 64, 61, 62],
          bandwidthTrend: [92, 94, 97, 93, 96, 94, 98, 94, 95, 96, 93, 94],
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
          cpuTrend: [60, 62, 65, 61, 64, 62, 66, 62, 63, 64, 61, 62],
          memoryTrend: [63, 65, 68, 64, 67, 65, 69, 65, 66, 67, 64, 65],
          diskIOTrend: [65, 68, 71, 67, 70, 68, 72, 68, 69, 70, 67, 68],
          bandwidthTrend: [
            99, 101, 104, 100, 103, 101, 105, 101, 102, 103, 100, 101,
          ],
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
          cpuTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          memoryTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          diskIOTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          bandwidthTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
          cpuTrend: [59, 61, 64, 60, 63, 61, 65, 61, 62, 63, 60, 61],
          memoryTrend: [66, 68, 71, 67, 70, 68, 72, 68, 69, 70, 67, 68],
          diskIOTrend: [67, 69, 72, 68, 71, 69, 73, 69, 70, 71, 68, 69],
          bandwidthTrend: [
            110, 112, 115, 111, 114, 112, 116, 112, 113, 114, 111, 112,
          ],
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
          cpuTrend: [64, 66, 69, 65, 68, 66, 70, 66, 67, 68, 65, 66],
          memoryTrend: [73, 75, 78, 74, 77, 75, 79, 75, 76, 77, 74, 75],
          diskIOTrend: [74, 76, 79, 75, 78, 76, 80, 76, 77, 78, 75, 76],
          bandwidthTrend: [
            116, 118, 121, 117, 120, 118, 122, 118, 119, 120, 117, 118,
          ],
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
          cpuTrend: [76, 78, 81, 77, 80, 78, 82, 78, 79, 80, 77, 78],
          memoryTrend: [83, 85, 88, 84, 87, 85, 89, 85, 86, 87, 84, 85],
          diskIOTrend: [87, 89, 92, 88, 91, 89, 93, 89, 90, 91, 88, 89],
          bandwidthTrend: [
            133, 135, 138, 134, 137, 135, 139, 135, 136, 137, 134, 135,
          ],
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
          cpuTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          memoryTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          diskIOTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          bandwidthTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      width: '15%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '8%',
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
      width: '8%',
    },
    {
      title: 'CPU使用率',
      dataIndex: 'cpu',
      key: 'cpu',
      width: '12%',
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
      width: '12%',
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
      width: '12%',
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
      width: '10%',
      render: (value: number) => `${value.toFixed(1)} MB/s`,
    },
    {
      title: '网络带宽',
      dataIndex: 'bandwidth',
      key: 'bandwidth',
      width: '10%',
      render: (value: number) => (
        <span style={{ color: getBandwidthColor(value) }}>
          {value.toFixed(1)} Mbps
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: '8%',
      render: (_: any, record: ServerData) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleShowModal(record)}
          disabled={record.status === 'offline'}
        >
          详情
        </Button>
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
          data: Array.from({ length: 12 }, (_, i) => `${i + 1}h`),
          axisLabel: {
            fontSize: 10,
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
    </div>
  );
};

export default SystemMonitor;
