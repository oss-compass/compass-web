import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
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
import {
  PROJECT_STATE_MAP,
  type ProjectListItem,
  useGraduationProjectList,
  useAddToTpcQueue,
  TimeType,
  PlatformType,
  TpcQueueType,
  TpcReportType,
  type ProjectListRequest,
} from '../../../hooks';

const { Option } = Select;

interface GraduationData extends Omit<ProjectListItem, 'state'> {
  key: string;
  status: string;
  statusColor: string;
  platformDisplay: 'GitHub' | 'Gitee' | 'GitLab' | 'GitCode';
  lastUpdateCategory: string;
  displayName: string;
  maintainerName: string;
}

const GraduationManagement: React.FC = () => {
  // 过滤器状态管理
  const [searchText, setSearchText] = useState('');
  const [updateTimeFilter, setUpdateTimeFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // 将前端过滤器值映射到 API 参数
  const apiTimeType = useMemo(() => {
    const timeMapping: Record<string, string> = {
      '1 个月内': TimeType.ONE_MONTH,
      超过1个月: TimeType.THREE_MONTHS,
      超过3个月: TimeType.SIX_MONTHS,
      超过半年: TimeType.TWELVE_MONTHS,
      超过1年: TimeType.ALL_TIME,
      all: TimeType.ALL_TIME,
    };
    return timeMapping[updateTimeFilter] || TimeType.ALL_TIME;
  }, [updateTimeFilter]);

  const apiPlatform = useMemo(() => {
    const platformMapping: Record<string, string> = {
      GitHub: PlatformType.GITHUB,
      Gitee: PlatformType.GITEE,
      GitLab: PlatformType.GITLAB,
      all: PlatformType.ALL,
    };
    return platformMapping[platformFilter] || PlatformType.ALL;
  }, [platformFilter]);

  // API 请求参数
  const projectListParams: ProjectListRequest = {
    page: currentPage,
    per_page: pageSize,
    keywords: searchText,
    time_type: apiTimeType !== TimeType.ALL_TIME ? apiTimeType : undefined,
    platform: apiPlatform !== PlatformType.ALL ? apiPlatform : undefined,
  };

  // API 数据获取
  const {
    data: projectListData,
    isLoading: projectListLoading,
    error: projectListError,
  } = useGraduationProjectList(projectListParams);

  // TPC 队列 hook
  const addToTpcQueueMutation = useAddToTpcQueue();

  // 事件处理函数
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdateTimeFilterChange = (value: string) => {
    setUpdateTimeFilter(value);
    setCurrentPage(1);
  };

  const handlePlatformFilterChange = (value: string) => {
    setPlatformFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const [batchModalVisible, setBatchModalVisible] = useState(false);
  const [batchTimeCategory, setBatchTimeCategory] = useState<string>('');
  const [batchQueueType, setBatchQueueType] = useState<'normal' | 'priority'>(
    'normal'
  );
  const [loadingQueues, setLoadingQueues] = useState<Set<string>>(new Set());

  // 获取更新时间分类
  const getUpdateTimeCategory = (updatedAt: string): string => {
    const now = new Date();
    const updateTime = new Date(updatedAt);
    const diffTime = now.getTime() - updateTime.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) return '1个月内';
    if (diffDays <= 90) return '超过1个月';
    if (diffDays <= 180) return '超过3个月';
    if (diffDays <= 365) return '超过半年';
    return '超过1年';
  };

  // 获取状态标签颜色
  const getStatusColor = (state: number): string => {
    switch (state) {
      case 3: // 已通过（毕业）
        return 'green';
      case 0: // 待澄清
      case 1: // 待确认
      case 2: // 待审批
      case 4: // 待 QA 确认
        return 'orange';
      case -1: // 已拒绝
        return 'red';
      default:
        return 'default';
    }
  };

  // 获取平台显示名称
  const getPlatformDisplay = (
    platform: string
  ): 'GitHub' | 'Gitee' | 'GitLab' | 'GitCode' => {
    const platformMap: Record<
      string,
      'GitHub' | 'Gitee' | 'GitLab' | 'GitCode'
    > = {
      github: 'GitHub',
      gitee: 'Gitee',
      gitlab: 'GitLab',
      gitcode: 'GitCode',
    };
    return platformMap[platform.toLowerCase()] || 'GitHub';
  };

  // 转换 API 数据为表格数据
  const transformedData: GraduationData[] = useMemo(() => {
    if (!projectListData?.items) return [];

    return projectListData.items.map((item: ProjectListItem) => ({
      ...item,
      key: item.report_id.toString(),
      status:
        PROJECT_STATE_MAP[item.state as keyof typeof PROJECT_STATE_MAP] ||
        '未知',
      statusColor: getStatusColor(item.state),
      platformDisplay: getPlatformDisplay(item.platform),
      lastUpdateCategory: getUpdateTimeCategory(item.updated_at),
      displayName: item.name,
      maintainerName: item.login_binds?.nickname || item.user_name,
    }));
  }, [projectListData]);

  // 客户端过滤数据（除了搜索，搜索由 API 处理）
  const filteredData = useMemo(() => {
    let filtered = transformedData;

    if (updateTimeFilter !== 'all') {
      filtered = filtered.filter(
        (item) => item.lastUpdateCategory === updateTimeFilter
      );
    }

    if (platformFilter !== 'all') {
      filtered = filtered.filter(
        (item) => item.platformDisplay === platformFilter
      );
    }

    return filtered;
  }, [transformedData, updateTimeFilter, platformFilter]);

  // 处理单个项目加入队列
  const handleAddToQueue = async (
    reportId: number,
    queueType: 'normal' | 'priority'
  ) => {
    const queueTypeText = queueType === 'priority' ? '优先队列' : '普通队列';

    setLoadingQueues((prev) => new Set(prev).add(`${reportId}-${queueType}`));

    try {
      await addToTpcQueueMutation.mutateAsync({
        report_id: String(reportId),
        report_type: TpcReportType.GRADUATION,
        type:
          queueType === 'priority'
            ? TpcQueueType.PRIORITY
            : TpcQueueType.NORMAL,
      });

      message.success(`已成功加入${queueTypeText}`);
    } catch (error) {
      console.error('加入队列失败:', error);
      message.error(`加入${queueTypeText}失败，请重试`);
    } finally {
      setLoadingQueues((prev) => {
        const newSet = new Set(prev);
        newSet.delete(`${reportId}-${queueType}`);
        return newSet;
      });
    }
  };

  // 批量操作处理函数
  const handleBatchQueue = () => {
    if (!batchTimeCategory) {
      message.warning('请选择时间类别');
      return;
    }

    const targetProjects = transformedData.filter(
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
      dataIndex: 'displayName',
      key: 'name',
      width: '15%',
      render: (text: string, record: GraduationData) => (
        <Tooltip title={record.code_url}>
          <a
            href={record.code_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            {text}
          </a>
        </Tooltip>
      ),
    },
    {
      title: '平台',
      dataIndex: 'platformDisplay',
      key: 'platform',
      width: '8%',
      render: (platform: string) => (
        <Tag
          color={
            platform === 'GitHub'
              ? 'blue'
              : platform === 'Gitee'
              ? 'red'
              : platform === 'GitCode'
              ? 'orange'
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
      render: (status: string, record: GraduationData) => (
        <Tag color={record.statusColor}>{status}</Tag>
      ),
    },
    {
      title: '维护者',
      dataIndex: 'maintainerName',
      key: 'maintainer',
      width: '10%',
      render: (text: string, record: GraduationData) => (
        <div className="flex items-center">
          {record.login_binds?.avatar_url && (
            <img
              src={record.login_binds.avatar_url}
              alt={text}
              className="mr-2 h-6 w-6 rounded-full"
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '毕业时间',
      dataIndex: 'created_at',
      key: 'graduated_at',
      width: '10%',
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdateCategory',
      key: 'lastUpdateCategory',
      width: '12%',
      render: (category: string, record: GraduationData) => {
        const getTimeColor = (cat: string) => {
          switch (cat) {
            case '1 个月内':
              return 'green';
            case '超过 1 个月':
              return 'blue';
            case '超过 3 个月':
              return 'cyan';
            case '超过半年':
              return 'orange';
            case '超过 1 年':
              return 'red';
            default:
              return 'default';
          }
        };

        return (
          <Tooltip
            title={`具体时间: ${new Date(record.updated_at).toLocaleString(
              'zh-CN'
            )}`}
          >
            <Tag color={getTimeColor(category)}>{category}</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: '25%',
      render: (_, record: GraduationData) => (
        <div className="flex gap-2">
          <Button
            type="link"
            size="small"
            loading={loadingQueues.has(`${record.report_id}-normal`)}
            onClick={() => handleAddToQueue(record.report_id, 'normal')}
          >
            加入队列
          </Button>
          <Button
            type="link"
            size="small"
            loading={loadingQueues.has(`${record.report_id}-priority`)}
            onClick={() => handleAddToQueue(record.report_id, 'priority')}
          >
            加入优先队列
          </Button>
          {/* <Button type="link" size="small" danger>
            删除
          </Button> */}
        </div>
      ),
    },
  ];

  return (
    <>
      <Card title="毕业项目管理" className="mt-4">
        {/* 操作区域 */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <Input
              placeholder="搜索项目名称"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearchChange}
              style={{ width: 300 }}
              allowClear
            />
            <Space>
              <Button onClick={() => setBatchModalVisible(true)}>
                批量加入队列
              </Button>
            </Space>
          </div>

          {/* 过滤器区域 */}
          <div className="mt-4 flex items-center gap-4">
            <Select
              placeholder="选择平台"
              value={platformFilter}
              onChange={handlePlatformFilterChange}
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
              onChange={handleUpdateTimeFilterChange}
              style={{ width: 150 }}
              allowClear
            >
              <Option value="all">全部时间</Option>
              <Option value="1个月内">1 个月内</Option>
              <Option value="超过1个月">超过 1 个月</Option>
              <Option value="超过3个月">超过 3 个月</Option>
              <Option value="超过半年">超过半年</Option>
              <Option value="超过1年">超过 1 年</Option>
            </Select>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={projectListLoading}
          pagination={{
            current: currentPage,
            total: projectListData?.total_count || 0,
            pageSize: pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
            onShowSizeChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
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
              选择时间类别：
            </label>
            <Radio.Group
              value={batchTimeCategory}
              onChange={(e) => setBatchTimeCategory(e.target.value)}
              className="w-full"
            >
              <div className="space-y-2">
                <Radio value="超过1个月">
                  超过 1 个月未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      transformedData.filter(
                        (item) => item.lastUpdateCategory === '超过 1 个月'
                      ).length
                    }{' '}
                    个项目)
                  </span>
                </Radio>
                <Radio value="超过3个月">
                  超过 3 个月未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      transformedData.filter(
                        (item) => item.lastUpdateCategory === '超过 3 个月'
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
                      transformedData.filter(
                        (item) => item.lastUpdateCategory === '超过半年'
                      ).length
                    }{' '}
                    个项目)
                  </span>
                </Radio>
                <Radio value="超过1年">
                  超过 1 年未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {
                      transformedData.filter(
                        (item) => item.lastUpdateCategory === '超过 1 年'
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
              选择队列类型：
            </label>
            <Radio.Group
              value={batchQueueType}
              onChange={(e) => setBatchQueueType(e.target.value)}
            >
              <Radio value="normal">常规队列</Radio>
              <Radio value="priority">优先队列</Radio>
            </Radio.Group>
          </div>

          {batchTimeCategory && (
            <div className="rounded bg-blue-50 p-3">
              <p className="text-sm text-blue-700">
                将会把{' '}
                <strong>
                  {
                    transformedData.filter(
                      (item) => item.lastUpdateCategory === batchTimeCategory
                    ).length
                  }
                </strong>{' '}
                个<strong>{batchTimeCategory}</strong>的项目进行
                <strong>
                  {batchQueueType === 'priority' ? '优先队列' : '常规队列'}
                </strong>
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default GraduationManagement;
