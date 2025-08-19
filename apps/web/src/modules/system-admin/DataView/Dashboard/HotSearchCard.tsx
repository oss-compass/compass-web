import React, { useState, useEffect } from 'react';
import { Card, Table, Tabs, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useCollectionSearchRankData } from '../../hooks';

interface HotSearchData {
  key: string;
  rank: number;
  name: string;
  label?: string;
  clicks: number;
}

interface HotSearchCardProps {
  className?: string;
}

const HotSearchCard: React.FC<HotSearchCardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<string>('repository');
  const [hotSearchData, setHotSearchData] = useState<{
    repository: HotSearchData[];
    developer: HotSearchData[];
  }>({ repository: [], developer: [] });

  // 根据当前活跃的tab获取对应数据
  const {
    data: repositoryApiData,
    isLoading: repositoryLoading,
    error: repositoryError,
  } = useCollectionSearchRankData('collection', activeTab === 'repository');

  // 获取开发者数据
  const {
    data: developerApiData,
    isLoading: developerLoading,
    error: developerError,
  } = useCollectionSearchRankData('developer', activeTab === 'developer');

  // 模拟数据作为后备
  const fallbackRepositoryData: HotSearchData[] = [
    { key: '1', rank: 1, name: 'facebook/react', clicks: 15420 },
    { key: '2', rank: 2, name: 'vuejs/vue', clicks: 12350 },
    { key: '3', rank: 3, name: 'angular/angular', clicks: 9876 },
    { key: '4', rank: 4, name: 'sveltejs/svelte', clicks: 7654 },
    { key: '5', rank: 5, name: 'vercel/next.js', clicks: 6543 },
    { key: '6', rank: 6, name: 'nuxt/nuxt', clicks: 5432 },
    { key: '7', rank: 7, name: 'expressjs/express', clicks: 4321 },
    { key: '8', rank: 8, name: 'fastify/fastify', clicks: 3210 },
  ];

  const fallbackDeveloperData: HotSearchData[] = [
    { key: '1', rank: 1, name: 'torvalds', clicks: 8765 },
    { key: '2', rank: 2, name: 'gaearon', clicks: 7654 },
    { key: '3', rank: 3, name: 'sindresorhus', clicks: 6543 },
    { key: '4', rank: 4, name: 'tj', clicks: 5432 },
    { key: '5', rank: 5, name: 'addyosmani', clicks: 4321 },
    { key: '6', rank: 6, name: 'kentcdodds', clicks: 3210 },
    { key: '7', rank: 7, name: 'wesbos', clicks: 2109 },
    { key: '8', rank: 8, name: 'bradtraversy', clicks: 1987 },
  ];

  // 处理API数据转换
  const processApiData = (
    apiData: Array<{ name: string; value: number; label?: string }> | undefined
  ): HotSearchData[] => {
    if (!apiData || apiData.length === 0) {
      return [];
    }

    return apiData.map((item, index) => ({
      key: (index + 1).toString(),
      rank: index + 1,
      name: item.name,
      label: item?.label || '',
      clicks: item.value,
    }));
  };

  // 错误处理 - 只处理当前活跃tab的错误
  useEffect(() => {
    if (activeTab === 'repository' && repositoryError) {
      console.error('获取仓库/社区排名数据失败:', repositoryError);
      message.error('获取仓库/社区排名数据失败');
    }
  }, [repositoryError, activeTab]);

  useEffect(() => {
    if (activeTab === 'developer' && developerError) {
      console.error('获取开发者排名数据失败:', developerError);
      message.error('获取开发者排名数据失败');
    }
  }, [developerError, activeTab]);

  // 数据处理 - 根据当前tab处理对应数据
  useEffect(() => {
    if (activeTab === 'repository') {
      const repositoryData = processApiData(repositoryApiData);
      const finalRepositoryData =
        repositoryData.length > 0 ? repositoryData : fallbackRepositoryData;
      setHotSearchData((prev) => ({
        ...prev,
        repository: finalRepositoryData,
      }));
    }
  }, [repositoryApiData, activeTab]);

  useEffect(() => {
    if (activeTab === 'developer') {
      const developerData = processApiData(developerApiData);
      const finalDeveloperData =
        developerData.length > 0 ? developerData : fallbackDeveloperData;
      setHotSearchData((prev) => ({
        ...prev,
        developer: finalDeveloperData,
      }));
    }
  }, [developerApiData, activeTab]);

  const hotSearchColumns: ColumnsType<HotSearchData> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank: number) => (
        <span
          className={`font-bold ${
            rank <= 3
              ? 'text-red-500'
              : rank <= 6
              ? 'text-orange-500'
              : 'text-gray-500'
          }`}
        >
          {rank}
        </span>
      ),
    },
    {
      title: activeTab === 'repository' ? '仓库名' : '开发者',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row) => (
        <a
          href={
            activeTab === 'repository'
              ? '/analyze/' + text
              : '/developer/' + text
          }
          className="cursor-pointer font-medium text-blue-600 hover:underline"
        >
          {row.label || text}
        </a>
      ),
    },
    {
      title: '点击量',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 100,
      render: (clicks: number) => (
        <span className="font-medium">{clicks.toLocaleString()}</span>
      ),
    },
  ];

  const currentHotSearchData =
    activeTab === 'repository'
      ? hotSearchData.repository
      : hotSearchData.developer;

  // 只考虑当前活跃tab的加载状态
  const isLoading =
    activeTab === 'repository' ? repositoryLoading : developerLoading;

  const tabItems = [
    {
      key: 'repository',
      label: '仓库/社区',
    },
    {
      key: 'developer',
      label: '开发者',
    },
  ];

  return (
    <Card
      title="仓库/社区、开发者访问排名"
      className={className}
      loading={isLoading}
      extra={
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size="small"
        />
      }
    >
      <Table
        columns={hotSearchColumns}
        dataSource={currentHotSearchData}
        pagination={false}
        size="small"
        scroll={{ y: 250 }}
      />
    </Card>
  );
};

export default HotSearchCard;
