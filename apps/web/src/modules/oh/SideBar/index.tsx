import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button } from 'antd';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
// import { useHandleQueryParams } from '@modules/analyze/hooks/useHandleQueryParams';
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
    items.push(menuItems[3]);
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
    return [id || 'hatchTable'];
  }, [id]);

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
          // width={220}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            defaultSelectedKeys={[id || 'hatchTable']}
            onClick={onClick}
            // style={{ width: 220 }}
            defaultOpenKeys={['sub3', 'hatch', 'graduate', 'sandbox']}
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
