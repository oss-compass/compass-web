import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import BaseCard from '@common/components/BaseCard';
import MyTable from '@common/components/Table';
import type { ColumnsType } from 'antd/es/table';

interface ContributorTableProps {
  dashboardId: string;
  projects: readonly string[];
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

const ContributorTable: React.FC<ContributorTableProps> = ({
  dashboardId,
  projects,
}) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<string>(
    projects[0] || ''
  );

  const projectOptions = useMemo(() => {
    return projects.map((project) => ({
      value: project,
      label: project.replace(/^github:/, ''),
    }));
  }, [projects]);

  const tableData = useMemo(() => {
    if (!selectedProject) return [];
    return generateMockContributors(dashboardId, selectedProject);
  }, [dashboardId, selectedProject]);

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
      headRight={
        <Select
          value={selectedProject}
          onChange={setSelectedProject}
          options={projectOptions}
          style={{ minWidth: 200 }}
        />
      }
      bodyClass=""
    >
      <MyTable
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => t('analyze:total_people', { total }),
        }}
        scroll={{ x: 'max-content' }}
      />
    </BaseCard>
  );
};

export default ContributorTable;
