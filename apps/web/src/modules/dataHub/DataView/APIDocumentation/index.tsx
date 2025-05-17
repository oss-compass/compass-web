import React, { useMemo, useState } from 'react';
import useMenuContent from '@modules/dataHub/components/SideBar/useMenuContent';
import EndpointTab from './EndpointTab';

const APIDocumentation = ({ id }) => {
  const { result: apiData } = useMenuContent();
  // 动态内容匹配逻辑
  const activeContent = useMemo(() => {
    if (!apiData) return null;

    // 深度遍历查找匹配项
    function findApiById(data, targetId) {
      for (const item of data) {
        if (item.menus) {
          for (const menu of item.menus) {
            if (menu.id === targetId) {
              return menu;
            }
            if (menu.subMenus) {
              for (const subMenu of menu.subMenus) {
                if (subMenu.id === targetId) {
                  return subMenu;
                }
              }
            }
          }
        }
      }
      return null; // 如果未找到
    }

    const target = findApiById(apiData, id);
    return target || apiData[0]?.menus[0]; // 默认选中第一个菜单
    // setActiveContent(target || apiData[0]?.menus[0]); // 默认选中第一个菜单
  }, [id]);
  // console.log(activeContent, id);
  if (activeContent === null) {
    return <div>Loading...</div>; // 或者其他加载状态
  }

  return <EndpointTab endpoint={activeContent} />;
};

export default APIDocumentation;
