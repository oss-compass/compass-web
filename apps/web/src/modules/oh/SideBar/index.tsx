import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: '总览',
    children: [
      {
        key: 'code',
        label: '代码量统计',
      },
      {
        key: 'committer',
        label: 'Committer 贡献统计',
      },
      {
        key: 'communityContributions',
        label: '社区贡献统计',
      },
    ],
  },
];

const SideMenu: React.FC = () => {
  const id = useHashchangeEvent();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    window.location.hash = e.key;
    // href={`#${hash}`}
  };
  //
  return (
    <Menu
      defaultSelectedKeys={[id || 'code']}
      onClick={onClick}
      style={{ width: 256 }}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default SideMenu;
