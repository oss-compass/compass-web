import { resolveSchema } from './useMenuContent';

const definitions = {
  TpcItem: {
    properties: {
      scorecard: {
        $ref: '#/definitions/ScorecardItem',
        description: 'response',
      },
    },
  },
  ScorecardItem: {
    properties: {
      developer: { type: 'number', description: '开发维度' },
      collaboration: { type: 'number', description: '协作维度' },
    },
  },
};

describe('resolveSchema', () => {
  it('resolves direct $ref properties into their referenced schema', () => {
    // 线上 /api/v2/docs 中 60/225 端点的 $ref 属性此前落入无分支区，
    // 引用的 schema 从未被解析——TpcItem.scorecard 在文档页显示为
    // {"description":"response"} 而无任何子属性。
    const result = resolveSchema(definitions, 'TpcItem');
    expect(result.scorecard).toBeDefined();
    expect(result.scorecard.properties).toBeDefined();
    expect(result.scorecard.properties.developer).toBeDefined();
    expect(result.scorecard.properties.developer.type).toBe('number');
    expect(result.scorecard.properties.collaboration).toBeDefined();
  });

  it('resolves array-of-$ref items (existing behavior, regression guard)', () => {
    const defs = {
      ListResponse: {
        properties: {
          items: {
            type: 'array',
            items: { $ref: '#/definitions/ScorecardItem' },
          },
        },
      },
      ScorecardItem: definitions.ScorecardItem,
    };
    const result = resolveSchema(defs, 'ListResponse');
    expect(result.items.items.developer).toBeDefined();
  });

  it('returns empty object for unknown schema name', () => {
    expect(resolveSchema(definitions, 'NonExistent')).toEqual({});
  });
});
