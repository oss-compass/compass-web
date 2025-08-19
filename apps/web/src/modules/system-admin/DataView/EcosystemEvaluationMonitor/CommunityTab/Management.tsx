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
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import {
  useCommunityList,
  CommunityTimeType,
  CommunityPlatformType,
  type CommunityListRequest,
  type CommunityListItem,
} from '../../../hooks';

const { Option } = Select;

interface CommunityData extends CommunityListItem {
  key: string;
  community: string;
  communityUrl: string;
  platformDisplay: 'GitHub' | 'Gitee' | 'GitCode';
  category: string;
  organization: string;
  statusDisplay: string;
  statusColor: string;
  lastUpdate: string;
  lastUpdateCategory: string;
  submitter: string;
}

const CommunityManagement: React.FC = () => {
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

  // 将前端过滤器值映射到 API 参数
  const apiTimeType = useMemo(() => {
    const timeMapping: Record<string, number> = {
      '1 个月内': CommunityTimeType.ONE_MONTH,
      '超过 1 个月': CommunityTimeType.THREE_MONTHS,
      '超过 3 个月': CommunityTimeType.SIX_MONTHS,
      超过半年: CommunityTimeType.TWELVE_MONTHS,
    };
    return timeMapping[updateTimeFilter];
  }, [updateTimeFilter]);

  const apiPlatform = useMemo(() => {
    return platformFilter !== 'all' ? platformFilter.toLowerCase() : undefined;
  }, [platformFilter]);

  // API 请求参数
  const communityListParams: CommunityListRequest = {
    page: currentPage,
    per_page: pageSize,
    keywords: searchText || undefined,
    time_type: apiTimeType,
    platform: apiPlatform,
  };

  // API 数据获取
  const {
    data: communityListData,
    isLoading: communityListLoading,
    error: communityListError,
  } = useCommunityList(communityListParams);

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
  const transformedData: CommunityData[] = useMemo(() => {
    if (!communityListData?.items) return [];

    return communityListData.items.map((item: CommunityListItem) => {
      const statusInfo = getStatusDisplay(item.status);
      const community = item.label.split('/').pop() || item.label;

      return {
        ...item,
        key: item.label,
        community,
        communityUrl: `https://${item.platform}.com/${item.label}`,
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
  }, [communityListData]);

  // 批量操作处理函数
  const handleBatchQueue = () => {
    if (!batchTimeCategory) {
      message.warning('请选择时间类别');
      return;
    }

    const targetCommunities = transformedData.filter(
      (item) => item.lastUpdateCategory === batchTimeCategory
    );

    if (targetCommunities.length === 0) {
      message.warning(`没有找到${batchTimeCategory}的社区`);
      return;
    }

    const queueTypeText =
      batchQueueType === 'priority' ? '优先队列' : '普通队列';

    Modal.confirm({
      title: '确认批量操作',
      content: `确定要将 ${targetCommunities.length} 个${batchTimeCategory}的社区加入${queueTypeText}吗？`,
      onOk: () => {
        message.success(
          `成功将 ${targetCommunities.length} 个社区加入${queueTypeText}`
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
      title: '社区名称',
      dataIndex: 'label',
      key: 'label',
      width: '20%',
      render: (text: string, record: CommunityData) => (
        <a
          href={record.communityUrl}
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
      title: '社区平台',
      dataIndex: 'platformDisplay',
      key: 'platform',
      render: (platform: CommunityData['platformDisplay']) => {
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
      render: (status: string, record: CommunityData) => (
        <Tag color={record.statusColor}>{status}</Tag>
      ),
    },
    {
      title: '上次更新时间',
      dataIndex: 'lastUpdateCategory',
      key: 'lastUpdateCategory',
      width: '15%',
      render: (category: string, record: CommunityData) => {
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
      render: () => (
        <div className="flex cursor-pointer gap-2 text-[#3e8eff]">
          <a>加入队列</a>
          <a>加入优先队列</a>
          <a>删除</a>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card title="社区管理" className="mt-4">
        {/* 操作区域 */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <Input
              placeholder="搜索社区名称"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearchChange}
              style={{ width: 300 }}
              allowClear
            />
            <Space>
              <Button onClick={() => {}}>设置自动更新周期</Button>
              <Button onClick={() => setBatchModalVisible(true)}>
                批量加入队列
              </Button>
              <Button type="primary" icon={<PlusOutlined />}>
                新增社区
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
          loading={communityListLoading}
          pagination={{
            current: currentPage,
            total: communityListData?.total_count || 0,
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
              选择时间类别:
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
                    个社区)
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
                    个社区)
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
                    个社区)
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
                    个社区)
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
                个<strong>{batchTimeCategory}</strong>的社区加入
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

export default CommunityManagement;
