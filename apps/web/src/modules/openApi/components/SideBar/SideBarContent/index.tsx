import React from 'react';
import useMenuContent from '../useMenuContent';
import MenuTopicItem from '../Menu/MenuTopicItem';
import MenuItem from '../Menu/MenuItem';

const Divider = () => (
  <div className="mx-6 mb-4 mt-2 border-b border-gray-200"></div>
);
const SideBarContent = () => {
  const { result } = useMenuContent();

  return (
    <>
      {result?.map((item) => {
        return (
          <div key={item.name}>
            <MenuTopicItem
              hash={item.name}
              menus={item.menus.map((menu) => (
                <MenuItem key={menu.id} id={menu.id}>
                  {menu.description}
                </MenuItem>
              ))}
            >
              {item.convertName}
            </MenuTopicItem>
            <Divider />
          </div>
        );
      })}
    </>
  );
};
export default SideBarContent;
