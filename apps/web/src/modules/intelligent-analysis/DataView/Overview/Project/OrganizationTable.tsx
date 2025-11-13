// autocorrect: false
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Input, Button, Space, Tag, Tooltip, Select } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import type { ColumnsType } from 'antd/es/table';
import MyTable from '@common/components/Table';
import { DeveloperData } from '../types';
import { translateByLocale, countryMapping } from './utils/countryMapping';
import { getDisplayUserId } from './utils/getDisplayUserId';

interface OrganizationTableProps {
  data: DeveloperData[];
  loading: boolean;
  onViewDetail: (record: DeveloperData) => void;
  selectedRegions?: string[];
  onRegionFilterChange?: (regions: string[]) => void;
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({
  data,
  loading,
  onViewDetail,
  selectedRegions = [],
  onRegionFilterChange,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrgTypes, setSelectedOrgTypes] = useState<string[]>([]);
  const pageSize = 10;
  const { t, i18n } = useTranslation('intelligent_analysis');

  // 获取所有可用的地区选项
  const availableRegions = useMemo(() => {
    const regions = Array.from(
      new Set(data.map((item) => item.国家).filter(Boolean))
    );
    return regions
      .map((region) => ({
        label: translateByLocale(region, countryMapping, i18n.language),
        value: region,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data, i18n.language]);

  const orgTypeOptions = useMemo(
    () => [
      { label: '高校及研究机构', value: '高校及研究机构' },
      { label: '企业', value: '企业' },
      { label: '其他', value: '其他' },
    ],
    []
  );

  // 过滤数据
  const filteredData = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    const hasKeyword = keyword.length > 0;
    const hasRegionFilter =
      Array.isArray(selectedRegions) && selectedRegions.length > 0;
    const hasOrgTypeFilter =
      Array.isArray(selectedOrgTypes) && selectedOrgTypes.length > 0;

    return data.filter((item) => {
      const rawId = item.用户ID || '';
      const normalizedId =
        typeof rawId === 'string' && rawId.startsWith('org:')
          ? rawId.slice(4)
          : rawId;
      const chineseId = item.中文用户ID || '';
      const matchKeyword = !hasKeyword
        ? true
        : normalizedId.toLowerCase().includes(keyword) ||
          chineseId.toLowerCase().includes(keyword);

      const matchRegion = !hasRegionFilter
        ? true
        : selectedRegions.includes(item.国家);

      const orgType = item.组织类型 || '';
      const matchOrgType = !hasOrgTypeFilter
        ? true
        : selectedOrgTypes.includes(orgType);

      return matchKeyword && matchRegion && matchOrgType;
    });
  }, [data, searchKeyword, selectedRegions, selectedOrgTypes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, selectedRegions, selectedOrgTypes]);

  // 当地区不包含中国时，清空已选组织类型
  useEffect(() => {
    if (!selectedRegions.includes('中国')) {
      setSelectedOrgTypes([]);
    }
  }, [selectedRegions]);

  // 分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  // 处理搜索
  const handleSearch = () => {
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
        // 使用当前页面的索引计算排名
        const currentRank = (currentPage - 1) * pageSize + index + 1;
        return <Tag color={'default'}>{currentRank}</Tag>;
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
    ...(showOrgTypeCol
      ? [
          {
            title: '组织类型',
            dataIndex: '组织类型' as const,
            key: '组织类型',
            width: 120,
            ellipsis: true,
            render: (text: string) => (text && text.trim() ? text : '-'),
          },
        ]
      : []),
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
      width: 150,
      render: (_, record) =>
        translateByLocale(record.国家, countryMapping, i18n.language),
    },
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
      <MyTable
        columns={columns}
        dataSource={paginatedData}
        loading={loading}
        rowKey="用户ID"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
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
      />
    </Card>
  );
};

export default OrganizationTable;
