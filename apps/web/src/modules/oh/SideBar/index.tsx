import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button } from 'antd';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import { useHandleQueryParams } from '@modules/analyze/hooks/useHandleQueryParams';
import { useUserInfo } from '@modules/auth';
import { menuItems } from '@modules/oh/SideBar/MenuItems';

type MenuItem = Required<MenuProps>['items'][number];

const SideMenu: React.FC = () => {
  const { roleLevel } = useUserInfo();
  let items = [];
  if (roleLevel >= 5) {
    items = menuItems;
  } else {
    items.push(menuItems[2]);
  }
  const id = useHashchangeEvent();
  // const { clearAllQueryParams } = useHandleQueryParams();
  const onClick: MenuProps['onClick'] = (e) => {
    // clearAllQueryParams();
    window.location.hash = e.key;
  };
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;
  const defaultSelectedKeys = useMemo(() => {
    return [id || 'index'];
  }, [id, window.location.href]);

  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={classnames('sticky overflow-auto', [
        y > preY
          ? 'top-[56px] h-[calc(100vh-56px)]'
          : 'top-[136px] h-[calc(100vh-136px)]',
      ])}
    >
      <Layout className="oh">
        <Sider
          breakpoint="lg"
          theme="light"
          // trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {/* <div className="flex w-full justify-center">
            <Button
              type="text"
              className="w-full"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined rev={undefined} />
                ) : (
                  <MenuFoldOutlined rev={undefined} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: 64,
                fontSize: '16px',
                height: 64,
              }}
            />
          </div> */}
          <Menu
            defaultSelectedKeys={[id || 'index']}
            onClick={onClick}
            // style={{ width: 256 }}
            defaultOpenKeys={['sub3']}
            mode="inline"
            items={items}
            selectedKeys={defaultSelectedKeys}
          />
        </Sider>
      </Layout>
    </div>
  );
};

export default SideMenu;
