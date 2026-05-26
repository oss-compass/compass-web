import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import type { ColumnsType } from 'antd/es/table';

import {
  countryMapping,
  translateByLocale,
} from '@modules/intelligent-analysis/DataView/Overview/Project/utils/countryMapping';

import LeaderboardPieChart from './LeaderboardPieChart';
import type {
  RustLeaderboardResponse,
  RustLeaderboardType,
  RustOrganizationRow,
  RustRegionRow,
} from '../types';

type LeaderboardRow = RustRegionRow | RustOrganizationRow;

interface LeaderboardTableCardProps {
  type: RustLeaderboardType;
  title: string;
  selectedRegions: string[];
}

const PAGE_SIZE = 20;

const LeaderboardTableCard: React.FC<LeaderboardTableCardProps> = ({
  type,
  title,
  selectedRegions,
}) => {
  const { t, i18n } = useTranslation('intelligent_analysis');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setAppliedKeyword('');
    setSearchKeyword('');
    setCurrentPage(1);
  }, [selectedRegions, type]);

  const { data, isFetching } = useQuery<
    RustLeaderboardResponse<LeaderboardRow>
  >({
    queryKey: [
      'intelligent-analysis',
      'rust',
      'leaderboard',
      type,
      currentPage,
      PAGE_SIZE,
      appliedKeyword,
      selectedRegions.join('|'),
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('pageSize', String(PAGE_SIZE));
      if (appliedKeyword) {
        params.set('q', appliedKeyword);
      }
      if (selectedRegions.length > 0) {
        params.set('regions', selectedRegions.join(','));
      }

      const response = await fetch(
        `/api/intelligent-analysis/rust/leaderboard/${encodeURIComponent(
          type
        )}?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to load ${type} leaderboard`);
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  const rows = Array.isArray(data?.items) ? data.items : [];
  const chartItems = Array.isArray(data?.chartItems) ? data.chartItems : [];
  const total = data?.total ?? 0;

  const searchPlaceholder =
    type === 'organizations' ? '搜索组织或国家/地区' : '搜索国家/地区';

  const columns = useMemo<ColumnsType<LeaderboardRow>>(() => {
    const rankColumn = {
      title: t('project_detail.rank'),
      dataIndex: '排名',
      key: '排名',
      width: 60,
      render: (rank: number) => <span className="font-medium">{rank}</span>,
    };

    if (type === 'organizations') {
      return [
        rankColumn,
        {
          title: '组织',
          dataIndex: '组织',
          key: '组织',
          ellipsis: true,
          render: (value: string) => (
            <span className="font-medium text-slate-800">{value}</span>
          ),
        },
        {
          title: t('project_detail.region_chart.country_region'),
          dataIndex: '所属国家',
          key: '所属国家',
          width: 120,
          render: (value: string) =>
            translateByLocale(value, countryMapping, i18n.language),
        },
        {
          title: '开发者数量',
          dataIndex: '开发者数量',
          key: '开发者数量',
          width: 100,
          render: (value: number) => (
            <span className="font-semibold text-blue-600">
              {value.toLocaleString()}
            </span>
          ),
        },
      ];
    }

    const countLabel = type === 'projects' ? '项目数量' : '开发者数量';

    return [
      rankColumn,
      {
        title: t('project_detail.region_chart.country_region'),
        dataIndex: '国家',
        key: '国家',
        render: (value: string) => (
          <span className="font-medium text-slate-800">
            {translateByLocale(value, countryMapping, i18n.language)}
          </span>
        ),
      },
      {
        title: countLabel,
        dataIndex: '数量',
        key: '数量',
        width: 100,
        render: (value: number) => (
          <span className="font-semibold text-blue-600">
            {value.toLocaleString()}
          </span>
        ),
      },
    ];
  }, [i18n.language, t, type]);

  return (
    <Card title={title} className="mb-6">
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
        {/* 左侧表格 */}
        <div style={{ flex: 1, minWidth: 0, paddingRight: 24 }}>
          <div style={{ marginBottom: 12 }}>
            <Space>
              <Input
                placeholder={searchPlaceholder}
                prefix={<SearchOutlined />}
                style={{ width: 260 }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onPressEnter={() => {
                  setAppliedKeyword(searchKeyword.trim());
                  setCurrentPage(1);
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  setAppliedKeyword(searchKeyword.trim());
                  setCurrentPage(1);
                }}
              >
                {t('project_detail.search')}
              </Button>
            </Space>
          </div>

          <Table
            columns={columns}
            dataSource={rows}
            loading={isFetching}
            rowKey={(record: LeaderboardRow) => {
              if ('组织' in record) return `${record.组织}-${record.排名}`;
              return `${record.国家}-${record.排名}`;
            }}
            pagination={{
              current: currentPage,
              pageSize: PAGE_SIZE,
              total,
              showSizeChanger: false,
              showQuickJumper: true,
              size: 'small',
              onChange: (page) => setCurrentPage(page),
              showTotal: (allTotal: number) => `共 ${allTotal} 条`,
            }}
            size="small"
            scroll={{ y: 360 }}
          />
        </div>

        {/* 分割线 */}
        <div
          style={{
            width: 1,
            alignSelf: 'stretch',
            background: '#e2e8f0',
            flexShrink: 0,
          }}
        />

        {/* 右侧饼图 */}
        <div style={{ flex: 1, minWidth: 0, paddingLeft: 24 }}>
          <LeaderboardPieChart
            items={chartItems}
            loading={isFetching}
            type={type}
          />
        </div>
      </div>
    </Card>
  );
};

export default LeaderboardTableCard;
