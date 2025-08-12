import React, { useMemo, useRef } from 'react';
import {
  Card,
  Descriptions,
  Table,
  Tag,
  Row,
  Col,
  Statistic,
  Divider,
  Typography,
  Space,
  Button,
  Tabs,
  Badge,
  Collapse,
  Progress,
} from 'antd';
import {
  ArrowLeftOutlined,
  TrophyOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
  TeamOutlined,
  UserOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import EChartX from '@common/components/EChartX';
import type { EChartsOption } from 'echarts';

// 添加表格条纹样式
const tableStyles = `
  .ant-table-row-striped {
    background-color: #fafafa;
  }
  .ant-table-row-striped:hover {
    background-color: #e6f7ff !important;
  }
`;

const { Title, Text } = Typography;

// 参与者详情接口
interface ParticipantDetail {
  类别: string;
  数量: number;
  详情?: {
    项目名称: string;
    参与角色: string;
    贡献度: number;
    活跃度: string;
  }[];
}

// 扩展DeveloperDetail接口
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
  详细得分数据?: DetailedScoreData[];
  参与者详情?: ParticipantDetail[];
}

interface EcosystemScore {
  生态: string;
  生态年均分: number;
  '2024年得分': number;
  '2025年得分': number;
}

// 详细得分数据结构
interface DetailedScoreData {
  生态: string;
  年份: string;
  总得分: number;
  角色得分: {
    总分: number;
    详情: { 类别: string; 数量: number }[];
  };
  代码Issue贡献得分: {
    总分: number;
    详情: { 类别: string; 得分: number }[];
  };
  协作影响力得分: {
    总分: number;
    详情: { 类别: string; 得分: number }[];
  };
}

interface DetailPageProps {
  data: DeveloperDetail;
  onBack: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ data, onBack }) => {
  // 为图表创建refs
  const chartRefs = {
    role1: useRef<HTMLDivElement>(null),
    role2: useRef<HTMLDivElement>(null),
    code1: useRef<HTMLDivElement>(null),
    code2: useRef<HTMLDivElement>(null),
    collab1: useRef<HTMLDivElement>(null),
    collab2: useRef<HTMLDivElement>(null),
  };

  // 生成柱状图配置
  const generateBarChartOption = (
    title: string,
    data: { 类别: string; 数量?: number; 得分?: number }[],
    yAxisLabel: string = '数值'
  ): EChartsOption => {
    console.log('ECharts data:', data); // 调试日志

    if (!data || data.length === 0) {
      return {
        title: {
          text: '暂无数据',
          left: 'center',
          textStyle: {
            fontSize: 14,
            color: '#999',
          },
        },
        xAxis: { type: 'category', data: [] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [] }],
      };
    }

    return {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: any) => {
          const param = params[0];
          return `${param.name}: ${param.value}`;
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.类别),
        axisLabel: {
          interval: 0,
          rotate: 30,
          fontSize: 10,
          formatter: (value: string) => {
            // 如果标签太长，截断显示
            return value.length > 8 ? value.substring(0, 8) + '...' : value;
          },
        },
      },
      yAxis: {
        type: 'value',
        name: yAxisLabel,
        nameTextStyle: {
          fontSize: 10,
        },
        axisLabel: {
          fontSize: 10,
        },
        min: 0,
      },
      series: [
        {
          type: 'bar',
          data: data.map((item) => {
            const value = item.数量 !== undefined ? item.数量 : item.得分 || 0;
            return Math.max(0, value); // 确保值不为负数
          }),
          itemStyle: {
            color: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          label: {
            show: true,
            position: 'top',
            fontSize: 10,
            fontWeight: 'bold',
            formatter: (params: any) => {
              return params.value > 0 ? params.value.toFixed(1) : '0';
            },
          },
          barWidth: '60%',
        },
      ],
    };
  };

  // 模拟参与者详情数据
  const mockParticipantData = useMemo((): ParticipantDetail[] => {
    const ecosystems = data.生态得分.filter((item) => item.生态 !== '总得分');
    const participantData: ParticipantDetail[] = [];

    ecosystems.forEach((ecosystem) => {
      // 组织参与者
      const orgCount = Math.floor(Math.random() * 20) + 1;
      participantData.push({
        类别: `${ecosystem.生态} - 组织参与者`,
        数量: orgCount,
        详情: Array.from({ length: Math.min(orgCount, 5) }, (_, i) => ({
          项目名称: `${ecosystem.生态}_project_${i + 1}`,
          参与角色: ['Owner', 'Maintainer', 'Contributor', 'Collaborator'][
            Math.floor(Math.random() * 4)
          ],
          贡献度: Math.floor(Math.random() * 100),
          活跃度: ['高', '中', '低'][Math.floor(Math.random() * 3)],
        })),
      });

      // 个人参与者
      const individualCount = Math.floor(Math.random() * 30) + 1;
      participantData.push({
        类别: `${ecosystem.生态} - 个人参与者`,
        数量: individualCount,
        详情: Array.from({ length: Math.min(individualCount, 5) }, (_, i) => ({
          项目名称: `${ecosystem.生态}_individual_project_${i + 1}`,
          参与角色: ['Contributor', 'Reviewer', 'Tester', 'Reporter'][
            Math.floor(Math.random() * 4)
          ],
          贡献度: Math.floor(Math.random() * 100),
          活跃度: ['高', '中', '低'][Math.floor(Math.random() * 3)],
        })),
      });
    });

    return participantData;
  }, [data.生态得分]);

  // 模拟详细得分数据（基于HTML文件的结构）
  const mockDetailedScoreData: DetailedScoreData[] = useMemo(() => {
    return data.生态得分.flatMap((ecosystem) => [
      {
        生态: ecosystem.生态,
        年份: '2024',
        总得分: ecosystem['2024年得分'],
        角色得分: {
          总分: Math.random() * 60 + 20,
          详情: ecosystem.生态.includes('Flutter主仓')
            ? [{ 类别: '组织参与者', 数量: 1 }]
            : ecosystem.生态.includes('Flutter Candies')
            ? [
                { 类别: '组织管理者', 数量: 28 },
                { 类别: '组织参与者', 数量: 4 },
                { 类别: '个人管理者', 数量: 8 },
              ]
            : [
                { 类别: '组织管理者', 数量: 30 },
                { 类别: '组织参与者', 数量: 20 },
                { 类别: '个人管理者', 数量: 14 },
                { 类别: '个人参与者', 数量: 10 },
              ],
        },
        代码Issue贡献得分: {
          总分: Math.random() * 40 + 60,
          详情: [
            { 类别: '代码贡献', 得分: Math.random() * 50 + 30 },
            { 类别: 'Issue贡献', 得分: Math.random() * 50 + 40 },
          ],
        },
        协作影响力得分: {
          总分: Math.random() * 30 + 70,
          详情: [
            { 类别: '社区核心度', 得分: Math.random() * 100 },
            { 类别: '协作影响力', 得分: Math.random() * 100 },
            { 类别: '联通控制力', 得分: Math.random() * 100 },
          ],
        },
      },
      {
        生态: ecosystem.生态,
        年份: '2025',
        总得分: ecosystem['2025年得分'],
        角色得分: {
          总分: Math.random() * 60 + 20,
          详情: ecosystem.生态.includes('Flutter主仓')
            ? [{ 类别: '组织参与者', 数量: 1 }]
            : ecosystem.生态.includes('Flutter Candies')
            ? [
                { 类别: '组织管理者', 数量: 9 },
                { 类别: '组织参与者', 数量: 1 },
                { 类别: '个人管理者', 数量: 1 },
              ]
            : [
                { 类别: '组织管理者', 数量: 11 },
                { 类别: '组织参与者', 数量: 9 },
                { 类别: '个人管理者', 数量: 4 },
                { 类别: '个人参与者', 数量: 3 },
              ],
        },
        代码Issue贡献得分: {
          总分: Math.random() * 40 + 60,
          详情: [
            { 类别: '代码贡献', 得分: Math.random() * 50 + 30 },
            { 类别: 'Issue贡献', 得分: Math.random() * 50 + 40 },
          ],
        },
        协作影响力得分: {
          总分: Math.random() * 30 + 70,
          详情: [
            { 类别: '社区核心度', 得分: Math.random() * 100 },
            { 类别: '协作影响力', 得分: Math.random() * 100 },
            { 类别: '联通控制力', 得分: Math.random() * 100 },
          ],
        },
      },
    ]);
  }, [data.生态得分]);

  // 生成Tabs的items
  const tabItems = useMemo(() => {
    return mockDetailedScoreData
      .filter(
        (item, index, self) =>
          self.findIndex(
            (t) => t.生态 === item.生态 && t.年份 === item.年份
          ) === index
      )
      .map((scoreData, index) => ({
        key: index.toString(),
        label: `${scoreData.生态} ${scoreData.年份}年`,
        children: (
          <div>
            <div className="mb-4">
              <Title level={4}>
                {scoreData.生态} {scoreData.年份}年得分:{' '}
                {scoreData.总得分.toFixed(2)}
              </Title>
            </div>

            <Row gutter={[16, 16]}>
              {/* 角色得分图表 */}
              <Col span={8}>
                <Card
                  size="small"
                  title={`角色得分(${scoreData.角色得分.总分.toFixed(1)})`}
                >
                  <div
                    ref={
                      chartRefs[
                        `role${(index % 2) + 1}` as keyof typeof chartRefs
                      ]
                    }
                    style={{ height: '300px' }}
                  >
                    <EChartX
                      option={generateBarChartOption(
                        '',
                        scoreData.角色得分.详情,
                        '项目数量'
                      )}
                      style={{ height: '100%', width: '100%' }}
                      containerRef={
                        chartRefs[
                          `role${(index % 2) + 1}` as keyof typeof chartRefs
                        ]
                      }
                      _tracing="角色得分图表"
                    />
                  </div>
                </Card>
              </Col>

              {/* 代码Issue贡献得分图表 */}
              <Col span={8}>
                <Card
                  size="small"
                  title={`代码Issue贡献得分(${scoreData.代码Issue贡献得分.总分.toFixed(
                    1
                  )})`}
                >
                  <div
                    ref={
                      chartRefs[
                        `code${(index % 2) + 1}` as keyof typeof chartRefs
                      ]
                    }
                    style={{ height: '300px' }}
                  >
                    <EChartX
                      option={generateBarChartOption(
                        '',
                        scoreData.代码Issue贡献得分.详情,
                        '归一化得分'
                      )}
                      style={{ height: '100%', width: '100%' }}
                      containerRef={
                        chartRefs[
                          `code${(index % 2) + 1}` as keyof typeof chartRefs
                        ]
                      }
                      _tracing="代码Issue贡献得分图表"
                    />
                  </div>
                </Card>
              </Col>

              {/* 协作影响力得分图表 */}
              <Col span={8}>
                <Card
                  size="small"
                  title={`协作影响力得分(${scoreData.协作影响力得分.总分.toFixed(
                    1
                  )})`}
                >
                  <div
                    ref={
                      chartRefs[
                        `collab${(index % 2) + 1}` as keyof typeof chartRefs
                      ]
                    }
                    style={{ height: '300px' }}
                  >
                    <EChartX
                      option={generateBarChartOption(
                        '',
                        scoreData.协作影响力得分.详情,
                        '归一化得分'
                      )}
                      style={{ height: '100%', width: '100%' }}
                      containerRef={
                        chartRefs[
                          `collab${(index % 2) + 1}` as keyof typeof chartRefs
                        ]
                      }
                      _tracing="协作影响力得分图表"
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        ),
      }));
  }, [mockDetailedScoreData]);

  // 生成统一的参与详情表格数据
  // 定义新的表格数据类型
  interface DetailedTableRowData {
    组织名称: string;
    项目生态: string;
    代码贡献总量2024_2025: number;
    Issue贡献总量2024_2025: number;
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

  const participantTableData = useMemo((): DetailedTableRowData[] => {
    const allParticipants: DetailedTableRowData[] = [];

    // 基于生态得分数据生成详细的参与者数据
    data.生态得分
      .filter((item) => item.生态 !== '总得分')
      .forEach((ecosystem, ecoIndex) => {
        // 为每个生态生成多个参与者记录
        const participantCount = Math.floor(Math.random() * 3) + 2; // 2-4个参与者

        for (let i = 0; i < participantCount; i++) {
          const isOrganization = Math.random() > 0.6; // 60%概率是组织
          const orgName = isOrganization
            ? `${ecosystem.生态}_Org_${i + 1}`
            : '个人开发者';

          allParticipants.push({
            组织名称: orgName,
            项目生态: ecosystem.生态,
            代码贡献总量2024_2025: Math.floor(Math.random() * 10000) + 1000,
            Issue贡献总量2024_2025: Math.floor(Math.random() * 1000) + 100,
            网络影响力2024: {
              社区核心度: Math.random() * 1,
              协作影响力: Math.random() * 1,
              联通控制力: Math.random() * 1,
              PageRank: Math.random() * 0.1,
            },
            网络影响力2025: {
              社区核心度: Math.random() * 1,
              协作影响力: Math.random() * 1,
              联通控制力: Math.random() * 1,
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
              生态占比: Math.random() * 0.8 + 0.2, // 20%-100%
            },
            个人生态影响力2024: {
              社区核心度: Math.random() * 1,
              协作影响力: Math.random() * 1,
              联通控制力: Math.random() * 1,
              PageRank: Math.random() * 0.05,
            },
            角色2025: {
              代码贡献量: Math.floor(Math.random() * 3000) + 300,
              Issue贡献量: Math.floor(Math.random() * 300) + 30,
              生态占比: Math.random() * 0.8 + 0.2, // 20%-100%
            },
            个人生态影响力2025: {
              社区核心度: Math.random() * 1,
              协作影响力: Math.random() * 1,
              联通控制力: Math.random() * 1,
              PageRank: Math.random() * 0.05,
            },
            projectRowSpan: 1,
            key: `${ecosystem.生态}-${i}-${ecoIndex}`,
          });
        }
      });

    // 按项目/生态排序，相同项目的数据会聚集在一起
    allParticipants.sort((a, b) => a.项目生态.localeCompare(b.项目生态));

    // 计算需要合并的行
    const mergedData = allParticipants.map((item, idx) => {
      const prevItem = allParticipants[idx - 1];

      // 检查当前项目是否与前一项相同
      const shouldMergeWithPrev =
        prevItem && prevItem.项目生态 === item.项目生态;

      // 计算相同项目的总行数
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
  }, [data.生态得分]);

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
          {score.toFixed(2)}
        </Text>
      ),
      sorter: (a, b) => a.生态年均分 - b.生态年均分,
    },
    {
      title: '2024年得分',
      dataIndex: '2024年得分',
      key: '2024年得分',
      render: (score: number) =>
        score > 0 ? (
          <Text
            type={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'danger'}
          >
            {score.toFixed(2)}
          </Text>
        ) : (
          <Text type="secondary">-</Text>
        ),
    },
    {
      title: '2025年得分',
      dataIndex: '2025年得分',
      key: '2025年得分',
      render: (score: number) =>
        score > 0 ? (
          <Text
            type={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'danger'}
          >
            {score.toFixed(2)}
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
      <style dangerouslySetInnerHTML={{ __html: tableStyles }} />
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 返回按钮 */}
          <div className="mb-6">
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              className="p-0"
            >
              返回列表
            </Button>
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
              summary={(pageData) => {
                const totalAvgScore =
                  pageData
                    .filter((item) => item.生态 !== '总得分')
                    .reduce((sum, item) => sum + item.生态年均分, 0) /
                  pageData.filter((item) => item.生态 !== '总得分').length;

                return (
                  <Table.Summary.Row style={{ backgroundColor: '#fafafa' }}>
                    <Table.Summary.Cell index={0}>
                      <Text strong>平均得分</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text
                        strong
                        type={totalAvgScore >= 70 ? 'success' : 'warning'}
                      >
                        {totalAvgScore.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text type="secondary">-</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <Text type="secondary">-</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </Card>

          {/* 详细得分分析 */}
          <Card
            title={
              <Space>
                <BarChartOutlined />
                <span>详细得分分析</span>
              </Space>
            }
            className="mb-6"
          >
            <Tabs defaultActiveKey="0" items={tabItems} />
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
              style={{
                fontFamily: 'Arial, sans-serif',
              }}
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
                  title: '2024-2025组织代码贡献总量',
                  dataIndex: '代码贡献总量2024_2025',
                  key: '代码贡献总量2024_2025',
                  width: 180,
                  fixed: 'left' as const,
                  render: (value: number, record) => ({
                    children: <Text>{value.toLocaleString()}</Text>,
                    props: {
                      rowSpan: record.projectRowSpan,
                    },
                  }),
                },
                {
                  title: '2024-2025组织Issue贡献总量',
                  dataIndex: 'Issue贡献总量2024_2025',
                  key: 'Issue贡献总量2024_2025',
                  width: 180,
                  fixed: 'left' as const,
                  render: (value: number, record) => ({
                    children: <Text>{value.toLocaleString()}</Text>,
                    props: {
                      rowSpan: record.projectRowSpan,
                    },
                  }),
                },
                {
                  title: '2024年组织网络影响力',
                  key: '网络影响力2024',
                  width: 200,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        社区核心度:{' '}
                        {record.网络影响力2024.社区核心度.toFixed(3)}
                      </div>
                      <div>
                        协作影响力:{' '}
                        {record.网络影响力2024.协作影响力.toFixed(3)}
                      </div>
                      <div>
                        联通控制力:{' '}
                        {record.网络影响力2024.联通控制力.toFixed(3)}
                      </div>
                      <div>
                        PageRank: {record.网络影响力2024.PageRank.toFixed(4)}
                      </div>
                    </div>
                  ),
                },
                {
                  title: '2025年组织网络影响力',
                  key: '网络影响力2025',
                  width: 200,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        社区核心度:{' '}
                        {record.网络影响力2025.社区核心度.toFixed(3)}
                      </div>
                      <div>
                        协作影响力:{' '}
                        {record.网络影响力2025.协作影响力.toFixed(3)}
                      </div>
                      <div>
                        联通控制力:{' '}
                        {record.网络影响力2025.联通控制力.toFixed(3)}
                      </div>
                      <div>
                        PageRank: {record.网络影响力2025.PageRank.toFixed(4)}
                      </div>
                    </div>
                  ),
                },
                {
                  title: '具体人员GitHub账号',
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
                      {repos.map((repo, index) => (
                        <div key={index}>{repo}</div>
                      ))}
                    </div>
                  ),
                },
                {
                  title: '2024年角色',
                  key: '角色2024',
                  width: 180,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        代码贡献量:{' '}
                        {record.角色2024.代码贡献量.toLocaleString()}
                      </div>
                      <div>
                        Issue贡献量:{' '}
                        {record.角色2024.Issue贡献量.toLocaleString()}
                      </div>
                      <div>
                        生态占比: {(record.角色2024.生态占比 * 100).toFixed(1)}%
                      </div>
                    </div>
                  ),
                },
                {
                  title: '2024年个人在生态中',
                  key: '个人生态影响力2024',
                  width: 180,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        社区核心度:{' '}
                        {record.个人生态影响力2024.社区核心度.toFixed(3)}
                      </div>
                      <div>
                        协作影响力:{' '}
                        {record.个人生态影响力2024.协作影响力.toFixed(3)}
                      </div>
                      <div>
                        联通控制力:{' '}
                        {record.个人生态影响力2024.联通控制力.toFixed(3)}
                      </div>
                      <div>
                        PageRank:{' '}
                        {record.个人生态影响力2024.PageRank.toFixed(4)}
                      </div>
                    </div>
                  ),
                },
                {
                  title: '2025年角色',
                  key: '角色2025',
                  width: 180,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        代码贡献量:{' '}
                        {record.角色2025.代码贡献量.toLocaleString()}
                      </div>
                      <div>
                        Issue贡献量:{' '}
                        {record.角色2025.Issue贡献量.toLocaleString()}
                      </div>
                      <div>
                        生态占比: {(record.角色2025.生态占比 * 100).toFixed(1)}%
                      </div>
                    </div>
                  ),
                },
                {
                  title: '2025年个人在生态中',
                  key: '个人生态影响力2025',
                  width: 180,
                  render: (record: DetailedTableRowData) => (
                    <div style={{ fontSize: '12px' }}>
                      <div>
                        社区核心度:{' '}
                        {record.个人生态影响力2025.社区核心度.toFixed(3)}
                      </div>
                      <div>
                        协作影响力:{' '}
                        {record.个人生态影响力2025.协作影响力.toFixed(3)}
                      </div>
                      <div>
                        联通控制力:{' '}
                        {record.个人生态影响力2025.联通控制力.toFixed(3)}
                      </div>
                      <div>
                        PageRank:{' '}
                        {record.个人生态影响力2025.PageRank.toFixed(4)}
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
