import React, { useState } from 'react';
import { Card, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface HotSearchData {
  key: string;
  rank: number;
  name: string;
  clicks: number;
}

interface HotSearchCardProps {
  className?: string;
}

const HotSearchCard: React.FC<HotSearchCardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<string>('repository');

  const repositoryData: HotSearchData[] = [
    { key: '1', rank: 1, name: 'facebook/react', clicks: 15420 },
    { key: '2', rank: 2, name: 'vuejs/vue', clicks: 12350 },
    { key: '3', rank: 3, name: 'angular/angular', clicks: 9876 },
    { key: '4', rank: 4, name: 'sveltejs/svelte', clicks: 7654 },
    { key: '5', rank: 5, name: 'vercel/next.js', clicks: 6543 },
    { key: '6', rank: 6, name: 'nuxt/nuxt', clicks: 5432 },
    { key: '7', rank: 7, name: 'expressjs/express', clicks: 4321 },
    { key: '8', rank: 8, name: 'fastify/fastify', clicks: 3210 },
  ];

  const developerData: HotSearchData[] = [
    { key: '1', rank: 1, name: 'torvalds', clicks: 8765 },
    { key: '2', rank: 2, name: 'gaearon', clicks: 7654 },
    { key: '3', rank: 3, name: 'sindresorhus', clicks: 6543 },
    { key: '4', rank: 4, name: 'tj', clicks: 5432 },
    { key: '5', rank: 5, name: 'addyosmani', clicks: 4321 },
    { key: '6', rank: 6, name: 'kentcdodds', clicks: 3210 },
    { key: '7', rank: 7, name: 'wesbos', clicks: 2109 },
    { key: '8', rank: 8, name: 'bradtraversy', clicks: 1987 },
  ];

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
      render: (text: string) => (
        <span className="cursor-pointer font-medium text-blue-600 hover:underline">
          {text}
        </span>
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
    activeTab === 'repository' ? repositoryData : developerData;

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
      title="仓库/社区、开发者热门搜索"
      className={className}
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
