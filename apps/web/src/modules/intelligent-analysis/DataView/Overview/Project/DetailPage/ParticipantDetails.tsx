// autocorrect: false
import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Tabs, Statistic, Row, Col, Spin } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import type { ColumnsType } from 'antd/es/table';
import {
  translateByLocale,
  translateCompositeString,
  ecosystemMapping,
} from '../utils/countryMapping';
import { PROJECT_NAME_MAP } from '../../utils';

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

interface YearLabels {
  previous: number;
  current: number;
}

const DEFAULT_YEAR_LABELS: YearLabels = {
  previous: 2024,
  current: 2025,
};

const toSafeNumber = (value: unknown) => {
  const num = Number(value ?? 0);
  return Number.isFinite(num) ? num : 0;
};

const detectYearLabels = (value: unknown): YearLabels => {
  const years = Array.from(
    new Set(
      JSON.stringify(value ?? {})
        .match(/\b20\d{2}\b/g)
        ?.map((item) => Number(item))
        .filter((year) => Number.isFinite(year)) || []
    )
  ).sort((a, b) => a - b);

  if (years.length >= 2) {
    return {
      previous: years[years.length - 2],
      current: years[years.length - 1],
    };
  }

  if (years.length === 1) {
    return {
      previous: years[0] - 1,
      current: years[0],
    };
  }

  return DEFAULT_YEAR_LABELS;
};

const getParticipantStringValue = (
  item: Record<string, any>,
  year: number,
  field: string,
  fallbackKey: string
) => String(item?.[`${year}年${field}`] || item?.[fallbackKey] || '');

const getParticipantNumberValue = (
  item: Record<string, any>,
  year: number,
  field: string,
  fallbackKey: string
) => toSafeNumber(item?.[`${year}年${field}`] ?? item?.[fallbackKey]);

const buildParticipantRepoData = (
  item: Record<string, any>,
  yearLabels: YearLabels
) => ({
  '2024年角色承担': getParticipantStringValue(
    item,
    yearLabels.previous,
    '角色承担',
    '2024年角色承担'
  ),
  '2024年目标生态占个人总活跃量比值': getParticipantNumberValue(
    item,
    yearLabels.previous,
    '目标生态占个人总活跃量比值',
    '2024年目标生态占个人总活跃量比值'
  ),
  '2024年个人代码贡献量': getParticipantNumberValue(
    item,
    yearLabels.previous,
    '个人代码贡献量',
    '2024年个人代码贡献量'
  ),
  '2024年个人Issue贡献量': getParticipantNumberValue(
    item,
    yearLabels.previous,
    '个人Issue贡献量',
    '2024年个人Issue贡献量'
  ),
  '2024年个人社区核心度': getParticipantStringValue(
    item,
    yearLabels.previous,
    '个人社区核心度',
    '2024年个人社区核心度'
  ),
  '2024年个人协作影响力': getParticipantStringValue(
    item,
    yearLabels.previous,
    '个人协作影响力',
    '2024年个人协作影响力'
  ),
  '2024年个人联通控制力': getParticipantStringValue(
    item,
    yearLabels.previous,
    '个人联通控制力',
    '2024年个人联通控制力'
  ),
  '2024年个人PageRank': getParticipantStringValue(
    item,
    yearLabels.previous,
    '个人PageRank',
    '2024年个人PageRank'
  ),
  '2025年角色承担': getParticipantStringValue(
    item,
    yearLabels.current,
    '角色承担',
    '2025年角色承担'
  ),
  '2025年目标生态占个人总活跃量比值': getParticipantNumberValue(
    item,
    yearLabels.current,
    '目标生态占个人总活跃量比值',
    '2025年目标生态占个人总活跃量比值'
  ),
  '2025年个人代码贡献量': getParticipantNumberValue(
    item,
    yearLabels.current,
    '个人代码贡献量',
    '2025年个人代码贡献量'
  ),
  '2025年个人Issue贡献量': getParticipantNumberValue(
    item,
    yearLabels.current,
    '个人Issue贡献量',
    '2025年个人Issue贡献量'
  ),
  '2025年个人社区核心度': getParticipantStringValue(
    item,
    yearLabels.current,
    '个人社区核心度',
    '2025年个人社区核心度'
  ),
  '2025年个人协作影响力': getParticipantStringValue(
    item,
    yearLabels.current,
    '个人协作影响力',
    '2025年个人协作影响力'
  ),
  '2025年个人联通控制力': getParticipantStringValue(
    item,
    yearLabels.current,
    '个人联通控制力',
    '2025年个人联通控制力'
  ),
  '2025年个人PageRank': getParticipantStringValue(
    item,
    yearLabels.current,
    '个人PageRank',
    '2025年个人PageRank'
  ),
});

const transformApiDataToOrganizationData = (
  rawData: unknown,
  organizationId: string,
  yearLabels: YearLabels
): OrganizationData => {
  const dataByEcosystem =
    rawData && typeof rawData === 'object'
      ? (rawData as Record<string, any>)
      : {};

  const organizationData = Object.entries(dataByEcosystem).reduce<
    OrganizationData[string]
  >((acc, [ecosystemName, ecosystemData]) => {
    const meta =
      ecosystemData && typeof ecosystemData === 'object' ? ecosystemData : {};
    const list = Array.isArray(meta['人员参与项目清单'])
      ? meta['人员参与项目清单']
      : [];
    const rangeKey = `${yearLabels.previous}-${yearLabels.current}`;

    const participants = list.reduce<EcosystemData['人员参与项目清单']>(
      (participantAcc, item) => {
        const githubUser = String(item?.['用户ID'] || '');
        const repository = String(item?.['项目名称'] || '');

        if (!githubUser || !repository) {
          return participantAcc;
        }

        if (!participantAcc[githubUser]) {
          participantAcc[githubUser] = {};
        }

        participantAcc[githubUser][repository] = buildParticipantRepoData(
          item,
          yearLabels
        );

        return participantAcc;
      },
      {}
    );

    acc[ecosystemName] = {
      '2024-2025组织代码贡献总量': toSafeNumber(
        meta[`${rangeKey}组织代码贡献总量`] ?? meta['2024-2025组织代码贡献总量']
      ),
      '2024-2025组织Issue贡献总量': toSafeNumber(
        meta[`${rangeKey}组织Issue贡献总量`] ??
          meta['2024-2025组织Issue贡献总量']
      ),
      '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': String(
        meta[
          `${yearLabels.previous}组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)`
        ] ||
          meta[
            '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
          ] ||
          ''
      ),
      '2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)': String(
        meta[
          `${yearLabels.current}组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)`
        ] ||
          meta[
            '2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
          ] ||
          ''
      ),
      人员参与项目清单: participants,
    };

    return acc;
  }, {});

  return {
    [organizationId]: organizationData,
  };
};

const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  ecosystem,
  organizationId,
}) => {
  const normalizeId = (n: string) =>
    typeof n === 'string'
      ? n.replace(/^(github|gitcode|gitee|atomgit):/i, '')
      : n;
  const getPlatformFromId = (n: string) => {
    const raw = typeof n === 'string' ? n.trim().toLowerCase() : '';
    if (raw.startsWith('gitee:')) return 'gitee';
    if (raw.startsWith('gitcode:')) return 'atomgit';
    if (raw.startsWith('atomgit:')) return 'atomgit';
    return 'github';
  };
  const { t, i18n } = useTranslation('intelligent_analysis');
  const [data, setData] = useState<OrganizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [yearLabels, setYearLabels] = useState<YearLabels>(DEFAULT_YEAR_LABELS);

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const mappedEcosystem =
          PROJECT_NAME_MAP[ecosystem.toLowerCase()] || ecosystem;
        const jsonResponse = await fetch(
          `/test/intelligent-analysis-new/${mappedEcosystem}/${organizationId
            .replace(':', '_')
            .replaceAll(' ', '_')}.json`
        );

        if (jsonResponse.ok) {
          const jsonData = await jsonResponse.json();
          setYearLabels(DEFAULT_YEAR_LABELS);
          setData(jsonData);
          return;
        }

        if (jsonResponse.status !== 404) {
          throw new Error(`Failed to fetch data: ${jsonResponse.status}`);
        }

        const response = await fetch(
          'https://compute.lishengbao.com.cn/developer_discovery/detail_list',
          {
            method: 'POST',
            headers: {
              'X-API-Key': 'opensearch',
              'Content-Type': 'application/json',
              Accept: '*/*',
            },
            body: JSON.stringify({
              ecosystem: mappedEcosystem,
              developer: organizationId,
              page: 1,
              page_size: 1000,
            }),
          }
        );

        if (!response.ok) {
          let message = `Failed to fetch data: ${response.status}`;
          try {
            const errJson = await response.json();
            const maybeMessage =
              errJson && typeof errJson.message === 'string'
                ? errJson.message
                : '';
            if (maybeMessage) {
              message = maybeMessage;
            }
          } catch {}
          throw new Error(message);
        }

        const rawData = await response.json();

        if (rawData?.status && rawData.status !== 'success') {
          throw new Error(
            typeof rawData?.message === 'string'
              ? rawData.message
              : 'Request failed'
          );
        }

        const detectedYearLabels = detectYearLabels(rawData?.data);
        setYearLabels(detectedYearLabels);
        setData(
          transformApiDataToOrganizationData(
            rawData?.data,
            organizationId,
            detectedYearLabels
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ecosystem, organizationId]);

  // 处理表格数据
  const processTableData = (
    ecosystemData: EcosystemData
  ): ParticipantTableRow[] => {
    const result: ParticipantTableRow[] = [];
    const participants = ecosystemData.人员参与项目清单 || {};

    Object.entries(participants).forEach(([githubUser, userData]) => {
      Object.entries(userData).forEach(([repository, repoData]) => {
        result.push({
          key: `${githubUser}-${repository}`,
          具体人员: githubUser,
          贡献仓库: repository,
          '2024年角色承担': repoData['2024年角色承担'],
          '2024年目标生态占个人总活跃量比值':
            repoData['2024年目标生态占个人总活跃量比值'],
          '2024年个人代码贡献量': repoData['2024年个人代码贡献量'],
          '2024年个人Issue贡献量': repoData['2024年个人Issue贡献量'],
          '2024年个人社区核心度': repoData['2024年个人社区核心度'],
          '2024年个人协作影响力': repoData['2024年个人协作影响力'],
          '2024年个人联通控制力': repoData['2024年个人联通控制力'],
          '2024年个人PageRank': repoData['2024年个人PageRank'],
          '2025年角色承担': repoData['2025年角色承担'],
          '2025年目标生态占个人总活跃量比值':
            repoData['2025年目标生态占个人总活跃量比值'],
          '2025年个人代码贡献量': repoData['2025年个人代码贡献量'],
          '2025年个人Issue贡献量': repoData['2025年个人Issue贡献量'],
          '2025年个人社区核心度': repoData['2025年个人社区核心度'],
          '2025年个人协作影响力': repoData['2025年个人协作影响力'],
          '2025年个人联通控制力': repoData['2025年个人联通控制力'],
          '2025年个人PageRank': repoData['2025年个人PageRank'],
        });
      });
    });

    return result;
  };

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
        {t('project_detail.participant.load_failed')}: {error}
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

  // 创建单个Tab项
  const createTabItem = (
    ecosystemName: string,
    ecosystemData: EcosystemData
  ) => {
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
                ? `${translateByLocale(
                    ecosystemName,
                    ecosystemMapping,
                    i18n.language
                  )} Overview`
                : `${translateByLocale(
                    ecosystemName,
                    ecosystemMapping,
                    i18n.language
                  )}概览`}
            </h3>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={6}>
                {renderStatisticCard(
                  i18n.language === 'en'
                    ? `Organization Code Contribution Total (${yearLabels.previous}-${yearLabels.current})`
                    : `组织代码贡献总量(${yearLabels.previous}-${yearLabels.current})`,
                  ecosystemData['2024-2025组织代码贡献总量'],
                  '#1890ff',
                  (value) => value?.toLocaleString()
                )}
              </Col>
              <Col span={6}>
                {renderStatisticCard(
                  i18n.language === 'en'
                    ? `Organization Issue Contribution Total (${yearLabels.previous}-${yearLabels.current})`
                    : `组织Issue贡献总量(${yearLabels.previous}-${yearLabels.current})`,
                  ecosystemData['2024-2025组织Issue贡献总量'],
                  '#52c41a',
                  (value) => value?.toLocaleString()
                )}
              </Col>
              {/* 当 organizationId 为组织时才显示后两个统计项 */}
              {organizationId.startsWith('org:') && (
                <>
                  <Col span={6}>
                    {renderNetworkInfluenceCard(
                      i18n.language === 'en'
                        ? `${yearLabels.previous} Organization Network Influence(Community Centrality/Collaboration Influence/Connectivity Control/PageRank)`
                        : `${yearLabels.previous}组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)`,
                      ecosystemData[
                        '2024组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
                      ],
                      '#fa8c16'
                    )}
                  </Col>
                  <Col span={6}>
                    {renderNetworkInfluenceCard(
                      i18n.language === 'en'
                        ? `${yearLabels.current} Organization Network Influence(Community Centrality/Collaboration Influence/Connectivity Control/PageRank)`
                        : `${yearLabels.current}年组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)`,
                      ecosystemData[
                        '2025组织网络影响力(社区核心度/协作影响力/联通控制力/PageRank)'
                      ],
                      '#722ed1'
                    )}
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
              showTotal: getPaginationTotal,
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
      ),
    };
  };

  // 渲染主要内容
  const renderMainContent = () => {
    if (loading) {
      return renderLoadingState();
    }

    if (error) {
      return renderErrorState();
    }

    if (!data) {
      return renderEmptyState(t('project_detail.participant.no_data'));
    }

    // 获取第一个组织的数据
    const organizationData = Object.values(data)[0];
    if (!organizationData) {
      return renderEmptyState(
        t('project_detail.participant.organization_data_not_exist')
      );
    }

    // 创建Tab项
    const tabItems = Object.entries(organizationData).map(
      ([ecosystemName, ecosystemData]) =>
        createTabItem(ecosystemName, ecosystemData)
    );

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
          defaultActiveKey={Object.keys(organizationData)[0]}
          size="large"
          tabPosition="top"
        />
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
        const platform = getPlatformFromId(name);
        return (
          <a
            href={`/developer/${platform}/${encodeURIComponent(normalized)}`}
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
      title:
        i18n.language === 'en'
          ? `${yearLabels.previous} Data`
          : `${yearLabels.previous}年数据`,
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
      title:
        i18n.language === 'en'
          ? `${yearLabels.current} Data`
          : `${yearLabels.current}年数据`,
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
