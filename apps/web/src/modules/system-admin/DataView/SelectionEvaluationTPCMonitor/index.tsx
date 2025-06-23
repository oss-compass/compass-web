import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Statistic,
  Badge,
  Tooltip,
  Progress,
  Input,
  Button,
  Space,
  Tag,
  Dropdown,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const EcosystemEvaluationMonitor: React.FC = () => {
  // 生成48个队列的模拟数据
  const generateQueueData = () => {
    const queues = [];
    for (let i = 1; i <= 8; i++) {
      const projectCount = Math.floor(Math.random() * 20); // 0-19个项目
      const status =
        projectCount === 0
          ? 'idle'
          : projectCount < 5
          ? 'low'
          : projectCount < 15
          ? 'normal'
          : 'high';
      queues.push({
        id: i,
        name: `Queue-${i.toString().padStart(2, '0')}`,
        projectCount,
        status,
        lastUpdate: new Date(
          Date.now() - Math.random() * 3600000
        ).toLocaleTimeString(),
      });
    }
    return queues;
  };

  const [queueData, setQueueData] = useState(generateQueueData());
  const [searchText, setSearchText] = useState('');

  // 队列状态统计
  const queueStats = {
    total: queueData.length,
    idle: queueData.filter((q) => q.status === 'idle').length,
    active: queueData.filter((q) => q.status !== 'idle').length,
    totalProjects: queueData.reduce((sum, q) => sum + q.projectCount, 0),
  };

  // 获取队列状态颜色
  const getQueueStatusColor = (status: string) => {
    switch (status) {
      case 'idle':
        return '#d9d9d9';
      case 'low':
        return '#52c41a';
      case 'normal':
        return '#1890ff';
      case 'high':
        return '#ff4d4f';
      default:
        return '#d9d9d9';
    }
  };

  // 获取队列状态文本
  const getQueueStatusText = (status: string) => {
    switch (status) {
      case 'idle':
        return '空闲';
      case 'low':
        return '低负载';
      case 'normal':
        return '正常';
      case 'high':
        return '高负载';
      default:
        return '未知';
    }
  };

  // 生成更多仓库数据用于分页演示
  const generateRepositoryData = () => {
    const repositories = [];
    const repoNames = [
      'React',
      'Vue.js',
      'Angular',
      'TensorFlow',
      'PyTorch',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'Kubernetes',
      'Redis',
      'MongoDB',
      'Elasticsearch',
      'Spring Boot',
      'Django',
      'Flask',
      'Express.js',
      'Next.js',
      'Nuxt.js',
      'Svelte',
      'Flutter',
    ];
    const submitters = [
      '张三',
      '李四',
      '王五',
      '赵六',
      '钱七',
      '孙八',
      '周九',
      '吴十',
    ];

    for (let i = 0; i < 50; i++) {
      const status = Math.random() > 0.3 ? 'success' : 'queued';
      repositories.push({
        key: (i + 1).toString(),
        repository:
          repoNames[i % repoNames.length] +
          (i > 19 ? ` ${Math.floor(i / 20) + 1}` : ''),
        status,
        lastUpdate: new Date(
          Date.now() - Math.random() * 7 * 24 * 3600000
        ).toLocaleString(),
        submitter: submitters[i % submitters.length],
      });
    }
    return repositories;
  };

  const repositoryData = generateRepositoryData();

  // 操作菜单项
  const getActionItems = (record: any): MenuProps['items'] => [
    {
      key: 'queue',
      label: '加入队列',
      disabled: record.status === 'queued',
    },
    {
      key: 'immediate',
      label: '立即更新',
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined />,
    },
  ];

  const repositoryColumns = [
    {
      title: '选型软件名称',
      dataIndex: 'repository',
      key: 'repository',
      width: '25%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => {
        const config = {
          success: { color: 'green', text: '更新成功' },
          queued: { color: 'orange', text: '在队列中' },
        };
        const { color, text } = config[status as keyof typeof config] || {
          color: 'default',
          text: '未知',
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '上次更新时间',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      width: '20%',
    },
    {
      title: '提交人',
      dataIndex: 'submitter',
      key: 'submitter',
      width: '15%',
    },
    {
      title: '操作',
      key: 'action',
      width: '25%',
      render: (_, record) => (
        <div className="flex cursor-pointer gap-2 text-[#3e8eff]">
          <a>加入队列</a>
          <a>立即更新</a>
          <a>删除</a>
        </div>
      ),
    },
  ];

  // 定时更新队列数据
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueData(generateQueueData());
    }, 30000); // 每30秒更新一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* 队列监控区域 */}
      <Card title="队列监控" className="mb-6">
        {/* 队列统计概览 */}
        <Row gutter={[16, 16]} className="mb-4">
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="总队列数"
                value={queueStats.total}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="空闲队列"
                value={queueStats.idle}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="活跃队列"
                value={queueStats.active}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Statistic
                title="队列总项目数"
                value={queueStats.totalProjects}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>

        {/* <div className="grid grid-cols-8 gap-2">
          {queueData.map((queue) => (
            <Tooltip
              key={queue.id}
              title={
                <div>
                  <div><strong>{queue.name}</strong></div>
                  <div>状态: {getQueueStatusText(queue.status)}</div>
                  <div>项目数: {queue.projectCount}</div>
                  <div>更新时间: {queue.lastUpdate}</div>
                </div>
              }
            >
              <div
                className="relative p-3 rounded border cursor-pointer hover:shadow-md transition-shadow"
                style={{
                  backgroundColor: getQueueStatusColor(queue.status),
                  minHeight: '60px',
                }}
              >
                <div className="text-xs font-medium text-center">
                  {queue.name}
                </div>
                <div className="text-center mt-1">
                  <Badge
                    count={queue.projectCount}
                    style={{
                      backgroundColor: queue.status === 'idle' ? '#d9d9d9' : '#fff',
                      color: queue.status === 'idle' ? '#666' : '#000',
                      border: '1px solid #d9d9d9',
                    }}
                  />
                </div>
                {queue.projectCount > 0 && (
                  <div className="mt-1">
                    <Progress
                      percent={(queue.projectCount / 20) * 100}
                      size="small"
                      showInfo={false}
                      strokeColor={{
                        '0%': '#52c41a',
                        '50%': '#1890ff',
                        '100%': '#ff4d4f',
                      }}
                    />
                  </div>
                )}
              </div>
            </Tooltip>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: '#d9d9d9' }}></div>
            <span>空闲 (0项目)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: '#52c41a' }}></div>
            <span>低负载 (1-4项目)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: '#1890ff' }}></div>
            <span>正常 (5-14项目)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: '#ff4d4f' }}></div>
            <span>高负载 (15+项目)</span>
          </div>
        </div> */}
      </Card>

      {/* 详细数据表格 */}
      <Card title="选型软件管理">
        {/* 操作区域 */}
        <div className="mb-4 flex items-center justify-between">
          <Input
            placeholder="搜索选型软件名称"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              新增仓库
            </Button>
            <Button icon={<UploadOutlined />}>批量导入</Button>
          </Space>
        </div>

        <Table
          columns={repositoryColumns}
          dataSource={repositoryData.filter(
            (item) =>
              item.repository
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              item.submitter.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{
            total: repositoryData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default EcosystemEvaluationMonitor;
