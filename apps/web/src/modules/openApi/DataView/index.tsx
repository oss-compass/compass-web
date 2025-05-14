import React, { useEffect, useState } from 'react';
import EndpointTab from './EndpointTab';
import useMenuContent from '@modules/openApi/components/SideBar/useMenuContent';
import Loading from './Loading';
import { useTranslation } from 'next-i18next';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';

const APIDocumentation = () => {
  const { t } = useTranslation();
  const { isLoading, result: apiData } = useMenuContent();
  const id = useHashchangeEvent();
  const [activeContent, setActiveContent] = useState(null);
  // 动态内容匹配逻辑
  useEffect(() => {
    if (!apiData) return;

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
    setActiveContent(target || apiData[0]?.menus[0]); // 默认选中第一个菜单
  }, [id, apiData]);

  if (isLoading || activeContent === null) {
    return <Loading />;
  }
  return (
    <div className="relative mx-auto flex h-[calc(100vh-80px)] min-w-0 flex-1 flex-col overflow-auto bg-[#f2f2f2] p-4">
      <div className="relative flex flex-1 flex-col bg-white p-8 drop-shadow-sm md:p-2">
        <EndpointTab endpoint={activeContent} />
      </div>
    </div>
  );
};

export default APIDocumentation;
