import React from 'react';
import { useRouter } from 'next/router';
import { useCategoriesData } from '@modules/os-situation/hooks/useCategoriesData';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import classnames from 'classnames';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';

const SideBar = () => {
  const hash = useHashchangeEvent();
  const categoriesData = useCategoriesData();
  const router = useRouter();

  const metric = router.query.metric as string;
  const [collapsed, setCollapsed] = useState(false);
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;
  const { Sider } = Layout;
  const menuItems = categoriesData[metric]?.map((item: any) => ({
    key: item.id,
    label: item.name,
    ...(item?.value?.length > 0 && {
      children: item.value.map((child: any) => ({
        key: child.id,
        label: child.name,
      })),
    }),
  }));
  const handleMenuClick = (e: any) => {
    window.location.hash = e.key;
  };
  return (
    <div
      className={classnames('sticky overflow-auto', [
        y >= preY
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
