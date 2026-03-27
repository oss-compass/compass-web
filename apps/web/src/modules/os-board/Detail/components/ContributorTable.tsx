import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { IoPeopleCircle, IoPersonCircle } from 'react-icons/io5';
import { SiGitee, SiGithub } from 'react-icons/si';
import Image from 'next/image';
import BaseCard from '@common/components/BaseCard';
import MyTable from '@common/components/Table';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import useOsBoardDateRange from '../../hooks/useOsBoardDateRange';
import {
  useOsBoardContributorsDetailList,
  useOsBoardContributorsOverview,
  ContributorDetail,
  FilterOptionInput,
  SortOptionInput,
} from '../../api/tableData';
import DomainPersona from '@modules/analyze/DataView/MetricDetail/MetricContributor/ContributorTable/DomainPersona';

interface ContributorTableProps {
  dashboardId: string;
  dashboardType?: 'repo' | 'community';
  projects: readonly string[];
  competitorProjects?: readonly string[];
}

interface TableParams {
  pagination?: TablePaginationConfig;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
}

const ECOLOGICAL_TYPES = [
  {
    value: 'organization manager',
    label: 'analyze:metric_detail:organization_manager',
  },
  {
    value: 'organization participant',
    label: 'analyze:metric_detail:organization_participant',
  },
  {
    value: 'individual manager',
    label: 'analyze:metric_detail:individual_manager',
  },
  {
    value: 'individual participant',
    label: 'analyze:metric_detail:individual_participant',
  },
];

const MILEAGE_TYPES = [
  { value: 'core', label: 'analyze:metric_detail:core' },
  { value: 'regular', label: 'analyze:metric_detail:regular' },
  { value: 'guest', label: 'analyze:metric_detail:guest' },
];

// 将 API 返回的下划线命名数据转换为 DomainPersona 组件期望的驼峰命名格式
const convertToDomainPersonaData = (
  dataList:
    | { contribution_type: string; contribution: number }[]
    | null
    | undefined
) => {
  if (!dataList) return [];
  return dataList.map((item) => ({
    contributionType: item.contribution_type,
    contribution: item.contribution,
  }));
};

// 计算最大贡献值（用于 DomainPersona 组件的 maxDomain）
const getMaxContribution = (
  dataList:
    | { contribution_type: string; contribution: number }[]
    | null
    | undefined
): number => {
  if (!dataList || dataList.length === 0) return 0;
  return dataList.reduce((sum, item) => sum + item.contribution, 0);
};

// 获取平台图标
const getIcons = (type: string) => {
  if (!type) {
    return <IoPeopleCircle />;
  }
  switch (type) {
    case 'github':
      return <SiGithub color="#171516" />;
    case 'gitee':
      return <SiGitee color="#c71c27" className="mr-0" />;
    case 'gitcode':
      return (
        <Image
          src="/images/logos/gitcode.png"
          alt="gitcode"
          width={16}
          height={16}
        />
      );
    default:
      return <IoPeopleCircle />;
  }
};

// 获取 Top 用户显示
const getTopUser = (type: string, name: string) => {
  let url: string | null = null;
  let userIcon = null;
  if (!name) {
    userIcon = <IoPersonCircle />;
  } else {
    switch (type) {
      case 'github':
        url = 'https://github.com/' + name;
        userIcon = (
          <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full border border-gray-100 p-0">
            <Image
              src={'https://github.com/' + name + '.png'}
              onError={(e) => (e.currentTarget.src = '/images/github.png')}
              unoptimized
              fill={true}
              style={{ objectFit: 'cover' }}
              alt="icon"
              placeholder="blur"
              blurDataURL="/images/github.png"
            />
          </div>
        );
        break;
      case 'gitee':
        url = 'https://gitee.com/' + name;
        userIcon = (
          <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full border border-gray-100">
            <Image
              src={'https://gitee.com/' + name + '.png'}
              onError={(e) =>
                (e.currentTarget.src = '/images/logos/gitee-red.svg')
              }
              unoptimized
              fill={true}
              alt="icon"
              placeholder="blur"
              blurDataURL="/images/logos/gitee-red.svg"
            />
          </div>
        );
        break;
      case 'gitcode':
        url = 'https://gitcode.com/' + name;
        userIcon = (
          <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full border border-gray-100">
            <Image
              src={'https://gitcode.com/' + name + '.png'}
              onError={(e) =>
                (e.currentTarget.src = '/images/logos/gitcode.png')
              }
              unoptimized
              fill={true}
              alt="icon"
              placeholder="blur"
              blurDataURL="/images/logos/gitcode.png"
            />
          </div>
        );
        break;
      default:
        userIcon = <IoPersonCircle />;
        break;
    }
  }

  return (
    <>
      <div className="mr-2 text-[#ccc]">{userIcon}</div>
      <div className="line-clamp-1">
        {url ? (
          <a
            className="whitespace-nowrap hover:text-[black] hover:underline"
            href={url}
            target="_blank"
            rel={'noreferrer'}
          >
            {name}
          </a>
        ) : (
          name || '/'
        )}
      </div>
    </>
  );
};

// 获取项目平台类型
const getProjectPlatform = (project: string) => {
  if (project.includes('gitee')) return 'gitee';
  if (project.includes('gitcode')) return 'gitcode';
  return 'github';
};

// 获取项目显示名称
const getProjectDisplayName = (project: string) => {
  return project.replace(
    /^(github:|https?:\/\/(github|gitee|gitcode)\.com\/)/,
    ''
  );
};

const ContributorTable: React.FC<ContributorTableProps> = ({
  dashboardId,
  dashboardType = 'repo',
  projects,
  competitorProjects = [],
}) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0] || ''
  );
  const { timeStart, timeEnd } = useOsBoardDateRange();

  // 表格参数状态
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      position: ['bottomCenter'],
      showTotal: (total) => t('analyze:total_people', { total }),
    },
    filterOpts: [],
    sortOpts: {
      type: 'contribution',
      direction: 'desc',
    },
  });

  // 调用贡献者列表 API (使用 REST API)
  const {
    data: contributorsDetailData,
    isLoading,
    isFetching,
  } = useOsBoardContributorsDetailList({
    project: selectedProject,
    dashboardType,
    page: tableParams.pagination?.current,
    per: tableParams.pagination?.pageSize,
    filterOpts: tableParams.filterOpts,
    sortOpts: tableParams.sortOpts,
    enabled: !!selectedProject,
  });

  // 使用 REST API 获取贡献者概览统计数据
  const { data: contributorsOverview, isLoading: statsLoading } =
    useOsBoardContributorsOverview({
      project: selectedProject,
      level: dashboardType,
      enabled: !!selectedProject,
    });

  // 同步 API 返回的分页总数到 tableParams
  React.useEffect(() => {
    if (contributorsDetailData) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: contributorsDetailData.count,
        },
      }));
    }
  }, [contributorsDetailData]);

  // origin 从统计数据中获取 (取第一个 top_contributor 的 origin)
  const origin = contributorsOverview?.top_contributors?.[0]?.origin || '';

  // 统计卡片数据 (使用 API 实际返回的字段名)
  const statsData = {
    contributorAllCount: contributorsOverview?.contributors_count,
    orgAllCount: contributorsOverview?.organizations_count,
    highestContributionContributor: contributorsOverview?.top_contributors?.[0],
    highestContributionOrganization:
      contributorsOverview?.top_organizations?.[0],
  };

  // 表格数据
  const displayTableData = contributorsDetailData?.items || [];

  // 处理表格变更
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<ContributorDetail>
  ) => {
    const sortOpts: SortOptionInput | undefined = sorter.order
      ? {
          type: sorter.field as string,
          direction: sorter.order === 'ascend' ? 'asc' : 'desc',
        }
      : undefined;

    setTableParams({
      pagination: {
        ...tableParams.pagination,
        ...pagination,
      },
      sortOpts,
      filterOpts: tableParams.filterOpts,
    });
  };

  // 项目 Tab 配置
  const tabItems = useMemo(() => {
    const mainItems = projects.map((project) => {
      const platform = getProjectPlatform(project);
      const displayName = getProjectDisplayName(project);
      return {
        key: project,
        label: (
          <div className="flex items-center gap-1.5">
            {platform === 'github' && <SiGithub color="#171516" size={14} />}
            {platform === 'gitee' && <SiGitee color="#c71c27" size={14} />}
            {platform === 'gitcode' && (
              <Image
                src="/images/logos/gitcode.png"
                alt="gitcode"
                width={14}
                height={14}
              />
            )}
            <span>{displayName}</span>
          </div>
        ),
      };
    });

    const competitorItems = competitorProjects.map((project) => {
      const platform = getProjectPlatform(project);
      const displayName = getProjectDisplayName(project);
      return {
        key: project,
        label: (
          <div className="flex items-center gap-1.5">
            {platform === 'github' && <SiGithub color="#171516" size={14} />}
            {platform === 'gitee' && <SiGitee color="#c71c27" size={14} />}
            {platform === 'gitcode' && (
              <Image
                src="/images/logos/gitcode.png"
                alt="gitcode"
                width={14}
                height={14}
              />
            )}
            <span>{displayName}</span>
            <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-600">
              {t('os_board:detail.competitors')}
            </span>
          </div>
        ),
      };
    });

    return [...mainItems, ...competitorItems];
  }, [projects, competitorProjects, t]);

  // 渲染领域画像（使用复用的 DomainPersona 组件）
  const renderDomainPersona = (
    dataList:
      | { contribution_type: string; contribution: number }[]
      | null
      | undefined,
    record: ContributorDetail
  ) => {
    if (!dataList || dataList.length === 0) return '-';
    const convertedData = convertToDomainPersonaData(dataList);
    const maxDomain = getMaxContribution(dataList);
    return (
      <DomainPersona
        maxDomain={maxDomain}
        dataList={convertedData}
        name={record.contributor || ''}
        origin={origin}
      />
    );
  };

  const columns: ColumnsType<ContributorDetail> = [
    {
      title: t('analyze:metric_detail:contributor'),
      dataIndex: 'contributor',
      align: 'left',
      width: 180,
      fixed: 'left',
      render: (name: string) => {
        const platform = getProjectPlatform(selectedProject);
        const url =
          platform === 'github'
            ? `https://github.com/${name}`
            : platform === 'gitee'
            ? `https://gitee.com/${name}`
            : `https://gitcode.com/${name}`;
        return (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
          >
            {name}
          </a>
        );
      },
    },
    {
      title: t('analyze:metric_detail:role_persona'),
      dataIndex: 'ecological_type',
      align: 'left',
      width: 150,
      render: (val: string) => {
        const item = ECOLOGICAL_TYPES.find((e) => e.value === val);
        return item ? t(item.label) : val || '-';
      },
    },
    {
      title: t('analyze:metric_detail:milestone_persona'),
      dataIndex: 'mileage_type',
      align: 'left',
      width: 120,
      render: (val: string) => {
        const item = MILEAGE_TYPES.find((m) => m.value === val);
        return item ? t(item.label) : val || '-';
      },
    },
    {
      title: t('analyze:metric_detail:domain_persona'),
      dataIndex: 'contribution_type_list',
      align: 'left',
      width: 200,
      render: (dataList, record) => renderDomainPersona(dataList, record),
    },
    {
      title: t('analyze:metric_detail:organization'),
      dataIndex: 'organization',
      align: 'left',
      width: 140,
      render: (val: string) => val || '-',
    },
    {
      title: t('analyze:metric_detail:contribution'),
      dataIndex: 'contribution',
      align: 'right',
      width: 100,
      sorter: true,
    },
  ];

  return (
    <BaseCard
      id="contributor_table"
      title={String(t('metrics_models_v2:model_999.metrics.metric_062.title'))}
      bodyClass=""
      className="!p-4 [&_h3]:!mb-1"
    >
      {/* 项目切换 Tabs */}
      <Tabs
        activeKey={selectedProject}
        onChange={setSelectedProject}
        items={tabItems}
        className="mb-2 [&_.ant-tabs-nav]:mb-0"
      />

      {/* 贡献者统计卡片 */}
      <div className="mb-3 grid grid-cols-4 gap-3 md:grid-cols-2">
        {/* 贡献者数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <IoPersonCircle />
            </div>
            <div className="line-clamp-1">
              {statsData?.contributorAllCount ?? '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('os_board:detail.contributor_count')}
          </div>
        </div>

        {/* Top 贡献者 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            {statsData?.highestContributionContributor?.name ? (
              getTopUser(
                statsData.highestContributionContributor.origin || '',
                statsData.highestContributionContributor.name || ''
              )
            ) : (
              <>
                <div className="mr-2 text-[#3A5BEF]">
                  <IoPersonCircle />
                </div>
                <div className="line-clamp-1">-</div>
              </>
            )}
          </div>
          <div className="text-xs text-[#585858]">
            {t('os_board:detail.top_contributor')}
          </div>
        </div>

        {/* 贡献组织数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <IoPeopleCircle />
            </div>
            <div className="line-clamp-1">{statsData?.orgAllCount ?? '-'}</div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('os_board:detail.org_count')}
          </div>
        </div>

        {/* Top 贡献组织 */}
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center text-lg font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              {getIcons(
                statsData?.highestContributionOrganization?.origin || ''
              )}
            </div>
            <div className="line-clamp-1">
              {statsData?.highestContributionOrganization?.name || '-'}
            </div>
          </div>
          <div className="text-xs text-[#585858]">
            {t('os_board:detail.top_contributing_org')}
          </div>
        </div>
      </div>

      {/* 贡献者表格 */}
      <div className="flex h-[420px] flex-col">
        <div className="min-h-0 flex-1">
          <MyTable
            columns={columns}
            dataSource={displayTableData}
            rowKey="contributor"
            loading={isLoading || isFetching || statsLoading}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
            scroll={{ x: 'max-content', y: 320 }}
            className="h-full [&_.ant-pagination]:flex-shrink-0 [&_.ant-pagination]:py-2 [&_.ant-spin-container]:flex [&_.ant-spin-container]:h-full [&_.ant-spin-container]:flex-col [&_.ant-spin-nested-loading]:h-full [&_.ant-table-body]:min-h-0 [&_.ant-table-body]:flex-1 [&_.ant-table-container]:min-h-0 [&_.ant-table-container]:flex-1 [&_.ant-table-thead_th]:whitespace-nowrap [&_.ant-table-wrapper]:min-h-0 [&_.ant-table-wrapper]:flex-1 [&_.ant-table]:flex [&_.ant-table]:h-full [&_.ant-table]:flex-col"
          />
        </div>
      </div>
    </BaseCard>
  );
};

export default ContributorTable;
