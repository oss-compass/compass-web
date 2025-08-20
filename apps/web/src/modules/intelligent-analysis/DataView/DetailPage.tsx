// autocorrect: false
import React, { useMemo } from 'react';
import {
  Card,
  Descriptions,
  Table,
  Tag,
  Statistic,
  Divider,
  Typography,
  Space,
  Button,
  Breadcrumb,
} from 'antd';
import {
  ArrowLeftOutlined,
  TrophyOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

// 扩展 DeveloperDetail 接口
interface DeveloperDetail {
  用户ID: string;
  用户类型: string;
  国家: string;
  省: string;
  市: string;
  总得分: number;
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

// 简化表格数据类型
interface DetailedTableRowData {
  组织名称: string;
  项目生态: string;
  代码贡献总量: number;
  Issue贡献总量: number;
  网络影响力2024: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  网络影响力2025: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  GitHub账号: string;
  填写的组织信息: string;
  贡献的具体仓库: string[];
  角色2024: {
    代码贡献量: number;
    Issue贡献量: number;
    生态占比: number;
  };
  个人生态影响力2024: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  角色2025: {
    代码贡献量: number;
    Issue贡献量: number;
    生态占比: number;
  };
  个人生态影响力2025: {
    社区核心度: number;
    协作影响力: number;
    联通控制力: number;
    PageRank: number;
  };
  projectRowSpan: number;
  key: string;
}

interface DetailPageProps {
  data: DeveloperDetail;
  onBack: () => void;
  projectType?: string;
}

const DetailPage: React.FC<DetailPageProps> = ({
  data,
  onBack,
  projectType = 'Flutter',
}) => {
  // 生成统一的参与详情表格数据
  const participantTableData = useMemo((): DetailedTableRowData[] => {
    const allParticipants: DetailedTableRowData[] = [];

    // 基于生态得分数据生成详细的参与者数据
    data.生态得分
      .filter((item) => item.生态 !== '总得分')
      .forEach((ecosystem, ecoIndex) => {
        // 为每个生态生成多个参与者记录
        const participantCount = Math.floor(Math.random() * 3) + 2; // 2-4 个参与者

        for (let i = 0; i < participantCount; i++) {
          const isOrganization = Math.random() > 0.6; // 60% 概率是组织
          const orgName = isOrganization ? `fluttercandies` : 'fluttercandies';

          allParticipants.push({
            组织名称: orgName,
            项目生态: ecosystem.生态,
            代码贡献总量: Math.floor(Math.random() * 10000) + 1000,
            Issue贡献总量: Math.floor(Math.random() * 1000) + 100,
            网络影响力2024: {
              社区核心度: Math.random(),
              协作影响力: Math.random(),
              联通控制力: Math.random(),
              PageRank: Math.random() * 0.1,
            },
            网络影响力2025: {
              社区核心度: Math.random(),
              协作影响力: Math.random(),
              联通控制力: Math.random(),
              PageRank: Math.random() * 0.1,
            },
            GitHub账号: `${data.用户ID}_${ecoIndex}_${i}`,
            填写的组织信息: isOrganization
              ? `${orgName} - 专注于${ecosystem.生态}开发`
              : '个人开发者',
            贡献的具体仓库: [
              `${ecosystem.生态.replace(/\s+/g, '_')}_repo_${i + 1}`,
              `${ecosystem.生态.replace(/\s+/g, '_')}_repo_${i + 2}`,
            ],
            角色2024: {
              代码贡献量: Math.floor(Math.random() * 5000) + 500,
              Issue贡献量: Math.floor(Math.random() * 500) + 50,
              生态占比: Math.random() * 0.8 + 0.2,
            },
            个人生态影响力2024: {
              社区核心度: Math.random(),
              协作影响力: Math.random(),
              联通控制力: Math.random(),
              PageRank: Math.random() * 0.05,
            },
            角色2025: {
              代码贡献量: Math.floor(Math.random() * 3000) + 300,
              Issue贡献量: Math.floor(Math.random() * 300) + 30,
              生态占比: Math.random() * 0.8 + 0.2,
            },
            个人生态影响力2025: {
              社区核心度: Math.random(),
              协作影响力: Math.random(),
              联通控制力: Math.random(),
              PageRank: Math.random() * 0.05,
            },
            projectRowSpan: 1,
            key: `${ecosystem.生态}-${i}-${ecoIndex}`,
          });
        }
      });

    // 按项目/生态排序
    allParticipants.sort((a, b) => a.项目生态.localeCompare(b.项目生态));

    // 计算需要合并的行
    const mergedData = allParticipants.map((item, idx) => {
      const prevItem = allParticipants[idx - 1];
      const shouldMergeWithPrev =
        prevItem && prevItem.项目生态 === item.项目生态;

      let rowSpan = 1;
      if (!shouldMergeWithPrev) {
        for (let i = idx + 1; i < allParticipants.length; i++) {
          if (allParticipants[i].项目生态 === item.项目生态) {
            rowSpan++;
          } else {
            break;
          }
        }
      }

      return {
        ...item,
        projectRowSpan: shouldMergeWithPrev ? 0 : rowSpan,
        key: `${item.项目生态}-${item.GitHub账号}-${idx}`,
      };
    });

    return mergedData;
  }, [data.生态得分, data.用户ID]);

  // 生态得分表格列定义
  const ecosystemColumns: ColumnsType<EcosystemScore> = [
    {
      title: '生态',
      dataIndex: '生态',
      key: '生态',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '生态年均分',
      dataIndex: '生态年均分',
      key: '生态年均分',
      render: (score: number) => (
        <Text
          type={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'danger'}
        >
          {score?.toFixed(2) || '0.00'}
        </Text>
      ),
      sorter: (a, b) => a.生态年均分 - b.生态年均分,
    },
    {
      title: '2024 年得分',
      dataIndex: '2024 年得分',
      key: '2024 年得分',
      render: (score: number) =>
        score > 0 ? (
          <Text
            type={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'danger'}
          >
            {score?.toFixed(2) || '0.00'}
          </Text>
        ) : (
          <Text type="secondary">-</Text>
        ),
    },
    {
      title: '2025 年得分',
      dataIndex: '2025 年得分',
      key: '2025 年得分',
      render: (score: number) =>
        score > 0 ? (
          <Text
            type={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'danger'}
          >
            {score?.toFixed(2) || '0.00'}
          </Text>
        ) : (
          <Text type="secondary">-</Text>
        ),
    },
  ];

  // 渲染用户类型标签
  const renderUserTypeTag = (type: string) => {
    return type === '组织' ? (
      <Tag color="blue" icon={<GlobalOutlined />}>
        组织
      </Tag>
    ) : (
      <Tag color="green" icon={<EnvironmentOutlined />}>
        开发者
      </Tag>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 面包屑导航 */}
          <div className="mb-6">
            <Breadcrumb
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
                  title: projectType,
                  onClick: onBack,
                  className: 'cursor-pointer hover:text-blue-600',
                },
                {
                  title: `${data.用户ID} 详情`,
                },
              ]}
            />
          </div>

          {/* 基本信息卡片 */}
          <Card className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <Title level={2} className="mb-2">
                  {data.用户ID}
                </Title>
                <Space size="middle">{renderUserTypeTag(data.用户类型)}</Space>
              </div>
              <div className="text-right">
                <Statistic
                  title="总得分"
                  value={data.总得分}
                  precision={2}
                  valueStyle={{
                    color:
                      data.总得分 >= 70
                        ? '#3f8600'
                        : data.总得分 >= 50
                        ? '#cf1322'
                        : '#8c8c8c',
                  }}
                />
              </div>
            </div>

            <Descriptions bordered column={3}>
              <Descriptions.Item label="地理位置">
                <Space>
                  <EnvironmentOutlined />
                  <Text>
                    {data.国家}, {data.省}, {data.市}
                  </Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="全球排名">
                <Space>
                  <TrophyOutlined style={{ color: '#1890ff' }} />
                  <Text strong>第 {data.全球排名} 名</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label={`${data.国家}排名`}>
                <Space>
                  <TrophyOutlined style={{ color: '#52c41a' }} />
                  <Text strong>第 {data.国内排名} 名</Text>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Divider />

          {/* 生态得分概览 */}
          <Card title="生态得分概览" className="mb-6">
            <Table
              columns={ecosystemColumns}
              dataSource={data.生态得分}
              rowKey="生态"
              pagination={false}
              size="middle"
            />
          </Card>

          {/* 人员参与详情表格 */}
          <Card
            title={
              <Space>
                <TeamOutlined />
                <span>人员参与详情</span>
              </Space>
            }
            className="mb-6"
          >
            <Table
              size="small"
              dataSource={participantTableData}
              rowKey="key"
              pagination={false}
              bordered
              scroll={{ x: 1800 }}
              columns={[
                {
                  title: '组织名称',
                  dataIndex: '组织名称',
                  key: '组织名称',
                  width: 120,
                  fixed: 'left' as const,
                },
                {
                  title: '项目/生态',
                  dataIndex: '项目生态',
                  key: '项目生态',
                  width: 120,
                  fixed: 'left' as const,
                  render: (text, record) => ({
                    children: (
                      <Text strong style={{ color: '#333' }}>
                        {text}
                      </Text>
                    ),
                    props: {
                      rowSpan: record.projectRowSpan,
                    },
                  }),
                },
                {
                  title: '2024-2025 代码贡献总量',
                  dataIndex: '代码贡献总量',
                  key: '代码贡献总量',
                  width: 180,
                  fixed: 'left' as const,
                  render: (value: number, record) => ({
                    children: <Text>{value?.toLocaleString() || 0}</Text>,
                    props: {
                      rowSpan: record.projectRowSpan,
                    },
                  }),
                },
                {
                  title: '2024-2025 Issue 贡献总量',
                  dataIndex: 'Issue贡献总量',
                  key: 'Issue贡献总量',
                  width: 180,
                  fixed: 'left' as const,
                  render: (value: number, record) => ({
                    children: <Text>{value?.toLocaleString() || 0}</Text>,
                    props: {
                      rowSpan: record.projectRowSpan,
                    },
                  }),
                },
                {
                  title: '2024 年网络影响力',
                  key: '网络影响力2024',
                  width: 200,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        社区核心度:{' '}
                        {record.网络影响力2024?.社区核心度?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        协作影响力:{' '}
                        {record.网络影响力2024?.协作影响力?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        联通控制力:{' '}
                        {record.网络影响力2024?.联通控制力?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        PageRank:{' '}
                        {record.网络影响力2024?.PageRank?.toFixed(4) ||
                          '0.0000'}
                      </div>
                    </div>
                  ),
                },
                {
                  title: '2025 年网络影响力',
                  key: '网络影响力2025',
                  width: 200,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        社区核心度:{' '}
                        {record.网络影响力2025?.社区核心度?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        协作影响力:{' '}
                        {record.网络影响力2025?.协作影响力?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        联通控制力:{' '}
                        {record.网络影响力2025?.联通控制力?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        PageRank:{' '}
                        {record.网络影响力2025?.PageRank?.toFixed(4) ||
                          '0.0000'}
                      </div>
                    </div>
                  ),
                },
                {
                  title: '具体人员 GitHub 账号',
                  dataIndex: 'GitHub账号',
                  key: 'GitHub账号',
                  width: 150,
                  render: (text: string) => (
                    <a
                      href={`https://github.com/${data.用户ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.用户ID}
                    </a>
                  ),
                },
                {
                  title: '填写的组织信息',
                  dataIndex: '填写的组织信息',
                  key: '填写的组织信息',
                  width: 200,
                  ellipsis: true,
                },
                {
                  title: '贡献的具体仓库',
                  dataIndex: '贡献的具体仓库',
                  key: '贡献的具体仓库',
                  width: 200,
                  render: (repos: string[]) => (
                    <div style={{ fontSize: '12px' }}>
                      {repos?.map((repo, index) => (
                        <div key={index}>{repo}</div>
                      )) || '-'}
                    </div>
                  ),
                },
                {
                  title: '2024 年角色',
                  key: '角色2024',
                  width: 180,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        代码贡献量:{' '}
                        {record.角色2024?.代码贡献量?.toLocaleString() || 0}
                      </div>
                      <div>
                        Issue 贡献量:{' '}
                        {record.角色2024?.Issue贡献量?.toLocaleString() || 0}
                      </div>
                      <div>
                        生态占比:{' '}
                        {((record.角色2024?.生态占比 || 0) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ),
                },
                {
                  title: '2024 年个人在生态中',
                  key: '个人生态影响力2024',
                  width: 180,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        社区核心度:{' '}
                        {record.个人生态影响力2024?.社区核心度?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        协作影响力:{' '}
                        {record.个人生态影响力2024?.协作影响力?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        联通控制力:{' '}
                        {record.个人生态影响力2024?.联通控制力?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        PageRank:{' '}
                        {record.个人生态影响力2024?.PageRank?.toFixed(4) ||
                          '0.0000'}
                      </div>
                    </div>
                  ),
                },
                {
                  title: '2025 年角色',
                  key: '角色2025',
                  width: 180,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        代码贡献量:{' '}
                        {record.角色2025?.代码贡献量?.toLocaleString() || 0}
                      </div>
                      <div>
                        Issue 贡献量:{' '}
                        {record.角色2025?.Issue贡献量?.toLocaleString() || 0}
                      </div>
                      <div>
                        生态占比:{' '}
                        {((record.角色2025?.生态占比 || 0) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ),
                },
                {
                  title: '2025 年个人在生态中',
                  key: '个人生态影响力2025',
                  width: 180,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        社区核心度:{' '}
                        {record.个人生态影响力2025?.社区核心度?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        协作影响力:{' '}
                        {record.个人生态影响力2025?.协作影响力?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        联通控制力:{' '}
                        {record.个人生态影响力2025?.联通控制力?.toFixed(3) ||
                          '0.000'}
                      </div>
                      <div>
                        PageRank:{' '}
                        {record.个人生态影响力2025?.PageRank?.toFixed(4) ||
                          '0.0000'}
                      </div>
                    </div>
                  ),
                },
              ]}
              rowClassName={(record, index) =>
                index % 2 === 0 ? '' : 'ant-table-row-striped'
              }
            />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
