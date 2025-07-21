import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Tabs,
  Select,
  Input,
  Space,
  Statistic,
  Row,
  Col,
  Avatar,
  Tag,
} from 'antd';
import {
  ApiOutlined,
  DatabaseOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import {
  useDataHubRestApiList,
  useDataHubRestApiTable,
  useDataHubArchiveTable,
  useDatahubArchiveRankData,
  DataHubRestApiTableItem,
  DataHubArchiveTableItem,
} from './hooks/useAdminApi';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { getLocalizedText } from '@modules/dataHub/utils';

interface DataHubUserUsageCardProps {
  className?: string;
}

const DataHubUserUsageCard: React.FC<DataHubUserUsageCardProps> = ({
  className,
}) => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'api' | 'archive'>('api');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedApi, setSelectedApi] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 获取API列表数据
  const {
    data: apiListData,
    isLoading: isApiListLoading,
    error: apiListError,
  } = useDataHubRestApiList();

  // 获取API表格数据
  const {
    data: apiTableData,
    isLoading: isApiTableLoading,
    error: apiTableError,
  } = useDataHubRestApiTable(
    currentPage,
    pageSize,
    selectedApi,
    searchKeyword,
    activeTab === 'api'
  );

  // 获取归档表格数据
  const {
    data: archiveTableData,
    isLoading: isArchiveTableLoading,
    error: archiveTableError,
  } = useDataHubArchiveTable(
    currentPage,
    pageSize,
    selectedApi,
    searchKeyword,
    activeTab === 'archive'
  );

  // 获取归档排名数据（用于API选项）
  const {
    data: archiveRankData,
    isLoading: isArchiveRankLoading,
    error: archiveRankError,
  } = useDatahubArchiveRankData();

  // 错误处理
  if (apiListError || apiTableError || archiveTableError || archiveRankError) {
    console.error('API Error:', {
      apiListError,
      apiTableError,
      archiveTableError,
      archiveRankError,
    });
  }

  // 格式化日期
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm', {
        locale: zhCN,
      });
    } catch (e) {
      return dateString;
    }
  };

  // 表格列定义
  const columns: ColumnsType<
    DataHubRestApiTableItem | DataHubArchiveTableItem
  > = [
    {
      title: '用户信息',
      dataIndex: 'login_binds',
      key: 'userInfo',
      width: 200,
      render: (loginBinds: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar
            src={loginBinds?.avatar_url}
            icon={<UserOutlined />}
            size="small"
          />
          <span>{loginBinds?.nickname || loginBinds?.account || '-'}</span>
        </div>
      ),
    },
    {
      title: activeTab === 'api' ? 'API信息' : '数据集名称',
      dataIndex: 'api_path',
      key: 'api_info',
      render: (apiPath: string) => {
        let apiInfo: any = null;

        if (activeTab === 'api' && apiListData) {
          apiInfo = apiListData.find((api: any) => api.api_path === apiPath);
        } else if (activeTab === 'archive' && archiveRankData) {
          apiInfo = archiveRankData.find((api: any) => api.name === apiPath);
        }

        return (
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>
              {activeTab === 'api' ? <ApiOutlined /> : <DatabaseOutlined />}
              <span style={{ marginLeft: 4 }}>{apiPath}</span>
            </div>
            {apiInfo && (
              <div style={{ fontSize: 12, color: '#666' }}>
                {activeTab === 'api'
                  ? getLocalizedText(apiInfo.description || '', i18n.language)
                  : `总调用: ${apiInfo.value}`}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: activeTab === 'api' ? '调用次数' : '下载次数',
      dataIndex: 'call_count',
      key: 'usage_count',
      width: 120,
      sorter: true,
      render: (count: number) => (
        <Tag color={count > 100 ? 'red' : count > 50 ? 'orange' : 'blue'}>
          {count?.toLocaleString() || 0}
        </Tag>
      ),
    },
    {
      title: '最后使用时间',
      dataIndex: 'last_called_at',
      key: 'lastUsed',
      width: 180,
      sorter: true,
      render: (date: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <CalendarOutlined style={{ color: '#666' }} />
          <span>{formatDateTime(date)}</span>
        </div>
      ),
    },
  ];

  // 处理表格数据
  const processedData = useMemo(() => {
    const data =
      activeTab === 'api' ? apiTableData?.items : archiveTableData?.items;
    if (!data) return [];

    return data.map((item, index) => ({
      ...item,
      key: `${item.user_id}-${item.api_path}-${index}`,
    }));
  }, [apiTableData, archiveTableData, activeTab]);

  // 筛选数据（根据搜索关键词）
  const filteredData = useMemo(() => {
    if (!searchKeyword) return processedData;
    const keyword = searchKeyword.toLowerCase();
    return processedData.filter(
      (item) =>
        item.login_binds?.nickname?.toLowerCase().includes(keyword) ||
        item.login_binds?.account?.toLowerCase().includes(keyword) ||
        item.api_path?.toLowerCase().includes(keyword)
    );
  }, [processedData, searchKeyword]);

  // 获取API选项列表
  const getApiOptions = () => {
    const data = activeTab === 'api' ? apiListData : archiveRankData;
    if (!data) return [];

    return data.map((item: any) => {
      const description =
        item.description ||
        (activeTab === 'archive' ? `调用次数: ${item.value}` : '');
      const localizedDescription = getLocalizedText(description, i18n.language);

      return {
        label: (
          <div>
            <div style={{ fontWeight: 500 }}>{item.api_path || item.name}</div>
            <div style={{ fontSize: 12, color: '#666' }}>
              {localizedDescription}
            </div>
          </div>
        ),
        value: item.api_path || item.name,
      };
    });
  };

  // API选项
  const apiOptions = useMemo(
    () => [
      { label: `全部${activeTab === 'api' ? 'API' : '数据集'}`, value: '' },
      ...getApiOptions(),
    ],
    [activeTab, apiListData, archiveRankData]
  );

  // 获取统计信息
  const statistics = useMemo(() => {
    const data = activeTab === 'api' ? apiTableData : archiveTableData;
    if (!data) return { totalUsers: 0, totalCalls: 0, totalApis: 0 };

    const totalUsers = data.total_count || 0;
    const totalCalls =
      data.items?.reduce((sum, item) => sum + (item.call_count || 0), 0) || 0;
    const uniqueApis =
      new Set(data.items?.map((item) => item.api_path)).size || 0;

    return {
      totalUsers,
      totalCalls,
      totalApis: uniqueApis,
    };
  }, [apiTableData, archiveTableData, activeTab]);

  // 处理tab切换
  const handleTabChange = (key: string) => {
    setActiveTab(key as 'api' | 'archive');
    setCurrentPage(1);
    setSelectedApi(''); // 重置API筛选
    setSearchKeyword(''); // 重置搜索关键词
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const tabItems = [
    {
      key: 'api',
      label: (
        <span>
          <ApiOutlined />
          API
        </span>
      ),
    },
    {
      key: 'archive',
      label: (
        <span>
          <DatabaseOutlined />
          归档数据
        </span>
      ),
    },
  ];

  // 当前加载状态
  const isLoading =
    activeTab === 'api' ? isApiTableLoading : isArchiveTableLoading;
  const currentTableData =
    activeTab === 'api' ? apiTableData : archiveTableData;

  return (
    <Card
      title="中枢服务用户使用情况"
      className={className}
      loading={isLoading}
      extra={
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={tabItems}
          size="small"
        />
      }
    >
      <div style={{ marginBottom: 16 }}>
        {/* 筛选控件 */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 16,
            flexWrap: 'wrap',
          }}
        >
          <Select
            placeholder={`选择${activeTab === 'api' ? 'API' : '数据集'}`}
            style={{ minWidth: 300 }}
            value={selectedApi}
            onChange={setSelectedApi}
            allowClear
            showSearch
            optionFilterProp="children"
            options={apiOptions}
          />
          <Input.Search
            placeholder={`搜索用户${activeTab === 'api' ? 'API' : '数据集'}`}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
        </div>
      </div>

      {/* 表格 */}
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: currentTableData?.total_count || 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size || 20);
          },
        }}
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default DataHubUserUsageCard;
