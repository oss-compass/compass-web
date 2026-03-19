// autocorrect: false
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Input, Button, Space, Tag, Tooltip, Select } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import MyTable from '@common/components/Table';
import { DeveloperData } from '../types';
import { translateByLocale, countryMapping } from './utils/countryMapping';
import { PROJECT_NAME_MAP } from '../utils';

interface DeveloperTableProps {
  projectType: string;
  data: DeveloperData[];
  loading: boolean;
  onViewDetail: (record: DeveloperData) => void;
  selectedRegions?: string[];
  onRegionFilterChange?: (regions: string[]) => void;
  initialDevRole?: 'all' | 'individual' | 'org';
  showTitle?: boolean;
}

const DeveloperTable: React.FC<DeveloperTableProps> = ({
  projectType,
  data,
  loading,
  onViewDetail,
  selectedRegions = [],
  onRegionFilterChange,
  initialDevRole = 'all',
  showTitle = true,
}) => {
  const normalizeUserId = (value: unknown) => {
    const raw = typeof value === 'string' ? value.trim() : '';
    return raw.replace(/^(github|gitcode|gitee|atomgit):/i, '');
  };

  const getPlatformFromUserId = (value: unknown) => {
    const raw = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (raw.startsWith('gitee:')) return 'gitee';
    if (raw.startsWith('gitcode:')) return 'atomgit';
    if (raw.startsWith('atomgit:')) return 'atomgit';
    return 'github';
  };

  const getUserHomepageUrl = (value: unknown) => {
    const raw = typeof value === 'string' ? value.trim() : '';
    const lower = raw.toLowerCase();
    if (lower.startsWith('github:')) {
      const username = raw.slice('github:'.length).trim();
      return username ? `https://github.com/${username}` : '';
    }
    if (lower.startsWith('gitcode:')) {
      const username = raw.slice('gitcode:'.length).trim();
      return username ? `https://gitcode.com/${username}` : '';
    }
    if (lower.startsWith('atomgit:')) {
      const username = raw.slice('atomgit:'.length).trim();
      return username ? `https://atomgit.com/${username}` : '';
    }
    return '';
  };

  const [searchKeyword, setSearchKeyword] = useState('');
  const [orgSearchKeyword, setOrgSearchKeyword] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const [appliedOrgKeyword, setAppliedOrgKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { t, i18n } = useTranslation('intelligent_analysis');
  const [devRoleFilter, setDevRoleFilter] = useState<
    'all' | 'individual' | 'org'
  >(initialDevRole);

  const dataset = PROJECT_NAME_MAP[projectType] || projectType;

  useEffect(() => {
    setCurrentPage(1);
  }, [dataset]);

  useEffect(() => {
    setDevRoleFilter(initialDevRole);
  }, [initialDevRole]);

  const { data: apiData, isFetching: apiLoading } = useQuery({
    queryKey: [
      'intelligent-analysis',
      'developers',
      dataset,
      currentPage,
      pageSize,
      appliedKeyword,
      appliedOrgKeyword,
      devRoleFilter,
      selectedRegions.join('|'),
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('pageSize', String(pageSize));
      params.set('sort', 'score_desc');
      if (appliedKeyword) params.set('q', appliedKeyword);
      if (appliedOrgKeyword) params.set('orgQ', appliedOrgKeyword);
      if (devRoleFilter !== 'all') params.set('role', devRoleFilter);
      if (selectedRegions.length > 0)
        params.set('regions', selectedRegions.join(','));

      const response = await fetch(
        `/api/intelligent-analysis/projects/${encodeURIComponent(
          dataset
        )}/developers?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch developers: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const rows: DeveloperData[] = Array.isArray(apiData?.items)
    ? apiData.items
    : [];
  const total = typeof apiData?.total === 'number' ? apiData.total : 0;
  const computedLoading = apiLoading || loading;

  // 获取所有可用的地区选项
  const availableRegions = useMemo(() => {
    const regions = Array.isArray(apiData?.availableRegions)
      ? apiData.availableRegions
      : Array.from(new Set(data.map((item) => item.国家).filter(Boolean)));
    return regions
      .map((region) => ({
        label: translateByLocale(region, countryMapping, i18n.language),
        value: region,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [apiData?.availableRegions, data, i18n.language]);

  const getAffiliatedOrg = (org?: string) => {
    const v = typeof org === 'string' ? org.trim() : '';
    return v || '未知';
  };
  const isIndividualDeveloper = (org?: string) =>
    getAffiliatedOrg(org) === '未知';

  // 处理搜索
  const handleSearch = () => {
    setAppliedKeyword(searchKeyword.trim());
    setAppliedOrgKeyword(orgSearchKeyword.trim());
    setCurrentPage(1);
  };

  // 处理分页变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // 开发者表格列定义
  const columns: ColumnsType<DeveloperData> = [
    {
      title: t('project_detail.rank'),
      dataIndex: '排名',
      key: '排名',
      width: 80,
      render: (rank: number, record: DeveloperData, index: number) => {
        // 使用当前页面的索引计算排名
        const currentRank = (currentPage - 1) * pageSize + index + 1;
        return <Tag color={'default'}>{rank || currentRank}</Tag>;
      },
    },
    {
      title: t('project_detail.developer_id'),
      dataIndex: '用户ID',
      key: '用户ID',
      width: 200,
      ellipsis: true,
      render: (text: string) => {
        const normalized = normalizeUserId(text);
        const platform = getPlatformFromUserId(text);
        return (
          <Tooltip title={normalized}>
            <a
              href={`/developer/${platform}/${encodeURIComponent(normalized)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 'bold' }}
            >
              {normalized}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: t('project_detail.total_score'),
      dataIndex: '总得分',
      key: '总得分',
      width: 100,
      sorter: (a, b) => a.总得分 - b.总得分,
      render: (score: number) => (
        <span
          style={{
            color: '#2563eb',
            fontWeight: 'bold',
          }}
        >
          {score.toFixed(2)}
        </span>
      ),
    },
    {
      title: t('project_detail.location'),
      key: '地理位置',
      width: 100,
      render: (_, record) =>
        translateByLocale(record.国家, countryMapping, i18n.language),
    },
    {
      title: '所属组织',
      dataIndex: '所属组织',
      key: '所属组织',
      width: 180,
      ellipsis: true,
      render: (val: string | undefined) => {
        const text = (val || '').trim();
        return (
          <Tooltip title={text || '未知'}>
            <span>{text || '未知'}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '邮箱',
      dataIndex: '邮箱',
      key: '邮箱',
      width: 220,
      ellipsis: true,
      render: (val: string | undefined, record: DeveloperData) => {
        const text = (val || '').trim();
        if (text === '未知') {
          const rawUserId = (record as any)?.用户ID;
          const url = getUserHomepageUrl(rawUserId);
          return url ? (
            <Tooltip title={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {url}
              </a>
            </Tooltip>
          ) : (
            <span>{text}</span>
          );
        }
        return text ? (
          <Tooltip title={text}>
            <span>{text}</span>
          </Tooltip>
        ) : (
          '-'
        );
      },
    },
    {
      title: '参与技术栈',
      dataIndex: '技术栈',
      key: '技术栈',
      width: 250,
      render: (val: string | string[]) => {
        if (Array.isArray(val)) {
          return val.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {val.map((tech, index) => (
                <Tag key={index} color="blue" className="mr-0">
                  {tech}
                </Tag>
              ))}
            </div>
          ) : (
            <Tag color="default">算子库</Tag>
          );
        }
        return <Tag color="blue">{val || '算子库'}</Tag>;
      },
    },
    // {
    //   title: '分类',
    //   dataIndex: '组织类型',
    //   key: '组织类型',
    //   width: 150,
    //   render: (text: string) => text || '-',
    // },
    // {
    //   title: '联系方式',
    //   dataIndex: '联系方式',
    //   key: '联系方式',
    //   width: 150,
    //   render: (text: string) => text || '-',
    // },
    {
      title: t('project_detail.actions'),
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => onViewDetail(record)}
        >
          {t('project_detail.view_details')}
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={
        showTitle ? t('project_detail.developer_contribution_details') : null
      }
      className="mb-6"
    >
      {/* 搜索区域 */}
      <div className="mb-6">
        <Space wrap size="middle">
          <div className="flex items-center space-x-2">
            <Input
              placeholder={t('project_detail.search_developer')}
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onPressEnter={handleSearch}
              allowClear
            />
            <Button type="primary" onClick={handleSearch}>
              {t('project_detail.search')}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="搜索所属组织"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              value={orgSearchKeyword}
              onChange={(e) => setOrgSearchKeyword(e.target.value)}
              onPressEnter={handleSearch}
              allowClear
            />
            <Button type="primary" onClick={handleSearch}>
              {t('project_detail.search')}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {t('project_detail.filter_by_region')}:
            </span>
            <Select
              mode="multiple"
              placeholder={t('project_detail.select_regions')}
              style={{ minWidth: 200 }}
              value={selectedRegions}
              onChange={onRegionFilterChange}
              options={availableRegions}
              allowClear
              maxTagCount="responsive"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">开发者类型:</span>
            <Select
              style={{ width: 160 }}
              value={devRoleFilter}
              onChange={(v) =>
                setDevRoleFilter(v as 'all' | 'individual' | 'org')
              }
              options={[
                { label: '全部', value: 'all' },
                { label: '个人开发者', value: 'individual' },
                { label: '组织开发者', value: 'org' },
              ]}
            />
          </div>
        </Space>
      </div>

      {/* 开发者表格 */}
      <div className="flex h-[760px] flex-col">
        <div className="min-h-0 flex-1">
          <MyTable
            columns={columns}
            dataSource={rows}
            loading={computedLoading}
            rowKey="用户ID"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total,
              showSizeChanger: false,
              showQuickJumper: true,
              showTotal: (total, range) =>
                t('project_detail.pagination_total', {
                  start: range[0],
                  end: range[1],
                  total,
                }),
              onChange: handlePageChange,
            }}
            scroll={{ x: 'max-content', y: 660 }}
            className="h-full [&_.ant-pagination]:flex-shrink-0 [&_.ant-pagination]:py-2 [&_.ant-spin-container]:flex [&_.ant-spin-container]:h-full [&_.ant-spin-container]:flex-col [&_.ant-spin-nested-loading]:h-full [&_.ant-table-body]:min-h-0 [&_.ant-table-body]:flex-1 [&_.ant-table-container]:min-h-0 [&_.ant-table-container]:flex-1 [&_.ant-table-thead_th]:whitespace-nowrap [&_.ant-table-wrapper]:min-h-0 [&_.ant-table-wrapper]:flex-1 [&_.ant-table]:flex [&_.ant-table]:h-full [&_.ant-table]:flex-col"
          />
        </div>
      </div>
    </Card>
  );
};

export default DeveloperTable;
