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
import { getDisplayUserId } from './utils/getDisplayUserId';
import { classifyOrganization } from './utils/orgClassifier';
import { PROJECT_NAME_MAP } from '../utils';

interface OrganizationTableProps {
  projectType: string;
  data: DeveloperData[];
  loading: boolean;
  onViewDetail: (record: DeveloperData) => void;
  selectedRegions?: string[];
  onRegionFilterChange?: (regions: string[]) => void;
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({
  projectType,
  data,
  loading,
  onViewDetail,
  selectedRegions = [],
  onRegionFilterChange,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrgTypes, setSelectedOrgTypes] = useState<string[]>([]);
  const pageSize = 10;
  const { t, i18n } = useTranslation('intelligent_analysis');

  const dataset = PROJECT_NAME_MAP[projectType] || projectType;

  useEffect(() => {
    setCurrentPage(1);
  }, [dataset]);

  const { data: apiData, isFetching: apiLoading } = useQuery({
    queryKey: [
      'intelligent-analysis',
      'organizations',
      dataset,
      currentPage,
      pageSize,
      appliedKeyword,
      selectedRegions.join('|'),
      selectedOrgTypes.join('|'),
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('pageSize', String(pageSize));
      params.set('sort', 'score_desc');
      if (appliedKeyword) params.set('q', appliedKeyword);
      if (selectedRegions.length > 0)
        params.set('regions', selectedRegions.join(','));
      if (selectedOrgTypes.length > 0)
        params.set('orgTypes', selectedOrgTypes.join(','));

      const response = await fetch(
        `/api/intelligent-analysis/projects/${encodeURIComponent(
          dataset
        )}/organizations?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch organizations: ${response.status}`);
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

  const orgTypeOptions = useMemo(
    () => [
      { label: '高校及研究机构', value: '高校及研究机构' },
      { label: '商业公司', value: '商业公司' },
    ],
    []
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [appliedKeyword, selectedRegions, selectedOrgTypes]);

  // 当地区不包含中国时，清空已选组织类型
  useEffect(() => {
    if (!selectedRegions.includes('中国')) {
      setSelectedOrgTypes([]);
    }
  }, [selectedRegions]);

  // 处理搜索
  const handleSearch = () => {
    setAppliedKeyword(searchKeyword.trim());
    setCurrentPage(1);
  };

  // 处理分页变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // 仅当地区过滤包含“中国”时才显示组织类型列
  const showOrgTypeCol = selectedRegions.includes('中国');

  // 组织表格列定义
  const columns: ColumnsType<DeveloperData> = [
    {
      title: t('project_detail.rank'),
      dataIndex: '排名',
      key: '排名',
      width: 80,
      render: (rank: number, record: DeveloperData, index: number) => {
        const currentRank = (currentPage - 1) * pageSize + index + 1;
        return <Tag color={'default'}>{rank || currentRank}</Tag>;
      },
    },
    {
      title: t('project_detail.organization_id'),
      dataIndex: '用户ID',
      key: '用户ID',
      width: 200,
      ellipsis: true,
      render: (text: string, record) => {
        const displayText = getDisplayUserId(record);
        return (
          <Tooltip title={displayText}>
            <span style={{ fontWeight: 'bold' }}>{displayText}</span>
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
    {
      title: '分类',
      dataIndex: '用户ID',
      key: '组织类型',
      width: 150,
      render: (text: string) => classifyOrganization(text),
    },
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
      title={t('project_detail.organization_contribution_details')}
      className="mb-6"
    >
      {/* 搜索区域 */}
      <div className="mb-6">
        <Space wrap size="middle">
          <div className="flex items-center space-x-2">
            <Input
              placeholder={t('project_detail.search_organization')}
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onPressEnter={handleSearch}
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
          {showOrgTypeCol && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">组织类型:</span>
              <Select
                mode="multiple"
                placeholder={'选择组织类型'}
                style={{ minWidth: 200 }}
                value={selectedOrgTypes}
                onChange={setSelectedOrgTypes}
                options={orgTypeOptions}
                allowClear
                maxTagCount="responsive"
              />
            </div>
          )}
        </Space>
      </div>

      {/* 组织表格 */}
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

export default OrganizationTable;
