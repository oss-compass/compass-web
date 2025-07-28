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

interface GraduationData {
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
  status: 'graduated' | 'pending' | 'rejected';
  progress: number;
  maintainer: string;
  description: string;
  graduationDate?: string;
  category: string;
}

// 固定的平台分布数据
const platformData = [
  { name: 'GitHub', value: 35, color: '#1890ff' },
  { name: 'Gitee', value: 20, color: '#52c41a' },
  { name: 'GitLab', value: 15, color: '#faad14' },
];

// 固定的更新时间分布数据
const updateData = [
  { name: '超过1年未更新', value: 3, color: '#ff4d4f' },
  { name: '超过半年未更新', value: 5, color: '#faad14' },
  { name: '超过3个月未更新', value: 8, color: '#13c2c2' },
  { name: '超过1个月未更新', value: 12, color: '#1890ff' },
  { name: '1个月内有更新', value: 42, color: '#52c41a' },
];

const totalProjects = platformData.reduce((sum, item) => sum + item.value, 0);

const GraduationTab: React.FC = () => {
  // 固定的毕业项目数据
  const graduationData: GraduationData[] = [
    {
      key: '1',
      name: '毕业项目-1',
      platform: 'GitHub',
      language: 'JavaScript',
      stars: 5250,
      forks: 1320,
      issues: 125,
      lastUpdate: '2024/1/20 15:30:00',
      lastUpdateCategory: '1个月内',
      status: 'graduated',
      progress: 100,
      maintainer: '张三',
      description: '这是毕业项目 1 的描述信息',
      graduationDate: '2023/12/15',
      category: '网络及协议',
    },
    {
      key: '2',
      name: '毕业项目-2',
      platform: 'Gitee',
      language: 'Python',
      stars: 3890,
      forks: 980,
      issues: 89,
      lastUpdate: '2023/12/10 11:20:00',
      lastUpdateCategory: '超过1个月',
      status: 'graduated',
      progress: 100,
      maintainer: '李四',
      description: '这是毕业项目 2 的描述信息',
      graduationDate: '2023/11/20',
      category: 'UI',
    },
    {
      key: '3',
      name: '毕业项目-3',
      platform: 'GitLab',
      language: 'Java',
      stars: 7100,
      forks: 1850,
      issues: 167,
      lastUpdate: '2023/10/25 14:15:00',
      lastUpdateCategory: '超过3个月',
      status: 'graduated',
      progress: 100,
      maintainer: '王五',
      description: '这是毕业项目 3 的描述信息',
      graduationDate: '2023/10/01',
      category: '文件及解析',
    },
    {
      key: '4',
      name: '待毕业项目-1',
      platform: 'GitHub',
      language: 'Go',
      stars: 2680,
      forks: 590,
      issues: 78,
      lastUpdate: '2023/7/15 09:45:00',
      lastUpdateCategory: '超过半年',
      status: 'pending',
      progress: 95,
      maintainer: '赵六',
      description: '这是待毕业项目 1 的描述信息',
      category: 'RN框架',
    },
    {
      key: '5',
      name: '待毕业项目-2',
      platform: 'Gitee',
      language: 'TypeScript',
      stars: 1950,
      forks: 410,
      issues: 45,
      lastUpdate: '2023/1/10 16:30:00',
      lastUpdateCategory: '超过1年',
      status: 'pending',
      progress: 90,
      maintainer: '钱七',
      description: '这是待毕业项目 2 的描述信息',
      category: '网络及协议',
    },
  ];

  const [filteredData, setFilteredData] =
    useState<GraduationData[]>(graduationData);
  const [searchText, setSearchText] = useState('');
  const [updateTimeFilter, setUpdateTimeFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [batchModalVisible, setBatchModalVisible] = useState(false);
  const [batchTimeCategory, setBatchTimeCategory] = useState<string>('');
  const [batchQueueType, setBatchQueueType] = useState<'normal' | 'priority'>(
    'normal'
  );

  const platformChartRef = useRef<HTMLDivElement>(null);
  const updateChartRef = useRef<HTMLDivElement>(null);

  // 获取状态标签颜色
  const getStatusColor = (status: GraduationData['status']) => {
    switch (status) {
      case 'graduated':
        return 'green';
      case 'pending':
        return 'orange';
      case 'rejected':
        return 'red';
      default:
        return 'default';
    }
  };

  // 获取状态文本
  const getStatusText = (status: GraduationData['status']) => {
    switch (status) {
      case 'graduated':
        return '已毕业';
      case 'pending':
        return '待毕业';
      case 'rejected':
        return '已拒绝';
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

    const targetProjects = graduationData.filter(
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
      render: (status: GraduationData['status']) => (
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
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: '10%',
      render: (category: string) => <span>{category}</span>,
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdateCategory',
      key: 'lastUpdateCategory',
      width: '12%',
      render: (category: string, record: GraduationData) => {
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
      title: '提交日期',
      dataIndex: 'graduationDate',
      key: 'graduationDate',
      width: '10%',
      render: (date: string | undefined) => date || '-',
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
    let filtered = graduationData;

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

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    setFilteredData(filtered);
  }, [searchText, updateTimeFilter, platformFilter, categoryFilter]);

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
            <span>毕业项目总览</span>
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

      <Card title="毕业项目管理" className="mt-4">
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

          {/* 过滤器区域 */}
          <div className="mt-4 flex items-center gap-4">
            <Select
              placeholder="选择平台"
              value={platformFilter}
              onChange={setPlatformFilter}
              style={{ width: 120 }}
              allowClear
            >
              <Option value="all">全部平台</Option>
              <Option value="GitHub">GitHub</Option>
              <Option value="Gitee">Gitee</Option>
              <Option value="GitLab">GitLab</Option>
            </Select>

            <Select
              placeholder="选择更新时间"
              value={updateTimeFilter}
              onChange={setUpdateTimeFilter}
              style={{ width: 150 }}
              allowClear
            >
              <Option value="all">全部时间</Option>
              <Option value="1个月内">1个月内</Option>
              <Option value="超过1个月">超过1个月</Option>
              <Option value="超过3个月">超过3个月</Option>
              <Option value="超过半年">超过半年</Option>
              <Option value="超过1年">超过1年</Option>
            </Select>

            <Select
              placeholder="选择分类"
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: 120 }}
              allowClear
            >
              <Option value="all">全部分类</Option>
              <Option value="网络及协议">网络及协议</Option>
              <Option value="UI">UI</Option>
              <Option value="文件及解析">文件及解析</Option>
              <Option value="RN框架">RN框架</Option>
            </Select>
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
                      graduationData.filter(
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
                      graduationData.filter(
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
                      graduationData.filter(
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
                      graduationData.filter(
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
                    graduationData.filter(
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

export default GraduationTab;
