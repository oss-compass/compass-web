import React, { useEffect } from 'react';
import { Card, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useUserReferrerData } from '../../hooks';

interface UserSourceData {
  key: string;
  source: string;
  visits: number;
}

interface UserSourceCardProps {
  className?: string;
}

const UserSourceCard: React.FC<UserSourceCardProps> = ({ className }) => {
  const { data: apiData, isLoading, error } = useUserReferrerData();

  // 处理 URL 显示名称
  const formatSourceName = (url: string): string => {
    try {
      // 移除前后空格和反引号
      const cleanUrl = url.trim().replace(/`/g, '');

      if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
        const urlObj = new URL(cleanUrl);
        return urlObj.href;
      }
      return cleanUrl;
    } catch {
      // 如果 URL 解析失败，返回原始字符串（去除反引号和空格）
      return url.trim().replace(/`/g, '');
    }
  };

  // 处理 API 数据
  const processReferrerData = (): UserSourceData[] => {
    if (apiData && apiData.length > 0) {
      return apiData
        .slice(0, 50) // 截取前50条
        .map((item, index) => ({
          key: (index + 1).toString(),
          source: formatSourceName(item.name),
          visits: item.value,
        }));
    }
    return [];
  };

  const sourceData = processReferrerData();

  // 错误处理
  useEffect(() => {
    if (error) {
      console.error('用户来源数据获取失败：', error);
      message.error('用户来源数据获取失败，使用模拟数据');
    }
  }, [error]);

  const columns: ColumnsType<UserSourceData> = [
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      render: (text: string) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: '访问数',
      dataIndex: 'visits',
      key: 'visits',
      width: 100,
      align: 'right',
      render: (visits: number) => (
        <span className="font-medium text-blue-600">{visits}</span>
      ),
    },
  ];

  return (
    <Card
      title="用户跳转来源"
      className={className}
      loading={isLoading}
      extra={
        <span className="text-sm text-gray-500">
          {/* 按来源活动的手动创建... 刷新会话活动 */}
        </span>
      }
    >
      <Table
        columns={columns}
        dataSource={sourceData}
        pagination={false}
        size="small"
        scroll={{ y: 250 }}
        showHeader={false}
      />
    </Card>
  );
};

export default UserSourceCard;
