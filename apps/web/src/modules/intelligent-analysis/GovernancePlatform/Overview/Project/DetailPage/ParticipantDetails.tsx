// autocorrect: false
import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Typography,
  Space,
  Tabs,
  Statistic,
  Row,
  Col,
  Spin,
} from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import {
  translateByLocale,
  translateCompositeString,
  ecosystemMapping,
} from '../utils/countryMapping';
import { PROJECT_NAME_MAP } from '../../utils';

const { Text } = Typography;

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

const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  ecosystem,
  organizationId,
}) => {
  const normalizeId = (n: string) =>
    typeof n === 'string' ? n.replace(/^(github|gitcode):/i, '') : n;
  const { t, i18n } = useTranslation('intelligent_analysis');
  const [requestedEcosystem, setRequestedEcosystem] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setRequestedEcosystem('');
    setCurrentPage(1);
  }, [ecosystem, organizationId]);

  const mappedEcosystem = PROJECT_NAME_MAP[ecosystem.toLowerCase()] || ecosystem;

  const {
    data: apiData,
    isFetching: apiLoading,
    error: apiError,
  } = useQuery({
    queryKey: [
      'intelligent-analysis',
      'participant-details',
      mappedEcosystem,
      organizationId,
      requestedEcosystem,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('organizationId', organizationId);
      params.set('page', String(currentPage));
      params.set('pageSize', String(pageSize));
      if (requestedEcosystem) params.set('ecosystemName', requestedEcosystem);

      const response = await fetch(
        `/api/intelligent-analysis/projects/${encodeURIComponent(
          mappedEcosystem
        )}/participant-details?${params.toString()}`
      );

      if (!response.ok) {
        let message = `Failed to fetch data: ${response.status}`;
        try {
          const errJson = await response.json();
          const maybeMessage =
            errJson && typeof errJson.message === 'string' ? errJson.message : '';
          if (maybeMessage) message = maybeMessage;
        } catch { }
        throw new Error(message);
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  // 渲染加载状态
  const renderLoadingState = () => (
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
        <div style={{ marginTop: 16 }}>
          {t('project_detail.participant.loading')}
        </div>
      </div>
    </Card>
  );

  // 渲染错误状态
  const renderErrorState = () => (
    <Card
      title={
        <Space>
          <TeamOutlined />
          <span>
            {i18n.language === 'en' ? 'Participant Details' : '参与者详情'}
          </span>
        </Space>
      }
      style={{ marginTop: 16 }}
    >
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        {t('project_detail.participant.load_failed')}:{' '}
        {apiError instanceof Error ? apiError.message : String(apiError || '')}
      </div>
    </Card>
  );

  // 渲染空数据状态
  const renderEmptyState = (message: string) => (
    <Card
      title={
        <Space>
          <TeamOutlined />
          <span>
            {i18n.language === 'en' ? 'Participant Details' : '参与者详情'}
          </span>
        </Space>
      }
      style={{ marginTop: 16 }}
    >
      <div style={{ textAlign: 'center', padding: '50px' }}>{message}</div>
    </Card>
  );

  // 分页总数显示函数
  const getPaginationTotal = (total: number, range: [number, number]) => {
    return i18n.language === 'en'
      ? `${range[0]}-${range[1]} of ${total} items`
      : `第 ${range[0]}-${range[1]} 条/共 ${total} 条`;
  };

  const ecosystems: string[] = Array.isArray(apiData?.ecosystems)
    ? apiData.ecosystems
    : [];
  const metaByEcosystem =
    apiData?.metaByEcosystem && typeof apiData.metaByEcosystem === 'object'
      ? apiData.metaByEcosystem
      : null;
  const activeEcosystem = String(
    requestedEcosystem ||
    apiData?.activeEcosystem ||
    ecosystems[0] ||
    ''
  );
  const activeMeta =
    metaByEcosystem && activeEcosystem ? (metaByEcosystem as any)[activeEcosystem] : null;
  const tableRows: ParticipantTableRow[] = Array.isArray(apiData?.items)
    ? apiData.items
    : [];
  const total = typeof apiData?.total === 'number' ? apiData.total : 0;

  // 渲染主要内容
  const renderMainContent = () => {
    if (apiLoading) {
      return renderLoadingState();
    }

    if (apiError) {
      return renderErrorState();
    }

    if (ecosystems.length === 0) {
      return renderEmptyState(t('project_detail.participant.no_data'));
    }

    const tabItems = ecosystems.map((ecosystemName) => ({
      key: ecosystemName,
      label: translateByLocale(ecosystemName, ecosystemMapping, i18n.language),
    }));

    return (
      <Card
        title={
          <Space>
            <TeamOutlined />
            <span>
              {i18n.language === 'en' ? 'Participant Details' : '参与者详情'}
            </span>
          </Space>
        }
        style={{ marginTop: 16 }}
      >
        <Tabs
          items={tabItems}
          activeKey={activeEcosystem}
          onChange={(key) => {
            setRequestedEcosystem(key);
            setCurrentPage(1);
          }}
          size="large"
          tabPosition="top"
        />
        <div>
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              {i18n.language === 'en'
                ? `${translateByLocale(
                  activeEcosystem || ecosystems[0],
                  ecosystemMapping,
                  i18n.language
                )} Overview`
                : `${translateByLocale(
                  activeEcosystem || ecosystems[0],
                  ecosystemMapping,
                  i18n.language
                )}概览`}
            </h3>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={6}>
                {renderStatisticCard(
                  i18n.language === 'en'
                    ? 'Organization Code Contribution Total'
                    : '组织代码贡献总量',
                  Number(activeMeta?.['2024-2025组织代码贡献总量'] || 0),
                  '#1890ff',
                  (value) => value?.toLocaleString()
                )}
              </Col>
              <Col span={6}>
                {renderStatisticCard(
                  i18n.language === 'en'
                    ? 'Organization Issue Contribution Total'
                    : '组织Issue贡献总量',
                  Number(activeMeta?.['2024-2025组织Issue贡献总量'] || 0),
                  '#52c41a',
                  (value) => value?.toLocaleString()
                )}
              </Col>
              {organizationId.startsWith('org:') && (
                <>
                  <Col span={6}>
                    {renderNetworkInfluenceCard(
                      i18n.language === 'en'
                        ? '2024 Organization Network Influence(Community Centrality/Collaboration Influence/Connectivity Control/PageRank)'
                        : '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)',
                      String(
                        activeMeta?.[
                        '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
                        ] || ''
                      ),
                      '#fa8c16'
                    )}
                  </Col>
                  <Col span={6}>
                    {renderNetworkInfluenceCard(
                      i18n.language === 'en'
                        ? '2025 Organization Network Influence(Community Centrality/Collaboration Influence/Connectivity Control/PageRank)'
                        : '2025年组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)',
                      String(
                        activeMeta?.[
                        '2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
                        ] || ''
                      ),
                      '#722ed1'
                    )}
                  </Col>
                </>
              )}
            </Row>
          </div>

          <Table
            columns={columns}
            dataSource={tableRows}
            pagination={{
              current: currentPage,
              pageSize,
              total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: getPaginationTotal,
              onChange: (p, ps) => {
                setCurrentPage(p);
                setPageSize(ps);
              },
            }}
            scroll={{ x: 1800, y: 600 }}
            size="small"
            bordered
            title={() =>
              i18n.language === 'en'
                ? 'Personnel Project List'
                : '人员参与项目清单'
            }
          />
        </div>
      </Card>
    );
  };

  // 表格列定义
  const columns: ColumnsType<ParticipantTableRow> = [
    {
      title: t('project_detail.participant.specific_personnel'),
      dataIndex: '具体人员',
      key: '具体人员',
      width: 150,
      fixed: 'left',
      render: (name: string) => {
        const normalized = normalizeId(name);
        return (
          <a
            href={`/developer/${encodeURIComponent(normalized)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {normalized}
          </a>
        );
      },
    },
    {
      title: t('project_detail.participant.contribution_repo'),
      dataIndex: '贡献仓库',
      key: '贡献仓库',
      width: 200,
      fixed: 'left',
      render: (repo: string) => {
        const toGithubUrl = (r?: string) => {
          if (!r) return null;
          const value = r.trim();
          if (/^https?:\/\/(www\.)?github\.com\//i.test(value)) {
            return value;
          }
          const normalized = value.replace(/^github:/i, '');
          const match = normalized.match(
            /^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(\.git)?$/
          );
          if (match) {
            return `https://github.com/${match[1]}/${match[2]}`;
          }
          return null;
        };
        const url = toGithubUrl(repo);
        const display = (repo || '').replace(/^github:/i, '');
        return url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {display}
          </a>
        ) : (
          <span>{display}</span>
        );
      },
    },
    {
      title: i18n.language === 'en' ? '2024 Data' : '2024年数据',
      children: [
        {
          title: i18n.language === 'en' ? 'Role Responsibility' : '角色承担',
          dataIndex: '2024年角色承担',
          key: '2024年角色承担',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title:
            i18n.language === 'en'
              ? 'Ecosystem Ratio'
              : '目标生态占个人总活跃量比值',
          dataIndex: '2024年目标生态占个人总活跃量比值',
          key: '2024年目标生态占个人总活跃量比值',
          width: 120,
          render: (value: number) => `${(value * 100).toFixed(4)}%`,
        },
        {
          title:
            i18n.language === 'en' ? 'Code Contribution' : '个人代码贡献量',
          dataIndex: '2024年个人代码贡献量',
          key: '2024年个人代码贡献量',
          width: 120,
        },
        {
          title:
            i18n.language === 'en' ? 'Issue Contribution' : '个人Issue贡献量',
          dataIndex: '2024年个人Issue贡献量',
          key: '2024年个人Issue贡献量',
          width: 120,
        },
        {
          title:
            i18n.language === 'en' ? 'Community Centrality' : '个人社区核心度',
          dataIndex: '2024年个人社区核心度',
          key: '2024年个人社区核心度',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title:
            i18n.language === 'en'
              ? 'Collaboration Influence'
              : '个人协作影响力',
          dataIndex: '2024年个人协作影响力',
          key: '2024年个人协作影响力',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title:
            i18n.language === 'en' ? 'Connectivity Control' : '个人联通控制力',
          dataIndex: '2024年个人联通控制力',
          key: '2024年个人联通控制力',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: 'PageRank',
          dataIndex: '2024年个人PageRank',
          key: '2024年个人PageRank',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
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
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
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
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title:
            i18n.language === 'en' ? 'Collaboration Influence' : '协作影响力',
          dataIndex: '2025年个人协作影响力',
          key: '2025年个人协作影响力',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: i18n.language === 'en' ? 'Connectivity Control' : '联通控制力',
          dataIndex: '2025年个人联通控制力',
          key: '2025年个人联通控制力',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
        },
        {
          title: 'PageRank',
          dataIndex: '2025年个人PageRank',
          key: '2025年个人PageRank',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, ecosystemMapping, i18n.language),
        },
      ],
    },
  ];

  // 渲染统计卡片
  const renderStatisticCard = (
    title: string,
    value: any,
    color: string,
    formatter?: (value: any) => any
  ) => (
    <Card
      size="small"
      className="text-center"
      style={{
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        height: '130px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Statistic
        title={title}
        value={value}
        formatter={formatter}
        valueStyle={{ color, fontSize: '20px', fontWeight: 'bold' }}
      />
    </Card>
  );

  // 渲染网络影响力统计卡片
  const renderNetworkInfluenceCard = (
    title: string,
    value: string,
    color: string
  ) => (
    <Card
      size="small"
      className="text-center"
      style={{
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        height: '130px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Statistic
        title={title}
        value={value || 'N/A'}
        formatter={(value) => {
          if (!value || value === 'N/A') {
            return i18n.language === 'en' ? 'No data' : '暂无数据';
          }
          const translated = translateCompositeString(
            value as string,
            ecosystemMapping,
            i18n.language
          );
          if (translated.length > 20) {
            return (
              <span
                title={translated}
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {translated}
              </span>
            );
          }
          return translated;
        }}
        valueStyle={{
          color,
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: '1.2',
        }}
      />
    </Card>
  );

  return renderMainContent();
};

export default ParticipantDetails;
