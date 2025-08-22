// autocorrect: false
import React, { useMemo, useState, useEffect } from 'react';
import { Card, Table, Typography, Space, Tabs, Statistic, Row, Col, Spin } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import type { ColumnsType } from 'antd/es/table';
import { translateByLocale, translateCompositeString, ecosystemMapping } from '../utils/countryMapping';
import { PROJECT_NAME_MAP } from '../../utils';

const { Text } = Typography;

// 新的数据类型定义
interface EcosystemData {
  '2024-2025组织代码贡献总量': number;
  '2024-2025组织Issue贡献总量': number;
  '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': string;
  '2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': string;
  人员参与项目清单: {
    [githubUser: string]: {
      [repository: string]: {
        '2024年角色承担': string;
        '2024年目标生态占个人总活跃量比值': number;
        '2024年个人代码贡献量': number;
        '2024年个人Issue贡献量': number;
        '2024年个人社区核心度': string;
        '2024年个人协作影响力': string;
        '2024年个人联通控制力': string;
        '2024年个人PageRank': string;
        '2025年角色承担': string;
        '2025年目标生态占个人总活跃量比值': number;
        '2025年个人代码贡献量': number;
        '2025年个人Issue贡献量': number;
        '2025年个人社区核心度': string;
        '2025年个人协作影响力': string;
        '2025年个人联通控制力': string;
        '2025年个人PageRank': string;
      };
    };
  };
}

interface OrganizationData {
  [organizationName: string]: {
    [ecosystemName: string]: EcosystemData;
  };
}

interface ParticipantTableRow {
  key: string;
  具体人员: string;
  贡献仓库: string;
  '2024年角色承担': string;
  '2024年目标生态占个人总活跃量比值': number;
  '2024年个人代码贡献量': number;
  '2024年个人Issue贡献量': number;
  '2024年个人社区核心度': string;
  '2024年个人协作影响力': string;
  '2024年个人联通控制力': string;
  '2024年个人PageRank': string;
  '2025年角色承担': string;
  '2025年目标生态占个人总活跃量比值': number;
  '2025年个人代码贡献量': number;
  '2025年个人Issue贡献量': number;
  '2025年个人社区核心度': string;
  '2025年个人协作影响力': string;
  '2025年个人联通控制力': string;
  '2025年个人PageRank': string;
}

interface ParticipantDetailsProps {
  ecosystem: string; // 如 'Flutter'
  organizationId: string; // 如 'org_google'
}



const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({ ecosystem, organizationId }) => {
  const { t, i18n } = useTranslation('intelligent_analysis');
  const [data, setData] = useState<OrganizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const mappedEcosystem = PROJECT_NAME_MAP[ecosystem.toLowerCase()] || ecosystem;
        const response = await fetch(`/test/intelligent-analysis-new/${mappedEcosystem}/${organizationId.replace(':', '_')}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ecosystem, organizationId]);

  // 处理表格数据
  const processTableData = (ecosystemData: EcosystemData): ParticipantTableRow[] => {
    const result: ParticipantTableRow[] = [];
    const participants = ecosystemData.人员参与项目清单 || {};

    Object.entries(participants).forEach(([githubUser, userData]) => {
      Object.entries(userData).forEach(([repository, repoData]) => {
        result.push({
          key: `${githubUser}-${repository}`,
          具体人员: githubUser,
          贡献仓库: repository,
          '2024年角色承担': repoData['2024年角色承担'],
          '2024年目标生态占个人总活跃量比值': repoData['2024年目标生态占个人总活跃量比值'],
          '2024年个人代码贡献量': repoData['2024年个人代码贡献量'],
          '2024年个人Issue贡献量': repoData['2024年个人Issue贡献量'],
          '2024年个人社区核心度': repoData['2024年个人社区核心度'],
          '2024年个人协作影响力': repoData['2024年个人协作影响力'],
          '2024年个人联通控制力': repoData['2024年个人联通控制力'],
          '2024年个人PageRank': repoData['2024年个人PageRank'],
          '2025年角色承担': repoData['2025年角色承担'],
          '2025年目标生态占个人总活跃量比值': repoData['2025年目标生态占个人总活跃量比值'],
          '2025年个人代码贡献量': repoData['2025年个人代码贡献量'],
          '2025年个人Issue贡献量': repoData['2025年个人Issue贡献量'],
          '2025年个人社区核心度': repoData['2025年个人社区核心度'],
          '2025年个人协作影响力': repoData['2025年个人协作影响力'],
          '2025年个人联通控制力': repoData['2025年个人联通控制力'],
          '2025年个人PageRank': repoData['2025年个人PageRank']
        });
      });
    });

    return result;
  };



  // 表格列定义
  const columns: ColumnsType<ParticipantTableRow> = [
    {
      title: t('project_detail.participant.specific_personnel'),
      dataIndex: '具体人员',
      key: '具体人员',
      width: 150,
      fixed: 'left',
    },
    {
      title: t('project_detail.participant.contribution_repo'),
      dataIndex: '贡献仓库',
      key: '贡献仓库',
      width: 200,
      fixed: 'left',
    },
    {
      title: i18n.language === 'en' ? '2024 Data' : '2024年数据',
      children: [
        {
          title: i18n.language === 'en' ? 'Role Responsibility' : '角色承担',
          dataIndex: '2024年角色承担',
          key: '2024年角色承担',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: i18n.language === 'en' ? 'Ecosystem Ratio' : '目标生态占个人总活跃量比值',
          dataIndex: '2024年目标生态占个人总活跃量比值',
          key: '2024年目标生态占个人总活跃量比值',
          width: 120,
          render: (value: number) => `${(value * 100).toFixed(4)}%`,
        },
        {
          title: i18n.language === 'en' ? 'Code Contribution' : '个人代码贡献量',
          dataIndex: '2024年个人代码贡献量',
          key: '2024年个人代码贡献量',
          width: 120,
        },
        {
          title: i18n.language === 'en' ? 'Issue Contribution' : '个人Issue贡献量',
          dataIndex: '2024年个人Issue贡献量',
          key: '2024年个人Issue贡献量',
          width: 120,
        },
        {
          title: i18n.language === 'en' ? 'Community Centrality' : '个人社区核心度',
          dataIndex: '2024年个人社区核心度',
          key: '2024年个人社区核心度',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: i18n.language === 'en' ? 'Collaboration Influence' : '个人协作影响力',
          dataIndex: '2024年个人协作影响力',
          key: '2024年个人协作影响力',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: i18n.language === 'en' ? 'Connectivity Control' : '个人联通控制力',
          dataIndex: '2024年个人联通控制力',
          key: '2024年个人联通控制力',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: 'PageRank',
          dataIndex: '2024年个人PageRank',
          key: '2024年个人PageRank',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
      ],
    },
    {
      title: i18n.language === 'en' ? '2025 Data' : '2025年数据',
      children: [
        {
          title: i18n.language === 'en' ? 'Role Responsibility' : '角色承担',
          dataIndex: '2025年角色承担',
          key: '2025年角色承担',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: i18n.language === 'en' ? 'Ecosystem Ratio' : '生态占比',
          dataIndex: '2025年目标生态占个人总活跃量比值',
          key: '2025年目标生态占个人总活跃量比值',
          width: 120,
          render: (value: number) => `${(value * 100).toFixed(4)}%`,
        },
        {
          title: i18n.language === 'en' ? 'Code Contribution' : '代码贡献量',
          dataIndex: '2025年个人代码贡献量',
          key: '2025年个人代码贡献量',
          width: 120,
        },
        {
          title: i18n.language === 'en' ? 'Issue Contribution' : 'Issue贡献量',
          dataIndex: '2025年个人Issue贡献量',
          key: '2025年个人Issue贡献量',
          width: 120,
        },
        {
          title: i18n.language === 'en' ? 'Community Centrality' : '社区核心度',
          dataIndex: '2025年个人社区核心度',
          key: '2025年个人社区核心度',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: i18n.language === 'en' ? 'Collaboration Influence' : '协作影响力',
          dataIndex: '2025年个人协作影响力',
          key: '2025年个人协作影响力',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: i18n.language === 'en' ? 'Connectivity Control' : '联通控制力',
          dataIndex: '2025年个人联通控制力',
          key: '2025年个人联通控制力',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: 'PageRank',
          dataIndex: '2025年个人PageRank',
          key: '2025年个人PageRank',
          width: 120,
          render: (value: string) => translateByLocale(value, ecosystemMapping, i18n.language),
        },
      ],
    },
  ];

  if (loading) {
    return (
      <Card
        title={
          <Space>
            <TeamOutlined />
            <span>{t('project_detail.participant.title')}</span>
          </Space>
        }
        style={{ marginTop: 16 }}
      >
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>{t('project_detail.participant.loading')}</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        title={
          <Space>
            <TeamOutlined />
            <span>{i18n.language === 'en' ? 'Participant Details' : '参与者详情'}</span>
          </Space>
        }
        style={{ marginTop: 16 }}
      >
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          {t('project_detail.participant.load_failed')}: {error}
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card
        title={
          <Space>
            <TeamOutlined />
            <span>{i18n.language === 'en' ? 'Participant Details' : '参与者详情'}</span>
          </Space>
        }
        style={{ marginTop: 16 }}
      >
        <div style={{ textAlign: 'center', padding: '50px' }}>
          {t('project_detail.participant.no_data')}
        </div>
      </Card>
    );
  }

  // 获取第一个组织的数据
  const organizationData = Object.values(data)[0];
  if (!organizationData) {
    return (
      <Card
        title={
          <Space>
            <TeamOutlined />
            <span>{i18n.language === 'en' ? 'Participant Details' : '参与者详情'}</span>
          </Space>
        }
        style={{ marginTop: 16 }}
      >
        <div style={{ textAlign: 'center', padding: '50px' }}>
          {t('project_detail.participant.organization_data_not_exist')}
        </div>
      </Card>
    );
  }

  // 创建Tab项
  const tabItems = Object.entries(organizationData).map(([ecosystemName, ecosystemData]) => {
    const tableData = processTableData(ecosystemData);

    return {
      key: ecosystemName,
      label: translateByLocale(ecosystemName, ecosystemMapping, i18n.language),
      children: (
        <div>
          {/* 顶部统计信息 */}
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              {i18n.language === 'en'
                ? `${translateByLocale(ecosystemName, ecosystemMapping, i18n.language)} Overview`
                : `${translateByLocale(ecosystemName, ecosystemMapping, i18n.language)}概览`
              }
            </h3>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Card
                  size="small"
                  className="text-center"
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Statistic
                    title={i18n.language === 'en' ? 'Organization Code Contribution Total' : '组织代码贡献总量'}
                    value={ecosystemData['2024-2025组织代码贡献总量']}
                    formatter={(value) => value?.toLocaleString()}
                    valueStyle={{ color: '#1890ff', fontSize: '20px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  size="small"
                  className="text-center"
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Statistic
                    title={i18n.language === 'en' ? 'Organization Issue Contribution Total' : '组织Issue贡献总量'}
                    value={ecosystemData['2024-2025组织Issue贡献总量']}
                    formatter={(value) => value?.toLocaleString()}
                    valueStyle={{ color: '#52c41a', fontSize: '20px', fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
              {/* 当 organizationId 为组织时才显示后两个统计项 */}
              {organizationId.startsWith('org:') && (
                <>
                  <Col span={6}>
                    <Card
                      size="small"
                      className="text-center"
                      style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        height: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <Statistic
                        title={i18n.language === 'en' ? '2024 Organization Network Influence' : '2024组织网络影响力'}
                        value={ecosystemData['2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'] || 'N/A'}
                        formatter={(value) => {
                          if (!value || value === 'N/A') {
                            return i18n.language === 'en' ? 'No data' : '暂无数据';
                          }
                          const translated = translateCompositeString(value as string, ecosystemMapping, i18n.language);
                          // 如果翻译后的文本太长，使用省略号
                          if (translated.length > 20) {
                            return (
                              <span title={translated} style={{ 
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
                              }}>
                                {translated}
                              </span>
                            );
                          }
                          return translated;
                        }}
                        valueStyle={{ color: '#fa8c16', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card
                      size="small"
                      className="text-center"
                      style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        height: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <Statistic
                        title={i18n.language === 'en' ? '2025 Organization Network Influence' : '2025年组织网络影响力'}
                        value={ecosystemData['2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'] || 'N/A'}
                        formatter={(value) => {
                          if (!value || value === 'N/A') {
                            return i18n.language === 'en' ? 'No data' : '暂无数据';
                          }
                          const translated = translateCompositeString(value as string, ecosystemMapping, i18n.language);
                          // 如果翻译后的文本太长，使用省略号
                          if (translated.length > 20) {
                            return (
                              <span title={translated} style={{ 
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
                              }}>
                                {translated}
                              </span>
                            );
                          }
                          return translated;
                        }}
                        valueStyle={{ color: '#722ed1', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}
                      />
                    </Card>
                  </Col>
                </>
              )}
            </Row>
          </div>

          {/* 人员参与项目清单表格 */}
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                i18n.language === 'en'
                  ? `${range[0]}-${range[1]} of ${total} items`
                  : `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            }}
            scroll={{ x: 1800, y: 600 }}
            size="small"
            bordered
            title={() => i18n.language === 'en' ? 'Personnel Project List' : '人员参与项目清单'}
          />
        </div>
      ),
    };
  });

  return (
    <Card
      title={
        <Space>
          <TeamOutlined />
          <span>{i18n.language === 'en' ? 'Participant Details' : '参与者详情'}</span>
        </Space>
      }
      style={{ marginTop: 16 }}
    >
      <Tabs
        items={tabItems}
        defaultActiveKey={Object.keys(organizationData)[0]}
        size="large"
        tabPosition="top"
      />
    </Card>
  );
};

export default ParticipantDetails;
