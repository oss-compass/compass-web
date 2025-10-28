// autocorrect: false
import React, { useState, useMemo } from 'react';
import { Card, Input, Button, Space, Tag, Tooltip, Select } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import type { ColumnsType } from 'antd/es/table';
import MyTable from '@common/components/Table';
import { DeveloperData } from '../types';
import { translateByLocale, countryMapping } from './utils/countryMapping';

interface DeveloperTableProps {
  data: DeveloperData[];
  loading: boolean;
  onViewDetail: (record: DeveloperData) => void;
  selectedRegions?: string[];
  onRegionFilterChange?: (regions: string[]) => void;
}

const DeveloperTable: React.FC<DeveloperTableProps> = ({
  data,
  loading,
  onViewDetail,
  selectedRegions = [],
  onRegionFilterChange,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { t, i18n } = useTranslation('intelligent_analysis');

  // 获取所有可用的地区选项
  const availableRegions = useMemo(() => {
    const regions = Array.from(new Set(data.map(item => item.国家).filter(Boolean)));
    return regions.map(region => ({
      label: translateByLocale(region, countryMapping, i18n.language),
      value: region,
    })).sort((a, b) => a.label.localeCompare(b.label));
  }, [data, i18n.language]);

  // 过滤数据
  const filteredData = useMemo(() => {
    if (!searchKeyword.trim()) {
      return data;
    }
    const keyword = searchKeyword.trim().toLowerCase();
    return data.filter((item) => item.用户ID.toLowerCase().includes(keyword));
  }, [data, searchKeyword]);

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
        return (
          <Tag color={'default'}>
            {currentRank}
          </Tag>
        );
      },
    },
    {
      title: t('project_detail.developer_id'),
      dataIndex: '用户ID',
      key: '用户ID',
      width: 200,
      ellipsis: true,
      render: (text: string) => {
        const normalized = typeof text === 'string' ? text.replace(/^github:/i, '') : text;
        return (
          <Tooltip title={normalized}>
            <a
              href={`/developer/${encodeURIComponent(normalized)}`}
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
      title={t('project_detail.developer_contribution_details')}
      className="mb-6"
    >
      {/* 搜索区域 */}
      <div className="mb-6">
        <Space wrap size="middle">
          <div className="flex items-center space-x-2">
            <Input
              placeholder={t('project_detail.search_developer')}
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
            <span className="text-sm text-gray-600">{t('project_detail.filter_by_region')}:</span>
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
        </Space>
      </div>

      {/* 开发者表格 */}
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

export default DeveloperTable;
