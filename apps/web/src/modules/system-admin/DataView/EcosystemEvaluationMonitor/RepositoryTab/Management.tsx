import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Input,
  Button,
  Space,
  Tag,
  Select,
  Tooltip,
  Modal,
  Radio,
  message,
  Form,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import {
  useRepositoryList,
  useAddToQueue,
  useBatchAddToQueue,
  useRepositoryUpdateOverview,
  RepositoryTimeType,
  RepositoryPlatformType,
  QueueType,
  type RepositoryListRequest,
  type RepositoryListItem,
} from '../../../hooks';

const { Option } = Select;

interface RepositoryData extends RepositoryListItem {
  key: string;
  repository: string;
  repositoryUrl: string;
  platformDisplay: 'GitHub' | 'Gitee' | 'GitCode';
  category: string;
  organization: string;
  statusDisplay: string;
  statusColor: string;
  lastUpdate: string;
  lastUpdateCategory: string;
  submitter: string;
}

const RepositoryManagement: React.FC = () => {
  // 状态管理
  const [searchText, setSearchText] = useState('');
  const [updateTimeFilter, setUpdateTimeFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [batchModalVisible, setBatchModalVisible] = useState(false);
  const [batchTimeCategory, setBatchTimeCategory] = useState<string>('');
  const [batchQueueType, setBatchQueueType] = useState<'normal' | 'priority'>(
    'normal'
  );
  const [loadingQueues, setLoadingQueues] = useState<Set<string>>(new Set());
  const [addRepoModalVisible, setAddRepoModalVisible] = useState(false);
  const [addRepoForm] = Form.useForm();
  const [addRepoLoading, setAddRepoLoading] = useState(false);
  const [batchLoading, setBatchLoading] = useState(false);

  // 将前端过滤器值映射到 API 参数
  const apiTimeType = useMemo(() => {
    if (updateTimeFilter === 'all') return undefined;
    return Number(updateTimeFilter);
  }, [updateTimeFilter]);

  const apiPlatform = useMemo(() => {
    return platformFilter !== 'all' ? platformFilter.toLowerCase() : undefined;
  }, [platformFilter]);

  // API 请求参数
  const repositoryListParams: RepositoryListRequest = {
    page: currentPage,
    per_page: pageSize,
    keywords: searchText || undefined,
    time_type: apiTimeType,
    platform: apiPlatform,
  };

  // API 数据获取
  const {
    data: repositoryListData,
    isLoading: repositoryListLoading,
    error: repositoryListError,
  } = useRepositoryList(repositoryListParams);

  // 获取仓库更新时间分布数据
  const {
    data: repositoryUpdateOverview,
    isLoading: updateOverviewLoading,
  } = useRepositoryUpdateOverview();

  // 加入队列 hook
  const addToQueueMutation = useAddToQueue();

  // 批量加入队列 hook
  const batchAddToQueueMutation = useBatchAddToQueue();

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

  // 处理加入队列
  const handleAddToQueue = async (
    record: RepositoryData,
    queueType: 'normal' | 'priority'
  ) => {
    const queueId = `${record.key}_${queueType}`;

    if (loadingQueues.has(queueId)) {
      return; // 防止重复提交
    }

    setLoadingQueues((prev) => new Set(prev).add(queueId));

    try {
      await addToQueueMutation.mutateAsync({
        project_url: record.label,
        type: queueType === 'priority' ? QueueType.PRIORITY : QueueType.NORMAL,
      });
      message.success(
        `成功将 ${record.repository} 加入${queueType === 'priority' ? '优先' : '普通'
        }队列`
      );
    } catch (error) {
      message.error(
        `加入队列失败：${error instanceof Error ? error.message : '未知错误'}`
      );
    } finally {
      setLoadingQueues((prev) => {
        const newSet = new Set(prev);
        newSet.delete(queueId);
        return newSet;
      });
    }
  };

  // 验证仓库链接
  const validateRepositoryUrl = (url: string): boolean => {
    const githubPattern = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/;
    const giteePattern = /^https:\/\/gitee\.com\/[\w.-]+\/[\w.-]+\/?$/;
    return githubPattern.test(url) || giteePattern.test(url);
  };

  // 处理新增仓库
  const handleAddRepository = async (values: { repositoryUrl: string; queueType: 'normal' | 'priority' }) => {
    setAddRepoLoading(true);
    try {
      await addToQueueMutation.mutateAsync({
        project_url: values.repositoryUrl,
        type: values.queueType === 'priority' ? QueueType.PRIORITY : QueueType.NORMAL,
      });
      message.success(
        `成功将仓库加入${values.queueType === 'priority' ? '优先' : '普通'}队列`
      );
      setAddRepoModalVisible(false);
      addRepoForm.resetFields();
    } catch (error) {
      message.error(
        `加入队列失败：${error instanceof Error ? error.message : '未知错误'}`
      );
    } finally {
      setAddRepoLoading(false);
    }
  };

  // 获取平台显示名称
  const getPlatformDisplay = (
    platform: string
  ): 'GitHub' | 'Gitee' | 'GitCode' => {
    const platformMap: Record<string, 'GitHub' | 'Gitee' | 'GitCode'> = {
      github: 'GitHub',
      gitee: 'Gitee',
      gitcode: 'GitCode',
    };
    return platformMap[platform.toLowerCase()] || 'GitHub';
  };

  // 获取状态显示
  const getStatusDisplay = (
    status: string
  ): { text: string; color: string } => {
    const statusMap: Record<string, { text: string; color: string }> = {
      complete: { text: '更新成功', color: 'green' },
      progress: { text: '更新中', color: 'orange' },
      queued: { text: '在队列中', color: 'blue' },
    };
    return statusMap[status] || { text: '未知', color: 'default' };
  };

  // 获取更新时间分类
  const getUpdateTimeCategory = (updatedStatus: string): string => {
    const categoryMap: Record<string, string> = {
      within_1m: '1 个月内',
      over_1m: '超过 1 个月',
      over_3m: '超过 3 个月',
      over_6m: '超过半年',
      over_12m: '超过 1 年',
    };
    return categoryMap[updatedStatus] || '未知';
  };

  // 转换 API 数据为表格数据
  const transformedData: RepositoryData[] = useMemo(() => {
    if (!repositoryListData?.items) return [];

    return repositoryListData.items.map((item: RepositoryListItem) => {
      const statusInfo = getStatusDisplay(item.status);
      const repository = item.label.split('/').pop() || item.label;

      return {
        ...item,
        key: item.label,
        repository,
        repositoryUrl: item.label,
        platformDisplay: getPlatformDisplay(item.platform),
        category: '', // API 不提供分类信息，设为默认值
        organization: '', // API 不提供组织信息，设为默认值
        statusDisplay: statusInfo.text,
        statusColor: statusInfo.color,
        lastUpdate: new Date(item.updated_at).toLocaleString('zh-CN'),
        lastUpdateCategory: getUpdateTimeCategory(item.updated_status),
        submitter: item.user_name || '系统',
      };
    });
  }, [repositoryListData]);

  // 批量操作处理函数
  const handleBatchQueue = async () => {
    if (!batchTimeCategory) {
      message.warning('请选择时间类别');
      return;
    }

    // 将时间类别映射为 API 所需的数字参数
    const timeTypeMap: Record<string, number> = {
      '超过 1 个月': 1,
      '超过 3 个月': 3,
      '超过半年': 6,
      '超过 1 年': 12,
    };

    const timeType = timeTypeMap[batchTimeCategory];
    if (!timeType) {
      message.error('无效的时间类别');
      return;
    }

    const queueType = batchQueueType === 'priority' ? 1 : 0;
    const queueTypeText = batchQueueType === 'priority' ? '优先队列' : '普通队列';

    Modal.confirm({
      title: '确认批量操作',
      content: `确定要将${batchTimeCategory}的仓库加入${queueTypeText}吗？`,
      onOk: async () => {
        setBatchLoading(true);
        try {
          const result = await batchAddToQueueMutation.mutateAsync({
            time_type: timeType,
            queue_type: queueType,
          });

          message.success(result.message || `成功加入${queueTypeText}`);
          setBatchModalVisible(false);
          setBatchTimeCategory('');
          setBatchQueueType('normal');
        } catch (error) {
          message.error(
            `批量加入队列失败：${error instanceof Error ? error.message : '未知错误'}`
          );
        } finally {
          setBatchLoading(false);
        }
      },
    });
  };

  // 表格列配置
  const columns = [
    {
      title: '仓库名称',
      dataIndex: 'label',
      key: 'label',
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
      title: '仓库平台',
      dataIndex: 'platformDisplay',
      key: 'platform',
      render: (platform: RepositoryData['platformDisplay']) => {
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
      dataIndex: 'statusDisplay',
      key: 'status',
      width: '10%',
      render: (status: string, record: RepositoryData) => (
        <Tag color={record.statusColor}>{status}</Tag>
      ),
    },
    {
      title: '上次更新时间',
      dataIndex: 'lastUpdateCategory',
      key: 'lastUpdateCategory',
      width: '15%',
      render: (category: string, record: RepositoryData) => {
        const config = {
          '1 个月内': { color: '#52c41a' },
          '超过 1 个月': { color: '#1890ff' },
          '超过 3 个月': { color: '#13c2c2' },
          超过半年: { color: '#faad14' },
          '超过 1 年': { color: '#ff4d4f' },
        };
        const colorConfig = config[category as keyof typeof config];
        const color = colorConfig?.color || '#d9d9d9';

        return (
          <Tooltip title={`具体时间: ${record.lastUpdate}`}>
            <Tag color={color}>{category}</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: '提交人',
      dataIndex: 'submitter',
      key: 'submitter',
      width: '10%',
    },
    {
      title: '操作',
      key: 'action',
      width: '25%',
      render: (_, record: RepositoryData) => {
        const normalQueueId = `${record.key}_normal`;
        const priorityQueueId = `${record.key}_priority`;
        const isNormalLoading = loadingQueues.has(normalQueueId);
        const isPriorityLoading = loadingQueues.has(priorityQueueId);

        return (
          <div className="flex gap-2 text-[#3e8eff]">
            <a
              className={`cursor-pointer hover:underline ${isNormalLoading ? 'cursor-not-allowed opacity-50' : ''
                }`}
              onClick={() =>
                !isNormalLoading && handleAddToQueue(record, 'normal')
              }
            >
              {isNormalLoading ? '加入中...' : '加入队列'}
            </a>
            <a
              className={`cursor-pointer hover:underline ${isPriorityLoading ? 'cursor-not-allowed opacity-50' : ''
                }`}
              onClick={() =>
                !isPriorityLoading && handleAddToQueue(record, 'priority')
              }
            >
              {isPriorityLoading ? '加入中...' : '加入优先队列'}
            </a>
            {/* <a className="cursor-pointer hover:underline">删除</a> */}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Card title="仓库管理" className="mt-4">
        {/* 操作区域 */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <Input
              placeholder="搜索仓库名称"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearchChange}
              style={{ width: 300 }}
              allowClear
            />
            <Space>
              <Button onClick={() => { }}>设置自动更新周期</Button>
              <Button onClick={() => setBatchModalVisible(true)}>
                批量加入队列
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setAddRepoModalVisible(true)}
              >
                新增仓库
              </Button>
              <Button icon={<UploadOutlined />}>批量导入</Button>
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
              <Option value="GitCode">GitCode</Option>
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
          dataSource={transformedData}
          loading={repositoryListLoading}
          pagination={{
            current: currentPage,
            total: repositoryListData?.total_count || 0,
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
        confirmLoading={batchLoading}
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
                <Radio value="超过 1 个月">
                  超过 1 个月未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {repositoryUpdateOverview?.over_1m || 0}{' '}
                    个仓库)
                  </span>
                </Radio>
                <Radio value="超过 3 个月">
                  超过 3 个月未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {repositoryUpdateOverview?.over_3m || 0}{' '}
                    个仓库)
                  </span>
                </Radio>
                <Radio value="超过半年">
                  超过半年未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {repositoryUpdateOverview?.over_6m || 0}{' '}
                    个仓库)
                  </span>
                </Radio>
                <Radio value="超过 1 年">
                  超过 1 年未更新
                  <span className="ml-2 text-gray-500">
                    (
                    {repositoryUpdateOverview?.over_12m || 0}{' '}
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
                    transformedData.filter(
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

      {/* 新增仓库模态框 */}
      <Modal
        title="新增仓库"
        open={addRepoModalVisible}
        onCancel={() => {
          setAddRepoModalVisible(false);
          addRepoForm.resetFields();
        }}
        footer={null}
        width={500}
      >
        <Form
          form={addRepoForm}
          layout="vertical"
          onFinish={handleAddRepository}
          initialValues={{ queueType: 'normal' }}
        >
          <Form.Item
            label="仓库链接"
            name="repositoryUrl"
            rules={[
              { required: true, message: '请输入仓库链接' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  if (validateRepositoryUrl(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请输入有效的 GitHub 或 Gitee 仓库链接'));
                },
              },
            ]}
          >
            <Input
              placeholder="请输入 GitHub 或 Gitee 仓库链接，例如：https://github.com/user/repo"
            />
          </Form.Item>

          <Form.Item
            label="队列类型"
            name="queueType"
            rules={[{ required: true, message: '请选择队列类型' }]}
          >
            <Radio.Group>
              <Radio value="normal">普通队列</Radio>
              <Radio value="priority">优先队列</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  setAddRepoModalVisible(false);
                  addRepoForm.resetFields();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={addRepoLoading}
              >
                确认添加
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RepositoryManagement;
