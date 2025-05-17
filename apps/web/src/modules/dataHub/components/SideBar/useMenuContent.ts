import { useMemo } from 'react';
import { useApiDataContext } from '@modules/dataHub/context';
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

const getResponses = (definitions, schema) => {
  const res = definitions[schema]?.properties || {};
  const result = Object.entries(res).map(([key, value]) => {
    return {
      name: key,
    };
  });
};
// @ts-ignore
function resolveSchema(definitions, targetSchema) {
  // 类型校验安全门
  if (!definitions[targetSchema]) {
    return {};
  }

  const schema = definitions[targetSchema] || {};
  const result = {};
  // 递归终止条件
  if (!schema.properties) return result;
  Object.entries(schema.properties).forEach(([propName, propDef1]) => {
    const propDef: any = propDef1;
    const propData: any = {
      type: propDef?.type,
      description: propDef.description,
      example: propDef.example,
    };

    // 处理数组类型嵌套
    if (propDef?.type === 'array' && propDef.items) {
      if (propDef.items.$ref) {
        const refSchema = propDef.items.$ref.split('/').pop();
        propData.items = resolveSchema(definitions, refSchema);
      } else {
        propData.items = resolveSchema(definitions, propDef.items.type);
      }
    }

    // 处理对象类型嵌套
    if (propDef.type === 'object' && propDef.properties) {
      propData.properties = resolveSchema(definitions, propDef.type);
    }

    result[propName] = propData;
  });
  return result;
}

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
        const schema =
          methodInfo?.responses?.['201']?.schema?.$ref.split('/')[2];
        const responses = resolveSchema(definitions, schema);
        const required = definitions[methodInfo.operationId]?.required || [];
        const menuItem = {
          id: convertPath(path),
          path: path,
          method: httpMethod.toUpperCase(),
          description: methodInfo.description,
          summary: methodInfo?.summary || '',
          responses: responses,
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
    return { isLoading, result };
  }, [isLoading, apiData]);
};

export default useMenuContent;
