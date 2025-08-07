import React from 'react';
import { Table, Button, Progress, Tag } from 'antd';
import { EyeOutlined, CloudServerOutlined } from '@ant-design/icons';
import { ServerData } from '../types';
import {
  getRoleConfig,
  getStatusConfig,
  getBandwidthColor,
} from '../utils/uiUtils';

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
      title: '服务器作用',
      dataIndex: 'role',
      key: 'role',
      width: '8%',
      render: (role: string) => {
        const config = getRoleConfig(role);
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'CPU使用率',
      dataIndex: 'cpu',
      key: 'cpu',
      width: '10%',
      render: (value: number) => (
        <div>
          <Progress percent={value} size="small" />
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
          <Progress percent={value} size="small" strokeColor="#52c41a" />
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
          <Progress percent={value} size="small" strokeColor="#faad14" />
        </div>
      ),
    },
    {
      title: '磁盘IO',
      dataIndex: 'diskIO',
      key: 'diskIO',
      width: '8%',
      render: (value: number) => `${value.toFixed(1)} MB/s`,
    },
    {
      title: '网络带宽',
      dataIndex: 'bandwidth',
      key: 'bandwidth',
      width: '8%',
      render: (value: number) => (
        <span style={{ color: getBandwidthColor(value) }}>
          {value.toFixed(1)} Mbps
        </span>
      ),
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
