import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

const useActiveMenuId = (activeId: string) => {


  return useMemo(() => {
    return [
    ].reduce<{ topicId: string; menuId: string; subMenuId: string }>(
      (acc, cur) => {
        const { topic, id, groups } = cur;

        const item = (groups as { name: string; id: string }[]).find(
          (item) => item.id === activeId
        );
        // submenu
        if (item) {
          return { topicId: topic, menuId: cur.id, subMenuId: item.id || '' };
        }

        if (id === activeId) {
          return { topicId: topic, menuId: cur.id, subMenuId: '' };
        }

        // topic
        if (topic === activeId) {
          return { topicId: topic, menuId: '', subMenuId: '' };
        }

        return acc;
      },
      { topicId: '', menuId: '', subMenuId: '' }
    );
  }, [
    activeId,
  ]);
};

export default useActiveMenuId;
