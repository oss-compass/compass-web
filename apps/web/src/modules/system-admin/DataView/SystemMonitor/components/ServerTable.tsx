import React from 'react';
import { Table, Button, Progress, Tag } from 'antd';
import { EyeOutlined, CloudServerOutlined } from '@ant-design/icons';
import { ServerData } from '../types';
import { getStatusConfig, getBandwidthColor } from '../utils/uiUtils';

// 修复Progress组件样式
const progressStyle = {
  '.ant-progress-line': {
    padding: '4px 0 !important',
    margin: '2px 0 !important',
  },
};

interface ServerTableProps {
  servers: ServerData[];
  onShowModal: (server: ServerData) => void;
  onShowConfigModal: (server: ServerData) => void;
}

const ServerTable: React.FC<ServerTableProps> = ({
  servers,
  onShowModal,
  onShowConfigModal,
}) => {
  const columns = [
    {
      title: '服务器名称',
      dataIndex: 'name',
      key: 'name',
      width: '12%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '6%',
      render: (status: string) => {
        const config = getStatusConfig(status);
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: '6%',
    },
    {
      title: '公网IP',
      dataIndex: 'ip_address',
      key: 'ip_address',
      width: '8%',
    },
    {
      title: '服务器作用',
      dataIndex: 'use_for',
      key: 'use_for',
      width: '8%',
    },
    {
      title: 'CPU使用率',
      dataIndex: 'cpu',
      key: 'cpu',
      width: '10%',
      render: (value: number) => (
        <div>
          <Progress
            percent={value}
            size="small"
            style={{ padding: '4px 0', margin: '2px 0' }}
          />
        </div>
      ),
    },
    {
      title: '内存使用率',
      dataIndex: 'memory',
      key: 'memory',
      width: '10%',
      render: (value: number) => (
        <div>
          <Progress
            percent={value}
            size="small"
            strokeColor="#52c41a"
            style={{ padding: '4px 0', margin: '2px 0' }}
          />
        </div>
      ),
    },
    {
      title: '磁盘使用率',
      dataIndex: 'disk',
      key: 'disk',
      width: '10%',
      render: (value: number) => (
        <div>
          <Progress
            percent={value}
            size="small"
            strokeColor="#faad14"
            style={{ padding: '4px 0', margin: '2px 0' }}
          />
        </div>
      ),
    },
    {
      title: '磁盘IO',
      dataIndex: 'diskIO',
      key: 'diskIO',
      width: '10%',
      render: (value: { read: number; write: number }) => (
        <div className="text-xs">
          <div className="flex justify-between">
            <span className="text-blue-600">读:</span>
            <span className="text-blue-600">{value.read.toFixed(1)} MB/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-orange-600">写:</span>
            <span className="text-orange-600">
              {value.write.toFixed(1)} MB/s
            </span>
          </div>
        </div>
      ),
    },
    {
      title: '网络带宽',
      dataIndex: 'bandwidth',
      key: 'bandwidth',
      width: '10%',
      render: (value: { upload: number; download: number }) => (
        <div className="text-xs">
          <div className="flex justify-between">
            <span className="text-blue-600">上传:</span>
            <span className="text-blue-600">
              {value.upload.toFixed(1)} Mbps
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-orange-600">下载:</span>
            <span className="text-orange-600">
              {value.download.toFixed(1)} Mbps
            </span>
          </div>
        </div>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: '10%',
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      },
    },
    {
      title: '操作',
      key: 'action',
      width: '12%',
      render: (_: any, record: ServerData) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => onShowModal(record)}
            disabled={record.status === 'offline'}
            size="small"
          >
            监控详情
          </Button>
          <Button
            type="link"
            icon={<CloudServerOutlined />}
            onClick={() => onShowConfigModal(record)}
            size="small"
          >
            配置详情
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={servers}
      pagination={false}
      size="small"
    />
  );
};

export default ServerTable;
