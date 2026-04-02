import { useMemo } from 'react';
import useMenuContent from './useMenuContent';
import { findMenuPathSegments } from './menuTree';

const useActiveMenuId = (activeId: string) => {
  const { isLoading, result } = useMenuContent();

  return useMemo(() => {
    if (isLoading || !result) {
      return { topicId: '', menuId: '', subMenuId: '' };
    }

    const pathSegments = findMenuPathSegments(result, activeId);
    if (pathSegments.length === 0) {
      return { topicId: '', menuId: '', subMenuId: '' };
    }

    return {
      topicId: pathSegments[0] || '',
      menuId: pathSegments[1] || '',
      subMenuId:
        pathSegments.length > 2 ? pathSegments[pathSegments.length - 1] : '',
    };
  }, [activeId, isLoading, result]);
};

export default useActiveMenuId;
