import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { categoriesData } from '../../DataView/categoriesData';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import classnames from 'classnames';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';

const SideBar = () => {
  const hash = useHashchangeEvent();
  const router = useRouter();
  const metric = router.query.metric as string;
  const [collapsed, setCollapsed] = useState(false);
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;
  const { Sider } = Layout;
  const menuItems = categoriesData[metric]?.map((item: any) => ({
    key: item.id, // Assuming 'value' can serve as a unique key and hash
    label: item.name,
    children: item.value?.map((child: any) => ({
      key: child.text, // Assuming 'value' can serve as a unique key and hash
      label: child.text,
    })),
  }));
  const handleMenuClick = (e: any) => {
    window.location.hash = e.key;
  };
  return (
    <div
      className={classnames('sticky overflow-auto', [
        y > preY
          ? 'top-[56px] h-[calc(100vh-56px)]'
          : 'top-[136px] h-[calc(100vh-136px)]',
      ])}
    >
      <Layout>
        {menuItems && menuItems.length > 0 && (
          <Sider
            width={280}
            theme="light"
            collapsible
            collapsed={collapsed}
            collapsedWidth={60}
            onCollapse={(value) => setCollapsed(value)}
          >
            {
              <Menu
                style={{ width: '280px' }}
                mode="inline"
                items={collapsed ? [] : menuItems}
                onClick={handleMenuClick}
                selectedKeys={[hash]}
                defaultOpenKeys={menuItems.map((item: any) => item.key)}
              />
            }
          </Sider>
        )}
      </Layout>
    </div>
  );
};
export default SideBar;
