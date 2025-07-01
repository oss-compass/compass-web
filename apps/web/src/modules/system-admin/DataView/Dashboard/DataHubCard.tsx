import React, { useState } from 'react';
import { Card, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataHubData {
  key: string;
  rank: number;
  name: string;
  count: number;
}

interface DataHubCardProps {
  className?: string;
}

const DataHubCard: React.FC<DataHubCardProps> = ({ className }) => {
  const [dataHubTab, setDataHubTab] = useState<string>('api');

  const apiClickData: DataHubData[] = [
    { key: '1', rank: 1, name: '获取项目release元数据', count: 8765 },
    { key: '2', rank: 2, name: '获取项目repo元数据', count: 7654 },
    { key: '3', rank: 3, name: '开发者对仓库贡献', count: 6543 },
    { key: '4', rank: 4, name: '获取项目git元数据', count: 5432 },
    { key: '5', rank: 5, name: '获取项目fork元数据', count: 4321 },
    { key: '6', rank: 6, name: '获取项目贡献者元数据', count: 3210 },
    { key: '7', rank: 7, name: '获取项目event元数据', count: 2109 },
  ];

  const archiveDownloadData: DataHubData[] = [
    { key: '1', rank: 1, name: '贡献量数据集', count: 15420 },
    { key: '2', rank: 2, name: '贡献者数据集', count: 12350 },
    { key: '3', rank: 3, name: '进出口数据集', count: 9876 },
    { key: '4', rank: 4, name: '编程语言数据集', count: 7654 },
  ];

  const dataHubColumns: ColumnsType<DataHubData> = [
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
      title: dataHubTab === 'api' ? 'API名称' : '归档数据',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span className="cursor-pointer font-medium text-blue-600 hover:underline">
          {text}
        </span>
      ),
    },
    {
      title: dataHubTab === 'api' ? '点击量' : '下载量',
      dataIndex: 'count',
      key: 'count',
      width: 100,
      render: (count: number) => (
        <span className="font-medium">{count.toLocaleString()}</span>
      ),
    },
  ];

  const currentDataHubData =
    dataHubTab === 'api' ? apiClickData : archiveDownloadData;

  const dataHubTabItems = [
    {
      key: 'api',
      label: 'API 点击量',
    },
    {
      key: 'archive',
      label: '归档数据下载量',
    },
  ];

  return (
    <Card
      title="开源数据中枢点击量排名"
      className={className}
      extra={
        <Tabs
          activeKey={dataHubTab}
          onChange={setDataHubTab}
          items={dataHubTabItems}
          size="small"
        />
      }
    >
      <Table
        columns={dataHubColumns}
        dataSource={currentDataHubData}
        pagination={false}
        size="small"
        scroll={{ y: 250 }}
      />
    </Card>
  );
};

export default DataHubCard;
