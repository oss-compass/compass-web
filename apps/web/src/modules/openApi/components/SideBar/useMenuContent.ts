import { useMemo } from 'react';
import { useApiDataContext } from '@modules/openApi/context';
// 类型定义
interface SchemaProperty {
  type: string;
  format?: string;
  description?: string;
  [key: string]: unknown;
}

interface MenuItem {
  id: string;
  path: string;
  method: string;
  description?: string;
  parameters: Array<
    {
      name: string;
      required: boolean;
    } & SchemaProperty
  >;
}

interface SubMenu {
  name: string;
  convertName: string;
  subMenus: MenuItem[];
}

interface MenuCategory {
  name: string;
  convertName: string;
  menus: Array<MenuItem | SubMenu>;
}

const convertPath = (path: string) => {
  let res = path;
  if (path.startsWith('/')) {
    res = path.slice(1);
  }
  return res.replaceAll('/', '_');
};

const convertNameFun = (str: string) => {
  return str
    .replace(/_([a-z])/g, (match, letter) => ' ' + letter.toUpperCase())
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
};

const useMenuContent = () => {
  const { data: apiData, isLoading } = useApiDataContext();

  return useMemo(() => {
    if (isLoading) {
      return { isLoading, result: null };
    }

    const definitions = apiData?.definitions || {};
    const resultMap = new Map();
    const baseTags = apiData?.tags?.filter((tag) => tag.second_names);
    // 处理所有tags（一级目录）
    baseTags?.forEach((tag) => {
      const category: MenuCategory = {
        name: tag.name,
        convertName: convertNameFun(tag.name),
        menus: [],
      };

      // 构建二级目录结构
      if (tag.second_names?.length > 0) {
        category.menus = tag.second_names.map((secondName) => ({
          name: secondName,
          convertName: convertNameFun(secondName),
          subMenus: [],
        }));
      }

      resultMap.set(tag.name, category);
    });
    // 遍历所有API路径
    Object.entries(apiData?.paths || {}).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([httpMethod, methodInfo]) => {
        const [primaryTag, secondaryTag] = methodInfo.tags || [];
        const category = resultMap.get(primaryTag);

        if (!category) return;
        const properties =
          definitions[methodInfo.operationId]?.properties || {};
        const required = definitions[methodInfo.operationId]?.required || [];
        const menuItem = {
          id: convertPath(path),
          path: path,
          method: httpMethod.toUpperCase(),
          description: methodInfo.description,
          summary: methodInfo?.summary || '',
          parameters: Object.keys(properties).map((key) => {
            return {
              ...properties[key],
              name: key,
              required: required.includes(key),
            };
          }),
        };
        // 二级目录处理
        if (secondaryTag) {
          const subMenu = category.menus.find(
            (m) => 'subMenus' in m && m.name === secondaryTag
          ) as SubMenu | undefined;
          subMenu?.subMenus.push(menuItem);
        } else {
          category.menus.push(menuItem);
        }
      });
    });

    // 过滤掉空目录
    const result = Array.from(resultMap.values()).filter((category) =>
      category.subMenus
        ? category.subMenus.some((sub) => sub.menus.length > 0)
        : category.menus?.length > 0
    );
    console.log(result);
    return { isLoading, result };
  }, [isLoading, apiData]);
};

export default useMenuContent;
