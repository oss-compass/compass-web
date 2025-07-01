import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  MonitorOutlined,
  UserOutlined,
  DesktopOutlined,
  BarChartOutlined,
  LineChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import { useTranslation } from 'next-i18next';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const hash = useHashchangeEvent();

  const menuItems: MenuItem[] = [
    {
      key: 'user-operation',
      icon: <DashboardOutlined />,
      label: '用户运营监控',
      children: [
        {
          key: 'dashboard',
          icon: <BarChartOutlined />,
          label: '监控总览',
        },
        {
          key: 'user-list',
          icon: <TeamOutlined />,
          label: '用户列表',
        },
      ],
    },
    {
      key: 'service-monitor',
      icon: <MonitorOutlined />,
      label: '服务监控',
      children: [
        {
          key: 'ecosystem-evaluation-monitor',
          icon: <BarChartOutlined />,
          label: '开源健康评估监控',
        },
        {
          key: 'selection-evaluation-tpc-monitor',
          icon: <LineChartOutlined />,
          label: '开源选型评估(TPC)监控',
        },
      ],
    },
    {
      key: 'user-management',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: 'system-monitor',
      icon: <DesktopOutlined />,
      label: '系统资源监控',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    window.location.hash = e.key;
  };

  // 处理子菜单的选中状态
  const getSelectedKeys = () => {
    const currentHash = hash || 'dashboard';
    // 如果是服务监控的子菜单，需要同时选中父菜单
    if (
      [
        'ecosystem-evaluation-monitor',
        'selection-evaluation-tpc-monitor',
      ].includes(currentHash)
    ) {
      return [currentHash];
    }
    return [currentHash];
  };

  const selectedKeys = getSelectedKeys();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={240}
      theme="light"
    >
      <div className="py-4">
        <div className="mb-4 ml-4 flex items-center px-4 text-lg font-semibold text-gray-800">
          {!collapsed && '后台管理平台'}
        </div>
        <Menu
          mode="inline"
          style={{ borderInlineEnd: '0px' }}
          selectedKeys={selectedKeys}
          defaultOpenKeys={['user-operation', 'service-monitor']}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none"
        />
      </div>
    </Sider>
  );
};

export default SideBar;
