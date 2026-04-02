import { useMemo } from 'react';
import { useApiDataContext } from '@modules/dataHub/context';
import type {
  ApiEndpointNode,
  ApiMenuGroupNode,
  ApiMenuNode,
} from './menuTree';
import { isApiMenuGroup } from './menuTree';

type DefinitionsMap = Record<string, any>;
const ALLOWED_ROOT_TAGS = new Set(['V2 API', 'V3 API']);

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

const createGroupKey = (segments: string[]) => {
  return `api-group:${segments.join('>')}`;
};

const getAllowedTagPath = (tags: string[] = []) => {
  const startIndex = tags.findIndex((tag) => ALLOWED_ROOT_TAGS.has(tag));
  if (startIndex === -1) {
    return [];
  }

  return tags.slice(startIndex).filter(Boolean);
};

// @ts-ignore
function resolveSchema(definitions: DefinitionsMap, targetSchema?: string) {
  if (!targetSchema || !definitions[targetSchema]) {
    return {};
  }

  const schema = definitions[targetSchema] || {};
  const result = {};

  if (!schema.properties) return result;

  Object.entries(schema.properties).forEach(([propName, propDef1]) => {
    const propDef: any = propDef1;
    const propData: any = {
      type: propDef?.type,
      description: propDef.description,
      example: propDef.example,
    };

    if (propDef?.type === 'array' && propDef.items) {
      if (propDef.items.$ref) {
        const refSchema = propDef.items.$ref.split('/').pop();
        propData.items = resolveSchema(definitions, refSchema);
      } else {
        propData.items = resolveSchema(definitions, propDef.items.type);
      }
    }

    if (propDef.type === 'object' && propDef.properties) {
      propData.properties = resolveSchema(definitions, propDef.type);
    }

    result[propName] = propData;
  });

  return result;
}

const createGroupNode = (
  name: string,
  pathSegments: string[]
): ApiMenuGroupNode => ({
  type: 'group',
  key: createGroupKey(pathSegments),
  name,
  convertName: convertNameFun(name),
  children: [],
});

const ensureGroupNode = (
  nodes: ApiMenuNode[],
  name: string,
  pathSegments: string[]
): ApiMenuGroupNode => {
  const existingNode = nodes.find(
    (node): node is ApiMenuGroupNode =>
      isApiMenuGroup(node) && node.name === name
  );

  if (existingNode) {
    return existingNode;
  }

  const node = createGroupNode(name, pathSegments);
  nodes.push(node);
  return node;
};

const filterEmptyGroups = (nodes: ApiMenuNode[]): ApiMenuNode[] => {
  return nodes.reduce<ApiMenuNode[]>((acc, node) => {
    if (!isApiMenuGroup(node)) {
      acc.push(node);
      return acc;
    }

    const children = filterEmptyGroups(node.children);
    if (children.length > 0) {
      acc.push({
        ...node,
        children,
      });
    }

    return acc;
  }, []);
};

const createEndpointNode = (
  path: string,
  httpMethod: string,
  methodInfo: any,
  definitions: DefinitionsMap
): ApiEndpointNode => {
  const properties = definitions[methodInfo.operationId]?.properties || {};
  const schema = methodInfo?.responses?.['201']?.schema?.$ref?.split('/')[2];
  const required = definitions[methodInfo.operationId]?.required || [];

  return {
    type: 'endpoint',
    id: convertPath(path),
    path,
    method: httpMethod.toUpperCase(),
    description: methodInfo.description,
    summary: methodInfo?.summary || '',
    responses: resolveSchema(definitions, schema),
    parameters: Object.keys(properties).map((key) => {
      return {
        ...properties[key],
        name: key,
        required: required.includes(key),
      };
    }),
  };
};

const useMenuContent = () => {
  const { data: apiData, isLoading } = useApiDataContext();

  return useMemo(() => {
    if (isLoading) {
      return { isLoading, result: null };
    }

    const definitions = apiData?.definitions || {};
    const resultMap = new Map<string, ApiMenuGroupNode>();

    const ensureRootNode = (name: string) => {
      const existingNode = resultMap.get(name);
      if (existingNode) {
        return existingNode;
      }

      const rootNode = createGroupNode(name, [name]);
      resultMap.set(name, rootNode);
      return rootNode;
    };

    const baseTags =
      apiData?.tags?.filter(
        (tag) => tag.second_names && ALLOWED_ROOT_TAGS.has(tag.name)
      ) || [];

    baseTags.forEach((tag) => {
      const category = ensureRootNode(tag.name);

      if (tag.second_names?.length > 0) {
        tag.second_names.forEach((secondName) => {
          ensureGroupNode(category.children, secondName, [
            tag.name,
            secondName,
          ]);
        });
      }
    });

    Object.entries(apiData?.paths || {}).forEach(([path, methods]) => {
      Object.entries(methods as Record<string, any>).forEach(
        ([httpMethod, methodInfo]) => {
          const tagPath = getAllowedTagPath(methodInfo.tags || []);
          if (tagPath.length === 0) {
            return;
          }

          const [primaryTag, ...nestedTags] = tagPath;
          const rootNode = ensureRootNode(primaryTag);
          let currentGroup = rootNode;

          nestedTags.forEach((tagName, index) => {
            currentGroup = ensureGroupNode(
              currentGroup.children,
              tagName,
              tagPath.slice(0, index + 2)
            );
          });

          currentGroup.children.push(
            createEndpointNode(path, httpMethod, methodInfo, definitions)
          );
        }
      );
    });

    const result = Array.from(resultMap.values()).reduce<ApiMenuGroupNode[]>(
      (acc, category) => {
        const children = filterEmptyGroups(category.children);
        if (children.length > 0) {
          acc.push({
            ...category,
            children,
          });
        }
        return acc;
      },
      []
    );

    return { isLoading, result };
  }, [apiData, isLoading]);
};

export default useMenuContent;
