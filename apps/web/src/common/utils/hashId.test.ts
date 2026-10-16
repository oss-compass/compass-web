/**
 * Unit tests for the helpers that back `useHashchangeEvent`.
 *
 * The hook used to read `window.location.hash` directly in its body. On the
 * server `window` does not exist, so that read threw
 * `ReferenceError: window is not defined` and turned the page into a 500.
 * These tests pin down the parsing rules and the SSR-safe accessor so the
 * guard cannot silently regress when the hook gains new callers.
 */
import { getCurrentHashId, parseHashId, readHashId } from './hashId';

// `getCurrentHashId` reads the global `window`. The tests below temporarily
// remove it to emulate server-side rendering, so keep the original descriptor
// around and restore it after every test.
const originalWindowDescriptor = Object.getOwnPropertyDescriptor(
  globalThis,
  'window'
);
const originalWindowValue = (globalThis as { window?: unknown }).window;

const stubGlobalWindow = (value: unknown) => {
  Object.defineProperty(globalThis, 'window', {
    value,
    configurable: true,
    writable: true,
  });
};

const restoreGlobalWindow = () => {
  if (originalWindowDescriptor) {
    Object.defineProperty(globalThis, 'window', originalWindowDescriptor);
    return;
  }
  if (originalWindowValue !== undefined) {
    (globalThis as { window?: unknown }).window = originalWindowValue;
    return;
  }
  delete (globalThis as { window?: unknown }).window;
};

afterEach(() => {
  restoreGlobalWindow();
  // Keep the jsdom URL clean so tests do not leak state into each other.
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/');
  }
});

describe('parseHashId', () => {
  it('returns an empty id when there is no hash', () => {
    expect(parseHashId()).toBe('');
    expect(parseHashId('')).toBe('');
    expect(parseHashId('#')).toBe('');
    expect(parseHashId(undefined)).toBe('');
    expect(parseHashId(null)).toBe('');
  });

  it('removes the leading "#" marker', () => {
    expect(parseHashId('#overview')).toBe('overview');
    expect(parseHashId('#push')).toBe('push');
  });

  it('accepts a hash that was already stripped', () => {
    // `readHashId` can be fed a window-like object whose hash has no marker,
    // and the parser should not depend on the caller having removed it.
    expect(parseHashId('overview')).toBe('overview');
  });

  it('drops the query string that follows the anchor', () => {
    expect(parseHashId('#push?repo=oss-compass')).toBe('push');
    expect(parseHashId('#introduction?from=sidebar')).toBe('introduction');
  });

  it('keeps only the segment before the first "?"', () => {
    expect(parseHashId('#a?b?c')).toBe('a');
    expect(parseHashId('#a?')).toBe('a');
  });

  it('returns an empty id when the query starts the hash', () => {
    // `#?repo=oss-compass` does not name an anchor, so nothing is selected.
    expect(parseHashId('#?repo=oss-compass')).toBe('');
  });

  it('leaves percent-encoded ids untouched', () => {
    // Decoding is only needed for the `document.getElementById` lookup, so
    // the value stored in React state must stay encoded.
    const encoded = '%E4%B8%AD%E6%96%87';
    expect(parseHashId(`#${encoded}`)).toBe(encoded);
    expect(parseHashId(`#${encoded}?tab=1`)).toBe(encoded);
  });

  it('keeps "#" characters that belong to the id', () => {
    expect(parseHashId('#section#anchor')).toBe('section#anchor');
  });
});

describe('readHashId', () => {
  it('returns an empty id without a window-like object', () => {
    expect(readHashId(undefined)).toBe('');
    expect(readHashId(null)).toBe('');
  });

  it('returns an empty id when the window has no location', () => {
    expect(readHashId({})).toBe('');
    expect(readHashId({ location: null })).toBe('');
    expect(readHashId({ location: {} })).toBe('');
  });

  it('normalizes the hash of a window-like object', () => {
    const withQuery = { location: { hash: '#push?repo=oss-compass' } };
    expect(readHashId(withQuery)).toBe('push');
    expect(readHashId({ location: { hash: '#overview' } })).toBe('overview');
    expect(readHashId({ location: { hash: '' } })).toBe('');
  });

  it('reads the hash of the real jsdom window', () => {
    window.history.replaceState(null, '', '/#card?x=1');
    expect(readHashId(window)).toBe('card');
  });
});

describe('getCurrentHashId', () => {
  it('reads the current hash from the global window', () => {
    window.history.replaceState(null, '', '/overview#push?repo=oss-compass');
    expect(getCurrentHashId()).toBe('push');
  });

  it('returns an empty id instead of throwing during SSR', () => {
    // Emulate the server, where `window` is not part of the global scope. This
    // is the exact call the hook makes while computing its initial state.
    stubGlobalWindow(undefined);
    expect(() => getCurrentHashId()).not.toThrow();
    expect(getCurrentHashId()).toBe('');
  });

  it('returns an empty id when the global window has no location', () => {
    // A partially initialised environment must not make the hook throw either.
    stubGlobalWindow({ document: { createElement: () => ({}) } });
    expect(getCurrentHashId()).toBe('');
  });
});
