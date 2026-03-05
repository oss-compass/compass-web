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

const normalizeId = (n: string) =>
  typeof n === 'string' ? n.replace(/^(github|gitcode):/i, '') : n;

const renderLoadingState = (t: (key: string) => string) => (
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

const renderErrorState = (
  t: (key: string) => string,
  i18n: { language: string },
  apiError: unknown
) => (
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

const renderEmptyState = (i18n: { language: string }, message: string) => (
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

const getPaginationTotal = (
  i18n: { language: string },
  total: number,
  range: [number, number]
) => {
  return i18n.language === 'en'
    ? `${range[0]}-${range[1]} of ${total} items`
    : `第 ${range[0]}-${range[1]} 条/共 ${total} 条`;
};

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

const renderNetworkInfluenceCard = (
  i18n: { language: string },
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
      formatter={(val) => {
        if (!val || val === 'N/A') {
          return i18n.language === 'en' ? 'No data' : '暂无数据';
        }
        const translated = translateCompositeString(
          val as string,
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
  ecosystem: string;
  organizationId: string;
}

const buildColumns = (
  t: (key: string) => string,
  i18n: { language: string }
): ColumnsType<ParticipantTableRow> => [
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
        title: i18n.language === 'en' ? 'Code Contribution' : '个人代码贡献量',
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
          i18n.language === 'en' ? 'Collaboration Influence' : '个人协作影响力',
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
];

interface ParticipantMainContentProps {
  t: (key: string) => string;
  i18n: { language: string };
  ecosystems: string[];
  activeEcosystem: string;
  onTabChange: (key: string) => void;
  activeMeta: any;
  organizationId: string;
  columns: ColumnsType<ParticipantTableRow>;
  tableRows: ParticipantTableRow[];
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
  apiLoading: boolean;
  apiError: unknown;
}

const ParticipantMainContent: React.FC<ParticipantMainContentProps> = (
  props
) => {
  const {
    t,
    i18n,
    ecosystems,
    activeEcosystem,
    onTabChange,
    activeMeta,
    organizationId,
    columns,
    tableRows,
    currentPage,
    pageSize,
    total,
    onPageChange,
    apiLoading,
    apiError,
  } = props;

  if (apiLoading) {
    return renderLoadingState(t);
  }

  if (apiError) {
    return renderErrorState(t, i18n, apiError);
  }

  if (ecosystems.length === 0) {
    return renderEmptyState(i18n, t('project_detail.participant.no_data'));
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
      // extra={
      //   <Space>
      //     <Button
      //       type="primary"
      //       loading={corsTestLoading}
      //       onClick={async () => {
      //         setCorsTestLoading(true);
      //         setCorsTestMessage(null);
      //         try {
      //           // const resp = await fetch(
      //           //   '/api/intelligent-analysis/external/developer-discovery/detail-list',
      //           //   {
      //           //     method: 'POST',
      //           //     headers: {
      //           //       Accept: '*/*',
      //           //       'Content-Type': 'application/json',
      //           //     },
      //           //     body: JSON.stringify({
      //           //       ecosystem: activeEcosystem || ecosystems[0],
      //           //       developer: organizationId,
      //           //       page: 1,
      //           //       page_size: 10,
      //           //     }),
      //           //   }
      //           // );

      //           const resp = await fetch('http://compute.lishengbao.com.cn:8801/developer_discovery/detail_list', {
      //             method: 'POST',
      //             headers: {
      //               'X-API-Key': 'opensearch',          // 可改成你的真实值/从后端获取
      //               'Cookie': 'session=16c064d959d9f60faa680e00faa33f87', // 建议放到后端，不要在前端暴露
      //               'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      //               'Content-Type': 'application/json',
      //               'Accept': '*/*',
      //               'Host': 'compute.lishengbao.com.cn:8801',
      //               'Connection': 'keep-alive'
      //             },
      //             body: JSON.stringify({
      //               ecosystem: activeEcosystem || ecosystems[0],
      //               developer: organizationId,
      //               page: 1,
      //               page_size: 10,
      //             }),
      //           });

      //           const text = await resp.text();
      //           if (resp.ok) {
      //             setCorsTestMessage(
      //               i18n.language === 'en'
      //                 ? `Success ${resp.status}, length ${text.length}`
      //                 : `成功 ${resp.status}, 响应长度 ${text.length}`
      //             );
      //           } else {
      //             setCorsTestMessage(
      //               i18n.language === 'en'
      //                 ? `HTTP ${resp.status}, ${text.slice(0, 200)}`
      //                 : `HTTP ${resp.status}, ${text.slice(0, 200)}`
      //             );
      //           }
      //         } catch (e: any) {
      //           setCorsTestMessage(
      //             i18n.language === 'en'
      //               ? `Error: ${e?.message || String(e)}`
      //               : `错误: ${e?.message || String(e)}`
      //           );
      //         } finally {
      //           setCorsTestLoading(false);
      //         }
      //       }}
      //     >
      //       {i18n.language === 'en'
      //         ? 'Test External API (CORS)'
      //         : '测试外部接口（跨域）'}
      //     </Button>
      //     {corsTestMessage && (
      //       <Text
      //         type={
      //           corsTestMessage.startsWith('成功') ||
      //             corsTestMessage.startsWith('Success')
      //             ? 'success'
      //             : 'danger'
      //         }
      //       >
      //         {corsTestMessage}
      //       </Text>
      //     )}
      //   </Space>
      // }
    >
      <Tabs
        items={tabItems}
        activeKey={activeEcosystem}
        onChange={onTabChange}
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
              {(() => {
                const hasA =
                  activeMeta &&
                  Object.prototype.hasOwnProperty.call(
                    activeMeta,
                    '2024-2025组织代码贡献总量'
                  );
                const hasB =
                  activeMeta &&
                  Object.prototype.hasOwnProperty.call(
                    activeMeta,
                    '2025-2026组织代码贡献总量'
                  );
                const range = hasA ? '2024-2025' : hasB ? '2025-2026' : '';
                const title =
                  i18n.language === 'en'
                    ? `Organization Code Contribution Total${
                        range ? ` (${range})` : ''
                      }`
                    : `组织代码贡献总量${range ? `(${range})` : ''}`;
                const value = Number(
                  (hasA
                    ? (activeMeta as any)['2024-2025组织代码贡献总量']
                    : (activeMeta as any)?.['2025-2026组织代码贡献总量']) ?? 0
                );
                return renderStatisticCard(title, value, '#1890ff', (v) =>
                  v?.toLocaleString()
                );
              })()}
            </Col>
            <Col span={6}>
              {(() => {
                const hasA =
                  activeMeta &&
                  Object.prototype.hasOwnProperty.call(
                    activeMeta,
                    '2024-2025组织Issue贡献总量'
                  );
                const hasB =
                  activeMeta &&
                  Object.prototype.hasOwnProperty.call(
                    activeMeta,
                    '2025-2026组织Issue贡献总量'
                  );
                const range = hasA ? '2024-2025' : hasB ? '2025-2026' : '';
                const title =
                  i18n.language === 'en'
                    ? `Organization Issue Contribution Total${
                        range ? ` (${range})` : ''
                      }`
                    : `组织Issue贡献总量${range ? `(${range})` : ''}`;
                const value = Number(
                  (hasA
                    ? (activeMeta as any)['2024-2025组织Issue贡献总量']
                    : (activeMeta as any)?.['2025-2026组织Issue贡献总量']) ?? 0
                );
                return renderStatisticCard(title, value, '#52c41a', (v) =>
                  v?.toLocaleString()
                );
              })()}
            </Col>
            {organizationId.startsWith('org:') && (
              <>
                <Col span={6}>
                  {renderNetworkInfluenceCard(
                    i18n,
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
                    i18n,
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
            showTotal: (tot, range) =>
              getPaginationTotal(i18n, tot, range as [number, number]),
            onChange: (p, ps) => onPageChange(p, ps),
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

const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  ecosystem,
  organizationId,
}) => {
  const { t, i18n } = useTranslation('intelligent_analysis');
  const [requestedEcosystem, setRequestedEcosystem] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setRequestedEcosystem('');
    setCurrentPage(1);
  }, [ecosystem, organizationId]);

  const mappedEcosystem =
    PROJECT_NAME_MAP[ecosystem.toLowerCase()] || ecosystem;

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
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      const response = await fetch(
        'http://compute.lishengbao.com.cn:8801/developer_discovery/detail_list',
        {
          method: 'POST',
          headers: {
            'X-API-Key': 'opensearch', // 可改成你的真实值/从后端获取
            // 'Cookie': 'session=16c064d959d9f60faa680e00faa33f87', // 建议放到后端，不要在前端暴露
            // 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
            'Content-Type': 'application/json',
            Accept: '*/*',
            // 'Host': 'compute.lishengbao.com.cn:8801',
            // 'Connection': 'keep-alive'
          },
          body: JSON.stringify({
            ecosystem: mappedEcosystem,
            developer: organizationId,
            page: currentPage,
            page_size: pageSize,
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
          if (maybeMessage) message = maybeMessage;
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

      const dataByEcosystem =
        rawData?.data && typeof rawData.data === 'object' ? rawData.data : {};
      const ecosystems = Object.keys(dataByEcosystem);
      const pagination =
        rawData?.pagination && typeof rawData.pagination === 'object'
          ? rawData.pagination
          : {};

      return {
        ecosystems,
        dataByEcosystem,
        pagination,
      };
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  const ecosystems: string[] = Array.isArray(apiData?.ecosystems)
    ? apiData.ecosystems
    : [];
  const dataByEcosystem =
    apiData?.dataByEcosystem && typeof apiData.dataByEcosystem === 'object'
      ? (apiData.dataByEcosystem as Record<string, any>)
      : {};
  const activeEcosystem =
    requestedEcosystem && ecosystems.includes(requestedEcosystem)
      ? requestedEcosystem
      : ecosystems[0] || '';
  const activeMeta =
    activeEcosystem && dataByEcosystem[activeEcosystem]
      ? dataByEcosystem[activeEcosystem]
      : null;
  const tableRows: ParticipantTableRow[] = (() => {
    const list = activeMeta?.['人员参与项目清单'];
    const items: any[] = Array.isArray(list) ? list : [];
    return items.map((item, idx) => ({
      key: `${String(item?.['用户ID'] || '')}-${String(
        item?.['项目名称'] || ''
      )}-${idx}`,
      具体人员: String(item?.['用户ID'] || ''),
      贡献仓库: String(item?.['项目名称'] || ''),
      '2024年角色承担': String(item?.['2024年角色承担'] || ''),
      '2024年目标生态占个人总活跃量比值': Number(
        item?.['2024年目标生态占个人总活跃量比值'] ?? 0
      ),
      '2024年个人代码贡献量': Number(item?.['2024年个人代码贡献量'] ?? 0),
      '2024年个人Issue贡献量': Number(item?.['2024年个人Issue贡献量'] ?? 0),
      '2024年个人社区核心度': String(item?.['2024年个人社区核心度'] || ''),
      '2024年个人协作影响力': String(item?.['2024年个人协作影响力'] || ''),
      '2024年个人联通控制力': String(item?.['2024年个人联通控制力'] || ''),
      '2024年个人PageRank': String(item?.['2024年个人PageRank'] || ''),
      '2025年角色承担': String(item?.['2025年角色承担'] || ''),
      '2025年目标生态占个人总活跃量比值': Number(
        item?.['2025年目标生态占个人总活跃量比值'] ?? 0
      ),
      '2025年个人代码贡献量': Number(item?.['2025年个人代码贡献量'] ?? 0),
      '2025年个人Issue贡献量': Number(item?.['2025年个人Issue贡献量'] ?? 0),
      '2025年个人社区核心度': String(item?.['2025年个人社区核心度'] || ''),
      '2025年个人协作影响力': String(item?.['2025年个人协作影响力'] || ''),
      '2025年个人联通控制力': String(item?.['2025年个人联通控制力'] || ''),
      '2025年个人PageRank': String(item?.['2025年个人PageRank'] || ''),
    }));
  })();
  const total =
    typeof apiData?.pagination?.total === 'number'
      ? apiData.pagination.total
      : 0;

  const columns = buildColumns(t, i18n);

  return (
    <ParticipantMainContent
      t={t}
      i18n={i18n}
      ecosystems={ecosystems}
      activeEcosystem={activeEcosystem}
      onTabChange={(key) => {
        setRequestedEcosystem(key);
        setCurrentPage(1);
      }}
      activeMeta={activeMeta}
      organizationId={organizationId}
      columns={columns}
      tableRows={tableRows}
      currentPage={currentPage}
      pageSize={pageSize}
      total={total}
      onPageChange={(p, ps) => {
        setCurrentPage(p);
        setPageSize(ps);
      }}
      apiLoading={apiLoading}
      apiError={apiError}
    />
  );
};

export default ParticipantDetails;
