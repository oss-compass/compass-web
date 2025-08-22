import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  PlusOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('intelligent_analysis');

  const menuItems: MenuItem[] = [
    {
      key: 'overview',
      icon: <DashboardOutlined />,
      label: t('sidebar.overview'),
    },
    {
      key: 'submit-project',
      icon: <PlusOutlined />,
      label: t('sidebar.submit_project'),
    },
    {
      key: 'my-submissions',
      icon: <FileTextOutlined />,
      label: t('sidebar.my_submissions'),
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    router.push(`/intelligent-analysis/${e.key}`);
  };

  const getSelectedKeys = () => {
    const pathname = router.pathname;
    const asPath = router.asPath;

    // 处理不同的路由情况
    if (pathname.includes('/overview/') || asPath.includes('/overview/')) {
      return ['overview'];
    } else if (pathname.includes('/submit-project')) {
      return ['submit-project'];
    } else if (pathname.includes('/my-submissions')) {
      return ['my-submissions'];
    } else if (pathname.includes('/overview')) {
      return ['overview'];
    }

    return ['overview']; // 默认选中总览
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
          {!collapsed && t('sidebar.title')}
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
