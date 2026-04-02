export interface SchemaProperty {
  type: string;
  format?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ApiParameter extends SchemaProperty {
  name: string;
  required: boolean;
}

export interface ApiEndpointNode {
  type: 'endpoint';
  id: string;
  path: string;
  method: string;
  description?: string;
  summary: string;
  responses: Record<string, any>;
  parameters: ApiParameter[];
}

export interface ApiMenuGroupNode {
  type: 'group';
  key: string;
  name: string;
  convertName: string;
  children: ApiMenuNode[];
}

export type ApiMenuNode = ApiEndpointNode | ApiMenuGroupNode;

export const isApiMenuGroup = (node: ApiMenuNode): node is ApiMenuGroupNode =>
  node.type === 'group';

export const findEndpointById = (
  nodes: ApiMenuNode[],
  targetId: string
): ApiEndpointNode | null => {
  for (const node of nodes) {
    if (!isApiMenuGroup(node) && node.id === targetId) {
      return node;
    }

    if (isApiMenuGroup(node)) {
      const target = findEndpointById(node.children, targetId);
      if (target) {
        return target;
      }
    }
  }

  return null;
};

export const findFirstEndpoint = (
  nodes: ApiMenuNode[]
): ApiEndpointNode | null => {
  for (const node of nodes) {
    if (!isApiMenuGroup(node)) {
      return node;
    }

    const target = findFirstEndpoint(node.children);
    if (target) {
      return target;
    }
  }

  return null;
};

export const findMenuPathSegments = (
  nodes: ApiMenuNode[],
  targetId: string,
  parentSegments: string[] = []
): string[] => {
  for (const node of nodes) {
    if (!isApiMenuGroup(node) && node.id === targetId) {
      return [...parentSegments, node.id];
    }

    if (isApiMenuGroup(node)) {
      if (node.name === targetId || node.key === targetId) {
        return [...parentSegments, node.name];
      }

      const childPath = findMenuPathSegments(node.children, targetId, [
        ...parentSegments,
        node.name,
      ]);

      if (childPath.length > 0) {
        return childPath;
      }
    }
  }

  return [];
};
