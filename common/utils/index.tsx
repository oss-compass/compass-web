import {
  Kind,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
} from 'graphql';

export function reduceTypeName(
  type: string | NameNode | NonNullTypeNode | NamedTypeNode | ListTypeNode
): string {
  return typeof type === 'string'
    ? type
    : type.kind === Kind.NON_NULL_TYPE
    ? reduceTypeName(type.type)
    : type.kind === Kind.NAMED_TYPE
    ? reduceTypeName(type.name)
    : type.kind === Kind.NAME
    ? reduceTypeName(type.value)
    : type.kind === Kind.LIST_TYPE
    ? reduceTypeName(type.type)
    : 'UNKNOWN_TYPE_NAME';
}

export function reduceListType(
  type: string | NameNode | NonNullTypeNode | NamedTypeNode | ListTypeNode
): string | undefined {
  return typeof type === 'string'
    ? undefined
    : type.kind === Kind.NON_NULL_TYPE
    ? reduceListType(type.type)
    : type.kind === Kind.NAMED_TYPE
    ? undefined
    : type.kind === Kind.NAME
    ? undefined
    : type.kind === Kind.LIST_TYPE
    ? reduceTypeName(type.type)
    : undefined;
}

export function reduceNonNullType(
  type: string | NameNode | NonNullTypeNode | NamedTypeNode | ListTypeNode
): string | undefined {
  return typeof type === 'string'
    ? undefined
    : type.kind === Kind.NON_NULL_TYPE
    ? reduceTypeName(type.type)
    : type.kind === Kind.NAMED_TYPE
    ? undefined
    : type.kind === Kind.NAME
    ? undefined
    : type.kind === Kind.LIST_TYPE
    ? undefined
    : undefined;
}

export function nonNullable<Type>(value: Type): value is NonNullable<Type> {
  return value !== null && value !== undefined;
}

export function upperFirst(str?: string): string {
  return str ? `${str.charAt(0).toUpperCase()}${str.slice(1)}` : '';
}

export function lowerFirst(str?: string): string {
  return str ? `${str.charAt(0).toLowerCase()}${str.slice(1)}` : '';
}

export function getLast<Type>(arr: Type[] = []): Type | undefined {
  return arr[arr.length - 1];
}

export function getKeyByValue<Key extends string, Value>(
  obj: Record<Key, Value>,
  value: Value
): Key | undefined {
  const keys = Object.keys(obj) as Key[];
  return keys.find((key) => obj[key] === value);
}
