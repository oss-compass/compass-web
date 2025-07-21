import React, { useState } from 'react';
import { Card, Button, Space, Input, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MyTable from '@common/components/Table';
import { DateProvider } from '../Dashboard/contexts/DateContext';
import NavDatePicker from '../Dashboard/components/NavDatePicker';
import { useUserListData } from '../Dashboard/hooks/useAdminApi';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { getHubUrl } from '@common/utils';

interface UserListData {
  key: string;
  id: number;
  name: string;
  email: string;
  last_sign_in_at: string;
  role_level: number;
  role_level_desc: string;
  created_at: string;
  ip?: string;
  country?: string;
  country_desc?: string;
  avg_stay_per_day?: number;
  click_stats?: Record<string, any>;
  report_count?: number;
  login_binds?: any;
}

interface BehaviorProfileProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const BehaviorProfile: React.FC<BehaviorProfileProps> = ({ data }) => {
  const [hoveredType, setHoveredType] = useState<string>('');
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="w-full">
      <div className="flex h-2.5 items-center overflow-hidden">
        {data.map(({ name, value, color }) => {
          const width = maxValue > 0 ? (value / maxValue) * 100 : 0;
          return (
            <Tooltip key={name} title={`${name}: ${value}`}>
              <div
                style={{
                  backgroundColor: color,
                  opacity: 0.6,
                  width: `${width}%`,
                  border: hoveredType === name ? '1px solid #000' : 'none',
                }}
                className="h-full cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredType(name)}
                onMouseLeave={() => setHoveredType('')}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

// API 字段到中文服务名称的映射
const getServiceBehaviorData = (clickStats: Record<string, any>) => {
  const baseData = [
    { name: '开源健康评估', value: 0, color: '#1890ff', key: 'analyze' },
    { name: '开发者画像评估', value: 0, color: '#52c41a', key: 'developer' },
    { name: '开源选型评估', value: 0, color: '#faad14', key: 'os-selection' },
    { name: '开源态势洞察', value: 0, color: '#f5222d', key: 'os-situation' },
    { name: '开源数据中枢', value: 0, color: '#722ed1', key: 'dataHub' },
    { name: '实验室', value: 0, color: '#13c2c2', key: 'lab' },
  ];

  return baseData
    .map((item) => ({
      name: item.name,
      value: clickStats?.[item.key] || 0,
      color: item.color,
    }))
    .filter((item) => item.value > 0); // 只显示有数据的服务
};

const UserListContent: React.FC = () => {
  const [searchKeywords, setSearchKeywords] = useState(''); // 实际搜索用的关键词
  const [inputValue, setInputValue] = useState(''); // 输入框的值
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // 使用新的 API hook
  const { data, isLoading, error } = useUserListData(
    searchKeywords,
    currentPage,
    pageSize,
    true
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'yyyy-MM-dd', {
        locale: zhCN,
      });
    } catch (e) {
      return dateString;
    }
  };

  const columns: ColumnsType<UserListData> = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (name, record) => (
        <div>
          <a
            href={getHubUrl(
              record.login_binds.provider,
              record.login_binds.nickname
            )}
            target="_blank"
            className="cursor-pointer font-medium text-blue-600 hover:underline"
          >
            {name}
          </a>
        </div>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: '16%',
    },
    {
      title: '地域',
      key: 'location',
      width: '10%',
      render: (_, record) => (
        <div>
          <div className="font-medium">
            {record.country_desc || record.country || '-'}
          </div>
          {record.ip && (
            <div className="text-xs text-gray-500">IP: {record.ip}</div>
          )}
        </div>
      ),
    },
    {
      title: '服务使用量 (点击量)',
      dataIndex: 'click_stats',
      key: 'click_stats',
      width: '20%',
      render: (clickStats: Record<string, any>) => {
        const behaviorData = getServiceBehaviorData(clickStats);
        const totalClicks = behaviorData.reduce(
          (sum, item) => sum + item.value,
          0
        );

        if (totalClicks === 0) {
          return <div className="text-center text-gray-500">暂无数据</div>;
        }

        return (
          <div className="space-y-2">
            <div className="text-center text-sm font-medium">
              总点击量：{totalClicks}
            </div>
            <BehaviorProfile data={behaviorData} />
          </div>
        );
      },
    },
    {
      title: '平均活跃时长',
      dataIndex: 'avg_stay_per_day',
      key: 'avg_stay_per_day',
      width: '10%',
      render: (time: number) => (
        <div className="text-center">
          {time !== undefined ? (
            <>
              <div className="font-medium">{Math.round(time)}分钟</div>
            </>
          ) : (
            <div className="text-gray-500">-</div>
          )}
        </div>
      ),
    },
    {
      title: '提交报告数量',
      dataIndex: 'report_count',
      key: 'report_count',
      width: '8%',
      render: (count: number) => (
        <div className="text-center">
          <div className="text-lg font-medium">{count || 0}</div>
        </div>
      ),
    },
    // {
    //   title: '最后登录时间',
    //   dataIndex: 'last_sign_in_at',
    //   key: 'last_sign_in_at',
    //   width: '12%',
    //   render: (time: string) => (
    //     <div className="text-sm">{formatDate(time)}</div>
    //   ),
    // },
    {
      title: '注册时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '12%',
      render: (time: string) => (
        <div className="text-sm">{formatDate(time)}</div>
      ),
    },
    // {
    //   title: '操作',
    //   key: 'action',
    //   width: '6%',
    //   render: (_, record) => (
    //     <Space size="small">
    //       <Tooltip title="查看详情">
    //         <Button type="link" icon={<EyeOutlined />} size="small" />
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ];

  // 转换 API 数据为表格数据格式
  const tableData: UserListData[] =
    data?.data?.map((item) => ({
      ...item,
      key: item.id.toString(),
    })) || [];

  const handleSearch = (value: string) => {
    setSearchKeywords(value);
    setCurrentPage(1); // 重置到第一页
  };

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div className="m-6">
      <Card
        title="用户列表"
        extra={
          <div className="flex items-center space-x-4">
            <NavDatePicker />
          </div>
        }
      >
        <div className="mb-4 flex items-center justify-between">
          <Space>
            <Input
              placeholder="搜索用户名、邮箱"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={(e) => handleSearch(e.currentTarget.value)}
              allowClear
              onClear={() => {
                setInputValue('');
                handleSearch('');
              }}
            />
            <Button
              type="primary"
              disabled={isLoading}
              onClick={() => handleSearch(inputValue)}
            >
              搜索
            </Button>
          </Space>
        </div>

        <MyTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={{
            total: data?.total || 0,
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 1400 }}
        />

        {error && (
          <div className="mt-4 text-center text-red-500">
            数据加载失败：{error.message}
          </div>
        )}
      </Card>
    </div>
  );
};

const UserList: React.FC = () => {
  return (
    <DateProvider>
      <div className="min-h-screen bg-gray-50">
        <UserListContent />
      </div>
    </DateProvider>
  );
};

export default UserList;
