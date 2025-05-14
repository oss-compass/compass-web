import React from 'react';
import useMenuContent from '../useMenuContent';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const SideBarContent: React.FC = () => {
  const { result } = useMenuContent();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    window.location.hash = e.key;
  };
  const items = result.map((item) => {
    return {
      key: item.name,
      label: item.convertName,
      children: item.menus.map((menu) => {
        return {
          key: menu?.name || menu?.id,
          label: menu?.convertName || menu?.description,
          children: menu?.subMenus?.map((subMenu) => {
            return {
              key: subMenu.id,
              label: subMenu.description,
            };
          }),
        };
      }),
    };
  });
  return (
    <Menu
      defaultOpenKeys={items.map((item) => item.key)}
      onClick={onClick}
      style={{ width: 255, border: 0 }}
      mode="inline"
      items={items}
    />
  );
};

export default SideBarContent;
