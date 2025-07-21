import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  Progress,
  Row,
  Col,
  Modal,
  Radio,
  message,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';

const { Option } = Select;

interface HatchingData {
  key: string;
  name: string;
  platform: 'GitHub' | 'Gitee' | 'GitLab';
  language: string;
  stars: number;
  forks: number;
  issues: number;
  lastUpdate: string;
  lastUpdateCategory:
    | '1个月内'
    | '超过1个月'
    | '超过3个月'
    | '超过半年'
    | '超过1年';
  status: 'active' | 'inactive' | 'pending';
  progress: number;
  maintainer: string;
  description: string;
}

// 固定的平台分布数据
const platformData = [
  { name: 'GitHub', value: 25, color: '#1890ff' },
  { name: 'Gitee', value: 15, color: '#52c41a' },
  { name: 'GitLab', value: 10, color: '#faad14' },
];

// 固定的更新时间分布数据
const updateData = [
  { name: '超过1年未更新', value: 5, color: '#ff4d4f' },
  { name: '超过半年未更新', value: 8, color: '#faad14' },
  { name: '超过3个月未更新', value: 12, color: '#13c2c2' },
  { name: '超过1个月未更新', value: 10, color: '#1890ff' },
  { name: '1个月内有更新', value: 15, color: '#52c41a' },
];

const totalProjects = platformData.reduce((sum, item) => sum + item.value, 0);

const HatchingTab: React.FC = () => {
  // 固定的孵化项目数据
  const hatchingData: HatchingData[] = [
    {
      key: '1',
      name: '孵化项目-1',
      platform: 'GitHub',
      language: 'JavaScript',
      stars: 1250,
      forks: 320,
      issues: 45,
      lastUpdate: '2024/1/15 10:30:00',
      lastUpdateCategory: '1个月内',
      status: 'active',
      progress: 75,
      maintainer: '张三',
      description: '这是孵化项目 1 的描述信息',
    },
    {
      key: '2',
      name: '孵化项目-2',
      platform: 'Gitee',
      language: 'Python',
      stars: 890,
      forks: 180,
      issues: 23,
      lastUpdate: '2023/11/20 14:20:00',
      lastUpdateCategory: '超过1个月',
      status: 'pending',
      progress: 60,
      maintainer: '李四',
      description: '这是孵化项目 2 的描述信息',
    },
    {
      key: '3',
      name: '孵化项目-3',
      platform: 'GitLab',
      language: 'Java',
      stars: 2100,
      forks: 450,
      issues: 67,
      lastUpdate: '2023/10/10 09:15:00',
      lastUpdateCategory: '超过3个月',
      status: 'active',
      progress: 85,
      maintainer: '王五',
      description: '这是孵化项目 3 的描述信息',
    },
    {
      key: '4',
      name: '孵化项目-4',
      platform: 'GitHub',
      language: 'Go',
      stars: 1680,
      forks: 290,
      issues: 34,
      lastUpdate: '2023/8/5 16:45:00',
      lastUpdateCategory: '超过半年',
      status: 'inactive',
      progress: 40,
      maintainer: '赵六',
      description: '这是孵化项目 4 的描述信息',
    },
    {
      key: '5',
      name: '孵化项目-5',
      platform: 'Gitee',
      language: 'TypeScript',
      stars: 950,
      forks: 210,
      issues: 28,
      lastUpdate: '2023/2/12 11:30:00',
      lastUpdateCategory: '超过1年',
      status: 'pending',
      progress: 30,
      maintainer: '钱七',
      description: '这是孵化项目 5 的描述信息',
    },
  ];

  const [filteredData, setFilteredData] =
    useState<HatchingData[]>(hatchingData);
  const [searchText, setSearchText] = useState('');
  const [updateTimeFilter, setUpdateTimeFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [batchModalVisible, setBatchModalVisible] = useState(false);
  const [batchTimeCategory, setBatchTimeCategory] = useState<string>('');
  const [batchQueueType, setBatchQueueType] = useState<'normal' | 'priority'>(
    'normal'
  );

  const platformChartRef = useRef<HTMLDivElement>(null);
  const updateChartRef = useRef<HTMLDivElement>(null);

  // 获取状态标签颜色
  const getStatusColor = (status: HatchingData['status']) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      case 'pending':
        return 'orange';
      default:
        return 'default';
    }
  };

  // 获取状态文本
  const getStatusText = (status: HatchingData['status']) => {
    switch (status) {
      case 'active':
        return '活跃';
      case 'inactive':
        return '不活跃';
      case 'pending':
        return '待审核';
      default:
        return '未知';
    }
  };

  // 批量操作处理函数
  const handleBatchQueue = () => {
    if (!batchTimeCategory) {
      message.warning('请选择时间类别');
      return;
    }

    const targetProjects = hatchingData.filter(
      (item) => item.lastUpdateCategory === batchTimeCategory
    );

    if (targetProjects.length === 0) {
      message.warning(`没有找到${batchTimeCategory}的项目`);
      return;
    }

    const queueTypeText =
      batchQueueType === 'priority' ? '优先队列' : '普通队列';

    Modal.confirm({
      title: '确认批量操作',
      content: `确定要将 ${targetProjects.length} 个${batchTimeCategory}的项目加入${queueTypeText}吗？`,
      onOk: () => {
        message.success(
          `成功将 ${targetProjects.length} 个项目加入${queueTypeText}`
        );
        setBatchModalVisible(false);
        setBatchTimeCategory('');
        setBatchQueueType('normal');
      },
    });
  };

  // 表格列配置
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: (text: string) => (
        <a className="text-blue-600 hover:text-blue-800">{text}</a>
      ),
    },
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
      width: '8%',
      render: (platform: string) => (
        <Tag
          color={
            platform === 'GitHub'
              ? 'blue'
              : platform === 'Gitee'
              ? 'red'
              : 'green'
          }
        >
          {platform}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '8%',
      render: (status: HatchingData['status']) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: '提交人',
      dataIndex: 'maintainer',
      key: 'maintainer',
      width: '10%',
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdateCategory',
      key: 'lastUpdateCategory',
      width: '12%',
      render: (category: string, record: HatchingData) => {
        const getTimeColor = (cat: string) => {
          switch (cat) {
            case '1个月内':
              return 'green';
            case '超过1个月':
              return 'blue';
            case '超过3个月':
              return 'cyan';
            case '超过半年':
              return 'orange';
            case '超过1年':
              return 'red';
            default:
              return 'default';
          }
        };

        return (
          <Tooltip title={`具体时间: ${record.lastUpdate}`}>
            <Tag color={getTimeColor(category)}>{category}</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: '18%',
      render: () => (
        <div className="flex cursor-pointer gap-2 text-[#3e8eff]">
          <a>加入队列</a>
          <a>加入优先队列</a>
          <a>删除</a>
        </div>
      ),
    },
  ];

  // 搜索和筛选
  useEffect(() => {
    let filtered = hatchingData;

    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.maintainer.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (updateTimeFilter !== 'all') {
      filtered = filtered.filter(
        (item) => item.lastUpdateCategory === updateTimeFilter
      );
    }

    if (platformFilter !== 'all') {
      filtered = filtered.filter((item) => item.platform === platformFilter);
    }

    setFilteredData(filtered);
  }, [searchText, updateTimeFilter, platformFilter]);

  // 初始化平台分布图表
  useEffect(() => {
    const initPlatformChart = () => {
      if (platformChartRef.current) {
        const container = platformChartRef.current;

        if (container.clientWidth === 0 || container.clientHeight === 0) {
          setTimeout(initPlatformChart, 100);
          return;
        }

        const chart = echarts.init(container);

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            show: false,
          },
          series: [
            {
              name: '平台分布',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {c}',
                fontSize: 12,
                fontWeight: 'normal',
              },
              labelLine: {
                show: true,
                length: 15,
                length2: 10,
                smooth: false,
              },
              data: platformData.map((item) => ({
                value: item.value,
                name: item.name,
                itemStyle: { color: item.color },
              })),
            },
          ],
        };

        chart.setOption(option);

        return () => {
          chart.dispose();
        };
      }
    };

    const cleanup = initPlatformChart();
    return cleanup;
  }, []);

  // 初始化更新时间分布图表
  useEffect(() => {
    const initUpdateChart = () => {
      if (updateChartRef.current) {
        const container = updateChartRef.current;

        if (container.clientWidth === 0 || container.clientHeight === 0) {
          setTimeout(initUpdateChart, 100);
          return;
        }

        const chart = echarts.init(container);

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            show: false,
          },
          series: [
            {
              name: '更新时间分布',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {c}',
                fontSize: 12,
                fontWeight: 'normal',
              },
              labelLine: {
                show: true,
                length: 15,
                length2: 10,
                smooth: false,
              },
              data: updateData.map((item) => ({
                value: item.value,
                name: item.name,
                itemStyle: { color: item.color },
              })),
            },
          ],
        };

        chart.setOption(option);

        return () => {
          chart.dispose();
        };
      }
    };

    const cleanup = initUpdateChart();
    return cleanup;
  }, []);

  return (
    <>
      {/* 项目总览卡片 */}
      <Card
        title={
          <div>
            <span>孵化项目总览</span>
            <span className="ml-2 text-sm font-normal text-gray-500">
              总计: {totalProjects} 项目
            </span>
          </div>
        }
        className="mt-4"
      >
        <Row gutter={24}>
          <Col span={12}>
            <div className="text-center">
              <h4 className="mb-4 text-base font-medium">平台分布</h4>
              <div
                ref={platformChartRef}
                style={{
                  width: '100%',
                  height: '300px',
                  minHeight: '300px',
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="text-center">
              <h4 className="mb-4 text-base font-medium">更新时间分布</h4>
              <div
                ref={updateChartRef}
                style={{
                  width: '100%',
                  height: '300px',
                  minHeight: '300px',
                }}
              />
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="孵化项目管理" className="mt-4">
        {/* 操作区域 */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <Input
              placeholder="搜索项目名称"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
            <Space>
              <Button onClick={() => setBatchModalVisible(true)}>
                批量加入队列
              </Button>
              <Button type="primary" icon={<PlusOutlined />}>
                新增项目
              </Button>
              <Button icon={<UploadOutlined />}>批量导入</Button>
            </Space>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            total: filteredData.length,
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

      {/* 批量操作模态框 */}
      <Modal
        title="按时间批量加入队列"
        open={batchModalVisible}
        onOk={handleBatchQueue}
        onCancel={() => {
          setBatchModalVisible(false);
          setBatchTimeCategory('');
          setBatchQueueType('normal');
        }}
        width={500}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              选择时间类别:
            </label>
            <Radio.Group
              value={batchTimeCategory}
              onChange={(e) => setBatchTimeCategory(e.target.value)}
              className="w-full"
            >
              <div className="space-y-2">
                <Radio value="超过1个月">
                  超过1个月未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      hatchingData.filter(
                        (item) => item.lastUpdateCategory === '超过1个月'
                      ).length
                    }{' '}
                    个项目)
                  </span>
                </Radio>
                <Radio value="超过3个月">
                  超过3个月未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      hatchingData.filter(
                        (item) => item.lastUpdateCategory === '超过3个月'
                      ).length
                    }{' '}
                    个项目)
                  </span>
                </Radio>
                <Radio value="超过半年">
                  超过半年未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      hatchingData.filter(
                        (item) => item.lastUpdateCategory === '超过半年'
                      ).length
                    }{' '}
                    个项目)
                  </span>
                </Radio>
                <Radio value="超过1年">
                  超过1年未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      hatchingData.filter(
                        (item) => item.lastUpdateCategory === '超过1年'
                      ).length
                    }{' '}
                    个项目)
                  </span>
                </Radio>
              </div>
            </Radio.Group>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              选择队列类型:
            </label>
            <Radio.Group
              value={batchQueueType}
              onChange={(e) => setBatchQueueType(e.target.value)}
            >
              <Radio value="normal">普通队列</Radio>
              <Radio value="priority">优先队列</Radio>
            </Radio.Group>
          </div>

          {batchTimeCategory && (
            <div className="rounded bg-blue-50 p-3">
              <p className="text-sm text-blue-700">
                将会把{' '}
                <strong>
                  {
                    hatchingData.filter(
                      (item) => item.lastUpdateCategory === batchTimeCategory
                    ).length
                  }
                </strong>{' '}
                个<strong>{batchTimeCategory}</strong>的项目加入
                <strong>
                  {batchQueueType === 'priority' ? '优先队列' : '普通队列'}
                </strong>
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default HatchingTab;
