import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Select,
  Tooltip,
  Modal,
  Radio,
  message,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';

const { Option } = Select;

interface RepositoryData {
  key: string;
  repository: string;
  repositoryUrl: string;
  platform: 'GitHub' | 'Gitee' | 'GitCode';
  status: 'success' | 'queued';
  lastUpdate: string;
  lastUpdateCategory:
    | '1个月内'
    | '超过1个月'
    | '超过3个月'
    | '超过半年'
    | '超过1年';
  submitter: string;
  modelScore: {
    total: number;
    collaboration: number;
    community: number;
    activity: number;
    organization: number;
  };
}

const RepositoryTab: React.FC = () => {
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

  // 固定的平台分布数据
  const platformData = [
    { name: 'GitHub', value: 65432, color: '#1890ff' },
    { name: 'Gitee', value: 38251, color: '#52c41a' },
    { name: 'GitCode', value: 26000, color: '#faad14' },
  ];

  // 固定的更新时间分布数据
  const updateData = [
    { name: '超过1年未更新', value: 15234, color: '#ff4d4f' },
    { name: '超过半年未更新', value: 23456, color: '#faad14' },
    { name: '超过3个月未更新', value: 18765, color: '#13c2c2' },
    { name: '超过1个月未更新', value: 12543, color: '#1890ff' },
    { name: '1个月内有更新', value: 59685, color: '#52c41a' },
  ];

  const totalRepositories = platformData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // 固定的仓库数据
  const repositoryData: RepositoryData[] = [
    {
      key: '1',
      repository: 'React',
      repositoryUrl: 'https://github.com/example/react',
      platform: 'GitHub',
      status: 'success',
      lastUpdate: '2024/1/15 10:30:00',
      lastUpdateCategory: '1个月内',
      submitter: '张三',
      modelScore: {
        total: 85,
        collaboration: 88,
        community: 82,
        activity: 90,
        organization: 80,
      },
    },
    {
      key: '2',
      repository: 'Vue.js',
      repositoryUrl: 'https://gitee.com/example/vue-js',
      platform: 'Gitee',
      status: 'queued',
      lastUpdate: '2023/11/20 14:20:00',
      lastUpdateCategory: '超过1个月',
      submitter: '李四',
      modelScore: {
        total: 78,
        collaboration: 75,
        community: 80,
        activity: 82,
        organization: 76,
      },
    },
    {
      key: '3',
      repository: 'Angular',
      repositoryUrl: 'https://gitcode.net/example/angular',
      platform: 'GitCode',
      status: 'success',
      lastUpdate: '2023/10/10 09:15:00',
      lastUpdateCategory: '超过3个月',
      submitter: '王五',
      modelScore: {
        total: 72,
        collaboration: 70,
        community: 74,
        activity: 75,
        organization: 69,
      },
    },
    {
      key: '4',
      repository: 'TensorFlow',
      repositoryUrl: 'https://github.com/example/tensorflow',
      platform: 'GitHub',
      status: 'success',
      lastUpdate: '2023/8/5 16:45:00',
      lastUpdateCategory: '超过半年',
      submitter: '赵六',
      modelScore: {
        total: 92,
        collaboration: 95,
        community: 90,
        activity: 88,
        organization: 94,
      },
    },
    {
      key: '5',
      repository: 'PyTorch',
      repositoryUrl: 'https://gitee.com/example/pytorch',
      platform: 'Gitee',
      status: 'success',
      lastUpdate: '2023/2/12 11:30:00',
      lastUpdateCategory: '超过1年',
      submitter: '钱七',
      modelScore: {
        total: 89,
        collaboration: 87,
        community: 91,
        activity: 85,
        organization: 92,
      },
    },
    {
      key: '6',
      repository: 'PostgreSQL',
      repositoryUrl: 'https://gitcode.net/example/postgresql',
      platform: 'GitCode',
      status: 'queued',
      lastUpdate: '2024/1/8 13:20:00',
      lastUpdateCategory: '1个月内',
      submitter: '孙八',
      modelScore: {
        total: 76,
        collaboration: 78,
        community: 75,
        activity: 74,
        organization: 77,
      },
    },
    {
      key: '7',
      repository: 'MySQL',
      repositoryUrl: 'https://github.com/example/mysql',
      platform: 'GitHub',
      status: 'success',
      lastUpdate: '2023/12/1 08:45:00',
      lastUpdateCategory: '超过1个月',
      submitter: '周九',
      modelScore: {
        total: 81,
        collaboration: 83,
        community: 79,
        activity: 80,
        organization: 82,
      },
    },
    {
      key: '8',
      repository: 'Docker',
      repositoryUrl: 'https://gitee.com/example/docker',
      platform: 'Gitee',
      status: 'success',
      lastUpdate: '2023/9/15 15:10:00',
      lastUpdateCategory: '超过3个月',
      submitter: '吴十',
      modelScore: {
        total: 87,
        collaboration: 85,
        community: 89,
        activity: 86,
        organization: 88,
      },
    },
  ];

  // 批量操作处理函数
  const handleBatchQueue = () => {
    if (!batchTimeCategory) {
      message.warning('请选择时间类别');
      return;
    }

    const targetRepositories = repositoryData.filter(
      (item) => item.lastUpdateCategory === batchTimeCategory
    );

    if (targetRepositories.length === 0) {
      message.warning(`没有找到${batchTimeCategory}的仓库`);
      return;
    }

    const queueTypeText =
      batchQueueType === 'priority' ? '优先队列' : '普通队列';

    Modal.confirm({
      title: '确认批量操作',
      content: `确定要将 ${targetRepositories.length} 个${batchTimeCategory}的仓库加入${queueTypeText}吗？`,
      onOk: () => {
        // 这里可以调用实际的API
        message.success(
          `成功将 ${targetRepositories.length} 个仓库加入${queueTypeText}`
        );
        setBatchModalVisible(false);
        setBatchTimeCategory('');
        setBatchQueueType('normal');
      },
    });
  };

  // 初始化平台分布饼图
  useEffect(() => {
    const initPlatformChart = () => {
      if (platformChartRef.current) {
        const container = platformChartRef.current;

        // 检查容器尺寸
        if (container.clientWidth === 0 || container.clientHeight === 0) {
          // 如果容器尺寸为0，延迟初始化
          setTimeout(initPlatformChart, 100);
          return;
        }

        const platformChart = echarts.init(container);

        const platformOption = {
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
                name: item.name,
                value: item.value,
                itemStyle: {
                  color: item.color,
                },
              })),
            },
          ],
        };

        platformChart.setOption(platformOption, true);

        const handlePlatformResize = () => {
          platformChart.resize();
        };

        window.addEventListener('resize', handlePlatformResize);

        // 清理函数
        const cleanup = () => {
          window.removeEventListener('resize', handlePlatformResize);
          platformChart.dispose();
        };

        // 将清理函数存储到容器上，以便在组件卸载时调用
        (container as any)._chartCleanup = cleanup;
      }
    };

    // 延迟初始化以确保DOM已渲染
    const timer = setTimeout(initPlatformChart, 50);

    return () => {
      clearTimeout(timer);
      if (
        platformChartRef.current &&
        (platformChartRef.current as any)._chartCleanup
      ) {
        (platformChartRef.current as any)._chartCleanup();
      }
    };
  }, [platformData]);

  // 初始化更新时间分布饼图
  useEffect(() => {
    const initUpdateChart = () => {
      if (updateChartRef.current) {
        const container = updateChartRef.current;

        // 检查容器尺寸
        if (container.clientWidth === 0 || container.clientHeight === 0) {
          // 如果容器尺寸为0，延迟初始化
          setTimeout(initUpdateChart, 100);
          return;
        }

        const updateChart = echarts.init(container);

        const updateOption = {
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
                name: item.name,
                value: item.value,
                itemStyle: {
                  color: item.color,
                },
              })),
            },
          ],
        };

        updateChart.setOption(updateOption, true);

        const handleUpdateResize = () => {
          updateChart.resize();
        };

        window.addEventListener('resize', handleUpdateResize);

        // 清理函数
        const cleanup = () => {
          window.removeEventListener('resize', handleUpdateResize);
          updateChart.dispose();
        };

        // 将清理函数存储到容器上，以便在组件卸载时调用
        (container as any)._chartCleanup = cleanup;
      }
    };

    // 延迟初始化以确保DOM已渲染
    const timer = setTimeout(initUpdateChart, 50);

    return () => {
      clearTimeout(timer);
      if (
        updateChartRef.current &&
        (updateChartRef.current as any)._chartCleanup
      ) {
        (updateChartRef.current as any)._chartCleanup();
      }
    };
  }, [updateData]);

  const columns = [
    {
      title: '仓库名称',
      dataIndex: 'repository',
      key: 'repository',
      width: '20%',
      render: (text: string, record: RepositoryData) => (
        <a
          href={record.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <LinkOutlined className="text-xs" />
          {text}
        </a>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <span>仓库平台</span>
          <Select
            size="small"
            value={platformFilter}
            onChange={setPlatformFilter}
            style={{ width: 100 }}
            placeholder="筛选平台"
          >
            <Option value="all">全部</Option>
            <Option value="GitHub">GitHub</Option>
            <Option value="Gitee">Gitee</Option>
            <Option value="GitCode">GitCode</Option>
          </Select>
        </div>
      ),
      dataIndex: 'platform',
      key: 'platform',
      width: '15%',
      render: (platform: RepositoryData['platform']) => {
        const config = {
          GitHub: { color: '#24292e', bgColor: '#f6f8fa' },
          Gitee: { color: '#c71d23', bgColor: '#fff5f5' },
          GitCode: { color: '#1890ff', bgColor: '#f0f9ff' },
        };
        const { color, bgColor } = config[platform];
        return (
          <Tag
            style={{
              color,
              backgroundColor: bgColor,
              border: `1px solid ${color}20`,
              fontWeight: 500,
            }}
          >
            {platform}
          </Tag>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
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
      title: (
        <div className="flex items-center gap-2">
          <span>上次更新时间</span>
          <Select
            size="small"
            value={updateTimeFilter}
            onChange={setUpdateTimeFilter}
            style={{ width: 120 }}
            placeholder="筛选时间"
          >
            <Option value="all">全部</Option>
            <Option value="1个月内">1个月内</Option>
            <Option value="超过1个月">超过1个月</Option>
            <Option value="超过3个月">超过3个月</Option>
            <Option value="超过半年">超过半年</Option>
            <Option value="超过1年">超过1年</Option>
          </Select>
        </div>
      ),
      dataIndex: 'lastUpdateCategory',
      key: 'lastUpdateCategory',
      width: '18%',
      render: (
        category: RepositoryData['lastUpdateCategory'],
        record: RepositoryData
      ) => {
        const config = {
          '1个月内': { color: '#52c41a' },
          超过1个月: { color: '#1890ff' },
          超过3个月: { color: '#13c2c2' },
          超过半年: { color: '#faad14' },
          超过1年: { color: '#ff4d4f' },
        };
        const { color } = config[category];
        return (
          <Tooltip title={`具体时间: ${record.lastUpdate}`}>
            <Tag color={color}>{category}</Tag>
          </Tooltip>
        );
      },
    },
    // {
    //   title: '模型最后得分',
    //   dataIndex: 'modelScore',
    //   key: 'modelScore',
    //   width: '12%',
    //   render: (score: RepositoryData['modelScore']) => (
    //     <Tooltip
    //       title={
    //         <div>
    //           <div>协作开发指数: {score.collaboration}</div>
    //           <div>社区服务与支撑: {score.community}</div>
    //           <div>活跃度: {score.activity}</div>
    //           <div>组织活跃度: {score.organization}</div>
    //         </div>
    //       }
    //     >
    //       <span
    //         className={`font-medium ${score.total >= 80 ? 'text-green-600' :
    //           score.total >= 60 ? 'text-orange-500' : 'text-red-500'
    //           }`}
    //       >
    //         {score.total}
    //       </span>
    //     </Tooltip>
    //   ),
    // },
    {
      title: '提交人',
      dataIndex: 'submitter',
      key: 'submitter',
      width: '10%',
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

  // 过滤数据逻辑
  const filteredData = repositoryData.filter((item) => {
    const matchesSearch =
      item.repository.toLowerCase().includes(searchText.toLowerCase()) ||
      item.submitter.toLowerCase().includes(searchText.toLowerCase());

    const matchesTimeFilter =
      updateTimeFilter === 'all' ||
      item.lastUpdateCategory === updateTimeFilter;
    const matchesPlatformFilter =
      platformFilter === 'all' || item.platform === platformFilter;

    return matchesSearch && matchesTimeFilter && matchesPlatformFilter;
  });

  return (
    <>
      {/* 仓库总览卡片 */}
      <Card
        title={
          <div>
            <span>仓库总览</span>
            <span className="ml-2 text-sm font-normal text-gray-500">
              总计: {totalRepositories.toLocaleString()} 仓库
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

      <Card title="仓库管理" className="mt-4">
        {/* 操作区域 */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <Input
              placeholder="搜索仓库名称"
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
                新增仓库
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
                      repositoryData.filter(
                        (item) => item.lastUpdateCategory === '超过1个月'
                      ).length
                    }{' '}
                    个仓库)
                  </span>
                </Radio>
                <Radio value="超过3个月">
                  超过3个月未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      repositoryData.filter(
                        (item) => item.lastUpdateCategory === '超过3个月'
                      ).length
                    }{' '}
                    个仓库)
                  </span>
                </Radio>
                <Radio value="超过半年">
                  超过半年未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      repositoryData.filter(
                        (item) => item.lastUpdateCategory === '超过半年'
                      ).length
                    }{' '}
                    个仓库)
                  </span>
                </Radio>
                <Radio value="超过1年">
                  超过1年未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      repositoryData.filter(
                        (item) => item.lastUpdateCategory === '超过1年'
                      ).length
                    }{' '}
                    个仓库)
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
                    repositoryData.filter(
                      (item) => item.lastUpdateCategory === batchTimeCategory
                    ).length
                  }
                </strong>{' '}
                个<strong>{batchTimeCategory}</strong>的仓库加入
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

export default RepositoryTab;
