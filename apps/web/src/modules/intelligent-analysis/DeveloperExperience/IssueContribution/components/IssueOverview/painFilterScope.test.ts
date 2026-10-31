import { resolvePainFilter, ALL_PAIN_FILTER as ALL } from './painFilterScope';
const available = ['2', '3', '7'];

describe('pain modal entry scope', () => {
  it('filters concrete statuses inside the entry and returns to all', () => {
    for (const selected of available) {
      expect(resolvePainFilter(selected, available).filter).toBe(selected);
    }
    expect(resolvePainFilter(ALL, available).filter).toBeUndefined();
  });
  it('rejects a stale status absent from the complete entry data', () => {
    expect(resolvePainFilter('historical', available)).toEqual({
      value: ALL,
      filter: undefined,
    });
  });
  it('restores fixed priority and stage entry conditions on all', () => {
    expect(resolvePainFilter(ALL, ['P0'], 'P0').filter).toBe('P0');
    expect(resolvePainFilter('P2', ['P0'], 'P0').filter).toBe('P0');
    expect(resolvePainFilter(ALL, ['创建'], '创建').filter).toBe('创建');
  });
  it('does not turn the loading state into a filter or widen fixed entry scope', () => {
    expect(resolvePainFilter('3', []).filter).toBeUndefined();
    expect(resolvePainFilter('P1', [], 'P0').filter).toBe('P0');
  });
});
