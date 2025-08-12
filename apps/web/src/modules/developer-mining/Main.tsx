import React, { useState, useEffect } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Space,
  Tag,
  Tooltip,
  Radio,
  message,
} from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MyTable from '@common/components/Table';
import DetailPage from './DetailPage';
import flutterData from './Flutter汇总_backup.json';

// 定义数据类型
interface DeveloperData {
  用户ID: string;
  总得分: number;
  国家: string;
  省: string;
  市: string;
  用户类型: string;
  排名: number;
  全球排名: number;
  国内排名: number;
  生态得分: EcosystemScore[];
}

interface EcosystemScore {
  生态: string;
  生态年均分: number;
  '2024年得分': number;
  '2025年得分': number;
}

const Main = () => {
  const [category, setCategory] = useState<string>('Flutter');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<DeveloperData[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DeveloperData | null>(null);

  // 项目分类选项
  const categoryOptions = [
    { label: 'Flutter', value: 'Flutter' },
    { label: 'Ionic', value: 'Ionic' },
    { label: 'RN', value: 'RN' },
  ];

  // 用户类型筛选选项
  const userTypeOptions = [
    { label: '全部', value: 'all' },
    { label: '组织', value: '组织' },
    { label: '开发者', value: '开发者' },
  ];

  // 处理Flutter数据，添加排名和用户类型
  const processFlutterData = (): DeveloperData[] => {
    try {
      if (!flutterData || !Array.isArray(flutterData)) {
        console.warn('Flutter数据格式不正确');
        return [];
      }

      return flutterData.map((item: any, index: number) => {
        const isOrg = item.用户ID?.startsWith('org:');

        // 生成模拟的生态得分数据
        const mockEcosystemScores: EcosystemScore[] = [
          {
            生态: 'Flutter主仓',
            生态年均分: Math.random() * 30 + 70, // 70-100
            '2024年得分': Math.random() * 25 + 65,
            '2025年得分': Math.random() * 25 + 70,
          },
          {
            生态: 'Flutter Candies',
            生态年均分: Math.random() * 40 + 50, // 50-90
            '2024年得分': Math.random() * 35 + 45,
            '2025年得分': Math.random() * 35 + 50,
          },
          {
            生态: 'Pub.dev',
            生态年均分: Math.random() * 50 + 40, // 40-90
            '2024年得分': Math.random() * 45 + 35,
            '2025年得分': Math.random() * 45 + 40,
          },
        ];

        return {
          用户ID: item.用户ID || '',
          总得分: item.总得分 || 0,
          国家: item.国家 || '',
          省: item.省 || '',
          市: item.市 || '',
          用户类型: isOrg ? '组织' : '开发者',
          排名: index + 1, // 按出现顺序排名
          全球排名: Math.floor(Math.random() * 1000) + index + 1, // 模拟全球排名
          国内排名: Math.floor(Math.random() * 100) + Math.floor(index / 2) + 1, // 模拟国内排名
          生态得分: mockEcosystemScores,
        };
      });
    } catch (error) {
      console.error('处理Flutter数据时出错：', error);
      return [];
    }
  };

  // 获取处理后的数据
  const allData = processFlutterData();

  // 获取数据的函数
  const fetchData = async (
    category: string,
    keyword: string,
    userType: string,
    page: number,
    size: number
  ) => {
    setLoading(true);
    try {
      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filteredData = allData;

      // 根据用户类型筛选
      if (userType !== 'all') {
        filteredData = filteredData.filter(
          (item) => item.用户类型 === userType
        );
      }

      // 根据搜索关键词过滤
      if (keyword) {
        filteredData = filteredData.filter(
          (item) =>
            item.用户ID.toLowerCase().includes(keyword.toLowerCase()) ||
            item.国家.includes(keyword) ||
            item.省.includes(keyword) ||
            item.市.includes(keyword)
        );
      }

      // 分页处理
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setTableData(paginatedData);
      setTotal(filteredData.length);
    } catch (error) {
      console.error('获取数据失败：', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchData(category, searchKeyword, userTypeFilter, currentPage, pageSize);
  }, [category, searchKeyword, userTypeFilter, currentPage, pageSize]);

  // 分类变更处理
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  // 搜索处理
  const handleSearch = () => {
    setCurrentPage(1);
  };

  // 用户类型筛选处理
  const handleUserTypeChange = (value: string) => {
    setUserTypeFilter(value);
    setCurrentPage(1);
  };

  // 分页处理
  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) {
      // 如果需要支持改变页面大小，可以在这里处理
    }
  };

  // 查看详情
  const handleViewDetail = (record: DeveloperData) => {
    setSelectedUser(record);
    setShowDetail(true);
  };

  // 返回列表
  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedUser(null);
  };

  // 渲染用户类型标签
  const renderUserTypeTag = (type: string) => {
    return type === '组织' ? (
      <Tag color="blue">组织</Tag>
    ) : (
      <Tag color="green">开发者</Tag>
    );
  };

  // 表格列定义
  const columns: ColumnsType<DeveloperData> = [
    {
      title: '排名',
      dataIndex: '排名',
      key: '排名',
      width: '8%',
      render: (rank: number) => (
        <div className="flex items-center justify-center">
          <span
            className={`font-bold ${
              rank <= 3 ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            {rank}
          </span>
        </div>
      ),
    },
    {
      title: 'ID',
      dataIndex: '用户ID',
      key: '用户ID',
      width: '20%',
      render: (id: string) => (
        <Tooltip title={id}>
          <span className="font-mono text-sm">{id}</span>
        </Tooltip>
      ),
    },
    {
      title: '类型',
      dataIndex: '用户类型',
      key: '用户类型',
      width: '10%',
      render: renderUserTypeTag,
    },
    {
      title: '总得分',
      dataIndex: '总得分',
      key: '总得分',
      width: '12%',
      render: (score: number) => (
        <span className="font-semibold text-blue-600">{score.toFixed(2)}</span>
      ),
      sorter: (a, b) => a.总得分 - b.总得分,
    },
    {
      title: '地区',
      key: '地区',
      width: '25%',
      render: (_, record) => (
        <div className="text-sm">
          <div>{record.国家}</div>
          <div className="text-gray-500">
            {record.省} {record.市}
          </div>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          size="small"
          onClick={() => handleViewDetail(record)}
        >
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">总览</h1>
        </div>

        {showDetail && selectedUser ? (
          <DetailPage data={selectedUser} onBack={handleBackToList} />
        ) : (
          <Card>
            {/* 搜索和筛选区域 */}
            <div className="mb-6">
              <Space wrap size="middle">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    项目分类：
                  </span>
                  <Select
                    value={category}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                    style={{ width: 120 }}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    用户类型：
                  </span>
                  <Radio.Group
                    value={userTypeFilter}
                    onChange={(e) => handleUserTypeChange(e.target.value)}
                    buttonStyle="solid"
                  >
                    {userTypeOptions.map((option) => (
                      <Radio.Button key={option.value} value={option.value}>
                        {option.label}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>

                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="搜索开发者或组织"
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onPressEnter={handleSearch}
                  />
                  <Button type="primary" onClick={handleSearch}>
                    搜索
                  </Button>
                </div>
              </Space>
            </div>

            {/* 表格区域 */}
            <MyTable
              columns={columns}
              dataSource={tableData}
              loading={loading}
              rowKey="用户ID"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: total,
                showSizeChanger: false,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
                onChange: handlePageChange,
              }}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Main;
