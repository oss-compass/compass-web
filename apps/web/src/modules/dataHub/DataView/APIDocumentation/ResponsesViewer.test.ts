import { getSchemaChildren } from './ResponsesViewer';

describe('getSchemaChildren', () => {
  it('returns the properties of an object node', () => {
    const properties = { id: { type: 'integer' }, owner: { type: 'object' } };

    expect(getSchemaChildren({ type: 'object', properties })).toBe(properties);
  });

  it('returns the items of an array node', () => {
    const items = { id: { type: 'integer' } };

    expect(getSchemaChildren({ type: 'array', items })).toBe(items);
  });

  it('does not treat an object node as a leaf', () => {
    // The renderer used to test only `items`, so a node with `properties` was rendered
    // without its children.
    expect(getSchemaChildren({ type: 'object', properties: { a: {} } })).not.toBeNull();
  });

  it('returns null for leaf nodes and empty children', () => {
    expect(getSchemaChildren({ type: 'string', description: 'x' })).toBeNull();
    expect(getSchemaChildren({ type: 'object', properties: {} })).toBeNull();
    expect(getSchemaChildren({ type: 'array', items: {} })).toBeNull();
    expect(getSchemaChildren(null)).toBeNull();
    expect(getSchemaChildren(undefined)).toBeNull();
  });
});
