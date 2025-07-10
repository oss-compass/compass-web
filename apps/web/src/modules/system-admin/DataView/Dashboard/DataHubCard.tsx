import React, { useState, useEffect } from 'react';
import { Card, Table, Tabs, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  useDatahubApiRankData,
  useDatahubArchiveRankData,
} from './hooks/useAdminApi';

interface DataHubData {
  key: string;
  rank: number;
  name: string;
  count: number;
  apiName?: string; // API名称，用于链接跳转
}

interface DataHubCardProps {
  className?: string;
}

const DataHubCard: React.FC<DataHubCardProps> = ({ className }) => {
  const [dataHubTab, setDataHubTab] = useState<string>('api');
  const [dataHubData, setDataHubData] = useState<{
    api: DataHubData[];
    archive: DataHubData[];
  }>({ api: [], archive: [] });

  // 根据当前活跃的tab获取对应数据
  const {
    data: apiRankData,
    isLoading: apiLoading,
    error: apiError,
  } = useDatahubApiRankData(dataHubTab === 'api');

  // 获取归档数据排名
  const {
    data: archiveRankData,
    isLoading: archiveLoading,
    error: archiveError,
  } = useDatahubArchiveRankData(dataHubTab === 'archive');

  // 模拟数据作为后备
  const fallbackApiData: DataHubData[] = [];

  const fallbackArchiveData: DataHubData[] = [];

  // 处理API数据转换
  const processApiData = (
    apiData: Array<{ name: string; desc: string; value: number }> | undefined,
    fallbackData: DataHubData[]
  ): DataHubData[] => {
    if (!apiData || apiData.length === 0) {
      return fallbackData;
    }

    return apiData.map((item, index) => ({
      key: (index + 1).toString(),
      rank: index + 1,
      name: item.desc, // 显示描述
      count: item.value,
      apiName: item.name, // 保存原始name用于链接跳转
    }));
  };

  // 处理归档数据转换
  const processArchiveData = (
    archiveData: Array<{ name: string; value: number }> | undefined,
    fallbackData: DataHubData[]
  ): DataHubData[] => {
    if (!archiveData || archiveData.length === 0) {
      return fallbackData;
    }

    return archiveData.map((item, index) => ({
      key: (index + 1).toString(),
      rank: index + 1,
      name: item.name,
      count: item.value,
    }));
  };

  // 错误处理 - 只处理当前活跃tab的错误
  useEffect(() => {
    if (dataHubTab === 'api' && apiError) {
      console.error('获取API排名数据失败:', apiError);
      message.error('获取API排名数据失败，显示模拟数据');
    }
  }, [apiError, dataHubTab]);

  useEffect(() => {
    if (dataHubTab === 'archive' && archiveError) {
      console.error('获取归档数据排名失败:', archiveError);
      message.error('获取归档数据排名失败，显示模拟数据');
    }
  }, [archiveError, dataHubTab]);

  // 数据处理 - 根据当前tab处理对应数据
  useEffect(() => {
    if (dataHubTab === 'api') {
      const apiData = processApiData(apiRankData, fallbackApiData);
      setDataHubData((prev) => ({
        ...prev,
        api: apiData,
      }));
    }
  }, [apiRankData, dataHubTab]);

  useEffect(() => {
    if (dataHubTab === 'archive') {
      const archiveData = processArchiveData(
        archiveRankData,
        fallbackArchiveData
      );
      setDataHubData((prev) => ({
        ...prev,
        archive: archiveData,
      }));
    }
  }, [archiveRankData, dataHubTab]);

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
      render: (text: string, record: DataHubData) => {
        // 如果是API数据且有apiName，则渲染为链接
        if (dataHubTab === 'api' && record.apiName) {
          return (
            <a
              href={`/dataHub#${record.apiName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline"
            >
              {text}
            </a>
          );
        }
        // 归档数据不需要链接
        return <span className="font-medium text-gray-800">{text}</span>;
      },
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
    dataHubTab === 'api' ? dataHubData.api : dataHubData.archive;

  // 只考虑当前活跃tab的加载状态
  const isLoading = dataHubTab === 'api' ? apiLoading : archiveLoading;

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
      loading={isLoading}
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
