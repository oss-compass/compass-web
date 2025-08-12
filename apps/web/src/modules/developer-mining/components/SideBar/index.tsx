import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  PlusOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const hash = useHashchangeEvent();

  const menuItems: MenuItem[] = [
    {
      key: 'overview',
      icon: <DashboardOutlined />,
      label: '总览',
    },
    {
      key: 'submit-project',
      icon: <PlusOutlined />,
      label: '提交项目',
    },
    {
      key: 'my-submissions',
      icon: <FileTextOutlined />,
      label: '我的提交',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    window.location.hash = e.key;
  };

  const getSelectedKeys = () => {
    const currentHash = hash || 'overview';
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
      style={{
        height: 'calc(100vh - 80px)',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      <div className="flex h-full flex-col py-4">
        <div className="mb-4 ml-4 flex items-center px-4 text-lg font-semibold text-gray-800">
          {!collapsed && '开发者挖掘'}
        </div>
        <Menu
          mode="inline"
          style={{ borderInlineEnd: '0px' }}
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={handleMenuClick}
          className="flex-1 border-none"
        />
      </div>
    </Sider>
  );
};

export default SideBar;
