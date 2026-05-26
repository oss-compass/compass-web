import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import type { ColumnsType } from 'antd/es/table';

import MyTable from '@common/components/Table';
import {
  countryMapping,
  translateByLocale,
} from '@modules/intelligent-analysis/DataView/Overview/Project/utils/countryMapping';

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

const PAGE_SIZE = 10;

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
  });

  const rows = Array.isArray(data?.items) ? data.items : [];
  const total = typeof data?.total === 'number' ? data.total : 0;

  const searchPlaceholder =
    type === 'organizations' ? '搜索组织或国家/地区' : '搜索国家/地区';

  const columns = useMemo<ColumnsType<LeaderboardRow>>(() => {
    const rankColumn = {
      title: t('project_detail.rank'),
      dataIndex: '排名',
      key: '排名',
      width: 76,
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
          width: 180,
          render: (value: string) =>
            translateByLocale(value, countryMapping, i18n.language),
        },
        {
          title: '开发者数量',
          dataIndex: '开发者数量',
          key: '开发者数量',
          width: 140,
          render: (value: number) => (
            <span className="font-semibold text-[#0958d9]">
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
        width: 150,
        render: (value: number) => (
          <span className="font-semibold text-[#0958d9]">
            {value.toLocaleString()}
          </span>
        ),
      },
    ];
  }, [i18n.language, t, type]);

  return (
    <Card title={title} className="mb-6">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Space wrap>
          <Input
            placeholder={searchPlaceholder}
            prefix={<SearchOutlined />}
            style={{ width: 320 }}
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
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

      <MyTable
        columns={columns}
        dataSource={rows}
        loading={isFetching}
        rowKey={(record: LeaderboardRow) => {
          if ('组织' in record) {
            return `${record.组织}-${record.排名}`;
          }
          return `${record.国家}-${record.排名}`;
        }}
        pagination={{
          current: currentPage,
          pageSize: PAGE_SIZE,
          total,
          showSizeChanger: false,
          showQuickJumper: true,
          onChange: setCurrentPage,
          showTotal: (allTotal, range) =>
            t('project_detail.pagination_total', {
              start: range[0],
              end: range[1],
              total: allTotal,
            }),
        }}
      />
    </Card>
  );
};

export default LeaderboardTableCard;
