import React from 'react';
import { Tag } from 'antd';
import {
  DatabaseOutlined,
  CloudServerOutlined,
  HddOutlined,
  WifiOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

// 获取角色配置
export const getRoleConfig = (role: string) => {
  switch (role) {
    case 'compute':
      return { color: 'blue', icon: <ThunderboltOutlined />, text: '计算' };
    case 'storage':
      return { color: 'green', icon: <HddOutlined />, text: '存储' };
    case 'network':
      return { color: 'orange', icon: <WifiOutlined />, text: '网络' };
    case 'database':
      return { color: 'purple', icon: <DatabaseOutlined />, text: '数据库' };
    case 'cache':
      return { color: 'cyan', icon: <CloudServerOutlined />, text: '缓存' };
    default:
      return { color: 'default', icon: null, text: '未知' };
  }
};

// 获取状态配置
export const getStatusConfig = (status: string) => {
  switch (status) {
    case 'online':
      return { color: 'green', icon: <CheckCircleOutlined />, text: '在线' };
    case 'warning':
      return {
        color: 'orange',
        icon: <ExclamationCircleOutlined />,
        text: '警告',
      };
    case 'offline':
      return {
        color: 'red',
        icon: <ExclamationCircleOutlined />,
        text: '离线',
      };
    default:
      return { color: 'default', icon: null, text: '未知' };
  }
};

// 获取带宽使用率颜色
export const getBandwidthColor = (value: number) => {
  if (value >= 120) return '#f5222d'; // 红色
  if (value >= 100) return '#faad14'; // 橙色
  if (value >= 80) return '#52c41a'; // 绿色
  return '#1890ff'; // 蓝色
};
