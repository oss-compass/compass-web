import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface UserSourceData {
  key: string;
  source: string;
  visits: number;
}

interface UserSourceCardProps {
  className?: string;
}

const UserSourceCard: React.FC<UserSourceCardProps> = ({ className }) => {
  const sourceData: UserSourceData[] = [
    { key: '1', source: 'github.com', visits: 689 },
    { key: '2', source: 'gitee.com', visits: 570 },
    { key: '3', source: '114.114.114.114:9421', visits: 517 },
    { key: '4', source: 'baidu', visits: 354 },
    { key: '5', source: 'google', visits: 226 },
    { key: '6', source: 'cn.bing.com', visits: 67 },
    { key: '7', source: 'bing', visits: 57 },
  ];

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
