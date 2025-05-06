import { useMemo } from 'react';
import useApiData from '../../hooks/useApiData';

const convertPath = (path: string) => {
  let res = path;
  if (path.startsWith('/')) {
    res = path.slice(1);
  }
  return res.replaceAll('/', '_');
};

const useMenuContent = () => {
  const { data: apiData, isLoading } = useApiData();

  return useMemo(() => {
    if (isLoading) {
      return { isLoading, result: null };
    }
    let result = apiData?.tags.map((tag) => {
      const menuItems = [];

      // 遍历所有API路径
      Object.entries(apiData.paths).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([httpMethod, methodInfo]) => {
          // 检查当前方法是否属于当前tag
          if (methodInfo.tags?.includes(tag.name)) {
            menuItems.push({
              id: convertPath(path),
              path: path,
              method: httpMethod.toUpperCase(),
              operationId: methodInfo.operationId,
              description: methodInfo.description,
              parameters:
                methodInfo.parameters?.map((p) => ({
                  name: p.name,
                  in: p.in,
                  required: p.required,
                  type: p.type,
                  description: p?.description || '',
                })) || [],
            });
          }
        });
      });

      return {
        ...tag,
        menus: menuItems,
      };
    });
    return { isLoading, result };
  }, [isLoading, apiData]);
};
export default useMenuContent;
