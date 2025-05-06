import { useMemo } from 'react';
import useMenuContent from './useMenuContent';

const useActiveMenuId = (activeId: string) => {
  const { isLoading, result } = useMenuContent();

  return useMemo(() => {
    for (const item of result) {
      if (item.name === activeId) {
        return { topicId: item.name, menuId: '', subMenuId: '' };
      } else {
        if (item.menus.find((menu) => menu.id === activeId)) {
          const menu = item.menus.find((menu) => menu.id === activeId);
          return { topicId: item.name, menuId: menu.id, subMenuId: '' };
        }
      }
    }
    return { topicId: '', menuId: '', subMenuId: '' };
  }, [activeId, isLoading]);
};
export default useActiveMenuId;
