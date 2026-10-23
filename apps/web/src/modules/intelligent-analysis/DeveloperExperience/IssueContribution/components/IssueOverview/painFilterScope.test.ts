import { resolvePainFilter, ALL_PAIN_FILTER as ALL } from './painFilterScope';
const available = ['pending', 'inProgress', 'resolved', 'historical'];

describe('pain modal entry scope', () => {
  it.each(available)(
    'keeps %s entry fixed even after all or a stale selection',
    (entry) => {
      for (const selected of [ALL, ...available]) {
        const result = resolvePainFilter(selected, entry, undefined, available);
        expect(result.allowed).toEqual([entry]);
        expect(result.state).toBe(entry);
        expect(result.states).toBeUndefined();
        expect(result.fixed).toBe(true);
      }
    }
  );
  it('lets the total entry filter every state and return to all', () => {
    for (const selected of available) {
      expect(
        resolvePainFilter(selected, undefined, undefined, available).state
      ).toBe(selected);
    }
    expect(
      resolvePainFilter(ALL, undefined, undefined, available).state
    ).toBeUndefined();
  });
  it('keeps all inside the open-pain scope and rejects historical selection', () => {
    for (const selected of [ALL, 'historical']) {
      const result = resolvePainFilter(
        selected,
        undefined,
        ['pending', 'inProgress'],
        available
      );
      expect(result.allowed).toEqual(['pending', 'inProgress']);
      expect(result.state).toBeUndefined();
      expect(result.states).toEqual(['pending', 'inProgress']);
    }
    expect(
      resolvePainFilter(
        'pending',
        undefined,
        ['pending', 'inProgress'],
        available
      ).state
    ).toBe('pending');
  });
});
