// autocorrect: false
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
  Breadcrumb,
} from 'antd';
import { SearchOutlined, EyeOutlined, HomeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import MyTable from '@common/components/Table';
import DetailPage from './DetailPage';
import DeveloperRegionChart from './DeveloperRegionChart';
// @ts-ignore
import flutterData from 'public/test/intelligent-analysis/Flutter_backup.json';
// @ts-ignore
import ionicData from 'public/test/intelligent-analysis/Ionic_backup.json';
// @ts-ignore
import rnData from 'public/test/intelligent-analysis/RN_backup.json';

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
  '2024 年得分': number;
  '2025 年得分': number;
}

interface MainProps {
  projectType?: string;
}

const Main: React.FC<MainProps> = ({ projectType = 'flutter' }) => {
  // 项目路由名到显示名的映射
  const projectNameMap: Record<string, string> = {
    flutter: 'Flutter',
    ionic: 'Ionic',
    'react-native': 'React Native',
    cef: 'CEF',
    electron: 'Electron',
    chromium: 'Chromium',
  };

  // 有真实数据的项目列表
  const realDataProjects = ['Flutter', 'Ionic', 'React Native'];

  const initialCategory = projectNameMap[projectType] || 'Flutter';

  const [category, setCategory] = useState<string>(initialCategory);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<DeveloperData[]>([]);
  const [allFilteredData, setAllFilteredData] = useState<DeveloperData[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DeveloperData | null>(null);

  // 用户类型筛选选项
  const userTypeOptions = [
    { label: '全部', value: 'all' },
    { label: '组织', value: '组织' },
    { label: '开发者', value: '开发者' },
  ];

  // 处理真实数据，添加排名和用户类型
  const processRealData = (
    data: any[],
    projectName: string
  ): DeveloperData[] => {
    try {
      if (!data || !Array.isArray(data)) {
        console.warn(`${projectName} 数据格式不正确`);
        return [];
      }

      return data.map((item: any, index: number) => {
        const isOrg = item.用户ID?.startsWith('org:');

        // 根据项目类型生成对应的生态得分数据
        const getEcosystemScores = (project: string): EcosystemScore[] => {
          const ecosystemMap: Record<string, string[]> = {
            Flutter: ['Flutter 主仓', 'Flutter Candies', 'Pub.dev'],
            Ionic: ['Ionic Core', 'Ionic Native', 'Capacitor'],
            'React Native': [
              'React Native Core',
              'React Native Community',
              'Expo',
            ],
          };

          const ecosystems = ecosystemMap[project] || [
            `${project} 主仓`,
            `${project} 社区`,
            `${project} 插件`,
          ];

          return ecosystems.map((ecosystem) => ({
            生态: ecosystem,
            生态年均分: Math.random() * 30 + 70, // 70-100
            '2024 年得分': Math.random() * 25 + 65,
            '2025 年得分': Math.random() * 25 + 70,
          }));
        };

        return {
          用户ID: item.用户ID || '',
          总得分: item.总得分 || 0,
          国家: item.国家 || '',
          省: item.省 || '',
          市: item.市 || '',
          用户类型: isOrg ? '组织' : '开发者',
          排名: index + 1, // 按出现顺序排名
          全球排名: 1, // 模拟全球排名
          国内排名: 1, // 模拟国内排名
          生态得分: getEcosystemScores(projectName),
        };
      });
    } catch (error) {
      console.error(`处理 ${projectName} 数据时出错：`, error);
      return [];
    }
  };

  // 为其他项目生成模拟数据
  const generateMockData = (projectName: string): DeveloperData[] => {
    const mockUserIds = [
      'microsoft',
      'google',
      'facebook',
      'amazon',
      'apple',
      'org:chromium-team',
      'org:ionic-team',
      'org:electron-community',
      'john-doe',
      'jane-smith',
      'alex-chen',
      'sarah-wilson',
      'mike-brown',
      'org:react-native-community',
      'org:cef-project',
      'developer123',
      'codemaster',
      'techguru',
      'opensourcedev',
      'contributor456',
    ];

    const countries = [
      'United States',
      'China',
      'Germany',
      'United Kingdom',
      'India',
      'Canada',
      'Japan',
    ];
    const provinces = [
      'California',
      'Beijing',
      'Berlin',
      'London',
      'Mumbai',
      'Toronto',
      'Tokyo',
    ];
    const cities = [
      'San Francisco',
      'Shanghai',
      'Munich',
      'Manchester',
      'Bangalore',
      'Vancouver',
      'Osaka',
    ];

    return mockUserIds.map((id, index) => {
      const isOrg =
        id.startsWith('org:') ||
        ['microsoft', 'google', 'facebook', 'amazon', 'apple'].includes(id);
      const randomIndex = Math.floor(Math.random() * countries.length);

      // 为不同项目生成不同的生态得分
      const getEcosystemScores = (project: string): EcosystemScore[] => {
        const baseScore = Math.random() * 40 + 50; // 50-90
        return [
          {
            生态: `${project} 主仓`,
            生态年均分: baseScore + Math.random() * 20,
            '2024 年得分': baseScore + Math.random() * 15,
            '2025 年得分': baseScore + Math.random() * 25,
          },
          {
            生态: `${project} 社区`,
            生态年均分: baseScore - 10 + Math.random() * 20,
            '2024 年得分': baseScore - 10 + Math.random() * 15,
            '2025 年得分': baseScore - 5 + Math.random() * 20,
          },
        ];
      };

      return {
        用户ID: id,
        总得分: Math.random() * 80 + 20, // 20-100
        国家: countries[randomIndex],
        省: provinces[randomIndex],
        市: cities[randomIndex],
        用户类型: isOrg ? '组织' : '开发者',
        排名: index + 1,
        全球排名: Math.floor(Math.random() * 2000) + index + 1,
        国内排名: Math.floor(Math.random() * 200) + Math.floor(index / 3) + 1,
        生态得分: getEcosystemScores(projectName),
      };
    });
  };

  // 获取真实数据的函数
  const getRealData = (projectName: string): DeveloperData[] => {
    switch (projectName) {
      case 'Flutter':
        return processRealData(flutterData, 'Flutter');
      case 'Ionic':
        return processRealData(ionicData, 'Ionic');
      case 'React Native':
        return processRealData(rnData, 'React Native');
      default:
        return [];
    }
  };

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
      // 模拟 API 延迟
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 根据不同项目获取数据
      let currentData: DeveloperData[] = [];

      // 检查是否有真实数据
      if (realDataProjects.includes(category)) {
        currentData = getRealData(category);
      } else {
        // 为其他项目生成模拟数据
        currentData = generateMockData(category);
      }

      let filteredData = currentData;

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

      // 保存完整的筛选后数据供地图组件使用
      setAllFilteredData(filteredData);

      // 对数据进行排序，将"未知"和"东八区"的数据排到最后
      const sortedData = [...filteredData].sort((a, b) => {
        const specialCountries = ['未知', '东八区'];
        const aIsSpecial = specialCountries.includes(a.国家);
        const bIsSpecial = specialCountries.includes(b.国家);

        // 如果一个是特殊国家，一个不是，特殊国家排后面
        if (aIsSpecial && !bIsSpecial) return 1;
        if (!aIsSpecial && bIsSpecial) return -1;

        // 都是特殊国家或都不是，保持原有顺序（按排名）
        return a.排名 - b.排名;
      });

      // 分页处理
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const paginatedData = sortedData.slice(startIndex, endIndex);

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
    <>
      {showDetail && selectedUser ? (
        <DetailPage
          data={selectedUser}
          onBack={handleBackToList}
          projectType={category}
        />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="w-full">
              <Breadcrumb
                className="mb-4 text-base"
                items={[
                  {
                    href: '/intelligent-analysis#overview',
                    title: (
                      <span className="flex items-center">
                        <HomeOutlined />
                        <span className="ml-1">总览</span>
                      </span>
                    ),
                  },
                  {
                    title: category,
                  },
                ]}
              />
              <h1 className="text-2xl font-bold text-gray-900">{category}</h1>
            </div>
          </div>

          {/* 地图卡片组件 */}
          <DeveloperRegionChart data={allFilteredData} className="mb-6" />

          <Card title="组织、开发者贡献详情">
            {/* 搜索和筛选区域 */}
            <div className="mb-6">
              <Space wrap size="middle">
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
        </div>
      )}
    </>
  );
};

export default Main;
