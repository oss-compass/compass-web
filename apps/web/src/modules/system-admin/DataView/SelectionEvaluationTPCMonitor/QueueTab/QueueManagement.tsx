import React from 'react';
import { Card, Table, Tag, Progress, Alert } from 'antd';
import { useTpcQueueList, TpcQueueData } from '@modules/system-admin/hooks/useTpcQueueApi';

// TPC队列类型映射
const QUEUE_TYPE_MAP = {
  tpc: 'TPC队列',
  tpc_high_priority: 'TPC优先队列',
} as const;

// 表格数据类型
interface TableQueueData extends TpcQueueData {
  key: string;
}

const QueueManagement: React.FC = () => {
  // 使用API获取TPC队列数据
  const { data: queueData, isLoading, error } = useTpcQueueList();

  // 转换数据格式以适配表格
  const tableData: TableQueueData[] = queueData ? queueData.map((item, index) => ({
    ...item,
    key: index.toString(),
  })) : [];

  // 渲染队列状态
  const renderQueueStatus = (ready: number, total: number) => {
    const percentage = total > 0 ? Math.round((ready / total) * 100) : 0;
    const color =
      percentage > 80 ? '#52c41a' : percentage > 50 ? '#faad14' : '#ff4d4f';

    return (
      <div className="flex items-center gap-2">
        <div>
          {ready}/{total}
        </div>
        <div className="pb-1.5">
          <Progress
            showInfo={false}
            percent={percentage}
            strokeColor={color}
            size={[40, 4]}
          />
        </div>
      </div>
    );
  };

  // 获取队列类型标签颜色
  const getQueueTypeColor = (type: string) => {
    switch (type) {
      case 'tpc':
        return 'blue';
      case 'tpc_high_priority':
        return 'orange';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: '队列类型',
      dataIndex: 'queue_type',
      key: 'queue_type',
      width: '20%',
      render: (type: string) => (
        <Tag color={getQueueTypeColor(type)}>
          {QUEUE_TYPE_MAP[type as keyof typeof QUEUE_TYPE_MAP] || type}
        </Tag>
      ),
    },
    {
      title: '队列名称',
      dataIndex: 'queue',
      key: 'queue',
      width: '25%',
      render: (queue: string) => (
        <span className="font-medium">{queue}</span>
      ),
    },
    {
      title: '总任务数',
      dataIndex: 'total',
      key: 'total',
      width: '12%',
      render: (count: number) => (
        <span className="font-medium text-blue-600">{count}</span>
      ),
    },
    {
      title: '就绪任务',
      dataIndex: 'ready',
      key: 'ready',
      width: '12%',
      render: (ready: number, record: TableQueueData) =>
        renderQueueStatus(ready, record.total),
    },
    {
      title: '未确认任务',
      dataIndex: 'unacknowledged',
      key: 'unacknowledged',
      width: '12%',
      render: (count: number) => (
        <span className={count > 0 ? 'text-orange-600' : 'text-gray-500'}>
          {count}
        </span>
      ),
    },
    {
      title: '消费者数量',
      dataIndex: 'consumers',
      key: 'consumers',
      width: '12%',
      render: (count: number) => (
        <span className={count > 0 ? 'text-green-600' : 'text-gray-500'}>
          {count}
        </span>
      ),
    },
    {
      title: '所属机构',
      dataIndex: 'belong_to',
      key: 'belong_to',
      width: '12%',
      render: (belongTo: string | null) => (
        <span className="text-gray-600">
          {belongTo || '-'}
        </span>
      ),
    },
  ];

  // 错误处理
  if (error) {
    return (
      <Card title="队列详情">
        <Alert
          message="获取队列数据失败"
          description={error instanceof Error ? error.message : '未知错误'}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card title="队列详情">
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        pagination={false}
        size="middle"
        scroll={{ x: 1000 }}
      />
    </Card>
  );
};

export default QueueManagement;