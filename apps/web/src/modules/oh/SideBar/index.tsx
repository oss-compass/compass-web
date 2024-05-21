import React from 'react';
import classnames from 'classnames';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePrevious, useWindowScroll } from 'react-use';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'index',
    label: '总览',
  },
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
];

const SideMenu: React.FC = () => {
  const id = useHashchangeEvent();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    window.location.hash = e.key;
    // href={`#${hash}`}
  };
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;
  return (
    <div
      className={classnames('sticky overflow-auto', [
        y < preY
          ? 'top-[136px] h-[calc(100vh-136px)]'
          : 'top-[56px] h-[calc(100vh-56px)]',
      ])}
    >
      <Menu
        defaultSelectedKeys={[id || 'index']}
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['index']}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default SideMenu;
