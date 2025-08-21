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
import EcoCharts from './EcoCharts';
import ParticipantDetails from './ParticipantDetails';

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

// 简化表格数据类型 - 与ParticipantDetails保持一致
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
  // 获取 org:fluttercandies 的真实数据
  const getRealEcoData = () => {
    if (data.用户ID !== 'org:fluttercandies') {
      return [];
    }

    return [
      {
        name: 'Flutter主仓',
        score2024: 56.67,
        score2025: 52.96,
        charts: {
          role: {
            title: '角色得分',
            maxScore: 20.0,
            data2024: [{ name: '组织参与者', value: 1 }],
            data2025: [{ name: '组织参与者', value: 1 }],
          },
          contribution: {
            title: '代码Issue贡献得分',
            maxScore: 50.0,
            data2024: [
              { name: '代码贡献', value: 33.33 },
              { name: 'Issue贡献', value: 66.67 },
            ],
            data2025: [
              { name: '代码贡献', value: 33.33 },
              { name: 'Issue贡献', value: 66.67 },
            ],
          },
          influence: {
            title: '协作影响力得分',
            maxScore: 100.0,
            data2024: [
              { name: '社区核心度', value: 100.0 },
              { name: '协作影响力', value: 100.0 },
              { name: '联通控制力', value: 100.0 },
            ],
            data2025: [
              { name: '社区核心度', value: 66.67 },
              { name: '协作影响力', value: 100.0 },
              { name: '联通控制力', value: 100.0 },
            ],
          },
        },
      },
      {
        name: 'Flutter Candies生态',
        score2024: 80.1,
        score2025: 96.3,
        charts: {
          role: {
            title: '角色得分',
            maxScore: 51.4,
            data2024: [
              { name: '组织管理者', value: 28 },
              { name: '组织参与者', value: 4 },
              { name: '个人管理者', value: 8 },
            ],
            data2025: [
              { name: '组织管理者', value: 9 },
              { name: '组织参与者', value: 6 },
              { name: '个人管理者', value: 7 },
              { name: '个人参与者', value: 1 },
            ],
          },
          contribution: {
            title: '代码Issue贡献得分',
            maxScore: 100.0,
            data2024: [
              { name: '代码贡献', value: 100.0 },
              { name: 'Issue贡献', value: 100.0 },
            ],
            data2025: [
              { name: '代码贡献', value: 100.0 },
              { name: 'Issue贡献', value: 100.0 },
            ],
          },
          influence: {
            title: '协作影响力得分',
            maxScore: 88.9,
            data2024: [
              { name: '社区核心度', value: 66.67 },
              { name: '协作影响力', value: 100.0 },
              { name: '联通控制力', value: 100.0 },
            ],
            data2025: [
              { name: '社区核心度', value: 66.67 },
              { name: '协作影响力', value: 100.0 },
              { name: '联通控制力', value: 100.0 },
            ],
          },
        },
      },
      {
        name: 'Pub.dev生态',
        score2024: 69.27,
        score2025: 69.47,
        charts: {
          role: {
            title: '角色得分',
            maxScore: 18.9,
            data2024: [
              { name: '组织管理者', value: 30 },
              { name: '组织参与者', value: 20 },
              { name: '个人管理者', value: 14 },
              { name: '个人参与者', value: 10 },
            ],
            data2025: [
              { name: '组织管理者', value: 11 },
              { name: '组织参与者', value: 9 },
              { name: '个人管理者', value: 4 },
              { name: '个人参与者', value: 3 },
            ],
          },
          contribution: {
            title: '代码Issue贡献得分',
            maxScore: 100.0,
            data2024: [
              { name: '代码贡献', value: 100.0 },
              { name: 'Issue贡献', value: 100.0 },
            ],
            data2025: [
              { name: '代码贡献', value: 100.0 },
              { name: 'Issue贡献', value: 100.0 },
            ],
          },
          influence: {
            title: '协作影响力得分',
            maxScore: 88.9,
            data2024: [
              { name: '社区核心度', value: 66.67 },
              { name: '协作影响力', value: 100.0 },
              { name: '联通控制力', value: 100.0 },
            ],
            data2025: [
              { name: '社区核心度', value: 66.67 },
              { name: '协作影响力', value: 100.0 },
              { name: '联通控制力', value: 100.0 },
            ],
          },
        },
      },
    ];
  };
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

          {/* 生态详细图表分析 */}
          {data.用户ID === 'org:fluttercandies' && (
            <Card title="生态详细图表分析" className="mb-6">
              <div style={{ minHeight: '500px' }}>
                <EcoCharts data={getRealEcoData()} />
              </div>
            </Card>
          )}

          {/* 人员参与详情表格 */}
          <ParticipantDetails
            data={participantTableData}
            userId={data.用户ID}
          />
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
