import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { IoPeopleCircle, IoPersonCircle } from 'react-icons/io5';
import { SiGitee, SiGithub } from 'react-icons/si';
import Image from 'next/image';
import BaseCard from '@common/components/BaseCard';
import MyTable from '@common/components/Table';
import type { ColumnsType } from 'antd/es/table';

interface ContributorTableProps {
  dashboardId: string;
  projects: readonly string[];
  competitorProjects?: readonly string[];
}

interface DomainItem {
  type: string;
  contribution: number;
  color: string;
}

interface ContributorRecord {
  id: string;
  contributor: string;
  ecologicalType: string;
  mileageType: string;
  domainPersona: DomainItem[];
  organization: string;
  contribution: number;
}

// 确定性哈希函数
const hashSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

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

const DOMAIN_TYPES = [
  { type: 'Code', color: '#4A90E2' },
  { type: 'Code Admin', color: '#9ECDF2' },
  { type: 'Issue', color: '#EAB308' },
  { type: 'Issue Admin', color: '#FDE047' },
  { type: 'Observe', color: '#D1D5DB' },
];

const ORGANIZATIONS = [
  'Huawei',
  'Alibaba',
  'Tencent',
  'ByteDance',
  'Baidu',
  'Microsoft',
  'Google',
  'Amazon',
  'Meta',
  'Independent',
];

// 生成 mock 贡献者数据
const generateMockContributors = (
  dashboardId: string,
  project: string
): ContributorRecord[] => {
  const seed = hashSeed(`${dashboardId}-${project}-contributors`);
  const names = [
    'zhang_wei',
    'li_ming',
    'wang_fang',
    'chen_jie',
    'liu_yang',
    'huang_lei',
    'zhou_jun',
    'wu_xia',
    'sun_qiang',
    'zhao_li',
    'dev_john',
    'code_master',
    'open_src',
    'git_ninja',
    'pr_hero',
  ];

  const count = 5 + (seed % 6);
  const contributors: ContributorRecord[] = [];

  for (let i = 0; i < count; i++) {
    const nameSeed = (seed + i * 17) % names.length;
    const ecoSeed = (seed + i * 13) % ECOLOGICAL_TYPES.length;
    const mileSeed = (seed + i * 19) % MILEAGE_TYPES.length;
    const orgSeed = (seed + i * 23) % ORGANIZATIONS.length;
    const contribution = 50 + ((seed + i * 31) % 500);

    // 生成领域画像数据
    const domainPersona: DomainItem[] = DOMAIN_TYPES.map((d, idx) => ({
      type: d.type,
      contribution: 10 + ((seed + i * 7 + idx * 11) % 100),
      color: d.color,
    }));

    contributors.push({
      id: `${project}-${i}`,
      contributor: names[nameSeed] + (i > 0 ? `_${i}` : ''),
      ecologicalType: ECOLOGICAL_TYPES[ecoSeed].value,
      mileageType: MILEAGE_TYPES[mileSeed].value,
      domainPersona,
      organization: ORGANIZATIONS[orgSeed],
      contribution,
    });
  }

  return contributors.sort((a, b) => b.contribution - a.contribution);
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

const ContributorTable: React.FC<ContributorTableProps> = ({
  dashboardId,
  projects,
  competitorProjects = [],
}) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0] || ''
  );

  const tableData = useMemo(() => {
    if (!selectedProject) return [];
    return generateMockContributors(dashboardId, selectedProject);
  }, [dashboardId, selectedProject]);

  // 根据选中的项目生成测试统计数据
  const statsData = useMemo(() => {
    if (!selectedProject) return null;
    const seed = hashSeed(`${dashboardId}-${selectedProject}-stats`);
    const platform = selectedProject.includes('gitee')
      ? 'gitee'
      : selectedProject.includes('gitcode')
      ? 'gitcode'
      : 'github';
    const topContributorName =
      tableData[0]?.contributor || selectedProject.split('/').pop() || 'test';

    return {
      contributorAllCount: 80 + (seed % 100),
      orgAllCount: 5 + (seed % 20),
      highestContributionContributor: {
        name: topContributorName,
        origin: platform,
      },
      highestContributionOrganization: {
        name: tableData[0]?.organization || 'OSS Compass',
        origin: platform,
      },
    };
  }, [dashboardId, selectedProject, tableData]);

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

  const columns: ColumnsType<ContributorRecord> = [
    {
      title: t('analyze:metric_detail:contributor'),
      dataIndex: 'contributor',
      align: 'left',
      width: 180,
      fixed: 'left',
      render: (name: string) => (
        <span className="font-medium text-gray-900">{name}</span>
      ),
    },
    {
      title: t('analyze:metric_detail:role_persona'),
      dataIndex: 'ecologicalType',
      align: 'left',
      width: 120,
      render: (val: string) => {
        const item = ECOLOGICAL_TYPES.find((e) => e.value === val);
        return item ? t(item.label) : val;
      },
    },
    {
      title: t('analyze:metric_detail:milestone_persona'),
      dataIndex: 'mileageType',
      align: 'left',
      width: 120,
      render: (val: string) => {
        const item = MILEAGE_TYPES.find((m) => m.value === val);
        return item ? t(item.label) : val;
      },
    },
    {
      title: t('analyze:metric_detail:domain_persona'),
      dataIndex: 'domainPersona',
      align: 'left',
      width: 200,
      render: (list: DomainItem[]) => {
        const total = list.reduce((sum, d) => sum + d.contribution, 0);
        return (
          <div className="flex h-2 w-full">
            {list.map((d) => (
              <div
                key={d.type}
                style={{
                  width: `${(d.contribution / total) * 100}%`,
                  backgroundColor: d.color,
                }}
                title={`${d.type}: ${d.contribution}`}
              />
            ))}
          </div>
        );
      },
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
      sorter: (a, b) => a.contribution - b.contribution,
    },
  ];

  return (
    <BaseCard
      id="contributor_table"
      title={String(t('os_board:detail.contributor_table'))}
      bodyClass=""
    >
      {/* 项目切换 Tabs */}
      <Tabs
        activeKey={selectedProject}
        onChange={setSelectedProject}
        items={tabItems}
        className="mb-4 [&_.ant-tabs-nav]:mb-0"
      />

      {/* 贡献者统计卡片 */}
      <div className="mb-4 grid grid-cols-4 gap-4 md:grid-cols-2">
        {/* 贡献者数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center text-xl font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <IoPersonCircle />
            </div>
            <div className="line-clamp-1">
              {statsData?.contributorAllCount || '-'}
            </div>
          </div>
          <div className="mt-1 text-sm text-[#585858]">
            {t('os_board:detail.contributor_count')}
          </div>
        </div>

        {/* Top 贡献者 */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center text-xl font-medium">
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
          <div className="mt-1 text-sm text-[#585858]">
            {t('os_board:detail.top_contributor')}
          </div>
        </div>

        {/* 贡献组织数量 */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center text-xl font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              <IoPeopleCircle />
            </div>
            <div className="line-clamp-1">{statsData?.orgAllCount || '-'}</div>
          </div>
          <div className="mt-1 text-sm text-[#585858]">
            {t('os_board:detail.org_count')}
          </div>
        </div>

        {/* Top 贡献组织 */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center text-xl font-medium">
            <div className="mr-2 text-[#3A5BEF]">
              {getIcons(
                statsData?.highestContributionOrganization?.origin || ''
              )}
            </div>
            <div className="line-clamp-1">
              {statsData?.highestContributionOrganization?.name || '-'}
            </div>
          </div>
          <div className="mt-1 text-sm text-[#585858]">
            {t('os_board:detail.top_contributing_org')}
          </div>
        </div>
      </div>

      <div className="h-[540px]">
        <MyTable
          columns={columns}
          dataSource={tableData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => t('analyze:total_people', { total }),
          }}
          scroll={{ x: 'max-content', y: 500 }}
        />
      </div>
    </BaseCard>
  );
};

export default ContributorTable;
